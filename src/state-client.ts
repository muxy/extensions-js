import { ENVIRONMENTS } from './util';
import { TwitchAuth } from './twitch';
import XHRPromise from '../libs/xhr-promise';
import { AllState } from './sdk';

/**
 * Muxy production API URL.
 * @ignore
 */
const API_URL = 'https://api.muxy.io';

/**
 * Muxy sandbox API URL.
 * @ignore
 */
const SANDBOX_URL = 'https://sandbox.api.muxy.io';

/**
 * Localhost for testing purposes.
 * @ignore
 */
const LOCALHOST_URL = 'http://localhost:5000';

/**
 * API URL to use for backend requests. Uses production API be default, but
 * can be updated using {@link setEnvironment}.
 * @ignore
 */
let SERVER_URL = API_URL;
let FAKEAUTH_URL = SANDBOX_URL;

/**
 * ServerState enum maps the subsets of state persisted to the server to
 * their respective endpoints.
 * @ignore
 */
const ServerState = {
  AUTHENTICATION: 'authentication',
  USER: 'user_info',
  VIEWER: 'viewer_state',
  EXTENSION_VIEWER: 'extension_viewer_state',
  CHANNEL: 'channel_state',
  EXTENSION: 'extension_state',
  ALL: 'all_state'
};

/**
 * Wraps all extension backend accessor and mutator endpoints in convenience functions.
 *
 * Should not normally be created directly, instead an instance is made available
 * and namespaced appropriately when using {@link Muxy.SDK}.
 *
 * @private
 *
 * @example
 * const sdk = new Muxy.SDK();
 * sdk.getAllState().then((state) => {
 *   console.log(state);
 * });
 */
class StateClient {
  token: string;

  /** @ignore */
  constructor() {
    /** @ignore */
    this.token = null;
  }

  /** @ignore */
  static fetchTestAuth(
    testExtensionID: string,
    channelID: string,
    role: string
  ): Promise<TwitchAuth> {
    const xhr = new XHRPromise({
      method: 'POST',
      url: `${SANDBOX_URL}/v1/e/authtoken?role=${role}`,
      data: JSON.stringify({
        app_id: testExtensionID,
        channel_id: channelID,
        role
      })
    });

    return xhr.send().then(resp => {
      if (resp && resp.status < 400) {
        // Update the API Server variable to point to test
        SERVER_URL = SANDBOX_URL;

        const auth = Object.assign(new TwitchAuth(), resp.responseText, {
          clientId: testExtensionID,
          channelId: channelID,
          userId: 'T12345678'
        });

        return Promise.resolve(auth);
      } else {
        return Promise.reject(resp.statusText);
      }
    });
  }

  /** @ignore */
  static setEnvironment(env) {
    if (
      env === ENVIRONMENTS.SANDBOX_DEV ||
      env === ENVIRONMENTS.SANDBOX_TWITCH
    ) {
      SERVER_URL = SANDBOX_URL;
    }

    if (env === ENVIRONMENTS.TESTING) {
      SERVER_URL = LOCALHOST_URL;
      FAKEAUTH_URL = LOCALHOST_URL;
    }
  }

  /** @ignore */
  updateAuth(token: string) {
    this.token = token;
  }

  /**
   * signedRequest checks that we have a valid JWT and wraps a standard AJAX
   * request to the EBS with valid auth credentials.s
   * @ignore
   */
  signedRequest(extensionID, method, endpoint, data?): Promise<any> {
    if (!this.validateJWT()) {
      return Promise.reject('Your authentication token has expired.');
    }

    const xhrPromise = new XHRPromise({
      method,
      url: `${SERVER_URL}/v1/e/${endpoint}`,
      headers: {
        Authorization: `${extensionID} ${this.token}`
      },
      data
    });

    return xhrPromise.send().then(resp => {
      try {
        if (resp.status < 400) {
          return Promise.resolve(resp.responseText);
        } else if (resp.responseText) {
          return Promise.reject(resp.responseText);
        } else {
          return Promise.reject(`Server returned status ${resp.status}`);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    });
  }

  /**
   * validateJWT ensures that the current JWT is valid and not expired.
   * @ignore
   */
  validateJWT() {
    try {
      const splitToken = this.token.split('.');
      if (splitToken.length !== 3) {
        return false;
      }

      const tk = JSON.parse(atob(splitToken[1]));
      if (!tk.exp) {
        return false;
      }

      const now = new Date().valueOf();
      if (tk.exp < now / 1000) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * getState requests a subset of state stored on the server and sets the
   * local cached version of the state to the response.
   * @ignore
   */
  getState = (identifier, substate?): Promise<any> =>
    this.signedRequest(identifier, 'GET', substate || ServerState.ALL);

  /**
   * postState sends data to the corrent EBS substate endpoint for persistence.
   * @ignore
   */
  postState = (identifier, substate, data) =>
    this.signedRequest(identifier, 'POST', substate || ServerState.ALL, data);

  /** @ignore */
  getUserInfo = identifier => this.getState(identifier, ServerState.USER);

  /** @ignore */
  getViewerState = identifier => this.getState(identifier, ServerState.VIEWER);

  /** @ignore */
  getExtensionViewerState = identifier =>
    this.getState(identifier, ServerState.EXTENSION_VIEWER);

  /** @ignore */
  getChannelState = identifier =>
    this.getState(identifier, ServerState.CHANNEL);

  /** @ignore */
  getExtensionState = identifier =>
    this.getState(identifier, ServerState.EXTENSION);

  /** @ignore */
  setViewerState = (identifier, state) =>
    this.postState(identifier, ServerState.VIEWER, JSON.stringify(state));

  /** @ignore */
  setExtensionViewerState = (identifier, state) =>
    this.postState(
      identifier,
      ServerState.EXTENSION_VIEWER,
      JSON.stringify(state)
    );

  /** @ignore */
  setChannelState = (identifier, state) =>
    this.postState(identifier, ServerState.CHANNEL, JSON.stringify(state));

  /** @ignore */
  setExtensionState = (identifier, state) =>
    this.postState(identifier, ServerState.EXTENSION, JSON.stringify(state));

  /** @ignore */
  getAccumulation = (identifier, id, start) =>
    this.signedRequest(
      identifier,
      'GET',
      `accumulate?id=${id || 'default'}&start=${start}`
    );

  /** @ignore */
  accumulate = (identifier, id, data) =>
    this.signedRequest(
      identifier,
      'POST',
      `accumulate?id=${id || 'default'}`,
      JSON.stringify(data)
    );

  /** @ignore */
  vote = (identifier, id, data) =>
    this.signedRequest(
      identifier,
      'POST',
      `vote?id=${id || 'default'}`,
      JSON.stringify(data)
    );

  /** @ignore */
  getVotes = (identifier, id) =>
    this.signedRequest(identifier, 'GET', `vote?id=${id || 'default'}`);

  /** @ignore */
  rank = (identifier, id, data) =>
    this.signedRequest(
      identifier,
      'POST',
      `rank?id=${id || 'default'}`,
      JSON.stringify(data)
    );

  /** @ignore */
  getRank = (identifier: string, id: string = 'default') =>
    this.signedRequest(identifier, 'GET', `rank?id=${id}`);

  /** @ignore */
  deleteRank = (identifier, id) =>
    this.signedRequest(identifier, 'DELETE', `rank?id=${id || 'default'}`);

  /** @ignore */
  getJSONStore = (identifier, id) =>
    this.signedRequest(identifier, 'GET', `json_store?id=${id || 'default'}`);

  /** @ignore */
  validateCode = (identifier, code) =>
    this.signedRequest(
      identifier,
      'POST',
      'validate_pin',
      JSON.stringify({ pin: code })
    );

  /** @ignore */
  pinTokenExists = identifier =>
    this.signedRequest(identifier, 'GET', 'pin_token_exists');

  /** @ignore */
  revokeAllPINCodes = identifier =>
    this.signedRequest(identifier, 'DELETE', 'pin');
}

export default StateClient;

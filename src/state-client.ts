/**
 * @module SDK
 */

import XHRPromise from '../libs/xhr-promise';

import { DebugOptions } from './debug';
import { TwitchAuth } from './twitch';
import { ENVIRONMENTS } from './util';

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
  ALL: 'all_state',
  AUTHENTICATION: 'authentication',
  CHANNEL: 'channel_state',
  EXTENSION: 'extension_state',
  EXTENSION_SECRET: 'extension_hidden_state',
  EXTENSION_VIEWER: 'extension_viewer_state',
  USER: 'user_info',
  VIEWER: 'viewer_state'
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
  /** @ignore */
  public static fetchTestAuth(extensionID: string, debug: DebugOptions): Promise<TwitchAuth> {
    const data = JSON.stringify({
      app_id: extensionID,
      channel_id: debug.channelID,
      role: debug.role,
      user_id: debug.userID || '12345678'
    });

    const xhr = new XHRPromise({
      data,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: `${debug.url || SANDBOX_URL}/v1/e/authtoken?role=${debug.role}` // pass roll as a param for fixtures
    });

    return xhr.send().then(resp => {
      if (resp && resp.status < 400) {
        this.setEnvironment(null, debug);
        // Update the API Server variable to point to test

        const auth = Object.assign(new TwitchAuth(), resp.responseText, {
          channelId: debug.channelID,
          clientId: extensionID,
          userId: debug.userID ? `U${debug.userID}` : 'U12345678'
        });

        return Promise.resolve(auth);
      } else {
        return Promise.reject(resp.statusText);
      }
    });
  }

  /** @ignore */
  public static setEnvironment(env, debug) {
    if (env === ENVIRONMENTS.SANDBOX_DEV || env === ENVIRONMENTS.SANDBOX_TWITCH || env === ENVIRONMENTS.SANDBOX_ADMIN) {
      SERVER_URL = SANDBOX_URL;
    }

    if (env === ENVIRONMENTS.TESTING) {
      SERVER_URL = LOCALHOST_URL;
      FAKEAUTH_URL = LOCALHOST_URL;
    }

    if (debug && debug.url) {
      SERVER_URL = debug.url;
    }
  }

  public token: string;
  public debug: DebugOptions;

  /** @ignore */
  constructor(debug: DebugOptions) {
    /** @ignore */
    this.token = null;
    this.debug = debug;
  }

  /** @ignore */
  public updateAuth(token: string) {
    this.token = token;
  }

  /**
   * signedRequest checks that we have a valid JWT and wraps a standard AJAX
   * request to the EBS with valid auth credentials.s
   * @ignore
   */
  public signedRequest(extensionID, method, endpoint, data?): Promise<any> {
    if (!this.validateJWT()) {
      return Promise.reject('Your authentication token has expired.');
    }

    const xhrPromise = new XHRPromise({
      data,
      headers: {
        Authorization: `${extensionID} ${this.token}`
      },
      method,
      url: `${SERVER_URL}/v1/e/${endpoint}`
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
  public validateJWT() {
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
  public getState = (identifier, substate?): Promise<any> =>
    this.signedRequest(identifier, 'GET', substate || ServerState.ALL);

  /**
   * postState sends data to the current EBS substate endpoint for persistence.
   * @ignore
   */
  public postState = (identifier, substate, data) =>
    this.signedRequest(identifier, 'POST', substate || ServerState.ALL, data);

  /** @ignore */
  public getUserInfo = identifier => this.getState(identifier, ServerState.USER);

  /** @ignore */
  public getViewerState = identifier => this.getState(identifier, ServerState.VIEWER);

  /** @ignore */
  public getExtensionViewerState = identifier => this.getState(identifier, ServerState.EXTENSION_VIEWER);

  /** @ignore */
  public getExtensionSecretState = identifier => this.getState(identifier, ServerState.EXTENSION_SECRET);

  /** @ignore */
  public getChannelState = identifier => this.getState(identifier, ServerState.CHANNEL);

  /** @ignore */
  public getExtensionState = identifier => this.getState(identifier, ServerState.EXTENSION);

  /** @ignore */
  public setViewerState = (identifier, state) => this.postState(identifier, ServerState.VIEWER, JSON.stringify(state));

  /** @ignore */
  public setExtensionViewerState = (identifier, state) =>
    this.postState(identifier, ServerState.EXTENSION_VIEWER, JSON.stringify(state));

  /** @ignore */
  public setExtensionSecretState = (identifier, state) =>
    this.postState(identifier, ServerState.EXTENSION_SECRET, JSON.stringify(state));

  /** @ignore */
  public setChannelState = (identifier, state) =>
    this.postState(identifier, ServerState.CHANNEL, JSON.stringify(state));

  /** @ignore */
  public setExtensionState = (identifier, state) =>
    this.postState(identifier, ServerState.EXTENSION, JSON.stringify(state));

  /** @ignore */
  public getAccumulation = (identifier, id, start) =>
    this.signedRequest(identifier, 'GET', `accumulate?id=${id || 'default'}&start=${start}`);

  /** @ignore */
  public accumulate = (identifier, id, data) =>
    this.signedRequest(identifier, 'POST', `accumulate?id=${id || 'default'}`, JSON.stringify(data));

  /** @ignore */
  public vote = (identifier, id, data) =>
    this.signedRequest(identifier, 'POST', `vote?id=${id || 'default'}`, JSON.stringify(data));

  /** @ignore */
  public getVotes = (identifier, id) => this.signedRequest(identifier, 'GET', `vote?id=${id || 'default'}`);

  /** @ignore */
  public getFullVoteLogs = (identifier, id) => this.signedRequest(identifier, 'GET', `vote_logs?id=${id || 'default'}`);

  /** @ignore */
  public rank = (identifier, id, data) =>
    this.signedRequest(identifier, 'POST', `rank?id=${id || 'default'}`, JSON.stringify(data));

  /** @ignore */
  public getRank = (identifier: string, id: string = 'default') =>
    this.signedRequest(identifier, 'GET', `rank?id=${id}`);

  /** @ignore */
  public deleteRank = (identifier, id) => this.signedRequest(identifier, 'DELETE', `rank?id=${id || 'default'}`);

  /** @ignore */
  public getJSONStore = (identifier, id) => this.signedRequest(identifier, 'GET', `json_store?id=${id || 'default'}`);

  /** @ignore */
  public validateCode = (identifier, code) =>
    this.signedRequest(identifier, 'POST', 'validate_pin', JSON.stringify({ pin: code }));

  /** @ignore */
  public pinTokenExists = identifier => this.signedRequest(identifier, 'GET', 'pin_token_exists');

  /** @ignore */
  public revokeAllPINCodes = identifier => this.signedRequest(identifier, 'DELETE', 'pin');

  /** @ignore */
  public getEligibleCodes = identifier => this.signedRequest(identifier, 'GET', 'codes/eligible');

  /** @ignore */
  public getRedeemedCodes = identifier => this.signedRequest(identifier, 'GET', 'codes/redeemed');

  /** @ignore */
  public redeemCode = (identifier, prizeIndex) =>
    this.signedRequest(identifier, 'POST', 'codes/redeem', JSON.stringify({ prize: prizeIndex }));
}

export default StateClient;

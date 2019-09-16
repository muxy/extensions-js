/**
 * @module SDK
 */

import XHRPromise from '../libs/xhr-promise';

import Config from './config';
import { DebugOptions } from './debug';
import { TriviaOption, TriviaQuestion, TriviaQuestionState } from './sdk';
import { TwitchAuth } from './twitch';
import { Environment } from './util';

/**
 * API URL to use for backend requests.
 * Configure using using {@link setEnvironment}.
 * @ignore
 */
let SERVER_URL: string;
let FAKEAUTH_URL: string;

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
      url: `${debug.url || SERVER_URL}/v1/e/authtoken?role=${debug.role}` // pass roll as a param for fixtures
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
  public static setEnvironment(env: Environment, debug: DebugOptions) {
    if (env) {
      const urls = Config.GetServerURLs(env);
      SERVER_URL = urls.ServerURL;
      FAKEAUTH_URL = urls.FakeAuthURL;
    }

    if (debug && debug.url) {
      SERVER_URL = debug.url;
      FAKEAUTH_URL = debug.url;
    }
  }

  public token: string;
  public debug: DebugOptions;
  private loaded: Promise<void>;

  /** @ignore */
  constructor(loadedPromise: Promise<void>, debug: DebugOptions) {
    /** @ignore */
    this.token = null;
    this.debug = debug;
    this.loaded = loadedPromise;
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
  public signedRequest(extensionID, method, endpoint, data?: any, skipPromise?: boolean): Promise<any> {
    let waitedPromise = this.loaded;
    if (skipPromise) {
      waitedPromise = Promise.resolve();
    }

    return waitedPromise.then(() => {
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
  public getState = (identifier: string, substate?: ServerState): Promise<any> =>
    this.signedRequest(identifier, 'GET', substate || ServerState.ALL);

  /**
   * postState sends data to the current EBS substate endpoint for persistence.
   * @ignore
   */
  public postState = (identifier: string, substate: ServerState, data: any) =>
    this.signedRequest(identifier, 'POST', substate || ServerState.ALL, data);

  /** @ignore */
  public getUserInfo = (identifier: string) => this.getState(identifier, ServerState.USER);

  /** @ignore */
  public immediateGetUserInfo = (identifier: string) =>
    this.signedRequest(identifier, 'GET', ServerState.USER, undefined, true);

  /** @ignore */
  public getViewerState = (identifier: string) => this.getState(identifier, ServerState.VIEWER);

  /** @ignore */
  public getExtensionViewerState = (identifier: string) => this.getState(identifier, ServerState.EXTENSION_VIEWER);

  /** @ignore */
  public getExtensionSecretState = (identifier: string) => this.getState(identifier, ServerState.EXTENSION_SECRET);

  /** @ignore */
  public getChannelState = (identifier: string) => this.getState(identifier, ServerState.CHANNEL);

  /** @ignore */
  public getExtensionState = (identifier: string) => this.getState(identifier, ServerState.EXTENSION);

  /** @ignore */
  public setViewerState = (identifier: string, state: any) =>
    this.postState(identifier, ServerState.VIEWER, JSON.stringify(state));

  /** @ignore */
  public setExtensionViewerState = (identifier: string, state: any) =>
    this.postState(identifier, ServerState.EXTENSION_VIEWER, JSON.stringify(state));

  /** @ignore */
  public patchExtensionViewerState = (identifier: string, multiState: any) =>
    this.signedRequest(identifier, 'PATCH', 'extension_viewer_state', JSON.stringify(multiState));

  /** @ignore */
  public multiGetExtensionViewerState = (identifier: string, users: string[]) =>
    this.signedRequest(identifier, 'GET', `extension_viewer_state?user_ids=${users.join(',')}`);

  /** @ignore */
  public setExtensionSecretState = (identifier: string, state: any) =>
    this.postState(identifier, ServerState.EXTENSION_SECRET, JSON.stringify(state));

  /** @ignore */
  public setChannelState = (identifier: string, state: any) =>
    this.postState(identifier, ServerState.CHANNEL, JSON.stringify(state));

  /** @ignore */
  public setExtensionState = (identifier: string, state: any) =>
    this.postState(identifier, ServerState.EXTENSION, JSON.stringify(state));

  /** @ignore */
  public getAccumulation = (identifier: string, id: string, start: number) =>
    this.signedRequest(identifier, 'GET', `accumulate?id=${id || 'default'}&start=${start}`);

  /** @ignore */
  public accumulate = (identifier: string, id: string, data: any) =>
    this.signedRequest(identifier, 'POST', `accumulate?id=${id || 'default'}`, JSON.stringify(data));

  /** @ignore */
  public vote = (identifier: string, id: string, data: any) =>
    this.signedRequest(identifier, 'POST', `vote?id=${id || 'default'}`, JSON.stringify(data));

  /** @ignore */
  public getVotes = (identifier: string, id: string = 'default') =>
    this.signedRequest(identifier, 'GET', `vote?id=${id}`);

  /** @ignore */
  public getFullVoteLogs = (identifier: string, id: string = 'default') =>
    this.signedRequest(identifier, 'GET', `vote_logs?id=${id}`);

  /** @ignore */
  public rank = (identifier: string, id: string, data: any) =>
    this.signedRequest(identifier, 'POST', `rank?id=${id || 'default'}`, JSON.stringify(data));

  /** @ignore */
  public getRank = (identifier: string, id: string = 'default') =>
    this.signedRequest(identifier, 'GET', `rank?id=${id}`);

  /** @ignore */
  public deleteRank = (identifier: string, id: string = 'default') =>
    this.signedRequest(identifier, 'DELETE', `rank?id=${id}`);

  /** @ignore */
  public getJSONStore = (identifier: string, id: string = 'default') =>
    this.signedRequest(identifier, 'GET', `json_store?id=${id}`);

  /** @ignore */
  public validateCode = (identifier: string, code: string) =>
    this.signedRequest(identifier, 'POST', 'validate_pin', JSON.stringify({ pin: code }));

  /** @ignore */
  public pinTokenExists = (identifier: string) => this.signedRequest(identifier, 'GET', 'pin_token_exists');

  /** @ignore */
  public revokeAllPINCodes = (identifier: string) => this.signedRequest(identifier, 'DELETE', 'pin');

  /** @ignore */
  public getEligibleCodes = (identifier: string) => this.signedRequest(identifier, 'GET', 'codes/eligible');

  /** @ignore */
  public getRedeemedCodes = (identifier: string) => this.signedRequest(identifier, 'GET', 'codes/redeemed');

  /** @ignore */
  public redeemCode = (identifier: string, prizeIndex: number) =>
    this.signedRequest(identifier, 'POST', 'codes/redeem', JSON.stringify({ prize: prizeIndex }));

  /** @ignore */
  public getExtensionUsers = (identifier: string, cursor: string) =>
    this.signedRequest(identifier, 'GET', `user_ids?cursor=${cursor || 0}`);

  /** @ignore */
  public joinExtensionTriviaTeam = (identifier: string) => this.signedRequest(identifier, 'POST', 'team_membership');

  /** @ignore */
  public getExtensionTriviaJoinedTeam = (identifier: string) =>
    this.signedRequest(identifier, 'GET', 'team_membership');

  /** @ignore */
  public addExtensionTriviaQuestion = (identifier: string, triviaQuestion: TriviaQuestion) =>
    this.signedRequest(identifier, 'POST', 'curated_poll_edit', JSON.stringify(triviaQuestion));

  /** @ignore */
  public removeExtensionTriviaQuestion = (identifier: string, triviaQuestionID: string) =>
    this.signedRequest(identifier, 'DELETE', 'curated_poll_edit', JSON.stringify({ id: triviaQuestionID }));

  /** @ignore */
  public addExtensionTriviaOptionToQuestion = (identifier: string, questionID: string, option: TriviaOption) =>
    this.signedRequest(
      identifier,
      'POST',
      'curated_poll_edit_option',
      JSON.stringify({ question: questionID, option })
    );

  /** @ignore */
  public removeExtensionTriviaOptionFromQuestion = (identifier: string, questionID: string, optionID: string) =>
    this.signedRequest(
      identifier,
      'DELETE',
      'curated_poll_edit_option',
      JSON.stringify({ question: questionID, option: optionID })
    );

  /** @ignore */
  public setExtensionTriviaQuestionState = (
    identifier: string,
    questionID: string,
    state: TriviaQuestionState,
    winner: string
  ) =>
    this.signedRequest(
      identifier,
      'POST',
      `curated_poll_state?id=${questionID}`,
      JSON.stringify({ transition: state, winner })
    );

  /** @ignore */
  public setExtensionTriviaQuestionVote = (identifier: string, questionID: string, optionID: string) =>
    this.signedRequest(identifier, 'POST', 'curated_poll', JSON.stringify({ question_id: questionID, vote: optionID }));

  /** @ignore */
  public getExtensionTriviaQuestions = (identifier: string) => this.signedRequest(identifier, 'GET', 'curated_poll');

  /** @ignore */
  public getExtensionTriviaQuestion = (identifier: string, questionID: string) =>
    this.signedRequest(identifier, 'GET', `curated_poll?id=${questionID}`);

  /** @ignore */
  public getExtensionTriviaLeaderboard = (identifer: string) =>
    this.signedRequest(identifer, 'GET', 'curated_poll_leaderboard');
}

export default StateClient;

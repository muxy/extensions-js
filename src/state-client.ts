/**
 * @module SDK
 */

import type { Transaction } from './types/purchases';

import XHRPromise, { XHROptions } from '../libs/xhr-promise';

import Config from './config';
import { DebugOptions } from './debug';
import {
  AccumulateData,
  EligibleCodes,
  ExtensionUsersResult,
  RankResponse,
  RedeemedCodes,
  RedeemResult,
  TriviaLeaderboard,
  TriviaOption,
  TriviaQuestion,
  TriviaQuestionResponse,
  TriviaQuestionState,
  TriviaStateResponse,
  TriviaTeam,
  UserInfo,
  VoteData,
  VoteLog
} from './types';
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
export enum ServerState {
  ALL = 'all_state',
  AUTHENTICATION = 'authentication',
  CHANNEL = 'channel_state',
  EXTENSION = 'extension_state',
  EXTENSION_SECRET = 'extension_hidden_state',
  EXTENSION_VIEWER = 'extension_viewer_state',
  USER = 'user_info',
  VIEWER = 'viewer_state'
}

/**
 * ServerConfig enum maps the subsets of config persisted to the server to
 * their respective endpoints.
 * @ignore
 */
export enum ServerConfig {
  ALL = 'config',
  CHANNEL = 'config/channel',
  EXTENSION = 'config/extension'
}

/** @ignore */
export interface Hook<HookCallback> {
  failure: HookCallback;
  success: HookCallback;
}

// Request hooks must return the config object, optionally after mutating it.
export type RequestHook = (config: XHROptions) => Promise<XHROptions>;
// Response hooks take an (optionally) typed object and return an (optinally) typed object.
export type ResponseHook = <InType = unknown, OutType = unknown>(resp: InType) => Promise<OutType>;

/**
 * HookManager class for adding and removing network request
 * and response hooks.
 *
 * Similar to the axios interceptor pattern:
 * https://github.com/axios/axios/blob/master/lib/core/InterceptorManager.js
 *
 * @ignore
 */
export class HookManager<HookCallback> implements Iterable<Hook<HookCallback>> {
  private callbacks: Array<{
    failure: HookCallback;
    success: HookCallback;
  }> = [];

  public get length() {
    return this.callbacks.length;
  }

  public add(success: HookCallback, failure?: HookCallback): number {
    this.callbacks.push({ failure, success });

    return this.callbacks.length - 1;
  }

  public remove(index: number) {
    if (this.callbacks[index]) {
      this.callbacks[index] = null;
    }
  }

  // Iterable interface allows looping through hooks like:
  // for (let h of this.hooks) {
  //   h.success();
  // }
  public [Symbol.iterator]() {
    let current = 0;
    const callbacks = this.callbacks;

    return {
      next(): IteratorResult<Hook<HookCallback>> {
        while (callbacks[current] === null && current < callbacks.length) {
          current++;
        }

        if (current < callbacks.length) {
          return { done: false, value: callbacks[current++] };
        } else {
          return { done: true, value: null };
        }
      }
    };
  }
}

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
  public static async fetchTestAuth(extensionID: string, debug: DebugOptions): Promise<TwitchAuth> {
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
      url: `${debug.url || SERVER_URL}/v1/e/authtoken?role=${debug.role}` // pass role as a param for fixtures
    });

    return xhr.send().then((resp) => {
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

  public hooks = {
    requests: new HookManager<RequestHook>(),
    responses: new HookManager<ResponseHook>()
  };

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
   * request to the EBS with valid auth credentials.
   * @ignore
   */
  public async signedRequest<DataType = unknown, ResponseType = unknown>(
    extensionID: string,
    method: string,
    endpoint: string,
    data?: DataType,
    skipPromise?: boolean
  ): Promise<ResponseType> {
    let promise: Promise<XHROptions | ResponseType | undefined> = skipPromise
      ? Promise.resolve(undefined)
      : this.loaded;

    // Middle of chain makes the actual server request
    const chain: [RequestHook | ResponseHook, undefined] = [
      // Perform request with mutated config options.
      async (config: XHROptions): Promise<XHROptions> => {
        if (!this.validateJWT()) {
          return Promise.reject('Your authentication token has expired.');
        }

        const xhrPromise = new XHRPromise(config);

        try {
          const resp = await xhrPromise.send();
          if (resp.status < 400) {
            return Promise.resolve(resp.responseText);
          } else if (resp.responseText) {
            return Promise.reject(resp.responseText);
          } else {
            return Promise.reject(`Server returned status ${resp.status}`);
          }
        } catch (requestErr) {
          return Promise.reject(requestErr);
        }
      },

      undefined
    ];

    // Unshift pre-request hooks to beginning of call chain
    for (const h of this.hooks.requests) {
      chain.unshift(h.success, h.failure);
    }

    // Push post-request hooks to end of call chain
    for (const h of this.hooks.responses) {
      chain.push(h.success, h.failure);
    }

    // Start the promise chain with the current config object
    promise = promise.then(() => ({
      data: JSON.stringify(data),
      headers: { Authorization: `${extensionID} ${this.token}` },
      method,
      url: `${SERVER_URL}/v1/e/${endpoint}`
    }));

    // Build promise chain
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    // Force last return value to generic state type
    // If we want to do more explicit type checking, we would need
    // the developer to provide a discrimator or type identifier.
    // But I don't know if that's proper for this library to enforce.
    return promise.then((value: XHROptions | DataType) => {
      return value as ResponseType;
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
  public getState = <ResponseType = unknown>(identifier: string, substate?: ServerState): Promise<ResponseType> =>
    this.signedRequest<undefined, ResponseType>(identifier, 'GET', substate || ServerState.ALL);

  /**
   * getConfig requests a subset of config stored on the server and sets the
   * local cached version of the config to the response.
   * @ignore
   */
  public getConfig = <ResponseType = unknown>(identifier: string, subconfig?: ServerConfig): Promise<ResponseType> =>
    this.signedRequest<undefined, ResponseType>(identifier, 'GET', subconfig || ServerConfig.ALL);

  /**
   * postState sends data to the current EBS substate endpoint for persistence.
   * @ignore
   */
  public postState = <DataType = unknown, ResponseType = unknown>(
    identifier: string,
    substate: ServerState,
    data: DataType
  ) => this.signedRequest<DataType, ResponseType>(identifier, 'POST', substate || ServerState.ALL, data);

  /**
   * postConfig sends data to the current EBS substate endpoint for persistence.
   * @ignore
   */
  public postConfig = <DataType = unknown, ResponseType = unknown>(
    identifier: string,
    subconfig: ServerConfig,
    data: DataType
  ) => this.signedRequest<DataType, ResponseType>(identifier, 'POST', subconfig || ServerConfig.ALL, data);

  /** @ignore */
  public getUserInfo = (identifier: string) => this.getState(identifier, ServerState.USER);

  /** @ignore */
  public immediateGetUserInfo = (identifier: string) =>
    this.signedRequest<undefined, UserInfo>(identifier, 'GET', ServerState.USER, undefined, true);

  /** @ignore */
  public getViewerState = <ResponseType = unknown>(identifier: string) =>
    this.getState<ResponseType>(identifier, ServerState.VIEWER);

  /** @ignore */
  public getExtensionViewerState = <ResponseType = unknown>(identifier: string) =>
    this.getState<ResponseType>(identifier, ServerState.EXTENSION_VIEWER);

  /** @ignore */
  public multiGetExtensionViewerState = <ResponseType = unknown>(identifier: string, users: string[]) =>
    this.signedRequest<undefined, ResponseType>(
      identifier,
      'GET',
      `extension_viewer_state?user_ids=${users.join(',')}`
    );
  /** @ignore */
  public getExtensionSecretState = <ResponseType = unknown>(identifier: string) =>
    this.getState<ResponseType>(identifier, ServerState.EXTENSION_SECRET);

  /** @ignore */
  public getChannelState = <ResponseType = unknown>(identifier: string) =>
    this.getState<ResponseType>(identifier, ServerState.CHANNEL);

  /** @ignore */
  public getServerConfig = <ResponseType = unknown>(identifier: string) =>
    this.getConfig<ResponseType>(identifier, ServerConfig.ALL);

  /** @ignore */
  public getChannelConfig = <ResponseType = unknown>(identifier: string) =>
    this.getConfig<ResponseType>(identifier, ServerConfig.CHANNEL);

  /** @ignore */
  public getExtensionConfig = <ResponseType = unknown>(identifier: string) =>
    this.getConfig<ResponseType>(identifier, ServerConfig.EXTENSION);

  /** @ignore */
  public getExtensionState = <ResponseType = unknown>(identifier: string) =>
    this.getState<ResponseType>(identifier, ServerState.EXTENSION);

  /** @ignore */
  public setExtensionState = <DataType = unknown, ResponseType = unknown>(identifier: string, state: DataType) =>
    this.postState<DataType, ResponseType>(identifier, ServerState.EXTENSION, state);

  /** @ignore */
  public patchExtensionState = <DataType = unknown, ResponseType = unknown>(identifier: string, multiState: DataType) =>
    this.signedRequest<DataType, ResponseType>(identifier, 'PATCH', ServerState.EXTENSION, multiState);

  /** @ignore */
  public setViewerState = <DataType = unknown, ResponseType = unknown>(identifier: string, state: DataType) =>
    this.postState<DataType, ResponseType>(identifier, ServerState.VIEWER, state);

  /** @ignore */
  public patchViewerState = <DataType = unknown, ResponseType = unknown>(identifier: string, multiState: DataType) =>
    this.signedRequest<DataType, ResponseType>(identifier, 'PATCH', ServerState.VIEWER, multiState);

  /** @ignore */
  public setExtensionViewerState = <DataType = unknown, ResponseType = unknown>(identifier: string, state: DataType) =>
    this.postState<DataType, ResponseType>(identifier, ServerState.EXTENSION_VIEWER, state);

  /** @ignore */
  public patchExtensionViewerState = <DataType = unknown, ResponseType = unknown>(
    identifier: string,
    multiState: DataType
  ) => this.signedRequest<DataType, ResponseType>(identifier, 'PATCH', ServerState.EXTENSION_VIEWER, multiState);

  /** @ignore */
  public setExtensionSecretState = <DataType = unknown, ResponseType = unknown>(identifier: string, state: DataType) =>
    this.postState<DataType, ResponseType>(identifier, ServerState.EXTENSION_SECRET, state);

  /** @ignore */
  public patchExtensionSecretState = <DataType = unknown, ResponseType = unknown>(
    identifier: string,
    multiState: DataType
  ) => this.signedRequest<DataType, ResponseType>(identifier, 'PATCH', ServerState.EXTENSION_SECRET, multiState);

  /** @ignore */
  public setChannelState = <DataType = unknown, ResponseType = unknown>(identifier: string, state: DataType) =>
    this.postState<DataType, ResponseType>(identifier, ServerState.CHANNEL, state);

  /** @ignore */
  public patchChannelState = <DataType = unknown, ResponseType = unknown>(identifier: string, multiState: DataType) =>
    this.signedRequest<DataType, ResponseType>(identifier, 'PATCH', ServerState.CHANNEL, multiState);

  /** @ignore */
  public setChannelConfig = <DataType = unknown, ResponseType = unknown>(identifier: string, config: DataType) =>
    this.postConfig<DataType, ResponseType>(identifier, ServerConfig.CHANNEL, config);

  /** @ignore */
  public patchChannelConfig = <DataType = unknown, ResponseType = unknown>(identifier: string, multiConfig: DataType) =>
    this.signedRequest<DataType, ResponseType>(identifier, 'PATCH', ServerConfig.CHANNEL, multiConfig);

  /** @ignore */
  public setExtensionConfig = <DataType = unknown, ResponseType = unknown>(identifier: string, config: DataType) =>
    this.postConfig<DataType, ResponseType>(identifier, ServerConfig.EXTENSION, config);

  /** @ignore */
  public patchExtensionConfig = <DataType = unknown, ResponseType = unknown>(
    identifier: string,
    multiConfig: DataType
  ) => this.signedRequest<DataType, ResponseType>(identifier, 'PATCH', ServerConfig.EXTENSION, multiConfig);

  /** @ignore */
  public getAccumulation = (identifier: string, id: string, start: number) =>
    this.signedRequest<undefined, AccumulateData>(identifier, 'GET', `accumulate?id=${id || 'default'}&start=${start}`);

  /** @ignore */
  public accumulate = <DataType = unknown, ResponseType = unknown>(identifier: string, id: string, data: DataType) =>
    this.signedRequest<DataType, ResponseType>(identifier, 'POST', `accumulate?id=${id || 'default'}`, data);

  /** @ignore */
  public vote = <DataType = { value: number; count?: number }>(identifier: string, id: string, data: DataType) =>
    this.signedRequest<DataType, VoteData>(identifier, 'POST', `vote?id=${id || 'default'}`, data);

  /** @ignore */
  public getVotes = (identifier: string, id: string = 'default') =>
    this.signedRequest<undefined, VoteData>(identifier, 'GET', `vote?id=${id}`);

  /** @ignore */
  public getFullVoteLogs = (identifier: string, id: string = 'default') =>
    this.signedRequest<undefined, VoteLog>(identifier, 'GET', `vote_logs?id=${id}`);

  /** @ignore */
  public rank = <DataType = unknown>(identifier: string, id: string, data: DataType) =>
    this.signedRequest<DataType, RankResponse>(identifier, 'POST', `rank?id=${id || 'default'}`, data);

  /** @ignore */
  public getRank = async <ResponseType = unknown>(identifier: string, id: string = 'default') =>
    this.signedRequest<undefined, ResponseType>(identifier, 'GET', `rank?id=${id}`);

  /** @ignore */
  public deleteRank = <ResponseType = unknown>(identifier: string, id: string = 'default') =>
    this.signedRequest<undefined, ResponseType>(identifier, 'DELETE', `rank?id=${id}`);

  /** @ignore */
  public getJSONStore = <ResponseType = unknown>(identifier: string, id: string = 'default') =>
    this.signedRequest<undefined, ResponseType>(identifier, 'GET', `json_store?id=${id}`);

  /** @ignore */
  public validateCode = <ResponseType = unknown>(identifier: string, code: string) =>
    this.signedRequest<{ pin: string }, ResponseType>(identifier, 'POST', 'validate_pin', { pin: code });

  /** @ignore */
  public pinTokenExists = <ResponseType = unknown>(identifier: string) =>
    this.signedRequest<undefined, ResponseType>(identifier, 'GET', 'pin_token_exists');

  /** @ignore */
  public revokeAllPINCodes = <ResponseType = unknown>(identifier: string) =>
    this.signedRequest<undefined, ResponseType>(identifier, 'DELETE', 'pin');

  /** @ignore */
  public getEligibleCodes = (identifier: string) =>
    this.signedRequest<undefined, EligibleCodes>(identifier, 'GET', 'codes/eligible');

  /** @ignore */
  public getRedeemedCodes = (identifier: string) =>
    this.signedRequest<undefined, RedeemedCodes>(identifier, 'GET', 'codes/redeemed');

  /** @ignore */
  public redeemCode = (identifier: string, prizeIndex: number) =>
    this.signedRequest<{ all_prizes: number }, RedeemResult>(identifier, 'POST', 'codes/redeem', {
      all_prizes: prizeIndex
    });

  /** @ignore */
  public getExtensionUsers = (identifier: string, cursor: string) =>
    this.signedRequest<undefined, ExtensionUsersResult>(identifier, 'GET', `user_ids?cursor=${cursor || 0}`);

  /** @ignore */
  public joinExtensionTriviaTeam = (identifier: string) => this.signedRequest(identifier, 'POST', 'team_membership');

  /** @ignore */
  public getExtensionTriviaJoinedTeam = (identifier: string) =>
    this.signedRequest<undefined, TriviaTeam>(identifier, 'GET', 'team_membership');

  /** @ignore */
  public addExtensionTriviaQuestion = (
    identifier: string,
    triviaQuestion: TriviaQuestion
  ): Promise<Record<string, unknown>> =>
    this.signedRequest<TriviaQuestion, Record<string, unknown>>(
      identifier,
      'POST',
      'curated_poll_edit',
      triviaQuestion
    );

  /** @ignore */
  public removeExtensionTriviaQuestion = (
    identifier: string,
    triviaQuestionID: string
  ): Promise<Record<string, unknown>> =>
    this.signedRequest<{ id: string }, Record<string, unknown>>(identifier, 'DELETE', 'curated_poll_edit', {
      id: triviaQuestionID
    });

  /** @ignore */
  public addExtensionTriviaOptionToQuestion = (identifier: string, questionID: string, option: TriviaOption) =>
    this.signedRequest<{ id: string; option: TriviaOption }, TriviaQuestion>(
      identifier,
      'POST',
      'curated_poll_edit_option',
      { id: questionID, option }
    );

  /** @ignore */
  public removeExtensionTriviaOptionFromQuestion = (identifier: string, questionID: string, optionID: string) =>
    this.signedRequest<{ question: string; option: string }, TriviaQuestion>(
      identifier,
      'DELETE',
      'curated_poll_edit_option',
      { question: questionID, option: optionID }
    );

  /** @ignore */
  public setExtensionTriviaQuestionState = (
    identifier: string,
    questionID: string,
    state: TriviaQuestionState,
    winner: string
  ) =>
    this.signedRequest<{ transition: TriviaQuestionState; winner: string }, TriviaStateResponse>(
      identifier,
      'POST',
      `curated_poll_state?id=${questionID}`,
      { transition: state, winner }
    );

  /** @ignore */
  public setExtensionTriviaQuestionVote = (
    identifier: string,
    questionID: string,
    optionID: string
  ): Promise<Record<string, unknown>> =>
    this.signedRequest<{ question_id: string; vote: string }, Record<string, unknown>>(
      identifier,
      'POST',
      'curated_poll',
      { question_id: questionID, vote: optionID }
    );

  /** @ignore */
  public getExtensionTriviaQuestions = (identifier: string) =>
    this.signedRequest<undefined, TriviaQuestionResponse>(identifier, 'GET', 'curated_poll');

  /** @ignore */
  public getExtensionTriviaQuestion = (identifier: string, questionID: string) =>
    this.signedRequest<undefined, TriviaQuestion>(identifier, 'GET', `curated_poll?id=${questionID}`);

  /** @ignore */
  public getExtensionTriviaLeaderboard = (identifer: string) =>
    this.signedRequest<undefined, TriviaLeaderboard>(identifer, 'GET', 'curated_poll_leaderboard');

  /** @ignore */
  public sendTransactionToServer = (identifier: string, tx: Transaction) =>
    this.signedRequest<Transaction, Record<string, unknown>>(identifier, 'POST', 'bits/transactions', tx);
}

export default StateClient;

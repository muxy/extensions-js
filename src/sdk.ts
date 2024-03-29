/**
 * @module SDK
 */

import { consolePrint, CurrentEnvironment, eventPatternMatch, forceType } from './util';

import Analytics from './analytics';
import { DebugOptions } from './debug';
import { CallbackHandle, Messenger, MessageEnvelope, ListenCallback } from './messenger';
import mxy from './muxy';
import Observer from './observer';
import StateClient from './state-client';
import { ContextUpdateCallbackHandle, HighlightChangedCallbackHandle, Position, TwitchContext } from './twitch';
import Ext from './twitch-ext';
import User, { UserUpdateCallbackHandle } from './user';
import Util from './util';

import type { AccumulateData } from './types/accumulate';
import type { EligibleCodes, RedeemedCodes, RedeemResult } from './types/codes';
import type { Product, PurchaseClient, Transaction, TransactionResponse } from './types/purchases';
import type { RankData, RankResponse } from './types/rank';
import type { AllState } from './types/state';
import type {
  TriviaLeaderboard,
  TriviaOption,
  TriviaQuestion,
  TriviaQuestionResponse,
  TriviaQuestionState,
  TriviaStateResponse,
  TriviaTeam
} from './types/trivia';
import type { ExtensionUsersResult } from './types/user';
import type { VoteData, VoteLog } from './types/vote';

type ExtensionAnchor = 'component' | 'panel' | 'video_overlay';
type ExtensionMode = 'config' | 'dashboard' | 'viewer';
type ExtensionPlatform = 'web' | 'mobile';
type ExtensionState =
  | 'testing'
  | 'hosted_test'
  | 'approved'
  | 'released'
  | 'ready_for_review'
  | 'in_review'
  | 'pending_action'
  | 'uploading';

/**
 * The Muxy Extensions SDK, used to communicate with Muxy's Extension Backend Service.
 *
 * Instances of this class created through the global `Muxy` object can be used to easily
 * interact with Muxy's Extension Backend Service. It includes functionality to aggregate
 * and persist user data, set extension configuration, send analytics events and authenticate
 * broadcasters across servers and applications.
 *
 * To begin using the SDK, create a new instance by calling `const sdk = Muxy.SDK()`.
 *
 * **Note for Overlay App Developers:**
 * An instance of the Muxy SDK is automatically created for you that is namespaced to your
 * app id. You can access it in any app that imports AppMixin as `this.muxy.<method>`. The
 * methods described below behave similarly to how they would in an extension context, however
 * all data is exclusive to your app. Differences are noted in the comments to the individual
 * methods.
 */
export default class SDK {
  public loadPromise: Promise<void>;
  public identifier: string;
  public client: StateClient;
  public analytics: Analytics;
  public messenger: Messenger;
  public user: User;
  public SKUs: object[];
  public timeOffset: number;
  public purchaseClient: PurchaseClient;
  public debug: DebugOptions;
  public userObservers: Observer<User>;
  public contextObservers: Observer<TwitchContext>;
  public highlightObservers: Observer<boolean>;

  public anchor?: ExtensionAnchor;
  public mode?: ExtensionMode;
  public platform?: ExtensionPlatform;
  public popout?: boolean;
  public state?: ExtensionState;

  /** @ignore */
  constructor(id?: string) {
    if (!mxy.setupCalled) {
      throw new Error('Muxy.setup() must be called before creating a new SDK instance');
    }

    const identifier = id || mxy.twitchClientID;
    if (!identifier) {
      return null;
    }

    if (!mxy.watchingAuth) {
      mxy.watchingAuth = true;
      mxy.watchAuth(identifier);
    }

    if (!mxy.SDKClients[identifier]) {
      this.setup(
        identifier,
        mxy.client,
        mxy.user,
        mxy.messenger,
        mxy.purchaseClient,
        mxy.analytics,
        mxy.loadPromise,
        mxy.SKUs,
        mxy.debugOptions
      );

      mxy.SDKClients[identifier] = this;
    }

    return mxy.SDKClients[identifier];
  }

  /**
   * Returns a Promise that will resolve once this SDK instance is ready for use.
   * Will reject if an error occurs communicating with the backend server.
   * @since 1.0.0
   *
   * @return {Promise}
   *
   * @example
   * const sdk = new Muxy.SDK();
   * sdk.loaded().then(() => {
   *   sdk.send('Hello World');
   * }).catch((err) => {
   *   console.error(err);
   * });
   */
  public loaded(): Promise<void> {
    return this.loadPromise;
  }

  /**
   * Starts the debug helix token flow. This will throw if
   * .debug() has not been called.
   *
   * @since 2.4.16
   *
   * @example
   * const client = new Muxy.TwitchClient();
   *
   * // When testing the extension, outside of twitch, the following
   * // request will not work, since no helixToken is returned from the
   * // testing auth system.
   * client.signedTwitchHelixRequest(..., sdk.user.helixToken);
   *
   * // Opens a new window to go through the helix token flow.
   * sdk.beginDebugHelixTokenFlow()
   *
   * // After going through the helix flow, then signedTwitchHelixRequest
   * // call will work
   * client.signedTwitchHelixRequest(..., sdk.user.helixToken);
   */
  public beginDebugHelixTokenFlow() {
    mxy.beginDebugHelixTokenFlow();
  }

  /**
   * Updates the internally stored user object with the provided value.
   * Also calls any stored user update callbacks with the new user object.
   * @since 1.5
   *
   * @example
   * const sdk = new Muxy.SDK();
   * sdk.loaded().then(() => {
   *   sdk.updateUser({<user object>});
   * });
   */
  public updateUser(user: User) {
    this.user = user;
    this.userObservers.notify(user);
  }

  /**
   * Registers a new callback for when the current user's info is updated.
   */
  public onUserUpdate(callback: (user: User) => void): UserUpdateCallbackHandle {
    const handler = new UserUpdateCallbackHandle(callback);
    this.userObservers.register(handler);
    return handler;
  }

  /**
   * Registers a new callback for when the context is updated.
   */
  public onContextUpdate(callback: (context: TwitchContext) => void): ContextUpdateCallbackHandle {
    const handler = new ContextUpdateCallbackHandle(callback);
    this.contextObservers.register(handler);
    return handler;
  }

  /**
   * Registers a new callback for when the highlight is updated.
   */
  public onHighlightChanged(callback: (isHighlighted: boolean) => void): HighlightChangedCallbackHandle {
    const handler = new HighlightChangedCallbackHandle(callback);
    this.highlightObservers.register(handler);
    return handler;
  }

  /**
   * Returns a date object that is based on the Muxy server time.
   * This method only returns valid results after .loaded() resolves.
   *
   * @return {Date}
   */
  public getOffsetDate(): Date {
    return new Date(new Date().getTime() + this.timeOffset);
  }

  /**
   * Returns a promise to get the user object. This automatically
   * waits for .loaded() to resolve.
   */
  public getUser(): Promise<User> {
    return this.loaded().then(() => {
      return Promise.resolve(this.user);
    });
  }

  /**
   * Invokes a request to the backend.
   */
  public signedRequest<DataType = unknown, ResponseType = unknown>(method, endpoint, data) {
    return this.client.signedRequest<DataType, ResponseType>(this.identifier, method, endpoint, data);
  }

  /**
   * Data Accumulation
   */

  /**
   * Fetches the accumulated user data for a given id received by the backend since start.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if accumulationID is not a string.
   *
   * @param {string} accumulationID - The identifier of the accumulated data to fetch.
   * @param {number} start - A Unix timestamp in milliseconds of the earliest accumulation
   * record to fetch.
   *
   * @return {Promise<AccumulateData>} Resolves with requested accumulation data on
   * server response.
   *
   * @example
   * const oneMinuteAgo = (new Date().getTime()) - (1000 * 60);
   * sdk.getAccumulation('awesomeness_level', oneMinuteAgo).then((resp) => {
   *   console.log(`${resp.data.length}: ${resp.latest}`);
   *   console.log(resp.data); // A list of all accumulate values since oneMinuteAgo.
   * });
   */
  public getAccumulateData(accumulationID: string, start: number): Promise<AccumulateData> {
    forceType(accumulationID, 'string');
    return this.client.getAccumulation(this.identifier, accumulationID, start);
  }

  /**
   * @deprecated Use getAccumulateData instead.
   */
  public getAccumulation(accumulationID, start) {
    return this.getAccumulateData(accumulationID, start);
  }

  /**
   * Sends data to be accumulated by the server.
   * @since 1.0.0
   *
   * @param {string} accumulationID - The identifier that this datum is accumulated with.
   * @param {DataType} data - Any JSON serializable JavaScript object.
   *
   * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.accumulate('awesomeness_level', {
   *   awesomeness_level: {
   *     great: 10,
   *     good: 2.5,
   *     poor: 'dank'
   *   }
   * });
   */
  public accumulate<DataType = unknown, ResponseType = unknown>(
    accumulationID: string,
    data: DataType
  ): Promise<ResponseType> {
    forceType(accumulationID, 'string');
    return this.client.accumulate<DataType, ResponseType>(this.identifier, accumulationID, data);
  }

  /**
   * User Voting
   */

  /**
   * Fetches the current stored vote data for a given vote identifier.
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if voteID is not a string.
   *
   * @param {string} voteID - The identifer to fetch associated vote data.
   *
   * @return {Promise<VoteData>} Resolves with requested vote data on server response. Rejects on
   * server error.
   *
   * @example
   * sdk.getVoteData('poll-number-1').then((voteData) => {
   *   console.log(voteData.sum);
   * });
   */
  public getVoteData(voteID: string): Promise<VoteData> {
    forceType(voteID, 'string');
    return this.client.getVotes(this.identifier, voteID);
  }

  /**
   * Gets the vote logs for a given vote ID. This endpoint may only be called by
   * an admin.
   *
   * @async
   * @param voteID - the identifier to fetch the vote logs for.
   * @return {Promise<VoteLog>} Resolves with the logs on server response. Rejects on server error.
   *
   * @example
   * const sdk = new Muxy.SDK();
   * sdk.getFullVoteLogs('global-12345').then((logs) => {
   *   const audit = logs.result;
   *
   *   // ... process the audit logs ...
   *   const valueToUsersMapping = {};
   *   for (const i = 0; i < audit.length; ++i) {
   *     const value = audit[i].value;
   *     const identifier = audit[i].identifier;
   *
   *     const list = valueToUsersMapping[value] || [];
   *     list.append(identifier);
   *
   *     valueToUsersMapping[value] = list;
   *   }
   * });
   */
  public getFullVoteLogs(voteID: string): Promise<VoteLog> {
    forceType(voteID, 'string');
    return this.client.getFullVoteLogs(this.identifier, voteID);
  }

  /**
   * Submit a user vote associated with a vote identifier.
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if `voteID` is not a string or if `value` is not
   * a Number.
   *
   * @param {string} voteID - The identifer to fetch associated vote data.
   * @param {number} value - Any numeric value to represent this user's vote. Note that only
   * values of 0-5 will be included in the `specific` field returned from `getVoteData`.
   * @param {number} count - The "multiplier" of this vote. Must be <= 30.
   *
   * @return {Promise} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.vote('poll-number-1', 1);
   */
  public vote(voteID: string, value: number, count: number = 1): Promise<VoteData> {
    return this.client.vote(this.identifier, voteID, { value, count });
  }

  /**
   * User Ranking
   */

  /**
   * Fetches the current ranked data associated with the rank identifier.
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if rankID is not a string.
   *
   * @param {string} rankID - The identifier to fetch associated rank data.
   *
   * @return {Promise<RankData>} Resolves with requested rank data on server response. Rejects
   * on server error.
   *
   * @example
   * sdk.getRankData('favorite_color').then((colors) => {
   *   if (colors.length > 0) {
   *     colors.forEach((color) => {
   *       console.log(`${color.key}: ${color.score}`);
   *     });
   *   }
   * });
   */
  public getRankData(rankID: string): Promise<RankData> {
    forceType(rankID, 'string');
    return new Promise((accept, reject) => {
      this.client
        .getRank(this.identifier, rankID)
        .then((data: RankData) => {
          accept(data);
        })
        .catch(reject);
    });
  }

  /**
   * Submit user rank data associated with a rank identifier.
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if rankID or value are not strings.
   *
   * @param {string} rankID - The identifer to fetch associated rank data.
   * @param {string} value - Any string value to represent this user's rank data. Will be returned
   * as the `key` field when rank data is requested.
   *
   * @return {Promise<RankResponse>} Will resolve on success. Rejects on failure.
   *
   * @example
   * const usersFavoriteColor = 'rebeccapurple';
   * this.muxy.rank('favorite_color', usersFavoriteColor);
   */
  public rank(rankID: string, value: string): Promise<RankResponse> {
    forceType(rankID, 'string');
    forceType(value, 'string');

    return this.client.rank(this.identifier, rankID, { key: value });
  }

  /**
   * Clear all rank data associated with the rank identifier.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if rankID is not a string.
   *
   * @param {string} rankID - The identifer to fetch associated rank data.
   *
   * @return {Promise<ResponseType>} Will resolve on success. Rejects on failure.
   */
  public clearRankData(rankID: string): Promise<ResponseType> {
    forceType(rankID, 'string');
    return this.client.deleteRank<ResponseType>(this.identifier, rankID);
  }

  /**
   * @deprecated Deprecated in 1.0.0. Use getRankData instead.
   */
  public getRankingData(rankID) {
    return this.getRankData(rankID);
  }

  /**
   * @deprecated Deprecated in 1.0.0. Use clearRankData instead.
   */
  public clearRanking(rankID) {
    return this.clearRanking(rankID);
  }

  /**
   * Server Config
   */

  /**
   * Sets the server channel config to a JS object. Future calls to {@link getConfig} or {@link getChannelConfig} by **any**
   * user on this channel will have a clone of this object in the `channel` field.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @param {DataType} config - A complete JS object representing the current server config.
   *
   * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.setChannelConfig({
   *   kappa_outdated: true,
   *   kreygasm_overrated: true,
   *   waited_duration: "long",
   *   jebait_timing: "now"
   * }).then(() => {
   *   // Let viewers know that new channel config is available.
   * }).catch((err) => {
   *   console.error(`Failed saving channel config: ${err}`);
   * });
   */
  public setChannelConfig<DataType = unknown, ResponseType = unknown>(config: DataType): Promise<ResponseType> {
    return this.client.setChannelConfig<DataType, ResponseType>(this.identifier, config);
  }

  /**
   * Sets the server extension config to a JS object. Future calls to {@link getConfig} or {@link getExtensionConfig} by **any**
   * user on this channel will have a clone of this object in the `extension` field.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @param {DataType} config - A complete JS object representing the current server config.
   *
   * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.setExtensionConfig({
   *   kappa_outdated: true,
   *   kreygasm_overrated: true,
   *   waited_duration: "long",
   *   jebait_timing: "now"
   * }).then(() => {
   *   // Let viewers know that new extension config is available.
   * }).catch((err) => {
   *   console.error(`Failed saving extension config: ${err}`);
   * });
   */
  public setExtensionConfig<DataType = unknown, ResponseType = unknown>(config: DataType): Promise<ResponseType> {
    return this.client.setExtensionConfig<DataType, ResponseType>(this.identifier, config);
  }

  /**
   * Applies a set of patches to channel config state.
   * This method requires a mapping of user_id to objects. The provided config
   * objects per user are merged server-side.
   *
   * This method requires an admin context.
   * @async
   * @param channelConfigs - a mapping of channelID to patch objects.
   *
   * @return {Promise} Will resolve on successful setting of config. Rejects on failure.
   *
   * @example
   * sdk.patchChannelConfig(
   * '12422': { 'foo': 'bar' }
   * );
   */
  public patchChannelConfig<DataType = unknown, ResponseType = unknown>(
    channelConfigs: DataType
  ): Promise<ResponseType> {
    return this.client.patchChannelConfig<DataType, ResponseType>(this.identifier, channelConfigs);
  }

  /**
   * Returns the current channel and extension config objects
   * @async
   *
   * @return {Promise<ResponseType>} Resolves on successful server request with an object populated with channel and extension config objects.
   */
  public getConfig<ResponseType = unknown>(): Promise<ResponseType> {
    return this.client.getConfig<ResponseType>(this.identifier);
  }

  /**
   * Returns the current channel config object
   * @async
   *
   * @return {Promise<ResponseType>} Resolves on successful server request with a populated channel config object.
   */
  public getChannelConfig<ResponseType = unknown>(): Promise<ResponseType> {
    return this.client.getChannelConfig<ResponseType>(this.identifier);
  }

  /**
   * Returns the current extension config object
   * @async
   *
   * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension config object.
   */
  public getExtensionConfig<ResponseType = unknown>(): Promise<ResponseType> {
    return this.client.getExtensionConfig<ResponseType>(this.identifier);
  }

  /**
   * User State
   */

  /**
   * Sets the channel specific viewer-specific state to a JS object, this can be called by
   * any viewer.
   * Future calls to {@link getAllState} by **this** user will have a clone of this object in the
   * `viewer` field.
   * @async
   * @since 1.0.0
   *
   * @param {DataType} state - A complete JS object representing the current viewer state.
   *
   * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.setViewerState({
   *   favorite_movie: 'Jaws: The Revenge'
   * }).then(() => {
   *   console.log('Viewer state saved!');
   * }).catch((err) => {
   *   console.error(`Failed saving viewer state: ${err}`);
   * });
   */
  public setViewerState<DataType = unknown, ResponseType = unknown>(state: DataType): Promise<ResponseType> {
    return this.client.setViewerState<DataType, ResponseType>(this.identifier, state);
  }

  /**
   * Sets the extension wide viewer-specific state to a JS object, this is only a valid call for a
   * user that has shared their identity.
   * Future calls to {@link getAllState} by **this** user will have a clone of this object in the
   * `extension_viewer` field.
   * @async
   * @since 1.1.0
   *
   * @param {DataType} state - A complete JS object representing the current viewer state.
   *
   * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.setExtensionViewerState({
   *   favorite_movie: 'Jaws: The Revenge'
   * }).then(() => {
   *   console.log('Viewer state saved!');
   * }).catch((err) => {
   *   console.error(`Failed saving viewer state: ${err}`);
   * });
   */
  public setExtensionViewerState<DataType = unknown, ResponseType = unknown>(state: DataType): Promise<ResponseType> {
    return this.client.setExtensionViewerState<DataType, ResponseType>(this.identifier, state);
  }

  /**
   * Applies a set of patches to multiple extension-wide viewer-specific states.
   * This method requires a mapping of user_id to objects. The provided state
   * objects per user are merged server-side. A key may be specified to be 'null'
   * to delete the key on the server. Arrays are overwritten in their entirety on merge.
   * Objects are merged recursively.
   *
   * This method can only set state for viewers who have shared their ID.
   *
   * This method requires an admin context.
   * @async
   * @param userStates - a mapping of userID to patch objects.
   *
   * @return {Promise} Will resolve on successful setting of state. Rejects on failure.
   *
   * @example
   * sdk.patchExtensionViewerState({
   *  '12452': { 'hello': 'world' },
   *  '12422': { 'foo': 'bar' }
   * });
   */
  public patchExtensionViewerState<DataType = unknown, ResponseType = unknown>(
    userStates: DataType
  ): Promise<ResponseType> {
    return this.client.patchExtensionViewerState<DataType, ResponseType>(this.identifier, userStates);
  }

  /**
   * Sets the extension wide state to a JS object, this may only be called in a broadcaster context
   * for the extension owner. Extension owner may be configured through the development portal.
   * Future calls to {@link getAllState} by all users will have a clone of this object in the
   * `extension` field.
   * @async
   * @since 1.1.0
   *
   * @param {DataType} state - A complete JS object representing the current extension's state.
   *
   * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.setExtensionState({
   *   favorite_movie: 'Jaws: The Revenge'
   * }).then(() => {
   *   console.log('Extension state saved!');
   * }).catch((err) => {
   *   console.error(`Failed saving viewer state: ${err}`);
   * });
   */
  public setExtensionState<DataType = unknown, ResponseType = unknown>(state: DataType): Promise<ResponseType> {
    return this.client.setExtensionState<DataType, ResponseType>(this.identifier, state);
  }

  /**
   * Sets the extension-wide secret state to a JS object, this may only be called by an extension
   * owner. This state object will never be returned to the broadcaster or viewers.
   * @async
   * @since 2.0.0
   *
   * @param {DataType} state - A complete JS object
   *
   * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.setExtensionSecretState({
   *   favorite_movie: 'Twilight: New Moon'
   * }).then(() => {
   *   console.log('Extension secrets saved!');
   * }).catch((err) => {
   *   console.error(`Failed saving secret state: ${err}`);
   * });
   */
  public setExtensionSecretState<DataType = unknown, ResponseType = unknown>(state: DataType): Promise<ResponseType> {
    return this.client.setExtensionSecretState<DataType, ResponseType>(this.identifier, state);
  }

  /**
   * Sets the channel-specific state to a JS object. Future calls to {@link getAllState} by **any**
   * user on this channel will have a clone of this object in the `channel` field.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @param {DataType} state - A complete JS object representing the current channel state.
   *
   * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.setChannelState({
   *   broadcasters_mood: 'sanguine, my brother',
   *   chats_mood: 'kreygasm'
   * }).then(() => {
   *   // Let viewers know that new channel state is available.
   * }).catch((err) => {
   *   console.error(`Failed saving channel state: ${err}`);
   * });
   */
  public setChannelState<DataType = unknown, ResponseType = unknown>(state: DataType): Promise<ResponseType> {
    return this.client.setChannelState<DataType, ResponseType>(this.identifier, state);
  }

  /**
   * Returns the current state object as set for the current extension, channel and
   * viewer combination.
   * @async
   * @since 1.0.0
   *
   * @return {Promise<AllState>} Resolves on successful server request with a populated AllState
   * object.
   *
   * @example
   * sdk.getAllState().then((state) => {
   *   if (state.channel.broadcasters_mood) {
   *     console.log(`Broadcaster set their mood as: ${state.channel.broadcasters_mood}`);
   *   }
   *   if (state.viewer.favorite_movie) {
   *     console.log(`But your favorite movie is: ${state.viewer.favorite_movie}`);
   *   }
   * });
   */
  public getAllState(): Promise<AllState> {
    return this.client.getState(this.identifier);
  }

  /**
   * Returns the current extension state object
   * @async
   *
   * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension state object.
   */
  public getExtensionState<ResponseType = unknown>(): Promise<ResponseType> {
    return this.client.getExtensionState(this.identifier);
  }

  /**
   * Returns the current channel state object
   * @async
   *
   * @return {Promise<ResponseType>} Resolves on successful server request with a populated channel state object.
   */
  public getChannelState<ResponseType = unknown>(): Promise<ResponseType> {
    return this.client.getChannelState<ResponseType>(this.identifier);
  }

  /**
   * Returns the current extension viewer state object
   * @async
   *
   * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension viewer state object.
   */
  public getExtensionViewerState<ResponseType = unknown>(): Promise<ResponseType> {
    return this.client.getExtensionViewerState<ResponseType>(this.identifier);
  }

  /**
   * Returns the current viewer state object
   * @async
   *
   * @return {Promise<ResponseType>} Resolves on successful server request with a populated viewer state object.
   */
  public getViewerState<ResponseType = unknown>(): Promise<ResponseType> {
    return this.client.getViewerState<ResponseType>(this.identifier);
  }

  /**
   * Returns the current extension secret state if the requesting user has access to the secret state.
   * @async
   *
   * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension secret state object.
   */
  public getExtensionSecretState<ResponseType = unknown>(): Promise<ResponseType> {
    return this.client.getExtensionSecretState<ResponseType>(this.identifier);
  }

  /**
   * Returns a mapping of user_id to extension specific viewer states.
   * If a viewer doesn't have state set, but was requested, that user will
   * not be in the response object. The maximum number of users that can be
   * queried with this call is 1000.
   * @async
   *
   * @param users - an array of userIDs to request state for.
   *
   * @return {Promise<ResponseType>} Resolves on successful server request with an object that is a mapping
   *  of userID to state. Rejects on failure.
   *
   * @example
   * sdk.patchExtensionViewerState({
   *  'valid-user-id': {
   *    'hello': 'world'
   *  }
   * }).then(() => {
   *  sdk.multiGetExtensionViewerState(['valid-user-id', 'invalid-user-id']).then(state => {
   *    console.log(state['valid-user-id'].hello) // prints 'world'
   *    console.log(state['invalid-user-id']) // is undefined.
   *  });
   * }
   */
  public multiGetExtensionViewerState<ResponseType = unknown>(users: string[]): Promise<ResponseType> {
    if (users.length > 1000) {
      throw new Error('Too many users specified in call to multiGetExtensionViewerState');
    }

    return this.client.multiGetExtensionViewerState<ResponseType>(this.identifier, users);
  }

  /**
   * JSON Store
   */

  /**
   * The JSON store is used similarly to the channel state, in that a broadcaster can use it to
   * store arbitrary JSON data that is accessible to all viewers. The stored data is specific to
   * a particular channel and cannot be accessed by viewers of a different channel.
   *
   * Unlike channel state however, each channel can have several JSON stores, accessed by different
   * keys. The data associated with each key must be under 2KB, but there is no limit to the number
   * of keys in use.
   *
   * Also, when pushing new data to the JSON store, a messenger event is automatically sent to all
   * active viewers of the associated channel and the broadcaster's live and config pages. This
   * event will have the format `json_store_update:${key}`. See {@link listen} for details on
   * receiving this event.
   *
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if key is provided but is not a string.
   *
   * @param {string?} key - The lookup key for data in the JSON store. Uses 'default' if no value
   * is provided.
   *
   * @return {Promise<ResponseType>} Resolves with the stored JSON parsed to a JS Object associated with
   * the key. Rejects on server error or if the key has no associated data.
   *
   * @example
   * sdk.getJSONStore('basecamp').then((basecamp) => {
   *   if (basecamp && basecamp.tanks) {
   *     deploy(basecamp.tanks);
   *   }
   * });
   */
  public getJSONStore<ResponseType = unknown>(key?: string): Promise<ResponseType> {
    if (key) {
      forceType(key, 'string');
    }

    return this.client.getJSONStore<ResponseType>(this.identifier, key);
  }

  /**
   * Two-Factor Auth
   */

  /**
   * Attempts to validate a broadcaster's PIN with Muxy's Two-Factor auth system. For this to work,
   * the broadcaster must have initiated a Two-Factor request for this channel within the auth
   * window.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if `pin` is not a string.
   *
   * @param {string} pin - The broadcaster's PIN to validate the associated auth token.
   *
   * @return {Promise} Resolves if the auth token associated with this PIN can now be used to make
   * requests on behalf of this broadcaster, rejects with an error otherwise.
   *
   * @example
   * sdk.validateCode('MUXY').then(() => {
   *   console.log('Validated! Go go go!');
   * });
   */
  public validateCode(pin: string) {
    forceType(pin, 'string');
    return this.client.validateCode(this.identifier, pin);
  }

  /**
   * Checks to see if the broadcaster has validated an auth token in the current context. It does
   * not return information about the PIN used or auth token that is valid.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @return {Promise<ResponseType>}
   * @property {boolean} exists - True if an auth token has been validated, false otherwise.
   *
   * @example
   * sdk.pinTokenExists().then((resp) => {
   *   if (!resp.exists) {
   *     showBroadcasterPINInput();
   *   } else {
   *     console.log('Already authorized');
   *   }
   * });
   */
  public pinTokenExists<ResponseType = unknown>() {
    return this.client.pinTokenExists<ResponseType>(this.identifier);
  }

  /**
   * Revokes all auth tokens ever generated for this channel and identifier. After calling this
   * method, tokens currently in use by external apps will cease to function.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @return {Promise} Resolves on success, rejects with an error otherwise.
   *
   * @example
   * sdk.revokeAllPINCodes().then(() => {
   *   console.log('No more data coming in!');
   * });
   */
  public revokeAllPINCodes() {
    return this.client.revokeAllPINCodes(this.identifier);
  }

  /**
   * Event System
   */

  /**
   * Sends a message to all listening clients. And viewers or broadcasters listening for the
   * event name will be automatically notified. See {@link listen} for receiving events.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @param {string} event - An event name, in the form [a-z0-9_]+
   * @param {string|*} userID - An optional opaque user id, used to limit the
   * scope of send to that user only.
   * @param {*} [data] - Any JSON serializable primitive to send to all viewers.
   *
   * @example
   * sdk.send('new_song', {
   *   artist: 'Celine Dion',
   *   title: 'My Heart Will Go On',
   *   album: 'Let\'s Talk About Love',
   *   year: 1997
   * });
   */
  public send(event: string, userID: string | unknown, data?: unknown) {
    if (!mxy.didLoad) {
      throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
    }

    forceType(event, 'string');
    let target = 'broadcast';
    let realData = data;

    if (!data) {
      realData = userID;
    } else {
      target = `whisper-${userID}`;
    }

    this.messenger.send(this.identifier, event, target, realData, this.client);
  }

  /**
   * Registers a callback to listen for events. In general, events are named in the form
   * `event[:identifier]`, where the identifier is the `event` parameter to {@link send}.
   *
   * You can listen to wildcards by using * instead of an event or identifier name.
   *
   * Some methods also automatically send special namespaced events. See {@link vote} and
   * {@link getJSONStore} for examples.
   *
   * You can listen for these events by using `vote_update:next_game` or `vote_update:*`
   * to receive vote updates for specifically the `next_game` vote id, or all vote
   * updates respectively.
   *
   * @since 1.0.0
   *
   * @param {string} inEvent - The event name to listen on. May include wildcards `*`.
   * @param {string|Function} inUserID - An optional opaque user id, used to limit
   * the scope of this listen to that user only.
   * @param {Function} [inCallback] - A callback with the signature `function(body, eventName)`.
   * This callback will receive the message body as its first parameter and the `event` parameter
   * to {@link send} as the second.
   *
   * @return {CallbackHandle} A listener handle that can be passed to {@see unlisten} to unbind
   * this callback.
   *
   * @example
   * sdk.listen('new_song', (track) => {
   *   console.log(`${track.artist} - {track.title} (${track.year})`);
   * });
   */
  public listen<Payload>(
    inEvent: string,
    inUserID: string | ListenCallback<Payload>,
    inCallback?: ListenCallback<Payload>
  ): CallbackHandle {
    if (!mxy.didLoad) {
      throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
    }

    const realEvent = `${CurrentEnvironment().environment}:${this.identifier}:${inEvent}`;

    let l = 'broadcast';
    let callback = inCallback;
    if (callback) {
      l = `whisper-${inUserID}`;
    } else if (inUserID instanceof Function) {
      callback = inUserID;
    }

    let messageBuffer = [];

    const cb = (msg: MessageEnvelope<Payload>) => {
      try {
        // Production messages may be unprefixed.
        if (CurrentEnvironment().environment === 'production') {
          if (eventPatternMatch(msg.event, `${this.identifier}:${inEvent}`)) {
            const truncatedEvent = msg.event.split(':').slice(1).join(':');
            callback(msg.data, truncatedEvent);
            return;
          }
        }

        if (eventPatternMatch(msg.event, realEvent)) {
          // Consumers of the SDK only ever interact with events
          // without the app-id or extension-id prefix.
          const truncatedEvent = msg.event.split(':').slice(2).join(':');

          const serialized = JSON.stringify(msg);
          const now = new Date().valueOf();
          let deduped = false;

          messageBuffer.forEach(b => {
            if (b.content === serialized) {
              if (now - b.timestamp < 5 * 1000) {
                deduped = true;
              }
            }
          });

          if (deduped) {
            return;
          }

          messageBuffer.unshift({
            content: serialized,
            timestamp: now
          });

          messageBuffer = messageBuffer.slice(0, 10);
          callback(msg.data, truncatedEvent);
        }
      } catch (err) {
        // TODO: Should this fail silently?
        consolePrint(err, { type: 'error' });
      }
    };

    return this.messenger.listen(this.identifier, l, cb);
  }

  /**
   * Unbinds a callback from the event system.
   *
   * @since 1.0.0
   *
   * @param {CallbackHandle} handle - An event handle as returned from {@see listen}.
   */
  public unlisten(handle: CallbackHandle) {
    return this.messenger.unlisten(this.identifier, handle);
  }

  /**
   * Transaction System
   */

  /**
   * Calls for a list of products containing a sku, displayName, and cost.
   *
   * @async
   * @since 2.4.0
   *
   * @throws {SDKError} Will throw an error if the MuxySDK didn't load.
   *
   * @return {Promise<[]Product>} Resolves with an array of {@link Product}
   * objects for each available sku.
   *
   * @example
   * const products = await client.getProducts();
   */
  public getProducts(): Promise<Product[]> {
    if (!mxy.didLoad) {
      throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
    }

    return this.purchaseClient.getProducts();
  }

  /**
   * Starts transaction for a specific product identifier.
   *
   * @async
   * @since 2.4.0
   *
   * @throws {SDKError} Will throw an error if the MuxySDK didn't load.
   *
   * @param {string} sku - A product identifier.
   *
   * @example
   * sdk.purchase("XXSKU000");
   */
  public purchase(sku: string) {
    if (!mxy.didLoad) {
      throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
    }

    forceType(sku, 'string');
    this.purchaseClient.purchase(sku);
  }

  /**
   * Sets the callback to be run after a user purchase.
   *
   * @since 2.4.0
   *
   * @throws {SDKError} Will throw an error if the MuxySDK didn't load.
   *
   * @param {function} callback - a function to be run after a purchase transaction.
   *
   * @example
   * sdk.onUserPurchase((transaction) => {
   *   this.message = "Thanks for your purchase!";
   * });
   */
  public onUserPurchase(callback: (tx: Transaction, promise: Promise<TransactionResponse>) => void) {
    if (!mxy.didLoad) {
      throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
    }

    forceType(callback, 'function');
    this.purchaseClient.onUserPurchase(callback);
  }

  /**
   * Sets the callback to be run after a user cancels a purchase.
   *
   * @since 2.4.5
   *
   * @throws {SDKError} Will throw an error if MEDKit isn't loaded.
   *
   * @param {function} callback - a function to be run after a failed transaction.
   *
   * @example
   * sdk.onUserPurchaseCanceled(() => {
   *   this.message = "Changed your mind?";
   * });
   */
  public onUserPurchaseCanceled(callback: () => void) {
    if (!mxy.didLoad) {
      throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
    }

    forceType(callback, 'function');
    this.purchaseClient.onUserPurchaseCanceled(callback);
  }
  /**
   * Analytics
   */

  /**
   * Sends an arbitrary event to the analytics backend.
   *
   * @async
   * @since 1.0.0
   *
   * @param {string} name - A unique identifier for this event.
   * @param {number} [value=1] - A value to associate with this event.
   * @param {string} [label=''] - A human-readable label for this event.
   */
  public sendAnalyticsEvent(name: string, value: number = 1, label: string = '') {
    this.analytics.sendEvent(this.identifier, name, value, label);
  }

  /**
   * Monetization
   */

  /**
   * Begins the purchase flow for a given product's SKU.
   *
   * @param {string} sku - The SKU of the digital good that the user has indicated they want to buy.
   */
  public beginPurchase(sku) {
    if (this.SKUs.length === 0) {
      throw new Error('beginPurchase() cannot be used unless SKUs are provided.');
    }
    forceType(sku, 'string');
    return Ext.beginPurchase(sku);
  }

  /**
   * Gets the current price for each item offered.
   *
   * @async
   *
   * @return {Object} An object with the SKU codes as keys.
   */
  public getPrices() {
    if (this.SKUs.length === 0) {
      throw new Error('getPrices() cannot be used unless SKUs are provided.');
    }
    return new Promise(resolve => {
      Ext.getPrices(prices => {
        resolve(prices);
      });
    });
  }

  /**
   * Sets a function to be used as a callback when entitlements need to be reloaded, i.e. after a
   * purchase has been made.
   *
   * @param {Function} callback - A function to be called to update user entitlements.
   */
  public onReloadEntitlements(callback) {
    if (this.SKUs.length === 0) {
      throw new Error('onReloadEntitlements() cannot be used unless SKUs are provided.');
    }
    return Ext.onReloadEntitlements(callback);
  }

  /**
   * Sets a function to be used as a callback that is triggered when the extension visibility changes
   * (This occurs only for mobile or component extensions.)
   *
   * @param {function} callback
   */
  public onVisibilityChanged(callback: (isVisible: boolean, ctx: TwitchContext) => void): void {
    return Ext.onVisibilityChanged(callback);
  }

  /**
   * Sets a function to be used as a callback that is triggered when the extension changes position in the player
   * This occurs only for video-component extensions.
   *
   * @param {function} callback
   */
  public onPositionChanged(callback: (position: Position) => void): void {
    return Ext.onPositionChanged(callback);
  }

  /**
   * Attempt to exchange one eligibility status for a single prize code.
   * If a code is redeemed, the returned body will have a `code` member, which is the code that was redeemed.
   * @async
   *
   * @throws {TypeError} Will throw an error if prizeIndex is not a valid number
   *
   * @param {number} prize_idx - The prize index
   *
   * @return {Promise<RedeemResult>}
   */
  public redeemCode(prizeIndex: number): Promise<RedeemResult> {
    forceType(prizeIndex, 'number');

    return this.client.redeemCode(this.identifier, prizeIndex);
  }

  /**
   * Fetches all codes that the user has redeemed for this extension.
   * @async
   *
   * @return {Promise<RedeemedCodes>} Will resolve on success. Rejects on failure.
   */
  public getRedeemedCodes(): Promise<RedeemedCodes> {
    return this.client.getRedeemedCodes(this.identifier);
  }

  /**
   * Fetches information about which codes a user is eligible for
   * @async
   *
   * @return {Promise<EligibleCodes>} Will resolve on success. Rejects on failure.
   */
  public getEligibleCodes(): Promise<EligibleCodes> {
    return this.client.getEligibleCodes(this.identifier);
  }

  /**
   * Sets the user's trivia team to the current channel.
   * @async
   *
   * @return {Promise<any>}
   */
  public joinExtensionTriviaTeam(): Promise<any> {
    return this.client.joinExtensionTriviaTeam(this.identifier);
  }

  /**
   * Return the user's stored trivia team.
   * @async
   *
   * @return {Promise<TriviaTeam>}
   */
  public getExtensionTriviaJoinedTeam(): Promise<TriviaTeam> {
    return this.client.getExtensionTriviaJoinedTeam(this.identifier);
  }

  /**
   * Add a trivia question to the extension.
   * Requires extension admin permissions.
   * @async
   *
   * @return {Promise<Record<string, unknown>>}
   */
  public addExtensionTriviaQuestion(question: TriviaQuestion): Promise<Record<string, unknown>> {
    return this.client.addExtensionTriviaQuestion(this.identifier, question);
  }

  /**
   * Removes a trivia question from the extension.
   * Requires extension admin permissions.
   * @async
   *
   * @return {Promise<Record<string, unknown>>}
   */
  public removeExtensionTriviaQuestion(triviaQuestionID: string): Promise<Record<string, unknown>> {
    return this.client.removeExtensionTriviaQuestion(this.identifier, triviaQuestionID);
  }

  /**
   * Add an option to a trivia question.
   * Requires extension admin permissions.
   * @async
   *
   * @return {Promise<any>}
   */
  public addExtensionTriviaOptionToQuestion(questionID: string, option: TriviaOption): Promise<TriviaQuestion> {
    return this.client.addExtensionTriviaOptionToQuestion(this.identifier, questionID, option);
  }

  /**
   * Remove an option from a trivia question.
   * Requires extension admin permissions.
   * @async
   *
   * @return {Promise<TriviaQuestion>}
   */
  public removeExtensionTriviaOptionFromQuestion(questionID: string, optionID: string): Promise<TriviaQuestion> {
    return this.client.removeExtensionTriviaOptionFromQuestion(this.identifier, questionID, optionID);
  }

  /**
   * Change the state of a extension trivia question.
   * Requires extension admin permissions.
   * @async
   *
   * @return {Promise<any>}
   */
  public setExtensionTriviaQuestionState(
    questionID: string,
    state: TriviaQuestionState,
    winner?: string
  ): Promise<TriviaStateResponse> {
    return this.client.setExtensionTriviaQuestionState(this.identifier, questionID, state, winner);
  }

  /**
   * As a user place a vote on a trivia question
   * @async
   *
   * @return {Promise<Record<string, unknown>>}
   */
  public setExtensionTriviaQuestionVote(questionID: string, optionID: string): Promise<Record<string, unknown>> {
    return this.client.setExtensionTriviaQuestionVote(this.identifier, questionID, optionID);
  }

  /**
   * Returns all of the current trivia questions
   * @async
   *
   * @return {Promise<TriviaQuestionResponse>}
   */
  public getExtensionTriviaQuestions(): Promise<TriviaQuestionResponse> {
    return this.client.getExtensionTriviaQuestions(this.identifier);
  }

  /**
   * Get information about a specific trivia question
   * @async
   *
   * @return {Promise<TriviaQuestion>}
   */
  public getExtensionTriviaQuestion(questionID: string): Promise<TriviaQuestion> {
    return this.client.getExtensionTriviaQuestion(this.identifier, questionID);
  }

  /**
   * Return the trivia leaderboard
   * @async
   *
   * @return {Promise<TriviaLeaderboardTeam[]>}
   */
  public getExtensionTriviaLeaderboard(): Promise<TriviaLeaderboard> {
    return this.client.getExtensionTriviaLeaderboard(this.identifier);
  }

  /**
   * Admin-level functionality
   */

  /**
   * Fetches a list of all users who have shared their identity with the extension.
   *
   * This function takes an optional `next` value which should match that returned from previous
   * invocations to iterate through the response. If the returned `next` value is `0`, all
   * available values have been returned and iteration can be stopped.
   *
   * At most 1000 entries will be returned in a single call.
   *
   * Note that because of the asynchronous nature, duplicate entries may be returned and should be
   * uniqued on the client.
   *
   * Admin-only function.
   * @async
   *
   * @return {Promise<ExtensionUsersResult>} Will resolve on success. Rejects on failure.
   */
  public getExtensionUsers(next?: string): Promise<ExtensionUsersResult> {
    return this.client.getExtensionUsers(this.identifier, next);
  }

  /**
   * Private Instance Methods
   */

  /** @ignore */
  private setup(
    identifier: string,
    client: StateClient,
    user: User,
    messenger: Messenger,
    purchaseClient: PurchaseClient,
    analytics: Analytics,
    loadPromise: Promise<void>,
    SKUs: object[],
    debug: DebugOptions
  ) {
    /** @ignore */
    this.userObservers = new Observer<User>();

    /** @ignore */
    this.contextObservers = new Observer<TwitchContext>();

    /** @ignore */
    this.loadPromise = loadPromise;

    /**
     * A unique instance identifier. Either the extension or app ID.
     * @public
     * @type {string}
     */
    this.identifier = identifier;

    /**
     * The backend state client.
     * @private
     * @type {Client}
     *
     */
    this.client = client;

    /**
     * The backend event messenger client.
     * @private
     * @type {Messenger}
     *
     */
    this.messenger = messenger;

    /**
     * The backend transaction client.
     * @private
     * @type {PurchaseClient}
     *
     */
    this.purchaseClient = purchaseClient;

    /**
     * The backend analytics client.
     * @private
     * @type {Analytics}
     *
     */
    this.analytics = analytics;

    /**
     * An automatically updated User instance for the current extension user.
     * This is only valid after .loaded() has resolved.
     * @public
     * @type {User}
     */
    this.user = user;

    /**
     * SKUs associated with the products offered in the extension.
     * @public
     * @type {Object}
     */
    this.SKUs = SKUs;

    /**
     * The type of the anchor in which the extension is activated. Valid only
     * when platform is "web". Valid values: "component", "panel", "video_overlay".
     *
     * @public
     * @type {string}
     */
    this.anchor = Util.getQueryParam('anchor') as ExtensionAnchor;

    /**
     * The extension’s mode. Valid values: "config", "dashboard", "viewer".
     *
     * @public
     * @type {string}
     */
    this.mode = Util.getQueryParam('mode') as ExtensionMode;

    /**
     * The platform on which the Twitch client is running. Valid values: "mobile", "web".
     *
     * @public
     * @type {string}
     */
    this.platform = Util.getQueryParam('platform') as ExtensionPlatform;

    /**
     * Indicates whether the extension is popped out. If true, the extension is running
     * in its own window; otherwise, false.
     *
     * @public
     * @type {boolean}
     */
    this.popout = Util.getQueryParam('popout') === 'true';

    /**
     * The release state of the extension. Valid values: "testing", "hosted_test",
     * "approved", "released", "ready_for_review", "in_review", "pending_action", "uploading".
     *
     * @public
     * @type {string}
     */
    this.state = Util.getQueryParam('state') as ExtensionState;

    /** @ignore */
    this.debug = debug;
  }
}

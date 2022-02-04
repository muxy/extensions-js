/**
 * @module SDK
 */
import Analytics from './analytics';
import { DebugOptions } from './debug';
import { Messenger } from './messenger';
import Observer from './observer';
import StateClient from './state-client';
import { PurchaseClient, Transaction, TransactionResponse } from './purchase-client';
import { ContextUpdateCallbackHandle, HighlightChangedCallbackHandle, Position, TwitchContext } from './twitch';
import User, { UserUpdateCallbackHandle } from './user';
/**
 * The response from {@link getAllState}.
 *
 * @typedef {Object} AllState
 *
 * @property {Object} extension - A state object only settable by the extension itself.
 * Universal for all channels.
 * @property {Object} channel - A state object only settable by a broadcaster. Universal for all
 * viewers of the same channel.
 * @property {Object} viewer - A state object settable by each viewer. Specific to the viewer of
 * a given channel.
 * @property {Object} extension_viewer - A state object settable by each viewer. Specific to the viewer but
 * extension wide.
 */
export interface AllState {
    extension: object;
    channel: object;
    viewer: object;
    extension_viewer: object;
}
/**
 * The response from {@link getAccumulateData}.
 *
 * @typedef {Object} AccumulateData
 *
 * @property {number} latest A Unix timestamp of the most recently posted JSON blob.
 *
 * @property {AccumulatePayload[]} data Array of all JSON blob payloads posted to this identifier.
 */
export interface AccumulateData {
    latest: number;
    data: AccumulatePayload[];
}
/**
 * @typedef {Object} AccumulatePayload
 *
 * @property {number} observed A Unix timestamp of when this payload was received.
 * @property {string} channel_id The id of the channel this payload is associated with
 * (either the viewer was watching the channel, or the app/server was authed with this channel).
 * @property {string} opaque_user_id Twitch's Opaque User ID representing the sender
 * of the payload. This will always be set and can be used with Twitch's pub/sub system to
 * whisper events to a particular viewer.
 * @property {string} user_id If the viewer has chosen to share their identity with the
 * extension, this field will hold the viewer's actual Twitch ID.
 * @property {Object} data The actual JSON blob payload as sent to the accumulate endpoint.
 */
export interface AccumulatePayload {
    observed: number;
    channel_id: string;
    opaque_user_id: string;
    user_id: string;
    data: object;
}
/**
 * The response from {@link getVoteData}.
 *
 * @typedef {Object} VoteData
 *
 * @property {number} count - The total number of votes received for this vote identifier.
 * @property {number} mean - The average of all votes received for this identifier.
 * @property {number[]} specific - The number of votes cast for the specific values [0-4].
 * @property {number} stddev - Approximate standard deviation for all votes received for
 * this identifier.
 * @property {number} sum - The sum of all votes received for this identifier.
 * @property {number} vote - If the user has a vote associated with this identifer, the
 * current value for this user. Not set if no vote has been received.
 */
export interface VoteData {
    count: number;
    mean: number;
    specific: number[];
    stddev: number;
    sum: number;
    vote: number;
}
/**
 * A single vote cast in a poll, returned from {@link getFullVoteLogs}
 *
 * @typedef {Object} VoteLogEntry
 * @property {string} identifier - Either the opaque userID or userID of a user who voted, depending on
 *  the user's user id share status at the time of casting the vote.
 * @property {number} value - The numerical value of the vote cast.
 */
export interface VoteLogEntry {
    identifier: string;
    value: number;
}
/**
 * The response from {@link getFullVoteLogs}
 *
 * @typedef {Object} VoteLog
 * @property {object[]} result - An array of VoteLogEntries that represents the votes cast on a poll.
 */
export interface VoteLog {
    result: VoteLogEntry[];
}
/**
 * The response from {@link getRankData}.
 *
 * @typedef {Object} RankData
 *
 * @property {RankScore[]} data - array of the rank data
 */
export interface RankData {
    data: RankScore[];
}
/**
 *
 * @typedef {Object} RankScore
 *
 * @property {string} key - A single key as sent to the ranking endpoint for this identifier.
 * @property {number} score - The number of users who have sent this `key` for this identifier.
 */
export interface RankScore {
    key: string;
    score: number;
}
/**
 * @typedef {Object} RankResponse
 */
export interface RankResponse {
    accepted: boolean;
    original: string | undefined;
}
/**
 * The response from {@link getEligibleCodes}.
 *
 * @typedef {Object} EligibleCodes
 *
 * @property {Array<number>} eligible - Each integer is the array is how many codes the given user is eligible for.
 * A zero entry in this array means that the user is not eligible for any codes for that prize.
 */
export interface EligibleCodes {
    eligible: number[];
}
/**
 * The response from {@link getRedeemedCodes}.
 *
 * @typedef {Object} RedeemedCodes
 *
 * @property {Array<Array<string>>} redeemed - Each array entry in redeemed represents a prize index.
 * Strings in the sub arrays are the codes the user has redeemed.
 */
export interface RedeemedCodes {
    redeemed: string[][];
}
/**
 * The response from {@link redeemCode}.
 *
 * @typedef {Object} RedeemResult
 *
 * @property {string} code - The code that was redeemed if successful
 * @property {Array<string>} all_prizes - list of all the codes that this user has redeemed for the
 * prize index.
 */
export interface RedeemResult {
    code?: string;
    all_prizes: string[];
}
/**
 * A single entry in the response from {@link getExtensionUsers}.
 *
 * @typedef {Object} ExtensionUser
 *
 * @property {string} twitch_id - The user's Twitch id.
 */
export interface ExtensionUser {
    twitch_id: string;
}
/**
 * The response from {@link getExtensionUsers}.
 *
 * @typedef {Object} ExtensionUsersResult
 *
 * @property {string} next - A cursor to request the next (up-to) 1000 results. A value of `0` means
 * all results have been returned.
 * @property {ExtensionUser[]} results - A list of (up-to) 1000 user IDs who have shared their ID with
 * the extension.
 */
export interface ExtensionUsersResult {
    next: string;
    results: ExtensionUser[];
}
/**
 * Represents a trivia question
 *
 * @property {string} id - The id of the question
 * @property {string} name - The name of the question
 * @property {string} short_name - The name of the question for smaller displays.
 * @property {string} description - A description for the question
 * @property {string} image - A url that hosts an image to show with the question
 * @property {TriviaOption[]} - An array of options that this question has
 * @property {string} state - Current state of the question
 */
export interface TriviaQuestion {
    id: string;
    name: string;
    short_name: string;
    description: string;
    image?: string;
    order?: number;
    options?: TriviaOption[];
    state?: string;
}
/**
 * Represents an option on a trivia question
 *
 * @property {string} id - The id of the option
 * @property {string} name - The name of the option
 * @property {string} short_name - The name of the option for smaller displays.
 * @property {string} description - A description for the option
 * @property {string} image - A url that hosts an image to show with the option
 */
export interface TriviaOption {
    id: string;
    name: string;
    short_name: string;
    description: string;
    image?: string;
    order?: number;
}
/**
 * The response from `getExtensionTriviaJoinedTeam`.
 *
 * @property {string} id - A unique identifier representing this team.
 */
export interface TriviaTeam {
    id: string;
}
export interface TriviaLeaderboard {
    leaderboard: TriviaLeaderboardTeam[];
}
/**
 * Contains scoring info for one trivia team
 *
 * @property {string} team_id - The id of the team
 * @property {number} combined_score - The total score the team has
 * @property {Map<string, TriviaLeaderboardQuestionResults>} questions - A map of scores per question asked
 */
export interface TriviaLeaderboardTeam {
    team_id: string;
    combined_score: number;
    questions: TriviaLeaderboardQuestionResultsMap;
}
export interface TriviaLeaderboardQuestionResultsMap {
    [key: string]: TriviaLeaderboardQuestionResults;
}
/**
 * Shows the score per question on the trivia leaderboard
 *
 * @property {string} question_id - The id of the question
 * @property {boolean} broadcaster_correct - If the Team leader (channel) was correct
 * @property {number} team_participation - Participation of the team 0.0-1.0
 * @property {number} team_participants - Number of team members that voted
 * @property {number} percent_correct - How many members got the question correct 0.0-1.0
 * @property {number} team_votes - The number of team members that votes
 * @property {number[]} score_values
 */
export interface TriviaLeaderboardQuestionResults {
    question_id: string;
    broadcaster_correct: boolean;
    team_participation: number;
    team_participants: number;
    percent_correct: number;
    team_votes: number;
    score_values: number[];
}
export interface TriviaStateResponse {
    state: string;
}
export interface TriviaQuestionResponse {
    questions: TriviaQuestion[];
}
export declare enum TriviaQuestionState {
    Inactive = "state-inactive",
    Unlocked = "state-unlocked",
    Locked = "state-locked",
    Results = "state-results"
}
/**
 * Represents user info
 *
 * @property {string} ip_address - The id of the question
 * @property {boolean} registered - The name of the question
 * @property {number} server_time - The name of the question for smaller displays.
 * @property {string} visualization_id - A description for the question
 */
export interface UserInfo {
    ip_address: string;
    registered: boolean;
    server_time: number;
    visualization_id: string;
}
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
    loadPromise: Promise<void>;
    identifier: string;
    client: StateClient;
    analytics: Analytics;
    messenger: Messenger;
    user: User;
    SKUs: object[];
    timeOffset: number;
    purchaseClient: PurchaseClient;
    debug: DebugOptions;
    userObservers: Observer<User>;
    contextObservers: Observer<TwitchContext>;
    highlightObservers: Observer<boolean>;
    /** @ignore */
    constructor(id?: string);
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
    loaded(): Promise<void>;
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
    updateUser(user: User): void;
    /**
     * Registers a new callback for when the current user's info is updated.
     */
    onUserUpdate(callback: (user: User) => void): UserUpdateCallbackHandle;
    /**
     * Registers a new callback for when the context is updated.
     */
    onContextUpdate(callback: (context: TwitchContext) => void): ContextUpdateCallbackHandle;
    /**
     * Registers a new callback for when the highlight is updated.
     */
    onHighlightChanged(callback: (isHighlighted: boolean) => void): HighlightChangedCallbackHandle;
    /**
     * Returns a date object that is based on the Muxy server time.
     * This method only returns valid results after .loaded() resolves.
     *
     * @return {Date}
     */
    getOffsetDate(): Date;
    /**
     * Returns a promise to get the user object. This automatically
     * waits for .loaded() to resolve.
     */
    getUser(): Promise<User>;
    /**
     * Invokes a request to the backend.
     */
    signedRequest<DataType = unknown, ResponseType = unknown>(method: any, endpoint: any, data: any): Promise<ResponseType>;
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
    getAccumulateData(accumulationID: string, start: number): Promise<AccumulateData>;
    /**
     * @deprecated Use getAccumulateData instead.
     */
    getAccumulation(accumulationID: any, start: any): Promise<AccumulateData>;
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
    accumulate<DataType = unknown, ResponseType = unknown>(accumulationID: string, data: DataType): Promise<ResponseType>;
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
    getVoteData(voteID: string): Promise<VoteData>;
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
    getFullVoteLogs(voteID: string): Promise<VoteLog>;
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
     *
     * @return {Promise} Will resolve on successful server-send. Rejects on failure.
     *
     * @example
     * sdk.vote('poll-number-1', 1);
     */
    vote(voteID: string, value: number): Promise<VoteData>;
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
    getRankData(rankID: string): Promise<RankData>;
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
    rank(rankID: string, value: string): Promise<RankResponse>;
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
    clearRankData(rankID: string): Promise<ResponseType>;
    /**
     * @deprecated Deprecated in 1.0.0. Use getRankData instead.
     */
    getRankingData(rankID: any): Promise<RankData>;
    /**
     * @deprecated Deprecated in 1.0.0. Use clearRankData instead.
     */
    clearRanking(rankID: any): any;
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
    setChannelConfig<DataType = unknown, ResponseType = unknown>(config: DataType): Promise<ResponseType>;
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
    setExtensionConfig<DataType = unknown, ResponseType = unknown>(config: DataType): Promise<ResponseType>;
    /**
     * Returns the current channel and extension config objects
     * @async
     *
     * @return {Promise<ResponseType>} Resolves on successful server request with an object populated with channel and extension config objects.
     */
    getConfig<ResponseType = unknown>(): Promise<ResponseType>;
    /**
     * Returns the current channel config object
     * @async
     *
     * @return {Promise<ResponseType>} Resolves on successful server request with a populated channel config object.
     */
    getChannelConfig<ResponseType = unknown>(): Promise<ResponseType>;
    /**
     * Returns the current extension config object
     * @async
     *
     * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension config object.
     */
    getExtensionConfig<ResponseType = unknown>(): Promise<ResponseType>;
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
    setViewerState<DataType = unknown, ResponseType = unknown>(state: DataType): Promise<ResponseType>;
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
    setExtensionViewerState<DataType = unknown, ResponseType = unknown>(state: DataType): Promise<ResponseType>;
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
    patchExtensionViewerState<DataType = unknown, ResponseType = unknown>(userStates: DataType): Promise<ResponseType>;
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
    setExtensionState<DataType = unknown, ResponseType = unknown>(state: DataType): Promise<ResponseType>;
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
    setExtensionSecretState<DataType = unknown, ResponseType = unknown>(state: DataType): Promise<ResponseType>;
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
    setChannelState<DataType = unknown, ResponseType = unknown>(state: DataType): Promise<ResponseType>;
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
    getAllState(): Promise<AllState>;
    /**
     * Returns the current extension state object
     * @async
     *
     * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension state object.
     */
    getExtensionState<ResponseType = unknown>(): Promise<ResponseType>;
    /**
     * Returns the current channel state object
     * @async
     *
     * @return {Promise<ResponseType>} Resolves on successful server request with a populated channel state object.
     */
    getChannelState<ResponseType = unknown>(): Promise<ResponseType>;
    /**
     * Returns the current extension viewer state object
     * @async
     *
     * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension viewer state object.
     */
    getExtensionViewerState<ResponseType = unknown>(): Promise<ResponseType>;
    /**
     * Returns the current viewer state object
     * @async
     *
     * @return {Promise<ResponseType>} Resolves on successful server request with a populated viewer state object.
     */
    getViewerState<ResponseType = unknown>(): Promise<ResponseType>;
    /**
     * Returns the current extension secret state if the requesting user has access to the secret state.
     * @async
     *
     * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension secret state object.
     */
    getExtensionSecretState<ResponseType = unknown>(): Promise<ResponseType>;
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
    multiGetExtensionViewerState<ResponseType = unknown>(users: string[]): Promise<ResponseType>;
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
    getJSONStore<ResponseType = unknown>(key?: string): Promise<ResponseType>;
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
    validateCode(pin: string): Promise<unknown>;
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
    pinTokenExists<ResponseType = unknown>(): Promise<ResponseType>;
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
    revokeAllPINCodes(): Promise<unknown>;
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
    send(event: string, userID: string | unknown, data?: unknown): void;
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
     * @return {Object} A listener handle that can be passed to {@see unlisten} to unbind
     * this callback.
     *
     * @example
     * sdk.listen('new_song', (track) => {
     *   console.log(`${track.artist} - {track.title} (${track.year})`);
     * });
     */
    listen(inEvent: any, inUserID: any, inCallback?: any): import("./messenger").CallbackHandle;
    /**
     * Unbinds a callback from the event system.
     *
     * @since 1.0.0
     *
     * @param {Object} handle - An event handle as returned from {@see listen}.
     */
    unlisten(handle: any): void;
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
    getProducts(): Promise<import("./purchase-client").Product[]>;
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
    purchase(sku: string): void;
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
    onUserPurchase(callback: (tx: Transaction, promise: Promise<TransactionResponse>) => void): void;
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
    onUserPurchaseCanceled(callback: () => void): void;
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
    sendAnalyticsEvent(name: string, value?: number, label?: string): void;
    /**
     * Monetization
     */
    /**
     * Begins the purchase flow for a given product's SKU.
     *
     * @param {string} sku - The SKU of the digital good that the user has indicated they want to buy.
     */
    beginPurchase(sku: any): void;
    /**
     * Gets the current price for each item offered.
     *
     * @async
     *
     * @return {Object} An object with the SKU codes as keys.
     */
    getPrices(): Promise<unknown>;
    /**
     * Sets a function to be used as a callback when entitlements need to be reloaded, i.e. after a
     * purchase has been made.
     *
     * @param {Function} callback - A function to be called to update user entitlements.
     */
    onReloadEntitlements(callback: any): void;
    /**
     * Sets a function to be used as a callback that is triggered when the extension visibility changes
     * (This occurs only for mobile or component extensions.)
     *
     * @param {function} callback
     */
    onVisibilityChanged(callback: (isVisible: boolean, ctx: TwitchContext) => void): void;
    /**
     * Sets a function to be used as a callback that is triggered when the extension changes position in the player
     * This occurs only for video-component extensions.
     *
     * @param {function} callback
     */
    onPositionChanged(callback: (position: Position) => void): void;
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
    redeemCode(prizeIndex: number): Promise<RedeemResult>;
    /**
     * Fetches all codes that the user has redeemed for this extension.
     * @async
     *
     * @return {Promise<RedeemedCodes>} Will resolve on success. Rejects on failure.
     */
    getRedeemedCodes(): Promise<RedeemedCodes>;
    /**
     * Fetches information about which codes a user is eligible for
     * @async
     *
     * @return {Promise<EligibleCodes>} Will resolve on success. Rejects on failure.
     */
    getEligibleCodes(): Promise<EligibleCodes>;
    /**
     * Sets the user's trivia team to the current channel.
     * @async
     *
     * @return {Promise<any>}
     */
    joinExtensionTriviaTeam(): Promise<any>;
    /**
     * Return the user's stored trivia team.
     * @async
     *
     * @return {Promise<TriviaTeam>}
     */
    getExtensionTriviaJoinedTeam(): Promise<TriviaTeam>;
    /**
     * Add a trivia question to the extension.
     * Requires extension admin permissions.
     * @async
     *
     * @return {Promise<Record<string, unknown>>}
     */
    addExtensionTriviaQuestion(question: TriviaQuestion): Promise<Record<string, unknown>>;
    /**
     * Removes a trivia question from the extension.
     * Requires extension admin permissions.
     * @async
     *
     * @return {Promise<Record<string, unknown>>}
     */
    removeExtensionTriviaQuestion(triviaQuestionID: string): Promise<Record<string, unknown>>;
    /**
     * Add an option to a trivia question.
     * Requires extension admin permissions.
     * @async
     *
     * @return {Promise<any>}
     */
    addExtensionTriviaOptionToQuestion(questionID: string, option: TriviaOption): Promise<TriviaQuestion>;
    /**
     * Remove an option from a trivia question.
     * Requires extension admin permissions.
     * @async
     *
     * @return {Promise<TriviaQuestion>}
     */
    removeExtensionTriviaOptionFromQuestion(questionID: string, optionID: string): Promise<TriviaQuestion>;
    /**
     * Change the state of a extension trivia question.
     * Requires extension admin permissions.
     * @async
     *
     * @return {Promise<any>}
     */
    setExtensionTriviaQuestionState(questionID: string, state: TriviaQuestionState, winner?: string): Promise<TriviaStateResponse>;
    /**
     * As a user place a vote on a trivia question
     * @async
     *
     * @return {Promise<Record<string, unknown>>}
     */
    setExtensionTriviaQuestionVote(questionID: string, optionID: string): Promise<Record<string, unknown>>;
    /**
     * Returns all of the current trivia questions
     * @async
     *
     * @return {Promise<TriviaQuestionResponse>}
     */
    getExtensionTriviaQuestions(): Promise<TriviaQuestionResponse>;
    /**
     * Get information about a specific trivia question
     * @async
     *
     * @return {Promise<TriviaQuestion>}
     */
    getExtensionTriviaQuestion(questionID: string): Promise<TriviaQuestion>;
    /**
     * Return the trivia leaderboard
     * @async
     *
     * @return {Promise<TriviaLeaderboardTeam[]>}
     */
    getExtensionTriviaLeaderboard(): Promise<TriviaLeaderboard>;
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
    getExtensionUsers(next?: string): Promise<ExtensionUsersResult>;
    /**
     * Private Instance Methods
     */
    /** @ignore */
    private setup;
}
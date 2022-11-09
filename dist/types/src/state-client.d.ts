/**
 * @module SDK
 */
import type { Transaction } from './types/purchases';
import { XHROptions } from '../libs/xhr-promise';
import { DebugOptions } from './debug';
import { AccumulateData, EligibleCodes, ExtensionUsersResult, RankResponse, RedeemedCodes, RedeemResult, TriviaLeaderboard, TriviaOption, TriviaQuestion, TriviaQuestionResponse, TriviaQuestionState, TriviaStateResponse, TriviaTeam, UserInfo, VoteData, VoteLog } from './types';
import { TwitchAuth } from './twitch';
import { Environment } from './util';
/**
 * ServerState enum maps the subsets of state persisted to the server to
 * their respective endpoints.
 * @ignore
 */
export declare enum ServerState {
    ALL = "all_state",
    AUTHENTICATION = "authentication",
    CHANNEL = "channel_state",
    EXTENSION = "extension_state",
    EXTENSION_SECRET = "extension_hidden_state",
    EXTENSION_VIEWER = "extension_viewer_state",
    USER = "user_info",
    VIEWER = "viewer_state"
}
/**
 * ServerConfig enum maps the subsets of config persisted to the server to
 * their respective endpoints.
 * @ignore
 */
export declare enum ServerConfig {
    ALL = "config",
    CHANNEL = "config/channel",
    EXTENSION = "config/extension"
}
/** @ignore */
export interface Hook<HookCallback> {
    failure: HookCallback;
    success: HookCallback;
}
export declare type RequestHook = (config: XHROptions) => Promise<XHROptions>;
export declare type ResponseHook = <InType = unknown, OutType = unknown>(resp: InType) => Promise<OutType>;
/**
 * HookManager class for adding and removing network request
 * and response hooks.
 *
 * Similar to the axios interceptor pattern:
 * https://github.com/axios/axios/blob/master/lib/core/InterceptorManager.js
 *
 * @ignore
 */
export declare class HookManager<HookCallback extends RequestHook | ResponseHook> implements Iterable<Hook<HookCallback>> {
    private callbacks;
    get length(): number;
    add(success: HookCallback, failure?: HookCallback): number;
    remove(index: number): void;
    [Symbol.iterator](): {
        next(): IteratorResult<Hook<HookCallback>>;
    };
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
declare class StateClient {
    /** @ignore */
    static fetchTestAuth(extensionID: string, debug: DebugOptions): Promise<TwitchAuth>;
    /** @ignore */
    static setEnvironment(env: Environment, debug: DebugOptions): void;
    token: string;
    debug: DebugOptions;
    hooks: {
        requests: HookManager<RequestHook>;
        responses: HookManager<ResponseHook>;
    };
    private loaded;
    /** @ignore */
    constructor(loadedPromise: Promise<void>, debug: DebugOptions);
    /** @ignore */
    updateAuth(token: string): void;
    /**
     * signedRequest checks that we have a valid JWT and wraps a standard AJAX
     * request to the EBS with valid auth credentials.
     * @ignore
     */
    signedRequest<DataType = unknown, ResponseType = unknown>(extensionID: string, method: string, endpoint: string, data?: DataType, skipPromise?: boolean): Promise<ResponseType>;
    /**
     * validateJWT ensures that the current JWT is valid and not expired.
     * @ignore
     */
    validateJWT(): boolean;
    /**
     * getState requests a subset of state stored on the server and sets the
     * local cached version of the state to the response.
     * @ignore
     */
    getState: <ResponseType_1 = unknown>(identifier: string, substate?: ServerState) => Promise<ResponseType_1>;
    /**
     * getConfig requests a subset of config stored on the server and sets the
     * local cached version of the config to the response.
     * @ignore
     */
    getConfig: <ResponseType_1 = unknown>(identifier: string, subconfig?: ServerConfig) => Promise<ResponseType_1>;
    /**
     * postState sends data to the current EBS substate endpoint for persistence.
     * @ignore
     */
    postState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, substate: ServerState, data: DataType) => Promise<ResponseType_1>;
    /**
     * postConfig sends data to the current EBS substate endpoint for persistence.
     * @ignore
     */
    postConfig: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, subconfig: ServerConfig, data: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    getUserInfo: (identifier: string) => Promise<unknown>;
    /** @ignore */
    immediateGetUserInfo: (identifier: string) => Promise<UserInfo>;
    /** @ignore */
    getViewerState: <ResponseType_1 = unknown>(identifier: string) => Promise<ResponseType_1>;
    /** @ignore */
    getExtensionViewerState: <ResponseType_1 = unknown>(identifier: string) => Promise<ResponseType_1>;
    /** @ignore */
    multiGetExtensionViewerState: <ResponseType_1 = unknown>(identifier: string, users: string[]) => Promise<ResponseType_1>;
    /** @ignore */
    getExtensionSecretState: <ResponseType_1 = unknown>(identifier: string) => Promise<ResponseType_1>;
    /** @ignore */
    getChannelState: <ResponseType_1 = unknown>(identifier: string) => Promise<ResponseType_1>;
    /** @ignore */
    getServerConfig: <ResponseType_1 = unknown>(identifier: string) => Promise<ResponseType_1>;
    /** @ignore */
    getChannelConfig: <ResponseType_1 = unknown>(identifier: string) => Promise<ResponseType_1>;
    /** @ignore */
    getExtensionConfig: <ResponseType_1 = unknown>(identifier: string) => Promise<ResponseType_1>;
    /** @ignore */
    getExtensionState: <ResponseType_1 = unknown>(identifier: string) => Promise<ResponseType_1>;
    /** @ignore */
    setExtensionState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, state: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    patchExtensionState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, multiState: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    setViewerState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, state: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    patchViewerState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, multiState: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    setExtensionViewerState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, state: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    patchExtensionViewerState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, multiState: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    setExtensionSecretState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, state: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    patchExtensionSecretState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, multiState: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    setChannelState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, state: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    patchChannelState: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, multiState: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    setChannelConfig: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, config: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    patchChannelConfig: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, multiConfig: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    setExtensionConfig: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, config: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    patchExtensionConfig: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, multiConfig: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    getAccumulation: (identifier: string, id: string, start: number) => Promise<AccumulateData>;
    /** @ignore */
    accumulate: <DataType = unknown, ResponseType_1 = unknown>(identifier: string, id: string, data: DataType) => Promise<ResponseType_1>;
    /** @ignore */
    vote: <DataType = {
        value: number;
        count?: number;
    }>(identifier: string, id: string, data: DataType) => Promise<VoteData>;
    /** @ignore */
    getVotes: (identifier: string, id?: string) => Promise<VoteData>;
    /** @ignore */
    getFullVoteLogs: (identifier: string, id?: string) => Promise<VoteLog>;
    /** @ignore */
    rank: <DataType = unknown>(identifier: string, id: string, data: DataType) => Promise<RankResponse>;
    /** @ignore */
    getRank: <ResponseType_1 = unknown>(identifier: string, id?: string) => Promise<ResponseType_1>;
    /** @ignore */
    deleteRank: <ResponseType_1 = unknown>(identifier: string, id?: string) => Promise<ResponseType_1>;
    /** @ignore */
    getJSONStore: <ResponseType_1 = unknown>(identifier: string, id?: string) => Promise<ResponseType_1>;
    /** @ignore */
    validateCode: <ResponseType_1 = unknown>(identifier: string, code: string) => Promise<ResponseType_1>;
    /** @ignore */
    pinTokenExists: <ResponseType_1 = unknown>(identifier: string) => Promise<ResponseType_1>;
    /** @ignore */
    revokeAllPINCodes: <ResponseType_1 = unknown>(identifier: string) => Promise<ResponseType_1>;
    /** @ignore */
    getEligibleCodes: (identifier: string) => Promise<EligibleCodes>;
    /** @ignore */
    getRedeemedCodes: (identifier: string) => Promise<RedeemedCodes>;
    /** @ignore */
    redeemCode: (identifier: string, prizeIndex: number) => Promise<RedeemResult>;
    /** @ignore */
    getExtensionUsers: (identifier: string, cursor: string) => Promise<ExtensionUsersResult>;
    /** @ignore */
    joinExtensionTriviaTeam: (identifier: string) => Promise<unknown>;
    /** @ignore */
    getExtensionTriviaJoinedTeam: (identifier: string) => Promise<TriviaTeam>;
    /** @ignore */
    addExtensionTriviaQuestion: (identifier: string, triviaQuestion: TriviaQuestion) => Promise<Record<string, unknown>>;
    /** @ignore */
    removeExtensionTriviaQuestion: (identifier: string, triviaQuestionID: string) => Promise<Record<string, unknown>>;
    /** @ignore */
    addExtensionTriviaOptionToQuestion: (identifier: string, questionID: string, option: TriviaOption) => Promise<TriviaQuestion>;
    /** @ignore */
    removeExtensionTriviaOptionFromQuestion: (identifier: string, questionID: string, optionID: string) => Promise<TriviaQuestion>;
    /** @ignore */
    setExtensionTriviaQuestionState: (identifier: string, questionID: string, state: TriviaQuestionState, winner: string) => Promise<TriviaStateResponse>;
    /** @ignore */
    setExtensionTriviaQuestionVote: (identifier: string, questionID: string, optionID: string) => Promise<Record<string, unknown>>;
    /** @ignore */
    getExtensionTriviaQuestions: (identifier: string) => Promise<TriviaQuestionResponse>;
    /** @ignore */
    getExtensionTriviaQuestion: (identifier: string, questionID: string) => Promise<TriviaQuestion>;
    /** @ignore */
    getExtensionTriviaLeaderboard: (identifer: string) => Promise<TriviaLeaderboard>;
    /** @ignore */
    sendTransactionToServer: (identifier: string, tx: Transaction) => Promise<Record<string, unknown>>;
}
export default StateClient;

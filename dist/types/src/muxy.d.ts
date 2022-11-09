/**
 * @module Muxy
 */
import { TriviaQuestionState, type PurchaseClient } from './types';
import Analytics from './analytics';
import { DebuggingOptions, DebugOptions } from './debug';
import { Messenger } from './messenger';
import SDK from './sdk';
import StateClient from './state-client';
import TwitchClient from './twitch-client';
import User from './user';
import Util from './util';
import { TwitchContext } from './twitch';
export interface SDKMap {
    [key: string]: SDK;
}
/**
 * Options that can be passed to Muxy.setup()
 *
 * `clientID` - The Extension Client ID as provided by Twitch.
 * `uaString` - An optional Google Analytics UA_String to send events to.
 * `quiet` - If true, will not print library information to the console. This is always
 *  true when running in production.
 */
export interface SetupOptions {
    clientID: string;
    transactionsEnabled?: boolean;
    uaString?: string;
    quiet?: boolean;
}
/** @ignore */
export interface DeprecatedSetupOptions {
    extensionID?: string;
}
export interface MuxyInterface {
    debug(dbg: DebuggingOptions): void;
    setup(options: SetupOptions & DeprecatedSetupOptions): void;
    watchAuth(extensionID: string): void;
    TwitchClient(): TwitchClient;
}
/**
 * The main extension entry interface, available as the global `Muxy` object.
 *
 * This class handles environment detection, data harness collection and updates (for
 * authentication and backend communication) and SDK instance creation.
 *
 * On import or inclusion in an HTML file, a singleton object will be globally accessible
 * as `Muxy`.
 */
export declare class Muxy implements MuxyInterface {
    /**
     * Prints to console a description of the library's current version and
     * environment info. This is called automatically when the library is
     * setup, unless the `quiet` parameter is passed to {@link setup}.
     *
     * @since 1.0.0
     * @public
     *
     * @example
     * Muxy.printInfo();
     * ┌──────────────────────────────────────────────────┐
     * | Muxy Extensions SDK                              |
     * | v1.0.0 © 2017 Muxy, Inc.                         |
     * | https://github.com/muxy/extensions-js            |
     * |                                                  |
     * | Running in sandbox environment outside of Twitch |
     * └──────────────────────────────────────────────────┘
     *
     */
    static printInfo(): void;
    /**
     * Returns a version of the Muxy SDK associated with the provided identifier.
     * @since 1.0.0
     * @public
     *
     * @param {string?} id - A unique identifier for this extension or app. If omitted, the
     * extension client id will be used.
     *
     * @throws {Error} Will throw an error if called before {@link Muxy.setup}.
     *
     * @returns {SDK} An instance of the SDK class.
     *
     * @example
     * const sdk = new Muxy.SDK();
     * sdk.loaded().then(() => {
     *   sdk.send('Hello World');
     * }).catch((err) => {
     *   console.error(err);
     * });
     */
    SDK: typeof SDK;
    /**
     * Makes trivia state enum available from the global `Muxy` object
     */
    TriviaQuestionState: typeof TriviaQuestionState;
    /**
     * Convenience accessor for users of the Muxy library, makes the util functions accessible
     * from `Muxy.Util.<whatever>`. Full documentation in the util.js file.
     *
     * @ignore
     */
    Util: Util;
    DebuggingOptions: typeof DebuggingOptions;
    /**
     * Internal cache for created {@link SDK} client objects mapped to SDK id.
     *
     * @ignore
     * @type {Object}
     */
    SDKClients: SDKMap;
    /**
     * A flag used to signal when {@link setup} has been called. This function must be called once
     * and only once before SDK objects may be created.
     *
     * @public
     * @type {boolean}
     */
    setupCalled: boolean;
    /**
     * The Twitch ClientID as returned from the auth callback. This is used for all
     * requests to Twitch's API.
     *
     * @public
     * @readonly
     * @type {string}
     */
    twitchClientID: string;
    /**
     * Internal {@link StateClient}.
     *
     * @ignore
     * @type {StateClient}
     */
    client: StateClient | null;
    /**
     * Internal {@link Messenger}.
     *
     * @ignore
     * @type {Messenger}
     */
    messenger: Messenger | null;
    /**
     * Internal {@link PurchaseClient}.
     *
     * @ignore
     * @type {PurchaseClient}
     */
    purchaseClient: PurchaseClient | null;
    /**
     * Enables/Disables the PurchaseClient for coin/bits/etc transactions.
     *
     * @ignore
     * @type {boolean}
     */
    transactionsEnabled: boolean;
    /**
     * Internal {@link TwitchClient}.
     *
     * @ignore
     * @type {TwitchClient}.
     */
    cachedTwitchClient: TwitchClient | null;
    /**
     * Internal {@link Analytics}.
     *
     * @ignore
     * @type {Analytics}.
     */
    analytics: Analytics | null;
    /**
     * Internal caching for most recent context callback result.
     *
     * @ignore
     * @type {TwitchContext}
     */
    context?: TwitchContext;
    /**
     * Internal reference to the current {@link User}.
     *
     * @ignore
     * @type {User}
     */
    user: User | null;
    /**
     * Promise to resolve once the Muxy singleton is full loaded and ready
     * to be used. Use the {@see loaded} method instead of accessing directly.
     *
     * @ignore
     * @type {Promise}
     */
    loadPromise: Promise<void>;
    loadResolve: () => void;
    loadReject: (err: string) => void;
    didLoad: boolean;
    /**
     * List of SKUs and product metadata that is used for monetization purposes
     *
     * @ignore
     * @type {Object}
     */
    SKUs: object[];
    /**
     * Internal variable to handle setup functionality.
     *
     * @ignore
     * @type {boolean}
     */
    watchingAuth: boolean;
    /**
     * The Twitch Channel ID to use for testing. This will determine who the viewer and/or
     * broadcaster appears as when testing the extension.
     *
     * Changes to this value must be made before calling {@link SDK}.
     *
     * @public
     * @type {string}
     */
    testChannelID: string;
    /**
     * Role for the current user in the sandbox environment. May be one of {@link User.Roles}.
     *
     * Changes to this value must be made before calling {@link SDK}.
     *
     * @public
     * @type {string}
     */
    testJWTRole: string;
    /**
     * Debugging options. Should only be set by a call to .debug()
     * @internal
     * @type {object}
     */
    debugOptions: DebugOptions;
    /**
     * Private constructor for singleton use only.
     * @ignore
     */
    constructor();
    /**
     * Called the first time the {@link setup} is called to start watching the auth
     * and context callbacks and updating values automatically. This method should
     * not normally be called directly.
     *
     * @since 1.0.0
     * @ignore
     *
     * @param {string} extensionID - The Twitch Extension Client ID to use for all
     * Twitch API requests.
     */
    watchAuth(extensionID: string): void;
    /**
     * Mandatory SDK setup call. Must be called once and only once to establish the Extension
     * environment and client ID to use.
     *
     * @since 1.0.0
     * @public
     *
     * @param {Object} options
     *
     * @param {string} options.clientID - The Extension Client ID as provided by Twitch.
     * @since 1.0.4
     *
     * @param {string?} options.uaString - An optional Google Analytics UA_String to send
     * events to.
     * @since 1.0.0
     *
     * @param {boolean?} options.quiet - If true, will not print library information to the
     * console. This is always true when running in production.
     * @since 1.0.3
     *
     * @throws {Error} Will throw an error if setup() has already been called, or if no
     * Extension Client ID is provided.
     *
     * @example
     * Muxy.setup({
     *   clientID: <your extension client id>
     * });
     */
    setup(options: SetupOptions & DeprecatedSetupOptions): void;
    /**
     * Setup debugging options for the application. This allows the application to fake
     * what user they are running as, the channel the extension is running on, pubsub debug
     * message frequency, and even the backend URL that the extension uses.
     *
     * This should be called before setup().
     *
     * @param {*} options - an instance of DebuggingOptions
     */
    debug(options: DebuggingOptions): void;
    /**
     * Debugging callback, used to start the helix token flow.
     * @internal
     * @type {function}
     */
    private openHelixUrl;
    /**
     * Start the debug helix token flow.
     */
    beginDebugHelixTokenFlow(): void;
    /**
     * Returns a twitch client to use. Can only be used after the loaded promise resolves.
     *
     * @since 1.0.0
     * @public
     *
     * @returns {TwitchClient} An instance of the TwitchClient class.
     *
     * @throws {Error} Will throw an error if called before {@link Muxy.setup}.
     */
    TwitchClient(): TwitchClient;
}
/**
 * Global Muxy singleton object.
 * @ignore
 */
declare const mxy: Muxy;
/**
 * Only export the Muxy singleton to avoid creation of competing/conflicting instances.
 * @ignore
 */
export default mxy;

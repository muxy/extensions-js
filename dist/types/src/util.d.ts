import { JWT } from './twitch';
/**
 * Global environment objects. This ensures that comparisons are true between
 * object pointers. For example: ENVIRONMENTS.TESTING === Util.Environments.Testing
 *
 * @since 1.0.3
 */
export declare class Environment {
    environment: string;
}
/**
 * Possible runtime environments for the SDK.
 * @since 1.0.0
 * @deprecated Use {@link Util.Environments} instead.
 */
/** @ignore */ export declare const ENVIRONMENTS: {
    ADMIN: Environment;
    PRODUCTION: Environment;
    SANDBOX_DEV: Environment;
    SANDBOX_TWITCH: Environment;
    SERVER: Environment;
    TESTING: Environment;
};
export interface ConsolePrintOptions {
    type?: string;
    boxed?: boolean;
    style?: string;
}
/**
 * The response from {@link getTwitchEnvironment}.
 *
 * @typedef {Object[]} TwitchEnvironment
 *
 * @property {string} anchor - The type of the anchor in which the extension is activated.
 * Valid only when platform is "web". Valid values: "component", "panel", "video_overlay".
 * @property {string} language - The user’s language setting (e.g., "en").
 * @property {string} mode - The extension’s mode. Valid values: "config", "dashboard", "viewer".
 * @property {string} platform - The platform on which the Twitch client is running. Valid values: "mobile", "web".
 * @property {string} state - The release state of the extension.
 * @property {string} version - The version of the extension
 * Valid values: "testing", "hosted_test", "approved", "released",
 * "ready_for_review", "in_review", "pending_action", "uploading".
 */
export interface TwitchEnvironment {
    anchor: string;
    language: string;
    mode: string;
    platform: string;
    state: string;
    version: string;
}
/**
 * A collection of static utility functions, available at {@link Muxy.Util}.
 *
 * @example
 * const a = 'a string';
 * Muxy.Util.forceType(a, 'string');
 */
export default class Util {
    /**
     * Possible runtime environments for the library. Used to define available
     * behavior and services.
     *
     * @since 1.0.3
     * @type {Object}
     */
    static get Environments(): {
        [key: string]: Environment;
    };
    static overrideEnvironment?: Environment;
    static registerEnvironment(key: string, env: Environment): void;
    static getQueryParam(key: string): string;
    /**
     * Wraps a string error response in an (immediately rejected) promise.
     * @since 1.0.0
     *
     * @param {string} err - A string error that the promise will reject.
     *
     * @returns {Promise<string>} Immediately rejects the returned Promise.
     */
    static errorPromise(err: string): Promise<string>;
    /**
     * Returns the length of the longest line in the provided array.
     *
     * @since 1.0.0
     * @ignore
     *
     * @param {string[]} lines - An array of strings.
     */
    static widestLine(lines: string[]): number;
    /**
     * Draws a box around the lines of text provided.
     *
     * @since 1.0.0
     * @ignore
     *
     * @param {string[]} lines - An array of strings to surround.
     *
     * @returns {string} A string containing all `lines` of text surrounded
     * in an ASCII box art.
     */
    static asciiBox(lines: string[]): string[];
    /**
     * Checks if the current window object is running in an iframe.
     *
     * @since 1.0.0
     * @ignore
     */
    static isWindowFramed(overrideWindow?: Window): boolean;
    static getParentUrl(window: Window): string | undefined;
    /**
     * currentEnvironment uses the hostname and available info to determine in what
     * environment the SDK is running. Possible values are available in {@link Util.Environments}.
     * @since 1.0.0
     *
     * @returns {string} Returns a string representation of the current
     * execution environment.
     */
    static currentEnvironment(overrideWindow?: object): Environment;
    /**
     * consolePrint prints each line of text with optional global settings and per-line
     * console flags.
     *
     * **NOTE:** Twitch's CSP enforcement disallows printing to console. This function
     * will not print anything to the console if it is running in production mode.
     *
     * @since 1.0.0
     * @public
     *
     * @param {string|string[]} lines - A single string to output, or an array of lines
     * of text. If lines is an array, each line will appear on its own line. If lines is
     * a single string, it will be split on '\n'.
     *
     * @param {object?} options - An object containing global options.
     * @param {boolean} options.boxed - If true, surrounds the output in an ASCII art box.
     * @param {string} options.style - A CSS style string to append to the console call.
     * @param {string} options.type - The type of print command. May be one of:
     * ['log', 'error', 'debug', 'info', 'warn'], although browser support may not be
     * available for all. Defaults to 'log'.
     *
     * @example
     * consolePrint('Hello World');
     *  Hello World
     *
     * consolePrint('This is a box', { boxed: true });
     *  ┌───────────────┐
     *  | This is a box |
     *  └───────────────┘
     */
    static consolePrint(lines: string[] | string, options?: ConsolePrintOptions): void;
    /**
     * Matches an input event name with a pattern. An event name is a : delimited
     * list of terms, while a pattern is a : delimited list of terms, with an
     * optional * instead of a term. '*' will match any term.
     *
     * @since 1.0.0
     * @private
     *
     * @param {string} input - An input event name, : delimited.
     * Allowed characters are alpha-numeric and _
     * @param {string} pattern - A pattern to match against, : delimited.
     * Allowed characters are alpha-numeric and _ and *
     *
     * @return Returns true if the pattern matches the input, false otherwise.
     */
    static eventPatternMatch(input: string, pattern: string): boolean;
    /**
     * Takes a variable and a Javascript Type identifier and throws a TypeError
     * if the variable's type is not in the provided type list. If the type check
     * passes, the function returns without error. As a convenience, the type may
     * also be an array of types.
     *
     * Acceptable types:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
     *
     * @since 1.0.0
     * @public
     *
     * @param {any} value - Any JavaScript variable.
     * @param {string} type - A single type string, or an array of multiple types.
     *
     * @throws {TypeError} Throws if typeof value is not in the type list.
     */
    static forceType(value: any, type: string): void;
    /**
     * Returns information about the current extension environment on twitch
     *
     * @public
     *
     * @return {TwitchEnvironment}
     */
    static getTwitchEnvironment(): TwitchEnvironment;
    /**
     * Attempts to parse the provided JWT and return the payload info
     *
     * @param {Object} jwt - The auth JWT token as returned from the auth harness.
     */
    static extractJWTInfo(jwt: string): JWT;
    private static availableEnvironments;
}
/** @ignore */ export declare const consolePrint: typeof Util.consolePrint;
/** @ignore */ export declare const forceType: typeof Util.forceType;
/** @ignore */ export declare const eventPatternMatch: typeof Util.eventPatternMatch;
/** @ignore */ export declare const CurrentEnvironment: typeof Util.currentEnvironment;
/** @ignore */ export declare const errorPromise: typeof Util.errorPromise;

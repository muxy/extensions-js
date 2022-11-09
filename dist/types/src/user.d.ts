/**
 * @module SDK
 */
import { ObserverHandler } from './observer';
import { TwitchAuth } from './twitch';
/**
 * Stores fields related to the current extension user, either a viewer or the broadcaster.
 * These fields are automatically updated by the SDK.
 */
export default class User {
    channelID: string;
    twitchJWT: string;
    twitchOpaqueID: string;
    twitchID: string;
    helixToken: string;
    muxyID: string;
    registeredWithMuxy: boolean;
    visualizationID: string;
    role: string;
    ip: string;
    game: string;
    videoMode: string;
    bitrate: number;
    latency: number;
    buffer: number;
    theme: string;
    volume: number;
    timeOffset: number;
    language: string;
    locale: string;
    /**
     * Defines the current user's role on Twitch relative to the current channel being
     * viewed. May be "viewer" if the user is simply viewing the channel, "moderator"
     * if the user is a moderator of the channel or "broadcaster" if the user is also
     * the broadcaster of the channel.
     *
     * @since 1.0.3
     */
    static get Roles(): {
        Broadcaster: string;
        Moderator: string;
        Viewer: string;
    };
    /**
     * Defines the video mode for the current user. This may be "default" for the default
     * windowed viewing experience on Twitch, "fullscreen" for the fullscreen, video-only
     * mode or "theatre" for the video full window-width.
     *
     * @since 1.0.3
     */
    static get VideoModes(): {
        Default: string;
        Fullscreen: string;
        Theatre: string;
    };
    /**
     * @since 1.0.0
     * @param {Object} auth - An auth token usable by this user for backend requests.
     */
    constructor(auth: TwitchAuth);
    /**
     * Attempts to parse the provided JWT and persist any found information in store.
     * @since 1.0.0
     *
     * @param {Object} jwt - The auth JWT token as returned from the auth harness.
     */
    extractJWTInfo(jwt: string): void;
    /**
     * Returns whether or not the current extension user is anonymous.
     * Twitch defines an anonymous user as one who is not logged in to the channel
     * page running this extension, or one who has not opted-in to sharing
     * auth information with this extension.
     * @since 1.0.0
     *
     * @return {boolean} True if the user is not logged in to Twitch or has not granted
     * access to their Twitch ID.
     */
    anonymous(): boolean;
    /**
     * Stores values from a new auth token in the local store.
     * @since 1.0.0
     *
     * @param {Object} auth - An auth JWT with updated user information.
     */
    updateAuth(auth: TwitchAuth): void;
    /**
     * Returns a date object that is based on the Muxy server time.
     *
     * @return {Date}
     */
    getOffsetDate(): Date;
}
export declare class UserUpdateCallbackHandle extends ObserverHandler<User> {
    private cb;
    constructor(cb: (user: User) => void);
    notify(user: User): void;
}

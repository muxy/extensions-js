import { JWT, TwitchAuth } from './twitch';

/**
 * Stores fields related to the current extension user, either a viewer or the broadcaster.
 * These fields are automatically updated by the SDK.
 */
export default class User {
  public channelID: string;
  public twitchJWT: string;
  public twitchOpaqueID: string;
  public twitchID: string;
  public muxyID: string;
  public registeredWithMuxy: boolean;
  public visualizationID: string;
  public role: string;
  public ip: string;
  public game: string;
  public videoMode: string;
  public bitrate: Number;
  public latency: Number;
  public buffer: Number;
  public theme: string;
  public volume: Number;

  /**
   * Defines the current user's role on Twitch relative to the current channel being
   * viewed. May be "viewer" if the user is simply viewing the channel, "moderator"
   * if the user is a moderator of the channel or "broadcaster" if the user is also
   * the broadcaster of the channel.
   *
   * @since 1.0.3
   */
  static get Roles() {
    return {
      Viewer: 'viewer',
      Broadcaster: 'broadcaster',
      Moderator: 'moderator'
    };
  }

  /**
   * Defines the video mode for the current user. This may be "default" for the default
   * windowed viewing experience on Twitch, "fullscreen" for the fullscreen, video-only
   * mode or "theatre" for the video full window-width.
   *
   * @since 1.0.3
   */
  static get VideoModes() {
    return {
      Default: 'default',
      Fullscreen: 'fullscreen',
      Theatre: 'theatre'
    };
  }

  /**
   * @since 1.0.0
   * @param {Object} auth - An auth token usable by this user for backend requests.
   */
  constructor(auth: TwitchAuth) {
    /**
     * channelID holds the numeric id of the channel the user is currently watching.
     *
     * @since 1.0.0
     * @type {string}
     */
    this.channelID = auth.channelId;

    /**
     * twitchJWT holds the raw JWT response from the Twitch Extension SDK.
     *
     * @since 1.0.0
     * @type {Object}
     */
    this.twitchJWT = auth.token;

    /**
     * twitchOpaqueID is a Twitch generated ID that will uniquely identify this
     * user (if they are logged in), but does not give us access to their Twitch ID.
     *
     * @since 1.0.0
     * @type {string}
     */
    this.twitchOpaqueID = auth.userId;

    /**
     * twitchID is this viewer's actual Twitch ID. Used to coordinate access to
     * other Twitch services and across the Twitch universe. Only set if the user
     * grants access, null otherwise.
     *
     * @since 1.0.0
     * @type {null|string}
     */
    this.twitchID = null;

    /**
     * registeredWithMuxy will be true if the user has an active muxy account.
     *
     * @since 1.0.0
     * @type {boolean}
     */
    this.registeredWithMuxy = false;

    /**
     * muxyID is this viewer's ID on Muxy. Null if the user has not authenticated with
     * Muxy or is not sharing their Twitch ID with the extension.
     *
     * @since 1.0.0
     * @type {null|string}
     */
    this.muxyID = null;

    /**
     * visualizationID is a unique user string that can be used to identify this user
     * on Muxy's a.muxy.io subdomain. This is used for things like alerts and
     * cheer visualizations, but is not generally useful. Empty string if
     * `registeredWithMuxy` is false.
     *
     * @since 1.0.0
     * @type {string}
     */
    this.visualizationID = '';

    /**
     * role is the current user's role in the extension. May be one of {@link Roles}.
     *
     * @since 1.0.0
     * @type {string}
     */
    this.role = User.Roles.Viewer;

    /**
     * ip is the current user's IP address. May be an empty string if undetectable.
     *
     * @since 1.0.0
     * @type {string}
     */
    this.ip = '';

    /**
     * game is the title of the current channel's game as set by the broadcaster.
     *
     * @since 1.0.0
     * @type {string}
     */
    this.game = '';

    /**
     * User's current video mode. One of {@link VideoModes}.
     *
     * @since 1.0.0
     * @type {string}
     */
    this.videoMode = User.VideoModes.Default;

    /**
     * Current video bitrate. Null if no video or unknown.
     *
     * @since 1.0.0
     * @type {null|number}
     */
    this.bitrate = null;

    /**
     * Current video latency. Null if no video or unknown.
     *
     * @since 1.0.0
     * @type {null|number}
     */
    this.latency = null;

    /**
     * Current buffer size of the viewer's player. Null if no video or unknown.
     *
     * @since 1.0.0
     * @type {null|number}
     */
    this.buffer = null;

    /**
     * Current theme the user has selected on twitch. Null if unknown.
     * @type {null|string}
     */
    this.theme = null;

    /**
     * Current volume level of the Twitch video player. Values between 0 and 1.
     * @type {number}
     */
    this.volume = 0;

    // If the user has authorized an extension to see their Twitch ID, it will be
    // hidden in the JWT payload.
    this.extractJWTInfo(auth.token);
  }

  /**
   * Attempts to parse the provided JWT and persist any found information in store.
   * @since 1.0.0
   *
   * @param {Object} jwt - The auth JWT token as returned from the auth harness.
   */
  extractJWTInfo(jwt: string) {
    try {
      const splitToken = jwt.split('.');
      if (splitToken.length === 3) {
        const token = <JWT>JSON.parse(window.atob(splitToken[1]));
        this.role = token.role;
        if (token.user_id) {
          this.twitchID = token.user_id;
        }
      }
    } catch (err) {
      // Silently fail (enforcement of Twitch ID is done externally).
    }
  }

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
  anonymous() {
    return !this.twitchOpaqueID || this.twitchOpaqueID[0] !== 'U';
  }

  /**
   * Stores values from a new auth token in the local store.
   * @since 1.0.0
   *
   * @param {Object} auth - An auth JWT with updated user information.
   */
  updateAuth(auth: TwitchAuth) {
    this.twitchJWT = auth.token;
    this.extractJWTInfo(auth.token);
  }
}

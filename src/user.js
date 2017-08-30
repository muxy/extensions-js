/**
 * User stores fields related to the current extension user, either a viewer or the broadcaster.
 * These fields are automatically updated by the SDK.
 */
export default class User {
  /**
   * @since 1.0.0
   * @param {object} auth - An auth token usable by this user for backend requests.
   */
  constructor(auth) {
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
     * @type {object}
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
     * role is the current user's role in the extension. May be one of ['viewer', 'config'].
     *
     * @since 1.0.0
     * @type {string}
     */
    this.role = 'viewer';

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
     * Current video mode: One of ['default', fullscreen', 'theatre'].
     *
     * @since 1.0.0
     * @type {string}
     */
    this.videoMode = 'default';

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
     * Current buffer size of the viewer's player. Null if no video or uknown.
     *
     * @since 1.0.0
     * @type {null|number}
     */
    this.buffer = null;

    // If the user has authorized an extension to see their Twitch ID, it will be
    // hidden in the JWT payload.
    this.extractJWTInfo(auth.token);
  }

  /**
   * Attempts to parse the provided JWT and persist any found information in store.
   * @since 1.0.0
   *
   * @param {object} jwt - The auth JWT token as returned from the auth harness.
   */
  extractJWTInfo(jwt) {
    try {
      const splitToken = jwt.split('.');
      if (splitToken.length === 3) {
        const token = JSON.parse(window.atob(splitToken[1]));
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
   * @param {object} auth - An auth JWT with updated user information.
   */
  updateAuth(auth) {
    this.twitchJWT = auth.token;
    this.extractJWTInfo(auth.token);
  }
}

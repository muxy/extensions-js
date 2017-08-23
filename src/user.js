// User stores fields related to the current extension user
// in vuex, and manages updating/accessing those fields.
export default class User {
  constructor(auth) {
    // channelID holds the numeric id of the channel the user is currently watching.
    this.channelID = auth.channelId;

    // twitchJWT holds the raw JWT response from the Twitch Extension SDK.
    this.twitchJWT = auth.token;

    // twitchOpaqueID is a Twitch generated ID that will uniquely identify this
    // user (if they are logged in), but does not give us access to their
    // Twitch ID.
    this.twitchOpaqueID = auth.userId;

    // twitchID is this viewer's actual Twitch ID. Used to coordinate access to
    // other Twitch services and across the Twitch universe.
    this.twitchID = null;

    // True if the user has an active muxy account.
    this.registeredWithMuxy = false;

    // muxyID is this viewer's ID on Muxy. Used to allow configuration and access
    // to Twitch services from Muxy.
    this.muxyID = null;

    // visualizationID is a unique user string that can be used to identify this user
    // on Muxy's a.muxy.io subdomain. This is used for things like alerts and
    // cheer visualizations.
    this.visualizationID = '';

    // role is the current user's role in the extension. May be one of
    // ['viewer', 'config'].
    this.role = 'viewer';

    // ip is the user's ip address as returned from the `UserInfo` state endpoint.
    this.ip = '';

    // game being played by streamer
    this.game = '';

    // Video Mode default, fullscreen, or theatre
    this.videoMode = 'default';

    // Current Bitrate
    this.bitrate = null;

    // Current Latency
    this.latency = null;

    // If the user has authorized an extension to see their Twitch ID, it will be
    // hidden in the JWT payload.
    this.extractJWTInfo(auth.token);
  }

  // extractJWTInfo attempts to parse the provided JWT and persist any found
  // information in store.
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

  // anonymous returns whether or not the current extension user is anonymous.
  // Twitch defines an anonymous user as one who is not logged in to the channel
  // page running this extension, or one who has explicitly opted-out from sharing
  // auth information with this extension.
  anonymous() {
    return !this.twitchOpaqueID || this.twitchOpaqueID[0] !== 'U';
  }

  // updateAuth stores values from a new auth token in the local store.
  updateAuth(auth) {
    this.twitchJWT = auth.token;
    this.extractJWTInfo(auth.token);
  }
}

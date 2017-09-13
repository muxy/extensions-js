import { ENVIRONMENTS, consolePrint, CurrentEnvironment } from './util';
import Analytics from './analytics';
import StateClient from './state-client';
import Ext from './twitch-ext';
import TwitchClient from './twitch-client';
import Messenger from './messenger';
import SDK from './sdk';
import User from './user';

import * as PackageConfig from '../package.json';

/**
 * The main extension entry interface. Only one instance of this class should ever exist.
 *
 * This class handles environment detection, data harness collection and updates (for
 * authentication and backend communication) and SDK instance creation.
 *
 * On import or inclusion in an HTML file, will be globally accessible as the `Muxy` object.
 */
class Muxy {
  constructor() {
    /**
     * A flag used to signal when {@link setup} has been called. This function must be called once
     * and only once before SDK objects may be created.
     *
     * @public
     * @type {boolean}
     */
    this.setupCalled = false;

    /**
     * The Twitch Channel ID to use for testing. This will determine who the viewer and/or
     * broadcaster appears as when testing the extension.
     *
     * Changes to this value must be made before calling {@link SDK}.
     *
     * @public
     * @type {string}
     */
    this.testChannelID = '23161357';

    /**
     * Role for the current user in the sandbox environment. May be one of {@link User.UserRoles}.
     *
     * Changes to this value must be made before calling {@link SDK}.
     *
     * @public
     * @type {string}
     */
    this.testJWTRole = 'viewer';

    /**
     * The Twitch ClientID as returned from the auth callback. This is used for all
     * requests to Twitch's API.
     *
     * @public
     * @readonly
     * @type {string}
     */
    this.twitchClientID = '';

    /**
     * Internal cache for created {@link SDK} client objects mapped to SDK id.
     *
     * @private
     * @type {Object}
     */
    this.SDKClients = {};

    /**
     * Internal {@link StateClient}.
     *
     * @private
     * @type {StateClient}
     */
    this.client = new StateClient();

    /**
     * Internal {@link Messenger}.
     *
     * @private
     * @type {Messenger}
     */
    this.messenger = new Messenger();

    /**
     * Internal {@link TwitchClient}.
     *
     * @private
     * @type {TwitchClient}.
     */
    this.cachedTwitchClient = null;

    /**
     * Internal {@link Analytics}.
     *
     * @private
     * @type {Analytics}.
     */
    this.analytics = null;

    /**
     * Internal caching for most recent context callback result.
     *
     * @private
     * @type {Object}
     */
    this.context = {};

    /**
     * Internal reference to the current {@link User}.
     *
     * @private
     * @type {User}
     */
    this.user = null;

    /**
     * Promise to resolve once the Muxy singleton is full loaded and ready
     * to be used.
     *
     * @private
     * @type {Promise}
     */
    this.loadPromise = new Promise((resolve, reject) => {
      /** @ignore */
      this.loadResolve = resolve;
      /** @ignore */
      this.loadReject = reject;
    });

    StateClient.setEnvironment(CurrentEnvironment());
  }

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
   * >
     ┌──────────────────────────────────────────────────┐
     | Muxy Extensions SDK                              |
     | v1.0.0 © 2017 Muxy, Inc.                         |
     | https://github.com/muxy/extensions-js            |
     |                                                  |
     | Running in sandbox environment outside of Twitch |
     └──────────────────────────────────────────────────┘
   *
   */
  static printInfo() {
    const SDKInfoText = [
      'Muxy Extensions SDK',
      `v${PackageConfig.version} © ${new Date().getFullYear()} ${PackageConfig.author}`,
      PackageConfig.repository,
      ''
    ];

    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.SANDBOX_DEV:
        SDKInfoText.push('Running in sandbox environment outside of Twitch');
        break;
      case ENVIRONMENTS.SANDBOX_TWITCH:
        SDKInfoText.push('Running in sandbox environment on Twitch');
        break;
      case ENVIRONMENTS.PRODUCTION:
        SDKInfoText.push('Running on production');
        break;
      case ENVIRONMENTS.SERVER:
        SDKInfoText.push('Running on a NodeJS server');
        break;
      default:
        SDKInfoText.push('Could not determine execution environment.');
    }

    consolePrint(SDKInfoText, { boxed: true });
  }

  /**
   * Called the first time the {@link setup} is called to start watching the auth
   * and context callbacks and updating values automatically. This method should
   * not normally be called directly.
   *
   * @since 1.0.0
   * @private
   *
   * @param {string} extensionID - The Twitch Extension Client ID to use for all
   * Twitch API requests.
   */
  watchAuth(extensionID) {
    Ext.extensionID = extensionID;
    Ext.testChannelID = this.testChannelID;
    Ext.testJWTRole = this.testJWTRole;

    // Auth callback handler
    Ext.onAuthorized(auth => {
      if (!auth) {
        this.loadReject();
        return;
      }

      this.twitchClientID = auth.clientId;
      this.messenger.extensionID = auth.clientId;
      this.messenger.channelID = auth.channelId;
      this.client.updateAuth(auth.token);

      const resolvePromise = user => {
        this.user = user;

        const keys = Object.keys(this.SDKClients);
        for (let i = 0; i < keys.length; i += 1) {
          this.SDKClients[keys[i]].user = this.user;
        }

        if (this.analytics) {
          this.analytics.user = this.user;
        }

        this.loadResolve();
      };

      const onFirstAuth = () => {
        this.client.getUserInfo(extensionID).then(userinfo => {
          const user = new User(auth);
          user.ip = userinfo.ip_address;
          user.registeredWithMuxy = userinfo.registered || false;
          user.visualizationID = userinfo.visualization_id || '';

          updateUserContextSettings();

          resolvePromise(user);
        });
      };

      if (this.user) {
        this.user.updateAuth(auth);
        resolvePromise(this.user);
      } else {
        onFirstAuth();
      }
    });

    // Context callback handler
    function updateUserContextSettings() {
      if (!this.user || !this.context) {
        return;
      }

      // Set Video Mode
      if (this.context.isFullScreen) {
        this.user.videoMode = 'fullscreen';
      } else if (this.context.isTheatreMode) {
        this.user.videoMode = 'theatre';
      } else {
        this.user.videoMode = 'default';
      }

      this.user.game = this.context.game;
      this.user.bitrate = Math.round(this.context.bitrate || 0);
      this.user.latency = this.context.hlsLatencyBroadcaster;
      this.user.buffer = this.context.bufferSize;

      // If buffer size goes to 0, send an analytics event that
      // this user's video is buffering.
      if (this.context.bufferSize < 1 && this.analytics) {
        this.analytics.sendEvent('video', 'buffer', 1);
      }
    }

    Ext.onContext(context => {
      this.context = context;

      if (this.user) {
        updateUserContextSettings();
        // Context callback called before
      }
    });
  }

  /**
   * Mandatory SDK setup call.
   *
   * @param {Object} options
   *  - extensionID
   *  - uaString
   *  - quiet
   */
  setup(options) {
    if (this.setupCalled) {
      throw new Error('Muxy.setup() was called twice');
    }

    this.twitchClientID = options.extensionID;
    this.cachedTwitchClient = new TwitchClient(this.twitchClientID);

    if (options.uaString) {
      this.analytics = new Analytics(options.uaString, this.loadPromise);
    }

    if (!options.quiet) {
      Muxy.printInfo();
    }

    this.setupCalled = true;
  }

  /**
   * Returns a version of the Muxy SDK associated with the provided identifier.
   *
   * @param {string} id - A unique identifier for this extension or app.
   */
  SDK(id) {
    if (!this.setupCalled) {
      throw new Error('Muxy.setup() must be called before creating a new SDK instance');
    }

    const identifier = id || this.twitchClientID;
    if (!identifier) {
      return null;
    }

    if (!this.watchingAuth) {
      this.watchingAuth = true;
      this.watchAuth(identifier);
    }

    if (!this.SDKClients[identifier]) {
      this.SDKClients[identifier] = new SDK(
        identifier,
        this.client,
        this.user,
        this.messenger,
        this.analytics,
        this.loadPromise
      );
    }

    return this.SDKClients[identifier];
  }

  /**
   * Returns a twitch client to use. Can only be used
   * after the loaded promise resolves.
   */
  TwitchClient() {
    if (!this.setupCalled) {
      throw new Error('Muxy.setup() must be called before creating a new TwitchClient instance');
    }

    return this.cachedTwitchClient;
  }
}

export default Muxy;

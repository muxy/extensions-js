import Analytics from './analytics';
import { DebuggingOptions, DebugOptions } from './debug';
import DefaultMessenger, { Messenger } from './messenger';
import SDK from './sdk';
import StateClient from './state-client';
import TwitchClient from './twitch-client';
import Ext from './twitch-ext';
import User from './user';
import Util from './util';

import * as PackageConfig from '../package.json';

export interface SDKMap {
  [key: string]: SDK;
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
export class Muxy {
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
  public static printInfo() {
    const SDKInfoText = [
      'Muxy Extensions SDK',
      `v${(PackageConfig as any).version} © ${new Date().getFullYear()} ${
        (PackageConfig as any).author
      }`,
      (PackageConfig as any).repository,
      ''
    ];

    switch (Util.currentEnvironment().environment) {
      case Util.Environments.Testing.environment:
        SDKInfoText.push('Running in testing environment outside of Twitch');
        break;
      case Util.Environments.SandboxDev.environment:
        SDKInfoText.push('Running in sandbox environment outside of Twitch');
        break;
      case Util.Environments.SandboxTwitch.environment:
        SDKInfoText.push('Running in sandbox environment on Twitch');
        break;
      case Util.Environments.Production.environment:
        SDKInfoText.push('Running on production');
        break;
      case Util.Environments.Server.environment:
        SDKInfoText.push('Running on a NodeJS server');
        break;
      default:
        SDKInfoText.push('Could not determine execution environment.');
    }

    Util.consolePrint(SDKInfoText, { boxed: true });
  }

  public Util: Util;
  public DebuggingOptions: typeof DebuggingOptions;
  public SDKClients: SDKMap;

  public setupCalled: boolean;
  public twitchClientID: string;
  public client: StateClient;
  public messenger: Messenger;
  public cachedTwitchClient: TwitchClient;
  public analytics: Analytics;
  public context: object;
  public user: User;
  public loadPromise: Promise<void>;
  public loadResolve: () => void;
  public loadReject: (err: string) => void;
  public SKUs: object[];
  public watchingAuth: boolean;

  // Test variables.
  public testChannelID: string;
  public testJWTRole: string;
  public debugOptions: DebugOptions;

  /**
   * Private constructor for singleton use only.
   * @ignore
   */
  constructor() {
    /**
     * Convenience accessor for users of the Muxy library, makes the util functions accessible
     * from `Muxy.Util.<whatever>`. Full documentation in the util.js file.
     *
     * @ignore
     */
    this.Util = Util;

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
     * Role for the current user in the sandbox environment. May be one of {@link User.Roles}.
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
     * @ignore
     * @type {Object}
     */
    this.SDKClients = {};

    /**
     * Internal {@link StateClient}.
     *
     * @ignore
     * @type {StateClient}
     */
    this.client = null;

    /**
     * Internal {@link Messenger}.
     *
     * @ignore
     * @type {Messenger}
     */
    this.messenger = null;

    /**
     * Internal {@link TwitchClient}.
     *
     * @ignore
     * @type {TwitchClient}.
     */
    this.cachedTwitchClient = null;

    /**
     * Internal {@link Analytics}.
     *
     * @ignore
     * @type {Analytics}.
     */
    this.analytics = null;

    /**
     * Internal caching for most recent context callback result.
     *
     * @ignore
     * @type {Object}
     */
    this.context = {};

    /**
     * Internal reference to the current {@link User}.
     *
     * @ignore
     * @type {User}
     */
    this.user = null;

    /**
     * Promise to resolve once the Muxy singleton is full loaded and ready
     * to be used. Use the {@see loaded} method instead of accessing directly.
     *
     * @ignore
     * @type {Promise}
     */
    this.loadPromise = new Promise((resolve, reject) => {
      /** @ignore */
      this.loadResolve = resolve;
      /** @ignore */
      this.loadReject = reject;
    });

    /**
     * List of SKUs and product metadata that is used for monetization purposes
     *
     * @ignore
     * @type {Object}
     */
    this.SKUs = [];

    /**
     * Debugging options. Should only be set by a call to .debug()
     * @private
     * @type {object}
     */
    this.debugOptions = null;

    /**
     * Internal variable to handle setup functionality.
     *
     * @ignore
     * @type {boolean}
     */
    this.watchingAuth = false;

    StateClient.setEnvironment(Util.currentEnvironment());
  }

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
  public watchAuth(extensionID: string) {
    Ext.extensionID = extensionID;

    // Auth callback handler
    Ext.onAuthorized(this.debugOptions, auth => {
      if (!auth) {
        this.loadReject('Received invalid authorization from Twitch');
        return;
      }

      this.twitchClientID = auth.clientId;
      this.messenger.extensionID = auth.clientId;
      this.messenger.channelID = auth.channelId;
      this.client.updateAuth(auth.token);

      const resolvePromise = user => {
        this.user = user;

        const keys = Object.keys(this.SDKClients);
        for (const key of keys) {
          this.SDKClients[key].updateUser(this.user);
        }

        if (this.analytics) {
          this.analytics.user = this.user;
        }
      };

      const onFirstAuth = () => {
        this.client
          .getUserInfo(extensionID)
          .then(userinfo => {
            const user = new User(auth);
            user.ip = userinfo.ip_address;
            user.registeredWithMuxy = userinfo.registered || false;
            user.visualizationID = userinfo.visualization_id || '';

            const offset = userinfo.server_time - new Date().getTime();

            const keys = Object.keys(this.SDKClients);
            for (const key of keys) {
              this.SDKClients[key].timeOffset = offset;
            }

            updateUserContextSettings.call(this);

            resolvePromise(user);
            this.loadResolve();
          })
          .catch(err => {
            this.loadReject(err);
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
      this.user.theme = this.context.theme;
      this.user.volume = this.context.volume;

      const keys = Object.keys(this.SDKClients);
      for (const key of keys) {
        this.SDKClients[key].updateUser(this.user);
      }

      // If buffer size goes to 0, send an analytics event that
      // this user's video is buffering.
      if (this.context.bufferSize < 1 && this.analytics) {
        this.analytics.user = this.user;
        this.analytics.sendEvent('video', 'buffer', 1);
      }
    }

    Ext.onContext(context => {
      this.context = context;

      if (this.user) {
        updateUserContextSettings.call(this);
      }
    });
  }

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
  public setup(options) {
    if (this.setupCalled) {
      throw new Error('Muxy.setup() can only be called once.');
    }

    if (!options || (!options.extensionID && !options.clientID)) {
      throw new Error('Muxy.setup() was called without an Extension Client ID');
    }

    if (!this.debugOptions) {
      const noop = (...args: any[]) => {
        /* Default to doing nothing on callback */
      };

      this.debugOptions = {
        channelID: this.testChannelID,
        role: this.testJWTRole,

        onPubsubListen: noop,
        onPubsubReceive: noop,
        onPubsubSend: noop
      };
    }

    this.client = new StateClient(this.debugOptions);
    this.messenger = DefaultMessenger(this.debugOptions);

    this.twitchClientID = options.clientID || options.extensionID;
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
   * Setup debugging options for the application. This allows the application to fake
   * what user they are running as, the channel the extension is running on, pubsub debug
   * message frequency, and even the backend URL that the extension uses.
   *
   * This should be called before setup().
   *
   * @param {*} options - an instance of DebuggingOptions
   */
  public debug(options) {
    this.debugOptions = {
      channelID: this.testChannelID,
      role: this.testJWTRole,

      ...this.debugOptions,
      ...options.options
    };
  }

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
  public SDK(id?: string) {
    /* Implemented below to deal with scoping issues. */
  }

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
  public TwitchClient() {
    /* Implemented below to deal with scoping issues. */
  }
}

/**
 * Global Muxy singleton object.
 * @ignore
 */
const mxy: Muxy = new Muxy();

// Constructors for sub-objects are added to the singleton so that using the `new`
// operator doesn't mess with the mxy singleton scope. Only applies to SDK, TwitchClient
// and Analytics if we ever add that functionality.

/** @ignore */
mxy.SDK = function NewSDK(id?: string) {
  if (!mxy.setupCalled) {
    throw new Error(
      'Muxy.setup() must be called before creating a new SDK instance'
    );
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
    mxy.SDKClients[identifier] = new SDK(
      identifier,
      mxy.client,
      mxy.user,
      mxy.messenger,
      mxy.analytics,
      mxy.loadPromise,
      mxy.SKUs,
      this.debugOptions
    );
  }

  return mxy.SDKClients[identifier];
};

/** @ignore */
mxy.TwitchClient = function NewTwitchClient() {
  if (!mxy.setupCalled) {
    throw new Error(
      'Muxy.setup() must be called before creating a new TwitchClient instance'
    );
  }

  return mxy.cachedTwitchClient;
};

mxy.DebuggingOptions = DebuggingOptions;

/**
 * Only export the Muxy singleton to avoid creation of competing/conflicting instances.
 * @ignore
 */
export default mxy;

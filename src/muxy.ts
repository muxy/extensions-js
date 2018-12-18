/**
 * @module Muxy
 */

import Analytics from './analytics';
import { DebuggingOptions, DebugOptions } from './debug';
import DefaultMessenger, { Messenger } from './messenger';
import SDK, { TriviaQuestionState } from './sdk';
import StateClient from './state-client';
import TwitchClient from './twitch-client';
import Ext from './twitch-ext';
import User from './user';
import Util from './util';

import * as PackageConfig from '../package.json';
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
  watchAuth(extensionID: string);

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
class Muxy implements MuxyInterface {
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
      `v${(PackageConfig as any).version} © ${new Date().getFullYear()} ${(PackageConfig as any).author}`,
      (PackageConfig as any).repository,
      ''
    ];

    switch (Util.currentEnvironment()) {
      case Util.Environments.Production:
        SDKInfoText.push('Running on production');
        break;
      case Util.Environments.SandboxDev:
        SDKInfoText.push('Running in sandbox environment outside of Twitch');
        break;
      case Util.Environments.SandboxTwitch:
        SDKInfoText.push('Running in sandbox environment on Twitch');
        break;
      case Util.Environments.SandboxAdmin:
        SDKInfoText.push('Running in sandbox environment in the Admin panel');
        break;
      case Util.Environments.Admin:
        SDKInfoText.push('Running in the Admin panel');
        break;
      case Util.Environments.Testing:
        SDKInfoText.push('Running in testing environment outside of Twitch');
        break;
      case Util.Environments.Server:
        SDKInfoText.push('Running on a NodeJS server');
        break;
      default:
        SDKInfoText.push('Could not determine execution environment.');
    }

    Util.consolePrint(SDKInfoText, { boxed: true });
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
  public SDK = SDK;

  /**
   * Makes trivia state enum available from the global `Muxy` object
   */
  public TriviaQuestionState = TriviaQuestionState;

  /**
   * Convenience accessor for users of the Muxy library, makes the util functions accessible
   * from `Muxy.Util.<whatever>`. Full documentation in the util.js file.
   *
   * @ignore
   */
  public Util: Util;
  public DebuggingOptions: typeof DebuggingOptions;

  /**
   * Internal cache for created {@link SDK} client objects mapped to SDK id.
   *
   * @ignore
   * @type {Object}
   */
  public SDKClients: SDKMap;

  /**
   * A flag used to signal when {@link setup} has been called. This function must be called once
   * and only once before SDK objects may be created.
   *
   * @public
   * @type {boolean}
   */
  public setupCalled: boolean;

  /**
   * The Twitch ClientID as returned from the auth callback. This is used for all
   * requests to Twitch's API.
   *
   * @public
   * @readonly
   * @type {string}
   */
  public twitchClientID: string;

  /**
   * Internal {@link StateClient}.
   *
   * @ignore
   * @type {StateClient}
   */
  public client: StateClient;

  /**
   * Internal {@link Messenger}.
   *
   * @ignore
   * @type {Messenger}
   */
  public messenger: Messenger;

  /**
   * Internal {@link TwitchClient}.
   *
   * @ignore
   * @type {TwitchClient}.
   */
  public cachedTwitchClient: TwitchClient;

  /**
   * Internal {@link Analytics}.
   *
   * @ignore
   * @type {Analytics}.
   */
  public analytics: Analytics;

  /**
   * Internal caching for most recent context callback result.
   *
   * @ignore
   * @type {TwitchContext}
   */
  public context?: TwitchContext;

  /**
   * Internal reference to the current {@link User}.
   *
   * @ignore
   * @type {User}
   */
  public user: User;

  /**
   * Promise to resolve once the Muxy singleton is full loaded and ready
   * to be used. Use the {@see loaded} method instead of accessing directly.
   *
   * @ignore
   * @type {Promise}
   */
  public loadPromise: Promise<void>;
  public loadResolve: () => void;
  public loadReject: (err: string) => void;

  /**
   * List of SKUs and product metadata that is used for monetization purposes
   *
   * @ignore
   * @type {Object}
   */
  public SKUs: object[];

  /**
   * Internal variable to handle setup functionality.
   *
   * @ignore
   * @type {boolean}
   */
  public watchingAuth: boolean;

  // Test variables.
  /**
   * The Twitch Channel ID to use for testing. This will determine who the viewer and/or
   * broadcaster appears as when testing the extension.
   *
   * Changes to this value must be made before calling {@link SDK}.
   *
   * @public
   * @type {string}
   */
  public testChannelID: string;

  /**
   * Role for the current user in the sandbox environment. May be one of {@link User.Roles}.
   *
   * Changes to this value must be made before calling {@link SDK}.
   *
   * @public
   * @type {string}
   */

  public testJWTRole: string;

  /**
   * Debugging options. Should only be set by a call to .debug()
   * @internal
   * @type {object}
   */
  public debugOptions: DebugOptions;

  /**
   * Private constructor for singleton use only.
   * @ignore
   */
  constructor() {
    this.Util = Util;
    this.setupCalled = false;
    this.testChannelID = '23161357';
    this.testJWTRole = 'viewer';
    this.twitchClientID = '';
    this.SDKClients = {};
    this.client = null;
    this.messenger = null;
    this.cachedTwitchClient = null;
    this.analytics = null;
    this.user = null;

    this.loadPromise = new Promise((resolve, reject) => {
      /** @ignore */
      this.loadResolve = resolve;
      /** @ignore */
      this.loadReject = reject;
    });

    this.SKUs = [];
    this.debugOptions = null;
    this.watchingAuth = false;

    StateClient.setEnvironment(Util.currentEnvironment(), null);
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
          .immediateGetUserInfo(extensionID)
          .then(userinfo => {
            const offset = userinfo.server_time - new Date().getTime();

            const user = new User(auth);
            user.ip = userinfo.ip_address;
            user.registeredWithMuxy = userinfo.registered || false;
            user.visualizationID = userinfo.visualization_id || '';
            user.timeOffset = offset;

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
    const updateUserContextSettings = () => {
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
    };

    Ext.onContext(context => {
      this.context = context;

      if (this.user) {
        updateUserContextSettings.call(this);
      }

      const keys = Object.keys(this.SDKClients);
      for (const key of keys) {
        this.SDKClients[key].contextObservers.notify(context);
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
  public setup(options: SetupOptions & DeprecatedSetupOptions) {
    if (this.setupCalled) {
      throw new Error('Muxy.setup() can only be called once.');
    }

    if (!options) {
      throw new Error('Muxy.setup() was called with invalid options');
    }

    const clientID = options.clientID || options.extensionID;
    if (!clientID) {
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

    if (this.debugOptions.environment) {
      Util.overrideEnvironment = Util.Environments[this.debugOptions.environment];
    }

    this.client = new StateClient(this.loadPromise, this.debugOptions);
    this.messenger = DefaultMessenger(this.debugOptions);

    this.twitchClientID = clientID;
    this.cachedTwitchClient = new TwitchClient(this.twitchClientID);
    this.cachedTwitchClient.promise = this.loadPromise;

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
  public debug(options: DebuggingOptions) {
    this.debugOptions = {
      channelID: this.testChannelID,
      role: this.testJWTRole,

      ...this.debugOptions,
      ...options.options
    };
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
  public TwitchClient(): TwitchClient {
    /* Implemented below to deal with scoping issues. */
    return undefined;
  }
}

/**
 * Global Muxy singleton object.
 * @ignore
 */
const mxy: Muxy = new Muxy();

/** @ignore */
mxy.TwitchClient = function NewTwitchClient(): TwitchClient {
  if (!mxy.setupCalled) {
    throw new Error('Muxy.setup() must be called before creating a new TwitchClient instance');
  }

  return mxy.cachedTwitchClient;
};

mxy.DebuggingOptions = DebuggingOptions;

// Backwards compatibility shim
// tslint:disable-next-line
mxy['default'] = mxy;

/**
 * Only export the Muxy singleton to avoid creation of competing/conflicting instances.
 * @ignore
 */
export default mxy;

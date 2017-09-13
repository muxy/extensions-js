import { ENVIRONMENTS, consolePrint, CurrentEnvironment } from './util';
import Analytics from './analytics';
import Client from './state-client';
import Ext from './twitch-ext';
import TwitchClient from './twitch-client';
import Messenger from './messenger';
import SDK from './sdk';
import User from './user';

import * as PackageConfig from '../package.json';

/**
 * Muxy SDK Singleton. This class handles environment detection, data harness collection
 * and updates (for authentication and backend communication) and SDK instance creation.
 *
 * On import or inclusion in an HTML file, will be globally accessible as the `Muxy` object.
 */
export default function Muxy() {
  const muxy = {};

  // muxy.setup() must be called before creating instances of the SDK, TwitchClient and Analytics.
  muxy.setupCalled = false;

  /**
   * The Twitch Channel ID to use for testing. This will determine who the viewer and/or broadcaster
   * appears as when testing the extension.
   *
   * Changes to this value must be made before calling `Muxy.SDK()`.
   *
   * @type string
   */
  muxy.testChannelID = '23161357';

  // Role to create an auth token with in testing env
  // user can change this with Muxy.testJWTRole before Muxy.SDK
  muxy.testJWTRole = 'viewer';

  muxy.SDKClients = {};

  muxy.client = new Client();
  muxy.messenger = new Messenger();

  muxy.twitchClientID = '';
  muxy.cachedTwitchClient = null;

  muxy.analytics = null;

  // Holds the most recent results from the context callback.
  muxy.context = {};

  muxy.loadPromise = new Promise((resolve, reject) => {
    muxy.loadResolve = resolve;
    muxy.loadReject = reject;
  });

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

  Client.setEnvironment(CurrentEnvironment());
  consolePrint(SDKInfoText, { boxed: true });

  muxy.watchAuth = extensionID => {
    Ext.extensionID = extensionID;
    Ext.testChannelID = muxy.testChannelID;
    Ext.testJWTRole = muxy.testJWTRole;

    // Auth callback handler
    Ext.onAuthorized(auth => {
      if (!auth) {
        muxy.loadReject();
        return;
      }

      muxy.twitchClientID = auth.clientId;
      muxy.messenger.extensionID = auth.clientId;
      muxy.messenger.channelID = auth.channelId;
      muxy.client.updateAuth(auth.token);

      const resolvePromise = user => {
        muxy.user = user;

        const keys = Object.keys(muxy.SDKClients);
        for (let i = 0; i < keys.length; i += 1) {
          muxy.SDKClients[keys[i]].user = muxy.user;
        }

        if (muxy.analytics) {
          muxy.analytics.user = muxy.user;
        }

        muxy.loadResolve();
      };

      const onFirstAuth = () => {
        muxy.client.getUserInfo(extensionID).then(userinfo => {
          const user = new User(auth);
          user.ip = userinfo.ip_address;
          user.registeredWithMuxy = userinfo.registered || false;
          user.visualizationID = userinfo.visualization_id || '';

          updateUserContextSettings();

          resolvePromise(user);
        });
      };

      if (muxy.user) {
        muxy.user.updateAuth(auth);
        resolvePromise(muxy.user);
      } else {
        onFirstAuth();
      }
    });

    // Context callback handler
    function updateUserContextSettings() {
      if (!muxy.user || !muxy.context) {
        return;
      }

      // Set Video Mode
      if (muxy.context.isFullScreen) {
        muxy.user.videoMode = 'fullscreen';
      } else if (muxy.context.isTheatreMode) {
        muxy.user.videoMode = 'theatre';
      } else {
        muxy.user.videoMode = 'default';
      }

      muxy.user.game = muxy.context.game;
      muxy.user.bitrate = Math.round(muxy.context.bitrate || 0);
      muxy.user.latency = muxy.context.hlsLatencyBroadcaster;
      muxy.user.buffer = muxy.context.bufferSize;

      // If buffer size goes to 0, send an analytics event that
      // this user's video is buffering.
      if (muxy.context.bufferSize < 1 && muxy.analytics) {
        muxy.analytics.sendEvent('video', 'buffer', 1);
      }
    }

    Ext.onContext(context => {
      muxy.context = context;

      if (muxy.user) {
        updateUserContextSettings();
        // Context callback called before
      }
    });
  };

  /**
   * Mandatory SDK setup call.
   *
   * @param {Object} options
   *  - extensionID
   *  - uaString
   */
  muxy.setup = options => {
    muxy.twitchClientID = options.extensionID;
    muxy.cachedTwitchClient = new TwitchClient(muxy.twitchClientID);

    if (options.uaString) {
      muxy.analytics = new Analytics(options.uaString, muxy.loadPromise);
    }

    muxy.setupCalled = true;
  };

  /**
   * Returns a version of the Muxy SDK associated with the provided identifier.
   *
   * @param {string} id - A unique identifier for this extension or app.
   */
  muxy.SDK = function NewSDK(id) {
    if (!muxy.setupCalled) {
      throw new Error('muxy.setup() must be called before creating a new SDK instance');
    }

    const identifier = id || muxy.twitchClientID;
    if (!identifier) {
      return null;
    }

    if (!muxy.watchingAuth) {
      muxy.watchingAuth = true;
      muxy.watchAuth(identifier);
    }

    if (!muxy.SDKClients[identifier]) {
      muxy.SDKClients[identifier] = new SDK(
        identifier,
        muxy.client,
        muxy.user,
        muxy.messenger,
        muxy.analytics,
        muxy.loadPromise
      );
    }

    return muxy.SDKClients[identifier];
  };

  /**
   * Returns a twitch client to use. Can only be used
   * after the loaded promise resolves.
   */
  muxy.TwitchClient = function NewTwitchClient() {
    if (!muxy.setupCalled) {
      throw new Error('muxy.setup() must be called before creating a new TwitchClient instance');
    }

    return muxy.cachedTwitchClient;
  };

  return muxy;
}

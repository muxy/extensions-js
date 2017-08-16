import { ENVIRONMENTS, consolePrint, CurrentEnvironment } from './util';
import Analytics from './analytics';
import Client from './state-client';
import Ext from './twitch-ext';
import TwitchClient from './twitch-client';
import Messenger from './messenger';
import SDK from './sdk';
import User from './user';

import * as PackageConfig from '../package.json';

const DEFAULT_UA_STRING = 'UA-99381428-2';

function Muxy() {
  const muxy = {};

  // muxy.setup() must be called before creating instances of the SDK, TwitchClient and Analytics.
  muxy.setupCalled = false;

  // Channel to use when in testing env (currently Lirik)
  // user can change this with Muxy.testChannelID before Muxy.SDK
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

  muxy.loadPromise = new Promise((resolve, reject) => {
    muxy.loadResolve = resolve;
    muxy.loadReject = reject;
  });

  const SDKInfoText = [
    'Muxy Extensions SDK',
    `v${PackageConfig.version} © ${(new Date()).getFullYear()} ${PackageConfig.author}`,
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

  muxy.watchAuth = (extensionID) => {
    Ext.extensionID = extensionID;
    Ext.testChannelID = muxy.testChannelID;
    Ext.testJWTRole = muxy.testJWTRole;

    Ext.onAuthorized((auth) => {
      if (!auth) {
        muxy.loadReject();
        return;
      }

      muxy.twitchClientID = auth.clientId;
      muxy.messenger.extensionID = auth.clientId;
      muxy.messenger.channelID = auth.channelId;
      muxy.client.updateAuth(auth.token);

      const resolvePromise = (user) => {
        muxy.user = user;

        const keys = Object.keys(muxy.SDKClients);
        for (let i = 0; i < keys.length; i += 1) {
          muxy.SDKClients[keys[i]].user = muxy.user;
        }

        muxy.analytics.user = muxy.user;
        muxy.loadResolve();
      };

      const onFirstAuth = () => {
        muxy.client.getUserInfo(extensionID).then((userinfo) => {
          const user = new User(auth);
          user.registeredWithMuxy = userinfo.registered || false;
          user.ip = userinfo.ip_address;

          resolvePromise(user);
        });
      }


      if (muxy.user) {
        muxy.user.updateAuth(auth);
        resolvePromise(muxy.user)
      } else {
        onFirstAuth();
      }
    });

    // Ext.onContext(this.onContext);
  };

  /**
   * Mandatory SDK setup call.
   *
   * @param {Object} options
   *  - extensionID
   *  - uaString
   */
  muxy.setup = (options) => {
    muxy.twitchClientID = options.extensionID;
    muxy.cachedTwitchClient = new TwitchClient(muxy.twitchClientID);

    const uaString = options.uaString || DEFAULT_UA_STRING;
    muxy.analytics = new Analytics(uaString, muxy.loadPromise);

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
      muxy.SDKClients[identifier] = new SDK(identifier,
        muxy.client, muxy.user, muxy.messenger, muxy.analytics,
        muxy.loadPromise);
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

// Export a globally instantiated Muxy object. This is used to manage auth tokens
// and other niceties for the lower-level SDK objects (e.g. SDK, Analytics, TwitchClient, etc).
module.exports = new Muxy();

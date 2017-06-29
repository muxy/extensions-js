import { ENVIRONMENTS, consolePrint, CurrentEnvironment } from './util';
import Ext from './twitch-ext';
import Client from './state-client';
import SDK from './sdk';
import User from './user';
import Messenger from './messenger';

import * as PackageConfig from '../package.json';

function Muxy() {
  const muxy = {};

  // Channel to use when in testing env (currently Lirik)
  // user can change this with Muxy.testChannelID before Muxy.SDK
  muxy.testChannelID = '23161357';

  // Role to create an auth token with in testing env
  // user can change this with Muxy.testJWTRole before Muxy.SDK
  muxy.testJWTRole = 'viewer';

  muxy.SDKClients = {};

  muxy.client = new Client();
  muxy.messenger = new Messenger();

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
    case ENVIRONMENTS.DEV:
      SDKInfoText.push('Running in development mode');
      break;
    case ENVIRONMENTS.STAGING:
      SDKInfoText.push('Running in staging environment');
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

  muxy.watchAuth = (extensionID) => {
    Ext.appID = extensionID;
    Ext.testChannelID = this.testChannelID;
    Ext.testJWTRole = this.testJWTRole;

    Ext.onAuthorized((auth) => {
      if (!auth) {
        muxy.loadReject();
      }

      muxy.messenger.extensionID = auth.clientId;
      muxy.messenger.channelID = auth.channelId;
      muxy.client.updateAuth(auth.token);
      muxy.user = new User(auth);

      const keys = Object.keys(muxy.SDKClients);
      for (let i = 0; i < keys.length; i += 1) {
        muxy.SDKClients[keys[i]].user = muxy.user;
      }

      muxy.loadResolve();
    });

    // Ext.onContext(this.onContext);
  };

  /**
   * Returns a SDK to use
   */
  muxy.SDK = function MuxySDK(extensionID) {
    if (!muxy.SDKClients[extensionID]) {
      muxy.SDKClients[extensionID] = new SDK(extensionID, muxy.client, muxy.user,
        muxy.messenger, muxy.loadPromise);
    }

    if (!muxy.watchingAuth) {
      muxy.watchingAuth = true;
      muxy.watchAuth(extensionID);
    }

    return muxy.SDKClients[extensionID];
  };

  return muxy;
}

// Do this so that the entrypoint as a global library is correct.
// Babel / webpack have some weirdness
module.exports = new Muxy();

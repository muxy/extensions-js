import { ENVIRONMENTS, consolePrint, currentEnvironment } from './util';
import Ext from './twitch-ext';
import Client from './state-client';
import SDK from './sdk';
import { createMessenger } from './messenger';

import * as PackageConfig from '../package.json';

class Muxy {
  constructor() {
    // Channel to use when in testing env (currently Lirik)
    // user can change this with Muxy.testChannelID before Muxy.SDK
    this.testChannelID = '23161357';

    // Role to create an auth token with in testing env
    // user can change this with Muxy.testJWTRole before Muxy.SDK
    this.testJWTRole = 'viewer';

    this.SDKClients = {};

    this.client = new Client();
    this.messenger = createMessenger();

    this.loadPromise = new Promise((resolve, reject) => {
      this.loadResolve = resolve;
      this.loadReject = reject;
    });

    const SDKInfoText = [
      'Muxy Extensions SDK',
      `v${PackageConfig.version} © ${(new Date()).getFullYear()} ${PackageConfig.author}`,
      PackageConfig.repository,
      ''
    ];

    switch (currentEnvironment(window)) {
      case ENVIRONMENTS.DEV:
        SDKInfoText.push('Running in development mode');
        break;
      case ENVIRONMENTS.STAGING:
        SDKInfoText.push('Running in staging environment');
        break;
      case ENVIRONMENTS.PRODUCTION:
        SDKInfoText.push('Running on production');
        break;
      default:
        SDKInfoText.push('Could not determine execution environment.');
    }

    consolePrint(SDKInfoText, { boxed: true });
  }

  watchAuth(extensionID) {
    Ext.appID = extensionID;
    Ext.testChannelID = this.testChannelID;
    Ext.testJWTRole = this.testJWTRole;

    Ext.onAuthorized((auth) => {
      if (!auth) {
        this.loadReject();
      }

      this.messenger.channelID = auth.channelId;
      this.client.updateAuth(auth.token);
      this.loadResolve();
    });

    // Ext.onContext(this.onContext);
  }

  /**
   * Returns a SDK to use
   */
  SDK(extensionID) {
    if (!this.SDKClients[extensionID]) {
      this.SDKClients[extensionID] = new SDK(extensionID, this.client,
        this.messenger, this.loadPromise);
    }

    if (!this.watchingAuth) {
      this.watchingAuth = true;
      this.watchAuth(extensionID);
    }

    return this.SDKClients[extensionID];
  }
}

// Do this so that the entrypoint as a global library is correct.
// Babel / webpack have some weirdness
module.exports = new Muxy();

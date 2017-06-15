import { inIframe, asciiBox } from './util';
import Ext from './twitch-ext';
import Client from './state-client';
import Analytics from './analytics';
import User from './user';

class MuxyExtensionsSDK {
  constructor(extensionID, options = {}) {
    let SDKInfoText = '';

    this.extensionID = extensionID;

    if (options.testAppID) {
      Ext.testAppID = options.testAppID;
    }
    if (options.testChannelID) {
      Ext.testChannelID = options.testChannelID;
    }

    if (inIframe()) {
      SDKInfoText += '\nRunning in an iframe';
    } else {
      SDKInfoText += '\nRunning as top level';
    }

    if (document.referrer.includes('twitch.tv')) { // https://www.twitch.tv/bux0
      SDKInfoText += '\nRunning on twitch.tv';
    }

    if (location.hostname.includes('.ext-twitch.tv')) { // ka3y28rrgh2f533mxt9ml37fv6zb8k.ext-twitch.tv
      SDKInfoText += '\nLoaded from twitch CDN';
    }

    console.log(`🦊 Muxy Extensions SDK\n${asciiBox(SDKInfoText)}`); // eslint-disable-line no-console

    this.loadPromise = new Promise((resolve) => {
      this.loadResolve = resolve;
    });

    Ext.onAuthorized((auth) => {
      if (!auth) {
        return;
      }

      if (this.client) {
        this.client.updateAuth(auth.token);
      } else {
        this.client = new Client(this.extensionID, auth.token, auth.channelId);
        this.analytics = new Analytics(auth.userId);
        this.user = new User(this.client, auth);
      }

      this.loadResolve();
    });

    // Ext.onContext(this.onContext);
  }

  /**
   * A promise that resolves once the SDK is finished setting up.
   * @returns {Promise}
   */
  loaded() {
    return this.loadPromise;
  }

  /**
   * Fetch accumulated data
   */
  getAccumulation(accumulationID, start) {
    return this.client.getAccumulation(accumulationID, start);
  }

  /**
   * Send data to be accumulated
   */
  accumulate(accumulationID, data) {
    return this.client.accumulate(accumulationID, data);
  }

  /**
   * Fetch the current vote data
   */
  getVoteData(voteID) {
    return this.client.getVotes(voteID);
  }

  /**
   * Submit a user's vote
   */
  vote(voteID, value) {
    return this.client.vote(voteID, {
      value
    });
  }

  /**
   * Fetch the current ranking data
   */
  getRankingData(rankID) {
    return this.client.getRank(rankID);
  }

  /**
   * Submit data to be ranked
   */
  rank(rankID, value) {
    return this.client.rank({
      key: value
    });
  }
}

module.exports = MuxyExtensionsSDK;

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

    this.loadPromise = new Promise((resolve, reject) => {
      this.loadResolve = resolve;
      this.loadReject = reject;
    });

    Ext.onAuthorized((auth) => {
      if (!auth) {
        this.loadReject();
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
   * @returns an object with the structure {stddev, mean, sum, specific, count}
   */
  getVoteData(voteID) {
    return this.client.getVotes(voteID);
  }

  /**
   * Submit a vote
   * @param voteID the poll that this vote is for
   * @param value the integer value to vote
   */
  vote(voteID, value) {
    return this.client.vote(voteID, {
      value
    });
  }

  /**
   * Fetch the current ranking data
   * @returns an array of rank data objects in the form {key: "testkey", score: 23}
   */
  getRankingData(rankID) {
    return new Promise((accept, reject) => {
      this.client.getRank(rankID)
        .then((data) => {
          accept(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
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

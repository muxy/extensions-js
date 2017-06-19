import { ENVIRONMENTS, consolePrint, currentEnvironment } from './util';
import Ext from './twitch-ext';
import Client from './state-client';
import Analytics from './analytics';
import User from './user';

import * as PackageConfig from '../package.json';

/**
 * MuxyExtensionsSDK is a wrapper around the Muxy SDK that allows querying and submitting data.
 * It will detect when it is not being run on Twitch and fetch test credentials so that you don't
 * need to dev directly on Twitch.
 */
class MuxyExtensionsSDK {

  /**
   *
   * @param {string} extensionID
   * @param {object} options
   */
  constructor(extensionID, options = {}) {
    const SDKInfoText = [
      'Muxy Extensions SDK',
      `v${PackageConfig.version} © ${(new Date()).getFullYear()} ${PackageConfig.author}`,
      PackageConfig.repository,
      ''
    ];

    /** @private */
    this.extensionID = extensionID;

    if (options.testAppID) {
      Ext.testAppID = options.testAppID;
    }
    if (options.testChannelID) {
      Ext.testChannelID = options.testChannelID;
    }

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

    /** @private */
    this.loadPromise = new Promise((resolve, reject) => {
      /** @private */
      this.loadResolve = resolve;
      /** @private */
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
        /** @private */
        this.client = new Client(this.extensionID, auth.token, auth.channelId);
        /** @private */
        this.analytics = new Analytics(auth.userId);
        /** @private */
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
   * @param {string} accumulationID
   * @param start
   */
  getAccumulation(accumulationID, start) {
    return this.client.getAccumulation(accumulationID, start);
  }

  /**
   * Send data to be accumulated
   * @param {string} accumulationID
   * @param data
   */
  accumulate(accumulationID, data) {
    return this.client.accumulate(accumulationID, data);
  }

  /**
   * @typedef VoteData
   * @type {object}
   * @property {number} stddev
   * @property {number} mean
   * @property {number} sum
   * @property {number} specific
   * @property {number} count
   */

  /**
   * Fetch the current vote data
   * @param {string} voteID
   * @returns {VoteData}
   */
  getVoteData(voteID) {
    return this.client.getVotes(voteID);
  }

  /**
   * Submit a vote
   * @param {string} voteID the poll that this vote is for
   * @param {number} value the integer value to vote
   */
  vote(voteID, value) {
    return this.client.vote(voteID, {
      value
    });
  }

  /**
   * @typedef RankDatum
   * @type {object}
   * @property {string} key
   * @property {number} score
   */

  /**
   * Fetch the current ranking data
   * @param {string} rankID
   * @returns {RankDatum[]} an array of rank data objects
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
   * @param {string} rankID
   * @param {string} value
   */
  rank(rankID, value) {
    return this.client.rank({
      key: value
    });
  }
}

// Do this so that the entrypoint as a global library is correct.
// Babel / webpack have some weirdness
module.exports = MuxyExtensionsSDK;

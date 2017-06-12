import util from 'util';
import Ext from './twitch-ext';
import Client from './state-client';

export default class MuxyExtensionsSDK {
  constructor(extensionID) {
    console.log("🦊 Muxy Extensions SDK");

    this.extensionID = extensionID;

    if (util.inIframe()) {
      console.log('Running in an iframe');
    }
    else {
      console.log('Running as top level');
    }

    if (document.referrer.includes('twitch.tv')) { // https://www.twitch.tv/bux0
      console.log('Running on twitch.tv');
    }

    if (location.hostname.includes('.ext-twitch.tv')) { // ka3y28rrgh2f533mxt9ml37fv6zb8k.ext-twitch.tv
      console.log('Loaded from twitch CDN');
    }
    else {

    }

    Ext.onAuthorized(() => {
      if (!auth) {
        return;
      }

      if (this.client) {
        this.client.updateAuth(auth.token);
      }
      else {
        this.client = new Client(this.extensionID, auth.token.auth.channelId);
      }
    });
    // Ext.onContext(this.onContext);
  }

  /**
   * Listen for events from MuxyStore
   * @param type Event type to listen for. (Accumulate, Vote, Rank, Store)
   */
  listen(type) {

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
      value: value
    });
  }

  /**
   * Fetch the current ranking data
   */
  getRankingData(rankID) {
    return this.client.getRank();
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
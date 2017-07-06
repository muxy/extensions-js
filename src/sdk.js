import { eventPatternMatch } from './util';

export default class SDK {
  constructor(extensionID, client, user, messenger, loadPromise) {
    this.extensionID = extensionID;
    this.client = client;
    this.loadPromise = loadPromise;
    this.messenger = messenger;
    this.user = user;
  }

  loaded() {
    return this.loadPromise;
  }

  /**
   * Fetch accumulated data
   * @param {string} accumulationID
   * @param start
   */
  getAccumulation(accumulationID, start) {
    return this.client.getAccumulation(this.extensionID, accumulationID, start);
  }

  /**
   * Send data to be accumulated
   * @param {string} accumulationID
   * @param data
   */
  accumulate(accumulationID, data) {
    return this.client.accumulate(this.extensionID, accumulationID, data);
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
   * @returns {Promise}
   */
  getVoteData(voteID) {
    return this.client.getVotes(this.extensionID, voteID);
  }

  /**
   * Submit a vote
   * @param {string} voteID the poll that this vote is for
   * @param {number} value the integer value to vote
   */
  vote(voteID, value) {
    return this.client.vote(this.extensionID, voteID, {
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
   * @returns {Promise} an array of rank data objects
   */
  getRankingData(rankID) {
    return new Promise((accept, reject) => {
      this.client.getRank(this.extensionID, rankID)
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
    return this.client.rank(this.extensionID, {
      key: value
    });
  }

  /**
   * Clear all data for a rankId
   * @param {string} rankId
   */
  clearRanking(rankId) {
    return this.client.deleteRank(this.extensionID, rankId);
  }

  setViewerState(state) {
    return this.client.setViewerState(this.extensionID, state);
  }

  setChannelState(state) {
    return this.client.setChannelState(this.extensionID, state);
  }

  getAllState() {
    return this.client.getState(this.extensionID);
  }

  getJSONStore(id) {
    return this.client.getJSONStore(this.extensionID, id);
  }

  /**
   * Send message to all listening clients.
   *
   * @param event An event name, in the form [a-z0-9_]+
   * @param optionalUserID an optional opaque user id, used to limit the
   * scope of send to that user only.
   * @param data a json object to send.
   */
  send(event, optionalUserID, data) {
    let target = 'broadcast';
    let realData = data;

    if (!data) {
      realData = optionalUserID;
    } else {
      target = `whisper-${optionalUserID}`;
    }

    this.messenger.send(this.extensionID, event, target, realData, this.client);
  }

  /**
   * listen will register a callback to listen for events on pusbus.
   * In general, pubsub events are named in the form `event[:identifier]`,
   * where the identifier is the user controllable identifier in API calls
   * like vote, data_fetch.
   *
   * You can listen to wildcards by using * instead of an event or identifier name.
   *
   * For example, after a POST vote?id=nextgame, all clients will receive a
   * vote_update:nextgame event which can be listened to by calling listen
   * with event name "vote_update:nextgame" or "vote_update:*" or "*:nextgame"
   *
   * @param inEvent An event name, in the form [a-z0-9_]+
   * @param inUserID An optional opaque user id, used to limit
   * the scope of this listen to that user only.
   * @param inCallback A callback with the signature function(body, eventname)
   * @return A handle that can be passed to unlisten to unbind this callback.
   */
  listen(inEvent, inUserID, inCallback) {
    const realEvent = `${this.extensionID}:${inEvent}`;
    let l = 'broadcast';
    let callback = inCallback;
    if (callback) {
      l = `whisper-${inUserID}`;
    } else {
      callback = inUserID;
    }

    const cb = (msg) => {
      try {
        if (eventPatternMatch(msg.event, realEvent)) {
          // Consumers of the SDK only ever interact with events
          // without the app-id or extension-id prefix.
          const truncatedEvent = msg.event.split(':').slice(1).join(':');
          callback(msg.data, truncatedEvent);
        }
      } catch (err) {
        // TODO: Should this fail silently?
      }
    };

    return this.messenger.listen(this.extensionID, l, cb);
  }

  /**
   * Unbinds a callback from the pubsub interface
   * @param h A handle returned from listen
   */
  unlisten(h) {
    return this.messenger.unlisten(this.extensionID, h);
  }
}

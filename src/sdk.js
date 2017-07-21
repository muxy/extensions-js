import { eventPatternMatch } from './util';

export default class SDK {
  constructor(identifier, client, user, messenger, analytics, loadPromise) {
    this.identifier = identifier;
    this.client = client;
    this.loadPromise = loadPromise;
    this.messenger = messenger;
    this.user = user;
    this.analytics = analytics;
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
    return this.client.getAccumulation(this.identifier, accumulationID, start);
  }

  /**
   * Send data to be accumulated
   * @param {string} accumulationID
   * @param data
   */
  accumulate(accumulationID, data) {
    return this.client.accumulate(this.identifier, accumulationID, data);
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
    return this.client.getVotes(this.identifier, voteID);
  }

  /**
   * Submit a vote
   * @param {string} voteID the poll that this vote is for
   * @param {number} value the integer value to vote
   */
  vote(voteID, value) {
    return this.client.vote(this.identifier, voteID, { value });
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
      this.client
        .getRank(this.identifier, rankID)
        .then((data) => {
          accept(data.data);
        })
        .catch(reject);
    });
  }

  /**
   * Submit data to be ranked
   * @param {string} rankID
   * @param {string} value
   */
  rank(rankID, value) {
    return this.client.rank(this.identifier, { key: value });
  }

  /**
   * Clear all data for a rankId
   * @param {string} rankId
   */
  clearRanking(rankId) {
    return this.client.deleteRank(this.identifier, rankId);
  }

  setViewerState(state) {
    return this.client.setViewerState(this.identifier, state);
  }

  setChannelState(state) {
    return this.client.setChannelState(this.identifier, state);
  }

  getAllState() {
    return this.client.getState(this.identifier);
  }

  getJSONStore(id) {
    return this.client.getJSONStore(this.identifier, id);
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

    this.messenger.send(this.identifier, event, target, realData, this.client);
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
    const realEvent = `${this.identifier}:${inEvent}`;
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

    return this.messenger.listen(this.identifier, l, cb);
  }

  /**
   * Unbinds a callback from the pubsub interface
   * @param h A handle returned from listen
   */
  unlisten(h) {
    return this.messenger.unlisten(this.identifier, h);
  }

  /**
   * Sends an arbitrary event to the analytics backend.
   *
   * @param {string} name - A unique identifier for this event.
   * @param {*} value - (optional) A value to associate with this event (defaults to 1).
   * @param {string} label - (optional) A human-readable label for this event.
   */
  sendAnalyticsEvent(name, value = 1, label = '') {
    this.analytics.sendEvent(this.identifier, name, value, label);
  }
}


export default class SDK {
  constructor(extensionID, client, messenger, loadPromise) {
    this.extensionID = extensionID;
    this.client = client;
    this.loadPromise = loadPromise;
    this.messenger = messenger;
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
   * Send message to all listening clients.
   */
  broadcast(event, data) {
    this.messenger.broadcast(this.extensionID, event, data, this.client);
  }

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
        if (msg.event === realEvent) {
          callback(msg.data);
        }
      } catch (err) {
        // TODO: Should this fail silently?
      }
    };

    return this.messenger.listen(this.extensionID, l, cb);
  }

  unlisten(h) {
    return this.messenger.unlisten(this.extensionID, h);
  }
}

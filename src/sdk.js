import {eventPatternMatch, CurrentEnvironment, forceType, consolePrint, errorPromise} from './util';
import Ext from './twitch-ext';

/**
 * The Muxy Extensions SDK, used to communicate with Muxy's Extension Backend Service.
 *
 * Instances of this class created through the global `Muxy` object can be used to easily
 * interact with Muxy's Extension Backend Service. It includes functionality to aggregate
 * and persist user data, set extension configuration, send analytics events and authenticate
 * broadcasters across servers and applications.
 *
 * To begin using the SDK, create a new instance by calling `const sdk = Muxy.SDK()`.
 *
 * **Note for Overlay App Developers:**
 * An instance of the Muxy SDK is automatically created for you that is namespaced to your
 * app id. You can access it in any app that imports AppMixin as `this.muxy.<method>`. The
 * methods described below behave similarly to how they would in an extension context, however
 * all data is exclusive to your app. Differences are noted in the comments to the individual
 * methods.
 */
export default class SDK {
  /** @ignore */
  constructor(identifier, client, user, messenger, analytics, loadPromise, SKUs) {
    /** @ignore */
    this.loadPromise = loadPromise;

    /**
     * A unique instance identifier. Either the extension or app ID.
     * @public
     * @type {string}
     */
    this.identifier = identifier;

    /**
     * The backend state client.
     * @private
     * @type {Client}
     *
     */
    this.client = client;

    /**
     * The backend event messenger client.
     * @private
     * @type {Messenger}
     *
     */
    this.messenger = messenger;

    /**
     * The backend analytics client.
     * @private
     * @type {Analytics}
     *
     */
    this.analytics = analytics;

    /**
     * An automatically updated User instance for the current extension user.
     * @public
     * @type {User}
     */
    this.user = user;

    /**
     * SKUs associated with the products offered in the extension.
     * @public
     * @type {Object}
     */
    this.SKUs = SKUs;
  }

  /**
   * Returns a Promise that will resolve once this SDK instance is ready for use.
   * Will reject if an error occurs communicating with the backend server.
   * @since 1.0.0
   *
   * @return {Promise}
   *
   * @example
   * const sdk = new Muxy.SDK();
   * sdk.loaded().then(() => {
   *   sdk.send('Hello World');
   * }).catch((err) => {
   *   console.error(err);
   * });
   */
  loaded() {
    return this.loadPromise;
  }

  /**
   * Data Accumulation
   */

  /**
   * The response from {@link getAccumulateData}.
   *
   * @typedef {Object} AccumulateData
   *
   * @property {string} latest A Unix timestamp of the most recently posted JSON blob.
   *
   * @property {Object[]} data Array of all JSON blob payloads posted to this identifier.
   * @property {number} data.observed A Unix timestamp of when this payload was received.
   * @property {string} data.channel_id The id of the channel this payload is associated with
   * (either the viewer was watching the channel, or the app/server was authed with this channel).
   * @property {string} data.opaque_user_id Twitch's Opaque User ID representing the sender
   * of the payload. This will always be set and can be used with Twitch's pub/sub system to
   * whisper events to a particular viewer.
   * @property {string} data.user_id If the viewer has chosen to share their identity with the
   * extension, this field will hold the viewer's actual Twitch ID.
   * @property {Object} data.data The actual JSON blob payload as sent to the accumulate endpoint.
   */

  /**
   * Fetches the accumulated user data for a given id received by the backend since start.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if accumulationID is not a string.
   *
   * @param {string} accumulationID - The identifier of the accumulated data to fetch.
   * @param {number} start - A Unix timestamp in milliseconds of the earliest accumulation
   * record to fetch.
   *
   * @return {Promise<AccumulateData>} Resolves with requested accumulation data on
   * server response.
   *
   * @example
   * const oneMinuteAgo = (new Date().getTime()) - (1000 * 60);
   * sdk.getAccumulation('awesomeness_level', oneMinuteAgo).then((resp) => {
   *   console.log(`${resp.data.length}: ${resp.latest}`);
   *   console.log(resp.data); // A list of all accumulate values since oneMinuteAgo.
   * });
   */
  getAccumulateData(accumulationID, start) {
    forceType(accumulationID, 'string');
    return this.client.getAccumulation(this.identifier, accumulationID, start);
  }

  /**
   * @deprecated Use getAccumulateData instead.
   */
  getAccumulation(accumulationID, start) {
    return this.getAccumulateData(accumulationID, start);
  }

  /**
   * Sends data to be accumulated by the server.
   * @since 1.0.0
   *
   * @param {string} accumulationID - The identifier that this datum is accumulated with.
   * @param {Object} data - Any JSON serializable JavaScript object.
   *
   * @return {Promise} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.accumulate('awesomeness_level', {
   *   awesomeness_level: {
   *     great: 10,
   *     good: 2.5,
   *     poor: 'dank'
   *   }
   * });
   */
  accumulate(accumulationID, data) {
    forceType(accumulationID, 'string');
    return this.client.accumulate(this.identifier, accumulationID, data);
  }

  /**
   * User Voting
   */

  /**
   * The response from {@link getVoteData}.
   *
   * @typedef {Object} VoteData
   *
   * @property {number} count - The total number of votes received for this vote identifier.
   * @property {number} mean - The average of all votes received for this identifier.
   * @property {number[]} specific - The number of votes cast for the specific values [0-4].
   * @property {number} stddev - Approximate standard deviation for all votes received for
   * this identifier.
   * @property {number} sum - The sum of all votes received for this identifier.
   * @property {number} vote - If the user has a vote associated with this identifer, the
   * current value for this user. Not set if no vote has been received.
   */

  /**
   * Fetches the current stored vote data for a given vote identifier.
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if voteID is not a string.
   *
   * @param {string} voteID - The identifer to fetch associated vote data.
   *
   * @return {Promise<VoteData>} Resolves with requested vote data on server response. Rejects on
   * server error.
   *
   * @example
   * sdk.getVoteData('poll-number-1').then((voteData) => {
   *   console.log(voteData.sum);
   * });
   */
  getVoteData(voteID) {
    forceType(voteID, 'string');
    return this.client.getVotes(this.identifier, voteID);
  }

  /**
   * Submit a user vote associated with a vote identifier.
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if `voteID` is not a string or if `value` is not
   * a Number.
   *
   * @param {string} voteID - The identifer to fetch associated vote data.
   * @param {number} value - Any numeric value to represent this user's vote. Note that only
   * values of 0-5 will be included in the `specific` field returned from `getVoteData`.
   *
   * @return {Promise} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.vote('poll-number-1', 1);
   */
  vote(voteID, value) {
    forceType(voteID, 'string');
    forceType(value, 'number');

    return this.client.vote(this.identifier, voteID, { value });
  }

  /**
   * User Ranking
   */

  /**
   * The response from {@link getRankData}.
   *
   * @typedef {Object[]} RankData
   *
   * @property {string} key - A single key as sent to the ranking endpoint for this identifier.
   * @property {number} score - The number of users who have sent this `key` for this identifier.
   */

  /**
   * Fetches the current ranked data associated with the rank identifier.
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if rankID is not a string.
   *
   * @param {string} rankID - The identifier to fetch associated rank data.
   *
   * @return {Promise<RankData>} Resolves with requested rank data on server response. Rejects
   * on server error.
   *
   * @example
   * sdk.getRankData('favorite_color').then((colors) => {
   *   if (colors.length > 0) {
   *     colors.forEach((color) => {
   *       console.log(`${color.key}: ${color.score}`);
   *     });
   *   }
   * });
   */
  getRankData(rankID) {
    forceType(rankID, 'string');
    return new Promise((accept, reject) => {
      this.client
        .getRank(this.identifier, rankID)
        .then(data => {
          accept(data.data);
        })
        .catch(reject);
    });
  }

  /**
   * Submit user rank data associated with a rank identifier.
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if rankID or value are not strings.
   *
   * @param {string} rankID - The identifer to fetch associated rank data.
   * @param {string} value - Any string value to represent this user's rank data. Will be returned
   * as the `key` field when rank data is requested.
   *
   * @example
   * const usersFavoriteColor = 'rebeccapurple';
   * this.muxy.rank('favorite_color', usersFavoriteColor);
   */
  rank(rankID, value) {
    forceType(rankID, 'string');
    forceType(value, 'string');

    return this.client.rank(this.identifier, rankID, { key: value });
  }

  /**
   * Clear all rank data associated with the rank identifier.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if rankID is not a string.
   *
   * @param {string} rankID - The identifer to fetch associated rank data.
   *
   * @return {Promise} Will resolve on success. Rejects on failure.
   */
  clearRankData(rankID) {
    forceType(rankID, 'string');
    return this.client.deleteRank(this.identifier, rankID);
  }

  /**
   * @deprecated Deprecated in 1.0.0. Use getRankData instead.
   */
  getRankingData(rankID) {
    return this.getRankData(rankID);
  }

  /**
   * @deprecated Deprecated in 1.0.0. Use clearRankData instead.
   */
  clearRanking(rankID) {
    return this.clearRanking(rankID);
  }

  /**
   * User State
   */

  /**
   * Sets the channel specific viewer-specific state to a JS object, this can be called by
   * any viewer.
   * Future calls to {@link getAllState} by **this** user will have a clone of this object in the
   * `viewer` field.
   * @async
   * @since 1.0.0
   *
   * @param {Object} state - A complete JS object representing the current viewer state.
   *
   * @return {Promise} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.setViewerState({
   *   favorite_movie: 'Jaws: The Revenge'
   * }).then(() => {
   *   console.log('Viewer state saved!');
   * }).catch((err) => {
   *   console.error(`Failed saving viewer state: ${err}`);
   * });
   */
  setViewerState(state) {
    return this.client.setViewerState(this.identifier, state);
  }

  /**
   * Sets the extension wide viewer-specific state to a JS object, this is only a valid call for a
   * user that has shared their identity.
   * Future calls to {@link getAllState} by **this** user will have a clone of this object in the
   * `extension_viewer` field.
   * @async
   * @since 1.1.0
   *
   * @param {Object} state - A complete JS object representing the current viewer state.
   *
   * @return {Promise} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.setExtensionViewerState({
   *   favorite_movie: 'Jaws: The Revenge'
   * }).then(() => {
   *   console.log('Viewer state saved!');
   * }).catch((err) => {
   *   console.error(`Failed saving viewer state: ${err}`);
   * });
   */
  setExtensionViewerState(state) {
    if (this.user.twitchID == null) {
      return errorPromise('User has not shared ID with Twitch');
    }
    return this.client.setExtensionViewerState(this.identifier, state);
  }

  /**
   * Sets the channel-specific state to a JS object. Future calls to {@link getAllState} by **any**
   * user on this channel will have a clone of this object in the `channel` field.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @param {Object} state - A complete JS object representing the current channel state.
   *
   * @return {Promise} Will resolve on successful server-send. Rejects on failure.
   *
   * @example
   * sdk.setChannelState({
   *   broadcasters_mood: 'sanguine, my brother',
   *   chats_mood: 'kreygasm'
   * }).then(() => {
   *   // Let viewers know that new channel state is available.
   * }).catch((err) => {
   *   console.error(`Failed saving channel state: ${err}`);
   * });
   */
  setChannelState(state) {
    return this.client.setChannelState(this.identifier, state);
  }

  /**
   * The response from {@link getAllState}.
   *
   * @typedef {Object} AllState
   *
   * @property {Object} extension - A state object only settable by the extension itself.
   * Universal for all channels.
   * @property {Object} channel - A state object only settable by a broadcaster. Universal for all
   * viewers of the same channel.
   * @property {Object} viewer - A state object settable by each viewer. Specific to the viewer of
   * a given channel.
   */

  /**
   * Returns the current state object as set for the current extension, channel and
   * viewer combination.
   * @async
   * @since 1.0.0
   *
   * @return {Promise<AllState>} Resolves on successful server request with a populated AllState
   * object.
   *
   * @example
   * sdk.getAllState().then((state) => {
   *   if (state.channel.broadcasters_mood) {
   *     console.log(`Broadcaster set their mood as: ${state.channel.broadcasters_mood}`);
   *   }
   *   if (state.viewer.favorite_movie) {
   *     console.log(`But your favorite movie is: ${state.viewer.favorite_movie}`);
   *   }
   * });
   */
  getAllState() {
    return this.client.getState(this.identifier);
  }

  /**
   * JSON Store
   */

  /**
   * The JSON store is used similarly to the channel state, in that a broadcaster can use it to
   * store arbitrary JSON data that is accessible to all viewers. The stored data is specific to
   * a particular channel and cannot be accessed by viewers of a different channel.
   *
   * Unlike channel state however, each channel can have several JSON stores, accessed by different
   * keys. The data associated with each key must be under 2KB, but there is no limit to the number
   * of keys in use.
   *
   * Also, when pushing new data to the JSON store, a messenger event is automatically sent to all
   * active viewers of the associated channel and the broadcaster's live and config pages. This
   * event will have the format `json_store_update:${key}`. See {@link listen} for details on
   * receiving this event.
   *
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if key is provided but is not a string.
   *
   * @param {string?} key - The lookup key for data in the JSON store. Uses 'default' if no value
   * is provided.
   *
   * @return {Promise<Object>} Resolves with the stored JSON parsed to a JS Object associated with
   * the key. Rejects on server error or if the key has no associated data.
   *
   * @example
   * sdk.getJSONStore('basecamp').then((basecamp) => {
   *   if (basecamp && basecamp.tanks) {
   *     deploy(basecamp.tanks);
   *   }
   * });
   */
  getJSONStore(key) {
    if (key) {
      forceType(key, 'string');
    }

    return this.client.getJSONStore(this.identifier, key);
  }

  /**
   * Two-Factor Auth
   */

  /**
   * Attempts to validate a broadcaster's PIN with Muxy's Two-Factor auth system. For this to work,
   * the broadcaster must have initiated a Two-Factor request for this channel within the auth
   * window.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if `pin` is not a string.
   *
   * @param {string} pin - The broadcaster's PIN to validate the associated auth token.
   *
   * @return {Promise} Resolves if the auth token associated with this PIN can now be used to make
   * requests on behalf of this broadcaster, rejects with an error otherwise.
   *
   * @example
   * sdk.validateCode('MUXY').then(() => {
   *   console.log('Validated! Go go go!');
   * });
   */
  validateCode(pin) {
    forceType(pin, 'string');
    return this.client.validateCode(this.identifier, pin);
  }

  /**
   * Checks to see if the broadcaster has validated an auth token in the current context. It does
   * not return information about the PIN used or auth token that is valid.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @return {Promise<Object>}
   * @property {boolean} exists - True if an auth token has been validated, false otherwise.
   *
   * @example
   * sdk.pinTokenExists().then((resp) => {
   *   if (!resp.exists) {
   *     showBroadcasterPINInput();
   *   } else {
   *     console.log('Already authorized');
   *   }
   * });
   */
  pinTokenExists() {
    return this.client.pinTokenExists(this.identifier);
  }

  /**
   * Revokes all auth tokens ever generated for this channel and identifier. After calling this
   * method, tokens currently in use by external apps will cease to function.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @return {Promise} Resolves on sucess, rejects with an error otherwise.
   *
   * @example
   * sdk.revokeAllPINCodes().then(() => {
   *   console.log('No more data coming in!');
   * });
   */
  revokeAllPINCodes() {
    return this.client.revokeAllPINCodes(this.identifier);
  }

  /**
   * Event System
   */

  /**
   * Sends a message to all listening clients. And viewers or broadcaters listening for the
   * event name will be automatically notified. See {@link listen} for receiving events.
   *
   * Broadcaster-only functionality.
   *
   * @async
   * @since 1.0.0
   *
   * @param {string} event - An event name, in the form [a-z0-9_]+
   * @param {string|*} userID - An optional opaque user id, used to limit the
   * scope of send to that user only.
   * @param {*} [data] - Any JSON serializable primitive to send to all viewers.
   *
   * @example
   * sdk.send('new_song', {
   *   artist: 'Celine Dion',
   *   title: 'My Heart Will Go On',
   *   album: 'Let\'s Talk About Love',
   *   year: 1997
   * });
   */
  send(event, userID, data) {
    forceType(event, 'string');
    let target = 'broadcast';
    let realData = data;

    if (!data) {
      realData = userID;
    } else {
      target = `whisper-${userID}`;
    }

    this.messenger.send(this.identifier, event, target, realData, this.client);
  }

  /**
   * Registers a callback to listen for events. In general, events are named in the form
   * `event[:identifier]`, where the identifier is the `event` parameter to {@link send}.
   *
   * You can listen to wildcards by using * instead of an event or identifier name.
   *
   * Some methods also automatically send special namespaced events. See {@link vote} and
   * {@link getJSONStore} for examples.
   *
   * You can listen for these events by using `vote_update:next_game` or `vote_update:*`
   * to receive vote updates for specifically the `next_game` vote id, or all vote
   * updates respectively.
   *
   * @since 1.0.0
   *
   * @param {string} inEvent - The event name to listen on. May include wildcards `*`.
   * @param {string|Function} inUserID - An optional opaque user id, used to limit
   * the scope of this listen to that user only.
   * @param {Function} [inCallback] - A callback with the signature `function(body, eventname)`.
   * This callback will receive the message body as its first parameter and the `event` parameter
   * to {@link send} as the second.
   *
   * @return {Object} A listener handle that can be passed to {@see unlisten} to unbind
   * this callback.
   *
   * @example
   * sdk.listen('new_song', (track) => {
   *   console.log(`${track.artist} - {track.title} (${track.year})`);
   * });
   */
  listen(inEvent, inUserID, inCallback) {
    const realEvent = `${CurrentEnvironment().environment}:${this.identifier}:${inEvent}`;

    let l = 'broadcast';
    let callback = inCallback;
    if (callback) {
      l = `whisper-${inUserID}`;
    } else {
      callback = inUserID;
    }

    const cb = msg => {
      try {
        // Production messages may be unprefixed.
        if (CurrentEnvironment().environment === 'production') {
          if (eventPatternMatch(msg.event, `${this.identifier}:${inEvent}`)) {
            const truncatedEvent = msg.event
              .split(':')
              .slice(1)
              .join(':');
            callback(msg.data, truncatedEvent);
            return;
          }
        }

        if (eventPatternMatch(msg.event, realEvent)) {
          // Consumers of the SDK only ever interact with events
          // without the app-id or extension-id prefix.
          const truncatedEvent = msg.event
            .split(':')
            .slice(2)
            .join(':');
          callback(msg.data, truncatedEvent);
        }
      } catch (err) {
        // TODO: Should this fail silently?
        consolePrint(err, { type: 'error' });
      }
    };

    return this.messenger.listen(this.identifier, l, cb);
  }

  /**
   * Unbinds a callback from the event system.
   *
   * @since 1.0.0
   *
   * @param {Object} handle - An event handle as returned from {@see listen}.
   */
  unlisten(handle) {
    return this.messenger.unlisten(this.identifier, handle);
  }

  /**
   * Analytics
   */

  /**
   * Sends an arbitrary event to the analytics backend.
   *
   * @async
   * @since 1.0.0
   *
   * @param {string} name - A unique identifier for this event.
   * @param {number} [value=1] - A value to associate with this event.
   * @param {string} [label=''] - A human-readable label for this event.
   */
  sendAnalyticsEvent(name, value = 1, label = '') {
    this.analytics.sendEvent(this.identifier, name, value, label);
  }

  /**
   * Monetization
   */

  /**
   * Begins the purchase flow for a given product's SKU.
   *
   * @param {string} The SKU of the digital good that the user has indicated they want to buy.
   */
  beginPurchase(sku) {
    if (this.SKUs.length === 0) {
      throw new Error('beginPurchase() cannot be used unless SKUs are provided.');
    }
    forceType(sku, 'string');
    return Ext.beginPurchase(sku);
  }

  /**
   * Gets the current price for each item offered.
   *
   * @async
   *
   * @return {Object} An object with the SKU codes as keys.
   */
  getPrices() {
    if (this.SKUs.length === 0) {
      throw new Error('getPrices() cannot be used unless SKUs are provided.');
    }
    return new Promise(resolve => {
      Ext.getPrices(prices => {
        resolve(prices);
      });
    });
  }

  /**
   * Sets a function to be used as a callback when entitlements need to be reloaded, i.e. after a
   * purchase has been made.
   *
   * @param {function} The function to be called to update user entitlements.
   */
  onReloadEntitlements(cb) {
    if (this.SKUs.length === 0) {
      throw new Error('onReloadEntitlements() cannot be used unless SKUs are provided.');
    }
    return Ext.onReloadEntitlements(cb);
  }
}

import XMLHttpRequestPromise from '../libs/xhr-promise';
import { forceType } from './util';

/**
 * A single user object as from {@link getTwitchUsers}.
 *
 * @typedef {Object} TwitchUser

 * @property {string} _id - The Twitch ID of the user. Universally unique.
 * @property {string} bio - A description of the user provided by the user. May be empty.
 * @property {string} created_at - A timestamp of the user account creation time in ISO 8601
 * format: @see https://en.wikipedia.org/wiki/ISO_8601
 * @property {string} display_name - A user formatted version of their username for display.
 * @property {string} logo - A URL to a Twitch-hosted version of this user's logo.
 * @property {string} name - User's username.
 * @property {string} type - The user's "type" on Twitch.
 * One of ["user", "affiliate", "partner"].
 * @property {string} updated_at - A timestamp of the last time the user information was
 * updated in ISO 8601 format.
 */

/**
 * A single user object as from {@link getTwitchUsersByID}.
 *
 * @typedef {Object} HelixTwitchUser

 * @property {string} id - The Twitch ID of the user. Universally unique.
 * @property {string} login - The user's login name
 * @property {string} description - The user's channel description
 * @property {string} display_name - A user formatted version of their username for display.
 * @property {string} profile_image_url - A URL to a Twitch-hosted version of this user's avatar.
 * @property {string} offline_image_url - A URL to a Twitch-hosted version of this user's offline
 * background.
 * @property {string} type - The user's "type" on Twitch.
 * One of ["staff", "admin", "global_mod", ""].
 * @property {string} broadcaster_type - The user's broadcaster type on Twitch.
 * One of ["partner", "affiliate", ""].
 * @property {int} view_count - The user's total view count.
 */

/**
 * A single good object as from {@link getUserGoods}.
 *
 * @typedef {Object} ExtensionGood

 * @property {string} next_instruction - The next instruction (action) for the purchase. Can be:
 *   - "NOOP" - No action is needed, the good was fullfilled.
 *   - "FULFILL" - Fulfill the purchase, then call the Twitch entitlement system to indicate
 *     successful completion of the fullfillment.
 *   - "REVOKE" - Unwind the transaction.
 * @property {string} receipt_id - An ID which uniquely identifies the purchase transaction.
 * @property {string} sku - The SKU for the digital good.
 */

/**
 * A receipt detailing which good's fulfillment status needs to be set. Used as a parameter for
 * {@link updateFulfilledGoods}.
 *
 * @typedef {Object} Receipt

 * @property {string} fulfillment_address - Twitch User ID
 * @property {string} receipt_id - Receipt ID for the digital good, returned by {@link getUserGoods}
 * @property {string} last_instruction - The last thing you did. Corresponds to the "next
 * instruction" for the purchase returned by {@link getUserGoods}. Value value: `FULFILL`.
 */

/**
 * Provides a convenient interface for Twitch API requests with an automatically set and updated
 * extension client id.
 *
 * Should not normally be created directly, instead an instance is made available
 * and namespaced appropriately when using {@link Muxy.TwitchClient}.
 *
 * @private
 *
 * @example
 * const twitchClient = new Muxy.TwitchClient();
 * twitchClient.getAllState().then((state) => {
 *   console.log(state);
 * });
 */
export default class TwitchClient {
  /**
   * Create an instance of TwitchClient bound to the provided client ID.
   *
   * Prefer {@link Muxy.TwitchClient} instead.
   *
   * @since 1.0.0
   * @ignore
   *
   * @param {string} clientID - A valid Twitch Extension Client ID.
   */
  constructor(clientID) {
    /** @ignore */
    this.extensionId = clientID;
    /** @ignore */
    this.promise = Promise.resolve();
  }

  /**
   * Returns a promise which will resolve once the TwitchClient is available for use.
   *
   * @since 1.0.0
   * @public
   *
   * @return {Promise} Will resolve when the TwitchClient is ready for use.
   */
  loaded() {
    return this.promise;
  }

  /**
   * Wraps an AJAX request to Twitch's kraken API. Used internally by the API
   * convenience methods.
   *
   * @async
   * @since 1.0.0
   * @ignore
   *
   * @param {string} method - The AJAX request method, e.g. "POST", "GET", etc.
   * @param {string} endpoint - The Twitch kraken API endpoint.
   * @param {string?} data - A string-encoded JSON payload to send with the request.
   * @param {Object} JWT - Signed JWT, accessible from sdk.user.twitchJWT.
   *
   * @return {Promise} Resolves with the AJAX payload on response < 400.
   * Rejects otherwise.
   */
  signedTwitchRequest(method, endpoint, data, JWT) {
    const headers = {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': this.extensionId
    };

    if (JWT) {
      headers.Authorization = `Bearer ${JWT}`;
    }

    return new Promise((resolve, reject) => {
      const xhrPromise = new XMLHttpRequestPromise();
      return xhrPromise
        .send({
          method,
          url: `https://api.twitch.tv/kraken/${endpoint}`,
          headers,
          data
        })
        .catch(reject)
        .then(resp => {
          if (resp.status < 400) {
            resolve(resp.responseText);
          }

          reject(resp.responseText);
        });
    });
  }

  /**
   * Wraps an AJAX request to Twitch's helix API. Used internally by the API
   * convenience methods.
   *
   * @async
   * @ignore
   *
   * @param {string} method - The AJAX request method, e.g. "POST", "GET", etc.
   * @param {string} endpoint - The Twitch helix API endpoint.
   * @param {string?} data - A string-encoded JSON payload to send with the request.
   * @param {Object} JWT - Signed JWT, accessible from sdk.user.twitchJWT.
   *
   * @return {Promise} Resolves with the AJAX payload on response < 400.
   * Rejects otherwise.
   */
  signedTwitchHelixRequest(method, endpoint, data, JWT) {
    const headers = {
      'Client-ID': this.extensionId
    };

    if (JWT) {
      headers.Authorization = `Bearer ${JWT}`;
    }

    return new Promise((resolve, reject) => {
      const xhrPromise = new XMLHttpRequestPromise();
      return xhrPromise
        .send({
          method,
          url: `https://api.twitch.tv/helix/${endpoint}`,
          headers,
          data
        })
        .catch(reject)
        .then(resp => {
          if (resp.status < 400) {
            resolve(resp.responseText.data);
          }

          reject(resp.responseText);
        });
    });
  }

  /**
   * Returns a list of Twitch User objects for a given list of usernames.
   *
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error if users is not an array of strings.
   *
   * @param {[]string} usernames - A list of usernames to lookup on Twitch.
   *
   * @return {Promise<[]TwitchUser>} Resolves with a list of {@link TwitchUser}
   * objects for each of the usernames provided.
   *
   * @example
   * twitchClient.getTwitchUsers(['muxy'], (response) => {
   *  console.log(response.users[0].display_name);
   * });
   */
  getTwitchUsers(usernames) {
    forceType(usernames, 'array');
    if (usernames.length === 0) {
      return Promise.resolve([]);
    }

    return this.signedTwitchRequest('GET', `users?login=${usernames.join(',')}`);
  }

  /**
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
   * Returns a list of Twitch User objects for a given list of user IDs.
   *
   * @async
   *
   * @throws {TypeError} Will throw an error if userIDs is not an array of strings.
   *
   * @param {[]string} userIDs - A list of user IDs to lookup on Twitch.
   *
   * @return {Promise<[]HelixTwitchUser>} Resolves with a list of {@link HelixTwitchUser}
   * objects for each of the user IDs provided.
   *
   * @example
   * twitchClient.getTwitchUsersByID(['126955211'], (response) => {
   *  console.log(response.users[0].display_name);
   * });
   */
  getTwitchUsersByID(userIDs) {
    forceType(userIDs, 'array');
    if (userIDs.length === 0) {
      return Promise.resolve([]);
    }

    return this.signedTwitchHelixRequest('GET', `users?id=${userIDs.join(',')}`);
  }

  /**
>>>>>>> master
>>>>>>> release
   * Monetization
   */

  /**
   * Gets a list of the digital goods the current user has.
   *
   * @param {Object} JWT - Signed JWT, accessible from sdk.user.twitchJWT
   *
   * @return {Promise<[]ExtensionGood>} Resolves with a list of {@link ExtensionGood} objects for
   * each of the goods the user is entitled to.
   */
  getUserGoods(JWT) {
    return this.signedTwitchRequest('POST', 'commerce/user/goods', {}, JWT);
  }

  /**
   * Sets the fulfillment status for the specified receipts (purchases).
   *
   * @param {Object} JWT - Signed JWT, accessible from sdk.user.twitchJWT
   * @param {[]Receipt} Receipts - List of {@link Receipt} objects detailing which goods need to be
   * updated.
   *
   * @return {Promise<[]Object>} Resolves with a list of results, one for each Receipt in the
   * Receipts parameter.
   */
  updateFulfilledGoods(JWT, receipts) {
    return this.signedTwitchRequest('POST', 'commerce/user/goods/fulfill', receipts, JWT);
  }
}

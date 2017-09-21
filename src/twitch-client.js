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
   *
   * @return {Promise} Resolves with the AJAX payload on response < 400.
   * Rejects otherwise.
   */
  signedTwitchRequest(method, endpoint, data) {
    return new Promise((resolve, reject) => {
      const xhrPromise = new XMLHttpRequestPromise();
      return xhrPromise
        .send({
          method,
          url: `https://api.twitch.tv/kraken/${endpoint}`,
          headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            'Client-ID': this.extensionId
          },
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
   * Returns a list of Twitch User objects for a given list of usernames.
   *
   * @async
   * @since 1.0.0
   *
   * @throws {TypeError} Will throw an error id users is not an array of strings.
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
}

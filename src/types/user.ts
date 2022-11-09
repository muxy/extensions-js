/**
 * A single entry in the response from {@link getExtensionUsers}.
 *
 * @typedef {Object} ExtensionUser
 *
 * @property {string} twitch_id - The user's Twitch id.
 */
export interface ExtensionUser {
  twitch_id: string;
}

/**
 * The response from {@link getExtensionUsers}.
 *
 * @typedef {Object} ExtensionUsersResult
 *
 * @property {string} next - A cursor to request the next (up-to) 1000 results. A value of `0` means
 * all results have been returned.
 * @property {ExtensionUser[]} results - A list of (up-to) 1000 user IDs who have shared their ID with
 * the extension.
 */
export interface ExtensionUsersResult {
  next: string;
  results: ExtensionUser[];
}

/**
 * Represents user info
 *
 * @property {string} ip_address - The id of the question
 * @property {boolean} registered - The name of the question
 * @property {number} server_time - The name of the question for smaller displays.
 * @property {string} visualization_id - A description for the question
 */
export interface UserInfo {
  ip_address: string;
  registered: boolean;
  server_time: number;
  visualization_id: string;
}

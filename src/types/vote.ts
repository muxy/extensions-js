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
export interface VoteData {
  count: number;
  mean: number;
  specific: number[];
  stddev: number;
  sum: number;
  vote: number;
}

/**
 * A single vote cast in a poll, returned from {@link getFullVoteLogs}
 *
 * @typedef {Object} VoteLogEntry
 * @property {string} identifier - Either the opaque userID or userID of a user who voted, depending on
 *  the user's user id share status at the time of casting the vote.
 * @property {number} value - The numerical value of the vote cast.
 */
export interface VoteLogEntry {
  identifier: string;
  value: number;
}

/**
 * The response from {@link getFullVoteLogs}
 *
 * @typedef {Object} VoteLog
 * @property {object[]} result - An array of VoteLogEntries that represents the votes cast on a poll.
 */
export interface VoteLog {
  result: VoteLogEntry[];
}

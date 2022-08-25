/**
 * The response from {@link getRankData}.
 *
 * @typedef {Object} RankData
 *
 * @property {RankScore[]} data - array of the rank data
 */
export interface RankData {
  data: RankScore[];
}

/**
 *
 * @typedef {Object} RankScore
 *
 * @property {string} key - A single key as sent to the ranking endpoint for this identifier.
 * @property {number} score - The number of users who have sent this `key` for this identifier.
 */
export interface RankScore {
  key: string;
  score: number;
}

/**
 * @typedef {Object} RankResponse
 */
export interface RankResponse {
  accepted: boolean;
  original: string | undefined;
}

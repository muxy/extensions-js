/**
 * The response from {@link getEligibleCodes}.
 *
 * @typedef {Object} EligibleCodes
 *
 * @property {Array<number>} eligible - Each integer is the array is how many codes the given user is eligible for.
 * A zero entry in this array means that the user is not eligible for any codes for that prize.
 */
export interface EligibleCodes {
    eligible: number[];
}
/**
 * The response from {@link getRedeemedCodes}.
 *
 * @typedef {Object} RedeemedCodes
 *
 * @property {Array<Array<string>>} redeemed - Each array entry in redeemed represents a prize index.
 * Strings in the sub arrays are the codes the user has redeemed.
 */
export interface RedeemedCodes {
    redeemed: string[][];
}
/**
 * The response from {@link redeemCode}.
 *
 * @typedef {Object} RedeemResult
 *
 * @property {string} code - The code that was redeemed if successful
 * @property {Array<string>} all_prizes - list of all the codes that this user has redeemed for the
 * prize index.
 */
export interface RedeemResult {
    code?: string;
    all_prizes: string[];
}

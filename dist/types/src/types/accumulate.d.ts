/**
 * The response from {@link getAccumulateData}.
 *
 * @typedef {Object} AccumulateData
 *
 * @property {number} latest A Unix timestamp of the most recently posted JSON blob.
 *
 * @property {AccumulatePayload[]} data Array of all JSON blob payloads posted to this identifier.
 */
export interface AccumulateData {
    latest: number;
    data: AccumulatePayload[];
}
/**
 * @typedef {Object} AccumulatePayload
 *
 * @property {number} observed A Unix timestamp of when this payload was received.
 * @property {string} channel_id The id of the channel this payload is associated with
 * (either the viewer was watching the channel, or the app/server was authed with this channel).
 * @property {string} opaque_user_id Twitch's Opaque User ID representing the sender
 * of the payload. This will always be set and can be used with Twitch's pub/sub system to
 * whisper events to a particular viewer.
 * @property {string} user_id If the viewer has chosen to share their identity with the
 * extension, this field will hold the viewer's actual Twitch ID.
 * @property {Object} data The actual JSON blob payload as sent to the accumulate endpoint.
 */
export interface AccumulatePayload {
    observed: number;
    channel_id: string;
    opaque_user_id: string;
    user_id: string;
    data: object;
}

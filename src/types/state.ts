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
 * @property {Object} extension_viewer - A state object settable by each viewer. Specific to the viewer but
 * extension wide.
 */
export interface AllState {
  extension: object;
  channel: object;
  viewer: object;
  extension_viewer: object;
}

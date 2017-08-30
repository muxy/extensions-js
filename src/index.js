import Muxy from './muxy';

// Export a globally instantiated Muxy object. This is used to manage auth tokens
// and other niceties for the lower-level SDK objects (e.g. SDK, Analytics, TwitchClient, etc).
module.exports = new Muxy();

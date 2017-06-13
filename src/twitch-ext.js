// Wrapper around global Twitch extension object.
class Ext {
  static onAuthorized(cb) {
    if (window.Twitch) {
      window.Twitch.ext.onAuthorized(cb);
    }
  }

  static onContext(cb) {
    if (window.Twitch) {
      window.Twitch.ext.onContext(cb);
    }
  }
}

export default Ext;

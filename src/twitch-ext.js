import Client from './state-client';

// Wrapper around global Twitch extension object.
class Ext {
  static fetchTestAuth(cb) {
    Client.fetchTestAuth(this.testAppID, this.testChannelID)
      .then((auth) => {
        cb(auth);
      })
      .catch(() => {
        cb();
      });
  }

  static onAuthorized(cb) {
    if (window.Twitch) {
      window.Twitch.ext.onAuthorized(cb);
    } else {
      Ext.fetchTestAuth(cb);
      setInterval(Ext.fetchTestAuth, 1000 * 60 * 25, cb);
    }
  }

  static onContext(cb) {
    if (window.Twitch) {
      window.Twitch.ext.onContext(cb);
    }
  }
}

export default Ext;

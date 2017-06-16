import Client from './state-client';

// Wrapper around global Twitch extension object.
class Ext {
  static onAuthorized(cb) {
    if (window.Twitch) {
      window.Twitch.ext.onAuthorized(cb);
    } else {
      Client.fetchTestAuth(this.testAppID, this.testChannelID)
        .then((auth) => {
          cb(auth);
        })
        .catch(() => {
          cb();
        });
    }
  }

  static onContext(cb) {
    if (window.Twitch) {
      window.Twitch.ext.onContext(cb);
    }
  }
}

export default Ext;

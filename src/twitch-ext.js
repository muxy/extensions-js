import { ENVIRONMENTS, CurrentEnvironment } from './util';
import Client from './state-client';

// Wrapper around global Twitch extension object.
class Ext {
  static fetchTestAuth(cb) {
    Client.fetchTestAuth(this.appID, this.testChannelID, this.testJWTRole)
      .then((auth) => {
        cb(auth);
      })
      .catch(() => {
        cb();
      });
  }

  static onAuthorized(cb) {
    switch (CurrentEnvironment) {
      case ENVIRONMENTS.DEV:
      case ENVIRONMENTS.STAGING:
        Ext.fetchTestAuth(cb);
        setInterval(Ext.fetchTestAuth, 1000 * 60 * 25, cb);
        break;
      case ENVIRONMENTS.PRODUCTION:
        window.Twitch.ext.onAuthorized(cb);
        break;
      default:
    }
  }

  static onContext(cb) {
    switch (CurrentEnvironment) {
      case ENVIRONMENTS.PRODUCTION:
        window.Twitch.ext.onContext(cb);
        break;
      default:
    }
  }
}

export default Ext;

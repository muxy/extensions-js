import { ENVIRONMENTS, CurrentEnvironment } from './util';
import Client from './state-client';

// Wrapper around global Twitch extension object.
class Ext {
  static fetchTestAuth(cb) {
    Client.fetchTestAuth(Ext.extensionID, Ext.testChannelID, Ext.testJWTRole)
      .then((auth) => {
        cb(auth);
      }).catch(cb);
  }

  static onAuthorized(cb) {
    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.DEV:
        Ext.fetchTestAuth(cb);
        setInterval(Ext.fetchTestAuth, 1000 * 60 * 25, cb);
        break;

      case ENVIRONMENTS.STAGING:
      case ENVIRONMENTS.PRODUCTION: {
        const timer = setTimeout(() => {
          cb();
        }, 1000 * 15);

        window.Twitch.ext.onAuthorized((auth) => {
          clearTimeout(timer);
          cb(auth);
        });
        break;
      }
      default:
    }
  }

  static onContext(cb) {
    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.PRODUCTION:
        window.Twitch.ext.onContext(cb);
        break;
      default:
    }
  }
}

export default Ext;

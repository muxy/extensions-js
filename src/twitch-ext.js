import { ENVIRONMENTS, CurrentEnvironment } from './util';
import Client from './state-client';

// 25 minutes between updates of the testing auth token.
const TEST_AUTH_TIMEOUT_MS = 25 * 60 * 1000;

// Wrapper around global Twitch extension object.
export default class Ext {
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
        setInterval(Ext.fetchTestAuth, TEST_AUTH_TIMEOUT_MS, cb);
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

import { ENVIRONMENTS, CurrentEnvironment } from './util';
import Client from './state-client';

// 25 minutes between updates of the testing auth token.
const TEST_AUTH_TIMEOUT_MS = 25 * 60 * 1000;

// Only process context callbacks once every 30 seconds.
const CONTEXT_CALLBACK_TIMEOUT = 30 * 1000;

// Wrapper around global Twitch extension object.
export default class Ext {
  static fetchTestAuth(cb) {
    Client.fetchTestAuth(Ext.extensionID, Ext.testChannelID, Ext.testJWTRole)
      .then(auth => {
        cb(auth);
      })
      .catch(cb);
  }

  static onAuthorized(cb) {
    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.SANDBOX_DEV:
        Ext.fetchTestAuth(cb);
        setInterval(Ext.fetchTestAuth, TEST_AUTH_TIMEOUT_MS, cb);
        break;

      case ENVIRONMENTS.SANDBOX_TWITCH:
      case ENVIRONMENTS.PRODUCTION: {
        const timer = setTimeout(cb, 1000 * 15);
        window.Twitch.ext.onAuthorized(auth => {
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
      case ENVIRONMENTS.SANDBOX_TWITCH:
      case ENVIRONMENTS.PRODUCTION:
        (function setupOnContextCallback() {
          // Twitch currently (2017-08-25) has an issue where certain browser mis-configurations
          // (like having incorrect system time/timezone settings) will cause the onContext callback
          // function to fire repeatedly as quickly as possible. To deal with this issue, we
          // throttle the onContext callbacks.
          let lastContextCall = 0;

          window.Twitch.ext.onContext(context => {
            // Check the last time the auth callback was called and restrict.
            const diff = new Date().getTime() - lastContextCall;
            if (diff < CONTEXT_CALLBACK_TIMEOUT) {
              return;
            }
            lastContextCall = new Date().getTime();

            cb(context);
          });
        })();
        break;

      default:
    }
  }
}

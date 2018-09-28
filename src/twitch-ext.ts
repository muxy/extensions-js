/**
 * @module SDK
 */
import { DebugOptions } from './debug';
import Client from './state-client';
import { Position, TwitchAuth, TwitchContext } from './twitch';
import { consolePrint, CurrentEnvironment, ENVIRONMENTS } from './util';

// 25 minutes between updates of the testing auth token.
const TEST_AUTH_TIMEOUT_MS = 25 * 60 * 1000;

// Only process context callbacks once every 30 seconds.
const CONTEXT_CALLBACK_TIMEOUT = 30 * 1000;

// Wrapper around global Twitch extension object.
export default class Ext {
  public static extensionID: string;

  public static fetchTestAuth(opts: DebugOptions, cb: (auth: TwitchAuth) => void) {
    Client.fetchTestAuth(this.extensionID, opts)
      .then((auth: TwitchAuth) => {
        cb(auth);
      })
      .catch(cb);
  }

  public static fetchAdminAuth(debug: DebugOptions, cb: (auth: TwitchAuth) => void) {
    const allowedOrigins = [
      '^https://dev-portal\\.staging.muxy\\.io$',
      '^https://devportal\\.muxy\\.io$',
      '^https://dev\\.muxy\\.io$',
      '^https?://localhost'
    ];

    // Show that we're ready to receive.
    let connectionAttempts = 0;
    const connection = setInterval(() => {
      window.parent.postMessage({ type: 'connect', id: this.extensionID }, '*');
      connectionAttempts++;

      if (connectionAttempts > 60) {
        clearInterval(connection);
      }
    });

    window.addEventListener('message', auth => {
      let allowed = false;
      allowedOrigins.forEach(origin => {
        const r = new RegExp(origin);
        if (r.test(auth.origin)) {
          allowed = true;
        }
      });

      if (!allowed) {
        return;
      }

      if (auth.data.type === 'jwt') {
        const resp = Object.assign(new TwitchAuth(), {
          token: auth.data.jwt,
          clientId: this.extensionID,
          channelId: debug.channelID,
          userId: debug.userID || 'T12345678'
        });

        clearInterval(connection);
        return cb(resp);
      }
    });
  }

  public static onAuthorized(opts: DebugOptions, cb: (auth: TwitchAuth) => void) {
    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.SANDBOX_DEV:
        Ext.fetchTestAuth(opts, cb);
        setInterval(Ext.fetchTestAuth, TEST_AUTH_TIMEOUT_MS, opts, cb);
        break;

      case ENVIRONMENTS.SANDBOX_ADMIN:
      case ENVIRONMENTS.ADMIN:
        Ext.fetchAdminAuth(opts, cb);
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
        consolePrint(`No authorization callback for ${CurrentEnvironment()}`, {
          type: 'error'
        });
    }
  }

  public static onContext(cb: (ctx: TwitchContext) => void) {
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

  public static beginPurchase(sku: string) {
    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.SANDBOX_TWITCH:
      case ENVIRONMENTS.PRODUCTION:
        window.Twitch.ext.purchases.beginPurchase(sku);
        break;

      default:
        consolePrint(`beginPurchase not supported for ${CurrentEnvironment()}`, {
          type: 'error'
        });
    }
  }

  public static getPrices(cb: (a: any) => void) {
    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.SANDBOX_TWITCH:
      case ENVIRONMENTS.PRODUCTION:
        window.Twitch.ext.purchases
          .getPrices()
          .then(prices => {
            cb(prices);
          })
          .catch(cb);
        break;

      default:
        consolePrint(`getPrices not supported for ${CurrentEnvironment()}`, {
          type: 'error'
        });
    }
  }

  public static onReloadEntitlements(cb: (a: any) => void) {
    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.SANDBOX_TWITCH:
      case ENVIRONMENTS.PRODUCTION:
        window.Twitch.ext.purchases.onReloadEntitlements(cb);
        break;

      default:
        consolePrint(`onReloadEntitlements not supported for ${CurrentEnvironment()}`, {
          type: 'error'
        });
    }
  }

  public static onVisibilityChanged(callback: (isVisible: boolean, ctx: TwitchContext) => void) {
    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.SANDBOX_TWITCH:
      case ENVIRONMENTS.PRODUCTION:
        window.Twitch.ext.onVisibilityChanged(callback);
        break;

      default:
        consolePrint(`onVisibilityChanged not supported for ${CurrentEnvironment()}`, {
          type: 'error'
        });
    }
  }

  public static onPositionChanged(callback: (position: Position) => void) {
    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.SANDBOX_TWITCH:
      case ENVIRONMENTS.PRODUCTION:
        window.Twitch.ext.onPositionChanged(callback);
        break;

      default:
        consolePrint(`onVisibilityChanged not supported for ${CurrentEnvironment()}`, {
          type: 'error'
        });
    }
  }
}

/**
 * @module SDK
 */
import { DebugOptions } from './debug';
import StateClient from './state-client';
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
    StateClient.fetchTestAuth(this.extensionID, opts)
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
      connectionAttempts++;

      // Once we've tried 60 times, back off on attempting to once every 1.5 seconds or so.
      if (connectionAttempts > 60) {
        if (connectionAttempts % 10 !== 0) {
          return;
        }
      }

      window.parent.postMessage({ type: 'connect', id: this.extensionID }, '*');
    }, 150);

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
        StateClient.setEnvironment(null, debug);

        const resp = Object.assign(new TwitchAuth(), {
          channelId: debug.channelID,
          clientId: this.extensionID,
          token: auth.data.jwt,
          userId: debug.userID || 'T12345678'
        });

        clearInterval(connection);
        return cb(resp);
      }
    });
  }

  public static onAuthorized(opts: DebugOptions, cb: (auth: TwitchAuth) => void) {
    if (opts.jwt) {
      const auth = this.authFromJWT(opts.jwt);

      return setTimeout(() => {
        StateClient.setEnvironment(null, opts);
        cb(auth);
      });
    }

    switch (CurrentEnvironment()) {
      case ENVIRONMENTS.SANDBOX_DEV:
      case ENVIRONMENTS.STAGING_DEV:
        Ext.fetchTestAuth(opts, cb);
        setInterval(Ext.fetchTestAuth, TEST_AUTH_TIMEOUT_MS, opts, cb);
        break;

      case ENVIRONMENTS.SANDBOX_ADMIN:
      case ENVIRONMENTS.STAGING_ADMIN:
      case ENVIRONMENTS.ADMIN:
        Ext.fetchAdminAuth(opts, cb);
        break;

      case ENVIRONMENTS.SANDBOX_TWITCH:
      case ENVIRONMENTS.STAGING_TWITCH:
      case ENVIRONMENTS.PRODUCTION: {
        const timer = setTimeout(cb, 1000 * 15);
        window.Twitch.ext.onAuthorized(auth => {
          clearTimeout(timer);

          StateClient.setEnvironment(null, opts);
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
      case ENVIRONMENTS.STAGING_TWITCH:
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
      case ENVIRONMENTS.STAGING_TWITCH:
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
      case ENVIRONMENTS.STAGING_TWITCH:
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
      case ENVIRONMENTS.STAGING_TWITCH:
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
      case ENVIRONMENTS.STAGING_TWITCH:
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
      case ENVIRONMENTS.STAGING_TWITCH:
      case ENVIRONMENTS.PRODUCTION:
        window.Twitch.ext.onPositionChanged(callback);
        break;

      default:
        consolePrint(`onVisibilityChanged not supported for ${CurrentEnvironment()}`, {
          type: 'error'
        });
    }
  }

  private static authFromJWT(jwt: string): TwitchAuth {
    const claims = JSON.parse(atob(jwt.split('.')[1]));
    const res = new TwitchAuth();

    res.token = jwt;
    res.channelId = claims.channel_id;
    res.userId = claims.user_id;
    res.clientId = Ext.extensionID;

    return res;
  }
}

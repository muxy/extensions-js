/**
 * @module SDK
 */
import Config, { AuthorizationFlowType } from './config';
import { DebugOptions } from './debug';
import StateClient from './state-client';
import { Position, TwitchAuth, TwitchContext } from './twitch';
import { consolePrint, CurrentEnvironment } from './util';

// 25 minutes between updates of the testing auth token.
const TEST_AUTH_TIMEOUT_MS = 25 * 60 * 1000;

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
    const allowedOrigins = ['^https://.*?\\.muxy\\.io$', '^https://.*?\\.staging\\.muxy\\.io$', '^https?://localhost'];

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

    const flowType = Config.GetAuthorizationFlowType(CurrentEnvironment());

    switch (flowType) {
      case AuthorizationFlowType.TestAuth:
        Ext.fetchTestAuth(opts, cb);
        setInterval(Ext.fetchTestAuth, TEST_AUTH_TIMEOUT_MS, opts, cb);
        break;

      case AuthorizationFlowType.AdminAuth:
        Ext.fetchAdminAuth(opts, cb);
        break;

      case AuthorizationFlowType.TwitchAuth: {
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
    if (Config.CanUseTwitchAPIs(CurrentEnvironment())) {
      window.Twitch.ext.onContext(cb);
    }
  }

  public static beginPurchase(sku: string) {
    if (Config.CanUseTwitchAPIs(CurrentEnvironment())) {
      window.Twitch.ext.purchases.beginPurchase(sku);
    } else {
      consolePrint(`beginPurchase not supported for ${CurrentEnvironment()}`, {
        type: 'error'
      });
    }
  }

  public static getPrices(cb: (a: any) => void) {
    if (Config.CanUseTwitchAPIs(CurrentEnvironment())) {
      window.Twitch.ext.purchases
        .getPrices()
        .then(prices => {
          cb(prices);
        })
        .catch(cb);
    } else {
      consolePrint(`getPrices not supported for ${CurrentEnvironment()}`, {
        type: 'error'
      });
    }
  }

  public static onReloadEntitlements(cb: (a: any) => void) {
    if (Config.CanUseTwitchAPIs(CurrentEnvironment())) {
      window.Twitch.ext.purchases.onReloadEntitlements(cb);
    } else {
      consolePrint(`onReloadEntitlements not supported for ${CurrentEnvironment()}`, {
        type: 'error'
      });
    }
  }

  public static onVisibilityChanged(callback: (isVisible: boolean, ctx: TwitchContext) => void) {
    if (Config.CanUseTwitchAPIs(CurrentEnvironment())) {
      window.Twitch.ext.onVisibilityChanged(callback);
    } else {
      consolePrint(`onVisibilityChanged not supported for ${CurrentEnvironment()}`, {
        type: 'error'
      });
    }
  }

  public static onPositionChanged(callback: (position: Position) => void) {
    if (Config.CanUseTwitchAPIs(CurrentEnvironment())) {
      window.Twitch.ext.onPositionChanged(callback);
    } else {
      consolePrint(`onVisibilityChanged not supported for ${CurrentEnvironment()}`, {
        type: 'error'
      });
    }
  }

  public static onHighlightChanged(callback: (highlighted: boolean) => void) {
    if (Config.CanUseTwitchAPIs(CurrentEnvironment())) {
      window.Twitch.ext.onHighlightChanged(callback);
    } else {
      consolePrint(`onHighlightChanged not supported for ${CurrentEnvironment()}`, {
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

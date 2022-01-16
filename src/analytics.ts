/**
 * @module SDK
 */
import gumshoeFactory from '../libs/gumshoe';
import User from './user';

/**
 * The analytics collection endpoint.
 * @ignore
 */
const ANALYTICS_ENDPOINT = 'https://info.muxy.io';

/**
 * The Analytics class allows for sending events and metrics to Google Analytics
 * with a given UA_STRING.
 */
export default class Analytics {
  public gumshoe: any;
  public ready: boolean;
  public uaString: string;
  public loadPromise: Promise<any>;
  public user: User;

  constructor(uaString, loadPromise) {
    this.ready = false;
    this.uaString = uaString;
    this.loadPromise = loadPromise;
    this.user = null;

    this.gumshoe = gumshoeFactory();
    this.gumshoe.transport({
      map: this.mapData.bind(this),
      name: 'muxy-extension-sdk',
      send: (data, fn) => {
        const d = data;
        // Remove stuff that we don't want to send up
        delete d.pageData;
        delete d.clientUuid;
        delete d.uuid;
        delete d.sessionUuid;
        this.gumshoe.reqwest(
          {
            contentType: 'application/x-www-form-urlencoded',
            crossOrigin: true,
            data: d,
            method: 'POST',
            url: ANALYTICS_ENDPOINT
          },
          () => {
            if (fn) {
              fn(null);
            }
          }
        );
      }
    });

    this.gumshoe({ transport: 'muxy-extension-sdk' });

    this.loadPromise.then(() => {
      this.ready = true;
    });
  }

  /**
   * Internal function to map event data to GA format.
   * @private
   */
  public mapData(data, additional: Record<string, unknown> = {}) {
    const appName = 'Muxy';

    let ip = '<unknown ip>';
    let channelID = null;
    let opaqueID = null;
    let userID = null;
    let role = null;
    let game = null;
    let videoMode = null;
    let latency = null;
    let bitrate = null;

    if (this.user) {
      ip = this.user.ip;
      channelID = this.user.channelID;
      opaqueID = this.user.twitchOpaqueID;
      userID = !opaqueID || opaqueID[0] !== 'U' ? null : opaqueID;
      role = this.user.role;
      game = this.user.game;
      videoMode = this.user.videoMode;
      latency = this.user.latency;
      bitrate = this.user.bitrate;
    }

    const pd = data.pageData;
    pd.ipAddress = ip;

    const result = {
      aid: appName,
      an: appName,
      cd1: channelID,
      cd2: role,
      cd3: game,
      cd4: videoMode,
      cid: opaqueID || data.clientUuid || data.sessionUuid || '00000000-0000-0000-0000-000000000000',
      cm2: latency,
      cm3: bitrate,
      dh: pd.hostName,
      dl: pd.url,
      dp: pd.path,
      dr: pd.referer,
      dt: pd.title,
      ea: undefined,
      ec: undefined,
      el: undefined,
      ev: undefined,
      je: pd.javaEnabled,
      sr: pd.screenResolution,
      t: 'event',
      tid: this.uaString,
      ti: additional.transactionId,
      tr: additional.transactionRevenue,
      in: additional.itemName,
      ip: additional.itemPrice,
      iq: additional.itemQuantity,
      ic: additional.itemCode,
      iv: additional.itemCategory,
      ua: pd.userAgent,
      uid: userID,
      uip: ip,
      ul: pd.language,
      v: 1,
      vp: `${pd.viewportHeight}x${pd.viewportWidth}`
    };

    if (data.eventName === 'page.view') {
      result.t = 'pageview';
    } else {
      result.ec = data.eventName;
      result.ea = data.eventData.name;
      result.el = data.eventData.label;
      result.ev = data.eventData.value;
    }

    return result;
  }

  /**
   * Sends an arbitrary even to Google Analytics.
   *
   * @param {string} category - The high-level category to collect this event under.
   * @param {string} name - A unique identifier for this event.
   * @param {*} value - (optional) A value to associate with this event (defaults to 1).
   * @param {string} label - (optional) A human-readable label for this event.
   */
  public sendEvent(category: string, name: string, value: any = 1, label: string = '') {
    if (!this.ready) {
      throw new Error('muxy.Analytics used before ready');
    }

<<<<<<< HEAD
    const data = { name, value, label };
    this.gumshoe.send(category, data);
||||||| parent of f982423 (Update versions and include dist files)
    const data = { name, value, label, ...additional };
    this.gumshoe.send(category, data);
=======
    const data = { name, value, label };
    this.gumshoe.send(category, data, additional);
>>>>>>> f982423 (Update versions and include dist files)
  }

  /**
   * Sends a simple page view event to Google Analytics.
   */
  public pageView() {
    if (!this.ready) {
      throw new Error('muxy.Analytics used before ready');
    }

    this.gumshoe.send('page.view', {});
  }
}

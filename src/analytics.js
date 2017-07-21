import gumshoeFactory from '../libs/gumshoe';

// The analytics collection endpoint
const ANALYTICS_ENDPOINT = 'https://info.muxy.io';

/**
 * The Analytics class allows for sending events and metrics to Google Analytics
 * with a given UA_STRING.
 */
export default class Analytics {
  constructor(uaString, loadPromise) {
    this.ready = false;
    this.uaString = uaString;
    this.loadPromise = loadPromise;
    this.user = null;

    this.gumshoe = gumshoeFactory();
    this.gumshoe.transport({ name: 'muxy-extension-sdk',
      send: (data, fn) => {
        this.gumshoe.reqwest({
          data,
          url: ANALYTICS_ENDPOINT,
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded',
          crossOrigin: true
        }, () => { if (fn) { fn(null); } });
      },
      map: this.mapData.bind(this)
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
  mapData(data) {
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
      cid: opaqueID ||
        data.clientUuid ||
        data.sessionUuid ||
        '00000000-0000-0000-0000-000000000000',
      dh: pd.hostName,
      dl: pd.url,
      dp: pd.path,
      dr: pd.referer,
      dt: pd.title,
      je: pd.javaEnabled,
      sr: pd.screenResolution,
      t: 'event',
      tid: this.uaString,
      ua: pd.userAgent,
      uid: userID,
      uip: ip,
      ul: pd.language,
      v: 1,
      vp: `${pd.viewportHeight}x${pd.viewportWidth}`,
      cd1: channelID,
      cd2: role,
      cd3: game,
      cd4: videoMode,
      cm2: latency,
      cm3: bitrate
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
  sendEvent(category, name, value = 1, label = '') {
    if (!this.ready) {
      throw new Error('muxy.Analytics used before ready');
    }

    const data = { name, value, label };
    this.gumshoe.send(category, data);
  }

  /**
   * Sends a simple page view event to Google Analytics.
   */
  pageView() {
    if (!this.ready) {
      throw new Error('muxy.Analytics used before ready');
    }

    this.gumshoe.send('page.view', {});
  }
}

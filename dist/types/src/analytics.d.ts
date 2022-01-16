import User from './user';
/**
 * The Analytics class allows for sending events and metrics to Google Analytics
 * with a given UA_STRING.
 */
export default class Analytics {
    gumshoe: any;
    ready: boolean;
    uaString: string;
    loadPromise: Promise<any>;
    user: User;
    constructor(uaString: any, loadPromise: any);
    /**
     * Internal function to map event data to GA format.
     * @private
     */
    mapData(data: any, additional?: Record<string, unknown>): {
        aid: string;
        an: string;
        cd1: any;
        cd2: any;
        cd3: any;
        cd4: any;
        cid: any;
        cm2: any;
        cm3: any;
        dh: any;
        dl: any;
        dp: any;
        dr: any;
        dt: any;
        ea: any;
        ec: any;
        el: any;
        ev: any;
        je: any;
        sr: any;
        t: string;
        tid: string;
        ti: unknown;
        tr: unknown;
        in: unknown;
        ip: unknown;
        iq: unknown;
        ic: unknown;
        iv: unknown;
        ua: any;
        uid: any;
        uip: string;
        ul: any;
        v: number;
        vp: string;
    };
    /**
     * Sends an arbitrary even to Google Analytics.
     *
     * @param {string} category - The high-level category to collect this event under.
     * @param {string} name - A unique identifier for this event.
     * @param {*} value - (optional) A value to associate with this event (defaults to 1).
     * @param {string} label - (optional) A human-readable label for this event.
     */
    sendEvent(category: string, name: string, value?: any, label?: string, additional?: Record<string, unknown>): void;
    /**
     * Sends a simple page view event to Google Analytics.
     */
    pageView(): void;
}

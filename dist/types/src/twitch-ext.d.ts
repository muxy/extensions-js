/// <reference types="node" />
import { DebugOptions } from './debug';
import { Position, TwitchAuth, TwitchContext } from './twitch';
export default class Ext {
    static extensionID: string;
    static fetchTestAuth(opts: DebugOptions, cb: (auth: TwitchAuth) => void): void;
    static fetchAdminAuth(debug: DebugOptions, cb: (auth: TwitchAuth) => void): void;
    static onAuthorized(opts: DebugOptions, cb: (auth: TwitchAuth) => void): NodeJS.Timeout;
    static onContext(cb: (ctx: TwitchContext) => void): void;
    static beginPurchase(sku: string): void;
    static getPrices(cb: (a: any) => void): void;
    static onReloadEntitlements(cb: (a: any) => void): void;
    static onVisibilityChanged(callback: (isVisible: boolean, ctx: TwitchContext) => void): void;
    static onPositionChanged(callback: (position: Position) => void): void;
    static onHighlightChanged(callback: (highlighted: boolean) => void): void;
    private static authFromJWT;
}

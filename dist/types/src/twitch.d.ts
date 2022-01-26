/**
 * @module SDK
 */
import { ObserverHandler } from './observer';
export declare class TwitchAuth {
    clientId: string;
    token: string;
    channelId: string;
    userId: string;
    helixToken: string;
}
export declare class JWT {
    channel_id: string;
    user_id: string;
    token: string;
    role: string;
}
export interface Position {
    x: number;
    y: number;
}
export interface TwitchBitsTransaction {
    transactionId: string;
    product: TwitchBitsProduct;
    userId: string;
    displayName: string;
    initiator: any;
    transactionReceipt: string;
}
export interface TwitchBitsProduct {
    domain: string;
    sku: string;
    inDevelopment: boolean;
    displayName: string;
    cost: TwitchBitsCost;
}
export interface TwitchBitsCost {
    amount: number;
    type: string;
}
export interface TwitchActionsSDK {
    followChannel(chan: string): void;
    onFollow(cb: (didFollow: boolean, chan: string) => void): void;
    requestIdShare(): void;
}
export interface TwitchBitsSDK {
    getProducts: () => Promise<TwitchBitsProduct[]>;
    useBits: (sku: string) => void;
    onTransactionComplete: (callback: (transaction: TwitchBitsTransaction) => void) => void;
    onTransactionCancelled: (callback: () => void) => void;
    showBitsBalance: () => void;
    setUseLoopback: (useLoopback: boolean) => void;
}
export interface TwitchFeaturesSDK {
    isBitsEnabled: boolean;
    isChatEnabled: boolean;
    isSubscriptionStatusAvailable: boolean;
    onChanged: (callback: (changes: string[]) => void) => void;
}
export interface TwitchPurchasesSDK {
    beginPurchase(sku: string): void;
    getPrices(): Promise<any>;
    onReloadEntitlements(cb: (arg: any) => void): void;
}
export interface TwitchSDK {
    actions: TwitchActionsSDK;
    bits: TwitchBitsSDK;
    features: TwitchFeaturesSDK;
    purchases: TwitchPurchasesSDK;
    settings: any;
    onAuthorized(cb: (auth: TwitchAuth) => void): void;
    onContext(cb: (ctx: TwitchContext, fields: object) => void): void;
    onError(cb: (err: string | Error) => void): void;
    onVisibilityChanged(callback: (isVisible: boolean, ctx: TwitchContext | null) => void): void;
    onPositionChanged(callback: (position: Position) => void): void;
    onHighlightChanged(callback: (highlight: boolean) => void): void;
    getAuthData(): any;
    send(target: string, dataType: string, event: {
        event: string;
        data: object;
    }): any;
    listen(topic: string, callback: (t: any, datatype: string, message: string) => void): any;
    unlisten(topic: string, callback: (t: any, datatype: string, message: string) => void): any;
}
export interface TwitchExtensionHelper {
    ext: TwitchSDK;
}
export declare class ContextUpdateCallbackHandle extends ObserverHandler<TwitchContext> {
    private cb;
    constructor(cb: any);
    notify(context: TwitchContext): void;
}
export declare class HighlightChangedCallbackHandle extends ObserverHandler<boolean> {
    private cb;
    constructor(cb: (isHighlighted: boolean) => void);
    notify(isHighlighted: boolean): void;
}
export interface HostingInfo {
    hostedChannelId: string;
    hostingChannelId: string;
}
export interface TwitchContext {
    arePlayerControlsVisible: boolean;
    bitrate: number;
    bufferSize: number;
    displayResolution: string;
    game: string;
    hlsLatencyBroadcaster: number;
    hostingInfo?: HostingInfo;
    isFullScreen: boolean;
    isMuted: boolean;
    isPaused: boolean;
    isTheatreMode: boolean;
    language: string;
    mode: string;
    playbackMode: string;
    theme: string;
    videoResolution: string;
    volume: number;
}
declare global {
    interface Window {
        Twitch: TwitchExtensionHelper;
    }
}

/**
 * @module SDK
 */

// TwitchAuth is the object that you get back from the onAuth callback
import { ObserverHandler } from './observer';
import User from './user';

// Twitch types
export class TwitchAuth {
  public clientId: string;
  public token: string;
  public channelId: string;
  public userId: string;
}

export class JWT {
  // tslint:disable:variable-name
  public channel_id: string;
  public user_id: string;
  public token: string;
  public role: string;
  // tslint:enable:variable-name
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

// Twitch SDK Interfaces

export interface TwitchActionsSDK {
  followChannel(chan: string): void;
  onFollow(cb: (didFollow: boolean, chan: string) => void): void;
  requestIdShare(): void;
}

export interface TwitchBitsSDK {
  getProducts: () => Promise<TwitchBitsProduct[]>;
  useBits: (sku: string) => void;
  onTransactionComplete: (callback: (transaction: TwitchBitsTransaction) => void) => void;
  showBitsBalance: () => void;
  setUseLoopback: (useLoopback: boolean) => void;
}

export interface TwitchPurchasesSDK {
  beginPurchase(sku: string): void;
  getPrices(): Promise<any>;
  onReloadEntitlements(cb: (arg: any) => void): void;
}

// Twitch Extension SDK
export interface TwitchSDK {
  actions: TwitchActionsSDK;
  bits: TwitchBitsSDK;
  purchases: TwitchPurchasesSDK;
  settings: any;

  onAuthorized(cb: (auth: TwitchAuth) => void): void;
  onContext(cb: (ctx: TwitchContext, fields: object) => void): void;
  onError(cb: (err: string | Error) => void): void;
  onVisibilityChanged(callback: (isVisible: boolean, ctx: TwitchContext | null) => void): void;
  onPositionChanged(callback: (position: Position) => void): void;

  getAuthData(): any;

  send(
    target: string,
    dataType: string,
    event: {
      event: string;
      data: object;
    }
  );

  listen(topic: string, callback: (t: any, datatype: string, message: string) => void);
  unlisten(topic: string, callback: (t: any, datatype: string, message: string) => void);
}

// Twitch Global Object
export interface TwitchExtensionHelper {
  ext: TwitchSDK;
}

export class ContextUpdateCallbackHandle extends ObserverHandler<TwitchContext> {
  private cb: (context: TwitchContext) => void;

  constructor(cb) {
    super();
    this.cb = cb;
  }

  public notify(context: TwitchContext): void {
    this.cb(context);
  }
}

export interface TwitchContext {
  arePlayerControlsVisible: boolean;
  bitrate: number;
  bufferSize: number;
  displayResolution: string;
  game: string;
  hlsLatencyBroadcaster: number;
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

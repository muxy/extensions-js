/**
 * @module SDK
 */

// TwitchAuth is the object that you get back from the onAuth callback
import { ObserverHandler } from './observer';

// Twitch types
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
  mode: 'viewer' | 'dashboard' | 'config';
  playbackMode: 'video' | 'audio' | 'remote' | 'chat-only';
  theme: 'light' | 'dark';
  videoResolution: string;
  volume: number;
}

export class TwitchAuth {
  public clientId: string;
  public token: string;
  public channelId: string;
  public userId: string;
  public helixToken: string;
}

export class JWT {
  public channel_id: string;
  public user_id: string;
  public token: string;
  public role: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface TwitchBitsCost {
  amount: number;
  type: string;
}

export interface TwitchBitsProduct {
  sku: string;
  type: 'bits';
  inDevelopment?: boolean;
  displayName: string;
  cost: TwitchBitsCost;
  amount: string;
}

export interface TwitchBitsTransaction {
  transactionId: string;
  product: TwitchBitsProduct;
  userId: string;
  domainID: string;
  transactionID: string;
  displayName: string;
  initiator: 'CURRENT_USER' | 'OTHER';
  transactionReceipt: string;
}

// Twitch SDK Interfaces
export interface TwitchActionsSDK {
  followChannel(chan: string): void;
  onFollow(cb: (didFollow: boolean, chan: string) => void): void;
  requestIdShare(): void;
  minimize(): void;
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

export interface TwitchExtensionViewer {
  opaqueId: string;
  id: string | null;
  role: string;
  isLinked: boolean;
  sessionToken: string;
  subscriptionStatus: null | {
    tier: '1000' | '2000' | '3000';
  };

  onChanged(cb: () => void): void;
}

// Twitch Extension SDK
export interface TwitchSDK {
  actions: TwitchActionsSDK;
  bits: TwitchBitsSDK;
  features: TwitchFeaturesSDK;
  purchases: TwitchPurchasesSDK;
  viewer: TwitchExtensionViewer;
  settings: Record<string, unknown>;

  onAuthorized(cb: (auth: TwitchAuth) => void): void;
  onContext(cb: (ctx: TwitchContext, fields: object) => void): void;
  onError(cb: (err: string | Error) => void): void;
  onVisibilityChanged(callback: (isVisible: boolean, ctx: TwitchContext | null) => void): void;
  onPositionChanged(callback: (position: Position) => void): void;
  onHighlightChanged(callback: (highlight: boolean) => void): void;

  send(
    target: string,
    dataType: string,
    event:
      | string
      | {
          event: string;
          data: object;
        }
  ): void;

  listen(topic: string, callback: (t: string, datatype: string, message: string) => void): void;
  unlisten(topic: string, callback: (t: string, datatype: string, message: string) => void): void;
}

export class ContextUpdateCallbackHandle extends ObserverHandler<TwitchContext> {
  private cb: (context: TwitchContext) => void;

  constructor(cb: (context: TwitchContext) => void) {
    super();
    this.cb = cb;
  }

  public notify(context: TwitchContext): void {
    this.cb(context);
  }
}

export class HighlightChangedCallbackHandle extends ObserverHandler<boolean> {
  private cb: (isHighlighted: boolean) => void;

  constructor(cb: (isHighlighted: boolean) => void) {
    super();
    this.cb = cb;
  }

  public notify(isHighlighted: boolean): void {
    this.cb(isHighlighted);
  }
}

// Twitch Global Object
export interface TwitchExtensionHelper {
  ext: TwitchSDK;
}

declare global {
  interface Window {
    Twitch: TwitchExtensionHelper;
  }
}

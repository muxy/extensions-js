// TwitchAuth is the object that you get back from the onAuth callback
import { ObserverHandler } from './observer';
import User from './user';

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

export interface TwitchPurchasesSDK {
  beginPurchase(sku: string): void;
  getPrices(): Promise<any>;
  onReloadEntitlements(cb: (arg: any) => void): void;
}

export interface Position {
  x: number;
  y: number;
}

export interface TwitchSDK {
  purchases: TwitchPurchasesSDK;

  onAuthorized(cb: (auth: TwitchAuth) => void): void;
  onContext(cb: (auth: TwitchContext) => void): void;
  onVisibilityChanged(callback: (isVisible: boolean, ctx: TwitchContext) => void): void;
  onPositionChanged(callback: (position: Position) => void): void;

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

export interface TwitchWrapper {
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
    Twitch: TwitchWrapper;
  }
}

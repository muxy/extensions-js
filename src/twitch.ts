// TwitchAuth is the object that you get back from the onAuth callback
export class TwitchAuth {
  clientId: string;
  token: string;
  channelId: string;
  userId: string;
}

export class JWT {
  channel_id: string;
  user_id: string;
  token: string;
  role: string;
}

export interface TwitchPurchasesSDK {
  beginPurchase(sku: string): void;
  getPrices(): Promise<any>;
  onReloadEntitlements(cb: (arg: any) => void): void;
}

export interface TwitchSDK {
  onAuthorized(cb: (auth: TwitchAuth) => void): void;
  onContext(cb: (auth: TwitchContext) => void): void;

  send(
    target: string,
    dataType: string,
    event: {
      event: string;
      data: object;
    }
  );

  listen(
    topic: string,
    callback: (t: any, datatype: string, message: string) => void
  );
  unlisten(
    topic: string,
    callback: (t: any, datatype: string, message: string) => void
  );

  purchases: TwitchPurchasesSDK;
}

export interface TwitchWrapper {
  ext: TwitchSDK;
}

export interface TwitchContext {
  ip: string;
  channelID: string;
  twitchOpaqueID: string;
  role: string;
  game: string;
  videoMode: string;
  latency: number;
  bitrate: number;
}

declare global {
  interface Window {
    Twitch: TwitchWrapper;
  }
}

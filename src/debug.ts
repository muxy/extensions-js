/**
 * @module SDK
 */
export interface DebugOptions {
  url?: string;

  channelID?: string;
  userID?: string;
  role?: string;

  jwt?: string;

  environment?: string;

  onPubsubListen: (...args: any[]) => void;
  onPubsubReceive: (...args: any[]) => void;
  onPubsubSend: (...args: any[]) => void;
}

export class DefaultDebugOptions implements DebugOptions {
  public onPubsubListen: (...args: any[]) => void;
  public onPubsubReceive: (...args: any[]) => void;
  public onPubsubSend: (...args: any[]) => void;
}

export class DebuggingOptions {
  public options: DebugOptions;

  constructor() {
    const noop = (...args: any[]) => {
      /* Default to doing nothing on callback */
    };

    this.options = {
      onPubsubListen: noop,
      onPubsubReceive: noop,
      onPubsubSend: noop
    };

    if (window.location && window.location.search) {
      const qp = new URLSearchParams(window.location.search);
      this.options.url = this.readFromQuery(qp, 'url');
      this.options.url = this.readFromQuery(qp, 'channelID');
      this.options.url = this.readFromQuery(qp, 'userID');
      this.options.url = this.readFromQuery(qp, 'role');
      this.options.url = this.readFromQuery(qp, 'environment');
    }
  }

  public url(url) {
    this.options.url = /^https?:\/\//.test(url) ? url : `https://${url}`;
    return this;
  }

  public channelID(cid) {
    this.options.channelID = cid;
    return this;
  }

  public userID(uid) {
    this.options.userID = uid;
    return this;
  }

  public role(r) {
    this.options.role = r;
    return this;
  }

  public jwt(j) {
    this.options.jwt = j;
    return this;
  }

  public environment(e) {
    this.options.environment = e;
    return this;
  }

  public onPubsubSend(cb) {
    this.options.onPubsubSend = cb;
    return this;
  }

  public onPubsubReceive(cb) {
    this.options.onPubsubReceive = cb;
    return this;
  }

  public onPubsubListen(cb) {
    this.options.onPubsubListen = cb;
    return this;
  }

  private readFromQuery(params: URLSearchParams, key: string) {
    return params.get(`muxy_debug_${key}`);
  }
}

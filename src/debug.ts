export interface DebugOptions {
  url?: string;

  channelID?: string;
  userID?: string;
  role?: string;

  onPubsubSend: Function;
  onPubsubReceive: Function;
  onPubsubListen: Function;
}

export class DebuggingOptions {
  options: DebugOptions;

  constructor() {
    const noop = () => {};

    this.options = {
      onPubsubListen: noop,
      onPubsubSend: noop,
      onPubsubReceive: noop
    };
  }

  url(url) {
    this.options.url = url;
    return this;
  }

  channelID(cid) {
    this.options.channelID = cid;
    return this;
  }

  userID(uid) {
    this.options.userID = uid;
    return this;
  }

  role(r) {
    this.options.role = r;
    return this;
  }

  onPubsubSend(cb) {
    this.options.onPubsubSend = cb;
    return this;
  }

  onPubsubReceive(cb) {
    this.options.onPubsubReceive = cb;
    return this;
  }

  onPubsubListen(cb) {
    this.options.onPubsubListen = cb;
    return this;
  }
}

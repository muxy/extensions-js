/**
 * @module SDK
 */
// The pusher types have no default export, ignore that error since we are using the namespace
// @ts-ignore
import Pusher from 'pusher-js';

import { DebugOptions } from './debug';
import { CurrentEnvironment, Environment, ENVIRONMENTS } from './util';

// CallbackHandle is what is returned from a call to listen from the Messenger, and should be
// passed to unlisten.
export class CallbackHandle {
  public target: string;
  public cb: (t: any, datatype: string, message: string) => void;
}

export interface Messenger {
  channelID: string;
  extensionID: string;

  send(id, event, target, body, client): void;
  listen(id, topic, callback: (parsedObject: object) => void): CallbackHandle;
  unlisten(id, CallbackHandle): void;
  close(): void;
}

// TwitchMessenger implements the basic 'messenger' interface, which should be implemented
// for all pubsub implementations. This is used by SDK to provide low-level access
// to a pubsub implementation.
class TwitchMessenger implements Messenger {
  public channelID: string;
  public extensionID: string;
  public debug: DebugOptions;

  constructor(debug: DebugOptions) {
    this.channelID = '';
    this.extensionID = '';
    this.debug = debug;
  }

  /**
   * send will send a message to all clients.
   * @param id the extension id or app id of the app thats sending the message.
   * @param event an event name. Event names should be in the form [a-z0-9_]+
   * @param either 'broadcast' or 'whisper-<opaque-user-id>'
   * @param body a json object to send
   * @param client a state-client instance. Used to make external calls.
   * The twitch messenger does not need the client, so its not shown in the signature
   * below.
   */
  /* eslint-disable class-methods-use-this */
  public send(id, event, target, body) {
    const data = body || {};

    this.debug.onPubsubSend(id, event, target, body);
    window.Twitch.ext.send(target, 'application/json', {
      data,
      event: `${CurrentEnvironment().environment}:${id}:${event}`
    });
  }
  /* eslint-enable class-methods-use-this */

  /**
   * listen is the low level listening interface.
   * @param id the extension id or app id of the app thats sending the message.
   * @param topic either `broadcast` or `whisper-<opaque-user-id>`.
   * @param callback a function(body)
   * @return a handle that can be passed into unlisten to unbind the callback.
   */
  /* eslint-disable class-methods-use-this */
  public listen(id, topic: string, callback): CallbackHandle {
    const cb = (t, datatype, message) => {
      try {
        const parsed = JSON.parse(message);

        this.debug.onPubsubReceive(id, topic, parsed);
        callback(parsed);
      } catch (err) {
        // TODO: Silent failure?
      }
    };

    this.debug.onPubsubListen(id, topic);
    window.Twitch.ext.listen(topic, cb);
    if (topic === 'broadcast') {
      window.Twitch.ext.listen('global', cb);
    }

    return {
      cb,
      target: topic
    };
  }
  /* eslint-enable class-methods-use-this */

  /**
   * unlisten will unregister a listening callback.
   * @param id the extension id or app id of the app thats sending the message.
   * @param h the handle returned from listen
   */
  /* eslint-disable class-methods-use-this */
  public unlisten(id, h: CallbackHandle) {
    window.Twitch.ext.unlisten(h.target, h.cb);
  }
  /* eslint-enable class-methods-use-this */

  public close() {
    /* Nothing to close on Twitch */
  }
}

// PusherMessenger adheres to the 'messenger' interface, but uses https://pusher.com
// as a pubsub notification provider.
class PusherMessenger implements Messenger {
  public channelID: string;
  public extensionID: string;
  public debug: DebugOptions;

  public client: Pusher.Pusher;
  public channel: Pusher.Channel;
  public globalChannel: Pusher.Channel;

  constructor(debug: DebugOptions) {
    // @ts-ignore
    this.client = new Pusher('18c26c0d1c7fafb78ba2', {
      cluster: 'us2',
      encrypted: true
    });

    this.channelID = '';
    this.debug = debug;
  }

  public send(id, event, target, body, client) {
    const scopedEvent = `${CurrentEnvironment().environment}:${id}:${event}`;
    this.debug.onPubsubSend(id, event, target, body);

    client.signedRequest(
      id,
      'POST',
      'pusher_broadcast',
      JSON.stringify({
        data: body,
        event: scopedEvent,
        target,
        user_id: this.channelID
      })
    );
  }

  public listen(id, topic, callback) {
    if (!this.channel) {
      const channelName = `twitch.pubsub.${this.extensionID}.${this.channelID}`;
      const globalName = `twitch.pubsub.${this.extensionID}.all`;

      this.channel = this.client.subscribe(channelName);
      this.globalChannel = this.client.subscribe(globalName);
    }

    const cb = message => {
      try {
        const parsed = JSON.parse(message.message);

        this.debug.onPubsubReceive(id, topic, parsed);
        callback(parsed);
      } catch (err) {
        // TODO: Silent failure?
      }
    };

    this.debug.onPubsubListen(id, topic);
    this.channel.bind(topic, cb);
    this.globalChannel.bind(topic, cb);

    return {
      cb,
      target: topic
    };
  }

  public unlisten(id, h) {
    this.channel.unbind(h.target, h.cb);
    this.globalChannel.unbind(h.target, h.cb);
  }

  public close() {
    this.client.disconnect();
  }
}

// ServerMessenger implements a 'messenger' that is broadcast-only. It cannot
// listen for messages, but is able to send with a backend-signed JWT.
class ServerMessenger implements Messenger {
  public channelID: string;
  public extensionID: string;
  public debug: DebugOptions;

  constructor(debug: DebugOptions, ch?) {
    this.channelID = ch;
    this.debug = debug;
  }

  public send(id, event, target, body, client) {
    this.debug.onPubsubSend(id, event, target, body);

    client.signedRequest(
      id,
      'POST',
      'broadcast',
      JSON.stringify({
        data: body,
        event,
        target,
        user_id: this.channelID
      })
    );
  }

  /* tslint:disable:no-console */
  public listen(id, topic, callback): CallbackHandle {
    console.error('Server-side message receiving is not implemented.');

    return {
      cb: () => {
        /* Not Implemented */
      },
      target: ''
    };
  }

  public unlisten(id, handle: CallbackHandle): void {
    console.error('Server-side message receiving is not implemented.');
  }
  /* tslint:enable:no-console */

  public close() {
    /* Nothing to close server-side. */
  }
}

export default function DefaultMessenger(debug: DebugOptions): Messenger {
  switch (CurrentEnvironment()) {
    case ENVIRONMENTS.SANDBOX_DEV:
    case ENVIRONMENTS.ADMIN: // Currently unable to hook into the twitch pubsub system from admin
    case ENVIRONMENTS.SANDBOX_ADMIN:
      return new PusherMessenger(debug);
    case ENVIRONMENTS.SANDBOX_TWITCH:
    case ENVIRONMENTS.PRODUCTION:
      return new TwitchMessenger(debug);
    case ENVIRONMENTS.SERVER:
      return new ServerMessenger(debug);
    default:
      throw new Error('Could not determine execution environment.');
  }
}

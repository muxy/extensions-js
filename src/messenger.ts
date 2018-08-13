/* globals Twitch */
import { ENVIRONMENTS, CurrentEnvironment } from './util';
import { DebugOptions } from './debug';
import * as Pusher from 'pusher-js';

// CallbackHandle is what is returned from a call to listen from the Messenger, and should be
// passed to unlisten.
export class CallbackHandle {
  target: string;
  cb: (t: any, datatype: string, message: string) => void;
}

export interface IMessenger {
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
class TwitchMessenger implements IMessenger {
  channelID: string;
  extensionID: string;
  debug: DebugOptions;

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
  send(id, event, target, body) {
    const data = body || {};

    this.debug.onPubsubSend(id, event, target, body);
    window.Twitch.ext.send(target, 'application/json', {
      event: `${CurrentEnvironment().environment}:${id}:${event}`,
      data
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
  listen(id, topic: string, callback): CallbackHandle {
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

    return {
      target: topic,
      cb
    };
  }
  /* eslint-enable class-methods-use-this */

  /**
   * unlisten will unregister a listening callback.
   * @param id the extension id or app id of the app thats sending the message.
   * @param h the handle returned from listen
   */
  /* eslint-disable class-methods-use-this */
  unlisten(id, h: CallbackHandle) {
    window.Twitch.ext.unlisten(h.target, h.cb);
  }
  /* eslint-enable class-methods-use-this */

  close() {}
}

// PusherMessenger adheres to the 'messenger' interface, but uses https://pusher.com
// as a pubsub notification provider.
class PusherMessenger implements IMessenger {
  channelID: string;
  extensionID: string;
  debug: DebugOptions;

  client: Pusher.Pusher;
  channel: Pusher.Channel;

  constructor(debug: DebugOptions) {
    this.client = new Pusher('18c26c0d1c7fafb78ba2', {
      cluster: 'us2',
      encrypted: true
    });

    this.channelID = '';
    this.debug = debug;
  }

  send(id, event, target, body, client) {
    const scopedEvent = `${CurrentEnvironment().environment}:${id}:${event}`;
    this.debug.onPubsubSend(id, event, target, body);

    client.signedRequest(
      id,
      'POST',
      'pusher_broadcast',
      JSON.stringify({
        target,
        event: scopedEvent,
        user_id: this.channelID,
        data: body
      })
    );
  }

  listen(id, topic, callback) {
    if (!this.channel) {
      const channelName = `twitch.pubsub.${this.extensionID}.${this.channelID}`;
      this.channel = this.client.subscribe(channelName);
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

    return {
      target: topic,
      cb
    };
  }

  unlisten(id, h) {
    this.channel.unbind(h.target, h.cb);
  }

  close() {
    this.client.disconnect();
  }
}

// ServerMessenger implements a 'messenger' that is broadcast-only. It cannot
// listen for messages, but is able to send with a backend-signed JWT.
class ServerMessenger implements IMessenger {
  channelID: string;
  extensionID: string;
  debug: DebugOptions;

  constructor(debug: DebugOptions, ch?) {
    this.channelID = ch;
    this.debug = debug;
  }

  send(id, event, target, body, client) {
    this.debug.onPubsubSend(id, event, target, body);

    client.signedRequest(
      id,
      'POST',
      'broadcast',
      JSON.stringify({
        target,
        event,
        user_id: this.channelID,
        data: body
      })
    );
  }

  /* eslint-disable class-methods-use-this,no-console */
  listen(id, topic, callback): CallbackHandle {
    console.error('Server-side message receiving is not implemented.');

    return {
      target: '',
      cb: () => {}
    };
  }

  unlisten(id, handle: CallbackHandle): void {
    console.error('Server-side message receiving is not implemented.');
  }
  /* eslint-enable class-methods-use-this,no-console */

  close() {}
}

export default function Messenger(debug: DebugOptions): IMessenger {
  switch (CurrentEnvironment()) {
    case ENVIRONMENTS.SANDBOX_DEV:
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

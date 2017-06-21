/* globals Twitch */
import Pusher from 'pusher-js';

// Messenger is a convenience wrapper for dispatching and listening for events.
class Messenger {
  // broadcast sends JSON data to all viewers listening for `event`.
  static broadcast(event, send) {
    const data = send || {};
    if (window.Twitch) {
      Twitch.ext.send('broadcast', 'application/json', {
        event, data
      });
    } else {
      // TODO: send data to muxy test pub/sub
    }
  }

  // listen sets up a callback for a given `event`. If `inUserID` is specified,
  // `inCallback` is only called in response to whispers of type `event` to
  // that opaque user id. Returns a handler object that can be used to remove
  // the callback later.
  static listen(inEvent, inUserID, inCallback) {
    const event = inEvent;
    const userID = inUserID;

    let l = 'broadcast';
    let callback = inCallback;
    if (callback) {
      l = `whisper-${userID}`;
    } else {
      callback = inUserID;
    }

    const cb = (topic, contentType, message) => {
      try {
        const parsed = JSON.parse(message);
        if (parsed.event === event) {
          callback(parsed.data);
        }
      } catch (err) {
        // TODO: Should this fail silently?
      }
    };

    if (window.Twitch) {
      Twitch.ext.listen(l, cb);
    } else {
      // TODO: listen to muxy test pub/sub
    }
    return {
      target: l,
      cb
    };
  }

  // unlisten removes the provided handler from the event listener system.
  static unlisten(h) {
    if (window.Twitch) {
      Twitch.ext.unlisten(h.target, h.cb);
    } else {
      // TODO: unsub from muxy test pub/sub
    }
  }
}

class TwitchMessenger {
  constructor() {
    this.channelID = '';
  }

  static broadcast(id, event, send) {
    const data = send || {};
    Twitch.ext.send('broadcast', 'application/json', {
      event, data
    });
  }

  static listen(id, topic, callback) {
    const cb = (t, datatype, message) => {
      try {
        const parsed = JSON.parse(message);
        callback(parsed);
      } catch (err) {
        // TODO: Silent failure?
      }
    };

    Twitch.ext.listen(topic, cb);

    return {
      target: topic,
      cb
    };
  }

  static unlisten(id, h) {
    Twitch.ext.unlisten(h.target, h.cb);
  }
}

class PusherMessenger {
  constructor(ch, muxy) {
    this.client = new Pusher('18c26c0d1c7fafb78ba2', {
      cluster: 'us2',
      encrypted: true
    });

    this.muxy = muxy;
    this.channelID = '';
  }

  broadcast(id, event, send, client) {
    client.pusherBroadcast(id, event, this.channelID, send);
  }

  listen(id, topic, callback) {
    if (!this.channel) {
      const channelName = `twitch.pubsub.${this.extensionID}.${this.channelID}`;
      this.channel = this.client.subscribe(channelName);
    }

    const cb = (message) => {
      try {
        const parsed = JSON.parse(message.message);
        callback(parsed);
      } catch (err) {
        // TODO: Silent failure?
      }
    };

    this.channel.bind(topic, cb);

    return {
      target: topic,
      cb
    };
  }

  unlisten(id, h) {
    this.channel.unbind(h.target, h.cb);
  }
}

export function createMessenger() {
  if (window.Twitch) {
    return new TwitchMessenger();
  }

  return new PusherMessenger();
}

export default Messenger;

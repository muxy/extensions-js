/* globals Twitch */

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

export default Messenger;

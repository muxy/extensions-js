# Sending Events

In addition to the automated messages sent in response to POSTing data to the `json_store`
endpoint, you can send any custom messages to the viewers. This can be done from your own server
or from the broadcaster-facing pages. Individual viewers may not, however, send arbitrary messages
to other viewers.

To listen for incoming messages, simply call the listen function on the Muxy SDK object:

```javascript
const awesomeHandler = sdk.listen('increase_awesomeness', (data) => {
  this.awesomeness += data.level;
});
```

Events can also be sent to individual viewers only. To listen for events sent only to the current
viewer, simply send their opaque id as the second parameter:

```javascript
sdk.listen('increase_awesomeness', opaqueID, (data) => {
  this.viewerAwesomeness += data.level;
});
```

And then from the broadcaster live or config page:

```javascript
sdk.send('increase_awesomeness', {
  level: 11
});
```

Or to send a message to a single viewer (whose opaque ID you know):

```javascript
sdk.send('increase_awesomeness', opaqueID, {
  level: 11
});
```

If you are done with an event listener and no longer wish to receive events:

```javascript
sdk.unlisten(awesomeHandler);
```
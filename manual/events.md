# Sending Events

In addition to the automated messages sent in response to POSTing data to the `json_store`
endpoint, you can send any custom messages to the viewers. This can be done from your own server
or from the broadcaster-facing pages. Individual viewers may not, however, send arbitrary messages
to other viewers.

The Muxy API backend will attempt to compress messages larger than 4KB with zlib. This allows
for messages significantly larger than 4KB. This compression is transparent to the .listen() api.
When using the lower-level (Twitch, Pusher) APIs to listen for compressed
messages, compressed messages can be distinguished by the non-existence of a JSON object token
at the start of the message - either '{' or '['.

Compressed messages are zlib compressed and then base64 encoded.

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
# Muxy Extension JavaScript Library

The Muxy Extensions JS library provides easy access to Muxy's powerful backend architecture.

The extension provides four main sections of functionality: Data Storage, an Event Manager, a Twitch Client and a Google Analytics system.

## Change Log
 - [Change Log](CHANGELOG.md)

## Building

To build a production release of the library, simply run:

```sh
npm install
npm run build
```

in this directory. The complete library will be built and both minified and full versions will be placed in the `dist/` folder.

- `dist/muxy-extensions-sdk.js`
- `dist/muxy-extensions-sdk.min.js`

## Using the library

### Creating a Client

Including the muxy-extensions-sdk library (either by directly importing or loading off Muxy's CDN) will create a global window.Muxy object that handles all interactions with the extension backend system.

```html
<script src="//ext-cdn.muxy.io/muxy-extensions-sdk/latest/muxy-extensions-sdk.js"></script>
```

Pass any configuration needed into the setup function on the Global SDK object. Then you can create a new SDK object.
This returns a promise that resolves when the SDK has finished initializing.

```javascript
Muxy.setup({ extensionID: config.extension_id });
const sdk = new Muxy.SDK();

sdk.loaded().then(() => {
  const twitchClient = new Muxy.TwitchClient();
});

```

### Authentication

When the Muxy Extensions SDK is created, it uses the provided extension id to authenticate the viewer with Muxy's backend. A valid authentication will be stored and used internally by the sdk for all future requests. The authentication expires every 30 minutes, but the sdk will automatically refresh the internal token and the process should be invisible to your application.

### Data Storage

If you have an existing server that you would like to integrate with your app, Muxy provides a simple JSON storage and retrieval system. This works similarly to a standard key/value store, with the limitation that the value must be a valid JSON object. The amount of data that can be stored is currently limited to 2KB per-developer.

To push data to the store, simply send a POST request to the json_store endpoint:

```sh
curl -X POST
 -H "Content-Type: application/json"
 -H 'Authorization: "<extension id> <jwt>"'
 -d '{ "potato": "russet", "awesomeness": 11 }'
 https://api.muxy.io/v1/e/json_store?id=awesome_server_action
```

Where the json data payload may be any JSON blob and the id is any valid string of alphanumeric characters and underscores.

The data you POST to this endpoint will be stored indefinitely, keyed on your app id and provided identifier. The current stored data may be retrieved at any time by calling:

```javascript
const data = sdk.getJSONStore('awesome_server_action');
console.log(data.awesomeness);
```

In addition to retrieving the data at any time, Muxy will broadcast an event to all viewers currently using your app when new data is POSTed to the endpoint. You may listen for specific storage events similar to how vote update events are handled:

```javascript
sdk.listen('json_store_update:awesome_server_action', (data) => {
  console.log(data.awesomeness);
});
```

If you are posting json data to several different keys and would like to listen for all JSON store updates, you can use * to reference all update events:

```javascript
sdk.listen('json_store_update:*', (data) => {
  if (data.potato === 'russet') {
    console.log(data.awesomeness);
  }
});
```

### Event Manager

In addition to the automated messages sent in response to POSTing data to the json_store endpoint, you can send any custom messages to the viewers. This can be done from your own server or from the broadcaster-facing pages. Individual viewers may not, however, send arbitrary messages to other viewers.

To listen for incoming messages, simply call the listen function on the Muxy SDK object:

```javascript
const awesomeHandler = sdk.listen('increase_awesomeness', (data) => {
  this.awesomeness += data.level;
});
```

Events can also be sent to individual viewers only. To listen for events sent only to the current viewer, simply send their opaque id as the second parameter:

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


### Twitch Client

We provide a convenience wrapper around certain common Twitch functionality.

```javascript
twitchClient.getTwitchUsers(['giantwaffle', 'sevadus']).then((data) => {
 data.users.forEach((user) => {
   console.log(`${user.display_name} looks like this:`)
   console.log(user.logo);
 });
}).catch((err) => {
 console.error('Could not look up user info on Twitch: ' + err);
});
```

### Analytics

You can send events to the backend which will be stored in Google Analytics as
user actions.

```javascript
sdk.sendAnalyticsEvent('user-action');
```

# Muxy Extension JavaScript Library

The Muxy Extensions JS library provides easy access to Muxy's powerful backend architecture.

The extension provides four main sections of functionality: Data Storage, an Event Manager, a Twitch Client and a Google Analytics system.

See also:

[Overlay App Rig](https://github.com/muxy/overlay-app-rig)

[Muxy Extensions Rig](https://github.com/muxy/extensions-rig)

## Change Log
 - [Change Log](CHANGELOG.md)

## Hosted Versions

Muxy hosts specific versions and latest releases at https://ext-cdn.muxy.io/muxy-extensions-js.

Tagged releases (starting with 1.0.0) can be found at
https://ext-cdn.muxy.io/muxy-extensions-js/1.0.0/muxy-extensions.js or pre-minified at
https://ext-cdn.muxy.io/muxy-extensions-js/1.0.0/muxy-extensions.min.js

The latest production release can always be accessed at
https://ext-cdn.muxy.io/muxy-extensions-js/latest/muxy-extensions.js or pre-minified at
https://ext-cdn.muxy.io/muxy-extensions-js/latest/muxy-extensions.min.js

## Building

To build a production release of the library, simply run:

```sh
npm install
npm run build
```

in this directory. The complete library will be built and both minified and full versions will be placed in the `dist/` folder.

- `dist/muxy-extensions.js`
- `dist/muxy-extensions.min.js`

## Running tests

To run the full suite of tests, run:

```sh
npm run test
```

This will fully compile the SDK and execute all unit tests, printing the results to the console.
Note that this can take several minutes to execute, especially the first time.

## Building documentation

The SDK documentation can be build locally by running:

```sh
npm run docs
```

This will generate a full suite of HTML-formatted documentation in the `dist/docs/` directory. The main
entry to the docs is at `dist/docs/index.html`

## Using the library

### Managing Twitch Extension Secrets

Before you can use the Muxy Extension SDK you will have to create a new extension on
[https://dev.twitch.tv](https://dev.twitch.tv).

Once you have done that take the Client ID from Overview and Secret from the Settings section and submit them to
[https://u.muxy.io/dashboard/developers](https://u.muxy.io/dashboard/developers).

This will allow the automatic sandbox credentials to work for your extension.

### Creating a Client

Including the muxy-extensions-sdk library (either by directly importing or loading off Muxy's CDN)
will create a global window.Muxy object that handles all interactions with the extension
backend system.

```html
<script src="//ext-cdn.muxy.io/muxy-extensions-js/latest/muxy-extensions.min.js"></script>
```

Pass any configuration needed into the setup function on the global `Muxy` object. Then you can
create a new instance of the SDK. This returns a promise that resolves when the SDK has
finished initializing.

```javascript
Muxy.setup({ extensionID: <your extension id from Twitch> });
const sdk = new Muxy.SDK();

sdk.loaded().then(() => {
  sdk.vote('poll-1', 1);
});
```

#### Sandbox environment settings

When running outside of Twitch the SDK will automatically use the sandbox environment.

There are a few options that can be set to make the SDK grab simulated credentials for the sandbox outside
of Twitch. These need to be set before calling Muxy.setup();

```javascript
Muxy.testJWTRole = 'broadcaster'; // 'viewer' or 'broadcaster'
Muxy.testChannelID = '126955211'; // A string representing the ID of the Twitch channel
                                  // this extension will be simulated running on.

Muxy.setup({ extensionID: <your extension id from Twitch> });
const sdk = new Muxy.SDK();
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
sdk.getJSONStore('awesome_server_action').then((resp) => {
  console.log(resp.awesomeness);
});
```

The response will be a json object with your values:
```
{
  "potato": "russet",
  "awesomeness": 11
}
```

In addition to retrieving the data at any time, Muxy will broadcast an event to all viewers currently using your app when new data is POSTed to the endpoint. You may listen for specific storage events similar to how vote update events are handled:

```javascript
sdk.listen('json_store_update:awesome_server_action', (data) => {
  console.log(data.value.awesomeness);
});
```

The response includes the event id and value:
```
{
  "id": "awesome_server_action",
  "value": {
    "potato": "russet",
    "awesomeness": 11
  }
}
```

If you are posting json data to several different keys and would like to listen for all JSON store updates, you can use * to reference all update events:

```javascript
sdk.listen('json_store_update:*', (data) => {
  if (data.id === 'awesome_server_action') {
    console.log(data.value.awesomeness);
  }
});
```

The response includes the event id and value:
```
{
  "id": "awesome_server_action",
  "value": {
    "potato": "russet",
    "awesomeness": 11
  }
}
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
const twitchClient = new Muxy.TwitchClient();

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

If you provide a Google Analytics UA identifier in the `setup` call, you can send events to the
backend which will be stored in Google Analytics as user actions.

```javascript
Muxy.setup({
  extensionID: <your extension id from Twitch>,
  uaString: <your google analytics UA string>
});

const sdk = new Muxy.SDK();
sdk.loaded().then(() => {
  sdk.sendAnalyticsEvent('user-action');
});
```

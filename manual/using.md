# Using the Client

Including the muxy-extensions-sdk library (either by directly importing or loading off Muxy's CDN)
will create a global window.Muxy object that handles all interactions with the extension
backend system.

```html
<script src="//ext-cdn.muxy.io/muxy-extensions-js/latest/muxy-extensions.min.js"></script>
```

Or by installing from npm:

```
npm i -S @muxy/extensions-js

import Muxy from '@muxy/extensions-js';
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

## Development

When running outside of Twitch the SDK will automatically use the sandbox environment.

There are a few options that can be set to make the SDK grab simulated credentials for the sandbox
outside of Twitch. These need to be set before calling Muxy.setup();

```javascript
Muxy.testJWTRole = 'broadcaster'; // 'viewer' or 'broadcaster'
Muxy.testChannelID = '126955211'; // A string representing the ID of the Twitch channel
                                  // this extension will be simulated running on.

Muxy.setup({ extensionID: <your extension id from Twitch> });
const sdk = new Muxy.SDK();
```

## Production

Twitch does not allow loading Javascript files off an external CDN, so you will have to bundle
the library with your extension before uploading it to Twitch. This can be as simple as
downloading the production version of the library and including it in your extension source, or
using [npm](https://www.npmjs.com/package/@muxy/extensions-js) to manage it for you.


## Viewer Authentication

When the Muxy Extensions SDK is created, it uses the provided extension id to authenticate the
viewer with Muxy's backend. A valid authentication will be stored and used internally by the sdk
for all future requests. The authentication expires every 30 minutes, but the sdk will
automatically refresh the internal token and the process should be invisible to your application.

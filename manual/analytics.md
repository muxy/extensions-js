# Analytics

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

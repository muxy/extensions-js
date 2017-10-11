# Twitch Client

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
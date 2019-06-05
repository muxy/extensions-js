# Storing Data

## Games

TODO: Games can send data to Muxy and extensions similarly to how servers work. This is not yet
documented.

## Servers

If you have an existing server or game that you would like to integrate with your app, Muxy provides
a simple JSON storage and retrieval system. This works similarly to a standard key/value store, with
the only limitation that the value must be a valid JSON object. The amount of data that can be
stored is currently limited to 4KB per-developer.

The Muxy API backend will attempt to compress messages larger than 4KB with zlib. This allows
for JSON store update messages significantly larger than 4KB. This compression is transparent
to the .listen() api. When using the lower-level (Twitch, Pusher) APIs to listen for compressed
messages, compressed messages can be distinguished by the non-existence of a JSON object token
at the start of the message - either '{' or '['.

Compressed messages are zlib compressed and then base64 encoded.

To push data to the store, simply send a POST request to the json_store endpoint:

```sh
curl -X POST
 -H "Content-Type: application/json"
 -H 'Authorization: "<extension id> <jwt>"'
 -d '{ "potato": "russet", "awesomeness": 11 }'
 https://api.muxy.io/v1/e/json_store?id=awesome_server_action
```

Where the json data payload may be any JSON blob and the id is any valid string of alphanumeric
characters and underscores.

The data you POST to this endpoint will be stored indefinitely, keyed on your app id and provided
identifier. The current stored data may be retrieved at any time by calling:

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

## Broadcasters and Viewers

In addition to retrieving the data at any time, Muxy will broadcast an event to all viewers
currently using your app when new data is POSTed to the endpoint. You may listen for specific
storage events similar to how vote update events are handled:

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

If you are posting json data to several different keys and would like to listen for all JSON store
updates, you can use * to reference all update events:

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

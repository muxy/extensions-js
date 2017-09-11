import XMLHttpRequestPromise from '../libs/xhr-promise';

export default class TwitchClient {
  constructor(extid) {
    this.extensionId = extid;
    this.promise = Promise.resolve();
  }

  // loaded returns a promise which will resolve once the TwitchClient is
  // available for use.
  loaded() {
    return this.promise;
  }

  // signedTwitchRequests wraps an AJAX request to Twitch's kraken API.
  signedTwitchRequest(method, endpoint, data) {
    return new Promise((resolve, reject) => {
      const xhrPromise = new XMLHttpRequestPromise();
      return xhrPromise
        .send({
          method,
          url: `https://api.twitch.tv/kraken/${endpoint}`,
          headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            'Client-ID': this.extensionId
          },
          data
        })
        .catch(reject)
        .then((resp) => {
          if (resp.status < 400) {
            resolve(resp.responseText);
          }

          reject(resp.responseText);
        });
    });
  }

  getTwitchUsers = (users) => {
    if (users.length === 0) {
      return Promise.resolve([]);
    }

    return this.signedTwitchRequest('GET', `users?login=${users.join(',')}`);
  }
}

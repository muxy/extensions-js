import XMLHttpRequestPromise from 'xhr-promise';

import { errorPromise, parseJSONObject } from './util';

const API_URL = 'https://api.muxy.io';
const TESTING_URL = 'https://vx1jst8yv1.execute-api.us-west-2.amazonaws.com/testing';

let SERVER_URL = API_URL;

// ServerState enum maps the subsets of state persisted to the server to
// their respective endpoints.
const ServerState = {
  AUTHENTICATION: 'authentication',
  USER: 'user_info',
  VIEWER: 'viewer_state',
  CHANNEL: 'channel_state',
  EXTENSION: 'extension_state',
  ALL: 'all_state'
};

// Client wraps all state requests (GET/POST) to the extension backend service.
class Client {
  constructor(extID, token, twitchID) {
    this.extensionID = extID;
    this.token = token;
    this.twitchID = twitchID;
  }

  static fetchTestAuth(testAppID, channelID) {
    return new Promise((resolve, reject) => {
      const xhrPromise = new XMLHttpRequestPromise();
      xhrPromise
        .send({
          method: 'POST',
          url: `${TESTING_URL}/v1/e/authtoken`,
          processData: false,
          data: JSON.stringify({
            app_id: testAppID,
            channel_id: channelID
          })
        })
        .catch(() => {
          reject();
        })
        .then((resp) => {
          if (resp.status < 400) {
            // Update the API Server variable to point to test
            SERVER_URL = TESTING_URL;

            const auth = parseJSONObject(resp.responseText);
            // twitch uses lowercase d
            auth.channelId = channelID;
            auth.userId = 'T12345678';
            resolve(auth);
          }
          else {
            reject();
          }
        });
    });
  }

  updateAuth(token) {
    this.token = token;
  }

  // signedRequest checks that we have a valid JWT and wraps a standard AJAX
  // request to the EBS with valid auth credentials.s
  signedRequest(method, endpoint, data) {
    if (!this.validateJWT()) {
      return errorPromise('Your authentication token has expired.');
    }

    return new Promise((resolve, reject) => {
      const xhrPromise = new XMLHttpRequestPromise();
      xhrPromise
        .send({
          method,
          url: `${SERVER_URL}/v1/e/${endpoint}`,
          headers: {
            'X-Muxy-GDI-AWS': `${this.extensionID} ${this.token}`
          },
          processData: false,
          data
        })
        .catch(() => {
          reject();
        })
        .then((resp) => {
          if (resp.status < 400) {
            resolve(parseJSONObject(resp.responseText));
          }
          else {
            reject(resp.responseText);
          }
        });
    });
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
            'Client-ID': this.extensionID
          },
          data
        })
        .catch(() => {
          reject();
        })
        .then((resp) => {
          if (resp.status < 400) {
            resolve(parseJSONObject(resp.responseText));
          }

          reject(resp.responseText);
        });
    });
  }

  // validateJWT ensures that the current JWT is valid and not expired.
  validateJWT() {
    try {
      const splitToken = this.token.split('.');
      if (splitToken.length !== 3) {
        return false;
      }

      const tk = JSON.parse(window.atob(splitToken[1]));
      if (!tk.exp) {
        return false;
      }

      const now = new Date().valueOf();
      if (tk.exp < now / 1000) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  // getState requests a subset of state stored on the server and sets the
  // local cached version of the state to the response.
  getState = substate => this.signedRequest('GET', substate || ServerState.ALL)

  // postState sends data to the corrent EBS substate endpoint for persistence.
  postState = (substate, data) => this.signedRequest('POST', substate || ServerState.ALL, data)

  getUserInfo = () => this.getState(ServerState.USER)
  getViewerState = () => this.getState(ServerState.VIEWER)
  getChannelState = () => this.getState(ServerState.CHANNEL)
  getExtensionState = () => this.getState(ServerState.EXTENSION)

  setViewerState = state => this.postState(ServerState.VIEWER, JSON.stringify(state))
  setChannelState = state => this.postState(ServerState.CHANNEL, JSON.stringify(state))

  getAccumulation = (id, start) => this.signedRequest('GET', `accumulate?id=${id}&start=${start}`);
  accumulate = (id, data) => this.signedRequest('POST', `accumulate?id=${id}`, JSON.stringify(data));

  vote = (id, data) => this.signedRequest('POST', `voting?id=${id}`, JSON.stringify(data));
  getVotes = id => this.signedRequest('GET', `voting?id=${id}`);

  rank = data => this.signedRequest('POST', 'rank', JSON.stringify(data));
  getRank = () => this.signedRequest('GET', 'rank');
  deleteRank = () => this.signedRequest('DELETE', 'rank');
}

export default Client;

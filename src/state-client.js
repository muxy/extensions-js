import base64 from 'base-64';
import XMLHttpRequestPromise from 'xhr-promise';

import { errorPromise } from './util';

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
  static fetchTestAuth(testAppID, channelID) {
    return new Promise((resolve, reject) => {
      const xhrPromise = new XMLHttpRequestPromise();
      xhrPromise
        .send({
          method: 'POST',
          url: `${TESTING_URL}/v1/e/authtoken`,
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

            const auth = resp.responseText;
            // twitch uses lowercase d
            auth.channelId = channelID;
            auth.userId = 'T12345678';
            resolve(auth);
          } else {
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
  signedRequest(extensionID, method, endpoint, data) {
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
            Authorization: `${extensionID} ${this.token}`
          },
          data
        })
        .catch(() => {
          reject();
        })
        .then((resp) => {
          if (resp.status < 400) {
            resolve(resp.responseText);
          } else if (resp.responseText) {
            reject(resp.responseText);
          } else {
            reject(`Server returned status ${resp.status}`);
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
            resolve(resp.responseText);
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

      const tk = JSON.parse(base64.decode(splitToken[1]));
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
  getState = (extensionID, substate) => this.signedRequest(extensionID, 'GET', substate || ServerState.ALL)

  // postState sends data to the corrent EBS substate endpoint for persistence.
  postState = (extensionID, substate, data) => this.signedRequest(extensionID, 'POST', substate || ServerState.ALL, data)

  getUserInfo = extensionID => this.getState(extensionID, ServerState.USER)
  getViewerState = extensionID => this.getState(extensionID, ServerState.VIEWER)
  getChannelState = extensionID => this.getState(extensionID, ServerState.CHANNEL)
  getExtensionState = extensionID => this.getState(extensionID, ServerState.EXTENSION)

  setViewerState = (extensionID, state) => this.postState(extensionID,
                                                  ServerState.VIEWER, JSON.stringify(state))
  setChannelState = (extensionID, state) => this.postState(extensionID,
                                                  ServerState.CHANNEL, JSON.stringify(state))

  getAccumulation = (extensionID, id, start) => this.signedRequest(extensionID, 'GET', `accumulate?id=${id}&start=${start}`);
  accumulate = (extensionID, id, data) => this.signedRequest(extensionID, 'POST', `accumulate?id=${id}`, JSON.stringify(data));

  vote = (extensionID, id, data) => this.signedRequest(extensionID, 'POST', `voting?id=${id}`, JSON.stringify(data));
  getVotes = (extensionID, id) => this.signedRequest(extensionID, 'GET', `voting?id=${id}`);

  rank = (extensionID, data) => this.signedRequest(extensionID, 'POST', 'rank', JSON.stringify(data));
  getRank = extensionID => this.signedRequest(extensionID, 'GET', 'rank');
  deleteRank = extensionID => this.signedRequest(extensionID, 'DELETE', 'rank');
}

export default Client;

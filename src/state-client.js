import base64 from 'base-64';
import XMLHttpRequestPromise from 'xhr-promise';

import { ENVIRONMENTS, errorPromise } from './util';

const API_URL = 'https://api.muxy.io';
const STAGING_URL = 'https://vx1jst8yv1.execute-api.us-west-2.amazonaws.com/staging';
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
  static fetchTestAuth(testAppID, channelID, role) {
    return new Promise((resolve, reject) => {
      const xhrPromise = new XMLHttpRequestPromise();
      xhrPromise
        .send({
          method: 'POST',
          url: `${TESTING_URL}/v1/e/authtoken`,
          data: JSON.stringify({
            app_id: testAppID,
            channel_id: channelID,
            role
          })
        })
        .catch(reject)
        .then((resp) => {
          if (resp && resp.status < 400) {
            // Update the API Server variable to point to test
            SERVER_URL = TESTING_URL;

            const auth = resp.responseText;
            // twitch uses lowercase d
            auth.clientId = 'ka3y28rrgh2f533mxt9ml37fv6zb8k';
            auth.channelId = channelID;
            auth.userId = 'T12345678';
            resolve(auth);
          } else {
            reject();
          }
        });
    });
  }

  static setEnvironment(env) {
    if (env === ENVIRONMENTS.DEV || env === ENVIRONMENTS.TESTING) {
      SERVER_URL = TESTING_URL;
    } else if (env === ENVIRONMENTS.STAGING) {
      SERVER_URL = STAGING_URL;
    }
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
        .catch(reject)
        .then((resp) => {
          try {
            if (resp.status < 400) {
              resolve(resp.responseText);
            } else if (resp.responseText) {
              reject(resp.responseText);
            } else {
              reject(`Server returned status ${resp.status}`);
            }
          } catch (err) {
            reject(err);
          }
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
  getState = (identifier, substate) => this.signedRequest(identifier, 'GET', substate || ServerState.ALL)

  // postState sends data to the corrent EBS substate endpoint for persistence.
  postState = (identifier, substate, data) => this.signedRequest(identifier, 'POST', substate || ServerState.ALL, data)

  getUserInfo = identifier => this.getState(identifier, ServerState.USER)
  getViewerState = identifier => this.getState(identifier, ServerState.VIEWER)
  getChannelState = identifier => this.getState(identifier, ServerState.CHANNEL)
  getExtensionState = identifier => this.getState(identifier, ServerState.EXTENSION)

  setViewerState = (identifier, state) => this.postState(identifier,
                                                  ServerState.VIEWER, JSON.stringify(state))
  setChannelState = (identifier, state) => this.postState(identifier,
                                                  ServerState.CHANNEL, JSON.stringify(state))

  getAccumulation = (identifier, id, start) => this.signedRequest(identifier, 'GET', `accumulate?id=${id}&start=${start}`)
  accumulate = (identifier, id, data) => this.signedRequest(identifier, 'POST', `accumulate?id=${id}`, JSON.stringify(data))

  vote = (identifier, id, data) => this.signedRequest(identifier, 'POST', `voting?id=${id}`, JSON.stringify(data))
  getVotes = (identifier, id) => this.signedRequest(identifier, 'GET', `voting?id=${id}`)

  rank = (identifier, data) => this.signedRequest(identifier, 'POST', 'rank', JSON.stringify(data))
  getRank = identifier => this.signedRequest(identifier, 'GET', 'rank')
  deleteRank = identifier => this.signedRequest(identifier, 'DELETE', 'rank')

  getJSONStore = (identifier, id) => this.signedRequest(identifier, 'GET', `json_store?id=${id}`)
}

export default Client;

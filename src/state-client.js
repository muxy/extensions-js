import _ from 'lodash';
import XMLHttpRequestPromise from 'xhr-promise';

const API_URL = 'https://api.muxy.io';

// errorPromise wraps a string error response in an (immediately rejected)
// promise
function errorPromise(err) {
    return Promise.reject(err);
}

// parseJSONObject attempts to parse all keys in obj, recursively.
function parseJSONObject(obj) {
    return _.mapValues(obj, (v) => {
        try {
            let o = JSON.parse(v);
            if (_.isObject(o)) {
                o = parseJSONObject(o);
            }
            return o;
        } catch (err) {
            return v;
        }
    });
}

// Client wraps all state requests (GET/POST) to the extension backend service.
class Client {
    constructor(extID, token, twitchID) {
        this.extensionID = extID;
        this.token = token;
        this.twitchID = twitchID;
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
            xhrPromise.send({
                method,
                url: `${API_URL}/${endpoint}`,
                headers: {
                    'X-Muxy-GDI-AWS': `${this.extensionID} ${this.token}`
                },
                processData: false,
                data
            }).catch(() => {
                reject();
            }).then((resp) => {
                if (resp.status < 400) {
                    resolve(parseJSONObject(resp.responseText));
                }

                reject(resp.responseText);
            });
        });
    }


    // signedTwitchRequests wraps an AJAX request to Twitch's kraken API.
    signedTwitchRequest(method, endpoint, data) {
        return new Promise((resolve, reject) => {
            const xhrPromise = new XMLHttpRequestPromise();
            return xhrPromise.send({
                method,
                url: `https://api.twitch.tv/kraken/${endpoint}`,
                headers: {
                    Accept: 'application/vnd.twitchtv.v5+json',
                    'Client-ID': this.extensionID
                },
                data
            }).catch(() => {
                reject();
            }).then((resp) => {
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

            const now = (new Date()).valueOf();
            if (tk.exp < now / 1000) {
                return false;
            }

            return true;
        } catch (err) {
            return false;
        }
    }

    getAccumulation = (id, start) => this.signedRequest('GET', `accumulate?id=${id}&start=${start}`)
    accumulate = (id, data) => this.signedRequest('POST', `accumulate?id=${id}`, JSON.stringify(data))

    vote = (id, data) => this.signedRequest('POST', `voting?id=${id}`, JSON.stringify(data))
    getVotes = id => this.signedRequest('GET', `voting?id=${id}`)

    rank = data => this.signedRequest('POST', 'rank', JSON.stringify(data))
    getRank = () => this.signedRequest('GET', 'rank')
    deleteRank = () => this.signedRequest('DELETE', 'rank')
}

export default Client;

import * as fs from 'fs';

const DEFAULT_CONTENT_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8';

export interface XHROptions {
  url?: string,
  method?: string
  data?: string,
  headers?: Object,
}

export interface XHRResponse {
  url: string,
  status: Number,
  statusText: string,
  responseText: Object,
  headers: Object,
  xhr: XMLHttpRequest
}

let __responseQueue: string[] = [];

export const __queueResponseMock = (response: string) => {
  __responseQueue.push(response);
};

export default class XHRPromise {
  options: XHROptions;
  xhr: XMLHttpRequest;

  constructor(options: XHROptions = {}) {
    this.options = {
      method: 'GET',
      data: null,
      headers: {}
    };
    Object.assign(this.options, options);
  }

  send() : Promise<XHRResponse> {
    const self = this;
    return new Promise((resolve, reject) => {
      if (typeof self.options.url !== 'string' || self.options.url.length === 0) {
        self.handleResponse('url', reject, null, 'URL is a required parameter');
        return;
      }

      if (self.options.data !== null && !self.options.headers['Content-Type']) {
        self.options.headers['Content-Type'] = DEFAULT_CONTENT_TYPE;
      }

      const resp = __responseQueue.pop();
      if (resp) {
        return resolve({
          url: self.options.url,
          status: 200,
          statusText: 'success',
          responseText: JSON.parse(resp),
          headers: null,
          xhr: null
        });
      }

      const url = new URL(self.options.url);
      fs.readFile(`./fixtures${url.pathname}${url.search}.json`, 'utf8', (err, data) => {
        if (err) {
          self.handleResponse('error', reject, 502, err.toString());
        } else {
          try {
            resolve({
              url: self.options.url,
              status: 200,
              statusText: 'success',
              responseText: JSON.parse(data),
              headers: null,
              xhr: null
            });
          } catch (err) {
            self.handleResponse('parse', reject, 502, err.toString());
          }
        }
      });
    });
  };

  handleResponse(reason: string, response: Function, status: Number, statusText: string) {
    return response({
      reason: reason,
      status: status,
      statusText: statusText,
      xhr: this.xhr
    });
  };
}

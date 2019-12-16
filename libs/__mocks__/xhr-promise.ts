import * as fs from 'fs';

const DEFAULT_CONTENT_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8';

export interface XHROptions {
  url?: string;
  method?: string;
  data?: string;
  headers?: object;
}

export interface XHRResponse {
  url: string;
  status: number;
  statusText: string;
  responseText: object;
  headers: object;
  xhr: XMLHttpRequest;
}

const __responseQueue: string[] = [];

export function __queueResponseMock(response: string) {
  __responseQueue.push(response);
}

export function reset() {
  __responseQueue.splice(0, __responseQueue.length);
}

export default class XHRPromise {
  public options: XHROptions;
  public xhr: XMLHttpRequest;

  constructor(options: XHROptions = {}) {
    this.options = {
      method: 'GET',
      data: null,
      headers: {}
    };
    Object.assign(this.options, options);
  }

  public send(): Promise<XHRResponse> {
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
      const search = url.search.replace('?', '/');
      fs.readFile(`./fixtures${url.pathname}${search}.json`, 'utf8', (err, data) => {
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
  }

  public handleResponse(reason: string, response: Function, status: Number, statusText: string) {
    return response({
      reason,
      status,
      statusText,
      xhr: this.xhr
    });
  }
}

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

export default class XHRPromise {
  options: XHROptions;
  xhr: XMLHttpRequest

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
      if (!XMLHttpRequest) {
        self.handleResponse('browser', reject, null, "browser doesn't support XMLHttpRequest");
        return;
      }

      if (typeof self.options.url !== 'string' || self.options.url.length === 0) {
        self.handleResponse('url', reject, null, 'URL is a required parameter');
        return;
      }

      self.xhr = new XMLHttpRequest();

      self.xhr.onload = function() {
        let responseText;
        try {
          responseText = self.getResponseText();
        } catch (_err) {
          self.handleResponse('parse', reject, null, 'invalid JSON response');
          return;
        }

        return resolve({
          url: self.getResponseURL(),
          status: self.xhr.status,
          statusText: self.xhr.statusText,
          responseText: responseText,
          headers: self.getAllResponseHeaders(),
          xhr: self.xhr
        });
      };

      self.xhr.onerror = function() {
        return self.handleResponse('error', reject);
      };
      self.xhr.ontimeout = function() {
        return self.handleResponse('timeout', reject);
      };
      self.xhr.onabort = function() {
        return self.handleResponse('abort', reject);
      };

      self.xhr.open(self.options.method, self.options.url);

      if (self.options.data !== null && !self.options.headers['Content-Type']) {
        self.options.headers['Content-Type'] = DEFAULT_CONTENT_TYPE;
      }

      const ref = self.options.headers;
      for (const header in ref) {
        const value = ref[header];
        self.xhr.setRequestHeader(header, value);
      }

      try {
        return self.xhr.send(self.options.data);
      } catch (err) {
        return self.handleResponse('send', reject, null, err.toString());
      }
    }
    );
  };

  getXHR(): XMLHttpRequest {
    return this.xhr;
  };

  // Converts response headers to map.
  getAllResponseHeaders(): Object {
    const map = {};

    if (this.xhr.readyState !== this.xhr.HEADERS_RECEIVED) {
      return map;
    }

    const headers = this.xhr.getAllResponseHeaders();
    const arr = headers.trim().split(/[\r\n]+/);

    arr.forEach(header => {
      const parts = header.split(': ');
      const h = parts.shift();
      const v = parts.join(': ');
      map[h] = v;
    });

    return map;
  };

  // Returns the XHR response, parsing as json if applicable.
  getResponseText(): string | Object {
    const type = (this.xhr.getResponseHeader('Content-Type') || '').split(';')[0];
    let text = typeof this.xhr.responseText === 'string' ? this.xhr.responseText : '';

    if (type === 'application/json' || type === 'text/javascript') {
      text = JSON.parse(`${text}`);
    }

    return text;
  };

  getResponseURL(): string {
    if (this.xhr.responseURL !== null) {
      return this.xhr.responseURL;
    }

    if (/^X-Request-URL:/m.test(this.xhr.getAllResponseHeaders())) {
      return this.xhr.getResponseHeader('X-Request-URL');
    }

    return '';
  };

  handleResponse(reason: string, response: Function, status?: Number | null, statusText?: string) {
    return response({
      reason: reason,
      status: status || this.xhr.status,
      statusText: statusText || this.xhr.statusText,
      xhr: this.xhr
    });
  };
}

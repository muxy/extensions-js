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

export default class XHRPromise {
  public options: XHROptions;
  public xhr: XMLHttpRequest;

  constructor(options: XHROptions = {}) {
    this.options = {
      headers: {},
      method: 'GET'
    };

    Object.assign(this.options, options);
  }

  public send(): Promise<XHRResponse> {
    return new Promise((resolve, reject) => {
      if (!XMLHttpRequest) {
        this.handleResponse(
          'browser',
          reject,
          null,
          "browser doesn't support XMLHttpRequest"
        );
        return;
      }

      if (
        typeof this.options.url !== 'string' ||
        this.options.url.length === 0
      ) {
        this.handleResponse('url', reject, null, 'URL is a required parameter');
        return;
      }

      this.xhr = new XMLHttpRequest();

      this.xhr.onload = () => {
        let responseText;
        try {
          responseText = this.getResponseText();
        } catch (err) {
          this.handleResponse('parse', reject, null, 'invalid JSON response');
          return;
        }

        return resolve({
          headers: this.getAllResponseHeaders(),
          responseText,
          status: this.xhr.status,
          statusText: this.xhr.statusText,
          url: this.getResponseURL(),
          xhr: this.xhr
        });
      };

      this.xhr.onerror = () => {
        return this.handleResponse('error', reject);
      };
      this.xhr.ontimeout = () => {
        return this.handleResponse('timeout', reject);
      };
      this.xhr.onabort = () => {
        return this.handleResponse('abort', reject);
      };

      this.xhr.open(this.options.method, this.options.url);

      if (this.options.data && !this.options.headers['Content-Type']) {
        this.options.headers['Content-Type'] = DEFAULT_CONTENT_TYPE;
      }

      const ref = this.options.headers;
      for (const header in ref) {
        if (ref.hasOwnProperty(header)) {
          const value = ref[header];
          this.xhr.setRequestHeader(header, value);
        }
      }

      try {
        return this.xhr.send(this.options.data);
      } catch (err) {
        return this.handleResponse('send', reject, null, err.toString());
      }
    });
  }

  public getXHR(): XMLHttpRequest {
    return this.xhr;
  }

  // Converts response headers to map.
  public getAllResponseHeaders(): object {
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
  }

  // Returns the XHR response, parsing as json if applicable.
  public getResponseText(): string | object {
    const type = (this.xhr.getResponseHeader('Content-Type') || '').split(
      ';'
    )[0];
    let text =
      typeof this.xhr.responseText === 'string' ? this.xhr.responseText : '';

    if (type === 'application/json' || type === 'text/javascript') {
      text = JSON.parse(`${text}`);
    }

    return text;
  }

  public getResponseURL(): string {
    if (this.xhr.responseURL !== null) {
      return this.xhr.responseURL;
    }

    if (/^X-Request-URL:/m.test(this.xhr.getAllResponseHeaders())) {
      return this.xhr.getResponseHeader('X-Request-URL');
    }

    return '';
  }

  public handleResponse(
    reason: string,
    response: (reason?: any) => void,
    status?: number | null,
    statusText?: string
  ) {
    return response({
      reason,
      status: status || this.xhr.status,
      statusText: statusText || this.xhr.statusText,
      xhr: this.xhr
    });
  }
}

// Placeholder functions for testing overrides. Added here
// for ease of use when adding TypeScript on top of
// existing code.
export function __queueResponseMock(response: string) {};
export function reset() { }

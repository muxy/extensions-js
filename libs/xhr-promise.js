/* eslint-disable */

/*
 * Copyright 2015 Scott Brady
 * MIT License
 * https://github.com/scottbrady/xhr-promise/blob/master/LICENSE
 */
var ParseHeaders, XMLHttpRequestPromise;

ParseHeaders = require('parse-headers');

/*
 * Module to wrap an XMLHttpRequest in a promise.
 */

module.exports = XMLHttpRequestPromise = (function() {
  function XMLHttpRequestPromise() {}

  XMLHttpRequestPromise.DEFAULT_CONTENT_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8';

  /*
   * XMLHttpRequestPromise.send(options) -> Promise
   * - options (Object): URL, method, data, etc.
   *
   * Create the XHR object and wire up event handlers to use a promise.
   */

  XMLHttpRequestPromise.prototype.send = function(options) {
    var defaults;
    if (options == null) {
      options = {};
    }
    defaults = {
      method: 'GET',
      data: null,
      headers: {},
      async: true,
      username: null,
      password: null,
      withCredentials: false
    };
    options = Object.assign({}, defaults, options);
    return new Promise(
      (function(_this) {
        return function(resolve, reject) {
          var e, header, ref, value, xhr;
          if (!XMLHttpRequest) {
            _this._handleError('browser', reject, null, "browser doesn't support XMLHttpRequest");
            return;
          }
          if (typeof options.url !== 'string' || options.url.length === 0) {
            _this._handleError('url', reject, null, 'URL is a required parameter');
            return;
          }
          _this._xhr = xhr = new XMLHttpRequest();
          xhr.onload = function() {
            var responseText;
            _this._detachWindowUnload();
            try {
              responseText = _this._getResponseText();
            } catch (_error) {
              _this._handleError('parse', reject, null, 'invalid JSON response');
              return;
            }
            return resolve({
              url: _this._getResponseUrl(),
              status: xhr.status,
              statusText: xhr.statusText,
              responseText: responseText,
              headers: _this._getHeaders(),
              xhr: xhr
            });
          };
          xhr.onerror = function() {
            return _this._handleError('error', reject);
          };
          xhr.ontimeout = function() {
            return _this._handleError('timeout', reject);
          };
          xhr.onabort = function() {
            return _this._handleError('abort', reject);
          };
          _this._attachWindowUnload();
          xhr.open(options.method, options.url, options.async, options.username, options.password);
          if (options.withCredentials) {
            xhr.withCredentials = true;
          }
          if (options.data != null && !options.headers['Content-Type']) {
            options.headers['Content-Type'] = _this.constructor.DEFAULT_CONTENT_TYPE;
          }
          ref = options.headers;
          for (header in ref) {
            value = ref[header];
            xhr.setRequestHeader(header, value);
          }
          try {
            return xhr.send(options.data);
          } catch (_error) {
            e = _error;
            return _this._handleError('send', reject, null, e.toString());
          }
        };
      })(this)
    );
  };

  /*
   * XMLHttpRequestPromise.getXHR() -> XMLHttpRequest
   */

  XMLHttpRequestPromise.prototype.getXHR = function() {
    return this._xhr;
  };

  /*
   * XMLHttpRequestPromise._attachWindowUnload()
   *
   * Fix for IE 9 and IE 10
   * Internet Explorer freezes when you close a webpage during an XHR request
   * https://support.microsoft.com/kb/2856746
   *
   */

  XMLHttpRequestPromise.prototype._attachWindowUnload = function() {
    this._unloadHandler = this._handleWindowUnload.bind(this);
    if (window.attachEvent) {
      return window.attachEvent('onunload', this._unloadHandler);
    }
  };

  /*
   * XMLHttpRequestPromise._detachWindowUnload()
   */

  XMLHttpRequestPromise.prototype._detachWindowUnload = function() {
    if (window.detachEvent) {
      return window.detachEvent('onunload', this._unloadHandler);
    }
  };

  /*
   * XMLHttpRequestPromise._getHeaders() -> Object
   */

  XMLHttpRequestPromise.prototype._getHeaders = function() {
    return ParseHeaders(this._xhr.getAllResponseHeaders());
  };

  /*
   * XMLHttpRequestPromise._getResponseText() -> Mixed
   *
   * Parses response text JSON if present.
   */

  XMLHttpRequestPromise.prototype._getResponseText = function() {
    var responseText;
    responseText = typeof this._xhr.responseText === 'string' ? this._xhr.responseText : '';
    switch ((this._xhr.getResponseHeader('Content-Type') || '').split(';')[0]) {
      case 'application/json':
      case 'text/javascript':
        responseText = JSON.parse(responseText + '');
    }
    return responseText;
  };

  /*
   * XMLHttpRequestPromise._getResponseUrl() -> String
   *
   * Actual response URL after following redirects.
   */

  XMLHttpRequestPromise.prototype._getResponseUrl = function() {
    if (this._xhr.responseURL != null) {
      return this._xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(this._xhr.getAllResponseHeaders())) {
      return this._xhr.getResponseHeader('X-Request-URL');
    }
    return '';
  };

  /*
   * XMLHttpRequestPromise._handleError(reason, reject, status, statusText)
   * - reason (String)
   * - reject (Function)
   * - status (String)
   * - statusText (String)
   */

  XMLHttpRequestPromise.prototype._handleError = function(reason, reject, status, statusText) {
    this._detachWindowUnload();
    return reject({
      reason: reason,
      status: status || this._xhr.status,
      statusText: statusText || this._xhr.statusText,
      xhr: this._xhr
    });
  };

  /*
   * XMLHttpRequestPromise._handleWindowUnload()
   */

  XMLHttpRequestPromise.prototype._handleWindowUnload = function() {
    return this._xhr.abort();
  };

  return XMLHttpRequestPromise;
})();

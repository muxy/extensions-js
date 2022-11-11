(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Muxy = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    var PurchaseClientType;
    (function (PurchaseClientType) {
        PurchaseClientType[PurchaseClientType["Dev"] = 0] = "Dev";
        PurchaseClientType[PurchaseClientType["Server"] = 1] = "Server";
        PurchaseClientType[PurchaseClientType["Test"] = 2] = "Test";
        PurchaseClientType[PurchaseClientType["Twitch"] = 3] = "Twitch";
        PurchaseClientType[PurchaseClientType["Unknown"] = 4] = "Unknown";
    })(PurchaseClientType || (PurchaseClientType = {}));

    var TriviaQuestionState;
    (function (TriviaQuestionState) {
        // Inactive marks a poll as inactive. Only admins can see an inactive poll.
        TriviaQuestionState["Inactive"] = "state-inactive";
        // Unlocked marks a poll as being visible to everyone, and open to votes.
        TriviaQuestionState["Unlocked"] = "state-unlocked";
        // Unlocked marks a poll as being visible to everyone, but closed to votes. No results
        // are visible while unlocked.
        TriviaQuestionState["Locked"] = "state-locked";
        // Results marks a poll as complete, and results are available.
        TriviaQuestionState["Results"] = "state-results";
    })(TriviaQuestionState || (TriviaQuestionState = {}));

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var gumshoe = createCommonjsModule(function (module) {
    /* eslint-disable */

    // polyfill for String.prototype.trim for IE8
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function () {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
          return this.replace(rtrim, '');
        };
      })();
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.21
    // Reference: http://es5.github.io/#x15.4.4.21
    if (!Array.prototype.reduce) {
      Array.prototype.reduce = function (callback /*, initialValue*/) {
        if (this == null) {
          throw new TypeError('Array.prototype.reduce called on null or undefined');
        }
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
        var t = Object(this),
          len = t.length >>> 0,
          k = 0,
          value;
        if (arguments.length == 2) {
          value = arguments[1];
        } else {
          while (k < len && !k in t) {
            k++;
          }
          if (k >= len) {
            throw new TypeError('Reduce of empty array with no initial value');
          }
          value = t[k++];
        }
        for (; k < len; k++) {
          if (k in t) {
            value = callback(value, t[k], k, t);
          }
        }
        return value;
      };
    }

    /**
     * @file perfnow is a 0.14 kb window.performance.now high resolution timer polyfill with Date fallback
     * @author Daniel Lamb <dlamb.open.source@gmail.com>
     */
    function perfnow() {
      var perf = window.performance || {};
      perf.now =
        perf.now ||
        perf.mozNow ||
        perf.msNow ||
        perf.oNow ||
        perf.webkitNow ||
        // fallback to Date
        Date.now ||
        function () {
          return new Date().getTime();
        };

      return perf;
    }

    function gumshoeFactory() {

      // we need reqwest and store2 (and any other future deps)
      // to be solely within our context, so as they don't leak and conflict
      // with other versions of the same libs sites may be loading.
      // so we'll provide our own context.
      // root._gumshoe is only available in specs
      var context = {},
        queryString,
        store,
        /*jshint -W024 */
        undefined$1;

      // call contextSetup with 'context' as 'this' so all libs attach
      // to our context variable.
      (function contextSetup() {
        /*!
    	    query-string
    	    Parse and stringify URL query strings
    	    https://github.com/sindresorhus/query-string
    	    by Sindre Sorhus
    	    MIT License
        */
        (function (c) {
          var queryString = {};

          queryString.parse = function (str) {
            if (typeof str !== 'string') {
              return {};
            }

            str = str.trim().replace(/^(\?|#)/, '');

            if (!str) {
              return {};
            }

            return str
              .trim()
              .split('&')
              .reduce(function (ret, param) {
                var parts = param.replace(/\+/g, ' ').split('=');
                var key = parts[0];
                var val = parts[1];

                key = decodeURIComponent(key);
                // missing `=` should be `null`:
                // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
                val = val === undefined$1 ? null : decodeURIComponent(val);

                if (!ret.hasOwnProperty(key)) {
                  ret[key] = val;
                } else if (Array.isArray(ret[key])) {
                  ret[key].push(val);
                } else {
                  ret[key] = [ret[key], val];
                }

                return ret;
              }, {});
          };

          queryString.stringify = function (obj) {
            return obj
              ? Object.keys(obj)
                  .map(function (key) {
                    var val = obj[key];

                    if (Array.isArray(val)) {
                      return val
                        .map(function (val2) {
                          return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                        })
                        .join('&');
                    }

                    return encodeURIComponent(key) + '=' + encodeURIComponent(val);
                  })
                  .join('&')
              : '';
          };

          c.queryString = queryString;
        })(this);

        /*!
         * Reqwest! A general purpose XHR connection manager
         * license MIT (c) Dustin Diaz 2014
         * https://github.com/ded/reqwest
         */

        !(function (name, context, definition) {
          context[name] = definition();
        })('reqwest', this, function () {
          var win = window,
            doc = document,
            httpsRe = /^http/,
            protocolRe = /(^\w+):\/\//,
            twoHundo = /^(20\d|1223)$/, //http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
            byTag = 'getElementsByTagName',
            readyState = 'readyState',
            contentType = 'Content-Type',
            requestedWith = 'X-Requested-With',
            head = doc[byTag]('head')[0],
            uniqid = 0,
            callbackPrefix = 'reqwest_' + +new Date(),
            lastValue, // data stored by the most recent JSONP callback
            xmlHttpRequest = 'XMLHttpRequest',
            xDomainRequest = 'XDomainRequest',
            noop = function () {},
            isArray =
              typeof Array.isArray == 'function'
                ? Array.isArray
                : function (a) {
                    return a instanceof Array;
                  },
            defaultHeaders = {
              contentType: 'application/x-www-form-urlencoded',
              requestedWith: xmlHttpRequest,
              accept: {
                '*': 'text/javascript, text/html, application/xml, text/xml, */*',
                xml: 'application/xml, text/xml',
                html: 'text/html',
                text: 'text/plain',
                json: 'application/json, text/javascript',
                js: 'application/javascript, text/javascript'
              }
            },
            xhr = function (o) {
              // is it x-domain
              if (o['crossOrigin'] === true) {
                var xhr = win[xmlHttpRequest] ? new XMLHttpRequest() : null;
                if (xhr && 'withCredentials' in xhr) {
                  return xhr;
                } else if (win[xDomainRequest]) {
                  return new XDomainRequest();
                } else {
                  throw new Error('Browser does not support cross-origin requests');
                }
              } else if (win[xmlHttpRequest]) {
                return new XMLHttpRequest();
              } else {
                return new ActiveXObject('Microsoft.XMLHTTP');
              }
            },
            globalSetupOptions = {
              dataFilter: function (data) {
                return data;
              }
            };

          function succeed(r) {
            var protocol = protocolRe.exec(r.url);
            protocol = (protocol && protocol[1]) || window.location.protocol;
            return httpsRe.test(protocol) ? twoHundo.test(r.request.status) : !!r.request.responseText;
          }

          function handleReadyState(r, success, error) {
            return function () {
              // use _aborted to mitigate against IE err c00c023f
              // (can't read props on aborted request objects)
              if (r._aborted) return error(r.request);
              if (r._timedOut) return error(r.request, 'Request is aborted: timeout');
              if (r.request && r.request[readyState] == 4) {
                r.request.onreadystatechange = noop;
                if (succeed(r)) success(r.request);
                else error(r.request);
              }
            };
          }

          function setHeaders(http, o) {
            var headers = o['headers'] || {},
              h;

            headers['Accept'] = headers['Accept'] || defaultHeaders['accept'][o['type']] || defaultHeaders['accept']['*'];

            var isAFormData = typeof FormData === 'function' && o['data'] instanceof FormData;
            // breaks cross-origin requests with legacy browsers
            if (!o['crossOrigin'] && !headers[requestedWith]) headers[requestedWith] = defaultHeaders['requestedWith'];
            if (!headers[contentType] && !isAFormData)
              headers[contentType] = o['contentType'] || defaultHeaders['contentType'];
            for (h in headers)
              headers.hasOwnProperty(h) && 'setRequestHeader' in http && http.setRequestHeader(h, headers[h]);
          }

          function setCredentials(http, o) {
            if (typeof o['withCredentials'] !== 'undefined' && typeof http.withCredentials !== 'undefined') {
              http.withCredentials = !!o['withCredentials'];
            }
          }

          function generalCallback(data) {
            lastValue = data;
          }

          function urlappend(url, s) {
            return url + (/\?/.test(url) ? '&' : '?') + s;
          }

          function handleJsonp(o, fn, err, url) {
            var reqId = uniqid++,
              cbkey = o['jsonpCallback'] || 'callback', // the 'callback' key
              cbval = o['jsonpCallbackName'] || reqwest.getcallbackPrefix(reqId),
              cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)'),
              match = url.match(cbreg),
              script = doc.createElement('script'),
              loaded = 0,
              isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1;

            if (match) {
              if (match[3] === '?') {
                url = url.replace(cbreg, '$1=' + cbval); // wildcard callback func name
              } else {
                cbval = match[3]; // provided callback func name
              }
            } else {
              url = urlappend(url, cbkey + '=' + cbval); // no callback details, add 'em
            }

            win[cbval] = generalCallback;

            script.type = 'text/javascript';
            script.src = url;
            script.async = true;
            if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
              // need this for IE due to out-of-order onreadystatechange(), binding script
              // execution to an event listener gives us control over when the script
              // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
              script.htmlFor = script.id = '_reqwest_' + reqId;
            }

            script.onload = script.onreadystatechange = function () {
              if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
                return false;
              }
              script.onload = script.onreadystatechange = null;
              script.onclick && script.onclick();
              // Call the user callback with the last value stored and clean up values and scripts.
              fn(lastValue);
              lastValue = undefined$1;
              head.removeChild(script);
              loaded = 1;
            };

            // Add the script to the DOM head
            head.appendChild(script);

            // Enable JSONP timeout
            return {
              abort: function () {
                script.onload = script.onreadystatechange = null;
                err({}, 'Request is aborted: timeout', {});
                lastValue = undefined$1;
                head.removeChild(script);
                loaded = 1;
              }
            };
          }

          function getRequest(fn, err) {
            var o = this.o,
              method = (o['method'] || 'GET').toUpperCase(),
              url = typeof o === 'string' ? o : o['url'],
              // convert non-string objects to query-string form unless o['processData'] is false
              data =
                o['processData'] !== false && o['data'] && typeof o['data'] !== 'string'
                  ? reqwest.toQueryString(o['data'])
                  : o['data'] || null,
              http,
              sendWait = false;

            // if we're working on a GET request and we have data then we should append
            // query string to end of URL and not post data
            if ((o['type'] == 'jsonp' || method == 'GET') && data) {
              url = urlappend(url, data);
              data = null;
            }

            if (o['type'] == 'jsonp') return handleJsonp(o, fn, err, url);

            // get the xhr from the factory if passed
            // if the factory returns null, fall-back to ours
            http = (o.xhr && o.xhr(o)) || xhr(o);

            http.open(method, url, o['async'] === false ? false : true);
            setHeaders(http, o);
            setCredentials(http, o);
            if (win[xDomainRequest] && http instanceof win[xDomainRequest]) {
              http.onload = fn;
              http.onerror = err;
              // NOTE: see
              // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e
              http.onprogress = function () {};
              sendWait = true;
            } else {
              http.onreadystatechange = handleReadyState(this, fn, err);
            }
            o['before'] && o['before'](http);
            if (sendWait) {
              setTimeout(function () {
                http.send(data);
              }, 200);
            } else {
              http.send(data);
            }
            return http;
          }

          function Reqwest(o, fn) {
            this.o = o;
            this.fn = fn;

            init.apply(this, arguments);
          }

          function setType(header) {
            // json, javascript, text/plain, text/html, xml
            if (header.match('json')) return 'json';
            if (header.match('javascript')) return 'js';
            if (header.match('text')) return 'html';
            if (header.match('xml')) return 'xml';
          }

          function init(o, fn) {
            this.url = typeof o == 'string' ? o : o['url'];
            this.timeout = null;

            // whether request has been fulfilled for purpose
            // of tracking the Promises
            this._fulfilled = false;
            // success handlers
            this._successHandler = function () {};
            this._fulfillmentHandlers = [];
            // error handlers
            this._errorHandlers = [];
            // complete (both success and fail) handlers
            this._completeHandlers = [];
            this._erred = false;
            this._responseArgs = {};

            var self = this;

            fn = fn || function () {};

            if (o['timeout']) {
              this.timeout = setTimeout(function () {
                timedOut();
              }, o['timeout']);
            }

            if (o['success']) {
              this._successHandler = function () {
                o['success'].apply(o, arguments);
              };
            }

            if (o['error']) {
              this._errorHandlers.push(function () {
                o['error'].apply(o, arguments);
              });
            }

            if (o['complete']) {
              this._completeHandlers.push(function () {
                o['complete'].apply(o, arguments);
              });
            }

            function complete(resp) {
              o['timeout'] && clearTimeout(self.timeout);
              self.timeout = null;
              while (self._completeHandlers.length > 0) {
                self._completeHandlers.shift()(resp);
              }
            }

            function success(resp) {
              var type = o['type'] || (resp && setType(resp.getResponseHeader('Content-Type'))); // resp can be undefined in IE
              resp = type !== 'jsonp' ? self.request : resp;
              // use global data filter on response text
              var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type),
                r = filteredResponse;
              try {
                resp.responseText = r;
              } catch (e) {
                // can't assign this in IE<=8, just ignore
              }
              if (r) {
                switch (type) {
                  case 'json':
                    try {
                      resp = win.JSON.parse(r);
                    } catch (err) {
                      return error(resp, 'Could not parse JSON in response', err);
                    }
                    break;
                }
              }

              self._responseArgs.resp = resp;
              self._fulfilled = true;
              fn(resp);
              self._successHandler(resp);
              while (self._fulfillmentHandlers.length > 0) {
                resp = self._fulfillmentHandlers.shift()(resp);
              }

              complete(resp);
            }

            function timedOut() {
              self._timedOut = true;
              if (typeof self.request !== 'undefined' && typeof self.request.abort === 'function') {
                self.request.abort();
              }
            }

            function error(resp, msg, t) {
              resp = self.request;
              self._responseArgs.resp = resp;
              self._responseArgs.msg = msg;
              self._responseArgs.t = t;
              self._erred = true;
              while (self._errorHandlers.length > 0) {
                self._errorHandlers.shift()(resp, msg, t);
              }
              complete(resp);
            }

            this.request = getRequest.call(this, success, error);
          }

          Reqwest.prototype = {
            abort: function () {
              this._aborted = true;
              if (typeof this.request !== 'undefined' && typeof this.request.abort === 'function') {
                this.request.abort();
              }
            },

            retry: function () {
              this._aborted = false;
              this._timedOut = false;
              init.call(this, this.o, this.fn);
            },

            /**
             * Small deviation from the Promises A CommonJs specification
             * http://wiki.commonjs.org/wiki/Promises/A
             */

            /**
             * `then` will execute upon successful requests
             */
            then: function (success, fail) {
              success = success || function () {};
              fail = fail || function () {};
              if (this._fulfilled) {
                this._responseArgs.resp = success(this._responseArgs.resp);
              } else if (this._erred) {
                fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t);
              } else {
                this._fulfillmentHandlers.push(success);
                this._errorHandlers.push(fail);
              }
              return this;
            },

            /**
             * `always` will execute whether the request succeeds or fails
             */
            always: function (fn) {
              if (this._fulfilled || this._erred) {
                fn(this._responseArgs.resp);
              } else {
                this._completeHandlers.push(fn);
              }
              return this;
            },

            /**
             * `fail` will execute when the request fails
             */
            fail: function (fn) {
              if (this._erred) {
                fn(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t);
              } else {
                this._errorHandlers.push(fn);
              }
              return this;
            },
            catch: function (fn) {
              return this.fail(fn);
            }
          };

          function reqwest(o, fn) {
            return new Reqwest(o, fn);
          }

          // normalize newline variants according to spec -> CRLF
          function normalize(s) {
            return s ? s.replace(/\r?\n/g, '\r\n') : '';
          }

          function serial(el, cb) {
            var n = el.name,
              t = el.tagName.toLowerCase(),
              optCb = function (o) {
                // IE gives value="" even where there is no value attribute
                // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
                if (o && !o['disabled'])
                  cb(
                    n,
                    normalize(o['attributes']['value'] && o['attributes']['value']['specified'] ? o['value'] : o['text'])
                  );
              },
              ch,
              ra,
              val,
              i;

            // don't serialize elements that are disabled or without a name
            if (el.disabled || !n) return;

            switch (t) {
              case 'input':
                if (!/reset|button|image|file/i.test(el.type)) {
                  ch = /checkbox/i.test(el.type);
                  ra = /radio/i.test(el.type);
                  val = el.value;
                  // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
                  (!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val));
                }
                break;
              case 'textarea':
                cb(n, normalize(el.value));
                break;
              case 'select':
                if (el.type.toLowerCase() === 'select-one') {
                  optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null);
                } else {
                  for (i = 0; el.length && i < el.length; i++) {
                    el.options[i].selected && optCb(el.options[i]);
                  }
                }
                break;
            }
          }

          // collect up all form elements found from the passed argument elements all
          // the way down to child elements; pass a '<form>' or form fields.
          // called with 'this'=callback to use for serial() on each element
          function eachFormElement() {
            var cb = this,
              e,
              i,
              serializeSubtags = function (e, tags) {
                var i, j, fa;
                for (i = 0; i < tags.length; i++) {
                  fa = e[byTag](tags[i]);
                  for (j = 0; j < fa.length; j++) serial(fa[j], cb);
                }
              };

            for (i = 0; i < arguments.length; i++) {
              e = arguments[i];
              if (/input|select|textarea/i.test(e.tagName)) serial(e, cb);
              serializeSubtags(e, ['input', 'select', 'textarea']);
            }
          }

          // standard query string style serialization
          function serializeQueryString() {
            return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments));
          }

          // { 'name': 'value', ... } style serialization
          function serializeHash() {
            var hash = {};
            eachFormElement.apply(function (name, value) {
              if (name in hash) {
                hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]]);
                hash[name].push(value);
              } else hash[name] = value;
            }, arguments);
            return hash;
          }

          // [ { name: 'name', value: 'value' }, ... ] style serialization
          reqwest.serializeArray = function () {
            var arr = [];
            eachFormElement.apply(function (name, value) {
              arr.push({ name: name, value: value });
            }, arguments);
            return arr;
          };

          reqwest.serialize = function () {
            if (arguments.length === 0) return '';
            var opt,
              fn,
              args = Array.prototype.slice.call(arguments, 0);

            opt = args.pop();
            opt && opt.nodeType && args.push(opt) && (opt = null);
            opt && (opt = opt.type);

            if (opt == 'map') fn = serializeHash;
            else if (opt == 'array') fn = reqwest.serializeArray;
            else fn = serializeQueryString;

            return fn.apply(null, args);
          };

          reqwest.toQueryString = function (o, trad) {
            var prefix,
              i,
              traditional = trad || false,
              s = [],
              enc = encodeURIComponent,
              add = function (key, value) {
                // If value is a function, invoke it and return its value
                value = 'function' === typeof value ? value() : value == null ? '' : value;
                s[s.length] = enc(key) + '=' + enc(value);
              };
            // If an array was passed in, assume that it is an array of form elements.
            if (isArray(o)) {
              for (i = 0; o && i < o.length; i++) add(o[i]['name'], o[i]['value']);
            } else {
              // If traditional, encode the "old" way (the way 1.3.2 or older
              // did it), otherwise encode params recursively.
              for (prefix in o) {
                if (o.hasOwnProperty(prefix)) buildParams(prefix, o[prefix], traditional, add);
              }
            }

            // spaces should be + according to spec
            return s.join('&').replace(/%20/g, '+');
          };

          function buildParams(prefix, obj, traditional, add) {
            var name,
              i,
              v,
              rbracket = /\[\]$/;

            if (isArray(obj)) {
              // Serialize array item.
              for (i = 0; obj && i < obj.length; i++) {
                v = obj[i];
                if (traditional || rbracket.test(prefix)) {
                  // Treat each array item as a scalar.
                  add(prefix, v);
                } else {
                  buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
                }
              }
            } else if (obj && obj.toString() === '[object Object]') {
              // Serialize object item.
              for (name in obj) {
                buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
              }
            } else {
              // Serialize scalar item.
              add(prefix, obj);
            }
          }

          reqwest.getcallbackPrefix = function () {
            return callbackPrefix;
          };

          // jQuery and Zepto compatibility, differences can be remapped here so you can call
          // .ajax.compat(options, callback)
          reqwest.compat = function (o, fn) {
            if (o) {
              o['type'] && (o['method'] = o['type']) && delete o['type'];
              o['dataType'] && (o['type'] = o['dataType']);
              o['jsonpCallback'] && (o['jsonpCallbackName'] = o['jsonpCallback']) && delete o['jsonpCallback'];
              o['jsonp'] && (o['jsonpCallback'] = o['jsonp']);
            }
            return new Reqwest(o, fn);
          };

          reqwest.ajaxSetup = function (options) {
            options = options || {};
            for (var k in options) {
              globalSetupOptions[k] = options[k];
            }
          };

          return reqwest;
        });

        /*! store2 - v2.3.0 - 2015-05-22
         * Copyright (c) 2015 Nathan Bubna; Licensed MIT, GPL */
        (function (window, define) {
          var _ = {
            version: '2.3.0',
            areas: {},
            apis: {},

            // utilities
            inherit: function (api, o) {
              for (var p in api) {
                if (!o.hasOwnProperty(p)) {
                  o[p] = api[p];
                }
              }
              return o;
            },
            stringify: function (d) {
              return d === undefined$1 || typeof d === 'function' ? d + '' : JSON.stringify(d);
            },
            parse: function (s) {
              // if it doesn't parse, return as is
              try {
                return JSON.parse(s);
              } catch (e) {
                return s;
              }
            },

            // extension hooks
            fn: function (name, fn) {
              _.storeAPI[name] = fn;
              for (var api in _.apis) {
                _.apis[api][name] = fn;
              }
            },
            get: function (area, key) {
              return area.getItem(key);
            },
            set: function (area, key, string) {
              area.setItem(key, string);
            },
            remove: function (area, key) {
              area.removeItem(key);
            },
            key: function (area, i) {
              return area.key(i);
            },
            length: function (area) {
              return area.length;
            },
            clear: function (area) {
              area.clear();
            },

            // core functions
            Store: function (id, area, namespace) {
              var store = _.inherit(_.storeAPI, function (key, data, overwrite) {
                if (arguments.length === 0) {
                  return store.getAll();
                }
                if (data !== undefined$1) {
                  return store.set(key, data, overwrite);
                }
                if (typeof key === 'string') {
                  return store.get(key);
                }
                if (!key) {
                  return store.clear();
                }
                return store.setAll(key, data); // overwrite=data, data=key
              });
              store._id = id;
              try {
                var testKey = '_safariPrivate_';
                area.setItem(testKey, 'sucks');
                store._area = area;
                area.removeItem(testKey);
              } catch (e) {}
              if (!store._area) {
                store._area = _.inherit(_.storageAPI, { items: {}, name: 'fake' });
              }
              store._ns = namespace || '';
              if (!_.areas[id]) {
                _.areas[id] = store._area;
              }
              if (!_.apis[store._ns + store._id]) {
                _.apis[store._ns + store._id] = store;
              }
              return store;
            },
            storeAPI: {
              // admin functions
              area: function (id, area) {
                var store = this[id];
                if (!store || !store.area) {
                  store = _.Store(id, area, this._ns); //new area-specific api in this namespace
                  if (!this[id]) {
                    this[id] = store;
                  }
                }
                return store;
              },
              namespace: function (namespace, noSession) {
                if (!namespace) {
                  return this._ns ? this._ns.substring(0, this._ns.length - 1) : '';
                }
                var ns = namespace,
                  store = this[ns];
                if (!store || !store.namespace) {
                  store = _.Store(this._id, this._area, this._ns + ns + '.'); //new namespaced api
                  if (!this[ns]) {
                    this[ns] = store;
                  }
                  if (!noSession) {
                    store.area('session', _.areas.session);
                  }
                }
                return store;
              },
              isFake: function () {
                return this._area.name === 'fake';
              },
              toString: function () {
                return 'store' + (this._ns ? '.' + this.namespace() : '') + '[' + this._id + ']';
              },

              // storage functions
              has: function (key) {
                if (this._area.has) {
                  return this._area.has(this._in(key)); //extension hook
                }
                return !!(this._in(key) in this._area);
              },
              size: function () {
                return this.keys().length;
              },
              each: function (fn, and) {
                for (var i = 0, m = _.length(this._area); i < m; i++) {
                  var key = this._out(_.key(this._area, i));
                  if (key !== undefined$1) {
                    if (fn.call(this, key, and || this.get(key)) === false) {
                      break;
                    }
                  }
                  if (m > _.length(this._area)) {
                    m--;
                    i--;
                  } // in case of removeItem
                }
                return and || this;
              },
              keys: function () {
                return this.each(function (k, list) {
                  list.push(k);
                }, []);
              },
              get: function (key, alt) {
                var s = _.get(this._area, this._in(key));
                return s !== null ? _.parse(s) : alt || s; // support alt for easy default mgmt
              },
              getAll: function () {
                return this.each(function (k, all) {
                  all[k] = this.get(k);
                }, {});
              },
              set: function (key, data, overwrite) {
                var d = this.get(key);
                if (d != null && overwrite === false) {
                  return data;
                }
                return _.set(this._area, this._in(key), _.stringify(data), overwrite) || d;
              },
              setAll: function (data, overwrite) {
                var changed, val;
                for (var key in data) {
                  val = data[key];
                  if (this.set(key, val, overwrite) !== val) {
                    changed = true;
                  }
                }
                return changed;
              },
              remove: function (key) {
                var d = this.get(key);
                _.remove(this._area, this._in(key));
                return d;
              },
              clear: function () {
                if (!this._ns) {
                  _.clear(this._area);
                } else {
                  this.each(function (k) {
                    _.remove(this._area, this._in(k));
                  }, 1);
                }
                return this;
              },
              clearAll: function () {
                var area = this._area;
                for (var id in _.areas) {
                  if (_.areas.hasOwnProperty(id)) {
                    this._area = _.areas[id];
                    this.clear();
                  }
                }
                this._area = area;
                return this;
              },

              // internal use functions
              _in: function (k) {
                if (typeof k !== 'string') {
                  k = _.stringify(k);
                }
                return this._ns ? this._ns + k : k;
              },
              _out: function (k) {
                return this._ns
                  ? k && k.indexOf(this._ns) === 0
                    ? k.substring(this._ns.length)
                    : undefined$1 // so each() knows to skip it
                  : k;
              }
            }, // end _.storeAPI
            storageAPI: {
              length: 0,
              has: function (k) {
                return this.items.hasOwnProperty(k);
              },
              key: function (i) {
                var c = 0;
                for (var k in this.items) {
                  if (this.has(k) && i === c++) {
                    return k;
                  }
                }
              },
              setItem: function (k, v) {
                if (!this.has(k)) {
                  this.length++;
                }
                this.items[k] = v;
              },
              removeItem: function (k) {
                if (this.has(k)) {
                  delete this.items[k];
                  this.length--;
                }
              },
              getItem: function (k) {
                return this.has(k) ? this.items[k] : null;
              },
              clear: function () {
                for (var k in this.list) {
                  this.removeItem(k);
                }
              },
              toString: function () {
                return this.length + ' items in ' + this.name + 'Storage';
              }
            } // end _.storageAPI
          };

          // setup the primary store fn
          if (window.store) {
            _.conflict = window.store;
          }
          var store =
            // safely set this up (throws error in IE10/32bit mode for local files)
            _.Store('local');
          store.local = store; // for completeness
          store._ = _; // for extenders and debuggers...
          // safely setup store.session (throws exception in FF for file:/// urls)
          store.area('session');

          //Expose store to the global object
          window.store = store;

          if (typeof define === 'function' && define.amd !== undefined$1) {
            define(function () {
              return store;
            });
          } else if (module.exports) {
            module.exports = store;
          }
        })(this, this.define);
      }.call(context));

      queryString = context.queryString;
      store = context.store;

      function extend(obj) {
        if (!isObject(obj)) {
          return obj;
        }
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
          source = arguments[i];
          for (prop in source) {
            obj[prop] = source[prop];
          }
        }
        return obj;
      }

      function isArray(obj) {
        return '[object Array]' === Object.prototype.toString.call(obj);
      }

      function isObject(obj) {
        var type = typeof obj;
        return type === 'function' || (type === 'object' && !!obj);
      }

      function isString(value) {
        return (
          typeof value == 'string' ||
          (value && typeof value == 'object' && Object.prototype.toString.call(value) == '[object String]') ||
          false
        );
      }

      function uuidv4() {
        var d = perfnow().now();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
      }

      var defaults = {
          transport: '',
          queueTimeout: 100
        },
        localStore = store.namespace('gumshoe'),
        storage = store.namespace('gumshoe').session,
        queue = storage('queue') || [],
        transports = {};

      if (!isArray(queue)) {
        queue = [];
      }

      function gumshoe(options) {
        var clientUuid = localStore('clientUuid');

        options = extend({}, defaults, options);

        // always ensure options.transport is an array.
        if (isString(options.transport)) {
          options.transport = [options.transport];
        } else if (!isArray(options.transport)) {
          throw 'Gumeshoe: Transport property must be a [String] or [Array].';
        }

        // store a client id to identify a client long-term. Google Analytics uses
        // the value, combined with other factors, to determine unique users. we
        // duplicate the same kind of value to assist GA.
        if (!clientUuid) {
          clientUuid = uuidv4();
          localStore({ clientUuid: clientUuid });
        }

        options.clientUuid = clientUuid;

        session(options.sessionFn);

        gumshoe.options = options;
      }

      function each(obj, iterator, context) {
        if (obj === null) {
          return;
        }

        if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === {}) {
              return;
            }
          }
        } else {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (iterator.call(context, obj[key], key, obj) === {}) {
                return;
              }
            }
          }
        }
      }

      function map(obj, iterator, context) {
        var results = [];

        if (!obj) {
          return results;
        }

        if (Array.prototype.map && obj.map === Array.prototype.map) {
          return obj.map(iterator, context);
        }

        each(obj, function (value, index, list) {
          results[results.length] = iterator.call(context, value, index, list);
        });

        return results;
      }

      function collectPlugins() {
        var result,
          plugins = navigator.plugins || [];

        result = map(plugins, function (plugin) {
          var mimeTypes = map(plugin, function (mimeType) {
            var type = mimeType.type;

            if (mimeType.suffixes) {
              type += '~' + mimeType.suffixes;
            }

            return type;
          });

          return {
            description: plugin.description,
            filename: plugin.filename,
            mimeTypes: mimeTypes,
            name: plugin.name
          };
        });

        return result;
      }

      function collect() {
        function getViewport() {
          var e = window,
            a = 'inner';
          if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
          }
          return { width: e[a + 'Width'], height: e[a + 'Height'] };
        }

        var viewport = getViewport(),
          query = queryString.parse(location.search),
          result = {
            // utmcs Character set (e.g. ISO-8859-1)
            characterSet: document.characterSet || document.charset || document.inputEncoding || 'Unknown',

            // utmsc Screen colour depth (e.g. 24-bit)
            colorDepth: screen.colorDepth + '',

            // gclid Gclid is a globally unique tracking parameter (Google Click Identifier)
            googleClickId: query.gclid || '',

            hash: window.location.hash,
            host: window.location.host,

            // utmhn Hostname
            hostName: window.location.hostname,

            // utmip IP address
            ipAddress: '',

            // utmje Java enabled?
            javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : false,

            // utmul Language code (e.g. en-us)
            language: window.navigator.userLanguage || window.navigator.language || 'Unknown',

            // login key: ?lk=
            loginKey: query.lk || '',

            // IE9 doesn't support this
            origin: window.location.origin || '',

            // utmp  Page path
            path: window.location.pathname,
            platform: window.navigator.platform,
            plugins: collectPlugins(),
            port: window.location.port || 80,
            // promotional key: pkey
            promotionKey: query.pkey || '',
            protocol: window.location.protocol,

            queryString: window.location.search,

            // utmr  Full referral URL
            referer: document.referrer,

            screenAvailHeight: screen.availHeight,
            screenAvailWidth: screen.availWidth,
            screenHeight: screen.height,
            screenOrientationAngle: '',
            screenOrientationType: '',
            screenPixelDepth: screen.pixelDepth + '',
            // utmsr Screen resolution
            screenResolution: screen.width + 'x' + screen.height,
            screenWidth: screen.width,

            // utmdt Page title
            title: document.title,

            url: window.location.href,
            userAgent: window.navigator.userAgent,
            utmCampaign: query.utm_campaign || '',
            utmContent: query.utm_content || '',
            utmMedium: query.utm_medium || '',
            utmSource: query.utm_source || '',
            utmTerm: query.utm_term || '',

            // utmvp Viewport resolution
            viewportHeight: viewport.height,
            viewportResolution: viewport.width + 'x' + viewport.height,
            viewportWidth: viewport.width
          },
          intFields = [
            'port',
            'screenAvailHeight',
            'screenAvailWidth',
            'screenHeight',
            'screenOrientationAngle',
            'screenWidth',
            'viewportHeight',
            'viewportWidth'
          ],
          prop,
          value;

        // some browsers don't support navigator.javaEnabled(), it's always undefined.
        if (result.javaEnabled === undefined$1) {
          result.javaEnabled = false;
        }

        // IE 8, 9 don't support this. Yay.
        if (screen.orientation) {
          result.screenOrientationAngle = parseInt(screen.orientation.angle ? screen.orientation.angle : '0');
          result.screenOrientationType = screen.orientation.type ? screen.orientation.type : '';

          if (isNaN(result.screenOrientationAngle)) {
            result.screenOrientationAngle = 0;
          }
        }

        // assert that these values are ints
        for (var i = 0; i < intFields.length; i++) {
          prop = intFields[i];
          value = parseInt(result[prop]);

          if (isNaN(value)) {
            value = 0;
          }

          result[prop] = value;
        }

        return result;
      }

      /**
       * @private
       * @method session
       *
       * @note
       * Gumshoe Session Rules
       *
       *  Generate a new Session ID if any of the following criteria are met:
       *
       *  1. User opens new tab or window (browser default behavior)
       *  2. User has been inactive longer than 30 minutes
       *  3. User has visited withinin the same session, but a UTM
       *     query string parameter has changed.
       */
      function session(fn) {
        // returns a simple object containing utm parameters
        function getUtm() {
          return {
            campaign: query.utm_campaign || '',
            medium: query.utm_medium || '',
            source: query.utm_source || '',
            utmTerm: query.utm_term || ''
          };
        }

        var now = new Date().getTime(),
          query = queryString.parse(location.search),
          lastUtm = storage('utm') || getUtm(),
          utm = getUtm(),
          timestamp,
          difference;

        // save the current state of the utm parameters
        storage('utm', utm);

        // set a session based uuid
        if (!storage('uuid')) {
          storage('uuid', uuidv4());
          storage('timestamp', now);
        } else {
          timestamp = storage('timestamp');
          difference = now - timestamp;

          if (fn) {
            /* jshint validthis: true */
            if (fn.call(this, timestamp, difference, query)) {
              storage('uuid', uuidv4());
            }
          } else if (JSON.stringify(lastUtm) !== JSON.stringify(utm) || difference > 1000 * 60 * 30) {
            storage('uuid', uuidv4());
          }
        }
      }

      function send(eventName, eventData, additional) {
        var pageData = collect(),
          baseData = {
            clientUuid: gumshoe.options.clientUuid,
            eventName: eventName,
            eventData: eventData || {},
            gumshoe: '0.8.1',
            pageData: pageData,
            sessionUuid: storage('uuid'),
            timestamp: new Date().getTime(),
            timezoneOffset: new Date().getTimezoneOffset(),
            uuid: uuidv4()
          };

        // since we're dealing with timeouts now, we need to reassert the
        // session ID for each event sent.
        session(gumshoe.options.sessionFn);

        if (gumshoe.options.transport) {
          for (var i = 0; i < gumshoe.options.transport.length; i++) {
            var transportName = gumshoe.options.transport[i],
              transport,
              data;

            if (transportName && transports[transportName]) {
              transport = transports[transportName];

              // allow each transport to extend the data with more information
              // or transform it how they'd like. transports cannot however,
              // modify eventData sent from the client.
              data = transport.map ? transport.map(baseData, additional) : baseData;

              // extend our data with whatever came back from the transport
              data = extend(baseData, data);

              // TODO: remove this. gumshoe shouldn't care what format this is in
              if (!isString(data.eventData)) {
                data.eventData = JSON.stringify(data.eventData);
              }

              // TODO: remove this. gumshoe shouldn't care what format this is in
              if (!isString(data.pageData.plugins)) {
                data.pageData.plugins = JSON.stringify(data.pageData.plugins);
              }

              // TODO: remove this. temporary bugfix for apps
              if (!data.pageData.ipAddress) {
                data.pageData.ipAddress = '<unknown>';
              }

              pushEvent(eventName, transportName, data);
            } else {
              throw 'Gumshoe: The transport name: ' + transportName + ", doesn't map to a valid transport.";
            }
          }
        }

        /*if (!transportFound) {
          throw 'Gumshoe: No valid transports were found.';
        }*/
      }

      function nextEvent() {
        if (!queue.length) {
          return;
        }

        // granb the next event from the queue and remove it.
        var nevent = queue.shift(),
          transport = transports[nevent.transportName];

        storage('queue', queue);
        transport.send(nevent.data, function (err, result) {
          // we care if an error was thrown, created, or captured
          // if there is an error, add the item back into the queue
          if (err) {
            console.warn(
              'Gumshoe: Retrying. Error received from transport: ' +
                nevent.transportName +
                ', for event: ' +
                nevent.eventName
            );
            queue.push(nevent);
          }
        });

        setTimeout(nextEvent, gumshoe.options.queueTimeout);
      }

      function pushEvent(eventName, transportName, data) {
        var transport;

        // if we're dealing with a fake storage object
        // (eg. sessionStorage isn't available) then don't
        // even bother queueing the data.
        if (storage.isFake()) {
          transport = transports[transportName];
          transport.send(data);

          return;
        }

        // add the event data to the queue
        queue.push({
          eventName: eventName,
          transportName: transportName,
          data: data
        });

        // put our newly modified queue in session storage
        storage('queue', queue);

        setTimeout(nextEvent, gumshoe.options.queueTimeout);
      }

      function transport(tp) {
        if (!tp.name) {
          throw 'Gumshoe: Transport [Object] must have a name defined.';
        }

        transports[tp.name] = tp;
      }

      // setup some static properties
      gumshoe.version = '0.8.1';
      gumshoe.options = {};

      // setup some static methods
      gumshoe.extend = extend;
      gumshoe.reqwest = context.reqwest;
      gumshoe.send = send;
      gumshoe.transport = transport;
      gumshoe.uuid = uuidv4;

      // setup some internal stuff for access
      gumshoe._ = {
        collect: collect,
        localStorage: localStore,
        queryString: queryString,
        queue: queue,
        storage: storage,
        transports: transports
      };

      return gumshoe;

      /*
      if (root.gumshoe) {
        if (root.gumshoe.ready) {
          root.gumshoe.ready = gumshoe.ready = root.gumshoe.ready;
          root.gumshoe = gumshoe;

          if (!isFunction(root.gumshoe.ready.resolve)) {
            throw 'Gumshoe: gumshoe.ready was predefined, but is not a Promise/A deferred.';
          }

          root.gumshoe.ready.resolve();
        }
      }
      else {
        root.gumshoe = gumshoe;
      }
      */
    }

    module.exports = gumshoeFactory;
    });

    /**
     * @module SDK
     */
    /**
     * The analytics collection endpoint.
     * @ignore
     */
    var ANALYTICS_ENDPOINT = 'https://info.muxy.io';
    /**
     * The Analytics class allows for sending events and metrics to Google Analytics
     * with a given UA_STRING.
     */
    var Analytics = /** @class */ (function () {
        function Analytics(uaString, loadPromise) {
            var _this = this;
            this.ready = false;
            this.uaString = uaString;
            this.loadPromise = loadPromise;
            this.user = null;
            this.gumshoe = gumshoe();
            this.gumshoe.transport({
                map: this.mapData.bind(this),
                name: 'muxy-extension-sdk',
                send: function (data, fn) {
                    var d = data;
                    // Remove stuff that we don't want to send up
                    delete d.pageData;
                    delete d.clientUuid;
                    delete d.uuid;
                    delete d.sessionUuid;
                    _this.gumshoe.reqwest({
                        contentType: 'application/x-www-form-urlencoded',
                        crossOrigin: true,
                        data: d,
                        method: 'POST',
                        url: ANALYTICS_ENDPOINT
                    }, function () {
                        if (fn) {
                            fn(null);
                        }
                    });
                }
            });
            this.gumshoe({ transport: 'muxy-extension-sdk' });
            this.loadPromise.then(function () {
                _this.ready = true;
            });
        }
        /**
         * Internal function to map event data to GA format.
         * @private
         */
        Analytics.prototype.mapData = function (data, additional) {
            if (additional === void 0) { additional = {}; }
            var appName = 'Muxy';
            var ip = '<unknown ip>';
            var channelID = null;
            var opaqueID = null;
            var userID = null;
            var role = null;
            var game = null;
            var videoMode = null;
            var latency = null;
            var bitrate = null;
            if (this.user) {
                ip = this.user.ip;
                channelID = this.user.channelID;
                opaqueID = this.user.twitchOpaqueID;
                userID = !opaqueID || opaqueID[0] !== 'U' ? null : opaqueID;
                role = this.user.role;
                game = this.user.game;
                videoMode = this.user.videoMode;
                latency = this.user.latency;
                bitrate = this.user.bitrate;
            }
            var pd = data.pageData;
            pd.ipAddress = ip;
            var result = {
                aid: appName,
                an: appName,
                cd1: channelID,
                cd2: role,
                cd3: game,
                cd4: videoMode,
                cid: opaqueID || data.clientUuid || data.sessionUuid || '00000000-0000-0000-0000-000000000000',
                cm2: latency,
                cm3: bitrate,
                cu: 'USD',
                dh: pd.hostName,
                dl: pd.url,
                dp: pd.path,
                dr: pd.referer,
                dt: pd.title,
                ea: undefined,
                ec: undefined,
                el: undefined,
                ev: undefined,
                je: pd.javaEnabled,
                sr: pd.screenResolution,
                t: 'event',
                tid: this.uaString,
                ti: additional.transactionId,
                tr: additional.transactionRevenue,
                in: additional.itemName,
                ip: additional.itemPrice,
                iq: additional.itemQuantity,
                ic: additional.itemCode,
                iv: additional.itemCategory,
                ua: pd.userAgent,
                uid: userID,
                uip: ip,
                ul: pd.language,
                v: 1,
                vp: "".concat(pd.viewportHeight, "x").concat(pd.viewportWidth)
            };
            if (data.eventName === 'page.view') {
                result.t = 'pageview';
            }
            else {
                result.ec = data.eventName;
                result.ea = data.eventData.name;
                result.el = data.eventData.label;
                result.ev = data.eventData.value;
            }
            return result;
        };
        /**
         * Sends an arbitrary even to Google Analytics.
         *
         * @param {string} category - The high-level category to collect this event under.
         * @param {string} name - A unique identifier for this event.
         * @param {*} value - (optional) A value to associate with this event (defaults to 1).
         * @param {string} label - (optional) A human-readable label for this event.
         */
        Analytics.prototype.sendEvent = function (category, name, value, label, additional) {
            if (value === void 0) { value = 1; }
            if (label === void 0) { label = ''; }
            if (additional === void 0) { additional = {}; }
            if (!this.ready) {
                throw new Error('muxy.Analytics used before ready');
            }
            var data = { name: name, value: value, label: label };
            this.gumshoe.send(category, data, additional);
        };
        /**
         * Sends a simple page view event to Google Analytics.
         */
        Analytics.prototype.pageView = function () {
            if (!this.ready) {
                throw new Error('muxy.Analytics used before ready');
            }
            this.gumshoe.send('page.view', {});
        };
        return Analytics;
    }());

    var pusher = createCommonjsModule(function (module, exports) {
    /*!
     * Pusher JavaScript Library v7.4.0
     * https://pusher.com/
     *
     * Copyright 2020, Pusher
     * Released under the MIT licence.
     */

    (function webpackUniversalModuleDefinition(root, factory) {
    	module.exports = factory();
    })(window, function() {
    return /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId]) {
    /******/ 			return installedModules[moduleId].exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
    /******/ 			i: moduleId,
    /******/ 			l: false,
    /******/ 			exports: {}
    /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
    /******/ 		if(!__webpack_require__.o(exports, name)) {
    /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
    /******/ 		}
    /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function(exports) {
    /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    /******/ 		}
    /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 	};
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/ 	__webpack_require__.t = function(value, mode) {
    /******/ 		if(mode & 1) value = __webpack_require__(value);
    /******/ 		if(mode & 8) return value;
    /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    /******/ 		var ns = Object.create(null);
    /******/ 		__webpack_require__.r(ns);
    /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
    /******/ 		return ns;
    /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
    /******/ 		var getter = module && module.__esModule ?
    /******/ 			function getDefault() { return module['default']; } :
    /******/ 			function getModuleExports() { return module; };
    /******/ 		__webpack_require__.d(getter, 'a', getter);
    /******/ 		return getter;
    /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 2);
    /******/ })
    /************************************************************************/
    /******/ ([
    /* 0 */
    /***/ (function(module, exports, __webpack_require__) {

    // Copyright (C) 2016 Dmitry Chestnykh
    // MIT License. See LICENSE file for details.
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Package base64 implements Base64 encoding and decoding.
     */
    // Invalid character used in decoding to indicate
    // that the character to decode is out of range of
    // alphabet and cannot be decoded.
    var INVALID_BYTE = 256;
    /**
     * Implements standard Base64 encoding.
     *
     * Operates in constant time.
     */
    var Coder = /** @class */ (function () {
        // TODO(dchest): methods to encode chunk-by-chunk.
        function Coder(_paddingCharacter) {
            if (_paddingCharacter === void 0) { _paddingCharacter = "="; }
            this._paddingCharacter = _paddingCharacter;
        }
        Coder.prototype.encodedLength = function (length) {
            if (!this._paddingCharacter) {
                return (length * 8 + 5) / 6 | 0;
            }
            return (length + 2) / 3 * 4 | 0;
        };
        Coder.prototype.encode = function (data) {
            var out = "";
            var i = 0;
            for (; i < data.length - 2; i += 3) {
                var c = (data[i] << 16) | (data[i + 1] << 8) | (data[i + 2]);
                out += this._encodeByte((c >>> 3 * 6) & 63);
                out += this._encodeByte((c >>> 2 * 6) & 63);
                out += this._encodeByte((c >>> 1 * 6) & 63);
                out += this._encodeByte((c >>> 0 * 6) & 63);
            }
            var left = data.length - i;
            if (left > 0) {
                var c = (data[i] << 16) | (left === 2 ? data[i + 1] << 8 : 0);
                out += this._encodeByte((c >>> 3 * 6) & 63);
                out += this._encodeByte((c >>> 2 * 6) & 63);
                if (left === 2) {
                    out += this._encodeByte((c >>> 1 * 6) & 63);
                }
                else {
                    out += this._paddingCharacter || "";
                }
                out += this._paddingCharacter || "";
            }
            return out;
        };
        Coder.prototype.maxDecodedLength = function (length) {
            if (!this._paddingCharacter) {
                return (length * 6 + 7) / 8 | 0;
            }
            return length / 4 * 3 | 0;
        };
        Coder.prototype.decodedLength = function (s) {
            return this.maxDecodedLength(s.length - this._getPaddingLength(s));
        };
        Coder.prototype.decode = function (s) {
            if (s.length === 0) {
                return new Uint8Array(0);
            }
            var paddingLength = this._getPaddingLength(s);
            var length = s.length - paddingLength;
            var out = new Uint8Array(this.maxDecodedLength(length));
            var op = 0;
            var i = 0;
            var haveBad = 0;
            var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
            for (; i < length - 4; i += 4) {
                v0 = this._decodeChar(s.charCodeAt(i + 0));
                v1 = this._decodeChar(s.charCodeAt(i + 1));
                v2 = this._decodeChar(s.charCodeAt(i + 2));
                v3 = this._decodeChar(s.charCodeAt(i + 3));
                out[op++] = (v0 << 2) | (v1 >>> 4);
                out[op++] = (v1 << 4) | (v2 >>> 2);
                out[op++] = (v2 << 6) | v3;
                haveBad |= v0 & INVALID_BYTE;
                haveBad |= v1 & INVALID_BYTE;
                haveBad |= v2 & INVALID_BYTE;
                haveBad |= v3 & INVALID_BYTE;
            }
            if (i < length - 1) {
                v0 = this._decodeChar(s.charCodeAt(i));
                v1 = this._decodeChar(s.charCodeAt(i + 1));
                out[op++] = (v0 << 2) | (v1 >>> 4);
                haveBad |= v0 & INVALID_BYTE;
                haveBad |= v1 & INVALID_BYTE;
            }
            if (i < length - 2) {
                v2 = this._decodeChar(s.charCodeAt(i + 2));
                out[op++] = (v1 << 4) | (v2 >>> 2);
                haveBad |= v2 & INVALID_BYTE;
            }
            if (i < length - 3) {
                v3 = this._decodeChar(s.charCodeAt(i + 3));
                out[op++] = (v2 << 6) | v3;
                haveBad |= v3 & INVALID_BYTE;
            }
            if (haveBad !== 0) {
                throw new Error("Base64Coder: incorrect characters for decoding");
            }
            return out;
        };
        // Standard encoding have the following encoded/decoded ranges,
        // which we need to convert between.
        //
        // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  +   /
        // Index:   0 - 25                    26 - 51              52 - 61   62  63
        // ASCII:  65 - 90                    97 - 122             48 - 57   43  47
        //
        // Encode 6 bits in b into a new character.
        Coder.prototype._encodeByte = function (b) {
            // Encoding uses constant time operations as follows:
            //
            // 1. Define comparison of A with B using (A - B) >>> 8:
            //          if A > B, then result is positive integer
            //          if A <= B, then result is 0
            //
            // 2. Define selection of C or 0 using bitwise AND: X & C:
            //          if X == 0, then result is 0
            //          if X != 0, then result is C
            //
            // 3. Start with the smallest comparison (b >= 0), which is always
            //    true, so set the result to the starting ASCII value (65).
            //
            // 4. Continue comparing b to higher ASCII values, and selecting
            //    zero if comparison isn't true, otherwise selecting a value
            //    to add to result, which:
            //
            //          a) undoes the previous addition
            //          b) provides new value to add
            //
            var result = b;
            // b >= 0
            result += 65;
            // b > 25
            result += ((25 - b) >>> 8) & ((0 - 65) - 26 + 97);
            // b > 51
            result += ((51 - b) >>> 8) & ((26 - 97) - 52 + 48);
            // b > 61
            result += ((61 - b) >>> 8) & ((52 - 48) - 62 + 43);
            // b > 62
            result += ((62 - b) >>> 8) & ((62 - 43) - 63 + 47);
            return String.fromCharCode(result);
        };
        // Decode a character code into a byte.
        // Must return 256 if character is out of alphabet range.
        Coder.prototype._decodeChar = function (c) {
            // Decoding works similar to encoding: using the same comparison
            // function, but now it works on ranges: result is always incremented
            // by value, but this value becomes zero if the range is not
            // satisfied.
            //
            // Decoding starts with invalid value, 256, which is then
            // subtracted when the range is satisfied. If none of the ranges
            // apply, the function returns 256, which is then checked by
            // the caller to throw error.
            var result = INVALID_BYTE; // start with invalid character
            // c == 43 (c > 42 and c < 44)
            result += (((42 - c) & (c - 44)) >>> 8) & (-INVALID_BYTE + c - 43 + 62);
            // c == 47 (c > 46 and c < 48)
            result += (((46 - c) & (c - 48)) >>> 8) & (-INVALID_BYTE + c - 47 + 63);
            // c > 47 and c < 58
            result += (((47 - c) & (c - 58)) >>> 8) & (-INVALID_BYTE + c - 48 + 52);
            // c > 64 and c < 91
            result += (((64 - c) & (c - 91)) >>> 8) & (-INVALID_BYTE + c - 65 + 0);
            // c > 96 and c < 123
            result += (((96 - c) & (c - 123)) >>> 8) & (-INVALID_BYTE + c - 97 + 26);
            return result;
        };
        Coder.prototype._getPaddingLength = function (s) {
            var paddingLength = 0;
            if (this._paddingCharacter) {
                for (var i = s.length - 1; i >= 0; i--) {
                    if (s[i] !== this._paddingCharacter) {
                        break;
                    }
                    paddingLength++;
                }
                if (s.length < 4 || paddingLength > 2) {
                    throw new Error("Base64Coder: incorrect padding");
                }
            }
            return paddingLength;
        };
        return Coder;
    }());
    exports.Coder = Coder;
    var stdCoder = new Coder();
    function encode(data) {
        return stdCoder.encode(data);
    }
    exports.encode = encode;
    function decode(s) {
        return stdCoder.decode(s);
    }
    exports.decode = decode;
    /**
     * Implements URL-safe Base64 encoding.
     * (Same as Base64, but '+' is replaced with '-', and '/' with '_').
     *
     * Operates in constant time.
     */
    var URLSafeCoder = /** @class */ (function (_super) {
        __extends(URLSafeCoder, _super);
        function URLSafeCoder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // URL-safe encoding have the following encoded/decoded ranges:
        //
        // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  -   _
        // Index:   0 - 25                    26 - 51              52 - 61   62  63
        // ASCII:  65 - 90                    97 - 122             48 - 57   45  95
        //
        URLSafeCoder.prototype._encodeByte = function (b) {
            var result = b;
            // b >= 0
            result += 65;
            // b > 25
            result += ((25 - b) >>> 8) & ((0 - 65) - 26 + 97);
            // b > 51
            result += ((51 - b) >>> 8) & ((26 - 97) - 52 + 48);
            // b > 61
            result += ((61 - b) >>> 8) & ((52 - 48) - 62 + 45);
            // b > 62
            result += ((62 - b) >>> 8) & ((62 - 45) - 63 + 95);
            return String.fromCharCode(result);
        };
        URLSafeCoder.prototype._decodeChar = function (c) {
            var result = INVALID_BYTE;
            // c == 45 (c > 44 and c < 46)
            result += (((44 - c) & (c - 46)) >>> 8) & (-INVALID_BYTE + c - 45 + 62);
            // c == 95 (c > 94 and c < 96)
            result += (((94 - c) & (c - 96)) >>> 8) & (-INVALID_BYTE + c - 95 + 63);
            // c > 47 and c < 58
            result += (((47 - c) & (c - 58)) >>> 8) & (-INVALID_BYTE + c - 48 + 52);
            // c > 64 and c < 91
            result += (((64 - c) & (c - 91)) >>> 8) & (-INVALID_BYTE + c - 65 + 0);
            // c > 96 and c < 123
            result += (((96 - c) & (c - 123)) >>> 8) & (-INVALID_BYTE + c - 97 + 26);
            return result;
        };
        return URLSafeCoder;
    }(Coder));
    exports.URLSafeCoder = URLSafeCoder;
    var urlSafeCoder = new URLSafeCoder();
    function encodeURLSafe(data) {
        return urlSafeCoder.encode(data);
    }
    exports.encodeURLSafe = encodeURLSafe;
    function decodeURLSafe(s) {
        return urlSafeCoder.decode(s);
    }
    exports.decodeURLSafe = decodeURLSafe;
    exports.encodedLength = function (length) {
        return stdCoder.encodedLength(length);
    };
    exports.maxDecodedLength = function (length) {
        return stdCoder.maxDecodedLength(length);
    };
    exports.decodedLength = function (s) {
        return stdCoder.decodedLength(s);
    };


    /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {

    // Copyright (C) 2016 Dmitry Chestnykh
    // MIT License. See LICENSE file for details.
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Package utf8 implements UTF-8 encoding and decoding.
     */
    var INVALID_UTF16 = "utf8: invalid string";
    var INVALID_UTF8 = "utf8: invalid source encoding";
    /**
     * Encodes the given string into UTF-8 byte array.
     * Throws if the source string has invalid UTF-16 encoding.
     */
    function encode(s) {
        // Calculate result length and allocate output array.
        // encodedLength() also validates string and throws errors,
        // so we don't need repeat validation here.
        var arr = new Uint8Array(encodedLength(s));
        var pos = 0;
        for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            if (c < 0x80) {
                arr[pos++] = c;
            }
            else if (c < 0x800) {
                arr[pos++] = 0xc0 | c >> 6;
                arr[pos++] = 0x80 | c & 0x3f;
            }
            else if (c < 0xd800) {
                arr[pos++] = 0xe0 | c >> 12;
                arr[pos++] = 0x80 | (c >> 6) & 0x3f;
                arr[pos++] = 0x80 | c & 0x3f;
            }
            else {
                i++; // get one more character
                c = (c & 0x3ff) << 10;
                c |= s.charCodeAt(i) & 0x3ff;
                c += 0x10000;
                arr[pos++] = 0xf0 | c >> 18;
                arr[pos++] = 0x80 | (c >> 12) & 0x3f;
                arr[pos++] = 0x80 | (c >> 6) & 0x3f;
                arr[pos++] = 0x80 | c & 0x3f;
            }
        }
        return arr;
    }
    exports.encode = encode;
    /**
     * Returns the number of bytes required to encode the given string into UTF-8.
     * Throws if the source string has invalid UTF-16 encoding.
     */
    function encodedLength(s) {
        var result = 0;
        for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            if (c < 0x80) {
                result += 1;
            }
            else if (c < 0x800) {
                result += 2;
            }
            else if (c < 0xd800) {
                result += 3;
            }
            else if (c <= 0xdfff) {
                if (i >= s.length - 1) {
                    throw new Error(INVALID_UTF16);
                }
                i++; // "eat" next character
                result += 4;
            }
            else {
                throw new Error(INVALID_UTF16);
            }
        }
        return result;
    }
    exports.encodedLength = encodedLength;
    /**
     * Decodes the given byte array from UTF-8 into a string.
     * Throws if encoding is invalid.
     */
    function decode(arr) {
        var chars = [];
        for (var i = 0; i < arr.length; i++) {
            var b = arr[i];
            if (b & 0x80) {
                var min = void 0;
                if (b < 0xe0) {
                    // Need 1 more byte.
                    if (i >= arr.length) {
                        throw new Error(INVALID_UTF8);
                    }
                    var n1 = arr[++i];
                    if ((n1 & 0xc0) !== 0x80) {
                        throw new Error(INVALID_UTF8);
                    }
                    b = (b & 0x1f) << 6 | (n1 & 0x3f);
                    min = 0x80;
                }
                else if (b < 0xf0) {
                    // Need 2 more bytes.
                    if (i >= arr.length - 1) {
                        throw new Error(INVALID_UTF8);
                    }
                    var n1 = arr[++i];
                    var n2 = arr[++i];
                    if ((n1 & 0xc0) !== 0x80 || (n2 & 0xc0) !== 0x80) {
                        throw new Error(INVALID_UTF8);
                    }
                    b = (b & 0x0f) << 12 | (n1 & 0x3f) << 6 | (n2 & 0x3f);
                    min = 0x800;
                }
                else if (b < 0xf8) {
                    // Need 3 more bytes.
                    if (i >= arr.length - 2) {
                        throw new Error(INVALID_UTF8);
                    }
                    var n1 = arr[++i];
                    var n2 = arr[++i];
                    var n3 = arr[++i];
                    if ((n1 & 0xc0) !== 0x80 || (n2 & 0xc0) !== 0x80 || (n3 & 0xc0) !== 0x80) {
                        throw new Error(INVALID_UTF8);
                    }
                    b = (b & 0x0f) << 18 | (n1 & 0x3f) << 12 | (n2 & 0x3f) << 6 | (n3 & 0x3f);
                    min = 0x10000;
                }
                else {
                    throw new Error(INVALID_UTF8);
                }
                if (b < min || (b >= 0xd800 && b <= 0xdfff)) {
                    throw new Error(INVALID_UTF8);
                }
                if (b >= 0x10000) {
                    // Surrogate pair.
                    if (b > 0x10ffff) {
                        throw new Error(INVALID_UTF8);
                    }
                    b -= 0x10000;
                    chars.push(String.fromCharCode(0xd800 | (b >> 10)));
                    b = 0xdc00 | (b & 0x3ff);
                }
            }
            chars.push(String.fromCharCode(b));
        }
        return chars.join("");
    }
    exports.decode = decode;


    /***/ }),
    /* 2 */
    /***/ (function(module, exports, __webpack_require__) {

    // required so we don't have to do require('pusher').default etc.
    module.exports = __webpack_require__(3).default;


    /***/ }),
    /* 3 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    // ESM COMPAT FLAG
    __webpack_require__.r(__webpack_exports__);

    // CONCATENATED MODULE: ./src/runtimes/web/dom/script_receiver_factory.ts
    var ScriptReceiverFactory = (function () {
        function ScriptReceiverFactory(prefix, name) {
            this.lastId = 0;
            this.prefix = prefix;
            this.name = name;
        }
        ScriptReceiverFactory.prototype.create = function (callback) {
            this.lastId++;
            var number = this.lastId;
            var id = this.prefix + number;
            var name = this.name + '[' + number + ']';
            var called = false;
            var callbackWrapper = function () {
                if (!called) {
                    callback.apply(null, arguments);
                    called = true;
                }
            };
            this[number] = callbackWrapper;
            return { number: number, id: id, name: name, callback: callbackWrapper };
        };
        ScriptReceiverFactory.prototype.remove = function (receiver) {
            delete this[receiver.number];
        };
        return ScriptReceiverFactory;
    }());

    var ScriptReceivers = new ScriptReceiverFactory('_pusher_script_', 'Pusher.ScriptReceivers');

    // CONCATENATED MODULE: ./src/core/defaults.ts
    var Defaults = {
        VERSION: "7.4.0",
        PROTOCOL: 7,
        wsPort: 80,
        wssPort: 443,
        wsPath: '',
        httpHost: 'sockjs.pusher.com',
        httpPort: 80,
        httpsPort: 443,
        httpPath: '/pusher',
        stats_host: 'stats.pusher.com',
        authEndpoint: '/pusher/auth',
        authTransport: 'ajax',
        activityTimeout: 120000,
        pongTimeout: 30000,
        unavailableTimeout: 10000,
        cluster: 'mt1',
        userAuthentication: {
            endpoint: '/pusher/user-auth',
            transport: 'ajax'
        },
        channelAuthorization: {
            endpoint: '/pusher/auth',
            transport: 'ajax'
        },
        cdn_http: "http://js.pusher.com",
        cdn_https: "https://js.pusher.com",
        dependency_suffix: ""
    };
    /* harmony default export */ var defaults = (Defaults);

    // CONCATENATED MODULE: ./src/runtimes/web/dom/dependency_loader.ts


    var dependency_loader_DependencyLoader = (function () {
        function DependencyLoader(options) {
            this.options = options;
            this.receivers = options.receivers || ScriptReceivers;
            this.loading = {};
        }
        DependencyLoader.prototype.load = function (name, options, callback) {
            var self = this;
            if (self.loading[name] && self.loading[name].length > 0) {
                self.loading[name].push(callback);
            }
            else {
                self.loading[name] = [callback];
                var request = runtime.createScriptRequest(self.getPath(name, options));
                var receiver = self.receivers.create(function (error) {
                    self.receivers.remove(receiver);
                    if (self.loading[name]) {
                        var callbacks = self.loading[name];
                        delete self.loading[name];
                        var successCallback = function (wasSuccessful) {
                            if (!wasSuccessful) {
                                request.cleanup();
                            }
                        };
                        for (var i = 0; i < callbacks.length; i++) {
                            callbacks[i](error, successCallback);
                        }
                    }
                });
                request.send(receiver);
            }
        };
        DependencyLoader.prototype.getRoot = function (options) {
            var cdn;
            var protocol = runtime.getDocument().location.protocol;
            if ((options && options.useTLS) || protocol === 'https:') {
                cdn = this.options.cdn_https;
            }
            else {
                cdn = this.options.cdn_http;
            }
            return cdn.replace(/\/*$/, '') + '/' + this.options.version;
        };
        DependencyLoader.prototype.getPath = function (name, options) {
            return this.getRoot(options) + '/' + name + this.options.suffix + '.js';
        };
        return DependencyLoader;
    }());
    /* harmony default export */ var dependency_loader = (dependency_loader_DependencyLoader);

    // CONCATENATED MODULE: ./src/runtimes/web/dom/dependencies.ts



    var DependenciesReceivers = new ScriptReceiverFactory('_pusher_dependencies', 'Pusher.DependenciesReceivers');
    var Dependencies = new dependency_loader({
        cdn_http: defaults.cdn_http,
        cdn_https: defaults.cdn_https,
        version: defaults.VERSION,
        suffix: defaults.dependency_suffix,
        receivers: DependenciesReceivers
    });

    // CONCATENATED MODULE: ./src/core/utils/url_store.ts
    var urlStore = {
        baseUrl: 'https://pusher.com',
        urls: {
            authenticationEndpoint: {
                path: '/docs/channels/server_api/authenticating_users'
            },
            authorizationEndpoint: {
                path: '/docs/channels/server_api/authorizing-users/'
            },
            javascriptQuickStart: {
                path: '/docs/javascript_quick_start'
            },
            triggeringClientEvents: {
                path: '/docs/client_api_guide/client_events#trigger-events'
            },
            encryptedChannelSupport: {
                fullUrl: 'https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support'
            }
        }
    };
    var buildLogSuffix = function (key) {
        var urlPrefix = 'See:';
        var urlObj = urlStore.urls[key];
        if (!urlObj)
            return '';
        var url;
        if (urlObj.fullUrl) {
            url = urlObj.fullUrl;
        }
        else if (urlObj.path) {
            url = urlStore.baseUrl + urlObj.path;
        }
        if (!url)
            return '';
        return urlPrefix + " " + url;
    };
    /* harmony default export */ var url_store = ({ buildLogSuffix: buildLogSuffix });

    // CONCATENATED MODULE: ./src/core/auth/options.ts
    var AuthRequestType;
    (function (AuthRequestType) {
        AuthRequestType["UserAuthentication"] = "user-authentication";
        AuthRequestType["ChannelAuthorization"] = "channel-authorization";
    })(AuthRequestType || (AuthRequestType = {}));

    // CONCATENATED MODULE: ./src/core/errors.ts
    var __extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var BadEventName = (function (_super) {
        __extends(BadEventName, _super);
        function BadEventName(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return BadEventName;
    }(Error));

    var BadChannelName = (function (_super) {
        __extends(BadChannelName, _super);
        function BadChannelName(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return BadChannelName;
    }(Error));

    var RequestTimedOut = (function (_super) {
        __extends(RequestTimedOut, _super);
        function RequestTimedOut(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return RequestTimedOut;
    }(Error));

    var TransportPriorityTooLow = (function (_super) {
        __extends(TransportPriorityTooLow, _super);
        function TransportPriorityTooLow(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return TransportPriorityTooLow;
    }(Error));

    var TransportClosed = (function (_super) {
        __extends(TransportClosed, _super);
        function TransportClosed(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return TransportClosed;
    }(Error));

    var UnsupportedFeature = (function (_super) {
        __extends(UnsupportedFeature, _super);
        function UnsupportedFeature(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return UnsupportedFeature;
    }(Error));

    var UnsupportedTransport = (function (_super) {
        __extends(UnsupportedTransport, _super);
        function UnsupportedTransport(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return UnsupportedTransport;
    }(Error));

    var UnsupportedStrategy = (function (_super) {
        __extends(UnsupportedStrategy, _super);
        function UnsupportedStrategy(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return UnsupportedStrategy;
    }(Error));

    var HTTPAuthError = (function (_super) {
        __extends(HTTPAuthError, _super);
        function HTTPAuthError(status, msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            _this.status = status;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return HTTPAuthError;
    }(Error));


    // CONCATENATED MODULE: ./src/runtimes/isomorphic/auth/xhr_auth.ts




    var ajax = function (context, query, authOptions, authRequestType, callback) {
        var xhr = runtime.createXHR();
        xhr.open('POST', authOptions.endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        for (var headerName in authOptions.headers) {
            xhr.setRequestHeader(headerName, authOptions.headers[headerName]);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = void 0;
                    var parsed = false;
                    try {
                        data = JSON.parse(xhr.responseText);
                        parsed = true;
                    }
                    catch (e) {
                        callback(new HTTPAuthError(200, "JSON returned from " + authRequestType.toString() + " endpoint was invalid, yet status code was 200. Data was: " + xhr.responseText), null);
                    }
                    if (parsed) {
                        callback(null, data);
                    }
                }
                else {
                    var suffix = '';
                    switch (authRequestType) {
                        case AuthRequestType.UserAuthentication:
                            suffix = url_store.buildLogSuffix('authenticationEndpoint');
                            break;
                        case AuthRequestType.ChannelAuthorization:
                            suffix = "Clients must be authenticated to join private or presence channels. " + url_store.buildLogSuffix('authorizationEndpoint');
                            break;
                    }
                    callback(new HTTPAuthError(xhr.status, "Unable to retrieve auth string from " + authRequestType.toString() + " endpoint - " +
                        ("received status: " + xhr.status + " from " + authOptions.endpoint + ". " + suffix)), null);
                }
            }
        };
        xhr.send(query);
        return xhr;
    };
    /* harmony default export */ var xhr_auth = (ajax);

    // CONCATENATED MODULE: ./src/core/base64.ts
    function encode(s) {
        return btoa(utob(s));
    }
    var fromCharCode = String.fromCharCode;
    var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var cb_utob = function (c) {
        var cc = c.charCodeAt(0);
        return cc < 0x80
            ? c
            : cc < 0x800
                ? fromCharCode(0xc0 | (cc >>> 6)) + fromCharCode(0x80 | (cc & 0x3f))
                : fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) +
                    fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) +
                    fromCharCode(0x80 | (cc & 0x3f));
    };
    var utob = function (u) {
        return u.replace(/[^\x00-\x7F]/g, cb_utob);
    };
    var cb_encode = function (ccc) {
        var padlen = [0, 2, 1][ccc.length % 3];
        var ord = (ccc.charCodeAt(0) << 16) |
            ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8) |
            (ccc.length > 2 ? ccc.charCodeAt(2) : 0);
        var chars = [
            b64chars.charAt(ord >>> 18),
            b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
        ];
        return chars.join('');
    };
    var btoa = window.btoa ||
        function (b) {
            return b.replace(/[\s\S]{1,3}/g, cb_encode);
        };

    // CONCATENATED MODULE: ./src/core/utils/timers/abstract_timer.ts
    var Timer = (function () {
        function Timer(set, clear, delay, callback) {
            var _this = this;
            this.clear = clear;
            this.timer = set(function () {
                if (_this.timer) {
                    _this.timer = callback(_this.timer);
                }
            }, delay);
        }
        Timer.prototype.isRunning = function () {
            return this.timer !== null;
        };
        Timer.prototype.ensureAborted = function () {
            if (this.timer) {
                this.clear(this.timer);
                this.timer = null;
            }
        };
        return Timer;
    }());
    /* harmony default export */ var abstract_timer = (Timer);

    // CONCATENATED MODULE: ./src/core/utils/timers/index.ts
    var timers_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();

    function timers_clearTimeout(timer) {
        window.clearTimeout(timer);
    }
    function timers_clearInterval(timer) {
        window.clearInterval(timer);
    }
    var OneOffTimer = (function (_super) {
        timers_extends(OneOffTimer, _super);
        function OneOffTimer(delay, callback) {
            return _super.call(this, setTimeout, timers_clearTimeout, delay, function (timer) {
                callback();
                return null;
            }) || this;
        }
        return OneOffTimer;
    }(abstract_timer));

    var PeriodicTimer = (function (_super) {
        timers_extends(PeriodicTimer, _super);
        function PeriodicTimer(delay, callback) {
            return _super.call(this, setInterval, timers_clearInterval, delay, function (timer) {
                callback();
                return timer;
            }) || this;
        }
        return PeriodicTimer;
    }(abstract_timer));


    // CONCATENATED MODULE: ./src/core/util.ts

    var Util = {
        now: function () {
            if (Date.now) {
                return Date.now();
            }
            else {
                return new Date().valueOf();
            }
        },
        defer: function (callback) {
            return new OneOffTimer(0, callback);
        },
        method: function (name) {
            var boundArguments = Array.prototype.slice.call(arguments, 1);
            return function (object) {
                return object[name].apply(object, boundArguments.concat(arguments));
            };
        }
    };
    /* harmony default export */ var util = (Util);

    // CONCATENATED MODULE: ./src/core/utils/collections.ts


    function extend(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < sources.length; i++) {
            var extensions = sources[i];
            for (var property in extensions) {
                if (extensions[property] &&
                    extensions[property].constructor &&
                    extensions[property].constructor === Object) {
                    target[property] = extend(target[property] || {}, extensions[property]);
                }
                else {
                    target[property] = extensions[property];
                }
            }
        }
        return target;
    }
    function stringify() {
        var m = ['Pusher'];
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] === 'string') {
                m.push(arguments[i]);
            }
            else {
                m.push(safeJSONStringify(arguments[i]));
            }
        }
        return m.join(' : ');
    }
    function arrayIndexOf(array, item) {
        var nativeIndexOf = Array.prototype.indexOf;
        if (array === null) {
            return -1;
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) {
            return array.indexOf(item);
        }
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] === item) {
                return i;
            }
        }
        return -1;
    }
    function objectApply(object, f) {
        for (var key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                f(object[key], key, object);
            }
        }
    }
    function keys(object) {
        var keys = [];
        objectApply(object, function (_, key) {
            keys.push(key);
        });
        return keys;
    }
    function values(object) {
        var values = [];
        objectApply(object, function (value) {
            values.push(value);
        });
        return values;
    }
    function apply(array, f, context) {
        for (var i = 0; i < array.length; i++) {
            f.call(context || window, array[i], i, array);
        }
    }
    function map(array, f) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            result.push(f(array[i], i, array, result));
        }
        return result;
    }
    function mapObject(object, f) {
        var result = {};
        objectApply(object, function (value, key) {
            result[key] = f(value);
        });
        return result;
    }
    function filter(array, test) {
        test =
            test ||
                function (value) {
                    return !!value;
                };
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (test(array[i], i, array, result)) {
                result.push(array[i]);
            }
        }
        return result;
    }
    function filterObject(object, test) {
        var result = {};
        objectApply(object, function (value, key) {
            if ((test && test(value, key, object, result)) || Boolean(value)) {
                result[key] = value;
            }
        });
        return result;
    }
    function flatten(object) {
        var result = [];
        objectApply(object, function (value, key) {
            result.push([key, value]);
        });
        return result;
    }
    function any(array, test) {
        for (var i = 0; i < array.length; i++) {
            if (test(array[i], i, array)) {
                return true;
            }
        }
        return false;
    }
    function collections_all(array, test) {
        for (var i = 0; i < array.length; i++) {
            if (!test(array[i], i, array)) {
                return false;
            }
        }
        return true;
    }
    function encodeParamsObject(data) {
        return mapObject(data, function (value) {
            if (typeof value === 'object') {
                value = safeJSONStringify(value);
            }
            return encodeURIComponent(encode(value.toString()));
        });
    }
    function buildQueryString(data) {
        var params = filterObject(data, function (value) {
            return value !== undefined;
        });
        var query = map(flatten(encodeParamsObject(params)), util.method('join', '=')).join('&');
        return query;
    }
    function decycleObject(object) {
        var objects = [], paths = [];
        return (function derez(value, path) {
            var i, name, nu;
            switch (typeof value) {
                case 'object':
                    if (!value) {
                        return null;
                    }
                    for (i = 0; i < objects.length; i += 1) {
                        if (objects[i] === value) {
                            return { $ref: paths[i] };
                        }
                    }
                    objects.push(value);
                    paths.push(path);
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
                        nu = [];
                        for (i = 0; i < value.length; i += 1) {
                            nu[i] = derez(value[i], path + '[' + i + ']');
                        }
                    }
                    else {
                        nu = {};
                        for (name in value) {
                            if (Object.prototype.hasOwnProperty.call(value, name)) {
                                nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
                            }
                        }
                    }
                    return nu;
                case 'number':
                case 'string':
                case 'boolean':
                    return value;
            }
        })(object, '$');
    }
    function safeJSONStringify(source) {
        try {
            return JSON.stringify(source);
        }
        catch (e) {
            return JSON.stringify(decycleObject(source));
        }
    }

    // CONCATENATED MODULE: ./src/core/logger.ts


    var logger_Logger = (function () {
        function Logger() {
            this.globalLog = function (message) {
                if (window.console && window.console.log) {
                    window.console.log(message);
                }
            };
        }
        Logger.prototype.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.log(this.globalLog, args);
        };
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.log(this.globalLogWarn, args);
        };
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.log(this.globalLogError, args);
        };
        Logger.prototype.globalLogWarn = function (message) {
            if (window.console && window.console.warn) {
                window.console.warn(message);
            }
            else {
                this.globalLog(message);
            }
        };
        Logger.prototype.globalLogError = function (message) {
            if (window.console && window.console.error) {
                window.console.error(message);
            }
            else {
                this.globalLogWarn(message);
            }
        };
        Logger.prototype.log = function (defaultLoggingFunction) {
            var message = stringify.apply(this, arguments);
            if (core_pusher.log) {
                core_pusher.log(message);
            }
            else if (core_pusher.logToConsole) {
                var log = defaultLoggingFunction.bind(this);
                log(message);
            }
        };
        return Logger;
    }());
    /* harmony default export */ var logger = (new logger_Logger());

    // CONCATENATED MODULE: ./src/runtimes/web/auth/jsonp_auth.ts

    var jsonp = function (context, query, authOptions, authRequestType, callback) {
        if (authOptions.headers !== undefined) {
            logger.warn("To send headers with the " + authRequestType.toString() + " request, you must use AJAX, rather than JSONP.");
        }
        var callbackName = context.nextAuthCallbackID.toString();
        context.nextAuthCallbackID++;
        var document = context.getDocument();
        var script = document.createElement('script');
        context.auth_callbacks[callbackName] = function (data) {
            callback(null, data);
        };
        var callback_name = "Pusher.auth_callbacks['" + callbackName + "']";
        script.src =
            authOptions.endpoint +
                '?callback=' +
                encodeURIComponent(callback_name) +
                '&' +
                query;
        var head = document.getElementsByTagName('head')[0] || document.documentElement;
        head.insertBefore(script, head.firstChild);
    };
    /* harmony default export */ var jsonp_auth = (jsonp);

    // CONCATENATED MODULE: ./src/runtimes/web/dom/script_request.ts
    var ScriptRequest = (function () {
        function ScriptRequest(src) {
            this.src = src;
        }
        ScriptRequest.prototype.send = function (receiver) {
            var self = this;
            var errorString = 'Error loading ' + self.src;
            self.script = document.createElement('script');
            self.script.id = receiver.id;
            self.script.src = self.src;
            self.script.type = 'text/javascript';
            self.script.charset = 'UTF-8';
            if (self.script.addEventListener) {
                self.script.onerror = function () {
                    receiver.callback(errorString);
                };
                self.script.onload = function () {
                    receiver.callback(null);
                };
            }
            else {
                self.script.onreadystatechange = function () {
                    if (self.script.readyState === 'loaded' ||
                        self.script.readyState === 'complete') {
                        receiver.callback(null);
                    }
                };
            }
            if (self.script.async === undefined &&
                document.attachEvent &&
                /opera/i.test(navigator.userAgent)) {
                self.errorScript = document.createElement('script');
                self.errorScript.id = receiver.id + '_error';
                self.errorScript.text = receiver.name + "('" + errorString + "');";
                self.script.async = self.errorScript.async = false;
            }
            else {
                self.script.async = true;
            }
            var head = document.getElementsByTagName('head')[0];
            head.insertBefore(self.script, head.firstChild);
            if (self.errorScript) {
                head.insertBefore(self.errorScript, self.script.nextSibling);
            }
        };
        ScriptRequest.prototype.cleanup = function () {
            if (this.script) {
                this.script.onload = this.script.onerror = null;
                this.script.onreadystatechange = null;
            }
            if (this.script && this.script.parentNode) {
                this.script.parentNode.removeChild(this.script);
            }
            if (this.errorScript && this.errorScript.parentNode) {
                this.errorScript.parentNode.removeChild(this.errorScript);
            }
            this.script = null;
            this.errorScript = null;
        };
        return ScriptRequest;
    }());
    /* harmony default export */ var script_request = (ScriptRequest);

    // CONCATENATED MODULE: ./src/runtimes/web/dom/jsonp_request.ts


    var jsonp_request_JSONPRequest = (function () {
        function JSONPRequest(url, data) {
            this.url = url;
            this.data = data;
        }
        JSONPRequest.prototype.send = function (receiver) {
            if (this.request) {
                return;
            }
            var query = buildQueryString(this.data);
            var url = this.url + '/' + receiver.number + '?' + query;
            this.request = runtime.createScriptRequest(url);
            this.request.send(receiver);
        };
        JSONPRequest.prototype.cleanup = function () {
            if (this.request) {
                this.request.cleanup();
            }
        };
        return JSONPRequest;
    }());
    /* harmony default export */ var jsonp_request = (jsonp_request_JSONPRequest);

    // CONCATENATED MODULE: ./src/runtimes/web/timeline/jsonp_timeline.ts


    var getAgent = function (sender, useTLS) {
        return function (data, callback) {
            var scheme = 'http' + (useTLS ? 's' : '') + '://';
            var url = scheme + (sender.host || sender.options.host) + sender.options.path;
            var request = runtime.createJSONPRequest(url, data);
            var receiver = runtime.ScriptReceivers.create(function (error, result) {
                ScriptReceivers.remove(receiver);
                request.cleanup();
                if (result && result.host) {
                    sender.host = result.host;
                }
                if (callback) {
                    callback(error, result);
                }
            });
            request.send(receiver);
        };
    };
    var jsonp_timeline_jsonp = {
        name: 'jsonp',
        getAgent: getAgent
    };
    /* harmony default export */ var jsonp_timeline = (jsonp_timeline_jsonp);

    // CONCATENATED MODULE: ./src/core/transports/url_schemes.ts

    function getGenericURL(baseScheme, params, path) {
        var scheme = baseScheme + (params.useTLS ? 's' : '');
        var host = params.useTLS ? params.hostTLS : params.hostNonTLS;
        return scheme + '://' + host + path;
    }
    function getGenericPath(key, queryString) {
        var path = '/app/' + key;
        var query = '?protocol=' +
            defaults.PROTOCOL +
            '&client=js' +
            '&version=' +
            defaults.VERSION +
            (queryString ? '&' + queryString : '');
        return path + query;
    }
    var ws = {
        getInitial: function (key, params) {
            var path = (params.httpPath || '') + getGenericPath(key, 'flash=false');
            return getGenericURL('ws', params, path);
        }
    };
    var http = {
        getInitial: function (key, params) {
            var path = (params.httpPath || '/pusher') + getGenericPath(key);
            return getGenericURL('http', params, path);
        }
    };
    var sockjs = {
        getInitial: function (key, params) {
            return getGenericURL('http', params, params.httpPath || '/pusher');
        },
        getPath: function (key, params) {
            return getGenericPath(key);
        }
    };

    // CONCATENATED MODULE: ./src/core/events/callback_registry.ts

    var callback_registry_CallbackRegistry = (function () {
        function CallbackRegistry() {
            this._callbacks = {};
        }
        CallbackRegistry.prototype.get = function (name) {
            return this._callbacks[prefix(name)];
        };
        CallbackRegistry.prototype.add = function (name, callback, context) {
            var prefixedEventName = prefix(name);
            this._callbacks[prefixedEventName] =
                this._callbacks[prefixedEventName] || [];
            this._callbacks[prefixedEventName].push({
                fn: callback,
                context: context
            });
        };
        CallbackRegistry.prototype.remove = function (name, callback, context) {
            if (!name && !callback && !context) {
                this._callbacks = {};
                return;
            }
            var names = name ? [prefix(name)] : keys(this._callbacks);
            if (callback || context) {
                this.removeCallback(names, callback, context);
            }
            else {
                this.removeAllCallbacks(names);
            }
        };
        CallbackRegistry.prototype.removeCallback = function (names, callback, context) {
            apply(names, function (name) {
                this._callbacks[name] = filter(this._callbacks[name] || [], function (binding) {
                    return ((callback && callback !== binding.fn) ||
                        (context && context !== binding.context));
                });
                if (this._callbacks[name].length === 0) {
                    delete this._callbacks[name];
                }
            }, this);
        };
        CallbackRegistry.prototype.removeAllCallbacks = function (names) {
            apply(names, function (name) {
                delete this._callbacks[name];
            }, this);
        };
        return CallbackRegistry;
    }());
    /* harmony default export */ var callback_registry = (callback_registry_CallbackRegistry);
    function prefix(name) {
        return '_' + name;
    }

    // CONCATENATED MODULE: ./src/core/events/dispatcher.ts


    var dispatcher_Dispatcher = (function () {
        function Dispatcher(failThrough) {
            this.callbacks = new callback_registry();
            this.global_callbacks = [];
            this.failThrough = failThrough;
        }
        Dispatcher.prototype.bind = function (eventName, callback, context) {
            this.callbacks.add(eventName, callback, context);
            return this;
        };
        Dispatcher.prototype.bind_global = function (callback) {
            this.global_callbacks.push(callback);
            return this;
        };
        Dispatcher.prototype.unbind = function (eventName, callback, context) {
            this.callbacks.remove(eventName, callback, context);
            return this;
        };
        Dispatcher.prototype.unbind_global = function (callback) {
            if (!callback) {
                this.global_callbacks = [];
                return this;
            }
            this.global_callbacks = filter(this.global_callbacks || [], function (c) { return c !== callback; });
            return this;
        };
        Dispatcher.prototype.unbind_all = function () {
            this.unbind();
            this.unbind_global();
            return this;
        };
        Dispatcher.prototype.emit = function (eventName, data, metadata) {
            for (var i = 0; i < this.global_callbacks.length; i++) {
                this.global_callbacks[i](eventName, data);
            }
            var callbacks = this.callbacks.get(eventName);
            var args = [];
            if (metadata) {
                args.push(data, metadata);
            }
            else if (data) {
                args.push(data);
            }
            if (callbacks && callbacks.length > 0) {
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i].fn.apply(callbacks[i].context || window, args);
                }
            }
            else if (this.failThrough) {
                this.failThrough(eventName, data);
            }
            return this;
        };
        return Dispatcher;
    }());
    /* harmony default export */ var dispatcher = (dispatcher_Dispatcher);

    // CONCATENATED MODULE: ./src/core/transports/transport_connection.ts
    var transport_connection_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();





    var transport_connection_TransportConnection = (function (_super) {
        transport_connection_extends(TransportConnection, _super);
        function TransportConnection(hooks, name, priority, key, options) {
            var _this = _super.call(this) || this;
            _this.initialize = runtime.transportConnectionInitializer;
            _this.hooks = hooks;
            _this.name = name;
            _this.priority = priority;
            _this.key = key;
            _this.options = options;
            _this.state = 'new';
            _this.timeline = options.timeline;
            _this.activityTimeout = options.activityTimeout;
            _this.id = _this.timeline.generateUniqueID();
            return _this;
        }
        TransportConnection.prototype.handlesActivityChecks = function () {
            return Boolean(this.hooks.handlesActivityChecks);
        };
        TransportConnection.prototype.supportsPing = function () {
            return Boolean(this.hooks.supportsPing);
        };
        TransportConnection.prototype.connect = function () {
            var _this = this;
            if (this.socket || this.state !== 'initialized') {
                return false;
            }
            var url = this.hooks.urls.getInitial(this.key, this.options);
            try {
                this.socket = this.hooks.getSocket(url, this.options);
            }
            catch (e) {
                util.defer(function () {
                    _this.onError(e);
                    _this.changeState('closed');
                });
                return false;
            }
            this.bindListeners();
            logger.debug('Connecting', { transport: this.name, url: url });
            this.changeState('connecting');
            return true;
        };
        TransportConnection.prototype.close = function () {
            if (this.socket) {
                this.socket.close();
                return true;
            }
            else {
                return false;
            }
        };
        TransportConnection.prototype.send = function (data) {
            var _this = this;
            if (this.state === 'open') {
                util.defer(function () {
                    if (_this.socket) {
                        _this.socket.send(data);
                    }
                });
                return true;
            }
            else {
                return false;
            }
        };
        TransportConnection.prototype.ping = function () {
            if (this.state === 'open' && this.supportsPing()) {
                this.socket.ping();
            }
        };
        TransportConnection.prototype.onOpen = function () {
            if (this.hooks.beforeOpen) {
                this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options));
            }
            this.changeState('open');
            this.socket.onopen = undefined;
        };
        TransportConnection.prototype.onError = function (error) {
            this.emit('error', { type: 'WebSocketError', error: error });
            this.timeline.error(this.buildTimelineMessage({ error: error.toString() }));
        };
        TransportConnection.prototype.onClose = function (closeEvent) {
            if (closeEvent) {
                this.changeState('closed', {
                    code: closeEvent.code,
                    reason: closeEvent.reason,
                    wasClean: closeEvent.wasClean
                });
            }
            else {
                this.changeState('closed');
            }
            this.unbindListeners();
            this.socket = undefined;
        };
        TransportConnection.prototype.onMessage = function (message) {
            this.emit('message', message);
        };
        TransportConnection.prototype.onActivity = function () {
            this.emit('activity');
        };
        TransportConnection.prototype.bindListeners = function () {
            var _this = this;
            this.socket.onopen = function () {
                _this.onOpen();
            };
            this.socket.onerror = function (error) {
                _this.onError(error);
            };
            this.socket.onclose = function (closeEvent) {
                _this.onClose(closeEvent);
            };
            this.socket.onmessage = function (message) {
                _this.onMessage(message);
            };
            if (this.supportsPing()) {
                this.socket.onactivity = function () {
                    _this.onActivity();
                };
            }
        };
        TransportConnection.prototype.unbindListeners = function () {
            if (this.socket) {
                this.socket.onopen = undefined;
                this.socket.onerror = undefined;
                this.socket.onclose = undefined;
                this.socket.onmessage = undefined;
                if (this.supportsPing()) {
                    this.socket.onactivity = undefined;
                }
            }
        };
        TransportConnection.prototype.changeState = function (state, params) {
            this.state = state;
            this.timeline.info(this.buildTimelineMessage({
                state: state,
                params: params
            }));
            this.emit(state, params);
        };
        TransportConnection.prototype.buildTimelineMessage = function (message) {
            return extend({ cid: this.id }, message);
        };
        return TransportConnection;
    }(dispatcher));
    /* harmony default export */ var transport_connection = (transport_connection_TransportConnection);

    // CONCATENATED MODULE: ./src/core/transports/transport.ts

    var transport_Transport = (function () {
        function Transport(hooks) {
            this.hooks = hooks;
        }
        Transport.prototype.isSupported = function (environment) {
            return this.hooks.isSupported(environment);
        };
        Transport.prototype.createConnection = function (name, priority, key, options) {
            return new transport_connection(this.hooks, name, priority, key, options);
        };
        return Transport;
    }());
    /* harmony default export */ var transports_transport = (transport_Transport);

    // CONCATENATED MODULE: ./src/runtimes/isomorphic/transports/transports.ts




    var WSTransport = new transports_transport({
        urls: ws,
        handlesActivityChecks: false,
        supportsPing: false,
        isInitialized: function () {
            return Boolean(runtime.getWebSocketAPI());
        },
        isSupported: function () {
            return Boolean(runtime.getWebSocketAPI());
        },
        getSocket: function (url) {
            return runtime.createWebSocket(url);
        }
    });
    var httpConfiguration = {
        urls: http,
        handlesActivityChecks: false,
        supportsPing: true,
        isInitialized: function () {
            return true;
        }
    };
    var streamingConfiguration = extend({
        getSocket: function (url) {
            return runtime.HTTPFactory.createStreamingSocket(url);
        }
    }, httpConfiguration);
    var pollingConfiguration = extend({
        getSocket: function (url) {
            return runtime.HTTPFactory.createPollingSocket(url);
        }
    }, httpConfiguration);
    var xhrConfiguration = {
        isSupported: function () {
            return runtime.isXHRSupported();
        }
    };
    var XHRStreamingTransport = new transports_transport((extend({}, streamingConfiguration, xhrConfiguration)));
    var XHRPollingTransport = new transports_transport(extend({}, pollingConfiguration, xhrConfiguration));
    var Transports = {
        ws: WSTransport,
        xhr_streaming: XHRStreamingTransport,
        xhr_polling: XHRPollingTransport
    };
    /* harmony default export */ var transports = (Transports);

    // CONCATENATED MODULE: ./src/runtimes/web/transports/transports.ts






    var SockJSTransport = new transports_transport({
        file: 'sockjs',
        urls: sockjs,
        handlesActivityChecks: true,
        supportsPing: false,
        isSupported: function () {
            return true;
        },
        isInitialized: function () {
            return window.SockJS !== undefined;
        },
        getSocket: function (url, options) {
            return new window.SockJS(url, null, {
                js_path: Dependencies.getPath('sockjs', {
                    useTLS: options.useTLS
                }),
                ignore_null_origin: options.ignoreNullOrigin
            });
        },
        beforeOpen: function (socket, path) {
            socket.send(JSON.stringify({
                path: path
            }));
        }
    });
    var xdrConfiguration = {
        isSupported: function (environment) {
            var yes = runtime.isXDRSupported(environment.useTLS);
            return yes;
        }
    };
    var XDRStreamingTransport = new transports_transport((extend({}, streamingConfiguration, xdrConfiguration)));
    var XDRPollingTransport = new transports_transport(extend({}, pollingConfiguration, xdrConfiguration));
    transports.xdr_streaming = XDRStreamingTransport;
    transports.xdr_polling = XDRPollingTransport;
    transports.sockjs = SockJSTransport;
    /* harmony default export */ var transports_transports = (transports);

    // CONCATENATED MODULE: ./src/runtimes/web/net_info.ts
    var net_info_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();

    var NetInfo = (function (_super) {
        net_info_extends(NetInfo, _super);
        function NetInfo() {
            var _this = _super.call(this) || this;
            var self = _this;
            if (window.addEventListener !== undefined) {
                window.addEventListener('online', function () {
                    self.emit('online');
                }, false);
                window.addEventListener('offline', function () {
                    self.emit('offline');
                }, false);
            }
            return _this;
        }
        NetInfo.prototype.isOnline = function () {
            if (window.navigator.onLine === undefined) {
                return true;
            }
            else {
                return window.navigator.onLine;
            }
        };
        return NetInfo;
    }(dispatcher));

    var net_info_Network = new NetInfo();

    // CONCATENATED MODULE: ./src/core/transports/assistant_to_the_transport_manager.ts


    var assistant_to_the_transport_manager_AssistantToTheTransportManager = (function () {
        function AssistantToTheTransportManager(manager, transport, options) {
            this.manager = manager;
            this.transport = transport;
            this.minPingDelay = options.minPingDelay;
            this.maxPingDelay = options.maxPingDelay;
            this.pingDelay = undefined;
        }
        AssistantToTheTransportManager.prototype.createConnection = function (name, priority, key, options) {
            var _this = this;
            options = extend({}, options, {
                activityTimeout: this.pingDelay
            });
            var connection = this.transport.createConnection(name, priority, key, options);
            var openTimestamp = null;
            var onOpen = function () {
                connection.unbind('open', onOpen);
                connection.bind('closed', onClosed);
                openTimestamp = util.now();
            };
            var onClosed = function (closeEvent) {
                connection.unbind('closed', onClosed);
                if (closeEvent.code === 1002 || closeEvent.code === 1003) {
                    _this.manager.reportDeath();
                }
                else if (!closeEvent.wasClean && openTimestamp) {
                    var lifespan = util.now() - openTimestamp;
                    if (lifespan < 2 * _this.maxPingDelay) {
                        _this.manager.reportDeath();
                        _this.pingDelay = Math.max(lifespan / 2, _this.minPingDelay);
                    }
                }
            };
            connection.bind('open', onOpen);
            return connection;
        };
        AssistantToTheTransportManager.prototype.isSupported = function (environment) {
            return this.manager.isAlive() && this.transport.isSupported(environment);
        };
        return AssistantToTheTransportManager;
    }());
    /* harmony default export */ var assistant_to_the_transport_manager = (assistant_to_the_transport_manager_AssistantToTheTransportManager);

    // CONCATENATED MODULE: ./src/core/connection/protocol/protocol.ts
    var Protocol = {
        decodeMessage: function (messageEvent) {
            try {
                var messageData = JSON.parse(messageEvent.data);
                var pusherEventData = messageData.data;
                if (typeof pusherEventData === 'string') {
                    try {
                        pusherEventData = JSON.parse(messageData.data);
                    }
                    catch (e) { }
                }
                var pusherEvent = {
                    event: messageData.event,
                    channel: messageData.channel,
                    data: pusherEventData
                };
                if (messageData.user_id) {
                    pusherEvent.user_id = messageData.user_id;
                }
                return pusherEvent;
            }
            catch (e) {
                throw { type: 'MessageParseError', error: e, data: messageEvent.data };
            }
        },
        encodeMessage: function (event) {
            return JSON.stringify(event);
        },
        processHandshake: function (messageEvent) {
            var message = Protocol.decodeMessage(messageEvent);
            if (message.event === 'pusher:connection_established') {
                if (!message.data.activity_timeout) {
                    throw 'No activity timeout specified in handshake';
                }
                return {
                    action: 'connected',
                    id: message.data.socket_id,
                    activityTimeout: message.data.activity_timeout * 1000
                };
            }
            else if (message.event === 'pusher:error') {
                return {
                    action: this.getCloseAction(message.data),
                    error: this.getCloseError(message.data)
                };
            }
            else {
                throw 'Invalid handshake';
            }
        },
        getCloseAction: function (closeEvent) {
            if (closeEvent.code < 4000) {
                if (closeEvent.code >= 1002 && closeEvent.code <= 1004) {
                    return 'backoff';
                }
                else {
                    return null;
                }
            }
            else if (closeEvent.code === 4000) {
                return 'tls_only';
            }
            else if (closeEvent.code < 4100) {
                return 'refused';
            }
            else if (closeEvent.code < 4200) {
                return 'backoff';
            }
            else if (closeEvent.code < 4300) {
                return 'retry';
            }
            else {
                return 'refused';
            }
        },
        getCloseError: function (closeEvent) {
            if (closeEvent.code !== 1000 && closeEvent.code !== 1001) {
                return {
                    type: 'PusherError',
                    data: {
                        code: closeEvent.code,
                        message: closeEvent.reason || closeEvent.message
                    }
                };
            }
            else {
                return null;
            }
        }
    };
    /* harmony default export */ var protocol_protocol = (Protocol);

    // CONCATENATED MODULE: ./src/core/connection/connection.ts
    var connection_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();




    var connection_Connection = (function (_super) {
        connection_extends(Connection, _super);
        function Connection(id, transport) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.transport = transport;
            _this.activityTimeout = transport.activityTimeout;
            _this.bindListeners();
            return _this;
        }
        Connection.prototype.handlesActivityChecks = function () {
            return this.transport.handlesActivityChecks();
        };
        Connection.prototype.send = function (data) {
            return this.transport.send(data);
        };
        Connection.prototype.send_event = function (name, data, channel) {
            var event = { event: name, data: data };
            if (channel) {
                event.channel = channel;
            }
            logger.debug('Event sent', event);
            return this.send(protocol_protocol.encodeMessage(event));
        };
        Connection.prototype.ping = function () {
            if (this.transport.supportsPing()) {
                this.transport.ping();
            }
            else {
                this.send_event('pusher:ping', {});
            }
        };
        Connection.prototype.close = function () {
            this.transport.close();
        };
        Connection.prototype.bindListeners = function () {
            var _this = this;
            var listeners = {
                message: function (messageEvent) {
                    var pusherEvent;
                    try {
                        pusherEvent = protocol_protocol.decodeMessage(messageEvent);
                    }
                    catch (e) {
                        _this.emit('error', {
                            type: 'MessageParseError',
                            error: e,
                            data: messageEvent.data
                        });
                    }
                    if (pusherEvent !== undefined) {
                        logger.debug('Event recd', pusherEvent);
                        switch (pusherEvent.event) {
                            case 'pusher:error':
                                _this.emit('error', {
                                    type: 'PusherError',
                                    data: pusherEvent.data
                                });
                                break;
                            case 'pusher:ping':
                                _this.emit('ping');
                                break;
                            case 'pusher:pong':
                                _this.emit('pong');
                                break;
                        }
                        _this.emit('message', pusherEvent);
                    }
                },
                activity: function () {
                    _this.emit('activity');
                },
                error: function (error) {
                    _this.emit('error', error);
                },
                closed: function (closeEvent) {
                    unbindListeners();
                    if (closeEvent && closeEvent.code) {
                        _this.handleCloseEvent(closeEvent);
                    }
                    _this.transport = null;
                    _this.emit('closed');
                }
            };
            var unbindListeners = function () {
                objectApply(listeners, function (listener, event) {
                    _this.transport.unbind(event, listener);
                });
            };
            objectApply(listeners, function (listener, event) {
                _this.transport.bind(event, listener);
            });
        };
        Connection.prototype.handleCloseEvent = function (closeEvent) {
            var action = protocol_protocol.getCloseAction(closeEvent);
            var error = protocol_protocol.getCloseError(closeEvent);
            if (error) {
                this.emit('error', error);
            }
            if (action) {
                this.emit(action, { action: action, error: error });
            }
        };
        return Connection;
    }(dispatcher));
    /* harmony default export */ var connection_connection = (connection_Connection);

    // CONCATENATED MODULE: ./src/core/connection/handshake/index.ts



    var handshake_Handshake = (function () {
        function Handshake(transport, callback) {
            this.transport = transport;
            this.callback = callback;
            this.bindListeners();
        }
        Handshake.prototype.close = function () {
            this.unbindListeners();
            this.transport.close();
        };
        Handshake.prototype.bindListeners = function () {
            var _this = this;
            this.onMessage = function (m) {
                _this.unbindListeners();
                var result;
                try {
                    result = protocol_protocol.processHandshake(m);
                }
                catch (e) {
                    _this.finish('error', { error: e });
                    _this.transport.close();
                    return;
                }
                if (result.action === 'connected') {
                    _this.finish('connected', {
                        connection: new connection_connection(result.id, _this.transport),
                        activityTimeout: result.activityTimeout
                    });
                }
                else {
                    _this.finish(result.action, { error: result.error });
                    _this.transport.close();
                }
            };
            this.onClosed = function (closeEvent) {
                _this.unbindListeners();
                var action = protocol_protocol.getCloseAction(closeEvent) || 'backoff';
                var error = protocol_protocol.getCloseError(closeEvent);
                _this.finish(action, { error: error });
            };
            this.transport.bind('message', this.onMessage);
            this.transport.bind('closed', this.onClosed);
        };
        Handshake.prototype.unbindListeners = function () {
            this.transport.unbind('message', this.onMessage);
            this.transport.unbind('closed', this.onClosed);
        };
        Handshake.prototype.finish = function (action, params) {
            this.callback(extend({ transport: this.transport, action: action }, params));
        };
        return Handshake;
    }());
    /* harmony default export */ var connection_handshake = (handshake_Handshake);

    // CONCATENATED MODULE: ./src/core/timeline/timeline_sender.ts

    var timeline_sender_TimelineSender = (function () {
        function TimelineSender(timeline, options) {
            this.timeline = timeline;
            this.options = options || {};
        }
        TimelineSender.prototype.send = function (useTLS, callback) {
            if (this.timeline.isEmpty()) {
                return;
            }
            this.timeline.send(runtime.TimelineTransport.getAgent(this, useTLS), callback);
        };
        return TimelineSender;
    }());
    /* harmony default export */ var timeline_sender = (timeline_sender_TimelineSender);

    // CONCATENATED MODULE: ./src/core/channels/channel.ts
    var channel_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();





    var channel_Channel = (function (_super) {
        channel_extends(Channel, _super);
        function Channel(name, pusher) {
            var _this = _super.call(this, function (event, data) {
                logger.debug('No callbacks on ' + name + ' for ' + event);
            }) || this;
            _this.name = name;
            _this.pusher = pusher;
            _this.subscribed = false;
            _this.subscriptionPending = false;
            _this.subscriptionCancelled = false;
            return _this;
        }
        Channel.prototype.authorize = function (socketId, callback) {
            return callback(null, { auth: '' });
        };
        Channel.prototype.trigger = function (event, data) {
            if (event.indexOf('client-') !== 0) {
                throw new BadEventName("Event '" + event + "' does not start with 'client-'");
            }
            if (!this.subscribed) {
                var suffix = url_store.buildLogSuffix('triggeringClientEvents');
                logger.warn("Client event triggered before channel 'subscription_succeeded' event . " + suffix);
            }
            return this.pusher.send_event(event, data, this.name);
        };
        Channel.prototype.disconnect = function () {
            this.subscribed = false;
            this.subscriptionPending = false;
        };
        Channel.prototype.handleEvent = function (event) {
            var eventName = event.event;
            var data = event.data;
            if (eventName === 'pusher_internal:subscription_succeeded') {
                this.handleSubscriptionSucceededEvent(event);
            }
            else if (eventName === 'pusher_internal:subscription_count') {
                this.handleSubscriptionCountEvent(event);
            }
            else if (eventName.indexOf('pusher_internal:') !== 0) {
                var metadata = {};
                this.emit(eventName, data, metadata);
            }
        };
        Channel.prototype.handleSubscriptionSucceededEvent = function (event) {
            this.subscriptionPending = false;
            this.subscribed = true;
            if (this.subscriptionCancelled) {
                this.pusher.unsubscribe(this.name);
            }
            else {
                this.emit('pusher:subscription_succeeded', event.data);
            }
        };
        Channel.prototype.handleSubscriptionCountEvent = function (event) {
            if (event.data.subscription_count) {
                this.subscriptionCount = event.data.subscription_count;
            }
            this.emit('pusher:subscription_count', event.data);
        };
        Channel.prototype.subscribe = function () {
            var _this = this;
            if (this.subscribed) {
                return;
            }
            this.subscriptionPending = true;
            this.subscriptionCancelled = false;
            this.authorize(this.pusher.connection.socket_id, function (error, data) {
                if (error) {
                    _this.subscriptionPending = false;
                    logger.error(error.toString());
                    _this.emit('pusher:subscription_error', Object.assign({}, {
                        type: 'AuthError',
                        error: error.message
                    }, error instanceof HTTPAuthError ? { status: error.status } : {}));
                }
                else {
                    _this.pusher.send_event('pusher:subscribe', {
                        auth: data.auth,
                        channel_data: data.channel_data,
                        channel: _this.name
                    });
                }
            });
        };
        Channel.prototype.unsubscribe = function () {
            this.subscribed = false;
            this.pusher.send_event('pusher:unsubscribe', {
                channel: this.name
            });
        };
        Channel.prototype.cancelSubscription = function () {
            this.subscriptionCancelled = true;
        };
        Channel.prototype.reinstateSubscription = function () {
            this.subscriptionCancelled = false;
        };
        return Channel;
    }(dispatcher));
    /* harmony default export */ var channels_channel = (channel_Channel);

    // CONCATENATED MODULE: ./src/core/channels/private_channel.ts
    var private_channel_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();

    var PrivateChannel = (function (_super) {
        private_channel_extends(PrivateChannel, _super);
        function PrivateChannel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PrivateChannel.prototype.authorize = function (socketId, callback) {
            return this.pusher.config.channelAuthorizer({
                channelName: this.name,
                socketId: socketId
            }, callback);
        };
        return PrivateChannel;
    }(channels_channel));
    /* harmony default export */ var private_channel = (PrivateChannel);

    // CONCATENATED MODULE: ./src/core/channels/members.ts

    var members_Members = (function () {
        function Members() {
            this.reset();
        }
        Members.prototype.get = function (id) {
            if (Object.prototype.hasOwnProperty.call(this.members, id)) {
                return {
                    id: id,
                    info: this.members[id]
                };
            }
            else {
                return null;
            }
        };
        Members.prototype.each = function (callback) {
            var _this = this;
            objectApply(this.members, function (member, id) {
                callback(_this.get(id));
            });
        };
        Members.prototype.setMyID = function (id) {
            this.myID = id;
        };
        Members.prototype.onSubscription = function (subscriptionData) {
            this.members = subscriptionData.presence.hash;
            this.count = subscriptionData.presence.count;
            this.me = this.get(this.myID);
        };
        Members.prototype.addMember = function (memberData) {
            if (this.get(memberData.user_id) === null) {
                this.count++;
            }
            this.members[memberData.user_id] = memberData.user_info;
            return this.get(memberData.user_id);
        };
        Members.prototype.removeMember = function (memberData) {
            var member = this.get(memberData.user_id);
            if (member) {
                delete this.members[memberData.user_id];
                this.count--;
            }
            return member;
        };
        Members.prototype.reset = function () {
            this.members = {};
            this.count = 0;
            this.myID = null;
            this.me = null;
        };
        return Members;
    }());
    /* harmony default export */ var members = (members_Members);

    // CONCATENATED MODULE: ./src/core/channels/presence_channel.ts
    var presence_channel_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __awaiter = function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };




    var presence_channel_PresenceChannel = (function (_super) {
        presence_channel_extends(PresenceChannel, _super);
        function PresenceChannel(name, pusher) {
            var _this = _super.call(this, name, pusher) || this;
            _this.members = new members();
            return _this;
        }
        PresenceChannel.prototype.authorize = function (socketId, callback) {
            var _this = this;
            _super.prototype.authorize.call(this, socketId, function (error, authData) { return __awaiter(_this, void 0, void 0, function () {
                var channelData, suffix;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!error) return [3, 3];
                            authData = authData;
                            if (!(authData.channel_data != null)) return [3, 1];
                            channelData = JSON.parse(authData.channel_data);
                            this.members.setMyID(channelData.user_id);
                            return [3, 3];
                        case 1: return [4, this.pusher.user.signinDonePromise];
                        case 2:
                            _a.sent();
                            if (this.pusher.user.user_data != null) {
                                this.members.setMyID(this.pusher.user.user_data.id);
                            }
                            else {
                                suffix = url_store.buildLogSuffix('authorizationEndpoint');
                                logger.error("Invalid auth response for channel '" + this.name + "', " +
                                    ("expected 'channel_data' field. " + suffix + ", ") +
                                    "or the user should be signed in.");
                                callback('Invalid auth response');
                                return [2];
                            }
                            _a.label = 3;
                        case 3:
                            callback(error, authData);
                            return [2];
                    }
                });
            }); });
        };
        PresenceChannel.prototype.handleEvent = function (event) {
            var eventName = event.event;
            if (eventName.indexOf('pusher_internal:') === 0) {
                this.handleInternalEvent(event);
            }
            else {
                var data = event.data;
                var metadata = {};
                if (event.user_id) {
                    metadata.user_id = event.user_id;
                }
                this.emit(eventName, data, metadata);
            }
        };
        PresenceChannel.prototype.handleInternalEvent = function (event) {
            var eventName = event.event;
            var data = event.data;
            switch (eventName) {
                case 'pusher_internal:subscription_succeeded':
                    this.handleSubscriptionSucceededEvent(event);
                    break;
                case 'pusher_internal:subscription_count':
                    this.handleSubscriptionCountEvent(event);
                    break;
                case 'pusher_internal:member_added':
                    var addedMember = this.members.addMember(data);
                    this.emit('pusher:member_added', addedMember);
                    break;
                case 'pusher_internal:member_removed':
                    var removedMember = this.members.removeMember(data);
                    if (removedMember) {
                        this.emit('pusher:member_removed', removedMember);
                    }
                    break;
            }
        };
        PresenceChannel.prototype.handleSubscriptionSucceededEvent = function (event) {
            this.subscriptionPending = false;
            this.subscribed = true;
            if (this.subscriptionCancelled) {
                this.pusher.unsubscribe(this.name);
            }
            else {
                this.members.onSubscription(event.data);
                this.emit('pusher:subscription_succeeded', this.members);
            }
        };
        PresenceChannel.prototype.disconnect = function () {
            this.members.reset();
            _super.prototype.disconnect.call(this);
        };
        return PresenceChannel;
    }(private_channel));
    /* harmony default export */ var presence_channel = (presence_channel_PresenceChannel);

    // EXTERNAL MODULE: ./node_modules/@stablelib/utf8/lib/utf8.js
    var utf8 = __webpack_require__(1);

    // EXTERNAL MODULE: ./node_modules/@stablelib/base64/lib/base64.js
    var base64 = __webpack_require__(0);

    // CONCATENATED MODULE: ./src/core/channels/encrypted_channel.ts
    var encrypted_channel_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();





    var encrypted_channel_EncryptedChannel = (function (_super) {
        encrypted_channel_extends(EncryptedChannel, _super);
        function EncryptedChannel(name, pusher, nacl) {
            var _this = _super.call(this, name, pusher) || this;
            _this.key = null;
            _this.nacl = nacl;
            return _this;
        }
        EncryptedChannel.prototype.authorize = function (socketId, callback) {
            var _this = this;
            _super.prototype.authorize.call(this, socketId, function (error, authData) {
                if (error) {
                    callback(error, authData);
                    return;
                }
                var sharedSecret = authData['shared_secret'];
                if (!sharedSecret) {
                    callback(new Error("No shared_secret key in auth payload for encrypted channel: " + _this.name), null);
                    return;
                }
                _this.key = Object(base64["decode"])(sharedSecret);
                delete authData['shared_secret'];
                callback(null, authData);
            });
        };
        EncryptedChannel.prototype.trigger = function (event, data) {
            throw new UnsupportedFeature('Client events are not currently supported for encrypted channels');
        };
        EncryptedChannel.prototype.handleEvent = function (event) {
            var eventName = event.event;
            var data = event.data;
            if (eventName.indexOf('pusher_internal:') === 0 ||
                eventName.indexOf('pusher:') === 0) {
                _super.prototype.handleEvent.call(this, event);
                return;
            }
            this.handleEncryptedEvent(eventName, data);
        };
        EncryptedChannel.prototype.handleEncryptedEvent = function (event, data) {
            var _this = this;
            if (!this.key) {
                logger.debug('Received encrypted event before key has been retrieved from the authEndpoint');
                return;
            }
            if (!data.ciphertext || !data.nonce) {
                logger.error('Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: ' +
                    data);
                return;
            }
            var cipherText = Object(base64["decode"])(data.ciphertext);
            if (cipherText.length < this.nacl.secretbox.overheadLength) {
                logger.error("Expected encrypted event ciphertext length to be " + this.nacl.secretbox.overheadLength + ", got: " + cipherText.length);
                return;
            }
            var nonce = Object(base64["decode"])(data.nonce);
            if (nonce.length < this.nacl.secretbox.nonceLength) {
                logger.error("Expected encrypted event nonce length to be " + this.nacl.secretbox.nonceLength + ", got: " + nonce.length);
                return;
            }
            var bytes = this.nacl.secretbox.open(cipherText, nonce, this.key);
            if (bytes === null) {
                logger.debug('Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint...');
                this.authorize(this.pusher.connection.socket_id, function (error, authData) {
                    if (error) {
                        logger.error("Failed to make a request to the authEndpoint: " + authData + ". Unable to fetch new key, so dropping encrypted event");
                        return;
                    }
                    bytes = _this.nacl.secretbox.open(cipherText, nonce, _this.key);
                    if (bytes === null) {
                        logger.error("Failed to decrypt event with new key. Dropping encrypted event");
                        return;
                    }
                    _this.emit(event, _this.getDataToEmit(bytes));
                    return;
                });
                return;
            }
            this.emit(event, this.getDataToEmit(bytes));
        };
        EncryptedChannel.prototype.getDataToEmit = function (bytes) {
            var raw = Object(utf8["decode"])(bytes);
            try {
                return JSON.parse(raw);
            }
            catch (_a) {
                return raw;
            }
        };
        return EncryptedChannel;
    }(private_channel));
    /* harmony default export */ var encrypted_channel = (encrypted_channel_EncryptedChannel);

    // CONCATENATED MODULE: ./src/core/connection/connection_manager.ts
    var connection_manager_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();





    var connection_manager_ConnectionManager = (function (_super) {
        connection_manager_extends(ConnectionManager, _super);
        function ConnectionManager(key, options) {
            var _this = _super.call(this) || this;
            _this.state = 'initialized';
            _this.connection = null;
            _this.key = key;
            _this.options = options;
            _this.timeline = _this.options.timeline;
            _this.usingTLS = _this.options.useTLS;
            _this.errorCallbacks = _this.buildErrorCallbacks();
            _this.connectionCallbacks = _this.buildConnectionCallbacks(_this.errorCallbacks);
            _this.handshakeCallbacks = _this.buildHandshakeCallbacks(_this.errorCallbacks);
            var Network = runtime.getNetwork();
            Network.bind('online', function () {
                _this.timeline.info({ netinfo: 'online' });
                if (_this.state === 'connecting' || _this.state === 'unavailable') {
                    _this.retryIn(0);
                }
            });
            Network.bind('offline', function () {
                _this.timeline.info({ netinfo: 'offline' });
                if (_this.connection) {
                    _this.sendActivityCheck();
                }
            });
            _this.updateStrategy();
            return _this;
        }
        ConnectionManager.prototype.connect = function () {
            if (this.connection || this.runner) {
                return;
            }
            if (!this.strategy.isSupported()) {
                this.updateState('failed');
                return;
            }
            this.updateState('connecting');
            this.startConnecting();
            this.setUnavailableTimer();
        };
        ConnectionManager.prototype.send = function (data) {
            if (this.connection) {
                return this.connection.send(data);
            }
            else {
                return false;
            }
        };
        ConnectionManager.prototype.send_event = function (name, data, channel) {
            if (this.connection) {
                return this.connection.send_event(name, data, channel);
            }
            else {
                return false;
            }
        };
        ConnectionManager.prototype.disconnect = function () {
            this.disconnectInternally();
            this.updateState('disconnected');
        };
        ConnectionManager.prototype.isUsingTLS = function () {
            return this.usingTLS;
        };
        ConnectionManager.prototype.startConnecting = function () {
            var _this = this;
            var callback = function (error, handshake) {
                if (error) {
                    _this.runner = _this.strategy.connect(0, callback);
                }
                else {
                    if (handshake.action === 'error') {
                        _this.emit('error', {
                            type: 'HandshakeError',
                            error: handshake.error
                        });
                        _this.timeline.error({ handshakeError: handshake.error });
                    }
                    else {
                        _this.abortConnecting();
                        _this.handshakeCallbacks[handshake.action](handshake);
                    }
                }
            };
            this.runner = this.strategy.connect(0, callback);
        };
        ConnectionManager.prototype.abortConnecting = function () {
            if (this.runner) {
                this.runner.abort();
                this.runner = null;
            }
        };
        ConnectionManager.prototype.disconnectInternally = function () {
            this.abortConnecting();
            this.clearRetryTimer();
            this.clearUnavailableTimer();
            if (this.connection) {
                var connection = this.abandonConnection();
                connection.close();
            }
        };
        ConnectionManager.prototype.updateStrategy = function () {
            this.strategy = this.options.getStrategy({
                key: this.key,
                timeline: this.timeline,
                useTLS: this.usingTLS
            });
        };
        ConnectionManager.prototype.retryIn = function (delay) {
            var _this = this;
            this.timeline.info({ action: 'retry', delay: delay });
            if (delay > 0) {
                this.emit('connecting_in', Math.round(delay / 1000));
            }
            this.retryTimer = new OneOffTimer(delay || 0, function () {
                _this.disconnectInternally();
                _this.connect();
            });
        };
        ConnectionManager.prototype.clearRetryTimer = function () {
            if (this.retryTimer) {
                this.retryTimer.ensureAborted();
                this.retryTimer = null;
            }
        };
        ConnectionManager.prototype.setUnavailableTimer = function () {
            var _this = this;
            this.unavailableTimer = new OneOffTimer(this.options.unavailableTimeout, function () {
                _this.updateState('unavailable');
            });
        };
        ConnectionManager.prototype.clearUnavailableTimer = function () {
            if (this.unavailableTimer) {
                this.unavailableTimer.ensureAborted();
            }
        };
        ConnectionManager.prototype.sendActivityCheck = function () {
            var _this = this;
            this.stopActivityCheck();
            this.connection.ping();
            this.activityTimer = new OneOffTimer(this.options.pongTimeout, function () {
                _this.timeline.error({ pong_timed_out: _this.options.pongTimeout });
                _this.retryIn(0);
            });
        };
        ConnectionManager.prototype.resetActivityCheck = function () {
            var _this = this;
            this.stopActivityCheck();
            if (this.connection && !this.connection.handlesActivityChecks()) {
                this.activityTimer = new OneOffTimer(this.activityTimeout, function () {
                    _this.sendActivityCheck();
                });
            }
        };
        ConnectionManager.prototype.stopActivityCheck = function () {
            if (this.activityTimer) {
                this.activityTimer.ensureAborted();
            }
        };
        ConnectionManager.prototype.buildConnectionCallbacks = function (errorCallbacks) {
            var _this = this;
            return extend({}, errorCallbacks, {
                message: function (message) {
                    _this.resetActivityCheck();
                    _this.emit('message', message);
                },
                ping: function () {
                    _this.send_event('pusher:pong', {});
                },
                activity: function () {
                    _this.resetActivityCheck();
                },
                error: function (error) {
                    _this.emit('error', error);
                },
                closed: function () {
                    _this.abandonConnection();
                    if (_this.shouldRetry()) {
                        _this.retryIn(1000);
                    }
                }
            });
        };
        ConnectionManager.prototype.buildHandshakeCallbacks = function (errorCallbacks) {
            var _this = this;
            return extend({}, errorCallbacks, {
                connected: function (handshake) {
                    _this.activityTimeout = Math.min(_this.options.activityTimeout, handshake.activityTimeout, handshake.connection.activityTimeout || Infinity);
                    _this.clearUnavailableTimer();
                    _this.setConnection(handshake.connection);
                    _this.socket_id = _this.connection.id;
                    _this.updateState('connected', { socket_id: _this.socket_id });
                }
            });
        };
        ConnectionManager.prototype.buildErrorCallbacks = function () {
            var _this = this;
            var withErrorEmitted = function (callback) {
                return function (result) {
                    if (result.error) {
                        _this.emit('error', { type: 'WebSocketError', error: result.error });
                    }
                    callback(result);
                };
            };
            return {
                tls_only: withErrorEmitted(function () {
                    _this.usingTLS = true;
                    _this.updateStrategy();
                    _this.retryIn(0);
                }),
                refused: withErrorEmitted(function () {
                    _this.disconnect();
                }),
                backoff: withErrorEmitted(function () {
                    _this.retryIn(1000);
                }),
                retry: withErrorEmitted(function () {
                    _this.retryIn(0);
                })
            };
        };
        ConnectionManager.prototype.setConnection = function (connection) {
            this.connection = connection;
            for (var event in this.connectionCallbacks) {
                this.connection.bind(event, this.connectionCallbacks[event]);
            }
            this.resetActivityCheck();
        };
        ConnectionManager.prototype.abandonConnection = function () {
            if (!this.connection) {
                return;
            }
            this.stopActivityCheck();
            for (var event in this.connectionCallbacks) {
                this.connection.unbind(event, this.connectionCallbacks[event]);
            }
            var connection = this.connection;
            this.connection = null;
            return connection;
        };
        ConnectionManager.prototype.updateState = function (newState, data) {
            var previousState = this.state;
            this.state = newState;
            if (previousState !== newState) {
                var newStateDescription = newState;
                if (newStateDescription === 'connected') {
                    newStateDescription += ' with new socket ID ' + data.socket_id;
                }
                logger.debug('State changed', previousState + ' -> ' + newStateDescription);
                this.timeline.info({ state: newState, params: data });
                this.emit('state_change', { previous: previousState, current: newState });
                this.emit(newState, data);
            }
        };
        ConnectionManager.prototype.shouldRetry = function () {
            return this.state === 'connecting' || this.state === 'connected';
        };
        return ConnectionManager;
    }(dispatcher));
    /* harmony default export */ var connection_manager = (connection_manager_ConnectionManager);

    // CONCATENATED MODULE: ./src/core/channels/channels.ts




    var channels_Channels = (function () {
        function Channels() {
            this.channels = {};
        }
        Channels.prototype.add = function (name, pusher) {
            if (!this.channels[name]) {
                this.channels[name] = createChannel(name, pusher);
            }
            return this.channels[name];
        };
        Channels.prototype.all = function () {
            return values(this.channels);
        };
        Channels.prototype.find = function (name) {
            return this.channels[name];
        };
        Channels.prototype.remove = function (name) {
            var channel = this.channels[name];
            delete this.channels[name];
            return channel;
        };
        Channels.prototype.disconnect = function () {
            objectApply(this.channels, function (channel) {
                channel.disconnect();
            });
        };
        return Channels;
    }());
    /* harmony default export */ var channels = (channels_Channels);
    function createChannel(name, pusher) {
        if (name.indexOf('private-encrypted-') === 0) {
            if (pusher.config.nacl) {
                return factory.createEncryptedChannel(name, pusher, pusher.config.nacl);
            }
            var errMsg = 'Tried to subscribe to a private-encrypted- channel but no nacl implementation available';
            var suffix = url_store.buildLogSuffix('encryptedChannelSupport');
            throw new UnsupportedFeature(errMsg + ". " + suffix);
        }
        else if (name.indexOf('private-') === 0) {
            return factory.createPrivateChannel(name, pusher);
        }
        else if (name.indexOf('presence-') === 0) {
            return factory.createPresenceChannel(name, pusher);
        }
        else if (name.indexOf('#') === 0) {
            throw new BadChannelName('Cannot create a channel with name "' + name + '".');
        }
        else {
            return factory.createChannel(name, pusher);
        }
    }

    // CONCATENATED MODULE: ./src/core/utils/factory.ts









    var Factory = {
        createChannels: function () {
            return new channels();
        },
        createConnectionManager: function (key, options) {
            return new connection_manager(key, options);
        },
        createChannel: function (name, pusher) {
            return new channels_channel(name, pusher);
        },
        createPrivateChannel: function (name, pusher) {
            return new private_channel(name, pusher);
        },
        createPresenceChannel: function (name, pusher) {
            return new presence_channel(name, pusher);
        },
        createEncryptedChannel: function (name, pusher, nacl) {
            return new encrypted_channel(name, pusher, nacl);
        },
        createTimelineSender: function (timeline, options) {
            return new timeline_sender(timeline, options);
        },
        createHandshake: function (transport, callback) {
            return new connection_handshake(transport, callback);
        },
        createAssistantToTheTransportManager: function (manager, transport, options) {
            return new assistant_to_the_transport_manager(manager, transport, options);
        }
    };
    /* harmony default export */ var factory = (Factory);

    // CONCATENATED MODULE: ./src/core/transports/transport_manager.ts

    var transport_manager_TransportManager = (function () {
        function TransportManager(options) {
            this.options = options || {};
            this.livesLeft = this.options.lives || Infinity;
        }
        TransportManager.prototype.getAssistant = function (transport) {
            return factory.createAssistantToTheTransportManager(this, transport, {
                minPingDelay: this.options.minPingDelay,
                maxPingDelay: this.options.maxPingDelay
            });
        };
        TransportManager.prototype.isAlive = function () {
            return this.livesLeft > 0;
        };
        TransportManager.prototype.reportDeath = function () {
            this.livesLeft -= 1;
        };
        return TransportManager;
    }());
    /* harmony default export */ var transport_manager = (transport_manager_TransportManager);

    // CONCATENATED MODULE: ./src/core/strategies/sequential_strategy.ts



    var sequential_strategy_SequentialStrategy = (function () {
        function SequentialStrategy(strategies, options) {
            this.strategies = strategies;
            this.loop = Boolean(options.loop);
            this.failFast = Boolean(options.failFast);
            this.timeout = options.timeout;
            this.timeoutLimit = options.timeoutLimit;
        }
        SequentialStrategy.prototype.isSupported = function () {
            return any(this.strategies, util.method('isSupported'));
        };
        SequentialStrategy.prototype.connect = function (minPriority, callback) {
            var _this = this;
            var strategies = this.strategies;
            var current = 0;
            var timeout = this.timeout;
            var runner = null;
            var tryNextStrategy = function (error, handshake) {
                if (handshake) {
                    callback(null, handshake);
                }
                else {
                    current = current + 1;
                    if (_this.loop) {
                        current = current % strategies.length;
                    }
                    if (current < strategies.length) {
                        if (timeout) {
                            timeout = timeout * 2;
                            if (_this.timeoutLimit) {
                                timeout = Math.min(timeout, _this.timeoutLimit);
                            }
                        }
                        runner = _this.tryStrategy(strategies[current], minPriority, { timeout: timeout, failFast: _this.failFast }, tryNextStrategy);
                    }
                    else {
                        callback(true);
                    }
                }
            };
            runner = this.tryStrategy(strategies[current], minPriority, { timeout: timeout, failFast: this.failFast }, tryNextStrategy);
            return {
                abort: function () {
                    runner.abort();
                },
                forceMinPriority: function (p) {
                    minPriority = p;
                    if (runner) {
                        runner.forceMinPriority(p);
                    }
                }
            };
        };
        SequentialStrategy.prototype.tryStrategy = function (strategy, minPriority, options, callback) {
            var timer = null;
            var runner = null;
            if (options.timeout > 0) {
                timer = new OneOffTimer(options.timeout, function () {
                    runner.abort();
                    callback(true);
                });
            }
            runner = strategy.connect(minPriority, function (error, handshake) {
                if (error && timer && timer.isRunning() && !options.failFast) {
                    return;
                }
                if (timer) {
                    timer.ensureAborted();
                }
                callback(error, handshake);
            });
            return {
                abort: function () {
                    if (timer) {
                        timer.ensureAborted();
                    }
                    runner.abort();
                },
                forceMinPriority: function (p) {
                    runner.forceMinPriority(p);
                }
            };
        };
        return SequentialStrategy;
    }());
    /* harmony default export */ var sequential_strategy = (sequential_strategy_SequentialStrategy);

    // CONCATENATED MODULE: ./src/core/strategies/best_connected_ever_strategy.ts


    var best_connected_ever_strategy_BestConnectedEverStrategy = (function () {
        function BestConnectedEverStrategy(strategies) {
            this.strategies = strategies;
        }
        BestConnectedEverStrategy.prototype.isSupported = function () {
            return any(this.strategies, util.method('isSupported'));
        };
        BestConnectedEverStrategy.prototype.connect = function (minPriority, callback) {
            return connect(this.strategies, minPriority, function (i, runners) {
                return function (error, handshake) {
                    runners[i].error = error;
                    if (error) {
                        if (allRunnersFailed(runners)) {
                            callback(true);
                        }
                        return;
                    }
                    apply(runners, function (runner) {
                        runner.forceMinPriority(handshake.transport.priority);
                    });
                    callback(null, handshake);
                };
            });
        };
        return BestConnectedEverStrategy;
    }());
    /* harmony default export */ var best_connected_ever_strategy = (best_connected_ever_strategy_BestConnectedEverStrategy);
    function connect(strategies, minPriority, callbackBuilder) {
        var runners = map(strategies, function (strategy, i, _, rs) {
            return strategy.connect(minPriority, callbackBuilder(i, rs));
        });
        return {
            abort: function () {
                apply(runners, abortRunner);
            },
            forceMinPriority: function (p) {
                apply(runners, function (runner) {
                    runner.forceMinPriority(p);
                });
            }
        };
    }
    function allRunnersFailed(runners) {
        return collections_all(runners, function (runner) {
            return Boolean(runner.error);
        });
    }
    function abortRunner(runner) {
        if (!runner.error && !runner.aborted) {
            runner.abort();
            runner.aborted = true;
        }
    }

    // CONCATENATED MODULE: ./src/core/strategies/cached_strategy.ts




    var cached_strategy_CachedStrategy = (function () {
        function CachedStrategy(strategy, transports, options) {
            this.strategy = strategy;
            this.transports = transports;
            this.ttl = options.ttl || 1800 * 1000;
            this.usingTLS = options.useTLS;
            this.timeline = options.timeline;
        }
        CachedStrategy.prototype.isSupported = function () {
            return this.strategy.isSupported();
        };
        CachedStrategy.prototype.connect = function (minPriority, callback) {
            var usingTLS = this.usingTLS;
            var info = fetchTransportCache(usingTLS);
            var strategies = [this.strategy];
            if (info && info.timestamp + this.ttl >= util.now()) {
                var transport = this.transports[info.transport];
                if (transport) {
                    this.timeline.info({
                        cached: true,
                        transport: info.transport,
                        latency: info.latency
                    });
                    strategies.push(new sequential_strategy([transport], {
                        timeout: info.latency * 2 + 1000,
                        failFast: true
                    }));
                }
            }
            var startTimestamp = util.now();
            var runner = strategies
                .pop()
                .connect(minPriority, function cb(error, handshake) {
                if (error) {
                    flushTransportCache(usingTLS);
                    if (strategies.length > 0) {
                        startTimestamp = util.now();
                        runner = strategies.pop().connect(minPriority, cb);
                    }
                    else {
                        callback(error);
                    }
                }
                else {
                    storeTransportCache(usingTLS, handshake.transport.name, util.now() - startTimestamp);
                    callback(null, handshake);
                }
            });
            return {
                abort: function () {
                    runner.abort();
                },
                forceMinPriority: function (p) {
                    minPriority = p;
                    if (runner) {
                        runner.forceMinPriority(p);
                    }
                }
            };
        };
        return CachedStrategy;
    }());
    /* harmony default export */ var cached_strategy = (cached_strategy_CachedStrategy);
    function getTransportCacheKey(usingTLS) {
        return 'pusherTransport' + (usingTLS ? 'TLS' : 'NonTLS');
    }
    function fetchTransportCache(usingTLS) {
        var storage = runtime.getLocalStorage();
        if (storage) {
            try {
                var serializedCache = storage[getTransportCacheKey(usingTLS)];
                if (serializedCache) {
                    return JSON.parse(serializedCache);
                }
            }
            catch (e) {
                flushTransportCache(usingTLS);
            }
        }
        return null;
    }
    function storeTransportCache(usingTLS, transport, latency) {
        var storage = runtime.getLocalStorage();
        if (storage) {
            try {
                storage[getTransportCacheKey(usingTLS)] = safeJSONStringify({
                    timestamp: util.now(),
                    transport: transport,
                    latency: latency
                });
            }
            catch (e) {
            }
        }
    }
    function flushTransportCache(usingTLS) {
        var storage = runtime.getLocalStorage();
        if (storage) {
            try {
                delete storage[getTransportCacheKey(usingTLS)];
            }
            catch (e) {
            }
        }
    }

    // CONCATENATED MODULE: ./src/core/strategies/delayed_strategy.ts

    var delayed_strategy_DelayedStrategy = (function () {
        function DelayedStrategy(strategy, _a) {
            var number = _a.delay;
            this.strategy = strategy;
            this.options = { delay: number };
        }
        DelayedStrategy.prototype.isSupported = function () {
            return this.strategy.isSupported();
        };
        DelayedStrategy.prototype.connect = function (minPriority, callback) {
            var strategy = this.strategy;
            var runner;
            var timer = new OneOffTimer(this.options.delay, function () {
                runner = strategy.connect(minPriority, callback);
            });
            return {
                abort: function () {
                    timer.ensureAborted();
                    if (runner) {
                        runner.abort();
                    }
                },
                forceMinPriority: function (p) {
                    minPriority = p;
                    if (runner) {
                        runner.forceMinPriority(p);
                    }
                }
            };
        };
        return DelayedStrategy;
    }());
    /* harmony default export */ var delayed_strategy = (delayed_strategy_DelayedStrategy);

    // CONCATENATED MODULE: ./src/core/strategies/if_strategy.ts
    var IfStrategy = (function () {
        function IfStrategy(test, trueBranch, falseBranch) {
            this.test = test;
            this.trueBranch = trueBranch;
            this.falseBranch = falseBranch;
        }
        IfStrategy.prototype.isSupported = function () {
            var branch = this.test() ? this.trueBranch : this.falseBranch;
            return branch.isSupported();
        };
        IfStrategy.prototype.connect = function (minPriority, callback) {
            var branch = this.test() ? this.trueBranch : this.falseBranch;
            return branch.connect(minPriority, callback);
        };
        return IfStrategy;
    }());
    /* harmony default export */ var if_strategy = (IfStrategy);

    // CONCATENATED MODULE: ./src/core/strategies/first_connected_strategy.ts
    var FirstConnectedStrategy = (function () {
        function FirstConnectedStrategy(strategy) {
            this.strategy = strategy;
        }
        FirstConnectedStrategy.prototype.isSupported = function () {
            return this.strategy.isSupported();
        };
        FirstConnectedStrategy.prototype.connect = function (minPriority, callback) {
            var runner = this.strategy.connect(minPriority, function (error, handshake) {
                if (handshake) {
                    runner.abort();
                }
                callback(error, handshake);
            });
            return runner;
        };
        return FirstConnectedStrategy;
    }());
    /* harmony default export */ var first_connected_strategy = (FirstConnectedStrategy);

    // CONCATENATED MODULE: ./src/runtimes/web/default_strategy.ts







    function testSupportsStrategy(strategy) {
        return function () {
            return strategy.isSupported();
        };
    }
    var getDefaultStrategy = function (config, baseOptions, defineTransport) {
        var definedTransports = {};
        function defineTransportStrategy(name, type, priority, options, manager) {
            var transport = defineTransport(config, name, type, priority, options, manager);
            definedTransports[name] = transport;
            return transport;
        }
        var ws_options = Object.assign({}, baseOptions, {
            hostNonTLS: config.wsHost + ':' + config.wsPort,
            hostTLS: config.wsHost + ':' + config.wssPort,
            httpPath: config.wsPath
        });
        var wss_options = Object.assign({}, ws_options, {
            useTLS: true
        });
        var sockjs_options = Object.assign({}, baseOptions, {
            hostNonTLS: config.httpHost + ':' + config.httpPort,
            hostTLS: config.httpHost + ':' + config.httpsPort,
            httpPath: config.httpPath
        });
        var timeouts = {
            loop: true,
            timeout: 15000,
            timeoutLimit: 60000
        };
        var ws_manager = new transport_manager({
            lives: 2,
            minPingDelay: 10000,
            maxPingDelay: config.activityTimeout
        });
        var streaming_manager = new transport_manager({
            lives: 2,
            minPingDelay: 10000,
            maxPingDelay: config.activityTimeout
        });
        var ws_transport = defineTransportStrategy('ws', 'ws', 3, ws_options, ws_manager);
        var wss_transport = defineTransportStrategy('wss', 'ws', 3, wss_options, ws_manager);
        var sockjs_transport = defineTransportStrategy('sockjs', 'sockjs', 1, sockjs_options);
        var xhr_streaming_transport = defineTransportStrategy('xhr_streaming', 'xhr_streaming', 1, sockjs_options, streaming_manager);
        var xdr_streaming_transport = defineTransportStrategy('xdr_streaming', 'xdr_streaming', 1, sockjs_options, streaming_manager);
        var xhr_polling_transport = defineTransportStrategy('xhr_polling', 'xhr_polling', 1, sockjs_options);
        var xdr_polling_transport = defineTransportStrategy('xdr_polling', 'xdr_polling', 1, sockjs_options);
        var ws_loop = new sequential_strategy([ws_transport], timeouts);
        var wss_loop = new sequential_strategy([wss_transport], timeouts);
        var sockjs_loop = new sequential_strategy([sockjs_transport], timeouts);
        var streaming_loop = new sequential_strategy([
            new if_strategy(testSupportsStrategy(xhr_streaming_transport), xhr_streaming_transport, xdr_streaming_transport)
        ], timeouts);
        var polling_loop = new sequential_strategy([
            new if_strategy(testSupportsStrategy(xhr_polling_transport), xhr_polling_transport, xdr_polling_transport)
        ], timeouts);
        var http_loop = new sequential_strategy([
            new if_strategy(testSupportsStrategy(streaming_loop), new best_connected_ever_strategy([
                streaming_loop,
                new delayed_strategy(polling_loop, { delay: 4000 })
            ]), polling_loop)
        ], timeouts);
        var http_fallback_loop = new if_strategy(testSupportsStrategy(http_loop), http_loop, sockjs_loop);
        var wsStrategy;
        if (baseOptions.useTLS) {
            wsStrategy = new best_connected_ever_strategy([
                ws_loop,
                new delayed_strategy(http_fallback_loop, { delay: 2000 })
            ]);
        }
        else {
            wsStrategy = new best_connected_ever_strategy([
                ws_loop,
                new delayed_strategy(wss_loop, { delay: 2000 }),
                new delayed_strategy(http_fallback_loop, { delay: 5000 })
            ]);
        }
        return new cached_strategy(new first_connected_strategy(new if_strategy(testSupportsStrategy(ws_transport), wsStrategy, http_fallback_loop)), definedTransports, {
            ttl: 1800000,
            timeline: baseOptions.timeline,
            useTLS: baseOptions.useTLS
        });
    };
    /* harmony default export */ var default_strategy = (getDefaultStrategy);

    // CONCATENATED MODULE: ./src/runtimes/web/transports/transport_connection_initializer.ts

    /* harmony default export */ var transport_connection_initializer = (function () {
        var self = this;
        self.timeline.info(self.buildTimelineMessage({
            transport: self.name + (self.options.useTLS ? 's' : '')
        }));
        if (self.hooks.isInitialized()) {
            self.changeState('initialized');
        }
        else if (self.hooks.file) {
            self.changeState('initializing');
            Dependencies.load(self.hooks.file, { useTLS: self.options.useTLS }, function (error, callback) {
                if (self.hooks.isInitialized()) {
                    self.changeState('initialized');
                    callback(true);
                }
                else {
                    if (error) {
                        self.onError(error);
                    }
                    self.onClose();
                    callback(false);
                }
            });
        }
        else {
            self.onClose();
        }
    });

    // CONCATENATED MODULE: ./src/runtimes/web/http/http_xdomain_request.ts

    var http_xdomain_request_hooks = {
        getRequest: function (socket) {
            var xdr = new window.XDomainRequest();
            xdr.ontimeout = function () {
                socket.emit('error', new RequestTimedOut());
                socket.close();
            };
            xdr.onerror = function (e) {
                socket.emit('error', e);
                socket.close();
            };
            xdr.onprogress = function () {
                if (xdr.responseText && xdr.responseText.length > 0) {
                    socket.onChunk(200, xdr.responseText);
                }
            };
            xdr.onload = function () {
                if (xdr.responseText && xdr.responseText.length > 0) {
                    socket.onChunk(200, xdr.responseText);
                }
                socket.emit('finished', 200);
                socket.close();
            };
            return xdr;
        },
        abortRequest: function (xdr) {
            xdr.ontimeout = xdr.onerror = xdr.onprogress = xdr.onload = null;
            xdr.abort();
        }
    };
    /* harmony default export */ var http_xdomain_request = (http_xdomain_request_hooks);

    // CONCATENATED MODULE: ./src/core/http/http_request.ts
    var http_request_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();


    var MAX_BUFFER_LENGTH = 256 * 1024;
    var http_request_HTTPRequest = (function (_super) {
        http_request_extends(HTTPRequest, _super);
        function HTTPRequest(hooks, method, url) {
            var _this = _super.call(this) || this;
            _this.hooks = hooks;
            _this.method = method;
            _this.url = url;
            return _this;
        }
        HTTPRequest.prototype.start = function (payload) {
            var _this = this;
            this.position = 0;
            this.xhr = this.hooks.getRequest(this);
            this.unloader = function () {
                _this.close();
            };
            runtime.addUnloadListener(this.unloader);
            this.xhr.open(this.method, this.url, true);
            if (this.xhr.setRequestHeader) {
                this.xhr.setRequestHeader('Content-Type', 'application/json');
            }
            this.xhr.send(payload);
        };
        HTTPRequest.prototype.close = function () {
            if (this.unloader) {
                runtime.removeUnloadListener(this.unloader);
                this.unloader = null;
            }
            if (this.xhr) {
                this.hooks.abortRequest(this.xhr);
                this.xhr = null;
            }
        };
        HTTPRequest.prototype.onChunk = function (status, data) {
            while (true) {
                var chunk = this.advanceBuffer(data);
                if (chunk) {
                    this.emit('chunk', { status: status, data: chunk });
                }
                else {
                    break;
                }
            }
            if (this.isBufferTooLong(data)) {
                this.emit('buffer_too_long');
            }
        };
        HTTPRequest.prototype.advanceBuffer = function (buffer) {
            var unreadData = buffer.slice(this.position);
            var endOfLinePosition = unreadData.indexOf('\n');
            if (endOfLinePosition !== -1) {
                this.position += endOfLinePosition + 1;
                return unreadData.slice(0, endOfLinePosition);
            }
            else {
                return null;
            }
        };
        HTTPRequest.prototype.isBufferTooLong = function (buffer) {
            return this.position === buffer.length && buffer.length > MAX_BUFFER_LENGTH;
        };
        return HTTPRequest;
    }(dispatcher));
    /* harmony default export */ var http_request = (http_request_HTTPRequest);

    // CONCATENATED MODULE: ./src/core/http/state.ts
    var State;
    (function (State) {
        State[State["CONNECTING"] = 0] = "CONNECTING";
        State[State["OPEN"] = 1] = "OPEN";
        State[State["CLOSED"] = 3] = "CLOSED";
    })(State || (State = {}));
    /* harmony default export */ var state = (State);

    // CONCATENATED MODULE: ./src/core/http/http_socket.ts



    var autoIncrement = 1;
    var http_socket_HTTPSocket = (function () {
        function HTTPSocket(hooks, url) {
            this.hooks = hooks;
            this.session = randomNumber(1000) + '/' + randomString(8);
            this.location = getLocation(url);
            this.readyState = state.CONNECTING;
            this.openStream();
        }
        HTTPSocket.prototype.send = function (payload) {
            return this.sendRaw(JSON.stringify([payload]));
        };
        HTTPSocket.prototype.ping = function () {
            this.hooks.sendHeartbeat(this);
        };
        HTTPSocket.prototype.close = function (code, reason) {
            this.onClose(code, reason, true);
        };
        HTTPSocket.prototype.sendRaw = function (payload) {
            if (this.readyState === state.OPEN) {
                try {
                    runtime.createSocketRequest('POST', getUniqueURL(getSendURL(this.location, this.session))).start(payload);
                    return true;
                }
                catch (e) {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        HTTPSocket.prototype.reconnect = function () {
            this.closeStream();
            this.openStream();
        };
        HTTPSocket.prototype.onClose = function (code, reason, wasClean) {
            this.closeStream();
            this.readyState = state.CLOSED;
            if (this.onclose) {
                this.onclose({
                    code: code,
                    reason: reason,
                    wasClean: wasClean
                });
            }
        };
        HTTPSocket.prototype.onChunk = function (chunk) {
            if (chunk.status !== 200) {
                return;
            }
            if (this.readyState === state.OPEN) {
                this.onActivity();
            }
            var payload;
            var type = chunk.data.slice(0, 1);
            switch (type) {
                case 'o':
                    payload = JSON.parse(chunk.data.slice(1) || '{}');
                    this.onOpen(payload);
                    break;
                case 'a':
                    payload = JSON.parse(chunk.data.slice(1) || '[]');
                    for (var i = 0; i < payload.length; i++) {
                        this.onEvent(payload[i]);
                    }
                    break;
                case 'm':
                    payload = JSON.parse(chunk.data.slice(1) || 'null');
                    this.onEvent(payload);
                    break;
                case 'h':
                    this.hooks.onHeartbeat(this);
                    break;
                case 'c':
                    payload = JSON.parse(chunk.data.slice(1) || '[]');
                    this.onClose(payload[0], payload[1], true);
                    break;
            }
        };
        HTTPSocket.prototype.onOpen = function (options) {
            if (this.readyState === state.CONNECTING) {
                if (options && options.hostname) {
                    this.location.base = replaceHost(this.location.base, options.hostname);
                }
                this.readyState = state.OPEN;
                if (this.onopen) {
                    this.onopen();
                }
            }
            else {
                this.onClose(1006, 'Server lost session', true);
            }
        };
        HTTPSocket.prototype.onEvent = function (event) {
            if (this.readyState === state.OPEN && this.onmessage) {
                this.onmessage({ data: event });
            }
        };
        HTTPSocket.prototype.onActivity = function () {
            if (this.onactivity) {
                this.onactivity();
            }
        };
        HTTPSocket.prototype.onError = function (error) {
            if (this.onerror) {
                this.onerror(error);
            }
        };
        HTTPSocket.prototype.openStream = function () {
            var _this = this;
            this.stream = runtime.createSocketRequest('POST', getUniqueURL(this.hooks.getReceiveURL(this.location, this.session)));
            this.stream.bind('chunk', function (chunk) {
                _this.onChunk(chunk);
            });
            this.stream.bind('finished', function (status) {
                _this.hooks.onFinished(_this, status);
            });
            this.stream.bind('buffer_too_long', function () {
                _this.reconnect();
            });
            try {
                this.stream.start();
            }
            catch (error) {
                util.defer(function () {
                    _this.onError(error);
                    _this.onClose(1006, 'Could not start streaming', false);
                });
            }
        };
        HTTPSocket.prototype.closeStream = function () {
            if (this.stream) {
                this.stream.unbind_all();
                this.stream.close();
                this.stream = null;
            }
        };
        return HTTPSocket;
    }());
    function getLocation(url) {
        var parts = /([^\?]*)\/*(\??.*)/.exec(url);
        return {
            base: parts[1],
            queryString: parts[2]
        };
    }
    function getSendURL(url, session) {
        return url.base + '/' + session + '/xhr_send';
    }
    function getUniqueURL(url) {
        var separator = url.indexOf('?') === -1 ? '?' : '&';
        return url + separator + 't=' + +new Date() + '&n=' + autoIncrement++;
    }
    function replaceHost(url, hostname) {
        var urlParts = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(url);
        return urlParts[1] + hostname + urlParts[3];
    }
    function randomNumber(max) {
        return Math.floor(Math.random() * max);
    }
    function randomString(length) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result.push(randomNumber(32).toString(32));
        }
        return result.join('');
    }
    /* harmony default export */ var http_socket = (http_socket_HTTPSocket);

    // CONCATENATED MODULE: ./src/core/http/http_streaming_socket.ts
    var http_streaming_socket_hooks = {
        getReceiveURL: function (url, session) {
            return url.base + '/' + session + '/xhr_streaming' + url.queryString;
        },
        onHeartbeat: function (socket) {
            socket.sendRaw('[]');
        },
        sendHeartbeat: function (socket) {
            socket.sendRaw('[]');
        },
        onFinished: function (socket, status) {
            socket.onClose(1006, 'Connection interrupted (' + status + ')', false);
        }
    };
    /* harmony default export */ var http_streaming_socket = (http_streaming_socket_hooks);

    // CONCATENATED MODULE: ./src/core/http/http_polling_socket.ts
    var http_polling_socket_hooks = {
        getReceiveURL: function (url, session) {
            return url.base + '/' + session + '/xhr' + url.queryString;
        },
        onHeartbeat: function () {
        },
        sendHeartbeat: function (socket) {
            socket.sendRaw('[]');
        },
        onFinished: function (socket, status) {
            if (status === 200) {
                socket.reconnect();
            }
            else {
                socket.onClose(1006, 'Connection interrupted (' + status + ')', false);
            }
        }
    };
    /* harmony default export */ var http_polling_socket = (http_polling_socket_hooks);

    // CONCATENATED MODULE: ./src/runtimes/isomorphic/http/http_xhr_request.ts

    var http_xhr_request_hooks = {
        getRequest: function (socket) {
            var Constructor = runtime.getXHRAPI();
            var xhr = new Constructor();
            xhr.onreadystatechange = xhr.onprogress = function () {
                switch (xhr.readyState) {
                    case 3:
                        if (xhr.responseText && xhr.responseText.length > 0) {
                            socket.onChunk(xhr.status, xhr.responseText);
                        }
                        break;
                    case 4:
                        if (xhr.responseText && xhr.responseText.length > 0) {
                            socket.onChunk(xhr.status, xhr.responseText);
                        }
                        socket.emit('finished', xhr.status);
                        socket.close();
                        break;
                }
            };
            return xhr;
        },
        abortRequest: function (xhr) {
            xhr.onreadystatechange = null;
            xhr.abort();
        }
    };
    /* harmony default export */ var http_xhr_request = (http_xhr_request_hooks);

    // CONCATENATED MODULE: ./src/runtimes/isomorphic/http/http.ts





    var HTTP = {
        createStreamingSocket: function (url) {
            return this.createSocket(http_streaming_socket, url);
        },
        createPollingSocket: function (url) {
            return this.createSocket(http_polling_socket, url);
        },
        createSocket: function (hooks, url) {
            return new http_socket(hooks, url);
        },
        createXHR: function (method, url) {
            return this.createRequest(http_xhr_request, method, url);
        },
        createRequest: function (hooks, method, url) {
            return new http_request(hooks, method, url);
        }
    };
    /* harmony default export */ var http_http = (HTTP);

    // CONCATENATED MODULE: ./src/runtimes/web/http/http.ts


    http_http.createXDR = function (method, url) {
        return this.createRequest(http_xdomain_request, method, url);
    };
    /* harmony default export */ var web_http_http = (http_http);

    // CONCATENATED MODULE: ./src/runtimes/web/runtime.ts












    var Runtime = {
        nextAuthCallbackID: 1,
        auth_callbacks: {},
        ScriptReceivers: ScriptReceivers,
        DependenciesReceivers: DependenciesReceivers,
        getDefaultStrategy: default_strategy,
        Transports: transports_transports,
        transportConnectionInitializer: transport_connection_initializer,
        HTTPFactory: web_http_http,
        TimelineTransport: jsonp_timeline,
        getXHRAPI: function () {
            return window.XMLHttpRequest;
        },
        getWebSocketAPI: function () {
            return window.WebSocket || window.MozWebSocket;
        },
        setup: function (PusherClass) {
            var _this = this;
            window.Pusher = PusherClass;
            var initializeOnDocumentBody = function () {
                _this.onDocumentBody(PusherClass.ready);
            };
            if (!window.JSON) {
                Dependencies.load('json2', {}, initializeOnDocumentBody);
            }
            else {
                initializeOnDocumentBody();
            }
        },
        getDocument: function () {
            return document;
        },
        getProtocol: function () {
            return this.getDocument().location.protocol;
        },
        getAuthorizers: function () {
            return { ajax: xhr_auth, jsonp: jsonp_auth };
        },
        onDocumentBody: function (callback) {
            var _this = this;
            if (document.body) {
                callback();
            }
            else {
                setTimeout(function () {
                    _this.onDocumentBody(callback);
                }, 0);
            }
        },
        createJSONPRequest: function (url, data) {
            return new jsonp_request(url, data);
        },
        createScriptRequest: function (src) {
            return new script_request(src);
        },
        getLocalStorage: function () {
            try {
                return window.localStorage;
            }
            catch (e) {
                return undefined;
            }
        },
        createXHR: function () {
            if (this.getXHRAPI()) {
                return this.createXMLHttpRequest();
            }
            else {
                return this.createMicrosoftXHR();
            }
        },
        createXMLHttpRequest: function () {
            var Constructor = this.getXHRAPI();
            return new Constructor();
        },
        createMicrosoftXHR: function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        },
        getNetwork: function () {
            return net_info_Network;
        },
        createWebSocket: function (url) {
            var Constructor = this.getWebSocketAPI();
            return new Constructor(url);
        },
        createSocketRequest: function (method, url) {
            if (this.isXHRSupported()) {
                return this.HTTPFactory.createXHR(method, url);
            }
            else if (this.isXDRSupported(url.indexOf('https:') === 0)) {
                return this.HTTPFactory.createXDR(method, url);
            }
            else {
                throw 'Cross-origin HTTP requests are not supported';
            }
        },
        isXHRSupported: function () {
            var Constructor = this.getXHRAPI();
            return (Boolean(Constructor) && new Constructor().withCredentials !== undefined);
        },
        isXDRSupported: function (useTLS) {
            var protocol = useTLS ? 'https:' : 'http:';
            var documentProtocol = this.getProtocol();
            return (Boolean(window['XDomainRequest']) && documentProtocol === protocol);
        },
        addUnloadListener: function (listener) {
            if (window.addEventListener !== undefined) {
                window.addEventListener('unload', listener, false);
            }
            else if (window.attachEvent !== undefined) {
                window.attachEvent('onunload', listener);
            }
        },
        removeUnloadListener: function (listener) {
            if (window.addEventListener !== undefined) {
                window.removeEventListener('unload', listener, false);
            }
            else if (window.detachEvent !== undefined) {
                window.detachEvent('onunload', listener);
            }
        }
    };
    /* harmony default export */ var runtime = (Runtime);

    // CONCATENATED MODULE: ./src/core/timeline/level.ts
    var TimelineLevel;
    (function (TimelineLevel) {
        TimelineLevel[TimelineLevel["ERROR"] = 3] = "ERROR";
        TimelineLevel[TimelineLevel["INFO"] = 6] = "INFO";
        TimelineLevel[TimelineLevel["DEBUG"] = 7] = "DEBUG";
    })(TimelineLevel || (TimelineLevel = {}));
    /* harmony default export */ var timeline_level = (TimelineLevel);

    // CONCATENATED MODULE: ./src/core/timeline/timeline.ts



    var timeline_Timeline = (function () {
        function Timeline(key, session, options) {
            this.key = key;
            this.session = session;
            this.events = [];
            this.options = options || {};
            this.sent = 0;
            this.uniqueID = 0;
        }
        Timeline.prototype.log = function (level, event) {
            if (level <= this.options.level) {
                this.events.push(extend({}, event, { timestamp: util.now() }));
                if (this.options.limit && this.events.length > this.options.limit) {
                    this.events.shift();
                }
            }
        };
        Timeline.prototype.error = function (event) {
            this.log(timeline_level.ERROR, event);
        };
        Timeline.prototype.info = function (event) {
            this.log(timeline_level.INFO, event);
        };
        Timeline.prototype.debug = function (event) {
            this.log(timeline_level.DEBUG, event);
        };
        Timeline.prototype.isEmpty = function () {
            return this.events.length === 0;
        };
        Timeline.prototype.send = function (sendfn, callback) {
            var _this = this;
            var data = extend({
                session: this.session,
                bundle: this.sent + 1,
                key: this.key,
                lib: 'js',
                version: this.options.version,
                cluster: this.options.cluster,
                features: this.options.features,
                timeline: this.events
            }, this.options.params);
            this.events = [];
            sendfn(data, function (error, result) {
                if (!error) {
                    _this.sent++;
                }
                if (callback) {
                    callback(error, result);
                }
            });
            return true;
        };
        Timeline.prototype.generateUniqueID = function () {
            this.uniqueID++;
            return this.uniqueID;
        };
        return Timeline;
    }());
    /* harmony default export */ var timeline_timeline = (timeline_Timeline);

    // CONCATENATED MODULE: ./src/core/strategies/transport_strategy.ts




    var transport_strategy_TransportStrategy = (function () {
        function TransportStrategy(name, priority, transport, options) {
            this.name = name;
            this.priority = priority;
            this.transport = transport;
            this.options = options || {};
        }
        TransportStrategy.prototype.isSupported = function () {
            return this.transport.isSupported({
                useTLS: this.options.useTLS
            });
        };
        TransportStrategy.prototype.connect = function (minPriority, callback) {
            var _this = this;
            if (!this.isSupported()) {
                return failAttempt(new UnsupportedStrategy(), callback);
            }
            else if (this.priority < minPriority) {
                return failAttempt(new TransportPriorityTooLow(), callback);
            }
            var connected = false;
            var transport = this.transport.createConnection(this.name, this.priority, this.options.key, this.options);
            var handshake = null;
            var onInitialized = function () {
                transport.unbind('initialized', onInitialized);
                transport.connect();
            };
            var onOpen = function () {
                handshake = factory.createHandshake(transport, function (result) {
                    connected = true;
                    unbindListeners();
                    callback(null, result);
                });
            };
            var onError = function (error) {
                unbindListeners();
                callback(error);
            };
            var onClosed = function () {
                unbindListeners();
                var serializedTransport;
                serializedTransport = safeJSONStringify(transport);
                callback(new TransportClosed(serializedTransport));
            };
            var unbindListeners = function () {
                transport.unbind('initialized', onInitialized);
                transport.unbind('open', onOpen);
                transport.unbind('error', onError);
                transport.unbind('closed', onClosed);
            };
            transport.bind('initialized', onInitialized);
            transport.bind('open', onOpen);
            transport.bind('error', onError);
            transport.bind('closed', onClosed);
            transport.initialize();
            return {
                abort: function () {
                    if (connected) {
                        return;
                    }
                    unbindListeners();
                    if (handshake) {
                        handshake.close();
                    }
                    else {
                        transport.close();
                    }
                },
                forceMinPriority: function (p) {
                    if (connected) {
                        return;
                    }
                    if (_this.priority < p) {
                        if (handshake) {
                            handshake.close();
                        }
                        else {
                            transport.close();
                        }
                    }
                }
            };
        };
        return TransportStrategy;
    }());
    /* harmony default export */ var transport_strategy = (transport_strategy_TransportStrategy);
    function failAttempt(error, callback) {
        util.defer(function () {
            callback(error);
        });
        return {
            abort: function () { },
            forceMinPriority: function () { }
        };
    }

    // CONCATENATED MODULE: ./src/core/strategies/strategy_builder.ts





    var strategy_builder_Transports = runtime.Transports;
    var strategy_builder_defineTransport = function (config, name, type, priority, options, manager) {
        var transportClass = strategy_builder_Transports[type];
        if (!transportClass) {
            throw new UnsupportedTransport(type);
        }
        var enabled = (!config.enabledTransports ||
            arrayIndexOf(config.enabledTransports, name) !== -1) &&
            (!config.disabledTransports ||
                arrayIndexOf(config.disabledTransports, name) === -1);
        var transport;
        if (enabled) {
            options = Object.assign({ ignoreNullOrigin: config.ignoreNullOrigin }, options);
            transport = new transport_strategy(name, priority, manager ? manager.getAssistant(transportClass) : transportClass, options);
        }
        else {
            transport = strategy_builder_UnsupportedStrategy;
        }
        return transport;
    };
    var strategy_builder_UnsupportedStrategy = {
        isSupported: function () {
            return false;
        },
        connect: function (_, callback) {
            var deferred = util.defer(function () {
                callback(new UnsupportedStrategy());
            });
            return {
                abort: function () {
                    deferred.ensureAborted();
                },
                forceMinPriority: function () { }
            };
        }
    };

    // CONCATENATED MODULE: ./src/core/auth/user_authenticator.ts


    var composeChannelQuery = function (params, authOptions) {
        var query = 'socket_id=' + encodeURIComponent(params.socketId);
        for (var i in authOptions.params) {
            query +=
                '&' +
                    encodeURIComponent(i) +
                    '=' +
                    encodeURIComponent(authOptions.params[i]);
        }
        return query;
    };
    var UserAuthenticator = function (authOptions) {
        if (typeof runtime.getAuthorizers()[authOptions.transport] === 'undefined') {
            throw "'" + authOptions.transport + "' is not a recognized auth transport";
        }
        return function (params, callback) {
            var query = composeChannelQuery(params, authOptions);
            runtime.getAuthorizers()[authOptions.transport](runtime, query, authOptions, AuthRequestType.UserAuthentication, callback);
        };
    };
    /* harmony default export */ var user_authenticator = (UserAuthenticator);

    // CONCATENATED MODULE: ./src/core/auth/channel_authorizer.ts


    var channel_authorizer_composeChannelQuery = function (params, authOptions) {
        var query = 'socket_id=' + encodeURIComponent(params.socketId);
        query += '&channel_name=' + encodeURIComponent(params.channelName);
        for (var i in authOptions.params) {
            query +=
                '&' +
                    encodeURIComponent(i) +
                    '=' +
                    encodeURIComponent(authOptions.params[i]);
        }
        return query;
    };
    var ChannelAuthorizer = function (authOptions) {
        if (typeof runtime.getAuthorizers()[authOptions.transport] === 'undefined') {
            throw "'" + authOptions.transport + "' is not a recognized auth transport";
        }
        return function (params, callback) {
            var query = channel_authorizer_composeChannelQuery(params, authOptions);
            runtime.getAuthorizers()[authOptions.transport](runtime, query, authOptions, AuthRequestType.ChannelAuthorization, callback);
        };
    };
    /* harmony default export */ var channel_authorizer = (ChannelAuthorizer);

    // CONCATENATED MODULE: ./src/core/auth/deprecated_channel_authorizer.ts
    var ChannelAuthorizerProxy = function (pusher, authOptions, channelAuthorizerGenerator) {
        var deprecatedAuthorizerOptions = {
            authTransport: authOptions.transport,
            authEndpoint: authOptions.endpoint,
            auth: {
                params: authOptions.params,
                headers: authOptions.headers
            }
        };
        return function (params, callback) {
            var channel = pusher.channel(params.channelName);
            var channelAuthorizer = channelAuthorizerGenerator(channel, deprecatedAuthorizerOptions);
            channelAuthorizer.authorize(params.socketId, callback);
        };
    };

    // CONCATENATED MODULE: ./src/core/config.ts
    var __assign = function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };





    function getConfig(opts, pusher) {
        var config = {
            activityTimeout: opts.activityTimeout || defaults.activityTimeout,
            cluster: opts.cluster || defaults.cluster,
            httpPath: opts.httpPath || defaults.httpPath,
            httpPort: opts.httpPort || defaults.httpPort,
            httpsPort: opts.httpsPort || defaults.httpsPort,
            pongTimeout: opts.pongTimeout || defaults.pongTimeout,
            statsHost: opts.statsHost || defaults.stats_host,
            unavailableTimeout: opts.unavailableTimeout || defaults.unavailableTimeout,
            wsPath: opts.wsPath || defaults.wsPath,
            wsPort: opts.wsPort || defaults.wsPort,
            wssPort: opts.wssPort || defaults.wssPort,
            enableStats: getEnableStatsConfig(opts),
            httpHost: getHttpHost(opts),
            useTLS: shouldUseTLS(opts),
            wsHost: getWebsocketHost(opts),
            userAuthenticator: buildUserAuthenticator(opts),
            channelAuthorizer: buildChannelAuthorizer(opts, pusher)
        };
        if ('disabledTransports' in opts)
            config.disabledTransports = opts.disabledTransports;
        if ('enabledTransports' in opts)
            config.enabledTransports = opts.enabledTransports;
        if ('ignoreNullOrigin' in opts)
            config.ignoreNullOrigin = opts.ignoreNullOrigin;
        if ('timelineParams' in opts)
            config.timelineParams = opts.timelineParams;
        if ('nacl' in opts) {
            config.nacl = opts.nacl;
        }
        return config;
    }
    function getHttpHost(opts) {
        if (opts.httpHost) {
            return opts.httpHost;
        }
        if (opts.cluster) {
            return "sockjs-" + opts.cluster + ".pusher.com";
        }
        return defaults.httpHost;
    }
    function getWebsocketHost(opts) {
        if (opts.wsHost) {
            return opts.wsHost;
        }
        if (opts.cluster) {
            return getWebsocketHostFromCluster(opts.cluster);
        }
        return getWebsocketHostFromCluster(defaults.cluster);
    }
    function getWebsocketHostFromCluster(cluster) {
        return "ws-" + cluster + ".pusher.com";
    }
    function shouldUseTLS(opts) {
        if (runtime.getProtocol() === 'https:') {
            return true;
        }
        else if (opts.forceTLS === false) {
            return false;
        }
        return true;
    }
    function getEnableStatsConfig(opts) {
        if ('enableStats' in opts) {
            return opts.enableStats;
        }
        if ('disableStats' in opts) {
            return !opts.disableStats;
        }
        return false;
    }
    function buildUserAuthenticator(opts) {
        var userAuthentication = __assign({}, defaults.userAuthentication, opts.userAuthentication);
        if ('customHandler' in userAuthentication &&
            userAuthentication['customHandler'] != null) {
            return userAuthentication['customHandler'];
        }
        return user_authenticator(userAuthentication);
    }
    function buildChannelAuth(opts, pusher) {
        var channelAuthorization;
        if ('channelAuthorization' in opts) {
            channelAuthorization = __assign({}, defaults.channelAuthorization, opts.channelAuthorization);
        }
        else {
            channelAuthorization = {
                transport: opts.authTransport || defaults.authTransport,
                endpoint: opts.authEndpoint || defaults.authEndpoint
            };
            if ('auth' in opts) {
                if ('params' in opts.auth)
                    channelAuthorization.params = opts.auth.params;
                if ('headers' in opts.auth)
                    channelAuthorization.headers = opts.auth.headers;
            }
            if ('authorizer' in opts)
                channelAuthorization.customHandler = ChannelAuthorizerProxy(pusher, channelAuthorization, opts.authorizer);
        }
        return channelAuthorization;
    }
    function buildChannelAuthorizer(opts, pusher) {
        var channelAuthorization = buildChannelAuth(opts, pusher);
        if ('customHandler' in channelAuthorization &&
            channelAuthorization['customHandler'] != null) {
            return channelAuthorization['customHandler'];
        }
        return channel_authorizer(channelAuthorization);
    }

    // CONCATENATED MODULE: ./src/core/utils/flat_promise.ts
    function flatPromise() {
        var resolve, reject;
        var promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        return { promise: promise, resolve: resolve, reject: reject };
    }
    /* harmony default export */ var flat_promise = (flatPromise);

    // CONCATENATED MODULE: ./src/core/user.ts
    var user_extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();




    var user_UserFacade = (function (_super) {
        user_extends(UserFacade, _super);
        function UserFacade(pusher) {
            var _this = _super.call(this, function (eventName, data) {
                logger.debug('No callbacks on user for ' + eventName);
            }) || this;
            _this.signin_requested = false;
            _this.user_data = null;
            _this.serverToUserChannel = null;
            _this.signinDonePromise = null;
            _this._signinDoneResolve = null;
            _this._onAuthorize = function (err, authData) {
                if (err) {
                    logger.warn("Error during signin: " + err);
                    _this._cleanup();
                    return;
                }
                _this.pusher.send_event('pusher:signin', {
                    auth: authData.auth,
                    user_data: authData.user_data
                });
            };
            _this.pusher = pusher;
            _this.pusher.connection.bind('state_change', function (_a) {
                var previous = _a.previous, current = _a.current;
                if (previous !== 'connected' && current === 'connected') {
                    _this._signin();
                }
                if (previous === 'connected' && current !== 'connected') {
                    _this._cleanup();
                    _this._newSigninPromiseIfNeeded();
                }
            });
            _this.pusher.connection.bind('message', function (event) {
                var eventName = event.event;
                if (eventName === 'pusher:signin_success') {
                    _this._onSigninSuccess(event.data);
                }
                if (_this.serverToUserChannel &&
                    _this.serverToUserChannel.name === event.channel) {
                    _this.serverToUserChannel.handleEvent(event);
                }
            });
            return _this;
        }
        UserFacade.prototype.signin = function () {
            if (this.signin_requested) {
                return;
            }
            this.signin_requested = true;
            this._signin();
        };
        UserFacade.prototype._signin = function () {
            if (!this.signin_requested) {
                return;
            }
            this._newSigninPromiseIfNeeded();
            if (this.pusher.connection.state !== 'connected') {
                return;
            }
            this.pusher.config.userAuthenticator({
                socketId: this.pusher.connection.socket_id
            }, this._onAuthorize);
        };
        UserFacade.prototype._onSigninSuccess = function (data) {
            try {
                this.user_data = JSON.parse(data.user_data);
            }
            catch (e) {
                logger.error("Failed parsing user data after signin: " + data.user_data);
                this._cleanup();
                return;
            }
            if (typeof this.user_data.id !== 'string' || this.user_data.id === '') {
                logger.error("user_data doesn't contain an id. user_data: " + this.user_data);
                this._cleanup();
                return;
            }
            this._signinDoneResolve();
            this._subscribeChannels();
        };
        UserFacade.prototype._subscribeChannels = function () {
            var _this = this;
            var ensure_subscribed = function (channel) {
                if (channel.subscriptionPending && channel.subscriptionCancelled) {
                    channel.reinstateSubscription();
                }
                else if (!channel.subscriptionPending &&
                    _this.pusher.connection.state === 'connected') {
                    channel.subscribe();
                }
            };
            this.serverToUserChannel = new channels_channel("#server-to-user-" + this.user_data.id, this.pusher);
            this.serverToUserChannel.bind_global(function (eventName, data) {
                if (eventName.indexOf('pusher_internal:') === 0 ||
                    eventName.indexOf('pusher:') === 0) {
                    return;
                }
                _this.emit(eventName, data);
            });
            ensure_subscribed(this.serverToUserChannel);
        };
        UserFacade.prototype._cleanup = function () {
            this.user_data = null;
            if (this.serverToUserChannel) {
                this.serverToUserChannel.unbind_all();
                this.serverToUserChannel.disconnect();
                this.serverToUserChannel = null;
            }
            if (this.signin_requested) {
                this._signinDoneResolve();
            }
        };
        UserFacade.prototype._newSigninPromiseIfNeeded = function () {
            if (!this.signin_requested) {
                return;
            }
            if (this.signinDonePromise && !this.signinDonePromise.done) {
                return;
            }
            var _a = flat_promise(), promise = _a.promise, resolve = _a.resolve;
            promise.done = false;
            var setDone = function () {
                promise.done = true;
            };
            promise.then(setDone)["catch"](setDone);
            this.signinDonePromise = promise;
            this._signinDoneResolve = resolve;
        };
        return UserFacade;
    }(dispatcher));
    /* harmony default export */ var user = (user_UserFacade);

    // CONCATENATED MODULE: ./src/core/pusher.ts













    var pusher_Pusher = (function () {
        function Pusher(app_key, options) {
            var _this = this;
            checkAppKey(app_key);
            options = options || {};
            if (!options.cluster && !(options.wsHost || options.httpHost)) {
                var suffix = url_store.buildLogSuffix('javascriptQuickStart');
                logger.warn("You should always specify a cluster when connecting. " + suffix);
            }
            if ('disableStats' in options) {
                logger.warn('The disableStats option is deprecated in favor of enableStats');
            }
            this.key = app_key;
            this.config = getConfig(options, this);
            this.channels = factory.createChannels();
            this.global_emitter = new dispatcher();
            this.sessionID = Math.floor(Math.random() * 1000000000);
            this.timeline = new timeline_timeline(this.key, this.sessionID, {
                cluster: this.config.cluster,
                features: Pusher.getClientFeatures(),
                params: this.config.timelineParams || {},
                limit: 50,
                level: timeline_level.INFO,
                version: defaults.VERSION
            });
            if (this.config.enableStats) {
                this.timelineSender = factory.createTimelineSender(this.timeline, {
                    host: this.config.statsHost,
                    path: '/timeline/v2/' + runtime.TimelineTransport.name
                });
            }
            var getStrategy = function (options) {
                return runtime.getDefaultStrategy(_this.config, options, strategy_builder_defineTransport);
            };
            this.connection = factory.createConnectionManager(this.key, {
                getStrategy: getStrategy,
                timeline: this.timeline,
                activityTimeout: this.config.activityTimeout,
                pongTimeout: this.config.pongTimeout,
                unavailableTimeout: this.config.unavailableTimeout,
                useTLS: Boolean(this.config.useTLS)
            });
            this.connection.bind('connected', function () {
                _this.subscribeAll();
                if (_this.timelineSender) {
                    _this.timelineSender.send(_this.connection.isUsingTLS());
                }
            });
            this.connection.bind('message', function (event) {
                var eventName = event.event;
                var internal = eventName.indexOf('pusher_internal:') === 0;
                if (event.channel) {
                    var channel = _this.channel(event.channel);
                    if (channel) {
                        channel.handleEvent(event);
                    }
                }
                if (!internal) {
                    _this.global_emitter.emit(event.event, event.data);
                }
            });
            this.connection.bind('connecting', function () {
                _this.channels.disconnect();
            });
            this.connection.bind('disconnected', function () {
                _this.channels.disconnect();
            });
            this.connection.bind('error', function (err) {
                logger.warn(err);
            });
            Pusher.instances.push(this);
            this.timeline.info({ instances: Pusher.instances.length });
            this.user = new user(this);
            if (Pusher.isReady) {
                this.connect();
            }
        }
        Pusher.ready = function () {
            Pusher.isReady = true;
            for (var i = 0, l = Pusher.instances.length; i < l; i++) {
                Pusher.instances[i].connect();
            }
        };
        Pusher.getClientFeatures = function () {
            return keys(filterObject({ ws: runtime.Transports.ws }, function (t) {
                return t.isSupported({});
            }));
        };
        Pusher.prototype.channel = function (name) {
            return this.channels.find(name);
        };
        Pusher.prototype.allChannels = function () {
            return this.channels.all();
        };
        Pusher.prototype.connect = function () {
            this.connection.connect();
            if (this.timelineSender) {
                if (!this.timelineSenderTimer) {
                    var usingTLS = this.connection.isUsingTLS();
                    var timelineSender = this.timelineSender;
                    this.timelineSenderTimer = new PeriodicTimer(60000, function () {
                        timelineSender.send(usingTLS);
                    });
                }
            }
        };
        Pusher.prototype.disconnect = function () {
            this.connection.disconnect();
            if (this.timelineSenderTimer) {
                this.timelineSenderTimer.ensureAborted();
                this.timelineSenderTimer = null;
            }
        };
        Pusher.prototype.bind = function (event_name, callback, context) {
            this.global_emitter.bind(event_name, callback, context);
            return this;
        };
        Pusher.prototype.unbind = function (event_name, callback, context) {
            this.global_emitter.unbind(event_name, callback, context);
            return this;
        };
        Pusher.prototype.bind_global = function (callback) {
            this.global_emitter.bind_global(callback);
            return this;
        };
        Pusher.prototype.unbind_global = function (callback) {
            this.global_emitter.unbind_global(callback);
            return this;
        };
        Pusher.prototype.unbind_all = function (callback) {
            this.global_emitter.unbind_all();
            return this;
        };
        Pusher.prototype.subscribeAll = function () {
            var channelName;
            for (channelName in this.channels.channels) {
                if (this.channels.channels.hasOwnProperty(channelName)) {
                    this.subscribe(channelName);
                }
            }
        };
        Pusher.prototype.subscribe = function (channel_name) {
            var channel = this.channels.add(channel_name, this);
            if (channel.subscriptionPending && channel.subscriptionCancelled) {
                channel.reinstateSubscription();
            }
            else if (!channel.subscriptionPending &&
                this.connection.state === 'connected') {
                channel.subscribe();
            }
            return channel;
        };
        Pusher.prototype.unsubscribe = function (channel_name) {
            var channel = this.channels.find(channel_name);
            if (channel && channel.subscriptionPending) {
                channel.cancelSubscription();
            }
            else {
                channel = this.channels.remove(channel_name);
                if (channel && channel.subscribed) {
                    channel.unsubscribe();
                }
            }
        };
        Pusher.prototype.send_event = function (event_name, data, channel) {
            return this.connection.send_event(event_name, data, channel);
        };
        Pusher.prototype.shouldUseTLS = function () {
            return this.config.useTLS;
        };
        Pusher.prototype.signin = function () {
            this.user.signin();
        };
        Pusher.instances = [];
        Pusher.isReady = false;
        Pusher.logToConsole = false;
        Pusher.Runtime = runtime;
        Pusher.ScriptReceivers = runtime.ScriptReceivers;
        Pusher.DependenciesReceivers = runtime.DependenciesReceivers;
        Pusher.auth_callbacks = runtime.auth_callbacks;
        return Pusher;
    }());
    /* harmony default export */ var core_pusher = __webpack_exports__["default"] = (pusher_Pusher);
    function checkAppKey(key) {
        if (key === null || key === undefined) {
            throw 'You must pass your app key when you instantiate Pusher.';
        }
    }
    runtime.setup(pusher_Pusher);


    /***/ })
    /******/ ]);
    });

    });

    var Pusher = unwrapExports(pusher);

    /*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.

    /* eslint-disable space-unary-ops */

    /* Public constants ==========================================================*/
    /* ===========================================================================*/


    //const Z_FILTERED          = 1;
    //const Z_HUFFMAN_ONLY      = 2;
    //const Z_RLE               = 3;
    const Z_FIXED$1               = 4;
    //const Z_DEFAULT_STRATEGY  = 0;

    /* Possible values of the data_type field (though see inflate()) */
    const Z_BINARY              = 0;
    const Z_TEXT                = 1;
    //const Z_ASCII             = 1; // = Z_TEXT
    const Z_UNKNOWN$1             = 2;

    /*============================================================================*/


    function zero$1(buf) { let len = buf.length; while (--len >= 0) { buf[len] = 0; } }

    // From zutil.h

    const STORED_BLOCK = 0;
    const STATIC_TREES = 1;
    const DYN_TREES    = 2;
    /* The three kinds of block type */

    const MIN_MATCH$1    = 3;
    const MAX_MATCH$1    = 258;
    /* The minimum and maximum match lengths */

    // From deflate.h
    /* ===========================================================================
     * Internal compression state.
     */

    const LENGTH_CODES$1  = 29;
    /* number of length codes, not counting the special END_BLOCK code */

    const LITERALS$1      = 256;
    /* number of literal bytes 0..255 */

    const L_CODES$1       = LITERALS$1 + 1 + LENGTH_CODES$1;
    /* number of Literal or Length codes, including the END_BLOCK code */

    const D_CODES$1       = 30;
    /* number of distance codes */

    const BL_CODES$1      = 19;
    /* number of codes used to transfer the bit lengths */

    const HEAP_SIZE$1     = 2 * L_CODES$1 + 1;
    /* maximum heap size */

    const MAX_BITS$1      = 15;
    /* All codes must not exceed MAX_BITS bits */

    const Buf_size      = 16;
    /* size of bit buffer in bi_buf */


    /* ===========================================================================
     * Constants
     */

    const MAX_BL_BITS = 7;
    /* Bit length codes must not exceed MAX_BL_BITS bits */

    const END_BLOCK   = 256;
    /* end of block literal code */

    const REP_3_6     = 16;
    /* repeat previous bit length 3-6 times (2 bits of repeat count) */

    const REPZ_3_10   = 17;
    /* repeat a zero length 3-10 times  (3 bits of repeat count) */

    const REPZ_11_138 = 18;
    /* repeat a zero length 11-138 times  (7 bits of repeat count) */

    /* eslint-disable comma-spacing,array-bracket-spacing */
    const extra_lbits =   /* extra bits for each length code */
      new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]);

    const extra_dbits =   /* extra bits for each distance code */
      new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]);

    const extra_blbits =  /* extra bits for each bit length code */
      new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]);

    const bl_order =
      new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);
    /* eslint-enable comma-spacing,array-bracket-spacing */

    /* The lengths of the bit length codes are sent in order of decreasing
     * probability, to avoid transmitting the lengths for unused bit length codes.
     */

    /* ===========================================================================
     * Local data. These are initialized only once.
     */

    // We pre-fill arrays with 0 to avoid uninitialized gaps

    const DIST_CODE_LEN = 512; /* see definition of array dist_code below */

    // !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
    const static_ltree  = new Array((L_CODES$1 + 2) * 2);
    zero$1(static_ltree);
    /* The static literal tree. Since the bit lengths are imposed, there is no
     * need for the L_CODES extra codes used during heap construction. However
     * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
     * below).
     */

    const static_dtree  = new Array(D_CODES$1 * 2);
    zero$1(static_dtree);
    /* The static distance tree. (Actually a trivial tree since all codes use
     * 5 bits.)
     */

    const _dist_code    = new Array(DIST_CODE_LEN);
    zero$1(_dist_code);
    /* Distance codes. The first 256 values correspond to the distances
     * 3 .. 258, the last 256 values correspond to the top 8 bits of
     * the 15 bit distances.
     */

    const _length_code  = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
    zero$1(_length_code);
    /* length code for each normalized match length (0 == MIN_MATCH) */

    const base_length   = new Array(LENGTH_CODES$1);
    zero$1(base_length);
    /* First normalized length for each code (0 = MIN_MATCH) */

    const base_dist     = new Array(D_CODES$1);
    zero$1(base_dist);
    /* First normalized distance for each code (0 = distance of 1) */


    function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

      this.static_tree  = static_tree;  /* static tree or NULL */
      this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
      this.extra_base   = extra_base;   /* base index for extra_bits */
      this.elems        = elems;        /* max number of elements in the tree */
      this.max_length   = max_length;   /* max bit length for the codes */

      // show if `static_tree` has data or dummy - needed for monomorphic objects
      this.has_stree    = static_tree && static_tree.length;
    }


    let static_l_desc;
    let static_d_desc;
    let static_bl_desc;


    function TreeDesc(dyn_tree, stat_desc) {
      this.dyn_tree = dyn_tree;     /* the dynamic tree */
      this.max_code = 0;            /* largest code with non zero frequency */
      this.stat_desc = stat_desc;   /* the corresponding static tree */
    }



    const d_code = (dist) => {

      return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
    };


    /* ===========================================================================
     * Output a short LSB first on the stream.
     * IN assertion: there is enough room in pendingBuf.
     */
    const put_short = (s, w) => {
    //    put_byte(s, (uch)((w) & 0xff));
    //    put_byte(s, (uch)((ush)(w) >> 8));
      s.pending_buf[s.pending++] = (w) & 0xff;
      s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
    };


    /* ===========================================================================
     * Send a value on a given number of bits.
     * IN assertion: length <= 16 and value fits in length bits.
     */
    const send_bits = (s, value, length) => {

      if (s.bi_valid > (Buf_size - length)) {
        s.bi_buf |= (value << s.bi_valid) & 0xffff;
        put_short(s, s.bi_buf);
        s.bi_buf = value >> (Buf_size - s.bi_valid);
        s.bi_valid += length - Buf_size;
      } else {
        s.bi_buf |= (value << s.bi_valid) & 0xffff;
        s.bi_valid += length;
      }
    };


    const send_code = (s, c, tree) => {

      send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
    };


    /* ===========================================================================
     * Reverse the first len bits of a code, using straightforward code (a faster
     * method would use a table)
     * IN assertion: 1 <= len <= 15
     */
    const bi_reverse = (code, len) => {

      let res = 0;
      do {
        res |= code & 1;
        code >>>= 1;
        res <<= 1;
      } while (--len > 0);
      return res >>> 1;
    };


    /* ===========================================================================
     * Flush the bit buffer, keeping at most 7 bits in it.
     */
    const bi_flush = (s) => {

      if (s.bi_valid === 16) {
        put_short(s, s.bi_buf);
        s.bi_buf = 0;
        s.bi_valid = 0;

      } else if (s.bi_valid >= 8) {
        s.pending_buf[s.pending++] = s.bi_buf & 0xff;
        s.bi_buf >>= 8;
        s.bi_valid -= 8;
      }
    };


    /* ===========================================================================
     * Compute the optimal bit lengths for a tree and update the total bit length
     * for the current block.
     * IN assertion: the fields freq and dad are set, heap[heap_max] and
     *    above are the tree nodes sorted by increasing frequency.
     * OUT assertions: the field len is set to the optimal bit length, the
     *     array bl_count contains the frequencies for each bit length.
     *     The length opt_len is updated; static_len is also updated if stree is
     *     not null.
     */
    const gen_bitlen = (s, desc) => {
    //    deflate_state *s;
    //    tree_desc *desc;    /* the tree descriptor */

      const tree            = desc.dyn_tree;
      const max_code        = desc.max_code;
      const stree           = desc.stat_desc.static_tree;
      const has_stree       = desc.stat_desc.has_stree;
      const extra           = desc.stat_desc.extra_bits;
      const base            = desc.stat_desc.extra_base;
      const max_length      = desc.stat_desc.max_length;
      let h;              /* heap index */
      let n, m;           /* iterate over the tree elements */
      let bits;           /* bit length */
      let xbits;          /* extra bits */
      let f;              /* frequency */
      let overflow = 0;   /* number of elements with bit length too large */

      for (bits = 0; bits <= MAX_BITS$1; bits++) {
        s.bl_count[bits] = 0;
      }

      /* In a first pass, compute the optimal bit lengths (which may
       * overflow in the case of the bit length tree).
       */
      tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

      for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
        n = s.heap[h];
        bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
        if (bits > max_length) {
          bits = max_length;
          overflow++;
        }
        tree[n * 2 + 1]/*.Len*/ = bits;
        /* We overwrite tree[n].Dad which is no longer needed */

        if (n > max_code) { continue; } /* not a leaf node */

        s.bl_count[bits]++;
        xbits = 0;
        if (n >= base) {
          xbits = extra[n - base];
        }
        f = tree[n * 2]/*.Freq*/;
        s.opt_len += f * (bits + xbits);
        if (has_stree) {
          s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
        }
      }
      if (overflow === 0) { return; }

      // Tracev((stderr,"\nbit length overflow\n"));
      /* This happens for example on obj2 and pic of the Calgary corpus */

      /* Find the first bit length which could increase: */
      do {
        bits = max_length - 1;
        while (s.bl_count[bits] === 0) { bits--; }
        s.bl_count[bits]--;      /* move one leaf down the tree */
        s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
        s.bl_count[max_length]--;
        /* The brother of the overflow item also moves one step up,
         * but this does not affect bl_count[max_length]
         */
        overflow -= 2;
      } while (overflow > 0);

      /* Now recompute all bit lengths, scanning in increasing frequency.
       * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
       * lengths instead of fixing only the wrong ones. This idea is taken
       * from 'ar' written by Haruhiko Okumura.)
       */
      for (bits = max_length; bits !== 0; bits--) {
        n = s.bl_count[bits];
        while (n !== 0) {
          m = s.heap[--h];
          if (m > max_code) { continue; }
          if (tree[m * 2 + 1]/*.Len*/ !== bits) {
            // Tracev((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
            s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
            tree[m * 2 + 1]/*.Len*/ = bits;
          }
          n--;
        }
      }
    };


    /* ===========================================================================
     * Generate the codes for a given tree and bit counts (which need not be
     * optimal).
     * IN assertion: the array bl_count contains the bit length statistics for
     * the given tree and the field len is set for all tree elements.
     * OUT assertion: the field code is set for all tree elements of non
     *     zero code length.
     */
    const gen_codes = (tree, max_code, bl_count) => {
    //    ct_data *tree;             /* the tree to decorate */
    //    int max_code;              /* largest code with non zero frequency */
    //    ushf *bl_count;            /* number of codes at each bit length */

      const next_code = new Array(MAX_BITS$1 + 1); /* next code value for each bit length */
      let code = 0;              /* running code value */
      let bits;                  /* bit index */
      let n;                     /* code index */

      /* The distribution counts are first used to generate the code values
       * without bit reversal.
       */
      for (bits = 1; bits <= MAX_BITS$1; bits++) {
        code = (code + bl_count[bits - 1]) << 1;
        next_code[bits] = code;
      }
      /* Check that the bit counts in bl_count are consistent. The last code
       * must be all ones.
       */
      //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
      //        "inconsistent bit counts");
      //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

      for (n = 0;  n <= max_code; n++) {
        let len = tree[n * 2 + 1]/*.Len*/;
        if (len === 0) { continue; }
        /* Now reverse the bits */
        tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

        //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
        //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
      }
    };


    /* ===========================================================================
     * Initialize the various 'constant' tables.
     */
    const tr_static_init = () => {

      let n;        /* iterates over tree elements */
      let bits;     /* bit counter */
      let length;   /* length value */
      let code;     /* code value */
      let dist;     /* distance index */
      const bl_count = new Array(MAX_BITS$1 + 1);
      /* number of codes at each bit length for an optimal tree */

      // do check in _tr_init()
      //if (static_init_done) return;

      /* For some embedded targets, global variables are not initialized: */
    /*#ifdef NO_INIT_GLOBAL_POINTERS
      static_l_desc.static_tree = static_ltree;
      static_l_desc.extra_bits = extra_lbits;
      static_d_desc.static_tree = static_dtree;
      static_d_desc.extra_bits = extra_dbits;
      static_bl_desc.extra_bits = extra_blbits;
    #endif*/

      /* Initialize the mapping length (0..255) -> length code (0..28) */
      length = 0;
      for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
        base_length[code] = length;
        for (n = 0; n < (1 << extra_lbits[code]); n++) {
          _length_code[length++] = code;
        }
      }
      //Assert (length == 256, "tr_static_init: length != 256");
      /* Note that the length 255 (match length 258) can be represented
       * in two different ways: code 284 + 5 bits or code 285, so we
       * overwrite length_code[255] to use the best encoding:
       */
      _length_code[length - 1] = code;

      /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
      dist = 0;
      for (code = 0; code < 16; code++) {
        base_dist[code] = dist;
        for (n = 0; n < (1 << extra_dbits[code]); n++) {
          _dist_code[dist++] = code;
        }
      }
      //Assert (dist == 256, "tr_static_init: dist != 256");
      dist >>= 7; /* from now on, all distances are divided by 128 */
      for (; code < D_CODES$1; code++) {
        base_dist[code] = dist << 7;
        for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
          _dist_code[256 + dist++] = code;
        }
      }
      //Assert (dist == 256, "tr_static_init: 256+dist != 512");

      /* Construct the codes of the static literal tree */
      for (bits = 0; bits <= MAX_BITS$1; bits++) {
        bl_count[bits] = 0;
      }

      n = 0;
      while (n <= 143) {
        static_ltree[n * 2 + 1]/*.Len*/ = 8;
        n++;
        bl_count[8]++;
      }
      while (n <= 255) {
        static_ltree[n * 2 + 1]/*.Len*/ = 9;
        n++;
        bl_count[9]++;
      }
      while (n <= 279) {
        static_ltree[n * 2 + 1]/*.Len*/ = 7;
        n++;
        bl_count[7]++;
      }
      while (n <= 287) {
        static_ltree[n * 2 + 1]/*.Len*/ = 8;
        n++;
        bl_count[8]++;
      }
      /* Codes 286 and 287 do not exist, but we must include them in the
       * tree construction to get a canonical Huffman tree (longest code
       * all ones)
       */
      gen_codes(static_ltree, L_CODES$1 + 1, bl_count);

      /* The static distance tree is trivial: */
      for (n = 0; n < D_CODES$1; n++) {
        static_dtree[n * 2 + 1]/*.Len*/ = 5;
        static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
      }

      // Now data ready and we can init static trees
      static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
      static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES$1, MAX_BITS$1);
      static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES$1, MAX_BL_BITS);

      //static_init_done = true;
    };


    /* ===========================================================================
     * Initialize a new block.
     */
    const init_block = (s) => {

      let n; /* iterates over tree elements */

      /* Initialize the trees. */
      for (n = 0; n < L_CODES$1;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
      for (n = 0; n < D_CODES$1;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
      for (n = 0; n < BL_CODES$1; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

      s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
      s.opt_len = s.static_len = 0;
      s.sym_next = s.matches = 0;
    };


    /* ===========================================================================
     * Flush the bit buffer and align the output on a byte boundary
     */
    const bi_windup = (s) =>
    {
      if (s.bi_valid > 8) {
        put_short(s, s.bi_buf);
      } else if (s.bi_valid > 0) {
        //put_byte(s, (Byte)s->bi_buf);
        s.pending_buf[s.pending++] = s.bi_buf;
      }
      s.bi_buf = 0;
      s.bi_valid = 0;
    };

    /* ===========================================================================
     * Compares to subtrees, using the tree depth as tie breaker when
     * the subtrees have equal frequency. This minimizes the worst case length.
     */
    const smaller = (tree, n, m, depth) => {

      const _n2 = n * 2;
      const _m2 = m * 2;
      return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
             (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
    };

    /* ===========================================================================
     * Restore the heap property by moving down the tree starting at node k,
     * exchanging a node with the smallest of its two sons if necessary, stopping
     * when the heap property is re-established (each father smaller than its
     * two sons).
     */
    const pqdownheap = (s, tree, k) => {
    //    deflate_state *s;
    //    ct_data *tree;  /* the tree to restore */
    //    int k;               /* node to move down */

      const v = s.heap[k];
      let j = k << 1;  /* left son of k */
      while (j <= s.heap_len) {
        /* Set j to the smallest of the two sons: */
        if (j < s.heap_len &&
          smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
          j++;
        }
        /* Exit if v is smaller than both sons */
        if (smaller(tree, v, s.heap[j], s.depth)) { break; }

        /* Exchange v with the smallest son */
        s.heap[k] = s.heap[j];
        k = j;

        /* And continue down the tree, setting j to the left son of k */
        j <<= 1;
      }
      s.heap[k] = v;
    };


    // inlined manually
    // const SMALLEST = 1;

    /* ===========================================================================
     * Send the block data compressed using the given Huffman trees
     */
    const compress_block = (s, ltree, dtree) => {
    //    deflate_state *s;
    //    const ct_data *ltree; /* literal tree */
    //    const ct_data *dtree; /* distance tree */

      let dist;           /* distance of matched string */
      let lc;             /* match length or unmatched char (if dist == 0) */
      let sx = 0;         /* running index in sym_buf */
      let code;           /* the code to send */
      let extra;          /* number of extra bits to send */

      if (s.sym_next !== 0) {
        do {
          dist = s.pending_buf[s.sym_buf + sx++] & 0xff;
          dist += (s.pending_buf[s.sym_buf + sx++] & 0xff) << 8;
          lc = s.pending_buf[s.sym_buf + sx++];
          if (dist === 0) {
            send_code(s, lc, ltree); /* send a literal byte */
            //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
          } else {
            /* Here, lc is the match length - MIN_MATCH */
            code = _length_code[lc];
            send_code(s, code + LITERALS$1 + 1, ltree); /* send the length code */
            extra = extra_lbits[code];
            if (extra !== 0) {
              lc -= base_length[code];
              send_bits(s, lc, extra);       /* send the extra length bits */
            }
            dist--; /* dist is now the match distance - 1 */
            code = d_code(dist);
            //Assert (code < D_CODES, "bad d_code");

            send_code(s, code, dtree);       /* send the distance code */
            extra = extra_dbits[code];
            if (extra !== 0) {
              dist -= base_dist[code];
              send_bits(s, dist, extra);   /* send the extra distance bits */
            }
          } /* literal or match pair ? */

          /* Check that the overlay between pending_buf and sym_buf is ok: */
          //Assert(s->pending < s->lit_bufsize + sx, "pendingBuf overflow");

        } while (sx < s.sym_next);
      }

      send_code(s, END_BLOCK, ltree);
    };


    /* ===========================================================================
     * Construct one Huffman tree and assigns the code bit strings and lengths.
     * Update the total bit length for the current block.
     * IN assertion: the field freq is set for all tree elements.
     * OUT assertions: the fields len and code are set to the optimal bit length
     *     and corresponding code. The length opt_len is updated; static_len is
     *     also updated if stree is not null. The field max_code is set.
     */
    const build_tree = (s, desc) => {
    //    deflate_state *s;
    //    tree_desc *desc; /* the tree descriptor */

      const tree     = desc.dyn_tree;
      const stree    = desc.stat_desc.static_tree;
      const has_stree = desc.stat_desc.has_stree;
      const elems    = desc.stat_desc.elems;
      let n, m;          /* iterate over heap elements */
      let max_code = -1; /* largest code with non zero frequency */
      let node;          /* new node being created */

      /* Construct the initial heap, with least frequent element in
       * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
       * heap[0] is not used.
       */
      s.heap_len = 0;
      s.heap_max = HEAP_SIZE$1;

      for (n = 0; n < elems; n++) {
        if (tree[n * 2]/*.Freq*/ !== 0) {
          s.heap[++s.heap_len] = max_code = n;
          s.depth[n] = 0;

        } else {
          tree[n * 2 + 1]/*.Len*/ = 0;
        }
      }

      /* The pkzip format requires that at least one distance code exists,
       * and that at least one bit should be sent even if there is only one
       * possible code. So to avoid special checks later on we force at least
       * two codes of non zero frequency.
       */
      while (s.heap_len < 2) {
        node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
        tree[node * 2]/*.Freq*/ = 1;
        s.depth[node] = 0;
        s.opt_len--;

        if (has_stree) {
          s.static_len -= stree[node * 2 + 1]/*.Len*/;
        }
        /* node is 0 or 1 so it does not have extra bits */
      }
      desc.max_code = max_code;

      /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
       * establish sub-heaps of increasing lengths:
       */
      for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

      /* Construct the Huffman tree by repeatedly combining the least two
       * frequent nodes.
       */
      node = elems;              /* next internal node of the tree */
      do {
        //pqremove(s, tree, n);  /* n = node of least frequency */
        /*** pqremove ***/
        n = s.heap[1/*SMALLEST*/];
        s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
        pqdownheap(s, tree, 1/*SMALLEST*/);
        /***/

        m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

        s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
        s.heap[--s.heap_max] = m;

        /* Create a new node father of n and m */
        tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
        s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
        tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

        /* and insert the new node in the heap */
        s.heap[1/*SMALLEST*/] = node++;
        pqdownheap(s, tree, 1/*SMALLEST*/);

      } while (s.heap_len >= 2);

      s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

      /* At this point, the fields freq and dad are set. We can now
       * generate the bit lengths.
       */
      gen_bitlen(s, desc);

      /* The field len is now set, we can generate the bit codes */
      gen_codes(tree, max_code, s.bl_count);
    };


    /* ===========================================================================
     * Scan a literal or distance tree to determine the frequencies of the codes
     * in the bit length tree.
     */
    const scan_tree = (s, tree, max_code) => {
    //    deflate_state *s;
    //    ct_data *tree;   /* the tree to be scanned */
    //    int max_code;    /* and its largest code of non zero frequency */

      let n;                     /* iterates over all tree elements */
      let prevlen = -1;          /* last emitted length */
      let curlen;                /* length of current code */

      let nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

      let count = 0;             /* repeat count of the current code */
      let max_count = 7;         /* max repeat count */
      let min_count = 4;         /* min repeat count */

      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
      tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

        if (++count < max_count && curlen === nextlen) {
          continue;

        } else if (count < min_count) {
          s.bl_tree[curlen * 2]/*.Freq*/ += count;

        } else if (curlen !== 0) {

          if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
          s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

        } else if (count <= 10) {
          s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

        } else {
          s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
        }

        count = 0;
        prevlen = curlen;

        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;

        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;

        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    };


    /* ===========================================================================
     * Send a literal or distance tree in compressed form, using the codes in
     * bl_tree.
     */
    const send_tree = (s, tree, max_code) => {
    //    deflate_state *s;
    //    ct_data *tree; /* the tree to be scanned */
    //    int max_code;       /* and its largest code of non zero frequency */

      let n;                     /* iterates over all tree elements */
      let prevlen = -1;          /* last emitted length */
      let curlen;                /* length of current code */

      let nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

      let count = 0;             /* repeat count of the current code */
      let max_count = 7;         /* max repeat count */
      let min_count = 4;         /* min repeat count */

      /* tree[max_code+1].Len = -1; */  /* guard already set */
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }

      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

        if (++count < max_count && curlen === nextlen) {
          continue;

        } else if (count < min_count) {
          do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

        } else if (curlen !== 0) {
          if (curlen !== prevlen) {
            send_code(s, curlen, s.bl_tree);
            count--;
          }
          //Assert(count >= 3 && count <= 6, " 3_6?");
          send_code(s, REP_3_6, s.bl_tree);
          send_bits(s, count - 3, 2);

        } else if (count <= 10) {
          send_code(s, REPZ_3_10, s.bl_tree);
          send_bits(s, count - 3, 3);

        } else {
          send_code(s, REPZ_11_138, s.bl_tree);
          send_bits(s, count - 11, 7);
        }

        count = 0;
        prevlen = curlen;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;

        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;

        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    };


    /* ===========================================================================
     * Construct the Huffman tree for the bit lengths and return the index in
     * bl_order of the last bit length code to send.
     */
    const build_bl_tree = (s) => {

      let max_blindex;  /* index of last bit length code of non zero freq */

      /* Determine the bit length frequencies for literal and distance trees */
      scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
      scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

      /* Build the bit length tree: */
      build_tree(s, s.bl_desc);
      /* opt_len now includes the length of the tree representations, except
       * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
       */

      /* Determine the number of bit length codes to send. The pkzip format
       * requires that at least 4 bit length codes be sent. (appnote.txt says
       * 3 but the actual value used is 4.)
       */
      for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
        if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
          break;
        }
      }
      /* Update opt_len to include the bit length tree and counts */
      s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
      //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
      //        s->opt_len, s->static_len));

      return max_blindex;
    };


    /* ===========================================================================
     * Send the header for a block using dynamic Huffman trees: the counts, the
     * lengths of the bit length codes, the literal tree and the distance tree.
     * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
     */
    const send_all_trees = (s, lcodes, dcodes, blcodes) => {
    //    deflate_state *s;
    //    int lcodes, dcodes, blcodes; /* number of codes for each tree */

      let rank;                    /* index in bl_order */

      //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
      //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
      //        "too many codes");
      //Tracev((stderr, "\nbl counts: "));
      send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
      send_bits(s, dcodes - 1,   5);
      send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
      for (rank = 0; rank < blcodes; rank++) {
        //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
        send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
      }
      //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

      send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
      //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

      send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
      //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
    };


    /* ===========================================================================
     * Check if the data type is TEXT or BINARY, using the following algorithm:
     * - TEXT if the two conditions below are satisfied:
     *    a) There are no non-portable control characters belonging to the
     *       "block list" (0..6, 14..25, 28..31).
     *    b) There is at least one printable character belonging to the
     *       "allow list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
     * - BINARY otherwise.
     * - The following partially-portable control characters form a
     *   "gray list" that is ignored in this detection algorithm:
     *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
     * IN assertion: the fields Freq of dyn_ltree are set.
     */
    const detect_data_type = (s) => {
      /* block_mask is the bit mask of block-listed bytes
       * set bits 0..6, 14..25, and 28..31
       * 0xf3ffc07f = binary 11110011111111111100000001111111
       */
      let block_mask = 0xf3ffc07f;
      let n;

      /* Check for non-textual ("block-listed") bytes. */
      for (n = 0; n <= 31; n++, block_mask >>>= 1) {
        if ((block_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
          return Z_BINARY;
        }
      }

      /* Check for textual ("allow-listed") bytes. */
      if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
          s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
        return Z_TEXT;
      }
      for (n = 32; n < LITERALS$1; n++) {
        if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
          return Z_TEXT;
        }
      }

      /* There are no "block-listed" or "allow-listed" bytes:
       * this stream either is empty or has tolerated ("gray-listed") bytes only.
       */
      return Z_BINARY;
    };


    let static_init_done = false;

    /* ===========================================================================
     * Initialize the tree data structures for a new zlib stream.
     */
    const _tr_init$1 = (s) =>
    {

      if (!static_init_done) {
        tr_static_init();
        static_init_done = true;
      }

      s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
      s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
      s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

      s.bi_buf = 0;
      s.bi_valid = 0;

      /* Initialize the first block of the first file: */
      init_block(s);
    };


    /* ===========================================================================
     * Send a stored block
     */
    const _tr_stored_block$1 = (s, buf, stored_len, last) => {
    //DeflateState *s;
    //charf *buf;       /* input block */
    //ulg stored_len;   /* length of input block */
    //int last;         /* one if this is the last block for a file */

      send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
      bi_windup(s);        /* align on byte boundary */
      put_short(s, stored_len);
      put_short(s, ~stored_len);
      if (stored_len) {
        s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
      }
      s.pending += stored_len;
    };


    /* ===========================================================================
     * Send one empty static block to give enough lookahead for inflate.
     * This takes 10 bits, of which 7 may remain in the bit buffer.
     */
    const _tr_align$1 = (s) => {
      send_bits(s, STATIC_TREES << 1, 3);
      send_code(s, END_BLOCK, static_ltree);
      bi_flush(s);
    };


    /* ===========================================================================
     * Determine the best encoding for the current block: dynamic trees, static
     * trees or store, and write out the encoded block.
     */
    const _tr_flush_block$1 = (s, buf, stored_len, last) => {
    //DeflateState *s;
    //charf *buf;       /* input block, or NULL if too old */
    //ulg stored_len;   /* length of input block */
    //int last;         /* one if this is the last block for a file */

      let opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
      let max_blindex = 0;        /* index of last bit length code of non zero freq */

      /* Build the Huffman trees unless a stored block is forced */
      if (s.level > 0) {

        /* Check if the file is binary or text */
        if (s.strm.data_type === Z_UNKNOWN$1) {
          s.strm.data_type = detect_data_type(s);
        }

        /* Construct the literal and distance trees */
        build_tree(s, s.l_desc);
        // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
        //        s->static_len));

        build_tree(s, s.d_desc);
        // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
        //        s->static_len));
        /* At this point, opt_len and static_len are the total bit lengths of
         * the compressed block data, excluding the tree representations.
         */

        /* Build the bit length tree for the above two trees, and get the index
         * in bl_order of the last bit length code to send.
         */
        max_blindex = build_bl_tree(s);

        /* Determine the best encoding. Compute the block lengths in bytes. */
        opt_lenb = (s.opt_len + 3 + 7) >>> 3;
        static_lenb = (s.static_len + 3 + 7) >>> 3;

        // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
        //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
        //        s->sym_next / 3));

        if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

      } else {
        // Assert(buf != (char*)0, "lost buf");
        opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
      }

      if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
        /* 4: two words for the lengths */

        /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
         * Otherwise we can't have processed more than WSIZE input bytes since
         * the last block flush, because compression would have been
         * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
         * transform a block into a stored block.
         */
        _tr_stored_block$1(s, buf, stored_len, last);

      } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {

        send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
        compress_block(s, static_ltree, static_dtree);

      } else {
        send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
        send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
        compress_block(s, s.dyn_ltree, s.dyn_dtree);
      }
      // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
      /* The above check is made mod 2^32, for files larger than 512 MB
       * and uLong implemented on 32 bits.
       */
      init_block(s);

      if (last) {
        bi_windup(s);
      }
      // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
      //       s->compressed_len-7*last));
    };

    /* ===========================================================================
     * Save the match info and tally the frequency counts. Return true if
     * the current block must be flushed.
     */
    const _tr_tally$1 = (s, dist, lc) => {
    //    deflate_state *s;
    //    unsigned dist;  /* distance of matched string */
    //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */

      s.pending_buf[s.sym_buf + s.sym_next++] = dist;
      s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
      s.pending_buf[s.sym_buf + s.sym_next++] = lc;
      if (dist === 0) {
        /* lc is the unmatched char */
        s.dyn_ltree[lc * 2]/*.Freq*/++;
      } else {
        s.matches++;
        /* Here, lc is the match length - MIN_MATCH */
        dist--;             /* dist = match distance - 1 */
        //Assert((ush)dist < (ush)MAX_DIST(s) &&
        //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
        //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

        s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]/*.Freq*/++;
        s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
      }

      return (s.sym_next === s.sym_end);
    };

    var _tr_init_1  = _tr_init$1;
    var _tr_stored_block_1 = _tr_stored_block$1;
    var _tr_flush_block_1  = _tr_flush_block$1;
    var _tr_tally_1 = _tr_tally$1;
    var _tr_align_1 = _tr_align$1;

    var trees = {
    	_tr_init: _tr_init_1,
    	_tr_stored_block: _tr_stored_block_1,
    	_tr_flush_block: _tr_flush_block_1,
    	_tr_tally: _tr_tally_1,
    	_tr_align: _tr_align_1
    };

    // Note: adler32 takes 12% for level 0 and 2% for level 6.
    // It isn't worth it to make additional optimizations as in original.
    // Small size is preferable.

    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.

    const adler32 = (adler, buf, len, pos) => {
      let s1 = (adler & 0xffff) |0,
          s2 = ((adler >>> 16) & 0xffff) |0,
          n = 0;

      while (len !== 0) {
        // Set limit ~ twice less than 5552, to keep
        // s2 in 31-bits, because we force signed ints.
        // in other case %= will fail.
        n = len > 2000 ? 2000 : len;
        len -= n;

        do {
          s1 = (s1 + buf[pos++]) |0;
          s2 = (s2 + s1) |0;
        } while (--n);

        s1 %= 65521;
        s2 %= 65521;
      }

      return (s1 | (s2 << 16)) |0;
    };


    var adler32_1 = adler32;

    // Note: we can't get significant speed boost here.
    // So write code to minimize size - no pregenerated tables
    // and array tools dependencies.

    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.

    // Use ordinary array, since untyped makes no boost here
    const makeTable = () => {
      let c, table = [];

      for (var n = 0; n < 256; n++) {
        c = n;
        for (var k = 0; k < 8; k++) {
          c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        table[n] = c;
      }

      return table;
    };

    // Create table on load. Just 255 signed longs. Not a problem.
    const crcTable = new Uint32Array(makeTable());


    const crc32 = (crc, buf, len, pos) => {
      const t = crcTable;
      const end = pos + len;

      crc ^= -1;

      for (let i = pos; i < end; i++) {
        crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
      }

      return (crc ^ (-1)); // >>> 0;
    };


    var crc32_1 = crc32;

    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.

    var messages = {
      2:      'need dictionary',     /* Z_NEED_DICT       2  */
      1:      'stream end',          /* Z_STREAM_END      1  */
      0:      '',                    /* Z_OK              0  */
      '-1':   'file error',          /* Z_ERRNO         (-1) */
      '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
      '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
      '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
      '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
      '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
    };

    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.

    var constants$2 = {

      /* Allowed flush values; see deflate() and inflate() below for details */
      Z_NO_FLUSH:         0,
      Z_PARTIAL_FLUSH:    1,
      Z_SYNC_FLUSH:       2,
      Z_FULL_FLUSH:       3,
      Z_FINISH:           4,
      Z_BLOCK:            5,
      Z_TREES:            6,

      /* Return codes for the compression/decompression functions. Negative values
      * are errors, positive values are used for special but normal events.
      */
      Z_OK:               0,
      Z_STREAM_END:       1,
      Z_NEED_DICT:        2,
      Z_ERRNO:           -1,
      Z_STREAM_ERROR:    -2,
      Z_DATA_ERROR:      -3,
      Z_MEM_ERROR:       -4,
      Z_BUF_ERROR:       -5,
      //Z_VERSION_ERROR: -6,

      /* compression levels */
      Z_NO_COMPRESSION:         0,
      Z_BEST_SPEED:             1,
      Z_BEST_COMPRESSION:       9,
      Z_DEFAULT_COMPRESSION:   -1,


      Z_FILTERED:               1,
      Z_HUFFMAN_ONLY:           2,
      Z_RLE:                    3,
      Z_FIXED:                  4,
      Z_DEFAULT_STRATEGY:       0,

      /* Possible values of the data_type field (though see inflate()) */
      Z_BINARY:                 0,
      Z_TEXT:                   1,
      //Z_ASCII:                1, // = Z_TEXT (deprecated)
      Z_UNKNOWN:                2,

      /* The deflate compression method */
      Z_DEFLATED:               8
      //Z_NULL:                 null // Use -1 or null inline, depending on var type
    };

    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.

    const { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;




    /* Public constants ==========================================================*/
    /* ===========================================================================*/

    const {
      Z_NO_FLUSH: Z_NO_FLUSH$2, Z_PARTIAL_FLUSH, Z_FULL_FLUSH: Z_FULL_FLUSH$1, Z_FINISH: Z_FINISH$3, Z_BLOCK: Z_BLOCK$1,
      Z_OK: Z_OK$3, Z_STREAM_END: Z_STREAM_END$3, Z_STREAM_ERROR: Z_STREAM_ERROR$2, Z_DATA_ERROR: Z_DATA_ERROR$2, Z_BUF_ERROR: Z_BUF_ERROR$1,
      Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
      Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, Z_FIXED, Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
      Z_UNKNOWN,
      Z_DEFLATED: Z_DEFLATED$2
    } = constants$2;

    /*============================================================================*/


    const MAX_MEM_LEVEL = 9;
    /* Maximum value for memLevel in deflateInit2 */
    const MAX_WBITS$1 = 15;
    /* 32K LZ77 window */
    const DEF_MEM_LEVEL = 8;


    const LENGTH_CODES  = 29;
    /* number of length codes, not counting the special END_BLOCK code */
    const LITERALS      = 256;
    /* number of literal bytes 0..255 */
    const L_CODES       = LITERALS + 1 + LENGTH_CODES;
    /* number of Literal or Length codes, including the END_BLOCK code */
    const D_CODES       = 30;
    /* number of distance codes */
    const BL_CODES      = 19;
    /* number of codes used to transfer the bit lengths */
    const HEAP_SIZE     = 2 * L_CODES + 1;
    /* maximum heap size */
    const MAX_BITS  = 15;
    /* All codes must not exceed MAX_BITS bits */

    const MIN_MATCH = 3;
    const MAX_MATCH = 258;
    const MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

    const PRESET_DICT = 0x20;

    const INIT_STATE    =  42;    /* zlib header -> BUSY_STATE */
    //#ifdef GZIP
    const GZIP_STATE    =  57;    /* gzip header -> BUSY_STATE | EXTRA_STATE */
    //#endif
    const EXTRA_STATE   =  69;    /* gzip extra block -> NAME_STATE */
    const NAME_STATE    =  73;    /* gzip file name -> COMMENT_STATE */
    const COMMENT_STATE =  91;    /* gzip comment -> HCRC_STATE */
    const HCRC_STATE    = 103;    /* gzip header CRC -> BUSY_STATE */
    const BUSY_STATE    = 113;    /* deflate -> FINISH_STATE */
    const FINISH_STATE  = 666;    /* stream complete */

    const BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
    const BS_BLOCK_DONE     = 2; /* block flush performed */
    const BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
    const BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

    const OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

    const err = (strm, errorCode) => {
      strm.msg = messages[errorCode];
      return errorCode;
    };

    const rank = (f) => {
      return ((f) * 2) - ((f) > 4 ? 9 : 0);
    };

    const zero = (buf) => {
      let len = buf.length; while (--len >= 0) { buf[len] = 0; }
    };

    /* ===========================================================================
     * Slide the hash table when sliding the window down (could be avoided with 32
     * bit values at the expense of memory usage). We slide even when level == 0 to
     * keep the hash table consistent if we switch back to level > 0 later.
     */
    const slide_hash = (s) => {
      let n, m;
      let p;
      let wsize = s.w_size;

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= wsize ? m - wsize : 0);
      } while (--n);
      n = wsize;
    //#ifndef FASTEST
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= wsize ? m - wsize : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);
    //#endif
    };

    /* eslint-disable new-cap */
    let HASH_ZLIB = (s, prev, data) => ((prev << s.hash_shift) ^ data) & s.hash_mask;
    // This hash causes less collisions, https://github.com/nodeca/pako/issues/135
    // But breaks binary compatibility
    //let HASH_FAST = (s, prev, data) => ((prev << 8) + (prev >> 8) + (data << 4)) & s.hash_mask;
    let HASH = HASH_ZLIB;


    /* =========================================================================
     * Flush as much pending output as possible. All deflate() output, except for
     * some deflate_stored() output, goes through this function so some
     * applications may wish to modify it to avoid allocating a large
     * strm->next_out buffer and copying into it. (See also read_buf()).
     */
    const flush_pending = (strm) => {
      const s = strm.state;

      //_tr_flush_bits(s);
      let len = s.pending;
      if (len > strm.avail_out) {
        len = strm.avail_out;
      }
      if (len === 0) { return; }

      strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
      strm.next_out  += len;
      s.pending_out  += len;
      strm.total_out += len;
      strm.avail_out -= len;
      s.pending      -= len;
      if (s.pending === 0) {
        s.pending_out = 0;
      }
    };


    const flush_block_only = (s, last) => {
      _tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
      s.block_start = s.strstart;
      flush_pending(s.strm);
    };


    const put_byte = (s, b) => {
      s.pending_buf[s.pending++] = b;
    };


    /* =========================================================================
     * Put a short in the pending buffer. The 16-bit value is put in MSB order.
     * IN assertion: the stream state is correct and there is enough room in
     * pending_buf.
     */
    const putShortMSB = (s, b) => {

      //  put_byte(s, (Byte)(b >> 8));
    //  put_byte(s, (Byte)(b & 0xff));
      s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
      s.pending_buf[s.pending++] = b & 0xff;
    };


    /* ===========================================================================
     * Read a new buffer from the current input stream, update the adler32
     * and total number of bytes read.  All deflate() input goes through
     * this function so some applications may wish to modify it to avoid
     * allocating a large strm->input buffer and copying from it.
     * (See also flush_pending()).
     */
    const read_buf = (strm, buf, start, size) => {

      let len = strm.avail_in;

      if (len > size) { len = size; }
      if (len === 0) { return 0; }

      strm.avail_in -= len;

      // zmemcpy(buf, strm->next_in, len);
      buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
      if (strm.state.wrap === 1) {
        strm.adler = adler32_1(strm.adler, buf, len, start);
      }

      else if (strm.state.wrap === 2) {
        strm.adler = crc32_1(strm.adler, buf, len, start);
      }

      strm.next_in += len;
      strm.total_in += len;

      return len;
    };


    /* ===========================================================================
     * Set match_start to the longest match starting at the given string and
     * return its length. Matches shorter or equal to prev_length are discarded,
     * in which case the result is equal to prev_length and match_start is
     * garbage.
     * IN assertions: cur_match is the head of the hash chain for the current
     *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
     * OUT assertion: the match length is not greater than s->lookahead.
     */
    const longest_match = (s, cur_match) => {

      let chain_length = s.max_chain_length;      /* max hash chain length */
      let scan = s.strstart; /* current string */
      let match;                       /* matched string */
      let len;                           /* length of current match */
      let best_len = s.prev_length;              /* best match length so far */
      let nice_match = s.nice_match;             /* stop if match long enough */
      const limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
          s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

      const _win = s.window; // shortcut

      const wmask = s.w_mask;
      const prev  = s.prev;

      /* Stop when cur_match becomes <= limit. To simplify the code,
       * we prevent matches with the string of window index 0.
       */

      const strend = s.strstart + MAX_MATCH;
      let scan_end1  = _win[scan + best_len - 1];
      let scan_end   = _win[scan + best_len];

      /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
       * It is easy to get rid of this optimization if necessary.
       */
      // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

      /* Do not waste too much time if we already have a good match: */
      if (s.prev_length >= s.good_match) {
        chain_length >>= 2;
      }
      /* Do not look for matches beyond the end of the input. This is necessary
       * to make deflate deterministic.
       */
      if (nice_match > s.lookahead) { nice_match = s.lookahead; }

      // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

      do {
        // Assert(cur_match < s->strstart, "no future");
        match = cur_match;

        /* Skip to next match if the match length cannot increase
         * or if the match length is less than 2.  Note that the checks below
         * for insufficient lookahead only occur occasionally for performance
         * reasons.  Therefore uninitialized memory will be accessed, and
         * conditional jumps will be made that depend on those values.
         * However the length of the match is limited to the lookahead, so
         * the output of deflate is not affected by the uninitialized values.
         */

        if (_win[match + best_len]     !== scan_end  ||
            _win[match + best_len - 1] !== scan_end1 ||
            _win[match]                !== _win[scan] ||
            _win[++match]              !== _win[scan + 1]) {
          continue;
        }

        /* The check at best_len-1 can be removed because it will be made
         * again later. (This heuristic is not always a win.)
         * It is not necessary to compare scan[2] and match[2] since they
         * are always equal when the other bytes match, given that
         * the hash keys are equal and that HASH_BITS >= 8.
         */
        scan += 2;
        match++;
        // Assert(*scan == *match, "match[2]?");

        /* We check for insufficient lookahead only every 8th comparison;
         * the 256th check will be made at strstart+258.
         */
        do {
          /*jshint noempty:false*/
        } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                 _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                 _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                 _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                 scan < strend);

        // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

        len = MAX_MATCH - (strend - scan);
        scan = strend - MAX_MATCH;

        if (len > best_len) {
          s.match_start = cur_match;
          best_len = len;
          if (len >= nice_match) {
            break;
          }
          scan_end1  = _win[scan + best_len - 1];
          scan_end   = _win[scan + best_len];
        }
      } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

      if (best_len <= s.lookahead) {
        return best_len;
      }
      return s.lookahead;
    };


    /* ===========================================================================
     * Fill the window when the lookahead becomes insufficient.
     * Updates strstart and lookahead.
     *
     * IN assertion: lookahead < MIN_LOOKAHEAD
     * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
     *    At least one byte has been read, or avail_in == 0; reads are
     *    performed for at least two bytes (required for the zip translate_eol
     *    option -- not supported here).
     */
    const fill_window = (s) => {

      const _w_size = s.w_size;
      let n, more, str;

      //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

      do {
        more = s.window_size - s.lookahead - s.strstart;

        // JS ints have 32 bit, block below not needed
        /* Deal with !@#$% 64K limit: */
        //if (sizeof(int) <= 2) {
        //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
        //        more = wsize;
        //
        //  } else if (more == (unsigned)(-1)) {
        //        /* Very unlikely, but possible on 16 bit machine if
        //         * strstart == 0 && lookahead == 1 (input done a byte at time)
        //         */
        //        more--;
        //    }
        //}


        /* If the window is almost full and there is insufficient lookahead,
         * move the upper half to the lower one to make room in the upper half.
         */
        if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

          s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
          s.match_start -= _w_size;
          s.strstart -= _w_size;
          /* we now have strstart >= MAX_DIST */
          s.block_start -= _w_size;
          if (s.insert > s.strstart) {
            s.insert = s.strstart;
          }
          slide_hash(s);
          more += _w_size;
        }
        if (s.strm.avail_in === 0) {
          break;
        }

        /* If there was no sliding:
         *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
         *    more == window_size - lookahead - strstart
         * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
         * => more >= window_size - 2*WSIZE + 2
         * In the BIG_MEM or MMAP case (not yet supported),
         *   window_size == input_size + MIN_LOOKAHEAD  &&
         *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
         * Otherwise, window_size == 2*WSIZE so more >= 2.
         * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
         */
        //Assert(more >= 2, "more < 2");
        n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
        s.lookahead += n;

        /* Initialize the hash value now that we have some input: */
        if (s.lookahead + s.insert >= MIN_MATCH) {
          str = s.strstart - s.insert;
          s.ins_h = s.window[str];

          /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
          s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
    //#if MIN_MATCH != 3
    //        Call update_hash() MIN_MATCH-3 more times
    //#endif
          while (s.insert) {
            /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
            s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);

            s.prev[str & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = str;
            str++;
            s.insert--;
            if (s.lookahead + s.insert < MIN_MATCH) {
              break;
            }
          }
        }
        /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
         * but this is not important since only literal bytes will be emitted.
         */

      } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

      /* If the WIN_INIT bytes after the end of the current data have never been
       * written, then zero those bytes in order to avoid memory check reports of
       * the use of uninitialized (or uninitialised as Julian writes) bytes by
       * the longest match routines.  Update the high water mark for the next
       * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
       * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
       */
    //  if (s.high_water < s.window_size) {
    //    const curr = s.strstart + s.lookahead;
    //    let init = 0;
    //
    //    if (s.high_water < curr) {
    //      /* Previous high water mark below current data -- zero WIN_INIT
    //       * bytes or up to end of window, whichever is less.
    //       */
    //      init = s.window_size - curr;
    //      if (init > WIN_INIT)
    //        init = WIN_INIT;
    //      zmemzero(s->window + curr, (unsigned)init);
    //      s->high_water = curr + init;
    //    }
    //    else if (s->high_water < (ulg)curr + WIN_INIT) {
    //      /* High water mark at or above current data, but below current data
    //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
    //       * to end of window, whichever is less.
    //       */
    //      init = (ulg)curr + WIN_INIT - s->high_water;
    //      if (init > s->window_size - s->high_water)
    //        init = s->window_size - s->high_water;
    //      zmemzero(s->window + s->high_water, (unsigned)init);
    //      s->high_water += init;
    //    }
    //  }
    //
    //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
    //    "not enough room for search");
    };

    /* ===========================================================================
     * Copy without compression as much as possible from the input stream, return
     * the current block state.
     *
     * In case deflateParams() is used to later switch to a non-zero compression
     * level, s->matches (otherwise unused when storing) keeps track of the number
     * of hash table slides to perform. If s->matches is 1, then one hash table
     * slide will be done when switching. If s->matches is 2, the maximum value
     * allowed here, then the hash table will be cleared, since two or more slides
     * is the same as a clear.
     *
     * deflate_stored() is written to minimize the number of times an input byte is
     * copied. It is most efficient with large input and output buffers, which
     * maximizes the opportunites to have a single copy from next_in to next_out.
     */
    const deflate_stored = (s, flush) => {

      /* Smallest worthy block size when not flushing or finishing. By default
       * this is 32K. This can be as small as 507 bytes for memLevel == 1. For
       * large input and output buffers, the stored block size will be larger.
       */
      let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;

      /* Copy as many min_block or larger stored blocks directly to next_out as
       * possible. If flushing, copy the remaining available input to next_out as
       * stored blocks, if there is enough space.
       */
      let len, left, have, last = 0;
      let used = s.strm.avail_in;
      do {
        /* Set len to the maximum size block that we can copy directly with the
         * available input data and output space. Set left to how much of that
         * would be copied from what's left in the window.
         */
        len = 65535/* MAX_STORED */;     /* maximum deflate stored block length */
        have = (s.bi_valid + 42) >> 3;     /* number of header bytes */
        if (s.strm.avail_out < have) {         /* need room for header */
          break;
        }
          /* maximum stored block length that will fit in avail_out: */
        have = s.strm.avail_out - have;
        left = s.strstart - s.block_start;  /* bytes left in window */
        if (len > left + s.strm.avail_in) {
          len = left + s.strm.avail_in;   /* limit len to the input */
        }
        if (len > have) {
          len = have;             /* limit len to the output */
        }

        /* If the stored block would be less than min_block in length, or if
         * unable to copy all of the available input when flushing, then try
         * copying to the window and the pending buffer instead. Also don't
         * write an empty block when flushing -- deflate() does that.
         */
        if (len < min_block && ((len === 0 && flush !== Z_FINISH$3) ||
                            flush === Z_NO_FLUSH$2 ||
                            len !== left + s.strm.avail_in)) {
          break;
        }

        /* Make a dummy stored block in pending to get the header bytes,
         * including any pending bits. This also updates the debugging counts.
         */
        last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
        _tr_stored_block(s, 0, 0, last);

        /* Replace the lengths in the dummy stored block with len. */
        s.pending_buf[s.pending - 4] = len;
        s.pending_buf[s.pending - 3] = len >> 8;
        s.pending_buf[s.pending - 2] = ~len;
        s.pending_buf[s.pending - 1] = ~len >> 8;

        /* Write the stored block header bytes. */
        flush_pending(s.strm);

    //#ifdef ZLIB_DEBUG
    //    /* Update debugging counts for the data about to be copied. */
    //    s->compressed_len += len << 3;
    //    s->bits_sent += len << 3;
    //#endif

        /* Copy uncompressed bytes from the window to next_out. */
        if (left) {
          if (left > len) {
            left = len;
          }
          //zmemcpy(s->strm->next_out, s->window + s->block_start, left);
          s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
          s.strm.next_out += left;
          s.strm.avail_out -= left;
          s.strm.total_out += left;
          s.block_start += left;
          len -= left;
        }

        /* Copy uncompressed bytes directly from next_in to next_out, updating
         * the check value.
         */
        if (len) {
          read_buf(s.strm, s.strm.output, s.strm.next_out, len);
          s.strm.next_out += len;
          s.strm.avail_out -= len;
          s.strm.total_out += len;
        }
      } while (last === 0);

      /* Update the sliding window with the last s->w_size bytes of the copied
       * data, or append all of the copied data to the existing window if less
       * than s->w_size bytes were copied. Also update the number of bytes to
       * insert in the hash tables, in the event that deflateParams() switches to
       * a non-zero compression level.
       */
      used -= s.strm.avail_in;    /* number of input bytes directly copied */
      if (used) {
        /* If any input was used, then no unused input remains in the window,
         * therefore s->block_start == s->strstart.
         */
        if (used >= s.w_size) {  /* supplant the previous history */
          s.matches = 2;     /* clear hash */
          //zmemcpy(s->window, s->strm->next_in - s->w_size, s->w_size);
          s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
          s.strstart = s.w_size;
          s.insert = s.strstart;
        }
        else {
          if (s.window_size - s.strstart <= used) {
            /* Slide the window down. */
            s.strstart -= s.w_size;
            //zmemcpy(s->window, s->window + s->w_size, s->strstart);
            s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
            if (s.matches < 2) {
              s.matches++;   /* add a pending slide_hash() */
            }
            if (s.insert > s.strstart) {
              s.insert = s.strstart;
            }
          }
          //zmemcpy(s->window + s->strstart, s->strm->next_in - used, used);
          s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
          s.strstart += used;
          s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
        }
        s.block_start = s.strstart;
      }
      if (s.high_water < s.strstart) {
        s.high_water = s.strstart;
      }

      /* If the last block was written to next_out, then done. */
      if (last) {
        return BS_FINISH_DONE;
      }

      /* If flushing and all input has been consumed, then done. */
      if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 &&
        s.strm.avail_in === 0 && s.strstart === s.block_start) {
        return BS_BLOCK_DONE;
      }

      /* Fill the window with any remaining input. */
      have = s.window_size - s.strstart;
      if (s.strm.avail_in > have && s.block_start >= s.w_size) {
        /* Slide the window down. */
        s.block_start -= s.w_size;
        s.strstart -= s.w_size;
        //zmemcpy(s->window, s->window + s->w_size, s->strstart);
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;       /* add a pending slide_hash() */
        }
        have += s.w_size;      /* more space now */
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      if (have > s.strm.avail_in) {
        have = s.strm.avail_in;
      }
      if (have) {
        read_buf(s.strm, s.window, s.strstart, have);
        s.strstart += have;
        s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
      }
      if (s.high_water < s.strstart) {
        s.high_water = s.strstart;
      }

      /* There was not enough avail_out to write a complete worthy or flushed
       * stored block to next_out. Write a stored block to pending instead, if we
       * have enough input for a worthy block, or if flushing and there is enough
       * room for the remaining input as a stored block in the pending buffer.
       */
      have = (s.bi_valid + 42) >> 3;     /* number of header bytes */
        /* maximum stored block length that will fit in pending: */
      have = s.pending_buf_size - have > 65535/* MAX_STORED */ ? 65535/* MAX_STORED */ : s.pending_buf_size - have;
      min_block = have > s.w_size ? s.w_size : have;
      left = s.strstart - s.block_start;
      if (left >= min_block ||
         ((left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 &&
         s.strm.avail_in === 0 && left <= have)) {
        len = left > have ? have : left;
        last = flush === Z_FINISH$3 && s.strm.avail_in === 0 &&
             len === left ? 1 : 0;
        _tr_stored_block(s, s.block_start, len, last);
        s.block_start += len;
        flush_pending(s.strm);
      }

      /* We've done all we can with the available input and output. */
      return last ? BS_FINISH_STARTED : BS_NEED_MORE;
    };


    /* ===========================================================================
     * Compress as much as possible from the input stream, return the current
     * block state.
     * This function does not perform lazy evaluation of matches and inserts
     * new strings in the dictionary only for unmatched strings or for short
     * matches. It is used only for the fast compression options.
     */
    const deflate_fast = (s, flush) => {

      let hash_head;        /* head of the hash chain */
      let bflush;           /* set if current block must be flushed */

      for (;;) {
        /* Make sure that we always have enough lookahead, except
         * at the end of the input file. We need MAX_MATCH bytes
         * for the next match, plus MIN_MATCH bytes to insert the
         * string following the next match.
         */
        if (s.lookahead < MIN_LOOKAHEAD) {
          fill_window(s);
          if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break; /* flush the current block */
          }
        }

        /* Insert the string window[strstart .. strstart+2] in the
         * dictionary, and set hash_head to the head of the hash chain:
         */
        hash_head = 0/*NIL*/;
        if (s.lookahead >= MIN_MATCH) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }

        /* Find the longest match, discarding those <= prev_length.
         * At this point we have always match_length < MIN_MATCH
         */
        if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
          /* To simplify the code, we prevent matches with the string
           * of window index 0 (in particular we have to avoid a match
           * of the string with itself at the start of the input file).
           */
          s.match_length = longest_match(s, hash_head);
          /* longest_match() sets match_start */
        }
        if (s.match_length >= MIN_MATCH) {
          // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

          /*** _tr_tally_dist(s, s.strstart - s.match_start,
                         s.match_length - MIN_MATCH, bflush); ***/
          bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

          s.lookahead -= s.match_length;

          /* Insert new strings in the hash table only if the match length
           * is not too large. This saves time but degrades compression.
           */
          if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
            s.match_length--; /* string at strstart already in table */
            do {
              s.strstart++;
              /*** INSERT_STRING(s, s.strstart, hash_head); ***/
              s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = s.strstart;
              /***/
              /* strstart never exceeds WSIZE-MAX_MATCH, so there are
               * always MIN_MATCH bytes ahead.
               */
            } while (--s.match_length !== 0);
            s.strstart++;
          } else
          {
            s.strstart += s.match_length;
            s.match_length = 0;
            s.ins_h = s.window[s.strstart];
            /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);

    //#if MIN_MATCH != 3
    //                Call UPDATE_HASH() MIN_MATCH-3 more times
    //#endif
            /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
             * matter since it will be recomputed at next deflate call.
             */
          }
        } else {
          /* No match, output a literal byte */
          //Tracevv((stderr,"%c", s.window[s.strstart]));
          /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
          bflush = _tr_tally(s, 0, s.window[s.strstart]);

          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
      }
      s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
      if (flush === Z_FINISH$3) {
        /*** FLUSH_BLOCK(s, 1); ***/
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        /***/
        return BS_FINISH_DONE;
      }
      if (s.sym_next) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
      return BS_BLOCK_DONE;
    };

    /* ===========================================================================
     * Same as above, but achieves better compression. We use a lazy
     * evaluation for matches: a match is finally adopted only if there is
     * no better match at the next window position.
     */
    const deflate_slow = (s, flush) => {

      let hash_head;          /* head of hash chain */
      let bflush;              /* set if current block must be flushed */

      let max_insert;

      /* Process the input block. */
      for (;;) {
        /* Make sure that we always have enough lookahead, except
         * at the end of the input file. We need MAX_MATCH bytes
         * for the next match, plus MIN_MATCH bytes to insert the
         * string following the next match.
         */
        if (s.lookahead < MIN_LOOKAHEAD) {
          fill_window(s);
          if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) { break; } /* flush the current block */
        }

        /* Insert the string window[strstart .. strstart+2] in the
         * dictionary, and set hash_head to the head of the hash chain:
         */
        hash_head = 0/*NIL*/;
        if (s.lookahead >= MIN_MATCH) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }

        /* Find the longest match, discarding those <= prev_length.
         */
        s.prev_length = s.match_length;
        s.prev_match = s.match_start;
        s.match_length = MIN_MATCH - 1;

        if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
            s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
          /* To simplify the code, we prevent matches with the string
           * of window index 0 (in particular we have to avoid a match
           * of the string with itself at the start of the input file).
           */
          s.match_length = longest_match(s, hash_head);
          /* longest_match() sets match_start */

          if (s.match_length <= 5 &&
             (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

            /* If prev_match is also MIN_MATCH, match_start is garbage
             * but we will ignore the current match anyway.
             */
            s.match_length = MIN_MATCH - 1;
          }
        }
        /* If there was a match at the previous step and the current
         * match is not better, output the previous match:
         */
        if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
          max_insert = s.strstart + s.lookahead - MIN_MATCH;
          /* Do not insert strings in hash table beyond this. */

          //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

          /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                         s.prev_length - MIN_MATCH, bflush);***/
          bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
          /* Insert in hash table all strings up to the end of the match.
           * strstart-1 and strstart are already inserted. If there is not
           * enough lookahead, the last two strings are not inserted in
           * the hash table.
           */
          s.lookahead -= s.prev_length - 1;
          s.prev_length -= 2;
          do {
            if (++s.strstart <= max_insert) {
              /*** INSERT_STRING(s, s.strstart, hash_head); ***/
              s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = s.strstart;
              /***/
            }
          } while (--s.prev_length !== 0);
          s.match_available = 0;
          s.match_length = MIN_MATCH - 1;
          s.strstart++;

          if (bflush) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
            /***/
          }

        } else if (s.match_available) {
          /* If there was no match at the previous position, output a
           * single literal. If there was a match but the current match
           * is longer, truncate the previous match to a single literal.
           */
          //Tracevv((stderr,"%c", s->window[s->strstart-1]));
          /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
          bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

          if (bflush) {
            /*** FLUSH_BLOCK_ONLY(s, 0) ***/
            flush_block_only(s, false);
            /***/
          }
          s.strstart++;
          s.lookahead--;
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        } else {
          /* There is no previous match to compare with, wait for
           * the next step to decide.
           */
          s.match_available = 1;
          s.strstart++;
          s.lookahead--;
        }
      }
      //Assert (flush != Z_NO_FLUSH, "no flush?");
      if (s.match_available) {
        //Tracevv((stderr,"%c", s->window[s->strstart-1]));
        /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

        s.match_available = 0;
      }
      s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
      if (flush === Z_FINISH$3) {
        /*** FLUSH_BLOCK(s, 1); ***/
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        /***/
        return BS_FINISH_DONE;
      }
      if (s.sym_next) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

      return BS_BLOCK_DONE;
    };


    /* ===========================================================================
     * For Z_RLE, simply look for runs of bytes, generate matches only of distance
     * one.  Do not maintain a hash table.  (It will be regenerated if this run of
     * deflate switches away from Z_RLE.)
     */
    const deflate_rle = (s, flush) => {

      let bflush;            /* set if current block must be flushed */
      let prev;              /* byte at distance one to match */
      let scan, strend;      /* scan goes up to strend for length of run */

      const _win = s.window;

      for (;;) {
        /* Make sure that we always have enough lookahead, except
         * at the end of the input file. We need MAX_MATCH bytes
         * for the longest run, plus one for the unrolled loop.
         */
        if (s.lookahead <= MAX_MATCH) {
          fill_window(s);
          if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) { break; } /* flush the current block */
        }

        /* See how many times the previous byte repeats */
        s.match_length = 0;
        if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
          scan = s.strstart - 1;
          prev = _win[scan];
          if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
            strend = s.strstart + MAX_MATCH;
            do {
              /*jshint noempty:false*/
            } while (prev === _win[++scan] && prev === _win[++scan] &&
                     prev === _win[++scan] && prev === _win[++scan] &&
                     prev === _win[++scan] && prev === _win[++scan] &&
                     prev === _win[++scan] && prev === _win[++scan] &&
                     scan < strend);
            s.match_length = MAX_MATCH - (strend - scan);
            if (s.match_length > s.lookahead) {
              s.match_length = s.lookahead;
            }
          }
          //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
        }

        /* Emit match if have run of MIN_MATCH or longer, else emit literal */
        if (s.match_length >= MIN_MATCH) {
          //check_match(s, s.strstart, s.strstart - 1, s.match_length);

          /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
          bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);

          s.lookahead -= s.match_length;
          s.strstart += s.match_length;
          s.match_length = 0;
        } else {
          /* No match, output a literal byte */
          //Tracevv((stderr,"%c", s->window[s->strstart]));
          /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
          bflush = _tr_tally(s, 0, s.window[s.strstart]);

          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH$3) {
        /*** FLUSH_BLOCK(s, 1); ***/
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        /***/
        return BS_FINISH_DONE;
      }
      if (s.sym_next) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
      return BS_BLOCK_DONE;
    };

    /* ===========================================================================
     * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
     * (It will be regenerated if this run of deflate switches away from Huffman.)
     */
    const deflate_huff = (s, flush) => {

      let bflush;             /* set if current block must be flushed */

      for (;;) {
        /* Make sure that we have a literal to write. */
        if (s.lookahead === 0) {
          fill_window(s);
          if (s.lookahead === 0) {
            if (flush === Z_NO_FLUSH$2) {
              return BS_NEED_MORE;
            }
            break;      /* flush the current block */
          }
        }

        /* Output a literal byte */
        s.match_length = 0;
        //Tracevv((stderr,"%c", s->window[s->strstart]));
        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
        if (bflush) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH$3) {
        /*** FLUSH_BLOCK(s, 1); ***/
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        /***/
        return BS_FINISH_DONE;
      }
      if (s.sym_next) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
      return BS_BLOCK_DONE;
    };

    /* Values for max_lazy_match, good_match and max_chain_length, depending on
     * the desired pack level (0..9). The values given below have been tuned to
     * exclude worst case performance for pathological files. Better values may be
     * found for specific files.
     */
    function Config$2(good_length, max_lazy, nice_length, max_chain, func) {

      this.good_length = good_length;
      this.max_lazy = max_lazy;
      this.nice_length = nice_length;
      this.max_chain = max_chain;
      this.func = func;
    }

    const configuration_table = [
      /*      good lazy nice chain */
      new Config$2(0, 0, 0, 0, deflate_stored),          /* 0 store only */
      new Config$2(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
      new Config$2(4, 5, 16, 8, deflate_fast),           /* 2 */
      new Config$2(4, 6, 32, 32, deflate_fast),          /* 3 */

      new Config$2(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
      new Config$2(8, 16, 32, 32, deflate_slow),         /* 5 */
      new Config$2(8, 16, 128, 128, deflate_slow),       /* 6 */
      new Config$2(8, 32, 128, 256, deflate_slow),       /* 7 */
      new Config$2(32, 128, 258, 1024, deflate_slow),    /* 8 */
      new Config$2(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
    ];


    /* ===========================================================================
     * Initialize the "longest match" routines for a new zlib stream
     */
    const lm_init = (s) => {

      s.window_size = 2 * s.w_size;

      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);

      /* Set the default configuration parameters:
       */
      s.max_lazy_match = configuration_table[s.level].max_lazy;
      s.good_match = configuration_table[s.level].good_length;
      s.nice_match = configuration_table[s.level].nice_length;
      s.max_chain_length = configuration_table[s.level].max_chain;

      s.strstart = 0;
      s.block_start = 0;
      s.lookahead = 0;
      s.insert = 0;
      s.match_length = s.prev_length = MIN_MATCH - 1;
      s.match_available = 0;
      s.ins_h = 0;
    };


    function DeflateState() {
      this.strm = null;            /* pointer back to this zlib stream */
      this.status = 0;            /* as the name implies */
      this.pending_buf = null;      /* output still pending */
      this.pending_buf_size = 0;  /* size of pending_buf */
      this.pending_out = 0;       /* next pending byte to output to the stream */
      this.pending = 0;           /* nb of bytes in the pending buffer */
      this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
      this.gzhead = null;         /* gzip header information to write */
      this.gzindex = 0;           /* where in extra, name, or comment */
      this.method = Z_DEFLATED$2; /* can only be DEFLATED */
      this.last_flush = -1;   /* value of flush param for previous deflate call */

      this.w_size = 0;  /* LZ77 window size (32K by default) */
      this.w_bits = 0;  /* log2(w_size)  (8..16) */
      this.w_mask = 0;  /* w_size - 1 */

      this.window = null;
      /* Sliding window. Input bytes are read into the second half of the window,
       * and move to the first half later to keep a dictionary of at least wSize
       * bytes. With this organization, matches are limited to a distance of
       * wSize-MAX_MATCH bytes, but this ensures that IO is always
       * performed with a length multiple of the block size.
       */

      this.window_size = 0;
      /* Actual size of window: 2*wSize, except when the user input buffer
       * is directly used as sliding window.
       */

      this.prev = null;
      /* Link to older string with same hash index. To limit the size of this
       * array to 64K, this link is maintained only for the last 32K strings.
       * An index in this array is thus a window index modulo 32K.
       */

      this.head = null;   /* Heads of the hash chains or NIL. */

      this.ins_h = 0;       /* hash index of string to be inserted */
      this.hash_size = 0;   /* number of elements in hash table */
      this.hash_bits = 0;   /* log2(hash_size) */
      this.hash_mask = 0;   /* hash_size-1 */

      this.hash_shift = 0;
      /* Number of bits by which ins_h must be shifted at each input
       * step. It must be such that after MIN_MATCH steps, the oldest
       * byte no longer takes part in the hash key, that is:
       *   hash_shift * MIN_MATCH >= hash_bits
       */

      this.block_start = 0;
      /* Window position at the beginning of the current output block. Gets
       * negative when the window is moved backwards.
       */

      this.match_length = 0;      /* length of best match */
      this.prev_match = 0;        /* previous match */
      this.match_available = 0;   /* set if previous match exists */
      this.strstart = 0;          /* start of string to insert */
      this.match_start = 0;       /* start of matching string */
      this.lookahead = 0;         /* number of valid bytes ahead in window */

      this.prev_length = 0;
      /* Length of the best match at previous step. Matches not greater than this
       * are discarded. This is used in the lazy match evaluation.
       */

      this.max_chain_length = 0;
      /* To speed up deflation, hash chains are never searched beyond this
       * length.  A higher limit improves compression ratio but degrades the
       * speed.
       */

      this.max_lazy_match = 0;
      /* Attempt to find a better match only when the current match is strictly
       * smaller than this value. This mechanism is used only for compression
       * levels >= 4.
       */
      // That's alias to max_lazy_match, don't use directly
      //this.max_insert_length = 0;
      /* Insert new strings in the hash table only if the match length is not
       * greater than this length. This saves time but degrades compression.
       * max_insert_length is used only for compression levels <= 3.
       */

      this.level = 0;     /* compression level (1..9) */
      this.strategy = 0;  /* favor or force Huffman coding*/

      this.good_match = 0;
      /* Use a faster search when the previous match is longer than this */

      this.nice_match = 0; /* Stop searching when current match exceeds this */

                  /* used by trees.c: */

      /* Didn't use ct_data typedef below to suppress compiler warning */

      // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
      // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
      // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

      // Use flat array of DOUBLE size, with interleaved fata,
      // because JS does not support effective
      this.dyn_ltree  = new Uint16Array(HEAP_SIZE * 2);
      this.dyn_dtree  = new Uint16Array((2 * D_CODES + 1) * 2);
      this.bl_tree    = new Uint16Array((2 * BL_CODES + 1) * 2);
      zero(this.dyn_ltree);
      zero(this.dyn_dtree);
      zero(this.bl_tree);

      this.l_desc   = null;         /* desc. for literal tree */
      this.d_desc   = null;         /* desc. for distance tree */
      this.bl_desc  = null;         /* desc. for bit length tree */

      //ush bl_count[MAX_BITS+1];
      this.bl_count = new Uint16Array(MAX_BITS + 1);
      /* number of codes at each bit length for an optimal tree */

      //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
      this.heap = new Uint16Array(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
      zero(this.heap);

      this.heap_len = 0;               /* number of elements in the heap */
      this.heap_max = 0;               /* element of largest frequency */
      /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
       * The same heap array is used to build all trees.
       */

      this.depth = new Uint16Array(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
      zero(this.depth);
      /* Depth of each subtree used as tie breaker for trees of equal frequency
       */

      this.sym_buf = 0;        /* buffer for distances and literals/lengths */

      this.lit_bufsize = 0;
      /* Size of match buffer for literals/lengths.  There are 4 reasons for
       * limiting lit_bufsize to 64K:
       *   - frequencies can be kept in 16 bit counters
       *   - if compression is not successful for the first block, all input
       *     data is still in the window so we can still emit a stored block even
       *     when input comes from standard input.  (This can also be done for
       *     all blocks if lit_bufsize is not greater than 32K.)
       *   - if compression is not successful for a file smaller than 64K, we can
       *     even emit a stored file instead of a stored block (saving 5 bytes).
       *     This is applicable only for zip (not gzip or zlib).
       *   - creating new Huffman trees less frequently may not provide fast
       *     adaptation to changes in the input data statistics. (Take for
       *     example a binary file with poorly compressible code followed by
       *     a highly compressible string table.) Smaller buffer sizes give
       *     fast adaptation but have of course the overhead of transmitting
       *     trees more frequently.
       *   - I can't count above 4
       */

      this.sym_next = 0;      /* running index in sym_buf */
      this.sym_end = 0;       /* symbol table full when sym_next reaches this */

      this.opt_len = 0;       /* bit length of current block with optimal trees */
      this.static_len = 0;    /* bit length of current block with static trees */
      this.matches = 0;       /* number of string matches in current block */
      this.insert = 0;        /* bytes at end of window left to insert */


      this.bi_buf = 0;
      /* Output buffer. bits are inserted starting at the bottom (least
       * significant bits).
       */
      this.bi_valid = 0;
      /* Number of valid bits in bi_buf.  All bits above the last valid bit
       * are always zero.
       */

      // Used for window memory init. We safely ignore it for JS. That makes
      // sense only for pointers and memory check tools.
      //this.high_water = 0;
      /* High water mark offset in window for initialized bytes -- bytes above
       * this are set to zero in order to avoid memory check warnings when
       * longest match routines access bytes past the input.  This is then
       * updated to the new high water mark.
       */
    }


    /* =========================================================================
     * Check for a valid deflate stream state. Return 0 if ok, 1 if not.
     */
    const deflateStateCheck = (strm) => {

      if (!strm) {
        return 1;
      }
      const s = strm.state;
      if (!s || s.strm !== strm || (s.status !== INIT_STATE &&
    //#ifdef GZIP
                                    s.status !== GZIP_STATE &&
    //#endif
                                    s.status !== EXTRA_STATE &&
                                    s.status !== NAME_STATE &&
                                    s.status !== COMMENT_STATE &&
                                    s.status !== HCRC_STATE &&
                                    s.status !== BUSY_STATE &&
                                    s.status !== FINISH_STATE)) {
        return 1;
      }
      return 0;
    };


    const deflateResetKeep = (strm) => {

      if (deflateStateCheck(strm)) {
        return err(strm, Z_STREAM_ERROR$2);
      }

      strm.total_in = strm.total_out = 0;
      strm.data_type = Z_UNKNOWN;

      const s = strm.state;
      s.pending = 0;
      s.pending_out = 0;

      if (s.wrap < 0) {
        s.wrap = -s.wrap;
        /* was made negative by deflate(..., Z_FINISH); */
      }
      s.status =
    //#ifdef GZIP
        s.wrap === 2 ? GZIP_STATE :
    //#endif
        s.wrap ? INIT_STATE : BUSY_STATE;
      strm.adler = (s.wrap === 2) ?
        0  // crc32(0, Z_NULL, 0)
      :
        1; // adler32(0, Z_NULL, 0)
      s.last_flush = -2;
      _tr_init(s);
      return Z_OK$3;
    };


    const deflateReset = (strm) => {

      const ret = deflateResetKeep(strm);
      if (ret === Z_OK$3) {
        lm_init(strm.state);
      }
      return ret;
    };


    const deflateSetHeader = (strm, head) => {

      if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
        return Z_STREAM_ERROR$2;
      }
      strm.state.gzhead = head;
      return Z_OK$3;
    };


    const deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {

      if (!strm) { // === Z_NULL
        return Z_STREAM_ERROR$2;
      }
      let wrap = 1;

      if (level === Z_DEFAULT_COMPRESSION$1) {
        level = 6;
      }

      if (windowBits < 0) { /* suppress zlib wrapper */
        wrap = 0;
        windowBits = -windowBits;
      }

      else if (windowBits > 15) {
        wrap = 2;           /* write gzip wrapper instead */
        windowBits -= 16;
      }


      if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 ||
        windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
        strategy < 0 || strategy > Z_FIXED || (windowBits === 8 && wrap !== 1)) {
        return err(strm, Z_STREAM_ERROR$2);
      }


      if (windowBits === 8) {
        windowBits = 9;
      }
      /* until 256-byte window bug fixed */

      const s = new DeflateState();

      strm.state = s;
      s.strm = strm;
      s.status = INIT_STATE;     /* to pass state test in deflateReset() */

      s.wrap = wrap;
      s.gzhead = null;
      s.w_bits = windowBits;
      s.w_size = 1 << s.w_bits;
      s.w_mask = s.w_size - 1;

      s.hash_bits = memLevel + 7;
      s.hash_size = 1 << s.hash_bits;
      s.hash_mask = s.hash_size - 1;
      s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

      s.window = new Uint8Array(s.w_size * 2);
      s.head = new Uint16Array(s.hash_size);
      s.prev = new Uint16Array(s.w_size);

      // Don't need mem init magic for JS.
      //s.high_water = 0;  /* nothing written to s->window yet */

      s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

      /* We overlay pending_buf and sym_buf. This works since the average size
       * for length/distance pairs over any compressed block is assured to be 31
       * bits or less.
       *
       * Analysis: The longest fixed codes are a length code of 8 bits plus 5
       * extra bits, for lengths 131 to 257. The longest fixed distance codes are
       * 5 bits plus 13 extra bits, for distances 16385 to 32768. The longest
       * possible fixed-codes length/distance pair is then 31 bits total.
       *
       * sym_buf starts one-fourth of the way into pending_buf. So there are
       * three bytes in sym_buf for every four bytes in pending_buf. Each symbol
       * in sym_buf is three bytes -- two for the distance and one for the
       * literal/length. As each symbol is consumed, the pointer to the next
       * sym_buf value to read moves forward three bytes. From that symbol, up to
       * 31 bits are written to pending_buf. The closest the written pending_buf
       * bits gets to the next sym_buf symbol to read is just before the last
       * code is written. At that time, 31*(n-2) bits have been written, just
       * after 24*(n-2) bits have been consumed from sym_buf. sym_buf starts at
       * 8*n bits into pending_buf. (Note that the symbol buffer fills when n-1
       * symbols are written.) The closest the writing gets to what is unread is
       * then n+14 bits. Here n is lit_bufsize, which is 16384 by default, and
       * can range from 128 to 32768.
       *
       * Therefore, at a minimum, there are 142 bits of space between what is
       * written and what is read in the overlain buffers, so the symbols cannot
       * be overwritten by the compressed data. That space is actually 139 bits,
       * due to the three-bit fixed-code block header.
       *
       * That covers the case where either Z_FIXED is specified, forcing fixed
       * codes, or when the use of fixed codes is chosen, because that choice
       * results in a smaller compressed block than dynamic codes. That latter
       * condition then assures that the above analysis also covers all dynamic
       * blocks. A dynamic-code block will only be chosen to be emitted if it has
       * fewer bits than a fixed-code block would for the same set of symbols.
       * Therefore its average symbol length is assured to be less than 31. So
       * the compressed data for a dynamic block also cannot overwrite the
       * symbols from which it is being constructed.
       */

      s.pending_buf_size = s.lit_bufsize * 4;
      s.pending_buf = new Uint8Array(s.pending_buf_size);

      // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
      //s->sym_buf = s->pending_buf + s->lit_bufsize;
      s.sym_buf = s.lit_bufsize;

      //s->sym_end = (s->lit_bufsize - 1) * 3;
      s.sym_end = (s.lit_bufsize - 1) * 3;
      /* We avoid equality with lit_bufsize*3 because of wraparound at 64K
       * on 16 bit machines and because stored blocks are restricted to
       * 64K-1 bytes.
       */

      s.level = level;
      s.strategy = strategy;
      s.method = method;

      return deflateReset(strm);
    };

    const deflateInit = (strm, level) => {

      return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
    };


    /* ========================================================================= */
    const deflate$2 = (strm, flush) => {

      if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
        return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
      }

      const s = strm.state;

      if (!strm.output ||
          (strm.avail_in !== 0 && !strm.input) ||
          (s.status === FINISH_STATE && flush !== Z_FINISH$3)) {
        return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
      }

      const old_flush = s.last_flush;
      s.last_flush = flush;

      /* Flush as much pending output as possible */
      if (s.pending !== 0) {
        flush_pending(strm);
        if (strm.avail_out === 0) {
          /* Since avail_out is 0, deflate will be called again with
           * more output space, but possibly with both pending and
           * avail_in equal to zero. There won't be anything to do,
           * but this is not an error situation so make sure we
           * return OK instead of BUF_ERROR at next call of deflate:
           */
          s.last_flush = -1;
          return Z_OK$3;
        }

        /* Make sure there is something to do and avoid duplicate consecutive
         * flushes. For repeated and useless calls with Z_FINISH, we keep
         * returning Z_STREAM_END instead of Z_BUF_ERROR.
         */
      } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
        flush !== Z_FINISH$3) {
        return err(strm, Z_BUF_ERROR$1);
      }

      /* User must not provide more input after the first FINISH: */
      if (s.status === FINISH_STATE && strm.avail_in !== 0) {
        return err(strm, Z_BUF_ERROR$1);
      }

      /* Write the header */
      if (s.status === INIT_STATE && s.wrap === 0) {
        s.status = BUSY_STATE;
      }
      if (s.status === INIT_STATE) {
        /* zlib header */
        let header = (Z_DEFLATED$2 + ((s.w_bits - 8) << 4)) << 8;
        let level_flags = -1;

        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= (level_flags << 6);
        if (s.strstart !== 0) { header |= PRESET_DICT; }
        header += 31 - (header % 31);

        putShortMSB(s, header);

        /* Save the adler32 of the preset dictionary: */
        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 0xffff);
        }
        strm.adler = 1; // adler32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;

        /* Compression must start with an empty pending buffer */
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
    //#ifdef GZIP
      if (s.status === GZIP_STATE) {
        /* gzip header */
        strm.adler = 0;  //crc32(0L, Z_NULL, 0);
        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);
        if (!s.gzhead) { // s->gzhead == Z_NULL
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, s.level === 9 ? 2 :
                      (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                       4 : 0));
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;

          /* Compression must start with an empty pending buffer */
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
        }
        else {
          put_byte(s, (s.gzhead.text ? 1 : 0) +
                      (s.gzhead.hcrc ? 2 : 0) +
                      (!s.gzhead.extra ? 0 : 4) +
                      (!s.gzhead.name ? 0 : 8) +
                      (!s.gzhead.comment ? 0 : 16)
          );
          put_byte(s, s.gzhead.time & 0xff);
          put_byte(s, (s.gzhead.time >> 8) & 0xff);
          put_byte(s, (s.gzhead.time >> 16) & 0xff);
          put_byte(s, (s.gzhead.time >> 24) & 0xff);
          put_byte(s, s.level === 9 ? 2 :
                      (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                       4 : 0));
          put_byte(s, s.gzhead.os & 0xff);
          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 0xff);
            put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
          }
          if (s.gzhead.hcrc) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
          }
          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      }
      if (s.status === EXTRA_STATE) {
        if (s.gzhead.extra/* != Z_NULL*/) {
          let beg = s.pending;   /* start of bytes to update crc */
          let left = (s.gzhead.extra.length & 0xffff) - s.gzindex;
          while (s.pending + left > s.pending_buf_size) {
            let copy = s.pending_buf_size - s.pending;
            // zmemcpy(s.pending_buf + s.pending,
            //    s.gzhead.extra + s.gzindex, copy);
            s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
            s.pending = s.pending_buf_size;
            //--- HCRC_UPDATE(beg) ---//
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            //---//
            s.gzindex += copy;
            flush_pending(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK$3;
            }
            beg = 0;
            left -= copy;
          }
          // JS specific: s.gzhead.extra may be TypedArray or Array for backward compatibility
          //              TypedArray.slice and TypedArray.from don't exist in IE10-IE11
          let gzhead_extra = new Uint8Array(s.gzhead.extra);
          // zmemcpy(s->pending_buf + s->pending,
          //     s->gzhead->extra + s->gzindex, left);
          s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
          s.pending += left;
          //--- HCRC_UPDATE(beg) ---//
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          //---//
          s.gzindex = 0;
        }
        s.status = NAME_STATE;
      }
      if (s.status === NAME_STATE) {
        if (s.gzhead.name/* != Z_NULL*/) {
          let beg = s.pending;   /* start of bytes to update crc */
          let val;
          do {
            if (s.pending === s.pending_buf_size) {
              //--- HCRC_UPDATE(beg) ---//
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              //---//
              flush_pending(strm);
              if (s.pending !== 0) {
                s.last_flush = -1;
                return Z_OK$3;
              }
              beg = 0;
            }
            // JS specific: little magic to add zero terminator to end of string
            if (s.gzindex < s.gzhead.name.length) {
              val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
            } else {
              val = 0;
            }
            put_byte(s, val);
          } while (val !== 0);
          //--- HCRC_UPDATE(beg) ---//
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          //---//
          s.gzindex = 0;
        }
        s.status = COMMENT_STATE;
      }
      if (s.status === COMMENT_STATE) {
        if (s.gzhead.comment/* != Z_NULL*/) {
          let beg = s.pending;   /* start of bytes to update crc */
          let val;
          do {
            if (s.pending === s.pending_buf_size) {
              //--- HCRC_UPDATE(beg) ---//
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              //---//
              flush_pending(strm);
              if (s.pending !== 0) {
                s.last_flush = -1;
                return Z_OK$3;
              }
              beg = 0;
            }
            // JS specific: little magic to add zero terminator to end of string
            if (s.gzindex < s.gzhead.comment.length) {
              val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
            } else {
              val = 0;
            }
            put_byte(s, val);
          } while (val !== 0);
          //--- HCRC_UPDATE(beg) ---//
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          //---//
        }
        s.status = HCRC_STATE;
      }
      if (s.status === HCRC_STATE) {
        if (s.gzhead.hcrc) {
          if (s.pending + 2 > s.pending_buf_size) {
            flush_pending(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK$3;
            }
          }
          put_byte(s, strm.adler & 0xff);
          put_byte(s, (strm.adler >> 8) & 0xff);
          strm.adler = 0; //crc32(0L, Z_NULL, 0);
        }
        s.status = BUSY_STATE;

        /* Compression must start with an empty pending buffer */
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
    //#endif

      /* Start a new block or continue the current one.
       */
      if (strm.avail_in !== 0 || s.lookahead !== 0 ||
        (flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE)) {
        let bstate = s.level === 0 ? deflate_stored(s, flush) :
                     s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) :
                     s.strategy === Z_RLE ? deflate_rle(s, flush) :
                     configuration_table[s.level].func(s, flush);

        if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
          s.status = FINISH_STATE;
        }
        if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            /* avoid BUF_ERROR next call, see above */
          }
          return Z_OK$3;
          /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
           * of deflate should use the same flush parameter to make sure
           * that the flush is complete. So we don't have to output an
           * empty block here, this will be done at next call. This also
           * ensures that for a very small output buffer, we emit at most
           * one empty block.
           */
        }
        if (bstate === BS_BLOCK_DONE) {
          if (flush === Z_PARTIAL_FLUSH) {
            _tr_align(s);
          }
          else if (flush !== Z_BLOCK$1) { /* FULL_FLUSH or SYNC_FLUSH */

            _tr_stored_block(s, 0, 0, false);
            /* For a full flush, this empty block will be recognized
             * as a special marker by inflate_sync().
             */
            if (flush === Z_FULL_FLUSH$1) {
              /*** CLEAR_HASH(s); ***/             /* forget history */
              zero(s.head); // Fill with NIL (= 0);

              if (s.lookahead === 0) {
                s.strstart = 0;
                s.block_start = 0;
                s.insert = 0;
              }
            }
          }
          flush_pending(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
            return Z_OK$3;
          }
        }
      }

      if (flush !== Z_FINISH$3) { return Z_OK$3; }
      if (s.wrap <= 0) { return Z_STREAM_END$3; }

      /* Write the trailer */
      if (s.wrap === 2) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        put_byte(s, (strm.adler >> 16) & 0xff);
        put_byte(s, (strm.adler >> 24) & 0xff);
        put_byte(s, strm.total_in & 0xff);
        put_byte(s, (strm.total_in >> 8) & 0xff);
        put_byte(s, (strm.total_in >> 16) & 0xff);
        put_byte(s, (strm.total_in >> 24) & 0xff);
      }
      else
      {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }

      flush_pending(strm);
      /* If avail_out is zero, the application will call deflate again
       * to flush the rest.
       */
      if (s.wrap > 0) { s.wrap = -s.wrap; }
      /* write the trailer only once! */
      return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
    };


    const deflateEnd = (strm) => {

      if (deflateStateCheck(strm)) {
        return Z_STREAM_ERROR$2;
      }

      const status = strm.state.status;

      strm.state = null;

      return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
    };


    /* =========================================================================
     * Initializes the compression dictionary from the given byte
     * sequence without producing any compressed output.
     */
    const deflateSetDictionary = (strm, dictionary) => {

      let dictLength = dictionary.length;

      if (deflateStateCheck(strm)) {
        return Z_STREAM_ERROR$2;
      }

      const s = strm.state;
      const wrap = s.wrap;

      if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
        return Z_STREAM_ERROR$2;
      }

      /* when using zlib wrappers, compute Adler-32 for provided dictionary */
      if (wrap === 1) {
        /* adler32(strm->adler, dictionary, dictLength); */
        strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
      }

      s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

      /* if dictionary would fill window, just replace the history */
      if (dictLength >= s.w_size) {
        if (wrap === 0) {            /* already empty otherwise */
          /*** CLEAR_HASH(s); ***/
          zero(s.head); // Fill with NIL (= 0);
          s.strstart = 0;
          s.block_start = 0;
          s.insert = 0;
        }
        /* use the tail */
        // dictionary = dictionary.slice(dictLength - s.w_size);
        let tmpDict = new Uint8Array(s.w_size);
        tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
        dictionary = tmpDict;
        dictLength = s.w_size;
      }
      /* insert dictionary into window and hash */
      const avail = strm.avail_in;
      const next = strm.next_in;
      const input = strm.input;
      strm.avail_in = dictLength;
      strm.next_in = 0;
      strm.input = dictionary;
      fill_window(s);
      while (s.lookahead >= MIN_MATCH) {
        let str = s.strstart;
        let n = s.lookahead - (MIN_MATCH - 1);
        do {
          /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
          s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);

          s.prev[str & s.w_mask] = s.head[s.ins_h];

          s.head[s.ins_h] = str;
          str++;
        } while (--n);
        s.strstart = str;
        s.lookahead = MIN_MATCH - 1;
        fill_window(s);
      }
      s.strstart += s.lookahead;
      s.block_start = s.strstart;
      s.insert = s.lookahead;
      s.lookahead = 0;
      s.match_length = s.prev_length = MIN_MATCH - 1;
      s.match_available = 0;
      strm.next_in = next;
      strm.input = input;
      strm.avail_in = avail;
      s.wrap = wrap;
      return Z_OK$3;
    };


    var deflateInit_1 = deflateInit;
    var deflateInit2_1 = deflateInit2;
    var deflateReset_1 = deflateReset;
    var deflateResetKeep_1 = deflateResetKeep;
    var deflateSetHeader_1 = deflateSetHeader;
    var deflate_2$1 = deflate$2;
    var deflateEnd_1 = deflateEnd;
    var deflateSetDictionary_1 = deflateSetDictionary;
    var deflateInfo = 'pako deflate (from Nodeca project)';

    /* Not implemented
    module.exports.deflateBound = deflateBound;
    module.exports.deflateCopy = deflateCopy;
    module.exports.deflateGetDictionary = deflateGetDictionary;
    module.exports.deflateParams = deflateParams;
    module.exports.deflatePending = deflatePending;
    module.exports.deflatePrime = deflatePrime;
    module.exports.deflateTune = deflateTune;
    */

    var deflate_1$2 = {
    	deflateInit: deflateInit_1,
    	deflateInit2: deflateInit2_1,
    	deflateReset: deflateReset_1,
    	deflateResetKeep: deflateResetKeep_1,
    	deflateSetHeader: deflateSetHeader_1,
    	deflate: deflate_2$1,
    	deflateEnd: deflateEnd_1,
    	deflateSetDictionary: deflateSetDictionary_1,
    	deflateInfo: deflateInfo
    };

    const _has = (obj, key) => {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };

    var assign = function (obj /*from1, from2, from3, ...*/) {
      const sources = Array.prototype.slice.call(arguments, 1);
      while (sources.length) {
        const source = sources.shift();
        if (!source) { continue; }

        if (typeof source !== 'object') {
          throw new TypeError(source + 'must be non-object');
        }

        for (const p in source) {
          if (_has(source, p)) {
            obj[p] = source[p];
          }
        }
      }

      return obj;
    };


    // Join array of chunks to single array.
    var flattenChunks = (chunks) => {
      // calculate data length
      let len = 0;

      for (let i = 0, l = chunks.length; i < l; i++) {
        len += chunks[i].length;
      }

      // join chunks
      const result = new Uint8Array(len);

      for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
        let chunk = chunks[i];
        result.set(chunk, pos);
        pos += chunk.length;
      }

      return result;
    };

    var common = {
    	assign: assign,
    	flattenChunks: flattenChunks
    };

    // String encode/decode helpers


    // Quick check if we can use fast array to bin string conversion
    //
    // - apply(Array) can fail on Android 2.2
    // - apply(Uint8Array) can fail on iOS 5.1 Safari
    //
    let STR_APPLY_UIA_OK = true;

    try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


    // Table with utf8 lengths (calculated by first byte of sequence)
    // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
    // because max possible codepoint is 0x10ffff
    const _utf8len = new Uint8Array(256);
    for (let q = 0; q < 256; q++) {
      _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
    }
    _utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


    // convert string to array (typed, when possible)
    var string2buf = (str) => {
      if (typeof TextEncoder === 'function' && TextEncoder.prototype.encode) {
        return new TextEncoder().encode(str);
      }

      let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

      // count binary size
      for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 0xfc00) === 0xdc00) {
            c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
            m_pos++;
          }
        }
        buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
      }

      // allocate buffer
      buf = new Uint8Array(buf_len);

      // convert
      for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 0xfc00) === 0xdc00) {
            c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
            m_pos++;
          }
        }
        if (c < 0x80) {
          /* one byte */
          buf[i++] = c;
        } else if (c < 0x800) {
          /* two bytes */
          buf[i++] = 0xC0 | (c >>> 6);
          buf[i++] = 0x80 | (c & 0x3f);
        } else if (c < 0x10000) {
          /* three bytes */
          buf[i++] = 0xE0 | (c >>> 12);
          buf[i++] = 0x80 | (c >>> 6 & 0x3f);
          buf[i++] = 0x80 | (c & 0x3f);
        } else {
          /* four bytes */
          buf[i++] = 0xf0 | (c >>> 18);
          buf[i++] = 0x80 | (c >>> 12 & 0x3f);
          buf[i++] = 0x80 | (c >>> 6 & 0x3f);
          buf[i++] = 0x80 | (c & 0x3f);
        }
      }

      return buf;
    };

    // Helper
    const buf2binstring = (buf, len) => {
      // On Chrome, the arguments in a function call that are allowed is `65534`.
      // If the length of the buffer is smaller than that, we can use this optimization,
      // otherwise we will take a slower path.
      if (len < 65534) {
        if (buf.subarray && STR_APPLY_UIA_OK) {
          return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
        }
      }

      let result = '';
      for (let i = 0; i < len; i++) {
        result += String.fromCharCode(buf[i]);
      }
      return result;
    };


    // convert array to string
    var buf2string = (buf, max) => {
      const len = max || buf.length;

      if (typeof TextDecoder === 'function' && TextDecoder.prototype.decode) {
        return new TextDecoder().decode(buf.subarray(0, max));
      }

      let i, out;

      // Reserve max possible length (2 words per char)
      // NB: by unknown reasons, Array is significantly faster for
      //     String.fromCharCode.apply than Uint16Array.
      const utf16buf = new Array(len * 2);

      for (out = 0, i = 0; i < len;) {
        let c = buf[i++];
        // quick process ascii
        if (c < 0x80) { utf16buf[out++] = c; continue; }

        let c_len = _utf8len[c];
        // skip 5 & 6 byte codes
        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

        // apply mask on first byte
        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
        // join the rest
        while (c_len > 1 && i < len) {
          c = (c << 6) | (buf[i++] & 0x3f);
          c_len--;
        }

        // terminated by end of string?
        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

        if (c < 0x10000) {
          utf16buf[out++] = c;
        } else {
          c -= 0x10000;
          utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
          utf16buf[out++] = 0xdc00 | (c & 0x3ff);
        }
      }

      return buf2binstring(utf16buf, out);
    };


    // Calculate max possible position in utf8 buffer,
    // that will not break sequence. If that's not possible
    // - (very small limits) return max size as is.
    //
    // buf[] - utf8 bytes array
    // max   - length limit (mandatory);
    var utf8border = (buf, max) => {

      max = max || buf.length;
      if (max > buf.length) { max = buf.length; }

      // go back from last position, until start of sequence found
      let pos = max - 1;
      while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

      // Very small and broken sequence,
      // return max, because we should return something anyway.
      if (pos < 0) { return max; }

      // If we came to start of buffer - that means buffer is too small,
      // return max too.
      if (pos === 0) { return max; }

      return (pos + _utf8len[buf[pos]] > max) ? pos : max;
    };

    var strings = {
    	string2buf: string2buf,
    	buf2string: buf2string,
    	utf8border: utf8border
    };

    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.

    function ZStream() {
      /* next input byte */
      this.input = null; // JS specific, because we have no pointers
      this.next_in = 0;
      /* number of bytes available at input */
      this.avail_in = 0;
      /* total number of input bytes read so far */
      this.total_in = 0;
      /* next output byte should be put there */
      this.output = null; // JS specific, because we have no pointers
      this.next_out = 0;
      /* remaining free space at output */
      this.avail_out = 0;
      /* total number of bytes output so far */
      this.total_out = 0;
      /* last error message, NULL if no error */
      this.msg = ''/*Z_NULL*/;
      /* not visible by applications */
      this.state = null;
      /* best guess about the data type: binary or text */
      this.data_type = 2/*Z_UNKNOWN*/;
      /* adler32 value of the uncompressed data */
      this.adler = 0;
    }

    var zstream = ZStream;

    const toString$1 = Object.prototype.toString;

    /* Public constants ==========================================================*/
    /* ===========================================================================*/

    const {
      Z_NO_FLUSH: Z_NO_FLUSH$1, Z_SYNC_FLUSH, Z_FULL_FLUSH, Z_FINISH: Z_FINISH$2,
      Z_OK: Z_OK$2, Z_STREAM_END: Z_STREAM_END$2,
      Z_DEFAULT_COMPRESSION,
      Z_DEFAULT_STRATEGY,
      Z_DEFLATED: Z_DEFLATED$1
    } = constants$2;

    /* ===========================================================================*/


    /**
     * class Deflate
     *
     * Generic JS-style wrapper for zlib calls. If you don't need
     * streaming behaviour - use more simple functions: [[deflate]],
     * [[deflateRaw]] and [[gzip]].
     **/

    /* internal
     * Deflate.chunks -> Array
     *
     * Chunks of output data, if [[Deflate#onData]] not overridden.
     **/

    /**
     * Deflate.result -> Uint8Array
     *
     * Compressed result, generated by default [[Deflate#onData]]
     * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
     * (call [[Deflate#push]] with `Z_FINISH` / `true` param).
     **/

    /**
     * Deflate.err -> Number
     *
     * Error code after deflate finished. 0 (Z_OK) on success.
     * You will not need it in real life, because deflate errors
     * are possible only on wrong options or bad `onData` / `onEnd`
     * custom handlers.
     **/

    /**
     * Deflate.msg -> String
     *
     * Error message, if [[Deflate.err]] != 0
     **/


    /**
     * new Deflate(options)
     * - options (Object): zlib deflate options.
     *
     * Creates new deflator instance with specified params. Throws exception
     * on bad params. Supported options:
     *
     * - `level`
     * - `windowBits`
     * - `memLevel`
     * - `strategy`
     * - `dictionary`
     *
     * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
     * for more information on these.
     *
     * Additional options, for internal needs:
     *
     * - `chunkSize` - size of generated data chunks (16K by default)
     * - `raw` (Boolean) - do raw deflate
     * - `gzip` (Boolean) - create gzip wrapper
     * - `header` (Object) - custom header for gzip
     *   - `text` (Boolean) - true if compressed data believed to be text
     *   - `time` (Number) - modification time, unix timestamp
     *   - `os` (Number) - operation system code
     *   - `extra` (Array) - array of bytes with extra data (max 65536)
     *   - `name` (String) - file name (binary string)
     *   - `comment` (String) - comment (binary string)
     *   - `hcrc` (Boolean) - true if header crc should be added
     *
     * ##### Example:
     *
     * ```javascript
     * const pako = require('pako')
     *   , chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
     *   , chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
     *
     * const deflate = new pako.Deflate({ level: 3});
     *
     * deflate.push(chunk1, false);
     * deflate.push(chunk2, true);  // true -> last chunk
     *
     * if (deflate.err) { throw new Error(deflate.err); }
     *
     * console.log(deflate.result);
     * ```
     **/
    function Deflate$1(options) {
      this.options = common.assign({
        level: Z_DEFAULT_COMPRESSION,
        method: Z_DEFLATED$1,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: Z_DEFAULT_STRATEGY
      }, options || {});

      let opt = this.options;

      if (opt.raw && (opt.windowBits > 0)) {
        opt.windowBits = -opt.windowBits;
      }

      else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
        opt.windowBits += 16;
      }

      this.err    = 0;      // error code, if happens (0 = Z_OK)
      this.msg    = '';     // error message
      this.ended  = false;  // used to avoid multiple onEnd() calls
      this.chunks = [];     // chunks of compressed data

      this.strm = new zstream();
      this.strm.avail_out = 0;

      let status = deflate_1$2.deflateInit2(
        this.strm,
        opt.level,
        opt.method,
        opt.windowBits,
        opt.memLevel,
        opt.strategy
      );

      if (status !== Z_OK$2) {
        throw new Error(messages[status]);
      }

      if (opt.header) {
        deflate_1$2.deflateSetHeader(this.strm, opt.header);
      }

      if (opt.dictionary) {
        let dict;
        // Convert data if needed
        if (typeof opt.dictionary === 'string') {
          // If we need to compress text, change encoding to utf8.
          dict = strings.string2buf(opt.dictionary);
        } else if (toString$1.call(opt.dictionary) === '[object ArrayBuffer]') {
          dict = new Uint8Array(opt.dictionary);
        } else {
          dict = opt.dictionary;
        }

        status = deflate_1$2.deflateSetDictionary(this.strm, dict);

        if (status !== Z_OK$2) {
          throw new Error(messages[status]);
        }

        this._dict_set = true;
      }
    }

    /**
     * Deflate#push(data[, flush_mode]) -> Boolean
     * - data (Uint8Array|ArrayBuffer|String): input data. Strings will be
     *   converted to utf8 byte sequence.
     * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
     *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
     *
     * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
     * new compressed chunks. Returns `true` on success. The last data block must
     * have `flush_mode` Z_FINISH (or `true`). That will flush internal pending
     * buffers and call [[Deflate#onEnd]].
     *
     * On fail call [[Deflate#onEnd]] with error code and return false.
     *
     * ##### Example
     *
     * ```javascript
     * push(chunk, false); // push one of data chunks
     * ...
     * push(chunk, true);  // push last chunk
     * ```
     **/
    Deflate$1.prototype.push = function (data, flush_mode) {
      const strm = this.strm;
      const chunkSize = this.options.chunkSize;
      let status, _flush_mode;

      if (this.ended) { return false; }

      if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
      else _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;

      // Convert data if needed
      if (typeof data === 'string') {
        // If we need to compress text, change encoding to utf8.
        strm.input = strings.string2buf(data);
      } else if (toString$1.call(data) === '[object ArrayBuffer]') {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }

      strm.next_in = 0;
      strm.avail_in = strm.input.length;

      for (;;) {
        if (strm.avail_out === 0) {
          strm.output = new Uint8Array(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }

        // Make sure avail_out > 6 to avoid repeating markers
        if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
          this.onData(strm.output.subarray(0, strm.next_out));
          strm.avail_out = 0;
          continue;
        }

        status = deflate_1$2.deflate(strm, _flush_mode);

        // Ended => flush and finish
        if (status === Z_STREAM_END$2) {
          if (strm.next_out > 0) {
            this.onData(strm.output.subarray(0, strm.next_out));
          }
          status = deflate_1$2.deflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return status === Z_OK$2;
        }

        // Flush if out buffer full
        if (strm.avail_out === 0) {
          this.onData(strm.output);
          continue;
        }

        // Flush if requested and has data
        if (_flush_mode > 0 && strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
          strm.avail_out = 0;
          continue;
        }

        if (strm.avail_in === 0) break;
      }

      return true;
    };


    /**
     * Deflate#onData(chunk) -> Void
     * - chunk (Uint8Array): output data.
     *
     * By default, stores data blocks in `chunks[]` property and glue
     * those in `onEnd`. Override this handler, if you need another behaviour.
     **/
    Deflate$1.prototype.onData = function (chunk) {
      this.chunks.push(chunk);
    };


    /**
     * Deflate#onEnd(status) -> Void
     * - status (Number): deflate status. 0 (Z_OK) on success,
     *   other if not.
     *
     * Called once after you tell deflate that the input stream is
     * complete (Z_FINISH). By default - join collected chunks,
     * free memory and fill `results` / `err` properties.
     **/
    Deflate$1.prototype.onEnd = function (status) {
      // On success - join
      if (status === Z_OK$2) {
        this.result = common.flattenChunks(this.chunks);
      }
      this.chunks = [];
      this.err = status;
      this.msg = this.strm.msg;
    };


    /**
     * deflate(data[, options]) -> Uint8Array
     * - data (Uint8Array|ArrayBuffer|String): input data to compress.
     * - options (Object): zlib deflate options.
     *
     * Compress `data` with deflate algorithm and `options`.
     *
     * Supported options are:
     *
     * - level
     * - windowBits
     * - memLevel
     * - strategy
     * - dictionary
     *
     * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
     * for more information on these.
     *
     * Sugar (options):
     *
     * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
     *   negative windowBits implicitly.
     *
     * ##### Example:
     *
     * ```javascript
     * const pako = require('pako')
     * const data = new Uint8Array([1,2,3,4,5,6,7,8,9]);
     *
     * console.log(pako.deflate(data));
     * ```
     **/
    function deflate$1(input, options) {
      const deflator = new Deflate$1(options);

      deflator.push(input, true);

      // That will never happens, if you don't cheat with options :)
      if (deflator.err) { throw deflator.msg || messages[deflator.err]; }

      return deflator.result;
    }


    /**
     * deflateRaw(data[, options]) -> Uint8Array
     * - data (Uint8Array|ArrayBuffer|String): input data to compress.
     * - options (Object): zlib deflate options.
     *
     * The same as [[deflate]], but creates raw data, without wrapper
     * (header and adler32 crc).
     **/
    function deflateRaw$1(input, options) {
      options = options || {};
      options.raw = true;
      return deflate$1(input, options);
    }


    /**
     * gzip(data[, options]) -> Uint8Array
     * - data (Uint8Array|ArrayBuffer|String): input data to compress.
     * - options (Object): zlib deflate options.
     *
     * The same as [[deflate]], but create gzip wrapper instead of
     * deflate one.
     **/
    function gzip$1(input, options) {
      options = options || {};
      options.gzip = true;
      return deflate$1(input, options);
    }


    var Deflate_1$1 = Deflate$1;
    var deflate_2 = deflate$1;
    var deflateRaw_1$1 = deflateRaw$1;
    var gzip_1$1 = gzip$1;
    var constants$1 = constants$2;

    var deflate_1$1 = {
    	Deflate: Deflate_1$1,
    	deflate: deflate_2,
    	deflateRaw: deflateRaw_1$1,
    	gzip: gzip_1$1,
    	constants: constants$1
    };

    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.

    // See state defs from inflate.js
    const BAD$1 = 16209;       /* got a data error -- remain here until reset */
    const TYPE$1 = 16191;      /* i: waiting for type bits, including last-flag bit */

    /*
       Decode literal, length, and distance codes and write out the resulting
       literal and match bytes until either not enough input or output is
       available, an end-of-block is encountered, or a data error is encountered.
       When large enough input and output buffers are supplied to inflate(), for
       example, a 16K input buffer and a 64K output buffer, more than 95% of the
       inflate execution time is spent in this routine.

       Entry assumptions:

            state.mode === LEN
            strm.avail_in >= 6
            strm.avail_out >= 258
            start >= strm.avail_out
            state.bits < 8

       On return, state.mode is one of:

            LEN -- ran out of enough output space or enough available input
            TYPE -- reached end of block code, inflate() to interpret next block
            BAD -- error in block data

       Notes:

        - The maximum input bits used by a length/distance pair is 15 bits for the
          length code, 5 bits for the length extra, 15 bits for the distance code,
          and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
          Therefore if strm.avail_in >= 6, then there is enough input to avoid
          checking for available input while decoding.

        - The maximum bytes that a single length/distance pair can output is 258
          bytes, which is the maximum length that can be coded.  inflate_fast()
          requires strm.avail_out >= 258 for each loop to avoid checking for
          output space.
     */
    var inffast = function inflate_fast(strm, start) {
      let _in;                    /* local strm.input */
      let last;                   /* have enough input while in < last */
      let _out;                   /* local strm.output */
      let beg;                    /* inflate()'s initial strm.output */
      let end;                    /* while out < end, enough space available */
    //#ifdef INFLATE_STRICT
      let dmax;                   /* maximum distance from zlib header */
    //#endif
      let wsize;                  /* window size or zero if not using window */
      let whave;                  /* valid bytes in the window */
      let wnext;                  /* window write index */
      // Use `s_window` instead `window`, avoid conflict with instrumentation tools
      let s_window;               /* allocated sliding window, if wsize != 0 */
      let hold;                   /* local strm.hold */
      let bits;                   /* local strm.bits */
      let lcode;                  /* local strm.lencode */
      let dcode;                  /* local strm.distcode */
      let lmask;                  /* mask for first level of length codes */
      let dmask;                  /* mask for first level of distance codes */
      let here;                   /* retrieved table entry */
      let op;                     /* code bits, operation, extra bits, or */
                                  /*  window position, window bytes to copy */
      let len;                    /* match length, unused bytes */
      let dist;                   /* match distance */
      let from;                   /* where to copy match from */
      let from_source;


      let input, output; // JS specific, because we have no pointers

      /* copy state to local variables */
      const state = strm.state;
      //here = state.here;
      _in = strm.next_in;
      input = strm.input;
      last = _in + (strm.avail_in - 5);
      _out = strm.next_out;
      output = strm.output;
      beg = _out - (start - strm.avail_out);
      end = _out + (strm.avail_out - 257);
    //#ifdef INFLATE_STRICT
      dmax = state.dmax;
    //#endif
      wsize = state.wsize;
      whave = state.whave;
      wnext = state.wnext;
      s_window = state.window;
      hold = state.hold;
      bits = state.bits;
      lcode = state.lencode;
      dcode = state.distcode;
      lmask = (1 << state.lenbits) - 1;
      dmask = (1 << state.distbits) - 1;


      /* decode literals and length/distances until end-of-block or not enough
         input data or output space */

      top:
      do {
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }

        here = lcode[hold & lmask];

        dolen:
        for (;;) { // Goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;
          if (op === 0) {                          /* literal */
            //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
            //        "inflate:         literal '%c'\n" :
            //        "inflate:         literal 0x%02x\n", here.val));
            output[_out++] = here & 0xffff/*here.val*/;
          }
          else if (op & 16) {                     /* length base */
            len = here & 0xffff/*here.val*/;
            op &= 15;                           /* number of extra bits */
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & ((1 << op) - 1);
              hold >>>= op;
              bits -= op;
            }
            //Tracevv((stderr, "inflate:         length %u\n", len));
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];

            dodist:
            for (;;) { // goto emulation
              op = here >>> 24/*here.bits*/;
              hold >>>= op;
              bits -= op;
              op = (here >>> 16) & 0xff/*here.op*/;

              if (op & 16) {                      /* distance base */
                dist = here & 0xffff/*here.val*/;
                op &= 15;                       /* number of extra bits */
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                }
                dist += hold & ((1 << op) - 1);
    //#ifdef INFLATE_STRICT
                if (dist > dmax) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD$1;
                  break top;
                }
    //#endif
                hold >>>= op;
                bits -= op;
                //Tracevv((stderr, "inflate:         distance %u\n", dist));
                op = _out - beg;                /* max distance in output */
                if (dist > op) {                /* see if copy from window */
                  op = dist - op;               /* distance back in window */
                  if (op > whave) {
                    if (state.sane) {
                      strm.msg = 'invalid distance too far back';
                      state.mode = BAD$1;
                      break top;
                    }

    // (!) This block is disabled in zlib defaults,
    // don't enable it for binary compatibility
    //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
    //                if (len <= op - whave) {
    //                  do {
    //                    output[_out++] = 0;
    //                  } while (--len);
    //                  continue top;
    //                }
    //                len -= op - whave;
    //                do {
    //                  output[_out++] = 0;
    //                } while (--op > whave);
    //                if (op === 0) {
    //                  from = _out - dist;
    //                  do {
    //                    output[_out++] = output[from++];
    //                  } while (--len);
    //                  continue top;
    //                }
    //#endif
                  }
                  from = 0; // window index
                  from_source = s_window;
                  if (wnext === 0) {           /* very common case */
                    from += wsize - op;
                    if (op < len) {         /* some from window */
                      len -= op;
                      do {
                        output[_out++] = s_window[from++];
                      } while (--op);
                      from = _out - dist;  /* rest from output */
                      from_source = output;
                    }
                  }
                  else if (wnext < op) {      /* wrap around window */
                    from += wsize + wnext - op;
                    op -= wnext;
                    if (op < len) {         /* some from end of window */
                      len -= op;
                      do {
                        output[_out++] = s_window[from++];
                      } while (--op);
                      from = 0;
                      if (wnext < len) {  /* some from start of window */
                        op = wnext;
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;      /* rest from output */
                        from_source = output;
                      }
                    }
                  }
                  else {                      /* contiguous in window */
                    from += wnext - op;
                    if (op < len) {         /* some from window */
                      len -= op;
                      do {
                        output[_out++] = s_window[from++];
                      } while (--op);
                      from = _out - dist;  /* rest from output */
                      from_source = output;
                    }
                  }
                  while (len > 2) {
                    output[_out++] = from_source[from++];
                    output[_out++] = from_source[from++];
                    output[_out++] = from_source[from++];
                    len -= 3;
                  }
                  if (len) {
                    output[_out++] = from_source[from++];
                    if (len > 1) {
                      output[_out++] = from_source[from++];
                    }
                  }
                }
                else {
                  from = _out - dist;          /* copy direct from output */
                  do {                        /* minimum length is three */
                    output[_out++] = output[from++];
                    output[_out++] = output[from++];
                    output[_out++] = output[from++];
                    len -= 3;
                  } while (len > 2);
                  if (len) {
                    output[_out++] = output[from++];
                    if (len > 1) {
                      output[_out++] = output[from++];
                    }
                  }
                }
              }
              else if ((op & 64) === 0) {          /* 2nd level distance code */
                here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
                continue dodist;
              }
              else {
                strm.msg = 'invalid distance code';
                state.mode = BAD$1;
                break top;
              }

              break; // need to emulate goto via "continue"
            }
          }
          else if ((op & 64) === 0) {              /* 2nd level length code */
            here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dolen;
          }
          else if (op & 32) {                     /* end-of-block */
            //Tracevv((stderr, "inflate:         end of block\n"));
            state.mode = TYPE$1;
            break top;
          }
          else {
            strm.msg = 'invalid literal/length code';
            state.mode = BAD$1;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      } while (_in < last && _out < end);

      /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
      len = bits >> 3;
      _in -= len;
      bits -= len << 3;
      hold &= (1 << bits) - 1;

      /* update state and return */
      strm.next_in = _in;
      strm.next_out = _out;
      strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
      strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
      state.hold = hold;
      state.bits = bits;
      return;
    };

    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.

    const MAXBITS = 15;
    const ENOUGH_LENS$1 = 852;
    const ENOUGH_DISTS$1 = 592;
    //const ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

    const CODES$1 = 0;
    const LENS$1 = 1;
    const DISTS$1 = 2;

    const lbase = new Uint16Array([ /* Length codes 257..285 base */
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
      35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
    ]);

    const lext = new Uint8Array([ /* Length codes 257..285 extra */
      16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
      19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
    ]);

    const dbase = new Uint16Array([ /* Distance codes 0..29 base */
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
      257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
      8193, 12289, 16385, 24577, 0, 0
    ]);

    const dext = new Uint8Array([ /* Distance codes 0..29 extra */
      16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
      23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
      28, 28, 29, 29, 64, 64
    ]);

    const inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) =>
    {
      const bits = opts.bits;
          //here = opts.here; /* table entry for duplication */

      let len = 0;               /* a code's length in bits */
      let sym = 0;               /* index of code symbols */
      let min = 0, max = 0;          /* minimum and maximum code lengths */
      let root = 0;              /* number of index bits for root table */
      let curr = 0;              /* number of index bits for current table */
      let drop = 0;              /* code bits to drop for sub-table */
      let left = 0;                   /* number of prefix codes available */
      let used = 0;              /* code entries in table used */
      let huff = 0;              /* Huffman code */
      let incr;              /* for incrementing code, index */
      let fill;              /* index for replicating entries */
      let low;               /* low bits for current root entry */
      let mask;              /* mask for low root bits */
      let next;             /* next available space in table */
      let base = null;     /* base value table to use */
    //  let shoextra;    /* extra bits table to use */
      let match;                  /* use base and extra for symbol >= match */
      const count = new Uint16Array(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
      const offs = new Uint16Array(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
      let extra = null;

      let here_bits, here_op, here_val;

      /*
       Process a set of code lengths to create a canonical Huffman code.  The
       code lengths are lens[0..codes-1].  Each length corresponds to the
       symbols 0..codes-1.  The Huffman code is generated by first sorting the
       symbols by length from short to long, and retaining the symbol order
       for codes with equal lengths.  Then the code starts with all zero bits
       for the first code of the shortest length, and the codes are integer
       increments for the same length, and zeros are appended as the length
       increases.  For the deflate format, these bits are stored backwards
       from their more natural integer increment ordering, and so when the
       decoding tables are built in the large loop below, the integer codes
       are incremented backwards.

       This routine assumes, but does not check, that all of the entries in
       lens[] are in the range 0..MAXBITS.  The caller must assure this.
       1..MAXBITS is interpreted as that code length.  zero means that that
       symbol does not occur in this code.

       The codes are sorted by computing a count of codes for each length,
       creating from that a table of starting indices for each length in the
       sorted table, and then entering the symbols in order in the sorted
       table.  The sorted table is work[], with that space being provided by
       the caller.

       The length counts are used for other purposes as well, i.e. finding
       the minimum and maximum length codes, determining if there are any
       codes at all, checking for a valid set of lengths, and looking ahead
       at length counts to determine sub-table sizes when building the
       decoding tables.
       */

      /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
      for (len = 0; len <= MAXBITS; len++) {
        count[len] = 0;
      }
      for (sym = 0; sym < codes; sym++) {
        count[lens[lens_index + sym]]++;
      }

      /* bound code lengths, force root to be within code lengths */
      root = bits;
      for (max = MAXBITS; max >= 1; max--) {
        if (count[max] !== 0) { break; }
      }
      if (root > max) {
        root = max;
      }
      if (max === 0) {                     /* no symbols to code at all */
        //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
        //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
        //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
        table[table_index++] = (1 << 24) | (64 << 16) | 0;


        //table.op[opts.table_index] = 64;
        //table.bits[opts.table_index] = 1;
        //table.val[opts.table_index++] = 0;
        table[table_index++] = (1 << 24) | (64 << 16) | 0;

        opts.bits = 1;
        return 0;     /* no symbols, but wait for decoding to report error */
      }
      for (min = 1; min < max; min++) {
        if (count[min] !== 0) { break; }
      }
      if (root < min) {
        root = min;
      }

      /* check for an over-subscribed or incomplete set of lengths */
      left = 1;
      for (len = 1; len <= MAXBITS; len++) {
        left <<= 1;
        left -= count[len];
        if (left < 0) {
          return -1;
        }        /* over-subscribed */
      }
      if (left > 0 && (type === CODES$1 || max !== 1)) {
        return -1;                      /* incomplete set */
      }

      /* generate offsets into symbol table for each length for sorting */
      offs[1] = 0;
      for (len = 1; len < MAXBITS; len++) {
        offs[len + 1] = offs[len] + count[len];
      }

      /* sort symbols by length, by symbol order within each length */
      for (sym = 0; sym < codes; sym++) {
        if (lens[lens_index + sym] !== 0) {
          work[offs[lens[lens_index + sym]]++] = sym;
        }
      }

      /*
       Create and fill in decoding tables.  In this loop, the table being
       filled is at next and has curr index bits.  The code being used is huff
       with length len.  That code is converted to an index by dropping drop
       bits off of the bottom.  For codes where len is less than drop + curr,
       those top drop + curr - len bits are incremented through all values to
       fill the table with replicated entries.

       root is the number of index bits for the root table.  When len exceeds
       root, sub-tables are created pointed to by the root entry with an index
       of the low root bits of huff.  This is saved in low to check for when a
       new sub-table should be started.  drop is zero when the root table is
       being filled, and drop is root when sub-tables are being filled.

       When a new sub-table is needed, it is necessary to look ahead in the
       code lengths to determine what size sub-table is needed.  The length
       counts are used for this, and so count[] is decremented as codes are
       entered in the tables.

       used keeps track of how many table entries have been allocated from the
       provided *table space.  It is checked for LENS and DIST tables against
       the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
       the initial root table size constants.  See the comments in inftrees.h
       for more information.

       sym increments through all symbols, and the loop terminates when
       all codes of length max, i.e. all codes, have been processed.  This
       routine permits incomplete codes, so another loop after this one fills
       in the rest of the decoding tables with invalid code markers.
       */

      /* set up for code type */
      // poor man optimization - use if-else instead of switch,
      // to avoid deopts in old v8
      if (type === CODES$1) {
        base = extra = work;    /* dummy value--not used */
        match = 20;

      } else if (type === LENS$1) {
        base = lbase;
        extra = lext;
        match = 257;

      } else {                    /* DISTS */
        base = dbase;
        extra = dext;
        match = 0;
      }

      /* initialize opts for loop */
      huff = 0;                   /* starting code */
      sym = 0;                    /* starting code symbol */
      len = min;                  /* starting code length */
      next = table_index;              /* current table to fill in */
      curr = root;                /* current table index bits */
      drop = 0;                   /* current bits to drop from code for index */
      low = -1;                   /* trigger new sub-table when len > root */
      used = 1 << root;          /* use root table entries */
      mask = used - 1;            /* mask for comparing low */

      /* check available table space */
      if ((type === LENS$1 && used > ENOUGH_LENS$1) ||
        (type === DISTS$1 && used > ENOUGH_DISTS$1)) {
        return 1;
      }

      /* process all codes and make table entries */
      for (;;) {
        /* create table entry */
        here_bits = len - drop;
        if (work[sym] + 1 < match) {
          here_op = 0;
          here_val = work[sym];
        }
        else if (work[sym] >= match) {
          here_op = extra[work[sym] - match];
          here_val = base[work[sym] - match];
        }
        else {
          here_op = 32 + 64;         /* end of block */
          here_val = 0;
        }

        /* replicate for those indices with low len bits equal to huff */
        incr = 1 << (len - drop);
        fill = 1 << curr;
        min = fill;                 /* save offset to next table */
        do {
          fill -= incr;
          table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
        } while (fill !== 0);

        /* backwards increment the len-bit code huff */
        incr = 1 << (len - 1);
        while (huff & incr) {
          incr >>= 1;
        }
        if (incr !== 0) {
          huff &= incr - 1;
          huff += incr;
        } else {
          huff = 0;
        }

        /* go to next symbol, update count, len */
        sym++;
        if (--count[len] === 0) {
          if (len === max) { break; }
          len = lens[lens_index + work[sym]];
        }

        /* create new sub-table if needed */
        if (len > root && (huff & mask) !== low) {
          /* if first time, transition to sub-tables */
          if (drop === 0) {
            drop = root;
          }

          /* increment past last table */
          next += min;            /* here min is 1 << curr */

          /* determine length of next table */
          curr = len - drop;
          left = 1 << curr;
          while (curr + drop < max) {
            left -= count[curr + drop];
            if (left <= 0) { break; }
            curr++;
            left <<= 1;
          }

          /* check for enough space */
          used += 1 << curr;
          if ((type === LENS$1 && used > ENOUGH_LENS$1) ||
            (type === DISTS$1 && used > ENOUGH_DISTS$1)) {
            return 1;
          }

          /* point entry in root table to sub-table */
          low = huff & mask;
          /*table.op[low] = curr;
          table.bits[low] = root;
          table.val[low] = next - opts.table_index;*/
          table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
        }
      }

      /* fill in remaining table entry if code is incomplete (guaranteed to have
       at most one remaining entry, since if the code is incomplete, the
       maximum code length that was allowed to get this far is one bit) */
      if (huff !== 0) {
        //table.op[next + huff] = 64;            /* invalid code marker */
        //table.bits[next + huff] = len - drop;
        //table.val[next + huff] = 0;
        table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
      }

      /* set return parameters */
      //opts.table_index += used;
      opts.bits = root;
      return 0;
    };


    var inftrees = inflate_table;

    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.






    const CODES = 0;
    const LENS = 1;
    const DISTS = 2;

    /* Public constants ==========================================================*/
    /* ===========================================================================*/

    const {
      Z_FINISH: Z_FINISH$1, Z_BLOCK, Z_TREES,
      Z_OK: Z_OK$1, Z_STREAM_END: Z_STREAM_END$1, Z_NEED_DICT: Z_NEED_DICT$1, Z_STREAM_ERROR: Z_STREAM_ERROR$1, Z_DATA_ERROR: Z_DATA_ERROR$1, Z_MEM_ERROR: Z_MEM_ERROR$1, Z_BUF_ERROR,
      Z_DEFLATED
    } = constants$2;


    /* STATES ====================================================================*/
    /* ===========================================================================*/


    const    HEAD = 16180;       /* i: waiting for magic header */
    const    FLAGS = 16181;      /* i: waiting for method and flags (gzip) */
    const    TIME = 16182;       /* i: waiting for modification time (gzip) */
    const    OS = 16183;         /* i: waiting for extra flags and operating system (gzip) */
    const    EXLEN = 16184;      /* i: waiting for extra length (gzip) */
    const    EXTRA = 16185;      /* i: waiting for extra bytes (gzip) */
    const    NAME = 16186;       /* i: waiting for end of file name (gzip) */
    const    COMMENT = 16187;    /* i: waiting for end of comment (gzip) */
    const    HCRC = 16188;       /* i: waiting for header crc (gzip) */
    const    DICTID = 16189;    /* i: waiting for dictionary check value */
    const    DICT = 16190;      /* waiting for inflateSetDictionary() call */
    const        TYPE = 16191;      /* i: waiting for type bits, including last-flag bit */
    const        TYPEDO = 16192;    /* i: same, but skip check to exit inflate on new block */
    const        STORED = 16193;    /* i: waiting for stored size (length and complement) */
    const        COPY_ = 16194;     /* i/o: same as COPY below, but only first time in */
    const        COPY = 16195;      /* i/o: waiting for input or output to copy stored block */
    const        TABLE = 16196;     /* i: waiting for dynamic block table lengths */
    const        LENLENS = 16197;   /* i: waiting for code length code lengths */
    const        CODELENS = 16198;  /* i: waiting for length/lit and distance code lengths */
    const            LEN_ = 16199;      /* i: same as LEN below, but only first time in */
    const            LEN = 16200;       /* i: waiting for length/lit/eob code */
    const            LENEXT = 16201;    /* i: waiting for length extra bits */
    const            DIST = 16202;      /* i: waiting for distance code */
    const            DISTEXT = 16203;   /* i: waiting for distance extra bits */
    const            MATCH = 16204;     /* o: waiting for output space to copy string */
    const            LIT = 16205;       /* o: waiting for output space to write literal */
    const    CHECK = 16206;     /* i: waiting for 32-bit check value */
    const    LENGTH = 16207;    /* i: waiting for 32-bit length (gzip) */
    const    DONE = 16208;      /* finished check, done -- remain here until reset */
    const    BAD = 16209;       /* got a data error -- remain here until reset */
    const    MEM = 16210;       /* got an inflate() memory error -- remain here until reset */
    const    SYNC = 16211;      /* looking for synchronization bytes to restart inflate() */

    /* ===========================================================================*/



    const ENOUGH_LENS = 852;
    const ENOUGH_DISTS = 592;
    //const ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

    const MAX_WBITS = 15;
    /* 32K LZ77 window */
    const DEF_WBITS = MAX_WBITS;


    const zswap32 = (q) => {

      return  (((q >>> 24) & 0xff) +
              ((q >>> 8) & 0xff00) +
              ((q & 0xff00) << 8) +
              ((q & 0xff) << 24));
    };


    function InflateState() {
      this.strm = null;           /* pointer back to this zlib stream */
      this.mode = 0;              /* current inflate mode */
      this.last = false;          /* true if processing last block */
      this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip,
                                     bit 2 true to validate check value */
      this.havedict = false;      /* true if dictionary provided */
      this.flags = 0;             /* gzip header method and flags (0 if zlib), or
                                     -1 if raw or no header yet */
      this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
      this.check = 0;             /* protected copy of check value */
      this.total = 0;             /* protected copy of output count */
      // TODO: may be {}
      this.head = null;           /* where to save gzip header information */

      /* sliding window */
      this.wbits = 0;             /* log base 2 of requested window size */
      this.wsize = 0;             /* window size or zero if not using window */
      this.whave = 0;             /* valid bytes in the window */
      this.wnext = 0;             /* window write index */
      this.window = null;         /* allocated sliding window, if needed */

      /* bit accumulator */
      this.hold = 0;              /* input bit accumulator */
      this.bits = 0;              /* number of bits in "in" */

      /* for string and stored block copying */
      this.length = 0;            /* literal or length of data to copy */
      this.offset = 0;            /* distance back to copy string from */

      /* for table and code decoding */
      this.extra = 0;             /* extra bits needed */

      /* fixed and dynamic code tables */
      this.lencode = null;          /* starting table for length/literal codes */
      this.distcode = null;         /* starting table for distance codes */
      this.lenbits = 0;           /* index bits for lencode */
      this.distbits = 0;          /* index bits for distcode */

      /* dynamic table building */
      this.ncode = 0;             /* number of code length code lengths */
      this.nlen = 0;              /* number of length code lengths */
      this.ndist = 0;             /* number of distance code lengths */
      this.have = 0;              /* number of code lengths in lens[] */
      this.next = null;              /* next available space in codes[] */

      this.lens = new Uint16Array(320); /* temporary storage for code lengths */
      this.work = new Uint16Array(288); /* work area for code table building */

      /*
       because we don't have pointers in js, we use lencode and distcode directly
       as buffers so we don't need codes
      */
      //this.codes = new Int32Array(ENOUGH);       /* space for code tables */
      this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
      this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
      this.sane = 0;                   /* if false, allow invalid distance too far */
      this.back = 0;                   /* bits back of last unprocessed length/lit */
      this.was = 0;                    /* initial length of match */
    }


    const inflateStateCheck = (strm) => {

      if (!strm) {
        return 1;
      }
      const state = strm.state;
      if (!state || state.strm !== strm ||
        state.mode < HEAD || state.mode > SYNC) {
        return 1;
      }
      return 0;
    };


    const inflateResetKeep = (strm) => {

      if (inflateStateCheck(strm)) { return Z_STREAM_ERROR$1; }
      const state = strm.state;
      strm.total_in = strm.total_out = state.total = 0;
      strm.msg = ''; /*Z_NULL*/
      if (state.wrap) {       /* to support ill-conceived Java test suite */
        strm.adler = state.wrap & 1;
      }
      state.mode = HEAD;
      state.last = 0;
      state.havedict = 0;
      state.flags = -1;
      state.dmax = 32768;
      state.head = null/*Z_NULL*/;
      state.hold = 0;
      state.bits = 0;
      //state.lencode = state.distcode = state.next = state.codes;
      state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
      state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);

      state.sane = 1;
      state.back = -1;
      //Tracev((stderr, "inflate: reset\n"));
      return Z_OK$1;
    };


    const inflateReset = (strm) => {

      if (inflateStateCheck(strm)) { return Z_STREAM_ERROR$1; }
      const state = strm.state;
      state.wsize = 0;
      state.whave = 0;
      state.wnext = 0;
      return inflateResetKeep(strm);

    };


    const inflateReset2 = (strm, windowBits) => {
      let wrap;

      /* get the state */
      if (inflateStateCheck(strm)) { return Z_STREAM_ERROR$1; }
      const state = strm.state;

      /* extract wrap request from windowBits parameter */
      if (windowBits < 0) {
        wrap = 0;
        windowBits = -windowBits;
      }
      else {
        wrap = (windowBits >> 4) + 5;
        if (windowBits < 48) {
          windowBits &= 15;
        }
      }

      /* set number of window bits, free window if different */
      if (windowBits && (windowBits < 8 || windowBits > 15)) {
        return Z_STREAM_ERROR$1;
      }
      if (state.window !== null && state.wbits !== windowBits) {
        state.window = null;
      }

      /* update state and reset the rest of it */
      state.wrap = wrap;
      state.wbits = windowBits;
      return inflateReset(strm);
    };


    const inflateInit2 = (strm, windowBits) => {

      if (!strm) { return Z_STREAM_ERROR$1; }
      //strm.msg = Z_NULL;                 /* in case we return an error */

      const state = new InflateState();

      //if (state === Z_NULL) return Z_MEM_ERROR;
      //Tracev((stderr, "inflate: allocated\n"));
      strm.state = state;
      state.strm = strm;
      state.window = null/*Z_NULL*/;
      state.mode = HEAD;     /* to pass state test in inflateReset2() */
      const ret = inflateReset2(strm, windowBits);
      if (ret !== Z_OK$1) {
        strm.state = null/*Z_NULL*/;
      }
      return ret;
    };


    const inflateInit = (strm) => {

      return inflateInit2(strm, DEF_WBITS);
    };


    /*
     Return state with length and distance decoding tables and index sizes set to
     fixed code decoding.  Normally this returns fixed tables from inffixed.h.
     If BUILDFIXED is defined, then instead this routine builds the tables the
     first time it's called, and returns those tables the first time and
     thereafter.  This reduces the size of the code by about 2K bytes, in
     exchange for a little execution time.  However, BUILDFIXED should not be
     used for threaded applications, since the rewriting of the tables and virgin
     may not be thread-safe.
     */
    let virgin = true;

    let lenfix, distfix; // We have no pointers in JS, so keep tables separate


    const fixedtables = (state) => {

      /* build fixed huffman tables if first call (may not be thread safe) */
      if (virgin) {
        lenfix = new Int32Array(512);
        distfix = new Int32Array(32);

        /* literal/length table */
        let sym = 0;
        while (sym < 144) { state.lens[sym++] = 8; }
        while (sym < 256) { state.lens[sym++] = 9; }
        while (sym < 280) { state.lens[sym++] = 7; }
        while (sym < 288) { state.lens[sym++] = 8; }

        inftrees(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

        /* distance table */
        sym = 0;
        while (sym < 32) { state.lens[sym++] = 5; }

        inftrees(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

        /* do this just once */
        virgin = false;
      }

      state.lencode = lenfix;
      state.lenbits = 9;
      state.distcode = distfix;
      state.distbits = 5;
    };


    /*
     Update the window with the last wsize (normally 32K) bytes written before
     returning.  If window does not exist yet, create it.  This is only called
     when a window is already in use, or when output has been written during this
     inflate call, but the end of the deflate stream has not been reached yet.
     It is also called to create a window for dictionary data when a dictionary
     is loaded.

     Providing output buffers larger than 32K to inflate() should provide a speed
     advantage, since only the last 32K of output is copied to the sliding window
     upon return from inflate(), and since all distances after the first 32K of
     output will fall in the output data, making match copies simpler and faster.
     The advantage may be dependent on the size of the processor's data caches.
     */
    const updatewindow = (strm, src, end, copy) => {

      let dist;
      const state = strm.state;

      /* if it hasn't been done already, allocate space for the window */
      if (state.window === null) {
        state.wsize = 1 << state.wbits;
        state.wnext = 0;
        state.whave = 0;

        state.window = new Uint8Array(state.wsize);
      }

      /* copy state->wsize or less output bytes into the circular window */
      if (copy >= state.wsize) {
        state.window.set(src.subarray(end - state.wsize, end), 0);
        state.wnext = 0;
        state.whave = state.wsize;
      }
      else {
        dist = state.wsize - state.wnext;
        if (dist > copy) {
          dist = copy;
        }
        //zmemcpy(state->window + state->wnext, end - copy, dist);
        state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
        copy -= dist;
        if (copy) {
          //zmemcpy(state->window, end - copy, copy);
          state.window.set(src.subarray(end - copy, end), 0);
          state.wnext = copy;
          state.whave = state.wsize;
        }
        else {
          state.wnext += dist;
          if (state.wnext === state.wsize) { state.wnext = 0; }
          if (state.whave < state.wsize) { state.whave += dist; }
        }
      }
      return 0;
    };


    const inflate$2 = (strm, flush) => {

      let state;
      let input, output;          // input/output buffers
      let next;                   /* next input INDEX */
      let put;                    /* next output INDEX */
      let have, left;             /* available input and output */
      let hold;                   /* bit buffer */
      let bits;                   /* bits in bit buffer */
      let _in, _out;              /* save starting available input and output */
      let copy;                   /* number of stored or match bytes to copy */
      let from;                   /* where to copy match bytes from */
      let from_source;
      let here = 0;               /* current decoding table entry */
      let here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
      //let last;                   /* parent table entry */
      let last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
      let len;                    /* length to copy for repeats, bits to drop */
      let ret;                    /* return code */
      const hbuf = new Uint8Array(4);    /* buffer for gzip header crc calculation */
      let opts;

      let n; // temporary variable for NEED_BITS

      const order = /* permutation of code lengths */
        new Uint8Array([ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ]);


      if (inflateStateCheck(strm) || !strm.output ||
          (!strm.input && strm.avail_in !== 0)) {
        return Z_STREAM_ERROR$1;
      }

      state = strm.state;
      if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


      //--- LOAD() ---
      put = strm.next_out;
      output = strm.output;
      left = strm.avail_out;
      next = strm.next_in;
      input = strm.input;
      have = strm.avail_in;
      hold = state.hold;
      bits = state.bits;
      //---

      _in = have;
      _out = left;
      ret = Z_OK$1;

      inf_leave: // goto emulation
      for (;;) {
        switch (state.mode) {
          case HEAD:
            if (state.wrap === 0) {
              state.mode = TYPEDO;
              break;
            }
            //=== NEEDBITS(16);
            while (bits < 16) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
              if (state.wbits === 0) {
                state.wbits = 15;
              }
              state.check = 0/*crc32(0L, Z_NULL, 0)*/;
              //=== CRC2(state.check, hold);
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              state.check = crc32_1(state.check, hbuf, 2, 0);
              //===//

              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = FLAGS;
              break;
            }
            if (state.head) {
              state.head.done = false;
            }
            if (!(state.wrap & 1) ||   /* check if zlib header allowed */
              (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
              strm.msg = 'incorrect header check';
              state.mode = BAD;
              break;
            }
            if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
              strm.msg = 'unknown compression method';
              state.mode = BAD;
              break;
            }
            //--- DROPBITS(4) ---//
            hold >>>= 4;
            bits -= 4;
            //---//
            len = (hold & 0x0f)/*BITS(4)*/ + 8;
            if (state.wbits === 0) {
              state.wbits = len;
            }
            if (len > 15 || len > state.wbits) {
              strm.msg = 'invalid window size';
              state.mode = BAD;
              break;
            }

            // !!! pako patch. Force use `options.windowBits` if passed.
            // Required to always use max window size by default.
            state.dmax = 1 << state.wbits;
            //state.dmax = 1 << len;

            state.flags = 0;               /* indicate zlib header */
            //Tracev((stderr, "inflate:   zlib header ok\n"));
            strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
            state.mode = hold & 0x200 ? DICTID : TYPE;
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            break;
          case FLAGS:
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.flags = hold;
            if ((state.flags & 0xff) !== Z_DEFLATED) {
              strm.msg = 'unknown compression method';
              state.mode = BAD;
              break;
            }
            if (state.flags & 0xe000) {
              strm.msg = 'unknown header flags set';
              state.mode = BAD;
              break;
            }
            if (state.head) {
              state.head.text = ((hold >> 8) & 1);
            }
            if ((state.flags & 0x0200) && (state.wrap & 4)) {
              //=== CRC2(state.check, hold);
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              state.check = crc32_1(state.check, hbuf, 2, 0);
              //===//
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = TIME;
            /* falls through */
          case TIME:
            //=== NEEDBITS(32); */
            while (bits < 32) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if (state.head) {
              state.head.time = hold;
            }
            if ((state.flags & 0x0200) && (state.wrap & 4)) {
              //=== CRC4(state.check, hold)
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              hbuf[2] = (hold >>> 16) & 0xff;
              hbuf[3] = (hold >>> 24) & 0xff;
              state.check = crc32_1(state.check, hbuf, 4, 0);
              //===
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = OS;
            /* falls through */
          case OS:
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if (state.head) {
              state.head.xflags = (hold & 0xff);
              state.head.os = (hold >> 8);
            }
            if ((state.flags & 0x0200) && (state.wrap & 4)) {
              //=== CRC2(state.check, hold);
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              state.check = crc32_1(state.check, hbuf, 2, 0);
              //===//
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = EXLEN;
            /* falls through */
          case EXLEN:
            if (state.flags & 0x0400) {
              //=== NEEDBITS(16); */
              while (bits < 16) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.length = hold;
              if (state.head) {
                state.head.extra_len = hold;
              }
              if ((state.flags & 0x0200) && (state.wrap & 4)) {
                //=== CRC2(state.check, hold);
                hbuf[0] = hold & 0xff;
                hbuf[1] = (hold >>> 8) & 0xff;
                state.check = crc32_1(state.check, hbuf, 2, 0);
                //===//
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
            }
            else if (state.head) {
              state.head.extra = null/*Z_NULL*/;
            }
            state.mode = EXTRA;
            /* falls through */
          case EXTRA:
            if (state.flags & 0x0400) {
              copy = state.length;
              if (copy > have) { copy = have; }
              if (copy) {
                if (state.head) {
                  len = state.head.extra_len - state.length;
                  if (!state.head.extra) {
                    // Use untyped array for more convenient processing later
                    state.head.extra = new Uint8Array(state.head.extra_len);
                  }
                  state.head.extra.set(
                    input.subarray(
                      next,
                      // extra field is limited to 65536 bytes
                      // - no need for additional size check
                      next + copy
                    ),
                    /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                    len
                  );
                  //zmemcpy(state.head.extra + len, next,
                  //        len + copy > state.head.extra_max ?
                  //        state.head.extra_max - len : copy);
                }
                if ((state.flags & 0x0200) && (state.wrap & 4)) {
                  state.check = crc32_1(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                state.length -= copy;
              }
              if (state.length) { break inf_leave; }
            }
            state.length = 0;
            state.mode = NAME;
            /* falls through */
          case NAME:
            if (state.flags & 0x0800) {
              if (have === 0) { break inf_leave; }
              copy = 0;
              do {
                // TODO: 2 or 1 bytes?
                len = input[next + copy++];
                /* use constant limit because in js we should not preallocate memory */
                if (state.head && len &&
                    (state.length < 65536 /*state.head.name_max*/)) {
                  state.head.name += String.fromCharCode(len);
                }
              } while (len && copy < have);

              if ((state.flags & 0x0200) && (state.wrap & 4)) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) { break inf_leave; }
            }
            else if (state.head) {
              state.head.name = null;
            }
            state.length = 0;
            state.mode = COMMENT;
            /* falls through */
          case COMMENT:
            if (state.flags & 0x1000) {
              if (have === 0) { break inf_leave; }
              copy = 0;
              do {
                len = input[next + copy++];
                /* use constant limit because in js we should not preallocate memory */
                if (state.head && len &&
                    (state.length < 65536 /*state.head.comm_max*/)) {
                  state.head.comment += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if ((state.flags & 0x0200) && (state.wrap & 4)) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) { break inf_leave; }
            }
            else if (state.head) {
              state.head.comment = null;
            }
            state.mode = HCRC;
            /* falls through */
          case HCRC:
            if (state.flags & 0x0200) {
              //=== NEEDBITS(16); */
              while (bits < 16) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if ((state.wrap & 4) && hold !== (state.check & 0xffff)) {
                strm.msg = 'header crc mismatch';
                state.mode = BAD;
                break;
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
            }
            if (state.head) {
              state.head.hcrc = ((state.flags >> 9) & 1);
              state.head.done = true;
            }
            strm.adler = state.check = 0;
            state.mode = TYPE;
            break;
          case DICTID:
            //=== NEEDBITS(32); */
            while (bits < 32) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            strm.adler = state.check = zswap32(hold);
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = DICT;
            /* falls through */
          case DICT:
            if (state.havedict === 0) {
              //--- RESTORE() ---
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              //---
              return Z_NEED_DICT$1;
            }
            strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
            state.mode = TYPE;
            /* falls through */
          case TYPE:
            if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
            /* falls through */
          case TYPEDO:
            if (state.last) {
              //--- BYTEBITS() ---//
              hold >>>= bits & 7;
              bits -= bits & 7;
              //---//
              state.mode = CHECK;
              break;
            }
            //=== NEEDBITS(3); */
            while (bits < 3) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.last = (hold & 0x01)/*BITS(1)*/;
            //--- DROPBITS(1) ---//
            hold >>>= 1;
            bits -= 1;
            //---//

            switch ((hold & 0x03)/*BITS(2)*/) {
              case 0:                             /* stored block */
                //Tracev((stderr, "inflate:     stored block%s\n",
                //        state.last ? " (last)" : ""));
                state.mode = STORED;
                break;
              case 1:                             /* fixed block */
                fixedtables(state);
                //Tracev((stderr, "inflate:     fixed codes block%s\n",
                //        state.last ? " (last)" : ""));
                state.mode = LEN_;             /* decode codes */
                if (flush === Z_TREES) {
                  //--- DROPBITS(2) ---//
                  hold >>>= 2;
                  bits -= 2;
                  //---//
                  break inf_leave;
                }
                break;
              case 2:                             /* dynamic block */
                //Tracev((stderr, "inflate:     dynamic codes block%s\n",
                //        state.last ? " (last)" : ""));
                state.mode = TABLE;
                break;
              case 3:
                strm.msg = 'invalid block type';
                state.mode = BAD;
            }
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
            break;
          case STORED:
            //--- BYTEBITS() ---// /* go to byte boundary */
            hold >>>= bits & 7;
            bits -= bits & 7;
            //---//
            //=== NEEDBITS(32); */
            while (bits < 32) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
              strm.msg = 'invalid stored block lengths';
              state.mode = BAD;
              break;
            }
            state.length = hold & 0xffff;
            //Tracev((stderr, "inflate:       stored length %u\n",
            //        state.length));
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = COPY_;
            if (flush === Z_TREES) { break inf_leave; }
            /* falls through */
          case COPY_:
            state.mode = COPY;
            /* falls through */
          case COPY:
            copy = state.length;
            if (copy) {
              if (copy > have) { copy = have; }
              if (copy > left) { copy = left; }
              if (copy === 0) { break inf_leave; }
              //--- zmemcpy(put, next, copy); ---
              output.set(input.subarray(next, next + copy), put);
              //---//
              have -= copy;
              next += copy;
              left -= copy;
              put += copy;
              state.length -= copy;
              break;
            }
            //Tracev((stderr, "inflate:       stored end\n"));
            state.mode = TYPE;
            break;
          case TABLE:
            //=== NEEDBITS(14); */
            while (bits < 14) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
            //--- DROPBITS(5) ---//
            hold >>>= 5;
            bits -= 5;
            //---//
            state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
            //--- DROPBITS(5) ---//
            hold >>>= 5;
            bits -= 5;
            //---//
            state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
            //--- DROPBITS(4) ---//
            hold >>>= 4;
            bits -= 4;
            //---//
    //#ifndef PKZIP_BUG_WORKAROUND
            if (state.nlen > 286 || state.ndist > 30) {
              strm.msg = 'too many length or distance symbols';
              state.mode = BAD;
              break;
            }
    //#endif
            //Tracev((stderr, "inflate:       table sizes ok\n"));
            state.have = 0;
            state.mode = LENLENS;
            /* falls through */
          case LENLENS:
            while (state.have < state.ncode) {
              //=== NEEDBITS(3);
              while (bits < 3) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            while (state.have < 19) {
              state.lens[order[state.have++]] = 0;
            }
            // We have separate tables & no pointers. 2 commented lines below not needed.
            //state.next = state.codes;
            //state.lencode = state.next;
            // Switch to use dynamic table
            state.lencode = state.lendyn;
            state.lenbits = 7;

            opts = { bits: state.lenbits };
            ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;

            if (ret) {
              strm.msg = 'invalid code lengths set';
              state.mode = BAD;
              break;
            }
            //Tracev((stderr, "inflate:       code lengths ok\n"));
            state.have = 0;
            state.mode = CODELENS;
            /* falls through */
          case CODELENS:
            while (state.have < state.nlen + state.ndist) {
              for (;;) {
                here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
                here_bits = here >>> 24;
                here_op = (here >>> 16) & 0xff;
                here_val = here & 0xffff;

                if ((here_bits) <= bits) { break; }
                //--- PULLBYTE() ---//
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
                //---//
              }
              if (here_val < 16) {
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                state.lens[state.have++] = here_val;
              }
              else {
                if (here_val === 16) {
                  //=== NEEDBITS(here.bits + 2);
                  n = here_bits + 2;
                  while (bits < n) {
                    if (have === 0) { break inf_leave; }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  //===//
                  //--- DROPBITS(here.bits) ---//
                  hold >>>= here_bits;
                  bits -= here_bits;
                  //---//
                  if (state.have === 0) {
                    strm.msg = 'invalid bit length repeat';
                    state.mode = BAD;
                    break;
                  }
                  len = state.lens[state.have - 1];
                  copy = 3 + (hold & 0x03);//BITS(2);
                  //--- DROPBITS(2) ---//
                  hold >>>= 2;
                  bits -= 2;
                  //---//
                }
                else if (here_val === 17) {
                  //=== NEEDBITS(here.bits + 3);
                  n = here_bits + 3;
                  while (bits < n) {
                    if (have === 0) { break inf_leave; }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  //===//
                  //--- DROPBITS(here.bits) ---//
                  hold >>>= here_bits;
                  bits -= here_bits;
                  //---//
                  len = 0;
                  copy = 3 + (hold & 0x07);//BITS(3);
                  //--- DROPBITS(3) ---//
                  hold >>>= 3;
                  bits -= 3;
                  //---//
                }
                else {
                  //=== NEEDBITS(here.bits + 7);
                  n = here_bits + 7;
                  while (bits < n) {
                    if (have === 0) { break inf_leave; }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  //===//
                  //--- DROPBITS(here.bits) ---//
                  hold >>>= here_bits;
                  bits -= here_bits;
                  //---//
                  len = 0;
                  copy = 11 + (hold & 0x7f);//BITS(7);
                  //--- DROPBITS(7) ---//
                  hold >>>= 7;
                  bits -= 7;
                  //---//
                }
                if (state.have + copy > state.nlen + state.ndist) {
                  strm.msg = 'invalid bit length repeat';
                  state.mode = BAD;
                  break;
                }
                while (copy--) {
                  state.lens[state.have++] = len;
                }
              }
            }

            /* handle error breaks in while */
            if (state.mode === BAD) { break; }

            /* check for end-of-block code (better have one) */
            if (state.lens[256] === 0) {
              strm.msg = 'invalid code -- missing end-of-block';
              state.mode = BAD;
              break;
            }

            /* build code tables -- note: do not change the lenbits or distbits
               values here (9 and 6) without reading the comments in inftrees.h
               concerning the ENOUGH constants, which depend on those values */
            state.lenbits = 9;

            opts = { bits: state.lenbits };
            ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
            // We have separate tables & no pointers. 2 commented lines below not needed.
            // state.next_index = opts.table_index;
            state.lenbits = opts.bits;
            // state.lencode = state.next;

            if (ret) {
              strm.msg = 'invalid literal/lengths set';
              state.mode = BAD;
              break;
            }

            state.distbits = 6;
            //state.distcode.copy(state.codes);
            // Switch to use dynamic table
            state.distcode = state.distdyn;
            opts = { bits: state.distbits };
            ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
            // We have separate tables & no pointers. 2 commented lines below not needed.
            // state.next_index = opts.table_index;
            state.distbits = opts.bits;
            // state.distcode = state.next;

            if (ret) {
              strm.msg = 'invalid distances set';
              state.mode = BAD;
              break;
            }
            //Tracev((stderr, 'inflate:       codes ok\n'));
            state.mode = LEN_;
            if (flush === Z_TREES) { break inf_leave; }
            /* falls through */
          case LEN_:
            state.mode = LEN;
            /* falls through */
          case LEN:
            if (have >= 6 && left >= 258) {
              //--- RESTORE() ---
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              //---
              inffast(strm, _out);
              //--- LOAD() ---
              put = strm.next_out;
              output = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state.hold;
              bits = state.bits;
              //---

              if (state.mode === TYPE) {
                state.back = -1;
              }
              break;
            }
            state.back = 0;
            for (;;) {
              here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if (here_bits <= bits) { break; }
              //--- PULLBYTE() ---//
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            if (here_op && (here_op & 0xf0) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (;;) {
                here = state.lencode[last_val +
                        ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
                here_bits = here >>> 24;
                here_op = (here >>> 16) & 0xff;
                here_val = here & 0xffff;

                if ((last_bits + here_bits) <= bits) { break; }
                //--- PULLBYTE() ---//
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
                //---//
              }
              //--- DROPBITS(last.bits) ---//
              hold >>>= last_bits;
              bits -= last_bits;
              //---//
              state.back += last_bits;
            }
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.back += here_bits;
            state.length = here_val;
            if (here_op === 0) {
              //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
              //        "inflate:         literal '%c'\n" :
              //        "inflate:         literal 0x%02x\n", here.val));
              state.mode = LIT;
              break;
            }
            if (here_op & 32) {
              //Tracevv((stderr, "inflate:         end of block\n"));
              state.back = -1;
              state.mode = TYPE;
              break;
            }
            if (here_op & 64) {
              strm.msg = 'invalid literal/length code';
              state.mode = BAD;
              break;
            }
            state.extra = here_op & 15;
            state.mode = LENEXT;
            /* falls through */
          case LENEXT:
            if (state.extra) {
              //=== NEEDBITS(state.extra);
              n = state.extra;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
              //--- DROPBITS(state.extra) ---//
              hold >>>= state.extra;
              bits -= state.extra;
              //---//
              state.back += state.extra;
            }
            //Tracevv((stderr, "inflate:         length %u\n", state.length));
            state.was = state.length;
            state.mode = DIST;
            /* falls through */
          case DIST:
            for (;;) {
              here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if ((here_bits) <= bits) { break; }
              //--- PULLBYTE() ---//
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            if ((here_op & 0xf0) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (;;) {
                here = state.distcode[last_val +
                        ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
                here_bits = here >>> 24;
                here_op = (here >>> 16) & 0xff;
                here_val = here & 0xffff;

                if ((last_bits + here_bits) <= bits) { break; }
                //--- PULLBYTE() ---//
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
                //---//
              }
              //--- DROPBITS(last.bits) ---//
              hold >>>= last_bits;
              bits -= last_bits;
              //---//
              state.back += last_bits;
            }
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.back += here_bits;
            if (here_op & 64) {
              strm.msg = 'invalid distance code';
              state.mode = BAD;
              break;
            }
            state.offset = here_val;
            state.extra = (here_op) & 15;
            state.mode = DISTEXT;
            /* falls through */
          case DISTEXT:
            if (state.extra) {
              //=== NEEDBITS(state.extra);
              n = state.extra;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
              //--- DROPBITS(state.extra) ---//
              hold >>>= state.extra;
              bits -= state.extra;
              //---//
              state.back += state.extra;
            }
    //#ifdef INFLATE_STRICT
            if (state.offset > state.dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
    //#endif
            //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
            state.mode = MATCH;
            /* falls through */
          case MATCH:
            if (left === 0) { break inf_leave; }
            copy = _out - left;
            if (state.offset > copy) {         /* copy from window */
              copy = state.offset - copy;
              if (copy > state.whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break;
                }
    // (!) This block is disabled in zlib defaults,
    // don't enable it for binary compatibility
    //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
    //          Trace((stderr, "inflate.c too far\n"));
    //          copy -= state.whave;
    //          if (copy > state.length) { copy = state.length; }
    //          if (copy > left) { copy = left; }
    //          left -= copy;
    //          state.length -= copy;
    //          do {
    //            output[put++] = 0;
    //          } while (--copy);
    //          if (state.length === 0) { state.mode = LEN; }
    //          break;
    //#endif
              }
              if (copy > state.wnext) {
                copy -= state.wnext;
                from = state.wsize - copy;
              }
              else {
                from = state.wnext - copy;
              }
              if (copy > state.length) { copy = state.length; }
              from_source = state.window;
            }
            else {                              /* copy from output */
              from_source = output;
              from = put - state.offset;
              copy = state.length;
            }
            if (copy > left) { copy = left; }
            left -= copy;
            state.length -= copy;
            do {
              output[put++] = from_source[from++];
            } while (--copy);
            if (state.length === 0) { state.mode = LEN; }
            break;
          case LIT:
            if (left === 0) { break inf_leave; }
            output[put++] = state.length;
            left--;
            state.mode = LEN;
            break;
          case CHECK:
            if (state.wrap) {
              //=== NEEDBITS(32);
              while (bits < 32) {
                if (have === 0) { break inf_leave; }
                have--;
                // Use '|' instead of '+' to make sure that result is signed
                hold |= input[next++] << bits;
                bits += 8;
              }
              //===//
              _out -= left;
              strm.total_out += _out;
              state.total += _out;
              if ((state.wrap & 4) && _out) {
                strm.adler = state.check =
                    /*UPDATE_CHECK(state.check, put - _out, _out);*/
                    (state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out));

              }
              _out = left;
              // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
              if ((state.wrap & 4) && (state.flags ? hold : zswap32(hold)) !== state.check) {
                strm.msg = 'incorrect data check';
                state.mode = BAD;
                break;
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              //Tracev((stderr, "inflate:   check matches trailer\n"));
            }
            state.mode = LENGTH;
            /* falls through */
          case LENGTH:
            if (state.wrap && state.flags) {
              //=== NEEDBITS(32);
              while (bits < 32) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if ((state.wrap & 4) && hold !== (state.total & 0xffffffff)) {
                strm.msg = 'incorrect length check';
                state.mode = BAD;
                break;
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              //Tracev((stderr, "inflate:   length matches trailer\n"));
            }
            state.mode = DONE;
            /* falls through */
          case DONE:
            ret = Z_STREAM_END$1;
            break inf_leave;
          case BAD:
            ret = Z_DATA_ERROR$1;
            break inf_leave;
          case MEM:
            return Z_MEM_ERROR$1;
          case SYNC:
            /* falls through */
          default:
            return Z_STREAM_ERROR$1;
        }
      }

      // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

      /*
         Return from inflate(), updating the total counts and the check value.
         If there was no progress during the inflate() call, return a buffer
         error.  Call updatewindow() to create and/or update the window state.
         Note: a memory error from inflate() is non-recoverable.
       */

      //--- RESTORE() ---
      strm.next_out = put;
      strm.avail_out = left;
      strm.next_in = next;
      strm.avail_in = have;
      state.hold = hold;
      state.bits = bits;
      //---

      if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                          (state.mode < CHECK || flush !== Z_FINISH$1))) {
        if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
      }
      _in -= strm.avail_in;
      _out -= strm.avail_out;
      strm.total_in += _in;
      strm.total_out += _out;
      state.total += _out;
      if ((state.wrap & 4) && _out) {
        strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
          (state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out));
      }
      strm.data_type = state.bits + (state.last ? 64 : 0) +
                        (state.mode === TYPE ? 128 : 0) +
                        (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
      if (((_in === 0 && _out === 0) || flush === Z_FINISH$1) && ret === Z_OK$1) {
        ret = Z_BUF_ERROR;
      }
      return ret;
    };


    const inflateEnd = (strm) => {

      if (inflateStateCheck(strm)) {
        return Z_STREAM_ERROR$1;
      }

      let state = strm.state;
      if (state.window) {
        state.window = null;
      }
      strm.state = null;
      return Z_OK$1;
    };


    const inflateGetHeader = (strm, head) => {

      /* check state */
      if (inflateStateCheck(strm)) { return Z_STREAM_ERROR$1; }
      const state = strm.state;
      if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR$1; }

      /* save header structure */
      state.head = head;
      head.done = false;
      return Z_OK$1;
    };


    const inflateSetDictionary = (strm, dictionary) => {
      const dictLength = dictionary.length;

      let state;
      let dictid;
      let ret;

      /* check state */
      if (inflateStateCheck(strm)) { return Z_STREAM_ERROR$1; }
      state = strm.state;

      if (state.wrap !== 0 && state.mode !== DICT) {
        return Z_STREAM_ERROR$1;
      }

      /* check for correct dictionary identifier */
      if (state.mode === DICT) {
        dictid = 1; /* adler32(0, null, 0)*/
        /* dictid = adler32(dictid, dictionary, dictLength); */
        dictid = adler32_1(dictid, dictionary, dictLength, 0);
        if (dictid !== state.check) {
          return Z_DATA_ERROR$1;
        }
      }
      /* copy dictionary to window using updatewindow(), which will amend the
       existing dictionary if appropriate */
      ret = updatewindow(strm, dictionary, dictLength, dictLength);
      if (ret) {
        state.mode = MEM;
        return Z_MEM_ERROR$1;
      }
      state.havedict = 1;
      // Tracev((stderr, "inflate:   dictionary set\n"));
      return Z_OK$1;
    };


    var inflateReset_1 = inflateReset;
    var inflateReset2_1 = inflateReset2;
    var inflateResetKeep_1 = inflateResetKeep;
    var inflateInit_1 = inflateInit;
    var inflateInit2_1 = inflateInit2;
    var inflate_2$1 = inflate$2;
    var inflateEnd_1 = inflateEnd;
    var inflateGetHeader_1 = inflateGetHeader;
    var inflateSetDictionary_1 = inflateSetDictionary;
    var inflateInfo = 'pako inflate (from Nodeca project)';

    /* Not implemented
    module.exports.inflateCodesUsed = inflateCodesUsed;
    module.exports.inflateCopy = inflateCopy;
    module.exports.inflateGetDictionary = inflateGetDictionary;
    module.exports.inflateMark = inflateMark;
    module.exports.inflatePrime = inflatePrime;
    module.exports.inflateSync = inflateSync;
    module.exports.inflateSyncPoint = inflateSyncPoint;
    module.exports.inflateUndermine = inflateUndermine;
    module.exports.inflateValidate = inflateValidate;
    */

    var inflate_1$2 = {
    	inflateReset: inflateReset_1,
    	inflateReset2: inflateReset2_1,
    	inflateResetKeep: inflateResetKeep_1,
    	inflateInit: inflateInit_1,
    	inflateInit2: inflateInit2_1,
    	inflate: inflate_2$1,
    	inflateEnd: inflateEnd_1,
    	inflateGetHeader: inflateGetHeader_1,
    	inflateSetDictionary: inflateSetDictionary_1,
    	inflateInfo: inflateInfo
    };

    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.

    function GZheader() {
      /* true if compressed data believed to be text */
      this.text       = 0;
      /* modification time */
      this.time       = 0;
      /* extra flags (not used when writing a gzip file) */
      this.xflags     = 0;
      /* operating system */
      this.os         = 0;
      /* pointer to extra field or Z_NULL if none */
      this.extra      = null;
      /* extra field length (valid if extra != Z_NULL) */
      this.extra_len  = 0; // Actually, we don't need it in JS,
                           // but leave for few code modifications

      //
      // Setup limits is not necessary because in js we should not preallocate memory
      // for inflate use constant limit in 65536 bytes
      //

      /* space at extra (only when reading header) */
      // this.extra_max  = 0;
      /* pointer to zero-terminated file name or Z_NULL */
      this.name       = '';
      /* space at name (only when reading header) */
      // this.name_max   = 0;
      /* pointer to zero-terminated comment or Z_NULL */
      this.comment    = '';
      /* space at comment (only when reading header) */
      // this.comm_max   = 0;
      /* true if there was or will be a header crc */
      this.hcrc       = 0;
      /* true when done reading gzip header (not used when writing a gzip file) */
      this.done       = false;
    }

    var gzheader = GZheader;

    const toString = Object.prototype.toString;

    /* Public constants ==========================================================*/
    /* ===========================================================================*/

    const {
      Z_NO_FLUSH, Z_FINISH,
      Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR
    } = constants$2;

    /* ===========================================================================*/


    /**
     * class Inflate
     *
     * Generic JS-style wrapper for zlib calls. If you don't need
     * streaming behaviour - use more simple functions: [[inflate]]
     * and [[inflateRaw]].
     **/

    /* internal
     * inflate.chunks -> Array
     *
     * Chunks of output data, if [[Inflate#onData]] not overridden.
     **/

    /**
     * Inflate.result -> Uint8Array|String
     *
     * Uncompressed result, generated by default [[Inflate#onData]]
     * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
     * (call [[Inflate#push]] with `Z_FINISH` / `true` param).
     **/

    /**
     * Inflate.err -> Number
     *
     * Error code after inflate finished. 0 (Z_OK) on success.
     * Should be checked if broken data possible.
     **/

    /**
     * Inflate.msg -> String
     *
     * Error message, if [[Inflate.err]] != 0
     **/


    /**
     * new Inflate(options)
     * - options (Object): zlib inflate options.
     *
     * Creates new inflator instance with specified params. Throws exception
     * on bad params. Supported options:
     *
     * - `windowBits`
     * - `dictionary`
     *
     * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
     * for more information on these.
     *
     * Additional options, for internal needs:
     *
     * - `chunkSize` - size of generated data chunks (16K by default)
     * - `raw` (Boolean) - do raw inflate
     * - `to` (String) - if equal to 'string', then result will be converted
     *   from utf8 to utf16 (javascript) string. When string output requested,
     *   chunk length can differ from `chunkSize`, depending on content.
     *
     * By default, when no options set, autodetect deflate/gzip data format via
     * wrapper header.
     *
     * ##### Example:
     *
     * ```javascript
     * const pako = require('pako')
     * const chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
     * const chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
     *
     * const inflate = new pako.Inflate({ level: 3});
     *
     * inflate.push(chunk1, false);
     * inflate.push(chunk2, true);  // true -> last chunk
     *
     * if (inflate.err) { throw new Error(inflate.err); }
     *
     * console.log(inflate.result);
     * ```
     **/
    function Inflate$1(options) {
      this.options = common.assign({
        chunkSize: 1024 * 64,
        windowBits: 15,
        to: ''
      }, options || {});

      const opt = this.options;

      // Force window size for `raw` data, if not set directly,
      // because we have no header for autodetect.
      if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
        opt.windowBits = -opt.windowBits;
        if (opt.windowBits === 0) { opt.windowBits = -15; }
      }

      // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
      if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
          !(options && options.windowBits)) {
        opt.windowBits += 32;
      }

      // Gzip header has no info about windows size, we can do autodetect only
      // for deflate. So, if window size not set, force it to max when gzip possible
      if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
        // bit 3 (16) -> gzipped data
        // bit 4 (32) -> autodetect gzip/deflate
        if ((opt.windowBits & 15) === 0) {
          opt.windowBits |= 15;
        }
      }

      this.err    = 0;      // error code, if happens (0 = Z_OK)
      this.msg    = '';     // error message
      this.ended  = false;  // used to avoid multiple onEnd() calls
      this.chunks = [];     // chunks of compressed data

      this.strm   = new zstream();
      this.strm.avail_out = 0;

      let status  = inflate_1$2.inflateInit2(
        this.strm,
        opt.windowBits
      );

      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }

      this.header = new gzheader();

      inflate_1$2.inflateGetHeader(this.strm, this.header);

      // Setup dictionary
      if (opt.dictionary) {
        // Convert data if needed
        if (typeof opt.dictionary === 'string') {
          opt.dictionary = strings.string2buf(opt.dictionary);
        } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
          opt.dictionary = new Uint8Array(opt.dictionary);
        }
        if (opt.raw) { //In raw mode we need to set the dictionary early
          status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
          if (status !== Z_OK) {
            throw new Error(messages[status]);
          }
        }
      }
    }

    /**
     * Inflate#push(data[, flush_mode]) -> Boolean
     * - data (Uint8Array|ArrayBuffer): input data
     * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE
     *   flush modes. See constants. Skipped or `false` means Z_NO_FLUSH,
     *   `true` means Z_FINISH.
     *
     * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
     * new output chunks. Returns `true` on success. If end of stream detected,
     * [[Inflate#onEnd]] will be called.
     *
     * `flush_mode` is not needed for normal operation, because end of stream
     * detected automatically. You may try to use it for advanced things, but
     * this functionality was not tested.
     *
     * On fail call [[Inflate#onEnd]] with error code and return false.
     *
     * ##### Example
     *
     * ```javascript
     * push(chunk, false); // push one of data chunks
     * ...
     * push(chunk, true);  // push last chunk
     * ```
     **/
    Inflate$1.prototype.push = function (data, flush_mode) {
      const strm = this.strm;
      const chunkSize = this.options.chunkSize;
      const dictionary = this.options.dictionary;
      let status, _flush_mode, last_avail_out;

      if (this.ended) return false;

      if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
      else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;

      // Convert data if needed
      if (toString.call(data) === '[object ArrayBuffer]') {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }

      strm.next_in = 0;
      strm.avail_in = strm.input.length;

      for (;;) {
        if (strm.avail_out === 0) {
          strm.output = new Uint8Array(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }

        status = inflate_1$2.inflate(strm, _flush_mode);

        if (status === Z_NEED_DICT && dictionary) {
          status = inflate_1$2.inflateSetDictionary(strm, dictionary);

          if (status === Z_OK) {
            status = inflate_1$2.inflate(strm, _flush_mode);
          } else if (status === Z_DATA_ERROR) {
            // Replace code with more verbose
            status = Z_NEED_DICT;
          }
        }

        // Skip snyc markers if more data follows and not raw mode
        while (strm.avail_in > 0 &&
               status === Z_STREAM_END &&
               strm.state.wrap > 0 &&
               data[strm.next_in] !== 0)
        {
          inflate_1$2.inflateReset(strm);
          status = inflate_1$2.inflate(strm, _flush_mode);
        }

        switch (status) {
          case Z_STREAM_ERROR:
          case Z_DATA_ERROR:
          case Z_NEED_DICT:
          case Z_MEM_ERROR:
            this.onEnd(status);
            this.ended = true;
            return false;
        }

        // Remember real `avail_out` value, because we may patch out buffer content
        // to align utf8 strings boundaries.
        last_avail_out = strm.avail_out;

        if (strm.next_out) {
          if (strm.avail_out === 0 || status === Z_STREAM_END) {

            if (this.options.to === 'string') {

              let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

              let tail = strm.next_out - next_out_utf8;
              let utf8str = strings.buf2string(strm.output, next_out_utf8);

              // move tail & realign counters
              strm.next_out = tail;
              strm.avail_out = chunkSize - tail;
              if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);

              this.onData(utf8str);

            } else {
              this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
            }
          }
        }

        // Must repeat iteration if out buffer is full
        if (status === Z_OK && last_avail_out === 0) continue;

        // Finalize if end of stream reached.
        if (status === Z_STREAM_END) {
          status = inflate_1$2.inflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return true;
        }

        if (strm.avail_in === 0) break;
      }

      return true;
    };


    /**
     * Inflate#onData(chunk) -> Void
     * - chunk (Uint8Array|String): output data. When string output requested,
     *   each chunk will be string.
     *
     * By default, stores data blocks in `chunks[]` property and glue
     * those in `onEnd`. Override this handler, if you need another behaviour.
     **/
    Inflate$1.prototype.onData = function (chunk) {
      this.chunks.push(chunk);
    };


    /**
     * Inflate#onEnd(status) -> Void
     * - status (Number): inflate status. 0 (Z_OK) on success,
     *   other if not.
     *
     * Called either after you tell inflate that the input stream is
     * complete (Z_FINISH). By default - join collected chunks,
     * free memory and fill `results` / `err` properties.
     **/
    Inflate$1.prototype.onEnd = function (status) {
      // On success - join
      if (status === Z_OK) {
        if (this.options.to === 'string') {
          this.result = this.chunks.join('');
        } else {
          this.result = common.flattenChunks(this.chunks);
        }
      }
      this.chunks = [];
      this.err = status;
      this.msg = this.strm.msg;
    };


    /**
     * inflate(data[, options]) -> Uint8Array|String
     * - data (Uint8Array|ArrayBuffer): input data to decompress.
     * - options (Object): zlib inflate options.
     *
     * Decompress `data` with inflate/ungzip and `options`. Autodetect
     * format via wrapper header by default. That's why we don't provide
     * separate `ungzip` method.
     *
     * Supported options are:
     *
     * - windowBits
     *
     * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
     * for more information.
     *
     * Sugar (options):
     *
     * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
     *   negative windowBits implicitly.
     * - `to` (String) - if equal to 'string', then result will be converted
     *   from utf8 to utf16 (javascript) string. When string output requested,
     *   chunk length can differ from `chunkSize`, depending on content.
     *
     *
     * ##### Example:
     *
     * ```javascript
     * const pako = require('pako');
     * const input = pako.deflate(new Uint8Array([1,2,3,4,5,6,7,8,9]));
     * let output;
     *
     * try {
     *   output = pako.inflate(input);
     * } catch (err) {
     *   console.log(err);
     * }
     * ```
     **/
    function inflate$1(input, options) {
      const inflator = new Inflate$1(options);

      inflator.push(input);

      // That will never happens, if you don't cheat with options :)
      if (inflator.err) throw inflator.msg || messages[inflator.err];

      return inflator.result;
    }


    /**
     * inflateRaw(data[, options]) -> Uint8Array|String
     * - data (Uint8Array|ArrayBuffer): input data to decompress.
     * - options (Object): zlib inflate options.
     *
     * The same as [[inflate]], but creates raw data, without wrapper
     * (header and adler32 crc).
     **/
    function inflateRaw$1(input, options) {
      options = options || {};
      options.raw = true;
      return inflate$1(input, options);
    }


    /**
     * ungzip(data[, options]) -> Uint8Array|String
     * - data (Uint8Array|ArrayBuffer): input data to decompress.
     * - options (Object): zlib inflate options.
     *
     * Just shortcut to [[inflate]], because it autodetects format
     * by header.content. Done for convenience.
     **/


    var Inflate_1$1 = Inflate$1;
    var inflate_2 = inflate$1;
    var inflateRaw_1$1 = inflateRaw$1;
    var ungzip$1 = inflate$1;
    var constants = constants$2;

    var inflate_1$1 = {
    	Inflate: Inflate_1$1,
    	inflate: inflate_2,
    	inflateRaw: inflateRaw_1$1,
    	ungzip: ungzip$1,
    	constants: constants
    };

    const { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;

    const { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;



    var Deflate_1 = Deflate;
    var deflate_1 = deflate;
    var deflateRaw_1 = deflateRaw;
    var gzip_1 = gzip;
    var Inflate_1 = Inflate;
    var inflate_1 = inflate;
    var inflateRaw_1 = inflateRaw;
    var ungzip_1 = ungzip;
    var constants_1 = constants$2;

    var pako = {
    	Deflate: Deflate_1,
    	deflate: deflate_1,
    	deflateRaw: deflateRaw_1,
    	gzip: gzip_1,
    	Inflate: Inflate_1,
    	inflate: inflate_1,
    	inflateRaw: inflateRaw_1,
    	ungzip: ungzip_1,
    	constants: constants_1
    };

    /**
     * @module SDK
     */
    /** @ignore */ var ProductionEnvironment = {
        environment: 'production'
    };
    /** @ignore */ var AdministrationEnvironment = {
        environment: 'production'
    };
    /** @ignore */ var SandboxDevEnvironment = {
        environment: 'sandbox'
    };
    /** @ignore */ var SandboxTwitchEnvironment = {
        environment: 'sandbox'
    };
    /** @ignore */ var ServerEnvironment = {
        environment: 'server'
    };
    // Internal environments
    /** @ignore */ var StagingDevEnvironment = {
        environment: 'staging'
    };
    /** @ignore */ var StagingAdministrationEnvironment = {
        environment: 'staging'
    };
    /** @ignore */ var TestingEnvironment = {
        environment: 'testing'
    };
    /**
     * A collection of static utility functions, available at {@link Muxy.Util}.
     *
     * @example
     * const a = 'a string';
     * Muxy.Util.forceType(a, 'string');
     */
    var Util = /** @class */ (function () {
        function Util() {
        }
        Object.defineProperty(Util, "Environments", {
            /**
             * Possible runtime environments for the library. Used to define available
             * behavior and services.
             *
             * @since 1.0.3
             * @type {Object}
             */
            get: function () {
                return this.availableEnvironments;
            },
            enumerable: false,
            configurable: true
        });
        Util.registerEnvironment = function (key, env) {
            this.availableEnvironments[key] = env;
        };
        Util.getQueryParam = function (key) {
            var params = new URLSearchParams(window.location.search);
            return params.get(key);
        };
        /**
         * Wraps a string error response in an (immediately rejected) promise.
         * @since 1.0.0
         *
         * @param {string} err - A string error that the promise will reject.
         *
         * @returns {Promise<string>} Immediately rejects the returned Promise.
         */
        Util.errorPromise = function (err) {
            return Promise.reject(err);
        };
        /**
         * Returns the length of the longest line in the provided array.
         *
         * @since 1.0.0
         * @ignore
         *
         * @param {string[]} lines - An array of strings.
         */
        Util.widestLine = function (lines) {
            return Math.max.apply(null, lines.map(function (x) { return x.length; }));
        };
        /**
         * Draws a box around the lines of text provided.
         *
         * @since 1.0.0
         * @ignore
         *
         * @param {string[]} lines - An array of strings to surround.
         *
         * @returns {string} A string containing all `lines` of text surrounded
         * in an ASCII box art.
         */
        Util.asciiBox = function (lines) {
            var contentWidth = Util.widestLine(lines);
            var intro = "".concat(' '.repeat(contentWidth / 2), "\uD83E\uDD8A");
            var out = [intro];
            out.push("\u250C".concat('─'.repeat(contentWidth + 2), "\u2510"));
            lines.forEach(function (line) {
                var paddingRight = ' '.repeat(contentWidth - line.length);
                out.push("| ".concat(line).concat(paddingRight, " |"));
            });
            out.push("\u2514".concat('─'.repeat(contentWidth + 2), "\u2518"));
            return out;
        };
        /**
         * Checks if the current window object is running in an iframe.
         *
         * @since 1.0.0
         * @ignore
         */
        Util.isWindowFramed = function (overrideWindow) {
            var vWindow;
            if (typeof window !== 'undefined') {
                vWindow = window;
            }
            if (overrideWindow) {
                vWindow = overrideWindow;
            }
            var isNotChildWindow = !vWindow.opener;
            // Cannot compare WindowProxy objects with ===/!==
            var windowTop = vWindow.top && vWindow != vWindow.top; // eslint-disable-line eqeqeq
            var windowParent = vWindow.parent && vWindow != vWindow.parent; // eslint-disable-line eqeqeq
            var hasWindowAncestors = !!(windowTop || windowParent);
            return isNotChildWindow && hasWindowAncestors;
        };
        Util.getParentUrl = function (window) {
            var _a, _b, _c;
            if ((_b = (_a = window.location) === null || _a === void 0 ? void 0 : _a.ancestorOrigins) === null || _b === void 0 ? void 0 : _b.length) {
                return window.location.ancestorOrigins[0];
            }
            if ((_c = window.document) === null || _c === void 0 ? void 0 : _c.referrer) {
                return window.document.referrer;
            }
            try {
                return window.parent.location.host;
            }
            catch (err) {
                /* Trying to access parent from a CSP-restricted iframe */
            }
            return undefined;
        };
        /**
         * currentEnvironment uses the hostname and available info to determine in what
         * environment the SDK is running. Possible values are available in {@link Util.Environments}.
         * @since 1.0.0
         *
         * @returns {string} Returns a string representation of the current
         * execution environment.
         */
        Util.currentEnvironment = function (overrideWindow) {
            // Blanket override, skip environment detection
            if (Util.overrideEnvironment) {
                return Util.overrideEnvironment;
            }
            var vWindow;
            if (typeof window !== 'undefined') {
                vWindow = window;
            }
            if (overrideWindow) {
                vWindow = overrideWindow;
            }
            // Check custom environment detection hook
            var otherEnv = Config$1.OtherEnvironmentCheck(vWindow);
            if (otherEnv !== undefined) {
                return otherEnv;
            }
            try {
                // NodeJS module system, assume server.
                // istanbul ignore if
                if (typeof module !== 'undefined' && module.exports && typeof vWindow === 'undefined') {
                    return Util.Environments.Server;
                }
                // Loaded from Twitch's CDN, assume production.
                if (/\.ext-twitch\.tv/.test(vWindow.location.host)) {
                    return Util.Environments.Production;
                }
                var parentUrl = Util.getParentUrl(vWindow) || '';
                // Not on Twitch but parent is a Twitch page and has the Twitch helper, assume sandbox twitch.
                if (/\.ext-twitch\.tv/.test(parentUrl) && vWindow.Twitch) {
                    return Util.Environments.SandboxTwitch;
                }
                // See if we're on production admin.
                if (/dev\.muxy\.io/.test(parentUrl)) {
                    return Util.Environments.Admin;
                }
                // See if we're on staging admin.
                if (/dev\.staging\.muxy\.io/.test(parentUrl)) {
                    return Util.Environments.StagingAdmin;
                }
            }
            catch (err) {
                Util.consolePrint(err.toString(), { type: 'error' });
            }
            // Default, assume we're running in sandbox dev environment.
            return Util.Environments.SandboxDev;
        };
        /**
         * consolePrint prints each line of text with optional global settings and per-line
         * console flags.
         *
         * **NOTE:** Twitch's CSP enforcement disallows printing to console. This function
         * will not print anything to the console if it is running in production mode.
         *
         * @since 1.0.0
         * @public
         *
         * @param {string|string[]} lines - A single string to output, or an array of lines
         * of text. If lines is an array, each line will appear on its own line. If lines is
         * a single string, it will be split on '\n'.
         *
         * @param {object?} options - An object containing global options.
         * @param {boolean} options.boxed - If true, surrounds the output in an ASCII art box.
         * @param {string} options.style - A CSS style string to append to the console call.
         * @param {string} options.type - The type of print command. May be one of:
         * ['log', 'error', 'debug', 'info', 'warn'], although browser support may not be
         * available for all. Defaults to 'log'.
         *
         * @example
         * consolePrint('Hello World');
         *  Hello World
         *
         * consolePrint('This is a box', { boxed: true });
         *  ┌───────────────┐
         *  | This is a box |
         *  └───────────────┘
         */
        Util.consolePrint = function (lines, options) {
            if (options === void 0) { options = {}; }
            if (!lines || Util.currentEnvironment() === Util.Environments.Production) {
                return;
            }
            var style = 'font-family: monospace;';
            var lineArr = Array.isArray(lines) ? lines : lines.split('\n');
            var type = options.type || 'log';
            if (options.boxed) {
                lineArr = Util.asciiBox(lineArr);
            }
            if (options.style) {
                style += options.style;
            }
            if (Util.currentEnvironment() === Util.Environments.Server) {
                console[type].call(this, lineArr.join('\n')); // eslint-disable-line no-console
            }
            else {
                console[type].call(this, "%c".concat(lineArr.join('\n')), style); // eslint-disable-line no-console
            }
        };
        /**
         * Matches an input event name with a pattern. An event name is a : delimited
         * list of terms, while a pattern is a : delimited list of terms, with an
         * optional * instead of a term. '*' will match any term.
         *
         * @since 1.0.0
         * @private
         *
         * @param {string} input - An input event name, : delimited.
         * Allowed characters are alpha-numeric and _
         * @param {string} pattern - A pattern to match against, : delimited.
         * Allowed characters are alpha-numeric and _ and *
         *
         * @return Returns true if the pattern matches the input, false otherwise.
         */
        Util.eventPatternMatch = function (input, pattern) {
            var inputParts = input.split(':');
            var patternParts = pattern.split(':');
            if (inputParts.length !== patternParts.length) {
                return false;
            }
            for (var i = 0; i < inputParts.length; i += 1) {
                if (inputParts[i] !== patternParts[i] && patternParts[i] !== '*') {
                    return false;
                }
            }
            return true;
        };
        /**
         * Takes a variable and a Javascript Type identifier and throws a TypeError
         * if the variable's type is not in the provided type list. If the type check
         * passes, the function returns without error. As a convenience, the type may
         * also be an array of types.
         *
         * Acceptable types:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
         *
         * @since 1.0.0
         * @public
         *
         * @param {any} value - Any JavaScript variable.
         * @param {string} type - A single type string, or an array of multiple types.
         *
         * @throws {TypeError} Throws if typeof value is not in the type list.
         */
        Util.forceType = function (value, type) {
            var types = [].concat(type);
            var typeString = typeof value;
            if (types.indexOf(typeString) === -1) {
                throw new TypeError("expected '".concat(typeString, "' to be one of [").concat(types, "]"));
            }
        };
        /**
         * Returns information about the current extension environment on twitch
         *
         * @public
         *
         * @return {TwitchEnvironment}
         */
        Util.getTwitchEnvironment = function () {
            var url = new URL(window.location.search);
            var env = {
                anchor: null,
                language: null,
                mode: null,
                platform: null,
                state: null,
                version: null
            };
            var path = url.pathname;
            var splitPath = path.split('/');
            if (splitPath.length > 2) {
                env.version = splitPath[2];
            }
            var urlParams = url.searchParams;
            env.anchor = urlParams.get('anchor');
            env.language = urlParams.get('language');
            env.mode = urlParams.get('mode');
            env.platform = urlParams.get('platform');
            env.state = urlParams.get('state');
            return env;
        };
        /**
         * Attempts to parse the provided JWT and return the payload info
         *
         * @param {Object} jwt - The auth JWT token as returned from the auth harness.
         */
        Util.extractJWTInfo = function (jwt) {
            try {
                var splitToken = jwt.split('.');
                if (splitToken.length === 3) {
                    return JSON.parse(window.atob(splitToken[1]));
                }
            }
            catch (err) {
                throw new Error('Failed to parse JWT');
            }
        };
        Util.availableEnvironments = {
            Admin: AdministrationEnvironment,
            Production: ProductionEnvironment,
            SandboxDev: SandboxDevEnvironment,
            SandboxTwitch: SandboxTwitchEnvironment,
            Server: ServerEnvironment,
            StagingAdmin: StagingAdministrationEnvironment,
            StagingDev: StagingDevEnvironment,
            Testing: TestingEnvironment
        };
        return Util;
    }());
    /** @ignore */ var consolePrint = Util.consolePrint;
    /** @ignore */ var forceType = Util.forceType;
    /** @ignore */ var eventPatternMatch = Util.eventPatternMatch;
    /** @ignore */ var CurrentEnvironment = Util.currentEnvironment;
    /** @ignore */ Util.errorPromise;

    /**
     * @module SDK
     */
    var MessengerType;
    (function (MessengerType) {
        MessengerType[MessengerType["Pusher"] = 0] = "Pusher";
        MessengerType[MessengerType["Twitch"] = 1] = "Twitch";
        MessengerType[MessengerType["Server"] = 2] = "Server";
        MessengerType[MessengerType["Unknown"] = 3] = "Unknown";
    })(MessengerType || (MessengerType = {}));
    function parseMessage(messageBuffer, id, topic, msg) {
        if (msg.length === 0) {
            return {};
        }
        if (msg[0] === '{' || msg[0] === '[') {
            // JSON message
            return JSON.parse(msg);
        }
        else if (msg[0] === '<') {
            // Fragmented multipart message.
            // A fragmented multipart message has plaintext header <index, count> right
            // before the data string.
            var close_1 = msg.indexOf('>');
            var header = msg.substr(1, close_1 - 1);
            var parts = header.split(',').map(function (x) { return parseInt(x, 10); });
            if (parts.length !== 2) {
                return {};
            }
            var index = parts[0];
            var count = parts[1];
            var fragmentLookupKey = id + ':' + topic;
            var fragments = messageBuffer[fragmentLookupKey];
            if (!fragments) {
                fragments = [];
                for (var i = 0; i < count; ++i) {
                    fragments.push('');
                }
            }
            fragments[index] = msg.substr(close_1 + 1);
            var allFragmentsReceived = true;
            for (var i = 0; i < count; ++i) {
                if (fragments[i].length === 0) {
                    allFragmentsReceived = false;
                    break;
                }
            }
            messageBuffer[fragmentLookupKey] = fragments;
            if (!allFragmentsReceived) {
                return null;
            }
            delete messageBuffer[fragmentLookupKey];
            var fullMessage = fragments.join('');
            var decoded = atob(fullMessage);
            var integers = decoded.split('').map(function (x) { return x.charCodeAt(0); });
            var bytes = new Uint8Array(integers);
            return JSON.parse(pako.inflate(bytes, { to: 'string' }));
        }
        else {
            var decoded = atob(msg);
            var integers = decoded.split('').map(function (x) { return x.charCodeAt(0); });
            var bytes = new Uint8Array(integers);
            return JSON.parse(pako.inflate(bytes, { to: 'string' }));
        }
    }
    // TwitchMessenger implements the basic 'messenger' interface, which should be implemented
    // for all pubsub implementations. This is used by SDK to provide low-level access
    // to a pubsub implementation.
    var TwitchMessenger = /** @class */ (function () {
        function TwitchMessenger(debug) {
            this.channelID = '';
            this.extensionID = '';
            this.debug = debug;
        }
        /**
         * send will send a message to all clients.
         * @param id the extension id or app id of the app thats sending the message.
         * @param event an event name. Event names should be in the form [a-z0-9_]+
         * @param either 'broadcast' or 'whisper-<opaque-user-id>'
         * @param body a json object to send
         * @param client a state-client instance. Used to make external calls.
         * The twitch messenger does not need the client, so its not shown in the signature
         * below.
         */
        /* eslint-disable class-methods-use-this */
        TwitchMessenger.prototype.send = function (id, event, target, body) {
            var data = body || {};
            this.debug.onPubsubSend(id, event, target, body);
            window.Twitch.ext.send(target, 'application/json', {
                data: data,
                event: "".concat(CurrentEnvironment().environment, ":").concat(id, ":").concat(event)
            });
        };
        /* eslint-enable class-methods-use-this */
        /**
         * listen is the low level listening interface.
         * @param id the extension id or app id of the app thats sending the message.
         * @param topic either `broadcast` or `whisper-<opaque-user-id>`.
         * @param callback a function(body)
         * @return a handle that can be passed into unlisten to unbind the callback.
         */
        /* eslint-disable class-methods-use-this */
        TwitchMessenger.prototype.listen = function (id, topic, callback) {
            var _this = this;
            var messageBuffer = {};
            var cb = function (t, datatype, message) {
                try {
                    var parsed = parseMessage(messageBuffer, id, topic, message);
                    if (!parsed) {
                        return;
                    }
                    _this.debug.onPubsubReceive(id, topic, parsed);
                    callback(parsed);
                }
                catch (err) {
                    // TODO: Silent failure?
                }
            };
            this.debug.onPubsubListen(id, topic);
            window.Twitch.ext.listen(topic, cb);
            if (topic === 'broadcast') {
                window.Twitch.ext.listen('global', cb);
            }
            return {
                cb: cb,
                target: topic
            };
        };
        /* eslint-enable class-methods-use-this */
        /**
         * unlisten will unregister a listening callback.
         * @param id the extension id or app id of the app thats sending the message.
         * @param h the handle returned from listen
         */
        /* eslint-disable class-methods-use-this */
        TwitchMessenger.prototype.unlisten = function (id, h) {
            window.Twitch.ext.unlisten(h.target, h.cb);
        };
        /* eslint-enable class-methods-use-this */
        TwitchMessenger.prototype.close = function () {
            /* Nothing to close on Twitch */
        };
        return TwitchMessenger;
    }());
    // PusherMessenger adheres to the 'messenger' interface, but uses https://pusher.com
    // as a pubsub notification provider.
    var PusherMessenger = /** @class */ (function () {
        function PusherMessenger(debug) {
            // @ts-ignore
            this.client = new Pusher('18c26c0d1c7fafb78ba2', {
                cluster: 'us2'
            });
            this.channelID = '';
            this.debug = debug;
        }
        PusherMessenger.prototype.send = function (id, event, target, body, client) {
            var scopedEvent = "".concat(CurrentEnvironment().environment, ":").concat(id, ":").concat(event);
            this.debug.onPubsubSend(id, event, target, body);
            client.signedRequest(id, 'POST', 'pusher_broadcast', {
                data: body,
                event: scopedEvent,
                target: target,
                user_id: this.channelID
            });
        };
        PusherMessenger.prototype.listen = function (id, topic, callback) {
            var _this = this;
            if (!this.channel) {
                var channelName = "twitch.pubsub.".concat(this.extensionID, ".").concat(this.channelID);
                var globalName = "twitch.pubsub.".concat(this.extensionID, ".all");
                this.channel = this.client.subscribe(channelName);
                this.globalChannel = this.client.subscribe(globalName);
            }
            var messageBuffer = {};
            var cb = function (message) {
                try {
                    var parsed = parseMessage(messageBuffer, id, topic, message.message);
                    if (!parsed) {
                        return;
                    }
                    _this.debug.onPubsubReceive(id, topic, parsed);
                    callback(parsed);
                }
                catch (err) {
                    // TODO: Silent failure?
                }
            };
            this.debug.onPubsubListen(id, topic);
            this.channel.bind(topic, cb);
            this.globalChannel.bind(topic, cb);
            return {
                cb: cb,
                target: topic
            };
        };
        PusherMessenger.prototype.unlisten = function (id, h) {
            this.channel.unbind(h.target, h.cb);
            this.globalChannel.unbind(h.target, h.cb);
        };
        PusherMessenger.prototype.close = function () {
            this.client.disconnect();
        };
        return PusherMessenger;
    }());
    // ServerMessenger implements a 'messenger' that is broadcast-only. It cannot
    // listen for messages, but is able to send with a backend-signed JWT.
    var ServerMessenger = /** @class */ (function () {
        function ServerMessenger(debug, ch) {
            this.channelID = ch;
            this.debug = debug;
        }
        ServerMessenger.prototype.send = function (id, event, target, body, client) {
            this.debug.onPubsubSend(id, event, target, body);
            client.signedRequest(id, 'POST', 'broadcast', {
                data: body,
                event: event,
                target: target,
                user_id: this.channelID
            });
        };
        ServerMessenger.prototype.listen = function (id, topic, callback) {
            throw new Error('Server-side message receiving is not implemented.');
        };
        ServerMessenger.prototype.unlisten = function (id, handle) {
            throw new Error('Server-side message receiving is not implemented.');
        };
        ServerMessenger.prototype.close = function () {
            /* Nothing to close server-side. */
        };
        return ServerMessenger;
    }());
    function DefaultMessenger(debug) {
        var type = Config$1.DefaultMessengerType(CurrentEnvironment());
        switch (type) {
            case MessengerType.Pusher:
                return new PusherMessenger(debug);
            case MessengerType.Twitch:
                return new TwitchMessenger(debug);
            case MessengerType.Server:
                return new ServerMessenger(debug);
            default:
                throw new Error('Could not determine proper messenger type for environment.');
        }
    }

    /**
     * Muxy production URLs.
     * @ignore
     */
    var API_URL_PRODUCTION = 'https://api.muxy.io';
    var PORTAL_URL_PRODUCTION = 'https://dev.muxy.io';
    /**
     * Muxy sandbox API URL.
     * @ignore
     */
    var API_URL_SANDBOX = 'https://api.sandbox.muxy.io';
    /**
     * Muxy staging URLs.
     */
    var API_URL_STAGING = 'https://api.staging.muxy.io';
    var PORTAL_URL_STAGING = 'https://dev.staging.muxy.io';
    /**
     * Localhost for testing purposes.
     * @ignore
     */
    var API_URL_LOCALHOST = 'http://localhost:5000';
    var AuthorizationFlowType;
    (function (AuthorizationFlowType) {
        AuthorizationFlowType[AuthorizationFlowType["TwitchAuth"] = 0] = "TwitchAuth";
        AuthorizationFlowType[AuthorizationFlowType["AdminAuth"] = 1] = "AdminAuth";
        AuthorizationFlowType[AuthorizationFlowType["TestAuth"] = 2] = "TestAuth";
        AuthorizationFlowType[AuthorizationFlowType["Unknown"] = 3] = "Unknown";
    })(AuthorizationFlowType || (AuthorizationFlowType = {}));
    var Config = /** @class */ (function () {
        function Config() {
        }
        Config.RegisterMoreEnvironments = function () { };
        Config.DefaultMessengerType = function (env) {
            switch (env) {
                case Util.Environments.Admin: // Currently unable to hook into the twitch pubsub system from admin
                case Util.Environments.SandboxAdmin:
                case Util.Environments.StagingAdmin:
                case Util.Environments.SandboxDev:
                    return MessengerType.Pusher;
                case Util.Environments.Production:
                case Util.Environments.SandboxTwitch:
                    return MessengerType.Twitch;
                case Util.Environments.Server:
                    return MessengerType.Server;
                case Util.Environments.Staging:
                case Util.Environments.Testing:
            }
            return MessengerType.Unknown;
        };
        Config.DefaultPurchaseClientType = function (env) {
            switch (env) {
                case Util.Environments.SandboxDev:
                case Util.Environments.StagingDev:
                    return PurchaseClientType.Dev;
                case Util.Environments.SandboxTwitch:
                case Util.Environments.Production:
                    return PurchaseClientType.Twitch;
                case Util.Environments.Server:
                    return PurchaseClientType.Server;
                case Util.Environments.Testing:
                    return PurchaseClientType.Test;
            }
            return PurchaseClientType.Unknown;
        };
        Config.GetAuthorizationFlowType = function (env) {
            switch (env) {
                case Util.Environments.SandboxDev:
                case Util.Environments.StagingDev:
                    return AuthorizationFlowType.TestAuth;
                case Util.Environments.Admin:
                case Util.Environments.StagingAdmin:
                    return AuthorizationFlowType.AdminAuth;
                case Util.Environments.Production:
                case Util.Environments.SandboxTwitch:
                    return AuthorizationFlowType.TwitchAuth;
                case Util.Environments.Server:
                case Util.Environments.Testing:
            }
            return AuthorizationFlowType.Unknown;
        };
        Config.CanUseTwitchAPIs = function (env) {
            switch (env) {
                case Util.Environments.Production:
                case Util.Environments.SandboxTwitch:
                    return true;
            }
            return false;
        };
        Config.GetServerURLs = function (env) {
            switch (env) {
                case Util.Environments.Production:
                    return {
                        FakeAuthURL: API_URL_PRODUCTION,
                        PortalURL: PORTAL_URL_PRODUCTION,
                        ServerURL: API_URL_PRODUCTION
                    };
                case Util.Environments.SandboxDev:
                case Util.Environments.SandboxTwitch:
                case Util.Environments.SandboxAdmin:
                    return {
                        FakeAuthURL: API_URL_SANDBOX,
                        PortalURL: PORTAL_URL_PRODUCTION,
                        ServerURL: API_URL_SANDBOX
                    };
                case Util.Environments.StagingDev:
                case Util.Environments.StagingAdmin:
                    return {
                        FakeAuthURL: API_URL_STAGING,
                        PortalURL: PORTAL_URL_STAGING,
                        ServerURL: API_URL_STAGING
                    };
                case Util.Environments.Testing:
                    return {
                        FakeAuthURL: API_URL_LOCALHOST,
                        PortalURL: PORTAL_URL_STAGING,
                        ServerURL: API_URL_LOCALHOST
                    };
            }
            return {
                FakeAuthURL: API_URL_SANDBOX,
                PortalURL: PORTAL_URL_PRODUCTION,
                ServerURL: API_URL_SANDBOX
            };
        };
        Config.OtherEnvironmentCheck = function (window) {
            return undefined;
        };
        return Config;
    }());
    var Config$1 = Config;

    var DebuggingOptions = /** @class */ (function () {
        function DebuggingOptions() {
            var noop = function () {
                /* Default to doing nothing on callback */
            };
            this.options = {
                onPubsubListen: noop,
                onPubsubReceive: noop,
                onPubsubSend: noop
            };
            if (window.location && window.location.search) {
                var qp = new URLSearchParams(window.location.search);
                this.options.url = this.readFromQuery(qp, 'url');
                this.options.url = this.readFromQuery(qp, 'channelID');
                this.options.url = this.readFromQuery(qp, 'userID');
                this.options.url = this.readFromQuery(qp, 'role');
                this.options.url = this.readFromQuery(qp, 'environment');
            }
        }
        DebuggingOptions.prototype.url = function (url) {
            this.options.url = /^https?:\/\//.test(url) ? url : "https://".concat(url);
            return this;
        };
        DebuggingOptions.prototype.channelID = function (cid) {
            this.options.channelID = cid;
            return this;
        };
        DebuggingOptions.prototype.userID = function (uid) {
            this.options.userID = uid;
            return this;
        };
        DebuggingOptions.prototype.role = function (r) {
            this.options.role = r;
            return this;
        };
        DebuggingOptions.prototype.jwt = function (j) {
            this.options.jwt = j;
            return this;
        };
        DebuggingOptions.prototype.environment = function (e) {
            this.options.environment = e;
            return this;
        };
        DebuggingOptions.prototype.onPubsubSend = function (cb) {
            this.options.onPubsubSend = cb;
            return this;
        };
        DebuggingOptions.prototype.onPubsubReceive = function (cb) {
            this.options.onPubsubReceive = cb;
            return this;
        };
        DebuggingOptions.prototype.onPubsubListen = function (cb) {
            this.options.onPubsubListen = cb;
            return this;
        };
        DebuggingOptions.prototype.readFromQuery = function (params, key) {
            return params.get("muxy_debug_".concat(key));
        };
        return DebuggingOptions;
    }());

    var TESTING_HELIX_TOKEN_KEY = 'testing_helix_token';
    function allowTestingHelixToken(id, user) {
        var _this = this;
        if (user.helixToken) {
            return {
                openHelixUrl: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, ''];
                        });
                    });
                }
            };
        }
        var urls = Config$1.GetServerURLs(Util.currentEnvironment());
        var clientId = id;
        var useHelixToken = function () { return __awaiter(_this, void 0, void 0, function () {
            var localToken, sanityToken, req, newToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localToken = localStorage.getItem(TESTING_HELIX_TOKEN_KEY);
                        if (!localToken) {
                            return [2 /*return*/, false];
                        }
                        try {
                            sanityToken = JSON.parse(localToken);
                            if (!sanityToken.access_token || !sanityToken.refresh_token || !sanityToken.expires_in) {
                                return [2 /*return*/, false];
                            }
                        }
                        catch (e) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, fetch("".concat(urls.PortalURL, "/api/tokenauth/").concat(clientId, "/refresh"), {
                                method: 'POST',
                                body: localToken
                            })];
                    case 1:
                        req = _a.sent();
                        return [4 /*yield*/, req.json()];
                    case 2:
                        newToken = (_a.sent());
                        if (newToken.access_token) {
                            localStorage.setItem(TESTING_HELIX_TOKEN_KEY, JSON.stringify(newToken));
                            user.helixToken = newToken.access_token;
                            /* eslint-disable-next-line no-console */
                            console.log('Using testing helix token. Call window.ClearHelixToken() to stop this behavior');
                            return [2 /*return*/, true];
                        }
                        else {
                            /* eslint-disable-next-line no-console */
                            console.log('Failed to refresh helix token.');
                            return [2 /*return*/, false];
                        }
                }
            });
        }); };
        var pollForHelixToken = function (rng) { return __awaiter(_this, void 0, void 0, function () {
            var interval, attempts;
            var _this = this;
            return __generator(this, function (_a) {
                interval = 0;
                attempts = 0;
                interval = window.setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    var req, js;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch("".concat(urls.PortalURL, "/api/tokenauth/").concat(clientId, "/").concat(rng))];
                            case 1:
                                req = _a.sent();
                                return [4 /*yield*/, req.json()];
                            case 2:
                                js = (_a.sent());
                                if (js.access_token) {
                                    localStorage.setItem('testing_helix_token', JSON.stringify(js));
                                    clearInterval(interval);
                                    useHelixToken();
                                    return [2 /*return*/];
                                }
                                attempts++;
                                if (attempts > 120) {
                                    /* eslint-disable-next-line no-console */
                                    console.log('Failed to obtain authentication, try again by calling ObtainHelixToken');
                                    clearInterval(interval);
                                    return [2 /*return*/];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, 2000);
                return [2 /*return*/];
            });
        }); };
        var obtainHelixToken = function () { return __awaiter(_this, void 0, void 0, function () {
            var rng;
            return __generator(this, function (_a) {
                rng = Array(8)
                    .fill(0)
                    .map(function () { return Math.random().toString(36)[2]; })
                    .join('');
                /* eslint-disable no-console */
                console.log('To obtain a helix token, visit ');
                console.log("  ".concat(urls.PortalURL, "/login/twitch/token/").concat(clientId, "/").concat(rng));
                /* eslint-enable no-console */
                pollForHelixToken(rng);
                return [2 /*return*/, ''];
            });
        }); };
        var openHelixUrl = function () { return __awaiter(_this, void 0, void 0, function () {
            var rng;
            return __generator(this, function (_a) {
                rng = Array(8)
                    .fill(0)
                    .map(function () { return Math.random().toString(36)[2]; })
                    .join('');
                window.open("".concat(urls.PortalURL, "/login/twitch/token/").concat(clientId, "/").concat(rng), '_blank');
                pollForHelixToken(rng);
                return [2 /*return*/, ''];
            });
        }); };
        var clearHelixToken = function () {
            localStorage.removeItem(TESTING_HELIX_TOKEN_KEY);
            user.helixToken = '';
        };
        window.ObtainHelixToken = obtainHelixToken;
        window.ClearHelixToken = clearHelixToken;
        var loadHelixToken = useHelixToken();
        loadHelixToken.then(function (result) {
            if (!result) {
                /* eslint-disable-next-line no-console */
                console.log(' To use the debug helix token flow, call window.ObtainHelixToken() in the console');
            }
        });
        return {
            openHelixUrl: openHelixUrl
        };
    }

    var DEFAULT_CONTENT_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8';
    var XHRPromise = /** @class */ (function () {
        function XHRPromise(options) {
            if (options === void 0) { options = {}; }
            this.options = {
                headers: {},
                method: 'GET'
            };
            Object.assign(this.options, options);
        }
        XHRPromise.prototype.send = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!XMLHttpRequest) {
                    _this.handleResponse('browser', reject, null, "browser doesn't support XMLHttpRequest");
                    return;
                }
                if (typeof _this.options.url !== 'string' ||
                    _this.options.url.length === 0) {
                    _this.handleResponse('url', reject, null, 'URL is a required parameter');
                    return;
                }
                _this.xhr = new XMLHttpRequest();
                _this.xhr.onload = function () {
                    var responseText;
                    try {
                        responseText = _this.getResponseText();
                    }
                    catch (err) {
                        _this.handleResponse('parse', reject, null, 'invalid JSON response');
                        return;
                    }
                    return resolve({
                        headers: _this.getAllResponseHeaders(),
                        responseText: responseText,
                        status: _this.xhr.status,
                        statusText: _this.xhr.statusText,
                        url: _this.getResponseURL(),
                        xhr: _this.xhr
                    });
                };
                _this.xhr.onerror = function () {
                    return _this.handleResponse('error', reject);
                };
                _this.xhr.ontimeout = function () {
                    return _this.handleResponse('timeout', reject);
                };
                _this.xhr.onabort = function () {
                    return _this.handleResponse('abort', reject);
                };
                _this.xhr.open(_this.options.method, _this.options.url);
                if (_this.options.data && !_this.options.headers['Content-Type']) {
                    _this.options.headers['Content-Type'] = DEFAULT_CONTENT_TYPE;
                }
                var ref = _this.options.headers;
                for (var header in ref) {
                    if (ref.hasOwnProperty(header)) {
                        var value = ref[header];
                        _this.xhr.setRequestHeader(header, value);
                    }
                }
                try {
                    return _this.xhr.send(_this.options.data);
                }
                catch (err) {
                    return _this.handleResponse('send', reject, null, err.toString());
                }
            });
        };
        XHRPromise.prototype.getXHR = function () {
            return this.xhr;
        };
        // Converts response headers to map.
        XHRPromise.prototype.getAllResponseHeaders = function () {
            var map = {};
            if (this.xhr.readyState !== this.xhr.HEADERS_RECEIVED) {
                return map;
            }
            var headers = this.xhr.getAllResponseHeaders();
            var arr = headers.trim().split(/[\r\n]+/);
            arr.forEach(function (header) {
                var parts = header.split(': ');
                var h = parts.shift();
                var v = parts.join(': ');
                map[h] = v;
            });
            return map;
        };
        // Returns the XHR response, parsing as json if applicable.
        XHRPromise.prototype.getResponseText = function () {
            var type = (this.xhr.getResponseHeader('Content-Type') || '').split(';')[0];
            var text = typeof this.xhr.responseText === 'string' ? this.xhr.responseText : '';
            if (type === 'application/json' || type === 'text/javascript') {
                text = JSON.parse("".concat(text));
            }
            return text;
        };
        XHRPromise.prototype.getResponseURL = function () {
            if (this.xhr.responseURL !== null) {
                return this.xhr.responseURL;
            }
            if (/^X-Request-URL:/m.test(this.xhr.getAllResponseHeaders())) {
                return this.xhr.getResponseHeader('X-Request-URL');
            }
            return '';
        };
        XHRPromise.prototype.handleResponse = function (reason, response, status, statusText) {
            return response({
                reason: reason,
                status: status || this.xhr.status,
                statusText: statusText || this.xhr.statusText,
                xhr: this.xhr
            });
        };
        return XHRPromise;
    }());

    /**
     * @module SDK
     */
    var ObserverHandler = /** @class */ (function () {
        function ObserverHandler() {
        }
        ObserverHandler.prototype.notify = function (obj) {
            throw new Error('Abstract Method!');
        };
        return ObserverHandler;
    }());
    var Observer = /** @class */ (function () {
        function Observer() {
            this.observers = [];
        }
        Observer.prototype.register = function (observer) {
            this.observers.push(observer);
        };
        Observer.prototype.unregister = function (observer) {
            var n = this.observers.indexOf(observer);
            this.observers.splice(n, 1);
        };
        Observer.prototype.notify = function (obj) {
            var i = 0;
            var max = this.observers.length;
            for (; i < max; i += 1) {
                this.observers[i].notify(obj);
            }
        };
        return Observer;
    }());

    /**
     * @module SDK
     */
    var TwitchAuth = /** @class */ (function () {
        function TwitchAuth() {
        }
        return TwitchAuth;
    }());
    var ContextUpdateCallbackHandle = /** @class */ (function (_super) {
        __extends(ContextUpdateCallbackHandle, _super);
        function ContextUpdateCallbackHandle(cb) {
            var _this = _super.call(this) || this;
            _this.cb = cb;
            return _this;
        }
        ContextUpdateCallbackHandle.prototype.notify = function (context) {
            this.cb(context);
        };
        return ContextUpdateCallbackHandle;
    }(ObserverHandler));
    var HighlightChangedCallbackHandle = /** @class */ (function (_super) {
        __extends(HighlightChangedCallbackHandle, _super);
        function HighlightChangedCallbackHandle(cb) {
            var _this = _super.call(this) || this;
            _this.cb = cb;
            return _this;
        }
        HighlightChangedCallbackHandle.prototype.notify = function (isHighlighted) {
            this.cb(isHighlighted);
        };
        return HighlightChangedCallbackHandle;
    }(ObserverHandler));

    /**
     * @module SDK
     */
    /**
     * API URL to use for backend requests.
     * Configure using using {@link setEnvironment}.
     * @ignore
     */
    var SERVER_URL;
    /**
     * ServerState enum maps the subsets of state persisted to the server to
     * their respective endpoints.
     * @ignore
     */
    var ServerState;
    (function (ServerState) {
        ServerState["ALL"] = "all_state";
        ServerState["AUTHENTICATION"] = "authentication";
        ServerState["CHANNEL"] = "channel_state";
        ServerState["EXTENSION"] = "extension_state";
        ServerState["EXTENSION_SECRET"] = "extension_hidden_state";
        ServerState["EXTENSION_VIEWER"] = "extension_viewer_state";
        ServerState["USER"] = "user_info";
        ServerState["VIEWER"] = "viewer_state";
    })(ServerState || (ServerState = {}));
    /**
     * ServerConfig enum maps the subsets of config persisted to the server to
     * their respective endpoints.
     * @ignore
     */
    var ServerConfig;
    (function (ServerConfig) {
        ServerConfig["ALL"] = "config";
        ServerConfig["CHANNEL"] = "config/channel";
        ServerConfig["EXTENSION"] = "config/extension";
    })(ServerConfig || (ServerConfig = {}));
    /**
     * HookManager class for adding and removing network request
     * and response hooks.
     *
     * Similar to the axios interceptor pattern:
     * https://github.com/axios/axios/blob/master/lib/core/InterceptorManager.js
     *
     * @ignore
     */
    var HookManager = /** @class */ (function () {
        function HookManager() {
            this.callbacks = [];
        }
        Object.defineProperty(HookManager.prototype, "length", {
            get: function () {
                return this.callbacks.length;
            },
            enumerable: false,
            configurable: true
        });
        HookManager.prototype.add = function (success, failure) {
            this.callbacks.push({ failure: failure, success: success });
            return this.callbacks.length - 1;
        };
        HookManager.prototype.remove = function (index) {
            if (this.callbacks[index]) {
                this.callbacks[index] = null;
            }
        };
        // Iterable interface allows looping through hooks like:
        // for (let h of this.hooks) {
        //   h.success();
        // }
        HookManager.prototype[Symbol.iterator] = function () {
            var current = 0;
            var callbacks = this.callbacks;
            return {
                next: function () {
                    while (callbacks[current] === null && current < callbacks.length) {
                        current++;
                    }
                    if (current < callbacks.length) {
                        return { done: false, value: callbacks[current++] };
                    }
                    else {
                        return { done: true, value: null };
                    }
                }
            };
        };
        return HookManager;
    }());
    /**
     * Wraps all extension backend accessor and mutator endpoints in convenience functions.
     *
     * Should not normally be created directly, instead an instance is made available
     * and namespaced appropriately when using {@link Muxy.SDK}.
     *
     * @private
     *
     * @example
     * const sdk = new Muxy.SDK();
     * sdk.getAllState().then((state) => {
     *   console.log(state);
     * });
     */
    var StateClient = /** @class */ (function () {
        /** @ignore */
        function StateClient(loadedPromise, debug) {
            var _this = this;
            this.hooks = {
                requests: new HookManager(),
                responses: new HookManager()
            };
            /**
             * getState requests a subset of state stored on the server and sets the
             * local cached version of the state to the response.
             * @ignore
             */
            this.getState = function (identifier, substate) {
                return _this.signedRequest(identifier, 'GET', substate || ServerState.ALL);
            };
            /**
             * getConfig requests a subset of config stored on the server and sets the
             * local cached version of the config to the response.
             * @ignore
             */
            this.getConfig = function (identifier, subconfig) {
                return _this.signedRequest(identifier, 'GET', subconfig || ServerConfig.ALL);
            };
            /**
             * postState sends data to the current EBS substate endpoint for persistence.
             * @ignore
             */
            this.postState = function (identifier, substate, data) { return _this.signedRequest(identifier, 'POST', substate || ServerState.ALL, data); };
            /**
             * postConfig sends data to the current EBS substate endpoint for persistence.
             * @ignore
             */
            this.postConfig = function (identifier, subconfig, data) { return _this.signedRequest(identifier, 'POST', subconfig || ServerConfig.ALL, data); };
            /** @ignore */
            this.getUserInfo = function (identifier) { return _this.getState(identifier, ServerState.USER); };
            /** @ignore */
            this.immediateGetUserInfo = function (identifier) {
                return _this.signedRequest(identifier, 'GET', ServerState.USER, undefined, true);
            };
            /** @ignore */
            this.getViewerState = function (identifier) {
                return _this.getState(identifier, ServerState.VIEWER);
            };
            /** @ignore */
            this.getExtensionViewerState = function (identifier) {
                return _this.getState(identifier, ServerState.EXTENSION_VIEWER);
            };
            /** @ignore */
            this.multiGetExtensionViewerState = function (identifier, users) {
                return _this.signedRequest(identifier, 'GET', "extension_viewer_state?user_ids=".concat(users.join(',')));
            };
            /** @ignore */
            this.getExtensionSecretState = function (identifier) {
                return _this.getState(identifier, ServerState.EXTENSION_SECRET);
            };
            /** @ignore */
            this.getChannelState = function (identifier) {
                return _this.getState(identifier, ServerState.CHANNEL);
            };
            /** @ignore */
            this.getServerConfig = function (identifier) {
                return _this.getConfig(identifier, ServerConfig.ALL);
            };
            /** @ignore */
            this.getChannelConfig = function (identifier) {
                return _this.getConfig(identifier, ServerConfig.CHANNEL);
            };
            /** @ignore */
            this.getExtensionConfig = function (identifier) {
                return _this.getConfig(identifier, ServerConfig.EXTENSION);
            };
            /** @ignore */
            this.getExtensionState = function (identifier) {
                return _this.getState(identifier, ServerState.EXTENSION);
            };
            /** @ignore */
            this.setExtensionState = function (identifier, state) {
                return _this.postState(identifier, ServerState.EXTENSION, state);
            };
            /** @ignore */
            this.patchExtensionState = function (identifier, multiState) {
                return _this.signedRequest(identifier, 'PATCH', ServerState.EXTENSION, multiState);
            };
            /** @ignore */
            this.setViewerState = function (identifier, state) {
                return _this.postState(identifier, ServerState.VIEWER, state);
            };
            /** @ignore */
            this.patchViewerState = function (identifier, multiState) {
                return _this.signedRequest(identifier, 'PATCH', ServerState.VIEWER, multiState);
            };
            /** @ignore */
            this.setExtensionViewerState = function (identifier, state) {
                return _this.postState(identifier, ServerState.EXTENSION_VIEWER, state);
            };
            /** @ignore */
            this.patchExtensionViewerState = function (identifier, multiState) { return _this.signedRequest(identifier, 'PATCH', ServerState.EXTENSION_VIEWER, multiState); };
            /** @ignore */
            this.setExtensionSecretState = function (identifier, state) {
                return _this.postState(identifier, ServerState.EXTENSION_SECRET, state);
            };
            /** @ignore */
            this.patchExtensionSecretState = function (identifier, multiState) { return _this.signedRequest(identifier, 'PATCH', ServerState.EXTENSION_SECRET, multiState); };
            /** @ignore */
            this.setChannelState = function (identifier, state) {
                return _this.postState(identifier, ServerState.CHANNEL, state);
            };
            /** @ignore */
            this.patchChannelState = function (identifier, multiState) {
                return _this.signedRequest(identifier, 'PATCH', ServerState.CHANNEL, multiState);
            };
            /** @ignore */
            this.setChannelConfig = function (identifier, config) {
                return _this.postConfig(identifier, ServerConfig.CHANNEL, config);
            };
            /** @ignore */
            this.patchChannelConfig = function (identifier, multiConfig) {
                return _this.signedRequest(identifier, 'PATCH', ServerConfig.CHANNEL, multiConfig);
            };
            /** @ignore */
            this.setExtensionConfig = function (identifier, config) {
                return _this.postConfig(identifier, ServerConfig.EXTENSION, config);
            };
            /** @ignore */
            this.patchExtensionConfig = function (identifier, multiConfig) { return _this.signedRequest(identifier, 'PATCH', ServerConfig.EXTENSION, multiConfig); };
            /** @ignore */
            this.getAccumulation = function (identifier, id, start) {
                return _this.signedRequest(identifier, 'GET', "accumulate?id=".concat(id || 'default', "&start=").concat(start));
            };
            /** @ignore */
            this.accumulate = function (identifier, id, data) {
                return _this.signedRequest(identifier, 'POST', "accumulate?id=".concat(id || 'default'), data);
            };
            /** @ignore */
            this.vote = function (identifier, id, data) {
                return _this.signedRequest(identifier, 'POST', "vote?id=".concat(id || 'default'), data);
            };
            /** @ignore */
            this.getVotes = function (identifier, id) {
                if (id === void 0) { id = 'default'; }
                return _this.signedRequest(identifier, 'GET', "vote?id=".concat(id));
            };
            /** @ignore */
            this.getFullVoteLogs = function (identifier, id) {
                if (id === void 0) { id = 'default'; }
                return _this.signedRequest(identifier, 'GET', "vote_logs?id=".concat(id));
            };
            /** @ignore */
            this.rank = function (identifier, id, data) {
                return _this.signedRequest(identifier, 'POST', "rank?id=".concat(id || 'default'), data);
            };
            /** @ignore */
            this.getRank = function (identifier, id) {
                if (id === void 0) { id = 'default'; }
                return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this.signedRequest(identifier, 'GET', "rank?id=".concat(id))];
                }); });
            };
            /** @ignore */
            this.deleteRank = function (identifier, id) {
                if (id === void 0) { id = 'default'; }
                return _this.signedRequest(identifier, 'DELETE', "rank?id=".concat(id));
            };
            /** @ignore */
            this.getJSONStore = function (identifier, id) {
                if (id === void 0) { id = 'default'; }
                return _this.signedRequest(identifier, 'GET', "json_store?id=".concat(id));
            };
            /** @ignore */
            this.validateCode = function (identifier, code) {
                return _this.signedRequest(identifier, 'POST', 'validate_pin', { pin: code });
            };
            /** @ignore */
            this.pinTokenExists = function (identifier) {
                return _this.signedRequest(identifier, 'GET', 'pin_token_exists');
            };
            /** @ignore */
            this.revokeAllPINCodes = function (identifier) {
                return _this.signedRequest(identifier, 'DELETE', 'pin');
            };
            /** @ignore */
            this.getEligibleCodes = function (identifier) {
                return _this.signedRequest(identifier, 'GET', 'codes/eligible');
            };
            /** @ignore */
            this.getRedeemedCodes = function (identifier) {
                return _this.signedRequest(identifier, 'GET', 'codes/redeemed');
            };
            /** @ignore */
            this.redeemCode = function (identifier, prizeIndex) {
                return _this.signedRequest(identifier, 'POST', 'codes/redeem', {
                    all_prizes: prizeIndex
                });
            };
            /** @ignore */
            this.getExtensionUsers = function (identifier, cursor) {
                return _this.signedRequest(identifier, 'GET', "user_ids?cursor=".concat(cursor || 0));
            };
            /** @ignore */
            this.joinExtensionTriviaTeam = function (identifier) { return _this.signedRequest(identifier, 'POST', 'team_membership'); };
            /** @ignore */
            this.getExtensionTriviaJoinedTeam = function (identifier) {
                return _this.signedRequest(identifier, 'GET', 'team_membership');
            };
            /** @ignore */
            this.addExtensionTriviaQuestion = function (identifier, triviaQuestion) {
                return _this.signedRequest(identifier, 'POST', 'curated_poll_edit', triviaQuestion);
            };
            /** @ignore */
            this.removeExtensionTriviaQuestion = function (identifier, triviaQuestionID) {
                return _this.signedRequest(identifier, 'DELETE', 'curated_poll_edit', {
                    id: triviaQuestionID
                });
            };
            /** @ignore */
            this.addExtensionTriviaOptionToQuestion = function (identifier, questionID, option) {
                return _this.signedRequest(identifier, 'POST', 'curated_poll_edit_option', { id: questionID, option: option });
            };
            /** @ignore */
            this.removeExtensionTriviaOptionFromQuestion = function (identifier, questionID, optionID) {
                return _this.signedRequest(identifier, 'DELETE', 'curated_poll_edit_option', { question: questionID, option: optionID });
            };
            /** @ignore */
            this.setExtensionTriviaQuestionState = function (identifier, questionID, state, winner) {
                return _this.signedRequest(identifier, 'POST', "curated_poll_state?id=".concat(questionID), { transition: state, winner: winner });
            };
            /** @ignore */
            this.setExtensionTriviaQuestionVote = function (identifier, questionID, optionID) {
                return _this.signedRequest(identifier, 'POST', 'curated_poll', { question_id: questionID, vote: optionID });
            };
            /** @ignore */
            this.getExtensionTriviaQuestions = function (identifier) {
                return _this.signedRequest(identifier, 'GET', 'curated_poll');
            };
            /** @ignore */
            this.getExtensionTriviaQuestion = function (identifier, questionID) {
                return _this.signedRequest(identifier, 'GET', "curated_poll?id=".concat(questionID));
            };
            /** @ignore */
            this.getExtensionTriviaLeaderboard = function (identifer) {
                return _this.signedRequest(identifer, 'GET', 'curated_poll_leaderboard');
            };
            /** @ignore */
            this.sendTransactionToServer = function (identifier, tx) {
                return _this.signedRequest(identifier, 'POST', 'bits/transactions', tx);
            };
            /** @ignore */
            this.token = null;
            this.debug = debug;
            this.loaded = loadedPromise;
        }
        /** @ignore */
        StateClient.fetchTestAuth = function (extensionID, debug) {
            return __awaiter(this, void 0, void 0, function () {
                var data, xhr;
                var _this = this;
                return __generator(this, function (_a) {
                    data = JSON.stringify({
                        app_id: extensionID,
                        channel_id: debug.channelID,
                        role: debug.role,
                        user_id: debug.userID || '12345678'
                    });
                    xhr = new XHRPromise({
                        data: data,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: "".concat(debug.url || SERVER_URL, "/v1/e/authtoken?role=").concat(debug.role) // pass role as a param for fixtures
                    });
                    return [2 /*return*/, xhr.send().then(function (resp) {
                            if (resp && resp.status < 400) {
                                _this.setEnvironment(null, debug);
                                // Update the API Server variable to point to test
                                var auth = Object.assign(new TwitchAuth(), resp.responseText, {
                                    channelId: debug.channelID,
                                    clientId: extensionID,
                                    userId: debug.userID ? "U".concat(debug.userID) : 'U12345678'
                                });
                                return Promise.resolve(auth);
                            }
                            else {
                                return Promise.reject(resp.statusText);
                            }
                        })];
                });
            });
        };
        /** @ignore */
        StateClient.setEnvironment = function (env, debug) {
            if (env) {
                var urls = Config$1.GetServerURLs(env);
                SERVER_URL = urls.ServerURL;
                urls.FakeAuthURL;
            }
            if (debug && debug.url) {
                SERVER_URL = debug.url;
                debug.url;
            }
        };
        /** @ignore */
        StateClient.prototype.updateAuth = function (token) {
            this.token = token;
        };
        /**
         * signedRequest checks that we have a valid JWT and wraps a standard AJAX
         * request to the EBS with valid auth credentials.
         * @ignore
         */
        StateClient.prototype.signedRequest = function (extensionID, method, endpoint, data, skipPromise) {
            return __awaiter(this, void 0, void 0, function () {
                var promise, chain, _a, _b, h, _c, _d, h;
                var e_1, _e, e_2, _f;
                var _this = this;
                return __generator(this, function (_g) {
                    promise = skipPromise
                        ? Promise.resolve(undefined)
                        : this.loaded;
                    chain = [
                        // Perform request with mutated config options.
                        function (config) { return __awaiter(_this, void 0, void 0, function () {
                            var xhrPromise, resp, requestErr_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!this.validateJWT()) {
                                            return [2 /*return*/, Promise.reject('Your authentication token has expired.')];
                                        }
                                        xhrPromise = new XHRPromise(config);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, xhrPromise.send()];
                                    case 2:
                                        resp = _a.sent();
                                        if (resp.status < 400) {
                                            return [2 /*return*/, Promise.resolve(resp.responseText)];
                                        }
                                        else if (resp.responseText) {
                                            return [2 /*return*/, Promise.reject(resp.responseText)];
                                        }
                                        else {
                                            return [2 /*return*/, Promise.reject("Server returned status ".concat(resp.status))];
                                        }
                                    case 3:
                                        requestErr_1 = _a.sent();
                                        return [2 /*return*/, Promise.reject(requestErr_1)];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); },
                        undefined
                    ];
                    try {
                        // Unshift pre-request hooks to beginning of call chain
                        for (_a = __values(this.hooks.requests), _b = _a.next(); !_b.done; _b = _a.next()) {
                            h = _b.value;
                            chain.unshift(h.success, h.failure);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    try {
                        // Push post-request hooks to end of call chain
                        for (_c = __values(this.hooks.responses), _d = _c.next(); !_d.done; _d = _c.next()) {
                            h = _d.value;
                            chain.push(h.success, h.failure);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    // Start the promise chain with the current config object
                    promise = promise.then(function () { return ({
                        data: JSON.stringify(data),
                        headers: { Authorization: "".concat(extensionID, " ").concat(_this.token) },
                        method: method,
                        url: "".concat(SERVER_URL, "/v1/e/").concat(endpoint)
                    }); });
                    // Build promise chain
                    while (chain.length) {
                        promise = promise.then(chain.shift(), chain.shift());
                    }
                    // Force last return value to generic state type
                    // If we want to do more explicit type checking, we would need
                    // the developer to provide a discrimator or type identifier.
                    // But I don't know if that's proper for this library to enforce.
                    return [2 /*return*/, promise.then(function (value) {
                            return value;
                        })];
                });
            });
        };
        /**
         * validateJWT ensures that the current JWT is valid and not expired.
         * @ignore
         */
        StateClient.prototype.validateJWT = function () {
            try {
                var splitToken = this.token.split('.');
                if (splitToken.length !== 3) {
                    return false;
                }
                var tk = JSON.parse(atob(splitToken[1]));
                if (!tk.exp) {
                    return false;
                }
                var now = new Date().valueOf();
                if (tk.exp < now / 1000) {
                    return false;
                }
                return true;
            }
            catch (err) {
                return false;
            }
        };
        return StateClient;
    }());

    /**
     * @module SDK
     */
    // 25 minutes between updates of the testing auth token.
    var TEST_AUTH_TIMEOUT_MS = 25 * 60 * 1000;
    // Wrapper around global Twitch extension object.
    var Ext = /** @class */ (function () {
        function Ext() {
        }
        Ext.fetchTestAuth = function (opts, cb) {
            StateClient.fetchTestAuth(this.extensionID, opts)
                .then(function (auth) {
                cb(auth);
            })
                .catch(cb);
        };
        Ext.fetchAdminAuth = function (debug, cb) {
            var _this = this;
            var allowedOrigins = ['^https://.*?\\.muxy\\.io$', '^https://.*?\\.staging\\.muxy\\.io$', '^https?://localhost'];
            // Show that we're ready to receive.
            var connectionAttempts = 0;
            var connection = setInterval(function () {
                connectionAttempts++;
                // Once we've tried 60 times, back off on attempting to once every 1.5 seconds or so.
                if (connectionAttempts > 60) {
                    if (connectionAttempts % 10 !== 0) {
                        return;
                    }
                }
                window.parent.postMessage({ type: 'connect', id: _this.extensionID }, '*');
            }, 150);
            window.addEventListener('message', function (auth) {
                var allowed = false;
                allowedOrigins.forEach(function (origin) {
                    var r = new RegExp(origin);
                    if (r.test(auth.origin)) {
                        allowed = true;
                    }
                });
                if (!allowed) {
                    return;
                }
                if (auth.data.type === 'jwt') {
                    StateClient.setEnvironment(null, debug);
                    var resp = Object.assign(new TwitchAuth(), {
                        channelId: debug.channelID,
                        clientId: _this.extensionID,
                        token: auth.data.jwt,
                        userId: debug.userID || 'T12345678'
                    });
                    clearInterval(connection);
                    return cb(resp);
                }
            });
        };
        Ext.onAuthorized = function (opts, cb) {
            if (opts.jwt) {
                var auth_1 = this.authFromJWT(opts.jwt);
                return setTimeout(function () {
                    StateClient.setEnvironment(null, opts);
                    cb(auth_1);
                });
            }
            var flowType = Config$1.GetAuthorizationFlowType(CurrentEnvironment());
            switch (flowType) {
                case AuthorizationFlowType.TestAuth:
                    Ext.fetchTestAuth(opts, cb);
                    setInterval(Ext.fetchTestAuth, TEST_AUTH_TIMEOUT_MS, opts, cb);
                    break;
                case AuthorizationFlowType.AdminAuth:
                    Ext.fetchAdminAuth(opts, cb);
                    break;
                case AuthorizationFlowType.TwitchAuth: {
                    var timer_1 = setTimeout(cb, 1000 * 15);
                    window.Twitch.ext.onAuthorized(function (auth) {
                        clearTimeout(timer_1);
                        StateClient.setEnvironment(null, opts);
                        cb(auth);
                    });
                    break;
                }
                default:
                    consolePrint("No authorization callback for ".concat(CurrentEnvironment()), {
                        type: 'error'
                    });
            }
        };
        Ext.onContext = function (cb) {
            if (Config$1.CanUseTwitchAPIs(CurrentEnvironment())) {
                window.Twitch.ext.onContext(cb);
            }
        };
        Ext.beginPurchase = function (sku) {
            if (Config$1.CanUseTwitchAPIs(CurrentEnvironment())) {
                window.Twitch.ext.purchases.beginPurchase(sku);
            }
            else {
                consolePrint("beginPurchase not supported for ".concat(CurrentEnvironment()), {
                    type: 'error'
                });
            }
        };
        Ext.getPrices = function (cb) {
            if (Config$1.CanUseTwitchAPIs(CurrentEnvironment())) {
                window.Twitch.ext.purchases
                    .getPrices()
                    .then(function (prices) {
                    cb(prices);
                })
                    .catch(cb);
            }
            else {
                consolePrint("getPrices not supported for ".concat(CurrentEnvironment()), {
                    type: 'error'
                });
            }
        };
        Ext.onReloadEntitlements = function (cb) {
            if (Config$1.CanUseTwitchAPIs(CurrentEnvironment())) {
                window.Twitch.ext.purchases.onReloadEntitlements(cb);
            }
            else {
                consolePrint("onReloadEntitlements not supported for ".concat(CurrentEnvironment()), {
                    type: 'error'
                });
            }
        };
        Ext.onVisibilityChanged = function (callback) {
            if (Config$1.CanUseTwitchAPIs(CurrentEnvironment())) {
                window.Twitch.ext.onVisibilityChanged(callback);
            }
            else {
                consolePrint("onVisibilityChanged not supported for ".concat(CurrentEnvironment()), {
                    type: 'error'
                });
            }
        };
        Ext.onPositionChanged = function (callback) {
            if (Config$1.CanUseTwitchAPIs(CurrentEnvironment())) {
                window.Twitch.ext.onPositionChanged(callback);
            }
            else {
                consolePrint("onVisibilityChanged not supported for ".concat(CurrentEnvironment()), {
                    type: 'error'
                });
            }
        };
        Ext.onHighlightChanged = function (callback) {
            if (Config$1.CanUseTwitchAPIs(CurrentEnvironment())) {
                window.Twitch.ext.onHighlightChanged(callback);
            }
            else {
                consolePrint("onHighlightChanged not supported for ".concat(CurrentEnvironment()), {
                    type: 'error'
                });
            }
        };
        Ext.authFromJWT = function (jwt) {
            var claims = JSON.parse(atob(jwt.split('.')[1]));
            var res = new TwitchAuth();
            res.token = jwt;
            res.channelId = claims.channel_id;
            res.userId = claims.user_id;
            res.clientId = Ext.extensionID;
            return res;
        };
        return Ext;
    }());

    // TwitchPurchaseClient implements the basic 'purchase client' interface.
    // This is used by SDK to provide low-level access to twitch bits transactions.
    var TwitchPurchaseClient = /** @class */ (function () {
        function TwitchPurchaseClient(id) {
            var _this = this;
            var _a, _b;
            this.purchaseCallbacks = [];
            this.cancelationCallbacks = [];
            this.identifier = '';
            if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.Twitch) === null || _a === void 0 ? void 0 : _a.ext) === null || _b === void 0 ? void 0 : _b.bits)) {
                throw new Error('Twitch helper is required for bits transactions not loaded.');
            }
            this.identifier = id;
            // Twitch only allows one handler for complete/cancel
            window.Twitch.ext.bits.onTransactionComplete(function (tx) {
                if (tx.initiator.toLowerCase() === 'current_user') {
                    var promise_1 = Promise.resolve({});
                    if (mxy.transactionsEnabled) {
                        promise_1 = mxy.client.sendTransactionToServer(_this.identifier, tx);
                    }
                    _this.purchaseCallbacks.forEach(function (cb) { return cb(tx, promise_1); });
                }
            });
            window.Twitch.ext.bits.onTransactionCancelled(function () {
                _this.cancelationCallbacks.forEach(function (cb) { return cb(); });
            });
        }
        /**
         * purchase will start the twitch bits transaction.
         *
         * @since 2.4.0
         *
         * @throws {TwitchHelperError} Will throw an error if the Twitch Helper didn't load.
         *
         * @param sku the twitch sku of the item to be purchased.
         *
         * @example
         * client.purchase("XXSKU000");
         */
        TwitchPurchaseClient.prototype.purchase = function (sku) {
            window.Twitch.ext.bits.useBits(sku);
        };
        /**
         * Returns a list of Twitch Bits Products for the current channel.
         *
         * @async
         * @since 2.4.0
         *
         * @throws {TwitchHelperError} Will throw an error if the Twitch Helper didn't load.
         *
         * @return {Promise<[]TwitchBitsProduct>} Resolves with an array of {@link TwitchBitsProduct}
         * objects for each available sku.
         *
         * @example
         * const products = client.getProducts();
         */
        TwitchPurchaseClient.prototype.getProducts = function () {
            return window.Twitch.ext.bits.getProducts();
        };
        /**
         * onUserPurchase is the interface for adding a post transaction callback.
         *
         * @since 2.4.0
         *
         * @throws {TwitchHelperError} Will throw an error if the Twitch Helper didn't load.
         *
         * @param callback a function(body)
         *
         * @example
         * client.onUserPurchase(() => {
         *  console.log("Transaction finished!");
         * });
         */
        TwitchPurchaseClient.prototype.onUserPurchase = function (callback) {
            this.purchaseCallbacks.push(callback);
        };
        /**
         * onUserPurchaseCancelled is the interface for adding a post transaction failure callback.
         *
         * @since 2.4.5
         *
         * @throws {TwitchHelperError} Will throw an error if the Twitch Helper didn't load.
         *
         * @param callback a function(body)
         *
         * @example
         * client.onUserPurchaseCanceled(() => {
         *  console.log("Transaction cancelled!");
         * });
         */
        TwitchPurchaseClient.prototype.onUserPurchaseCanceled = function (callback) {
            this.cancelationCallbacks.push(callback);
        };
        return TwitchPurchaseClient;
    }());
    // DevPurchaseClient implements the basic 'purchase client' interface.
    // This is used by SDK to provide low-level access to stubbed transactions.
    var DevPurchaseClient = /** @class */ (function () {
        function DevPurchaseClient(id) {
            this.purchaseCallbacks = [];
            this.identifier = '';
            this.identifier = id;
        }
        /**
         * purchase will start the Dev purchase transaction.
         *
         * @since 2.4.0
         *
         * @param sku the sku of the item to be purchased.
         *
         * @example
         * client.purchase("TESTSKU00");
         */
        DevPurchaseClient.prototype.purchase = function (sku) {
            return __awaiter(this, void 0, void 0, function () {
                var products, item_1, testDate_1, _a, date, time, golangDate, jwtHeader, jwtPayload, encodedHeader, encodedPayload, testEncodedJWT_1;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!('MEDKIT_PURCHASABLE_ITEMS' in window)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getProducts()];
                        case 1:
                            products = _b.sent();
                            item_1 = products.find(function (p) { return p.sku === sku; });
                            testDate_1 = new Date();
                            _a = __read(testDate_1.toISOString().split(/T|Z/), 2), date = _a[0], time = _a[1];
                            golangDate = "".concat(date, " ").concat(time, " +0000 UTC");
                            jwtHeader = {
                                alg: 'HS256',
                                typ: 'JWT'
                            };
                            jwtPayload = {
                                topic: 'bits_transaction_receipt',
                                exp: Math.round((testDate_1.getTime() + 10000) / 1000),
                                data: {
                                    transactionId: "test:".concat(testDate_1.getTime()),
                                    time: golangDate,
                                    userId: mxy.user.twitchID,
                                    product: {
                                        domainId: "twitch.ext.".concat(Ext.extensionID),
                                        sku: item_1.sku,
                                        displayName: item_1.displayName,
                                        cost: {
                                            amount: item_1.cost.amount,
                                            type: item_1.cost.type
                                        }
                                    }
                                }
                            };
                            encodedHeader = btoa(JSON.stringify(jwtHeader));
                            encodedPayload = btoa(JSON.stringify(jwtPayload));
                            testEncodedJWT_1 = "".concat(encodedHeader, ".").concat(encodedPayload, ".DK02m0j0HQMKsPeFIrAuVdFh5X8f0hknjEKHAjGt6B0");
                            setTimeout(function () {
                                if (item_1) {
                                    var tx_1 = {
                                        transactionId: "test:".concat(testDate_1.getTime()),
                                        product: item_1,
                                        userId: mxy.user.twitchID,
                                        displayName: 'DevTestUser',
                                        initiator: 'current_user',
                                        transactionReceipt: testEncodedJWT_1
                                    };
                                    var promise_2 = Promise.resolve({});
                                    if (mxy.transactionsEnabled) {
                                        promise_2 = mxy.client.sendTransactionToServer(_this.identifier, tx_1);
                                    }
                                    _this.purchaseCallbacks.forEach(function (cb) { return cb(tx_1, promise_2); });
                                }
                                else {
                                    throw new Error("Product with SKU \"".concat(sku, "\" not found in product list."));
                                }
                            }, 3000);
                            return [3 /*break*/, 3];
                        case 2: throw new Error('No development products set. Use "window.MEDKIT_PURCHASABLE_ITEMS" to set debugging products.');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Returns a list of dev supplied Products.
         *
         * @async
         * @since 2.4.0
         *
         * @return {<[]Product>} Returns an array of {@link Product}
         * objects for each available sku.
         *
         * @example
         * window.MEDKIT_PURCHASABLE_ITEMS = [{
         *   sku: "TESTSKU01",
         *   displayName: "Test SKU 01",
         *   cost: {
         *       amount: 1,
         *       type: "test-cost",
         *     },
         *   },
         *   {
         *     sku: "TESTSKU02",
         *     displayName: "Test SKU 02",
         *     cost: {
         *      amount: 2,
         *      type: "test-cost",
         *   }
         * ];
         *
         * const products = await client.getProducts();
         */
        DevPurchaseClient.prototype.getProducts = function () {
            return Promise.resolve(window.MEDKIT_PURCHASABLE_ITEMS || []);
        };
        /**
         * onUserPurchase is the interface for adding a post transaction callback.
         *
         * @since 2.4.0
         *
         * @param callback a function(body)
         *
         * @example
         * client.onUserPurchase((transaction) => {
         *  console.log("Transaction finished!");
         * });
         */
        DevPurchaseClient.prototype.onUserPurchase = function (callback) {
            this.purchaseCallbacks.push(callback);
        };
        /**
         * onUserPurchaseCanceled is the interface for adding a post transaction failure callback.
         *
         * @since 2.4.5
         *
         * @param callback a function(body)
         *
         * @example
         * client.onUserPurchaseCanceled(() => {
         *  console.log("User cancelled transaction!");
         * });
         */
        DevPurchaseClient.prototype.onUserPurchaseCanceled = function (callback) {
            // Transactions always succeed on dev, so this will never be called.
        };
        return DevPurchaseClient;
    }());
    // TestPurchaseClient implements the basic 'purchase client' interface.
    // This is used by the test of the SDK to provide low-level access to stubbed transactions.
    var TestPurchaseClient = /** @class */ (function () {
        function TestPurchaseClient(id) {
            this.purchaseCallbacks = [];
            this.purchaseCanceledCallbacks = [];
            this.identifier = '';
            this.identifier = id;
        }
        /**
         * purchase will start the Test purchase transaction.
         *
         * @since 2.4.0
         *
         * @param sku the sku of the test item to be purchased.
         *
         * @example
         * client.purchase("TESTSKU00");
         */
        TestPurchaseClient.prototype.purchase = function (sku) {
            var _this = this;
            if ('MEDKIT_PURCHASABLE_ITEMS' in window) {
                var devItems_1 = this.getProducts();
                var products = Object.keys(devItems_1).map(function (sku) { return devItems_1[sku]; });
                var foundItem_1 = products.find(function (sku) { return sku === sku; });
                setTimeout(function () {
                    if (foundItem_1) {
                        var tx_2 = {
                            transactionId: 'dev-transaction-id',
                            product: foundItem_1,
                            userId: 'dev-test-user',
                            displayName: 'DevTestUser',
                            initiator: 'current_user',
                            transactionReceipt: 'transaction-receipt'
                        };
                        var promise_3 = Promise.resolve({});
                        if (mxy.transactionsEnabled) {
                            promise_3 = mxy.client.sendTransactionToServer(_this.identifier, tx_2);
                        }
                        _this.purchaseCallbacks.forEach(function (callback) {
                            callback(tx_2, promise_3);
                        });
                    }
                    else {
                        throw new Error("Product with SKU ".concat(sku, " not found in product list."));
                    }
                }, 3000);
            }
            else {
                throw new Error('No development products set. Use "window.MEDKIT_PURCHASABLE_ITEMS" to set debugging products.');
            }
        };
        /**
         * Returns a list of test supplied Products.
         *
         * @async
         * @since 2.4.0
         *
         * @return {<[]Product>} Returns an array of test {@link Product}
         * objects for each available sku.
         *
         * @example
         * window.MEDKIT_PURCHASABLE_ITEMS = [{
         *   sku: "TESTSKU01",
         *   displayName: "Test SKU 01",
         *   cost: {
         *       amount: 1,
         *       type: "test-cost",
         *     },
         *   },
         *   {
         *     sku: "TESTSKU02",
         *     displayName: "Test SKU 02",
         *     cost: {
         *      amount: 2,
         *      type: "test-cost",
         *   }
         * ];
         *
         * const products = await client.getProducts();
         */
        TestPurchaseClient.prototype.getProducts = function () {
            return Promise.resolve(window.MEDKIT_PURCHASABLE_ITEMS || []);
        };
        /**
         * onUserPurchase is the interface for testing adding a post transaction callback.
         *
         * @since 2.4.0
         *
         * @param callback a function(body)
         *
         * @example
         * client.onUserPurchase((transaction) => {
         *  console.log("Transaction finished!");
         * });
         */
        TestPurchaseClient.prototype.onUserPurchase = function (callback) {
            this.purchaseCallbacks.push(callback);
        };
        /**
         * onUserPurchaseCancelled is the interface for adding a post transaction failure callback.
         *
         * @since 2.4.5
         *
         * @param callback a function(body)
         *
         * @example
         * client.onUserPurchaseCanceled(() => {
         *  console.log("User cancelled transaction!");
         * });
         */
        TestPurchaseClient.prototype.onUserPurchaseCanceled = function (callback) {
            this.purchaseCanceledCallbacks.push(callback);
        };
        return TestPurchaseClient;
    }());
    function DefaultPurchaseClient(identifier) {
        var type = Config$1.DefaultPurchaseClientType(CurrentEnvironment());
        switch (type) {
            case PurchaseClientType.Dev:
                return new DevPurchaseClient(identifier);
            case PurchaseClientType.Test:
                return new TestPurchaseClient(identifier);
            case PurchaseClientType.Twitch:
                return new TwitchPurchaseClient(identifier);
            default:
                throw new Error('Could not determine proper transaction type for environment.');
        }
    }

    /**
     * Stores fields related to the current extension user, either a viewer or the broadcaster.
     * These fields are automatically updated by the SDK.
     */
    var User = /** @class */ (function () {
        /**
         * @since 1.0.0
         * @param {Object} auth - An auth token usable by this user for backend requests.
         */
        function User(auth) {
            /**
             * channelID holds the numeric id of the channel the user is currently watching.
             *
             * @since 1.0.0
             * @type {string}
             */
            this.channelID = auth.channelId;
            /**
             * twitchJWT holds the raw JWT response from the Twitch Extension SDK.
             *
             * @since 1.0.0
             * @type {Object}
             */
            this.twitchJWT = auth.token;
            /**
             * twitchOpaqueID is a Twitch generated ID that will uniquely identify this
             * user (if they are logged in), but does not give us access to their Twitch ID.
             *
             * @since 1.0.0
             * @type {string}
             */
            this.twitchOpaqueID = auth.userId;
            /**
             * helixToken is a Twitch generated helix token that allows the current user
             * to preform authorized helix calls.
             *
             * @since 2.5.0
             */
            this.helixToken = auth.helixToken;
            /**
             * twitchID is this viewer's actual Twitch ID. Used to coordinate access to
             * other Twitch services and across the Twitch universe. Only set if the user
             * grants access, null otherwise.
             *
             * @since 1.0.0
             * @type {null|string}
             */
            this.twitchID = null;
            /**
             * registeredWithMuxy will be true if the user has an active muxy account.
             *
             * @since 1.0.0
             * @type {boolean}
             */
            this.registeredWithMuxy = false;
            /**
             * muxyID is this viewer's ID on Muxy. Null if the user has not authenticated with
             * Muxy or is not sharing their Twitch ID with the extension.
             *
             * @since 1.0.0
             * @type {null|string}
             */
            this.muxyID = null;
            /**
             * visualizationID is a unique user string that can be used to identify this user
             * on Muxy's a.muxy.io subdomain. This is used for things like alerts and
             * cheer visualizations, but is not generally useful. Empty string if
             * `registeredWithMuxy` is false.
             *
             * @since 1.0.0
             * @type {string}
             */
            this.visualizationID = '';
            /**
             * role is the current user's role in the extension. May be one of {@link Roles}.
             *
             * @since 1.0.0
             * @type {string}
             */
            this.role = User.Roles.Viewer;
            /**
             * ip is the current user's IP address. May be an empty string if undetectable.
             *
             * @since 1.0.0
             * @type {string}
             */
            this.ip = '';
            /**
             * game is the title of the current channel's game as set by the broadcaster.
             *
             * @since 1.0.0
             * @type {string}
             */
            this.game = '';
            /**
             * User's current video mode. One of {@link VideoModes}.
             *
             * @since 1.0.0
             * @type {string}
             */
            this.videoMode = User.VideoModes.Default;
            /**
             * Current video bitrate. Null if no video or unknown.
             *
             * @since 1.0.0
             * @type {null|number}
             */
            this.bitrate = null;
            /**
             * Current video latency. Null if no video or unknown.
             *
             * @since 1.0.0
             * @type {null|number}
             */
            this.latency = null;
            /**
             * Current buffer size of the viewer's player. Null if no video or unknown.
             *
             * @since 1.0.0
             * @type {null|number}
             */
            this.buffer = null;
            /**
             * Current theme the user has selected on twitch. Null if unknown, otherwise "light" or "dark"
             * @type {null|string}
             */
            this.theme = null;
            /**
             * Current volume level of the Twitch video player. Values between 0 and 1.
             * @type {number}
             */
            this.volume = 0;
            /**
             * User's preferred language code as set on Twitch.
             *
             * @since 2.5.0
             * @type {string}
             */
            this.language = 'en';
            /**
             * User's locale as set on Twitch.
             *
             * @since 2.5.0
             * @type {string}
             */
            this.locale = 'en-US';
            // If the user has authorized an extension to see their Twitch ID, it will be
            // hidden in the JWT payload.
            this.extractJWTInfo(auth.token);
            /**
             * Offset of this user from the server time.
             * @private
             */
            this.timeOffset = 0;
        }
        Object.defineProperty(User, "Roles", {
            /**
             * Defines the current user's role on Twitch relative to the current channel being
             * viewed. May be "viewer" if the user is simply viewing the channel, "moderator"
             * if the user is a moderator of the channel or "broadcaster" if the user is also
             * the broadcaster of the channel.
             *
             * @since 1.0.3
             */
            get: function () {
                return {
                    Broadcaster: 'broadcaster',
                    Moderator: 'moderator',
                    Viewer: 'viewer'
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User, "VideoModes", {
            /**
             * Defines the video mode for the current user. This may be "default" for the default
             * windowed viewing experience on Twitch, "fullscreen" for the fullscreen, video-only
             * mode or "theatre" for the video full window-width.
             *
             * @since 1.0.3
             */
            get: function () {
                return {
                    Default: 'default',
                    Fullscreen: 'fullscreen',
                    Theatre: 'theatre'
                };
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Attempts to parse the provided JWT and persist any found information in store.
         * @since 1.0.0
         *
         * @param {Object} jwt - The auth JWT token as returned from the auth harness.
         */
        User.prototype.extractJWTInfo = function (jwt) {
            try {
                var token = Util.extractJWTInfo(jwt);
                this.role = token.role;
                if (token.user_id) {
                    this.twitchID = token.user_id;
                }
            }
            catch (err) {
                // Silently fail (enforcement of Twitch ID is done externally).
            }
        };
        /**
         * Returns whether or not the current extension user is anonymous.
         * Twitch defines an anonymous user as one who is not logged in to the channel
         * page running this extension, or one who has not opted-in to sharing
         * auth information with this extension.
         * @since 1.0.0
         *
         * @return {boolean} True if the user is not logged in to Twitch or has not granted
         * access to their Twitch ID.
         */
        User.prototype.anonymous = function () {
            return !this.twitchOpaqueID || this.twitchOpaqueID[0] !== 'U';
        };
        /**
         * Stores values from a new auth token in the local store.
         * @since 1.0.0
         *
         * @param {Object} auth - An auth JWT with updated user information.
         */
        User.prototype.updateAuth = function (auth) {
            this.twitchJWT = auth.token;
            this.helixToken = auth.helixToken;
            this.extractJWTInfo(auth.token);
        };
        /**
         * Returns a date object that is based on the Muxy server time.
         *
         * @return {Date}
         */
        User.prototype.getOffsetDate = function () {
            return new Date(new Date().getTime() + this.timeOffset);
        };
        return User;
    }());
    var UserUpdateCallbackHandle = /** @class */ (function (_super) {
        __extends(UserUpdateCallbackHandle, _super);
        function UserUpdateCallbackHandle(cb) {
            var _this = _super.call(this) || this;
            _this.cb = cb;
            return _this;
        }
        UserUpdateCallbackHandle.prototype.notify = function (user) {
            this.cb(user);
        };
        return UserUpdateCallbackHandle;
    }(ObserverHandler));

    /**
     * @module SDK
     */
    /**
     * The Muxy Extensions SDK, used to communicate with Muxy's Extension Backend Service.
     *
     * Instances of this class created through the global `Muxy` object can be used to easily
     * interact with Muxy's Extension Backend Service. It includes functionality to aggregate
     * and persist user data, set extension configuration, send analytics events and authenticate
     * broadcasters across servers and applications.
     *
     * To begin using the SDK, create a new instance by calling `const sdk = Muxy.SDK()`.
     *
     * **Note for Overlay App Developers:**
     * An instance of the Muxy SDK is automatically created for you that is namespaced to your
     * app id. You can access it in any app that imports AppMixin as `this.muxy.<method>`. The
     * methods described below behave similarly to how they would in an extension context, however
     * all data is exclusive to your app. Differences are noted in the comments to the individual
     * methods.
     */
    var SDK = /** @class */ (function () {
        /** @ignore */
        function SDK(id) {
            if (!mxy.setupCalled) {
                throw new Error('Muxy.setup() must be called before creating a new SDK instance');
            }
            var identifier = id || mxy.twitchClientID;
            if (!identifier) {
                return null;
            }
            if (!mxy.watchingAuth) {
                mxy.watchingAuth = true;
                mxy.watchAuth(identifier);
            }
            if (!mxy.SDKClients[identifier]) {
                this.setup(identifier, mxy.client, mxy.user, mxy.messenger, mxy.purchaseClient, mxy.analytics, mxy.loadPromise, mxy.SKUs, mxy.debugOptions);
                mxy.SDKClients[identifier] = this;
            }
            return mxy.SDKClients[identifier];
        }
        /**
         * Returns a Promise that will resolve once this SDK instance is ready for use.
         * Will reject if an error occurs communicating with the backend server.
         * @since 1.0.0
         *
         * @return {Promise}
         *
         * @example
         * const sdk = new Muxy.SDK();
         * sdk.loaded().then(() => {
         *   sdk.send('Hello World');
         * }).catch((err) => {
         *   console.error(err);
         * });
         */
        SDK.prototype.loaded = function () {
            return this.loadPromise;
        };
        /**
         * Starts the debug helix token flow. This will throw if
         * .debug() has not been called.
         *
         * @since 2.4.16
         *
         * @example
         * const client = new Muxy.TwitchClient();
         *
         * // When testing the extension, outside of twitch, the following
         * // request will not work, since no helixToken is returned from the
         * // testing auth system.
         * client.signedTwitchHelixRequest(..., sdk.user.helixToken);
         *
         * // Opens a new window to go through the helix token flow.
         * sdk.beginDebugHelixTokenFlow()
         *
         * // After going through the helix flow, then signedTwitchHelixRequest
         * // call will work
         * client.signedTwitchHelixRequest(..., sdk.user.helixToken);
         */
        SDK.prototype.beginDebugHelixTokenFlow = function () {
            mxy.beginDebugHelixTokenFlow();
        };
        /**
         * Updates the internally stored user object with the provided value.
         * Also calls any stored user update callbacks with the new user object.
         * @since 1.5
         *
         * @example
         * const sdk = new Muxy.SDK();
         * sdk.loaded().then(() => {
         *   sdk.updateUser({<user object>});
         * });
         */
        SDK.prototype.updateUser = function (user) {
            this.user = user;
            this.userObservers.notify(user);
        };
        /**
         * Registers a new callback for when the current user's info is updated.
         */
        SDK.prototype.onUserUpdate = function (callback) {
            var handler = new UserUpdateCallbackHandle(callback);
            this.userObservers.register(handler);
            return handler;
        };
        /**
         * Registers a new callback for when the context is updated.
         */
        SDK.prototype.onContextUpdate = function (callback) {
            var handler = new ContextUpdateCallbackHandle(callback);
            this.contextObservers.register(handler);
            return handler;
        };
        /**
         * Registers a new callback for when the highlight is updated.
         */
        SDK.prototype.onHighlightChanged = function (callback) {
            var handler = new HighlightChangedCallbackHandle(callback);
            this.highlightObservers.register(handler);
            return handler;
        };
        /**
         * Returns a date object that is based on the Muxy server time.
         * This method only returns valid results after .loaded() resolves.
         *
         * @return {Date}
         */
        SDK.prototype.getOffsetDate = function () {
            return new Date(new Date().getTime() + this.timeOffset);
        };
        /**
         * Returns a promise to get the user object. This automatically
         * waits for .loaded() to resolve.
         */
        SDK.prototype.getUser = function () {
            var _this = this;
            return this.loaded().then(function () {
                return Promise.resolve(_this.user);
            });
        };
        /**
         * Invokes a request to the backend.
         */
        SDK.prototype.signedRequest = function (method, endpoint, data) {
            return this.client.signedRequest(this.identifier, method, endpoint, data);
        };
        /**
         * Data Accumulation
         */
        /**
         * Fetches the accumulated user data for a given id received by the backend since start.
         *
         * Broadcaster-only functionality.
         *
         * @async
         * @since 1.0.0
         *
         * @throws {TypeError} Will throw an error if accumulationID is not a string.
         *
         * @param {string} accumulationID - The identifier of the accumulated data to fetch.
         * @param {number} start - A Unix timestamp in milliseconds of the earliest accumulation
         * record to fetch.
         *
         * @return {Promise<AccumulateData>} Resolves with requested accumulation data on
         * server response.
         *
         * @example
         * const oneMinuteAgo = (new Date().getTime()) - (1000 * 60);
         * sdk.getAccumulation('awesomeness_level', oneMinuteAgo).then((resp) => {
         *   console.log(`${resp.data.length}: ${resp.latest}`);
         *   console.log(resp.data); // A list of all accumulate values since oneMinuteAgo.
         * });
         */
        SDK.prototype.getAccumulateData = function (accumulationID, start) {
            forceType(accumulationID, 'string');
            return this.client.getAccumulation(this.identifier, accumulationID, start);
        };
        /**
         * @deprecated Use getAccumulateData instead.
         */
        SDK.prototype.getAccumulation = function (accumulationID, start) {
            return this.getAccumulateData(accumulationID, start);
        };
        /**
         * Sends data to be accumulated by the server.
         * @since 1.0.0
         *
         * @param {string} accumulationID - The identifier that this datum is accumulated with.
         * @param {DataType} data - Any JSON serializable JavaScript object.
         *
         * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
         *
         * @example
         * sdk.accumulate('awesomeness_level', {
         *   awesomeness_level: {
         *     great: 10,
         *     good: 2.5,
         *     poor: 'dank'
         *   }
         * });
         */
        SDK.prototype.accumulate = function (accumulationID, data) {
            forceType(accumulationID, 'string');
            return this.client.accumulate(this.identifier, accumulationID, data);
        };
        /**
         * User Voting
         */
        /**
         * Fetches the current stored vote data for a given vote identifier.
         * @async
         * @since 1.0.0
         *
         * @throws {TypeError} Will throw an error if voteID is not a string.
         *
         * @param {string} voteID - The identifer to fetch associated vote data.
         *
         * @return {Promise<VoteData>} Resolves with requested vote data on server response. Rejects on
         * server error.
         *
         * @example
         * sdk.getVoteData('poll-number-1').then((voteData) => {
         *   console.log(voteData.sum);
         * });
         */
        SDK.prototype.getVoteData = function (voteID) {
            forceType(voteID, 'string');
            return this.client.getVotes(this.identifier, voteID);
        };
        /**
         * Gets the vote logs for a given vote ID. This endpoint may only be called by
         * an admin.
         *
         * @async
         * @param voteID - the identifier to fetch the vote logs for.
         * @return {Promise<VoteLog>} Resolves with the logs on server response. Rejects on server error.
         *
         * @example
         * const sdk = new Muxy.SDK();
         * sdk.getFullVoteLogs('global-12345').then((logs) => {
         *   const audit = logs.result;
         *
         *   // ... process the audit logs ...
         *   const valueToUsersMapping = {};
         *   for (const i = 0; i < audit.length; ++i) {
         *     const value = audit[i].value;
         *     const identifier = audit[i].identifier;
         *
         *     const list = valueToUsersMapping[value] || [];
         *     list.append(identifier);
         *
         *     valueToUsersMapping[value] = list;
         *   }
         * });
         */
        SDK.prototype.getFullVoteLogs = function (voteID) {
            forceType(voteID, 'string');
            return this.client.getFullVoteLogs(this.identifier, voteID);
        };
        /**
         * Submit a user vote associated with a vote identifier.
         * @async
         * @since 1.0.0
         *
         * @throws {TypeError} Will throw an error if `voteID` is not a string or if `value` is not
         * a Number.
         *
         * @param {string} voteID - The identifer to fetch associated vote data.
         * @param {number} value - Any numeric value to represent this user's vote. Note that only
         * values of 0-5 will be included in the `specific` field returned from `getVoteData`.
         * @param {number} count - The "multiplier" of this vote. Must be <= 30.
         *
         * @return {Promise} Will resolve on successful server-send. Rejects on failure.
         *
         * @example
         * sdk.vote('poll-number-1', 1);
         */
        SDK.prototype.vote = function (voteID, value, count) {
            if (count === void 0) { count = 1; }
            return this.client.vote(this.identifier, voteID, { value: value, count: count });
        };
        /**
         * User Ranking
         */
        /**
         * Fetches the current ranked data associated with the rank identifier.
         * @async
         * @since 1.0.0
         *
         * @throws {TypeError} Will throw an error if rankID is not a string.
         *
         * @param {string} rankID - The identifier to fetch associated rank data.
         *
         * @return {Promise<RankData>} Resolves with requested rank data on server response. Rejects
         * on server error.
         *
         * @example
         * sdk.getRankData('favorite_color').then((colors) => {
         *   if (colors.length > 0) {
         *     colors.forEach((color) => {
         *       console.log(`${color.key}: ${color.score}`);
         *     });
         *   }
         * });
         */
        SDK.prototype.getRankData = function (rankID) {
            var _this = this;
            forceType(rankID, 'string');
            return new Promise(function (accept, reject) {
                _this.client
                    .getRank(_this.identifier, rankID)
                    .then(function (data) {
                    accept(data);
                })
                    .catch(reject);
            });
        };
        /**
         * Submit user rank data associated with a rank identifier.
         * @async
         * @since 1.0.0
         *
         * @throws {TypeError} Will throw an error if rankID or value are not strings.
         *
         * @param {string} rankID - The identifer to fetch associated rank data.
         * @param {string} value - Any string value to represent this user's rank data. Will be returned
         * as the `key` field when rank data is requested.
         *
         * @return {Promise<RankResponse>} Will resolve on success. Rejects on failure.
         *
         * @example
         * const usersFavoriteColor = 'rebeccapurple';
         * this.muxy.rank('favorite_color', usersFavoriteColor);
         */
        SDK.prototype.rank = function (rankID, value) {
            forceType(rankID, 'string');
            forceType(value, 'string');
            return this.client.rank(this.identifier, rankID, { key: value });
        };
        /**
         * Clear all rank data associated with the rank identifier.
         *
         * Broadcaster-only functionality.
         *
         * @async
         * @since 1.0.0
         *
         * @throws {TypeError} Will throw an error if rankID is not a string.
         *
         * @param {string} rankID - The identifer to fetch associated rank data.
         *
         * @return {Promise<ResponseType>} Will resolve on success. Rejects on failure.
         */
        SDK.prototype.clearRankData = function (rankID) {
            forceType(rankID, 'string');
            return this.client.deleteRank(this.identifier, rankID);
        };
        /**
         * @deprecated Deprecated in 1.0.0. Use getRankData instead.
         */
        SDK.prototype.getRankingData = function (rankID) {
            return this.getRankData(rankID);
        };
        /**
         * @deprecated Deprecated in 1.0.0. Use clearRankData instead.
         */
        SDK.prototype.clearRanking = function (rankID) {
            return this.clearRanking(rankID);
        };
        /**
         * Server Config
         */
        /**
         * Sets the server channel config to a JS object. Future calls to {@link getConfig} or {@link getChannelConfig} by **any**
         * user on this channel will have a clone of this object in the `channel` field.
         *
         * Broadcaster-only functionality.
         *
         * @async
         * @since 1.0.0
         *
         * @param {DataType} config - A complete JS object representing the current server config.
         *
         * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
         *
         * @example
         * sdk.setChannelConfig({
         *   kappa_outdated: true,
         *   kreygasm_overrated: true,
         *   waited_duration: "long",
         *   jebait_timing: "now"
         * }).then(() => {
         *   // Let viewers know that new channel config is available.
         * }).catch((err) => {
         *   console.error(`Failed saving channel config: ${err}`);
         * });
         */
        SDK.prototype.setChannelConfig = function (config) {
            return this.client.setChannelConfig(this.identifier, config);
        };
        /**
         * Sets the server extension config to a JS object. Future calls to {@link getConfig} or {@link getExtensionConfig} by **any**
         * user on this channel will have a clone of this object in the `extension` field.
         *
         * Broadcaster-only functionality.
         *
         * @async
         * @since 1.0.0
         *
         * @param {DataType} config - A complete JS object representing the current server config.
         *
         * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
         *
         * @example
         * sdk.setExtensionConfig({
         *   kappa_outdated: true,
         *   kreygasm_overrated: true,
         *   waited_duration: "long",
         *   jebait_timing: "now"
         * }).then(() => {
         *   // Let viewers know that new extension config is available.
         * }).catch((err) => {
         *   console.error(`Failed saving extension config: ${err}`);
         * });
         */
        SDK.prototype.setExtensionConfig = function (config) {
            return this.client.setExtensionConfig(this.identifier, config);
        };
        /**
         * Returns the current channel and extension config objects
         * @async
         *
         * @return {Promise<ResponseType>} Resolves on successful server request with an object populated with channel and extension config objects.
         */
        SDK.prototype.getConfig = function () {
            return this.client.getConfig(this.identifier);
        };
        /**
         * Returns the current channel config object
         * @async
         *
         * @return {Promise<ResponseType>} Resolves on successful server request with a populated channel config object.
         */
        SDK.prototype.getChannelConfig = function () {
            return this.client.getChannelConfig(this.identifier);
        };
        /**
         * Returns the current extension config object
         * @async
         *
         * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension config object.
         */
        SDK.prototype.getExtensionConfig = function () {
            return this.client.getExtensionConfig(this.identifier);
        };
        /**
         * User State
         */
        /**
         * Sets the channel specific viewer-specific state to a JS object, this can be called by
         * any viewer.
         * Future calls to {@link getAllState} by **this** user will have a clone of this object in the
         * `viewer` field.
         * @async
         * @since 1.0.0
         *
         * @param {DataType} state - A complete JS object representing the current viewer state.
         *
         * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
         *
         * @example
         * sdk.setViewerState({
         *   favorite_movie: 'Jaws: The Revenge'
         * }).then(() => {
         *   console.log('Viewer state saved!');
         * }).catch((err) => {
         *   console.error(`Failed saving viewer state: ${err}`);
         * });
         */
        SDK.prototype.setViewerState = function (state) {
            return this.client.setViewerState(this.identifier, state);
        };
        /**
         * Sets the extension wide viewer-specific state to a JS object, this is only a valid call for a
         * user that has shared their identity.
         * Future calls to {@link getAllState} by **this** user will have a clone of this object in the
         * `extension_viewer` field.
         * @async
         * @since 1.1.0
         *
         * @param {DataType} state - A complete JS object representing the current viewer state.
         *
         * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
         *
         * @example
         * sdk.setExtensionViewerState({
         *   favorite_movie: 'Jaws: The Revenge'
         * }).then(() => {
         *   console.log('Viewer state saved!');
         * }).catch((err) => {
         *   console.error(`Failed saving viewer state: ${err}`);
         * });
         */
        SDK.prototype.setExtensionViewerState = function (state) {
            return this.client.setExtensionViewerState(this.identifier, state);
        };
        /**
         * Applies a set of patches to multiple extension-wide viewer-specific states.
         * This method requires a mapping of user_id to objects. The provided state
         * objects per user are merged server-side. A key may be specified to be 'null'
         * to delete the key on the server. Arrays are overwritten in their entirety on merge.
         * Objects are merged recursively.
         *
         * This method can only set state for viewers who have shared their ID.
         *
         * This method requires an admin context.
         * @async
         * @param userStates - a mapping of userID to patch objects.
         *
         * @return {Promise} Will resolve on successful setting of state. Rejects on failure.
         *
         * @example
         * sdk.patchExtensionViewerState({
         *  '12452': { 'hello': 'world' },
         *  '12422': { 'foo': 'bar' }
         * });
         */
        SDK.prototype.patchExtensionViewerState = function (userStates) {
            return this.client.patchExtensionViewerState(this.identifier, userStates);
        };
        /**
         * Sets the extension wide state to a JS object, this may only be called in a broadcaster context
         * for the extension owner. Extension owner may be configured through the development portal.
         * Future calls to {@link getAllState} by all users will have a clone of this object in the
         * `extension` field.
         * @async
         * @since 1.1.0
         *
         * @param {DataType} state - A complete JS object representing the current extension's state.
         *
         * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
         *
         * @example
         * sdk.setExtensionState({
         *   favorite_movie: 'Jaws: The Revenge'
         * }).then(() => {
         *   console.log('Extension state saved!');
         * }).catch((err) => {
         *   console.error(`Failed saving viewer state: ${err}`);
         * });
         */
        SDK.prototype.setExtensionState = function (state) {
            return this.client.setExtensionState(this.identifier, state);
        };
        /**
         * Sets the extension-wide secret state to a JS object, this may only be called by an extension
         * owner. This state object will never be returned to the broadcaster or viewers.
         * @async
         * @since 2.0.0
         *
         * @param {DataType} state - A complete JS object
         *
         * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
         *
         * @example
         * sdk.setExtensionSecretState({
         *   favorite_movie: 'Twilight: New Moon'
         * }).then(() => {
         *   console.log('Extension secrets saved!');
         * }).catch((err) => {
         *   console.error(`Failed saving secret state: ${err}`);
         * });
         */
        SDK.prototype.setExtensionSecretState = function (state) {
            return this.client.setExtensionSecretState(this.identifier, state);
        };
        /**
         * Sets the channel-specific state to a JS object. Future calls to {@link getAllState} by **any**
         * user on this channel will have a clone of this object in the `channel` field.
         *
         * Broadcaster-only functionality.
         *
         * @async
         * @since 1.0.0
         *
         * @param {DataType} state - A complete JS object representing the current channel state.
         *
         * @return {Promise<ResponseType>} Will resolve on successful server-send. Rejects on failure.
         *
         * @example
         * sdk.setChannelState({
         *   broadcasters_mood: 'sanguine, my brother',
         *   chats_mood: 'kreygasm'
         * }).then(() => {
         *   // Let viewers know that new channel state is available.
         * }).catch((err) => {
         *   console.error(`Failed saving channel state: ${err}`);
         * });
         */
        SDK.prototype.setChannelState = function (state) {
            return this.client.setChannelState(this.identifier, state);
        };
        /**
         * Returns the current state object as set for the current extension, channel and
         * viewer combination.
         * @async
         * @since 1.0.0
         *
         * @return {Promise<AllState>} Resolves on successful server request with a populated AllState
         * object.
         *
         * @example
         * sdk.getAllState().then((state) => {
         *   if (state.channel.broadcasters_mood) {
         *     console.log(`Broadcaster set their mood as: ${state.channel.broadcasters_mood}`);
         *   }
         *   if (state.viewer.favorite_movie) {
         *     console.log(`But your favorite movie is: ${state.viewer.favorite_movie}`);
         *   }
         * });
         */
        SDK.prototype.getAllState = function () {
            return this.client.getState(this.identifier);
        };
        /**
         * Returns the current extension state object
         * @async
         *
         * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension state object.
         */
        SDK.prototype.getExtensionState = function () {
            return this.client.getExtensionState(this.identifier);
        };
        /**
         * Returns the current channel state object
         * @async
         *
         * @return {Promise<ResponseType>} Resolves on successful server request with a populated channel state object.
         */
        SDK.prototype.getChannelState = function () {
            return this.client.getChannelState(this.identifier);
        };
        /**
         * Returns the current extension viewer state object
         * @async
         *
         * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension viewer state object.
         */
        SDK.prototype.getExtensionViewerState = function () {
            return this.client.getExtensionViewerState(this.identifier);
        };
        /**
         * Returns the current viewer state object
         * @async
         *
         * @return {Promise<ResponseType>} Resolves on successful server request with a populated viewer state object.
         */
        SDK.prototype.getViewerState = function () {
            return this.client.getViewerState(this.identifier);
        };
        /**
         * Returns the current extension secret state if the requesting user has access to the secret state.
         * @async
         *
         * @return {Promise<ResponseType>} Resolves on successful server request with a populated extension secret state object.
         */
        SDK.prototype.getExtensionSecretState = function () {
            return this.client.getExtensionSecretState(this.identifier);
        };
        /**
         * Returns a mapping of user_id to extension specific viewer states.
         * If a viewer doesn't have state set, but was requested, that user will
         * not be in the response object. The maximum number of users that can be
         * queried with this call is 1000.
         * @async
         *
         * @param users - an array of userIDs to request state for.
         *
         * @return {Promise<ResponseType>} Resolves on successful server request with an object that is a mapping
         *  of userID to state. Rejects on failure.
         *
         * @example
         * sdk.patchExtensionViewerState({
         *  'valid-user-id': {
         *    'hello': 'world'
         *  }
         * }).then(() => {
         *  sdk.multiGetExtensionViewerState(['valid-user-id', 'invalid-user-id']).then(state => {
         *    console.log(state['valid-user-id'].hello) // prints 'world'
         *    console.log(state['invalid-user-id']) // is undefined.
         *  });
         * }
         */
        SDK.prototype.multiGetExtensionViewerState = function (users) {
            if (users.length > 1000) {
                throw new Error('Too many users specified in call to multiGetExtensionViewerState');
            }
            return this.client.multiGetExtensionViewerState(this.identifier, users);
        };
        /**
         * JSON Store
         */
        /**
         * The JSON store is used similarly to the channel state, in that a broadcaster can use it to
         * store arbitrary JSON data that is accessible to all viewers. The stored data is specific to
         * a particular channel and cannot be accessed by viewers of a different channel.
         *
         * Unlike channel state however, each channel can have several JSON stores, accessed by different
         * keys. The data associated with each key must be under 2KB, but there is no limit to the number
         * of keys in use.
         *
         * Also, when pushing new data to the JSON store, a messenger event is automatically sent to all
         * active viewers of the associated channel and the broadcaster's live and config pages. This
         * event will have the format `json_store_update:${key}`. See {@link listen} for details on
         * receiving this event.
         *
         * @async
         * @since 1.0.0
         *
         * @throws {TypeError} Will throw an error if key is provided but is not a string.
         *
         * @param {string?} key - The lookup key for data in the JSON store. Uses 'default' if no value
         * is provided.
         *
         * @return {Promise<ResponseType>} Resolves with the stored JSON parsed to a JS Object associated with
         * the key. Rejects on server error or if the key has no associated data.
         *
         * @example
         * sdk.getJSONStore('basecamp').then((basecamp) => {
         *   if (basecamp && basecamp.tanks) {
         *     deploy(basecamp.tanks);
         *   }
         * });
         */
        SDK.prototype.getJSONStore = function (key) {
            if (key) {
                forceType(key, 'string');
            }
            return this.client.getJSONStore(this.identifier, key);
        };
        /**
         * Two-Factor Auth
         */
        /**
         * Attempts to validate a broadcaster's PIN with Muxy's Two-Factor auth system. For this to work,
         * the broadcaster must have initiated a Two-Factor request for this channel within the auth
         * window.
         *
         * Broadcaster-only functionality.
         *
         * @async
         * @since 1.0.0
         *
         * @throws {TypeError} Will throw an error if `pin` is not a string.
         *
         * @param {string} pin - The broadcaster's PIN to validate the associated auth token.
         *
         * @return {Promise} Resolves if the auth token associated with this PIN can now be used to make
         * requests on behalf of this broadcaster, rejects with an error otherwise.
         *
         * @example
         * sdk.validateCode('MUXY').then(() => {
         *   console.log('Validated! Go go go!');
         * });
         */
        SDK.prototype.validateCode = function (pin) {
            forceType(pin, 'string');
            return this.client.validateCode(this.identifier, pin);
        };
        /**
         * Checks to see if the broadcaster has validated an auth token in the current context. It does
         * not return information about the PIN used or auth token that is valid.
         *
         * Broadcaster-only functionality.
         *
         * @async
         * @since 1.0.0
         *
         * @return {Promise<ResponseType>}
         * @property {boolean} exists - True if an auth token has been validated, false otherwise.
         *
         * @example
         * sdk.pinTokenExists().then((resp) => {
         *   if (!resp.exists) {
         *     showBroadcasterPINInput();
         *   } else {
         *     console.log('Already authorized');
         *   }
         * });
         */
        SDK.prototype.pinTokenExists = function () {
            return this.client.pinTokenExists(this.identifier);
        };
        /**
         * Revokes all auth tokens ever generated for this channel and identifier. After calling this
         * method, tokens currently in use by external apps will cease to function.
         *
         * Broadcaster-only functionality.
         *
         * @async
         * @since 1.0.0
         *
         * @return {Promise} Resolves on success, rejects with an error otherwise.
         *
         * @example
         * sdk.revokeAllPINCodes().then(() => {
         *   console.log('No more data coming in!');
         * });
         */
        SDK.prototype.revokeAllPINCodes = function () {
            return this.client.revokeAllPINCodes(this.identifier);
        };
        /**
         * Event System
         */
        /**
         * Sends a message to all listening clients. And viewers or broadcasters listening for the
         * event name will be automatically notified. See {@link listen} for receiving events.
         *
         * Broadcaster-only functionality.
         *
         * @async
         * @since 1.0.0
         *
         * @param {string} event - An event name, in the form [a-z0-9_]+
         * @param {string|*} userID - An optional opaque user id, used to limit the
         * scope of send to that user only.
         * @param {*} [data] - Any JSON serializable primitive to send to all viewers.
         *
         * @example
         * sdk.send('new_song', {
         *   artist: 'Celine Dion',
         *   title: 'My Heart Will Go On',
         *   album: 'Let\'s Talk About Love',
         *   year: 1997
         * });
         */
        SDK.prototype.send = function (event, userID, data) {
            if (!mxy.didLoad) {
                throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
            }
            forceType(event, 'string');
            var target = 'broadcast';
            var realData = data;
            if (!data) {
                realData = userID;
            }
            else {
                target = "whisper-".concat(userID);
            }
            this.messenger.send(this.identifier, event, target, realData, this.client);
        };
        /**
         * Registers a callback to listen for events. In general, events are named in the form
         * `event[:identifier]`, where the identifier is the `event` parameter to {@link send}.
         *
         * You can listen to wildcards by using * instead of an event or identifier name.
         *
         * Some methods also automatically send special namespaced events. See {@link vote} and
         * {@link getJSONStore} for examples.
         *
         * You can listen for these events by using `vote_update:next_game` or `vote_update:*`
         * to receive vote updates for specifically the `next_game` vote id, or all vote
         * updates respectively.
         *
         * @since 1.0.0
         *
         * @param {string} inEvent - The event name to listen on. May include wildcards `*`.
         * @param {string|Function} inUserID - An optional opaque user id, used to limit
         * the scope of this listen to that user only.
         * @param {Function} [inCallback] - A callback with the signature `function(body, eventName)`.
         * This callback will receive the message body as its first parameter and the `event` parameter
         * to {@link send} as the second.
         *
         * @return {CallbackHandle} A listener handle that can be passed to {@see unlisten} to unbind
         * this callback.
         *
         * @example
         * sdk.listen('new_song', (track) => {
         *   console.log(`${track.artist} - {track.title} (${track.year})`);
         * });
         */
        SDK.prototype.listen = function (inEvent, inUserID, inCallback) {
            var _this = this;
            if (!mxy.didLoad) {
                throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
            }
            var realEvent = "".concat(CurrentEnvironment().environment, ":").concat(this.identifier, ":").concat(inEvent);
            var l = 'broadcast';
            var callback = inCallback;
            if (callback) {
                l = "whisper-".concat(inUserID);
            }
            else if (inUserID instanceof Function) {
                callback = inUserID;
            }
            var messageBuffer = [];
            var cb = function (msg) {
                try {
                    // Production messages may be unprefixed.
                    if (CurrentEnvironment().environment === 'production') {
                        if (eventPatternMatch(msg.event, "".concat(_this.identifier, ":").concat(inEvent))) {
                            var truncatedEvent = msg.event.split(':').slice(1).join(':');
                            callback(msg.data, truncatedEvent);
                            return;
                        }
                    }
                    if (eventPatternMatch(msg.event, realEvent)) {
                        // Consumers of the SDK only ever interact with events
                        // without the app-id or extension-id prefix.
                        var truncatedEvent = msg.event.split(':').slice(2).join(':');
                        var serialized_1 = JSON.stringify(msg);
                        var now_1 = new Date().valueOf();
                        var deduped_1 = false;
                        messageBuffer.forEach(function (b) {
                            if (b.content === serialized_1) {
                                if (now_1 - b.timestamp < 5 * 1000) {
                                    deduped_1 = true;
                                }
                            }
                        });
                        if (deduped_1) {
                            return;
                        }
                        messageBuffer.unshift({
                            content: serialized_1,
                            timestamp: now_1
                        });
                        messageBuffer = messageBuffer.slice(0, 10);
                        callback(msg.data, truncatedEvent);
                    }
                }
                catch (err) {
                    // TODO: Should this fail silently?
                    consolePrint(err, { type: 'error' });
                }
            };
            return this.messenger.listen(this.identifier, l, cb);
        };
        /**
         * Unbinds a callback from the event system.
         *
         * @since 1.0.0
         *
         * @param {CallbackHandle} handle - An event handle as returned from {@see listen}.
         */
        SDK.prototype.unlisten = function (handle) {
            return this.messenger.unlisten(this.identifier, handle);
        };
        /**
         * Transaction System
         */
        /**
         * Calls for a list of products containing a sku, displayName, and cost.
         *
         * @async
         * @since 2.4.0
         *
         * @throws {SDKError} Will throw an error if the MuxySDK didn't load.
         *
         * @return {Promise<[]Product>} Resolves with an array of {@link Product}
         * objects for each available sku.
         *
         * @example
         * const products = await client.getProducts();
         */
        SDK.prototype.getProducts = function () {
            if (!mxy.didLoad) {
                throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
            }
            return this.purchaseClient.getProducts();
        };
        /**
         * Starts transaction for a specific product identifier.
         *
         * @async
         * @since 2.4.0
         *
         * @throws {SDKError} Will throw an error if the MuxySDK didn't load.
         *
         * @param {string} sku - A product identifier.
         *
         * @example
         * sdk.purchase("XXSKU000");
         */
        SDK.prototype.purchase = function (sku) {
            if (!mxy.didLoad) {
                throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
            }
            forceType(sku, 'string');
            this.purchaseClient.purchase(sku);
        };
        /**
         * Sets the callback to be run after a user purchase.
         *
         * @since 2.4.0
         *
         * @throws {SDKError} Will throw an error if the MuxySDK didn't load.
         *
         * @param {function} callback - a function to be run after a purchase transaction.
         *
         * @example
         * sdk.onUserPurchase((transaction) => {
         *   this.message = "Thanks for your purchase!";
         * });
         */
        SDK.prototype.onUserPurchase = function (callback) {
            if (!mxy.didLoad) {
                throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
            }
            forceType(callback, 'function');
            this.purchaseClient.onUserPurchase(callback);
        };
        /**
         * Sets the callback to be run after a user cancels a purchase.
         *
         * @since 2.4.5
         *
         * @throws {SDKError} Will throw an error if MEDKit isn't loaded.
         *
         * @param {function} callback - a function to be run after a failed transaction.
         *
         * @example
         * sdk.onUserPurchaseCanceled(() => {
         *   this.message = "Changed your mind?";
         * });
         */
        SDK.prototype.onUserPurchaseCanceled = function (callback) {
            if (!mxy.didLoad) {
                throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
            }
            forceType(callback, 'function');
            this.purchaseClient.onUserPurchaseCanceled(callback);
        };
        /**
         * Analytics
         */
        /**
         * Sends an arbitrary event to the analytics backend.
         *
         * @async
         * @since 1.0.0
         *
         * @param {string} name - A unique identifier for this event.
         * @param {number} [value=1] - A value to associate with this event.
         * @param {string} [label=''] - A human-readable label for this event.
         */
        SDK.prototype.sendAnalyticsEvent = function (name, value, label) {
            if (value === void 0) { value = 1; }
            if (label === void 0) { label = ''; }
            this.analytics.sendEvent(this.identifier, name, value, label);
        };
        /**
         * Monetization
         */
        /**
         * Begins the purchase flow for a given product's SKU.
         *
         * @param {string} sku - The SKU of the digital good that the user has indicated they want to buy.
         */
        SDK.prototype.beginPurchase = function (sku) {
            if (this.SKUs.length === 0) {
                throw new Error('beginPurchase() cannot be used unless SKUs are provided.');
            }
            forceType(sku, 'string');
            return Ext.beginPurchase(sku);
        };
        /**
         * Gets the current price for each item offered.
         *
         * @async
         *
         * @return {Object} An object with the SKU codes as keys.
         */
        SDK.prototype.getPrices = function () {
            if (this.SKUs.length === 0) {
                throw new Error('getPrices() cannot be used unless SKUs are provided.');
            }
            return new Promise(function (resolve) {
                Ext.getPrices(function (prices) {
                    resolve(prices);
                });
            });
        };
        /**
         * Sets a function to be used as a callback when entitlements need to be reloaded, i.e. after a
         * purchase has been made.
         *
         * @param {Function} callback - A function to be called to update user entitlements.
         */
        SDK.prototype.onReloadEntitlements = function (callback) {
            if (this.SKUs.length === 0) {
                throw new Error('onReloadEntitlements() cannot be used unless SKUs are provided.');
            }
            return Ext.onReloadEntitlements(callback);
        };
        /**
         * Sets a function to be used as a callback that is triggered when the extension visibility changes
         * (This occurs only for mobile or component extensions.)
         *
         * @param {function} callback
         */
        SDK.prototype.onVisibilityChanged = function (callback) {
            return Ext.onVisibilityChanged(callback);
        };
        /**
         * Sets a function to be used as a callback that is triggered when the extension changes position in the player
         * This occurs only for video-component extensions.
         *
         * @param {function} callback
         */
        SDK.prototype.onPositionChanged = function (callback) {
            return Ext.onPositionChanged(callback);
        };
        /**
         * Attempt to exchange one eligibility status for a single prize code.
         * If a code is redeemed, the returned body will have a `code` member, which is the code that was redeemed.
         * @async
         *
         * @throws {TypeError} Will throw an error if prizeIndex is not a valid number
         *
         * @param {number} prize_idx - The prize index
         *
         * @return {Promise<RedeemResult>}
         */
        SDK.prototype.redeemCode = function (prizeIndex) {
            forceType(prizeIndex, 'number');
            return this.client.redeemCode(this.identifier, prizeIndex);
        };
        /**
         * Fetches all codes that the user has redeemed for this extension.
         * @async
         *
         * @return {Promise<RedeemedCodes>} Will resolve on success. Rejects on failure.
         */
        SDK.prototype.getRedeemedCodes = function () {
            return this.client.getRedeemedCodes(this.identifier);
        };
        /**
         * Fetches information about which codes a user is eligible for
         * @async
         *
         * @return {Promise<EligibleCodes>} Will resolve on success. Rejects on failure.
         */
        SDK.prototype.getEligibleCodes = function () {
            return this.client.getEligibleCodes(this.identifier);
        };
        /**
         * Sets the user's trivia team to the current channel.
         * @async
         *
         * @return {Promise<any>}
         */
        SDK.prototype.joinExtensionTriviaTeam = function () {
            return this.client.joinExtensionTriviaTeam(this.identifier);
        };
        /**
         * Return the user's stored trivia team.
         * @async
         *
         * @return {Promise<TriviaTeam>}
         */
        SDK.prototype.getExtensionTriviaJoinedTeam = function () {
            return this.client.getExtensionTriviaJoinedTeam(this.identifier);
        };
        /**
         * Add a trivia question to the extension.
         * Requires extension admin permissions.
         * @async
         *
         * @return {Promise<Record<string, unknown>>}
         */
        SDK.prototype.addExtensionTriviaQuestion = function (question) {
            return this.client.addExtensionTriviaQuestion(this.identifier, question);
        };
        /**
         * Removes a trivia question from the extension.
         * Requires extension admin permissions.
         * @async
         *
         * @return {Promise<Record<string, unknown>>}
         */
        SDK.prototype.removeExtensionTriviaQuestion = function (triviaQuestionID) {
            return this.client.removeExtensionTriviaQuestion(this.identifier, triviaQuestionID);
        };
        /**
         * Add an option to a trivia question.
         * Requires extension admin permissions.
         * @async
         *
         * @return {Promise<any>}
         */
        SDK.prototype.addExtensionTriviaOptionToQuestion = function (questionID, option) {
            return this.client.addExtensionTriviaOptionToQuestion(this.identifier, questionID, option);
        };
        /**
         * Remove an option from a trivia question.
         * Requires extension admin permissions.
         * @async
         *
         * @return {Promise<TriviaQuestion>}
         */
        SDK.prototype.removeExtensionTriviaOptionFromQuestion = function (questionID, optionID) {
            return this.client.removeExtensionTriviaOptionFromQuestion(this.identifier, questionID, optionID);
        };
        /**
         * Change the state of a extension trivia question.
         * Requires extension admin permissions.
         * @async
         *
         * @return {Promise<any>}
         */
        SDK.prototype.setExtensionTriviaQuestionState = function (questionID, state, winner) {
            return this.client.setExtensionTriviaQuestionState(this.identifier, questionID, state, winner);
        };
        /**
         * As a user place a vote on a trivia question
         * @async
         *
         * @return {Promise<Record<string, unknown>>}
         */
        SDK.prototype.setExtensionTriviaQuestionVote = function (questionID, optionID) {
            return this.client.setExtensionTriviaQuestionVote(this.identifier, questionID, optionID);
        };
        /**
         * Returns all of the current trivia questions
         * @async
         *
         * @return {Promise<TriviaQuestionResponse>}
         */
        SDK.prototype.getExtensionTriviaQuestions = function () {
            return this.client.getExtensionTriviaQuestions(this.identifier);
        };
        /**
         * Get information about a specific trivia question
         * @async
         *
         * @return {Promise<TriviaQuestion>}
         */
        SDK.prototype.getExtensionTriviaQuestion = function (questionID) {
            return this.client.getExtensionTriviaQuestion(this.identifier, questionID);
        };
        /**
         * Return the trivia leaderboard
         * @async
         *
         * @return {Promise<TriviaLeaderboardTeam[]>}
         */
        SDK.prototype.getExtensionTriviaLeaderboard = function () {
            return this.client.getExtensionTriviaLeaderboard(this.identifier);
        };
        /**
         * Admin-level functionality
         */
        /**
         * Fetches a list of all users who have shared their identity with the extension.
         *
         * This function takes an optional `next` value which should match that returned from previous
         * invocations to iterate through the response. If the returned `next` value is `0`, all
         * available values have been returned and iteration can be stopped.
         *
         * At most 1000 entries will be returned in a single call.
         *
         * Note that because of the asynchronous nature, duplicate entries may be returned and should be
         * uniqued on the client.
         *
         * Admin-only function.
         * @async
         *
         * @return {Promise<ExtensionUsersResult>} Will resolve on success. Rejects on failure.
         */
        SDK.prototype.getExtensionUsers = function (next) {
            return this.client.getExtensionUsers(this.identifier, next);
        };
        /**
         * Private Instance Methods
         */
        /** @ignore */
        SDK.prototype.setup = function (identifier, client, user, messenger, purchaseClient, analytics, loadPromise, SKUs, debug) {
            /** @ignore */
            this.userObservers = new Observer();
            /** @ignore */
            this.contextObservers = new Observer();
            /** @ignore */
            this.loadPromise = loadPromise;
            /**
             * A unique instance identifier. Either the extension or app ID.
             * @public
             * @type {string}
             */
            this.identifier = identifier;
            /**
             * The backend state client.
             * @private
             * @type {Client}
             *
             */
            this.client = client;
            /**
             * The backend event messenger client.
             * @private
             * @type {Messenger}
             *
             */
            this.messenger = messenger;
            /**
             * The backend transaction client.
             * @private
             * @type {PurchaseClient}
             *
             */
            this.purchaseClient = purchaseClient;
            /**
             * The backend analytics client.
             * @private
             * @type {Analytics}
             *
             */
            this.analytics = analytics;
            /**
             * An automatically updated User instance for the current extension user.
             * This is only valid after .loaded() has resolved.
             * @public
             * @type {User}
             */
            this.user = user;
            /**
             * SKUs associated with the products offered in the extension.
             * @public
             * @type {Object}
             */
            this.SKUs = SKUs;
            /**
             * The type of the anchor in which the extension is activated. Valid only
             * when platform is "web". Valid values: "component", "panel", "video_overlay".
             *
             * @public
             * @type {string}
             */
            this.anchor = Util.getQueryParam('anchor');
            /**
             * The extension’s mode. Valid values: "config", "dashboard", "viewer".
             *
             * @public
             * @type {string}
             */
            this.mode = Util.getQueryParam('mode');
            /**
             * The platform on which the Twitch client is running. Valid values: "mobile", "web".
             *
             * @public
             * @type {string}
             */
            this.platform = Util.getQueryParam('platform');
            /**
             * Indicates whether the extension is popped out. If true, the extension is running
             * in its own window; otherwise, false.
             *
             * @public
             * @type {boolean}
             */
            this.popout = Util.getQueryParam('popout') === 'true';
            /**
             * The release state of the extension. Valid values: "testing", "hosted_test",
             * "approved", "released", "ready_for_review", "in_review", "pending_action", "uploading".
             *
             * @public
             * @type {string}
             */
            this.state = Util.getQueryParam('state');
            /** @ignore */
            this.debug = debug;
        };
        return SDK;
    }());

    /**
     * A single good object as from {@link getUserGoods}.
     *
     * @typedef {Object} ExtensionGood
     *
     * @property {string} next_instruction - The next instruction (action) for the purchase. Can be:
     *   - "NOOP" - No action is needed, the good was fullfilled.
     *   - "FULFILL" - Fulfill the purchase, then call the Twitch entitlement system to indicate
     *     successful completion of the fullfillment.
     *   - "REVOKE" - Unwind the transaction.
     * @property {string} receipt_id - An ID which uniquely identifies the purchase transaction.
     * @property {string} sku - The SKU for the digital good.
     */
    /**
     * A receipt detailing which good's fulfillment status needs to be set. Used as a parameter for
     * {@link updateFulfilledGoods}.
     *
     * @typedef {Object} Receipt
     *
     * @property {string} fulfillment_address - Twitch User ID
     * @property {string} receipt_id - Receipt ID for the digital good, returned by {@link getUserGoods}
     * @property {string} last_instruction - The last thing you did. Corresponds to the "next
     * instruction" for the purchase returned by {@link getUserGoods}. Value value: `FULFILL`.
     */
    /**
     * Provides a convenient interface for Twitch API requests with an automatically set and updated
     * extension client id.
     *
     * Should not normally be created directly, instead an instance is made available
     * and namespaced appropriately when using {@link Muxy.TwitchClient}.
     *
     * @private
     *
     * @example
     * const twitchClient = new Muxy.TwitchClient();
     * twitchClient.getAllState().then((state) => {
     *   console.log(state);
     * });
     */
    var TwitchClient = /** @class */ (function () {
        /**
         * Create an instance of TwitchClient bound to the provided client ID.
         *
         * Prefer {@link Muxy.TwitchClient} instead.
         *
         * @since 1.0.0
         * @ignore
         *
         * @param {string} clientID - A valid Twitch Extension Client ID.
         */
        function TwitchClient(clientID) {
            /** @ignore */
            this.extensionId = clientID;
            /** @ignore */
            this.promise = Promise.resolve();
        }
        /**
         * Returns a promise which will resolve once the TwitchClient is available for use.
         *
         * @since 1.0.0
         * @public
         *
         * @return {Promise} Will resolve when the TwitchClient is ready for use.
         */
        TwitchClient.prototype.loaded = function () {
            return this.promise;
        };
        /**
         * Wraps an AJAX request to Twitch's helix API. Used internally by the API
         * convenience methods.
         *
         * @async
         * @ignore
         *
         * @param {string} method - The AJAX request method, e.g. "POST", "GET", etc.
         * @param {string} endpoint - The Twitch helix API endpoint.
         * @param {string?} data - A string-encoded JSON payload to send with the request.
         * @param {Object} helixToken - Signed JWT, accessible from sdk.user.helixToken.
         *
         * @return {Promise} Resolves with the AJAX payload on response < 400.
         * Rejects otherwise.
         */
        TwitchClient.prototype.signedTwitchHelixRequest = function (method, endpoint, data, helixToken) {
            var headers = {
                Authorization: undefined,
                'Client-ID': this.extensionId
            };
            if (helixToken) {
                headers.Authorization = "Extension ".concat(helixToken);
            }
            return new Promise(function (resolve, reject) {
                var xhrPromise = new XHRPromise({
                    data: data,
                    headers: headers,
                    method: method,
                    url: "https://api.twitch.tv/helix/".concat(endpoint)
                });
                return xhrPromise
                    .send()
                    .then(function (resp) {
                    if (resp.status < 400) {
                        try {
                            if (resp.responseText.hasOwnProperty('data')) {
                                var anyResp = resp.responseText;
                                var r = anyResp.data;
                                resolve(r);
                            }
                            else {
                                resolve(resp.responseText);
                            }
                        }
                        catch (err) {
                            reject('Unexpected response from Twitch');
                        }
                    }
                    reject(resp.responseText);
                })
                    .catch(reject);
            });
        };
        /**
         * Returns a list of Twitch User objects for a given list of usernames.
         *
         * @async
         * @since 1.0.0
         *
         * @throws {TypeError} Will throw an error if users is not an array of strings.
         *
         * @param {[]string} usernames - A list of usernames to lookup on Twitch.
         * @param {string} jwt - The bearer token for the current user, obtained from sdk.user.helixToken.
         *
         * @return {Promise<[]TwitchUser>} Resolves with a list of {@link TwitchUser}
         * objects for each of the usernames provided.
         *
         * @example
         * twitchClient.getTwitchUsers(['muxy'], (response) => {
         *  console.log(response.users[0].display_name);
         * });
         */
        TwitchClient.prototype.getTwitchUsers = function (usernames, jwt) {
            if (usernames.length === 0) {
                return Promise.resolve([]);
            }
            return this.signedTwitchHelixRequest('GET', "users?login=".concat(usernames.join('&login=')), jwt);
        };
        /**
         * Returns a list of Twitch User objects for a given list of user IDs.
         *
         * @async
         *
         * @throws {TypeError} Will throw an error if userIDs is not an array of strings.
         *
         * @param {[]string} userIDs - A list of user IDs to lookup on Twitch.
         *
         * @return {Promise<[]HelixTwitchUser>} Resolves with a list of {@link HelixTwitchUser}
         * objects for each of the user IDs provided.
         *
         * @example
         * twitchClient.getTwitchUsersByID(['126955211'], (response) => {
         *  console.log(response.users[0].display_name);
         * });
         */
        TwitchClient.prototype.getTwitchUsersByID = function (userIDs, jwt) {
            if (userIDs.length === 0) {
                return Promise.resolve([]);
            }
            return this.signedTwitchHelixRequest('GET', "users?id=".concat(userIDs.join(',')), jwt);
        };
        /**
         * Sets the required configuration string enabling an extension to be enabled
         *
         * SEE: https://dev.twitch.tv/docs/extensions/reference/#set-extension-required-configuration
         *
         * @param jwt - Signed JWT, accessible from sdk.user.twitchJWT
         * @param configurationString - A string that matches the required configuration string in the extension config
         */
        TwitchClient.prototype.setExtensionRequiredConfiguration = function (jwt, configurationString) {
            var environment = Util.getTwitchEnvironment();
            var token = Util.extractJWTInfo(jwt);
            return this.signedTwitchHelixRequest('PUT', "extensions/".concat(this.extensionId, "/").concat(environment.version, "/required_configuration?channel_id=").concat(token.channel_id), '{}', jwt);
        };
        return TwitchClient;
    }());

    var author = "Muxy, Inc.";
    var version = "2.5.0-20221109.1";
    var repository = "https://github.com/muxy/extensions-js";

    /**
     * @module Muxy
     */
    /**
     * The main extension entry interface, available as the global `Muxy` object.
     *
     * This class handles environment detection, data harness collection and updates (for
     * authentication and backend communication) and SDK instance creation.
     *
     * On import or inclusion in an HTML file, a singleton object will be globally accessible
     * as `Muxy`.
     */
    var Muxy = /** @class */ (function () {
        /**
         * Private constructor for singleton use only.
         * @ignore
         */
        function Muxy() {
            var _this = this;
            /**
             * Returns a version of the Muxy SDK associated with the provided identifier.
             * @since 1.0.0
             * @public
             *
             * @param {string?} id - A unique identifier for this extension or app. If omitted, the
             * extension client id will be used.
             *
             * @throws {Error} Will throw an error if called before {@link Muxy.setup}.
             *
             * @returns {SDK} An instance of the SDK class.
             *
             * @example
             * const sdk = new Muxy.SDK();
             * sdk.loaded().then(() => {
             *   sdk.send('Hello World');
             * }).catch((err) => {
             *   console.error(err);
             * });
             */
            this.SDK = SDK;
            /**
             * Makes trivia state enum available from the global `Muxy` object
             */
            this.TriviaQuestionState = TriviaQuestionState;
            /**
             * Debugging callback, used to start the helix token flow.
             * @internal
             * @type {function}
             */
            this.openHelixUrl = null;
            this.Util = Util;
            this.setupCalled = false;
            this.testChannelID = '23161357';
            this.testJWTRole = 'viewer';
            this.twitchClientID = '';
            this.SDKClients = {};
            this.client = null;
            this.messenger = null;
            this.cachedTwitchClient = null;
            this.analytics = null;
            this.user = null;
            this.didLoad = false;
            this.loadPromise = new Promise(function (resolve, reject) {
                /** @ignore */
                _this.loadResolve = resolve;
                /** @ignore */
                _this.loadReject = reject;
            });
            this.SKUs = [];
            this.debugOptions = null;
            this.watchingAuth = false;
            StateClient.setEnvironment(Util.currentEnvironment(), null);
        }
        /**
         * Prints to console a description of the library's current version and
         * environment info. This is called automatically when the library is
         * setup, unless the `quiet` parameter is passed to {@link setup}.
         *
         * @since 1.0.0
         * @public
         *
         * @example
         * Muxy.printInfo();
         * ┌──────────────────────────────────────────────────┐
         * | Muxy Extensions SDK                              |
         * | v1.0.0 © 2017 Muxy, Inc.                         |
         * | https://github.com/muxy/extensions-js            |
         * |                                                  |
         * | Running in sandbox environment outside of Twitch |
         * └──────────────────────────────────────────────────┘
         *
         */
        Muxy.printInfo = function () {
            var SDKInfoText = [
                'Muxy Extensions SDK',
                "v".concat(version, " \u00A9 ").concat(new Date().getFullYear(), " ").concat(author),
                repository,
                ''
            ];
            var env = Util.currentEnvironment();
            switch (env) {
                case Util.Environments.Production:
                    SDKInfoText.push('Running on production');
                    break;
                case Util.Environments.SandboxDev:
                    SDKInfoText.push('Running in sandbox environment outside of Twitch');
                    break;
                case Util.Environments.SandboxTwitch:
                    SDKInfoText.push('Running in sandbox environment on Twitch');
                    break;
                case Util.Environments.SandboxAdmin:
                    SDKInfoText.push('Running in sandbox environment in the Admin panel');
                    break;
                case Util.Environments.Admin:
                    SDKInfoText.push('Running in the Admin panel');
                    break;
                case Util.Environments.Testing:
                    SDKInfoText.push('Running in testing environment outside of Twitch');
                    break;
                case Util.Environments.Server:
                    SDKInfoText.push('Running on a NodeJS server');
                    break;
                default:
                    SDKInfoText.push('Could not determine execution environment.');
                    if (env) {
                        SDKInfoText.push("Current env string ".concat(env.environment));
                    }
            }
            Util.consolePrint(SDKInfoText, { boxed: true });
        };
        /**
         * Called the first time the {@link setup} is called to start watching the auth
         * and context callbacks and updating values automatically. This method should
         * not normally be called directly.
         *
         * @since 1.0.0
         * @ignore
         *
         * @param {string} extensionID - The Twitch Extension Client ID to use for all
         * Twitch API requests.
         */
        Muxy.prototype.watchAuth = function (extensionID) {
            var _this = this;
            // Context callback handler
            var updateUserContextSettings = function () {
                var e_1, _a;
                if (!_this.user || !_this.context) {
                    return;
                }
                // Set Video Mode
                if (_this.context.isFullScreen) {
                    _this.user.videoMode = 'fullscreen';
                }
                else if (_this.context.isTheatreMode) {
                    _this.user.videoMode = 'theatre';
                }
                else {
                    _this.user.videoMode = 'default';
                }
                _this.user.game = _this.context.game;
                _this.user.bitrate = Math.round(_this.context.bitrate || 0);
                _this.user.latency = _this.context.hlsLatencyBroadcaster;
                _this.user.buffer = _this.context.bufferSize;
                _this.user.theme = _this.context.theme;
                _this.user.volume = _this.context.volume;
                var keys = Object.keys(_this.SDKClients);
                try {
                    for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                        var key = keys_1_1.value;
                        _this.SDKClients[key].updateUser(_this.user);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            };
            Ext.extensionID = extensionID;
            // Auth callback handler
            Ext.onAuthorized(this.debugOptions, function (auth) {
                if (!auth) {
                    _this.loadReject('Received invalid authorization from Twitch');
                    return;
                }
                _this.twitchClientID = auth.clientId;
                _this.messenger.extensionID = auth.clientId;
                _this.messenger.channelID = auth.channelId;
                _this.client.updateAuth(auth.token);
                var resolvePromise = function (user) {
                    var e_2, _a;
                    _this.user = user;
                    if (_this.debugOptions) {
                        var openHelixUrl = allowTestingHelixToken(Ext.extensionID, _this.user).openHelixUrl;
                        _this.openHelixUrl = openHelixUrl;
                    }
                    var keys = Object.keys(_this.SDKClients);
                    try {
                        for (var keys_2 = __values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                            var key = keys_2_1.value;
                            _this.SDKClients[key].updateUser(_this.user);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (_this.analytics) {
                        _this.analytics.user = _this.user;
                    }
                };
                var onFirstAuth = function () {
                    _this.client
                        .immediateGetUserInfo(extensionID)
                        .then(function (userinfo) {
                        var e_3, _a;
                        var offset = userinfo.server_time - new Date().getTime();
                        var user = new User(auth);
                        user.ip = userinfo.ip_address;
                        user.registeredWithMuxy = userinfo.registered || false;
                        user.visualizationID = userinfo.visualization_id || '';
                        user.timeOffset = offset;
                        var keys = Object.keys(_this.SDKClients);
                        try {
                            for (var keys_3 = __values(keys), keys_3_1 = keys_3.next(); !keys_3_1.done; keys_3_1 = keys_3.next()) {
                                var key = keys_3_1.value;
                                _this.SDKClients[key].timeOffset = offset;
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (keys_3_1 && !keys_3_1.done && (_a = keys_3.return)) _a.call(keys_3);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        // Pull user settings from environment
                        user.language = Util.getQueryParam('language') || user.language;
                        user.locale = Util.getQueryParam('locale') || user.locale;
                        updateUserContextSettings.call(_this);
                        _this.didLoad = true;
                        resolvePromise(user);
                        _this.loadResolve();
                    })
                        .catch(function (err) {
                        _this.loadReject(err);
                    });
                };
                if (_this.user) {
                    _this.user.updateAuth(auth);
                    resolvePromise(_this.user);
                }
                else {
                    onFirstAuth();
                }
            });
            Ext.onContext(function (context) {
                var e_4, _a;
                _this.context = context;
                if (_this.user) {
                    updateUserContextSettings.call(_this);
                }
                var keys = Object.keys(_this.SDKClients);
                try {
                    for (var keys_4 = __values(keys), keys_4_1 = keys_4.next(); !keys_4_1.done; keys_4_1 = keys_4.next()) {
                        var key = keys_4_1.value;
                        _this.SDKClients[key].contextObservers.notify(context);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (keys_4_1 && !keys_4_1.done && (_a = keys_4.return)) _a.call(keys_4);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            });
        };
        /**
         * Mandatory SDK setup call. Must be called once and only once to establish the Extension
         * environment and client ID to use.
         *
         * @since 1.0.0
         * @public
         *
         * @param {Object} options
         *
         * @param {string} options.clientID - The Extension Client ID as provided by Twitch.
         * @since 1.0.4
         *
         * @param {string?} options.uaString - An optional Google Analytics UA_String to send
         * events to.
         * @since 1.0.0
         *
         * @param {boolean?} options.quiet - If true, will not print library information to the
         * console. This is always true when running in production.
         * @since 1.0.3
         *
         * @throws {Error} Will throw an error if setup() has already been called, or if no
         * Extension Client ID is provided.
         *
         * @example
         * Muxy.setup({
         *   clientID: <your extension client id>
         * });
         */
        Muxy.prototype.setup = function (options) {
            if (this.setupCalled) {
                throw new Error('Muxy.setup() can only be called once.');
            }
            if (!options) {
                throw new Error('Muxy.setup() was called with invalid options');
            }
            var clientID = options.clientID || options.extensionID;
            if (!clientID) {
                throw new Error('Muxy.setup() was called without an Extension Client ID');
            }
            if (!this.debugOptions) {
                var noop = function () {
                    /* Default to doing nothing on callback */
                };
                this.debugOptions = {
                    channelID: this.testChannelID,
                    role: this.testJWTRole,
                    onPubsubListen: noop,
                    onPubsubReceive: noop,
                    onPubsubSend: noop
                };
            }
            if (this.debugOptions.environment) {
                Util.overrideEnvironment = Util.Environments[this.debugOptions.environment];
            }
            this.client = new StateClient(this.loadPromise, this.debugOptions);
            this.messenger = DefaultMessenger(this.debugOptions);
            this.purchaseClient = DefaultPurchaseClient(clientID);
            this.transactionsEnabled = options.transactionsEnabled;
            this.twitchClientID = clientID;
            this.cachedTwitchClient = new TwitchClient(this.twitchClientID);
            this.cachedTwitchClient.promise = this.loadPromise;
            if (options.uaString) {
                this.analytics = new Analytics(options.uaString, this.loadPromise);
            }
            if (!options.quiet) {
                Muxy.printInfo();
            }
            this.setupCalled = true;
        };
        /**
         * Setup debugging options for the application. This allows the application to fake
         * what user they are running as, the channel the extension is running on, pubsub debug
         * message frequency, and even the backend URL that the extension uses.
         *
         * This should be called before setup().
         *
         * @param {*} options - an instance of DebuggingOptions
         */
        Muxy.prototype.debug = function (options) {
            this.debugOptions = __assign(__assign({ channelID: this.testChannelID, role: this.testJWTRole }, this.debugOptions), options.options);
        };
        /**
         * Start the debug helix token flow.
         */
        Muxy.prototype.beginDebugHelixTokenFlow = function () {
            var _this = this;
            this.loadPromise.then(function () {
                if (_this.openHelixUrl) {
                    _this.openHelixUrl();
                }
                else {
                    throw new Error('Muxy.setup() must be called before creating a new TwitchClient instance');
                }
            });
        };
        /**
         * Returns a twitch client to use. Can only be used after the loaded promise resolves.
         *
         * @since 1.0.0
         * @public
         *
         * @returns {TwitchClient} An instance of the TwitchClient class.
         *
         * @throws {Error} Will throw an error if called before {@link Muxy.setup}.
         */
        Muxy.prototype.TwitchClient = function () {
            /* Implemented below to deal with scoping issues. */
            return undefined;
        };
        return Muxy;
    }());
    Config$1.RegisterMoreEnvironments();
    /**
     * Global Muxy singleton object.
     * @ignore
     */
    var mxy = new Muxy();
    /** @ignore */
    mxy.TwitchClient = function NewTwitchClient() {
        if (!mxy.setupCalled) {
            throw new Error('Muxy.setup() must be called before creating a new TwitchClient instance');
        }
        return mxy.cachedTwitchClient;
    };
    mxy.DebuggingOptions = DebuggingOptions;
    // Backwards compatibility shim
    // tslint:disable-next-line
    mxy['default'] = mxy;

    exports.Muxy = Muxy;
    exports["default"] = mxy;

    Object.defineProperty(exports, '__esModule', { value: true });

}));

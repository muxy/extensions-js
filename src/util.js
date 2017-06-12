import _ from 'lodash';

// https://stackoverflow.com/a/326076/136408
export function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

// errorPromise wraps a string error response in an (immediately rejected) promise.
export function errorPromise(err) {
  return Promise.reject(err);
}

// parseJSONObject attempts to parse all keys in obj, recursively.
export function parseJSONObject(obj) {
  return _.mapValues(obj, (v, k) => {
    try {
      console.log(v);
      let o = JSON.parse(v);
      console.log(o);
      if (_.isObject(o)) {
        o = parseJSONObject(o);
      }
      return o;
    } catch (err) {
      return v;
    }
  });
}

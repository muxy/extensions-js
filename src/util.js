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

export function asciiBox(text) {
  let lines = text.split('\n');
  const contentWidth = widestLine(text);
  const top = `┌${'─'.repeat(contentWidth)}┐`;
  const middle = lines.map(line => {
    const paddingRight = ' '.repeat(contentWidth - line.length);
    return `│${line}${paddingRight}│`
  });
  const bottom = `└${'─'.repeat(contentWidth)}┘`;

  return `${top}\n${middle.join('\n')}\n${bottom}`;
}

function widestLine(str) {
  return Math.max.apply(null, str.split('\n').map(function (x) {
    return x.length;
  }));
}
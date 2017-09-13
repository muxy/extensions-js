// Possible runtime environments for the SDK.
export const ENVIRONMENTS = {
  SANDBOX_DEV: { environment: 'sandbox' },
  SANDBOX_TWITCH: { environment: 'sandbox' },
  PRODUCTION: { environment: 'production' },
  SERVER: { environment: 'production' }
};

/**
 * Node.js vs client-side detection. Borrowed from underscore.js
 */
function environmentDetector(overrideWindow) {
  let vWindow;
  if (typeof window !== 'undefined') {
    vWindow = window;
  }
  if (overrideWindow) {
    vWindow = overrideWindow;
  }
  try {
    if (typeof module !== 'undefined' && module.exports && typeof vWindow === 'undefined') {
      return ENVIRONMENTS.SERVER;
    }

    // not in an iframe, use testing
    if (!isWindowFramed()) {
      return ENVIRONMENTS.SANDBOX_DEV;
    }

    // Page content is loaded from twitch CDN
    if (vWindow.location.origin.indexOf('.ext-twitch.tv') !== -1) {
      return ENVIRONMENTS.PRODUCTION;
    }

    if (vWindow.document.referrer.indexOf('twitch.tv') !== -1) {
      return ENVIRONMENTS.SANDBOX_TWITCH;
    }
  } catch (err) {
    consolePrint(err, { type: 'error' });
  }

  return ENVIRONMENTS.SANDBOX_DEV;
}

/**
 * CurrentEnvironment uses the hostname and available info to determine in what
 * environment the SDK is running. Possible values are available in {ENVIRONMENTS}.
 * @type {string}
 */
export const CurrentEnvironment = environmentDetector;

// errorPromise wraps a string error response in an (immediately rejected) promise.
export function errorPromise(err) {
  return Promise.reject(err);
}

/**
 * widestLine returns the length of the longest line in the provided array.
 * @param lines an array of [string, string] tuples.
 */
function widestLine(lines) {
  return Math.max.apply(null, lines.map(x => x.length));
}

// asciiBox draws a box arround the lines of text provided.
function asciiBox(lines) {
  const contentWidth = widestLine(lines);

  const intro = `${' '.repeat(contentWidth / 2)}🦊`;

  const out = [intro];
  out.push(`┌${'─'.repeat(contentWidth + 2)}┐`);

  lines.forEach(line => {
    const paddingRight = ' '.repeat(contentWidth - line.length);
    out.push(`| ${line}${paddingRight} |`);
  });

  out.push(`└${'─'.repeat(contentWidth + 2)}┘`);
  return out;
}

/**
 * consolePrint prints each line of text with optional global settings and per-line
 * console flags.
 * @param lines an array containing lines of text. Each line may be a single string,
 * or a [line of text, string console options] tuple
 * @param options an object containing global options. `boxed` will surround the lines of
 * text in an ASCII art box.
 */
export function consolePrint(lines, options = {}) {
  let style = 'font-family: monospace;';
  let lineArr = Array.isArray(lines) ? lines : [lines];
  const type = options.type || 'log';

  if (options.boxed) {
    lineArr = asciiBox(lineArr);
  }

  if (options.style) {
    style += options.style;
  }

  if (CurrentEnvironment() === ENVIRONMENTS.SERVER) {
    console[type].call(this, lineArr.join('\n')); // eslint-disable-line no-console
  } else {
    console[type].call(this, `%c${lineArr.join('\n')}`, style); // eslint-disable-line no-console
  }
}

/**
 * eventPatternMatch matches an input event name with a pattern.
 * An event name is a : delimited list of terms, while a pattern
 * is a : delimited list of terms, with an optional * instead of a term.
 * '*' will match any term.
 *
 * @param input an input event name, : delimited.
 * Allowed characters are alpha-numeric and _
 * @param pattern a pattern to match against, : delimited.
 * Allowed characters are alpha-numeric and _ and *
 *
 * @return true if the pattern matches the input, false otherwise.
 */
export function eventPatternMatch(input, pattern) {
  const inputParts = input.split(':');
  const patternParts = pattern.split(':');

  if (inputParts.length !== patternParts.length) {
    return false;
  }

  for (let i = 0; i < inputParts.length; i += 1) {
    if (inputParts[i] !== patternParts[i] && patternParts[i] !== '*') {
      return false;
    }
  }

  return true;
}

/**
 * forceType takes in a variable and a Javascript Type identifier.
 * It will throw a TypeError if the variable is not of the correct
 * type. If the type check passes, the function returns without
 * throwing an error. As a convenience, the type may also be an
 * array of types.
 *
 * Acceptable types:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
 *
 * @param {any} value any variable
 * @param {string} type a single type string, or an array of multiple types
 *
 * @throws {TypeError} if typeof value is not in types
 */
export function forceType(value, type) {
  const types = [].concat(type);
  const typeString = typeof value;

  if (types.indexOf(typeString) === -1) {
    throw new TypeError(`expected '${typeString}' to be one of [${types}]`);
  }
}

function isWindowFramed() {
  const isNotChildWindow = !window.opener;

  // Cannot compare WindowProxy objects with ===/!==
  const windowTop = window.top && window != window.top; // eslint-disable-line eqeqeq
  const windowParent = window.parent && window != window.parent; // eslint-disable-line eqeqeq
  const hasWindowAncestors = !!(windowTop || windowParent);

  return isNotChildWindow && hasWindowAncestors;
}

// Possible runtime environments for the SDK.
export const ENVIRONMENTS = {
  DEV: 'dev',
  STAGING: 'staging',
  PRODUCTION: 'production',
  SERVER: 'server'
};

/**
 * Node.js vs client-side detection. Borrowed from underscore.js
 */
function environmentDetector() {
  if (typeof module !== 'undefined' && module.exports && typeof window === 'undefined') {
    return ENVIRONMENTS.SERVER;
  }

  const root = window;
  if (root.location.origin.indexOf('.ext-twitch.tv') !== -1) {
    if (root.document.referrer.indexOf('twitch.tv') !== -1) {
      return ENVIRONMENTS.PRODUCTION;
    }
    return ENVIRONMENTS.STAGING;
  }

  if (typeof window.Twitch.ext !== 'undefined') {
    return ENVIRONMENTS.STAGING;
  }

  return ENVIRONMENTS.DEV;
}

/**
 * CurrentEnvironment uses the hostname and available info to determine in what
 * environment the SDK is running. Possible values are available in {ENVIRONMENTS}.
 * @type String
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
  out.push(`┌${'-'.repeat(contentWidth + 2)}┐`);

  lines.forEach((line) => {
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

  if (options.boxed) {
    lineArr = asciiBox(lineArr);
  }

  if (options.style) {
    style += options.style;
  }

  if (CurrentEnvironment() === ENVIRONMENTS.SERVER) {
    console.log.call(this, lineArr.join('\n')); // eslint-disable-line no-console
  } else {
    console.log.call(this, `%c${lineArr.join('\n')}`, style); // eslint-disable-line no-console
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
 * @param pattern a pattern to match agains, : delimited.
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

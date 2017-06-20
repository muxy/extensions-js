// Possible runtime environments for the SDK.
export const ENVIRONMENTS = {
  DEV: 'dev',
  STAGING: 'staging',
  PRODUCTION: 'production'
};

// errorPromise wraps a string error response in an (immediately rejected) promise.
export function errorPromise(err) {
  return Promise.reject(err);
}

/**
 * currentEnvironment uses the hostname and available info to determine in what
 * environment the SDK is running.
 * @param window the actual or mocked window object
 * @returns One of {ENVIRONMENTS}
 */
export function currentEnvironment(window) {
  if (window.location.origin.indexOf('.ext-twitch.tv') !== -1) {
    if (window.document.referrer.indexOf('twitch.tv') !== -1) {
      return ENVIRONMENTS.PRODUCTION;
    }
    return ENVIRONMENTS.STAGING;
  }

  return ENVIRONMENTS.DEV;
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

  console.log.call(this, `%c${lineArr.join('\n')}`, style); // eslint-disable-line no-console
}

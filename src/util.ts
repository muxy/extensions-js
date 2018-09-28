/**
 * @module SDK
 */
/**
 * Global environment objects. This ensures that comparisons are true between
 * object pointers. For example: ENVIRONMENTS.TESTING === Util.Environments.Testing
 *
 * @since 1.0.3
 */
export class Environment {
  public environment: string;
}

/** @ignore */ const ProductionEnvironment: Environment = {
  environment: 'production'
};

/** @ignore */ const AdministrationEnvironment: Environment = {
  environment: 'production'
};

/** @ignore */ const SandboxDevEnvironment: Environment = {
  environment: 'sandbox'
};

/** @ignore */ const SandboxAdministrationEnvironment: Environment = {
  environment: 'sandbox'
};

/** @ignore */ const SandboxTwitchEnvironment: Environment = {
  environment: 'sandbox'
};
/** @ignore */ const ServerEnvironment: Environment = { environment: 'server' };
/** @ignore */ const TestingEnvironment: Environment = {
  environment: 'testing'
};

/**
 * Possible runtime environments for the SDK.
 * @since 1.0.0
 * @deprecated Use {@link Util.Environments} instead.
 */
/** @ignore */ export const ENVIRONMENTS = {
  PRODUCTION: ProductionEnvironment,
  ADMIN: AdministrationEnvironment,
  SANDBOX_ADMIN: SandboxAdministrationEnvironment,
  SANDBOX_DEV: SandboxDevEnvironment,
  SANDBOX_TWITCH: SandboxTwitchEnvironment,
  SERVER: ServerEnvironment,
  TESTING: TestingEnvironment
};

export interface ConsolePrintOptions {
  type?: string;
  boxed?: boolean;
  style?: string;
}

/**
 * A collection of static utility functions, available at {@link Muxy.Util}.
 *
 * @example
 * const a = 'a string';
 * Muxy.Util.forceType(a, 'string');
 */
export default class Util {
  /**
   * Possible runtime environments for the library. Used to define available
   * behavior and services.
   *
   * @since 1.0.3
   * @type {Object}
   */
  static get Environments() {
    return {
      Production: ProductionEnvironment,
      SandboxDev: SandboxDevEnvironment,
      SandboxTwitch: SandboxTwitchEnvironment,
      Server: ServerEnvironment,
      Testing: TestingEnvironment
    };
  }

  /**
   * Wraps a string error response in an (immediately rejected) promise.
   * @since 1.0.0
   *
   * @param {string} err - A string error that the promise will reject.
   *
   * @returns {Promise<string>} Immediately rejects the returned Promise.
   */
  public static errorPromise(err: string): Promise<string> {
    return Promise.reject(err);
  }

  /**
   * Returns the length of the longest line in the provided array.
   *
   * @since 1.0.0
   * @ignore
   *
   * @param {string[]} lines - An array of strings.
   */
  public static widestLine(lines: string[]): number {
    return Math.max.apply(null, lines.map(x => x.length));
  }

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
  public static asciiBox(lines: string[]): string[] {
    const contentWidth = Util.widestLine(lines);

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
   * Checks if the current window object is running in an iframe.
   *
   * @since 1.0.0
   * @ignore
   */
  public static isWindowFramed(overrideWindow?: Window): boolean {
    let vWindow;
    if (typeof window !== 'undefined') {
      vWindow = window;
    }
    if (overrideWindow) {
      vWindow = overrideWindow;
    }

    const isNotChildWindow = !vWindow.opener;

    // Cannot compare WindowProxy objects with ===/!==
    const windowTop = vWindow.top && vWindow != vWindow.top; // tslint:disable-line:triple-equals
    const windowParent = vWindow.parent && vWindow != vWindow.parent; // tslint:disable-line:triple-equals
    const hasWindowAncestors = !!(windowTop || windowParent);

    return isNotChildWindow && hasWindowAncestors;
  }

  /**
   * currentEnvironment uses the hostname and available info to determine in what
   * environment the SDK is running. Possible values are available in {@link Util.Environments}.
   * @since 1.0.0
   *
   * @returns {string} Returns a string representation of the current
   * execution environment.
   */
  public static currentEnvironment(overrideWindow?: object): Environment {
    let vWindow;
    if (typeof window !== 'undefined') {
      vWindow = window;
    }
    if (overrideWindow) {
      vWindow = overrideWindow;
    }

    try {
      // NodeJS module system, assume server.
      // istanbul ignore if
      if (typeof module !== 'undefined' && module.exports && typeof vWindow === 'undefined') {
        return ENVIRONMENTS.SERVER;
      }

      // Not in an iframe, assume sandbox dev.
      if (!Util.isWindowFramed(vWindow)) {
        // See if we're in the admin state.
        const params = new URLSearchParams(window.location.search);
        if (params.get('muxyAdminInterface')) {
          return ENVIRONMENTS.SANDBOX_ADMIN;
        }

        return ENVIRONMENTS.SANDBOX_DEV;
      }

      // See if we're in the admin pane.
      if (
        vWindow.location.origin.indexOf('devportal.muxy.io') !== -1 ||
        vWindow.location.origin.indexOf('dev.muxy.io') !== -1 ||
        vWindow.location.origin.indexOf('dev-portal.staging.muxy.io') !== -1
      ) {
        return ENVIRONMENTS.ADMIN;
      }

      // See if we're in the admin state, but in an iframed context.
      const params = new URLSearchParams(window.location.search);
      if (params.get('muxyAdminInterface')) {
        return ENVIRONMENTS.SANDBOX_ADMIN;
      }

      // Loaded from Twitch's CDN, assume production.
      if (vWindow.location.origin.indexOf('.ext-twitch.tv') !== -1) {
        return ENVIRONMENTS.PRODUCTION;
      }

      // Not on Twitch but with their referrer, assume sandbox twitch.
      if (vWindow.document.referrer && vWindow.document.referrer.indexOf('twitch.tv') !== -1) {
        return ENVIRONMENTS.SANDBOX_TWITCH;
      }

      // Explicity set testing variable, assume testing.
      if ((vWindow as any).testing) {
        return ENVIRONMENTS.TESTING;
      }
    } catch (err) {
      Util.consolePrint(err.toString(), { type: 'error' });
    }

    // Default, assume we're running in sandbox dev environment.
    return ENVIRONMENTS.SANDBOX_DEV;
  }

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
  public static consolePrint(lines: string[] | string, options: ConsolePrintOptions = {}) {
    if (!lines || Util.currentEnvironment() === Util.Environments.Production) {
      return;
    }

    let style = 'font-family: monospace;';
    let lineArr = Array.isArray(lines) ? lines : lines.split('\n');
    const type = options.type || 'log';

    if (options.boxed) {
      lineArr = Util.asciiBox(lineArr);
    }

    if (options.style) {
      style += options.style;
    }

    if (Util.currentEnvironment() === Util.Environments.Server) {
      (console as any)[type].call(this, lineArr.join('\n')); // eslint-disable-line no-console
    } else {
      (console as any)[type].call(this, `%c${lineArr.join('\n')}`, style); // eslint-disable-line no-console
    }
  }

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
  public static eventPatternMatch(input: string, pattern: string): boolean {
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
  public static forceType(value: any, type: string) {
    const types = [].concat(type);
    const typeString = typeof value;

    if (types.indexOf(typeString) === -1) {
      throw new TypeError(`expected '${typeString}' to be one of [${types}]`);
    }
  }

  /**
   * Returns information about the current extension environment on twitch
   *
   * @public
   *
   * @return {TwitchEnvironment}
   */
  public static getTwitchEnvironment(): TwitchEnvironment {
    const urlParams = new URLSearchParams(window.location.search);

    const env: TwitchEnvironment = {
      anchor: null,
      language: null,
      mode: null,
      platform: null,
      state: null
    };

    env.anchor = urlParams.get('anchor');
    env.language = urlParams.get('language');
    env.mode = urlParams.get('mode');
    env.platform = urlParams.get('platform');
    env.state = urlParams.get('state');

    return env;
  }
}

/**
 * The response from {@link getTwitchEnvironment}.
 *
 * @typedef {Object[]} TwitchEnvironment
 *
 * @property {string} anchor - The type of the anchor in which the extension is activated.
 * Valid only when platform is "web". Valid values: "component", "panel", "video_overlay".
 * @property {string} language - The user’s language setting (e.g., "en").
 * @property {string} mode - The extension’s mode. Valid values: "config", "dashboard", "viewer".
 * @property {string} platform - The platform on which the Twitch client is running. Valid values: "mobile", "web".
 * @property {string} state - The release state of the extension.
 * Valid values: "testing", "hosted_test", "approved", "released",
 * "ready_for_review", "in_review", "pending_action", "uploading".
 */
export interface TwitchEnvironment {
  anchor: string;
  language: string;
  mode: string;
  platform: string;
  state: string;
}

/** @ignore */ export const consolePrint = Util.consolePrint;
/** @ignore */ export const forceType = Util.forceType;
/** @ignore */ export const eventPatternMatch = Util.eventPatternMatch;
/** @ignore */ export const CurrentEnvironment = Util.currentEnvironment;
/** @ignore */ export const errorPromise = Util.errorPromise;

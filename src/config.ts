import { Environment, ENVIRONMENTS } from './util';
import { MessengerType } from './messenger';

/**
 * Muxy production API URL.
 * @ignore
 */
const API_URL = 'https://api.muxy.io';

/**
 * Muxy sandbox API URL.
 * @ignore
 */
const SANDBOX_URL = 'https://sandbox.api.muxy.io';

/**
 * Localhost for testing purposes.
 * @ignore
 */
const LOCALHOST_URL = 'http://localhost:5000';

interface ServerURLs {
  ServerURL: string;
  FakeAuthURL: string;
}

export default class Config {
  public static RegisterMoreEnvironments() {}

  public static DefaultMessengerType(env: Environment): MessengerType {
    switch (env) {
      case ENVIRONMENTS.SANDBOX_DEV:
      case ENVIRONMENTS.ADMIN: // Currently unable to hook into the twitch pubsub system from admin
      case ENVIRONMENTS.SANDBOX_ADMIN:
        return MessengerType.Pusher;
      case ENVIRONMENTS.SANDBOX_TWITCH:
      case ENVIRONMENTS.PRODUCTION:
        return MessengerType.Twitch;
      case ENVIRONMENTS.SERVER:
        return MessengerType.Server;
    }
    return MessengerType.Unknown;
  }

  public static GetServerURLs(env: Environment): ServerURLs {
    if (env === ENVIRONMENTS.SANDBOX_DEV || env === ENVIRONMENTS.SANDBOX_TWITCH || env === ENVIRONMENTS.SANDBOX_ADMIN) {
      return {
        ServerURL: SANDBOX_URL,
        FakeAuthURL: SANDBOX_URL
      };
    }

    if (env === ENVIRONMENTS.TESTING) {
      return {
        ServerURL: LOCALHOST_URL,
        FakeAuthURL: LOCALHOST_URL
      };
    }

    return {
      ServerURL: API_URL,
      FakeAuthURL: SANDBOX_URL
    };
  }

  public static OtherEnvironmentCheck(window): Environment | undefined {
    return undefined;
  }
}

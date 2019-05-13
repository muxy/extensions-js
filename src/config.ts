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

export enum AuthorizationFlowType {
  TwitchAuth = 0,
  AdminAuth = 1,
  TestAuth = 2,
  Unknown = 3
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

  public static GetAuthorizationFlowType(env: Environment): AuthorizationFlowType {
    switch (env) {
      case ENVIRONMENTS.SANDBOX_DEV:
        return AuthorizationFlowType.TestAuth;

      case ENVIRONMENTS.SANDBOX_ADMIN:
      case ENVIRONMENTS.ADMIN:
        return AuthorizationFlowType.AdminAuth;

      case ENVIRONMENTS.SANDBOX_TWITCH:
      case ENVIRONMENTS.PRODUCTION:
        return AuthorizationFlowType.TwitchAuth;
    }

    return AuthorizationFlowType.Unknown;
  }

  public static CanUseTwitchAPIs(env: Environment): boolean {
    switch (env) {
      case ENVIRONMENTS.PRODUCTION:
      case ENVIRONMENTS.SANDBOX_TWITCH:
        return true;
    }

    return false;
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

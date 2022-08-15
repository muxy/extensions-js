import { MessengerType } from './messenger';
import { PurchaseClientType } from './purchase-client';
import Util, { Environment } from './util';

/**
 * Muxy production API URL.
 * @ignore
 */
const API_URL = 'https://api.muxy.io';
const PORTAL_URL = 'https://dev.muxy.io';

/**
 * Muxy sandbox API URL.
 * @ignore
 */
const SANDBOX_URL = 'https://sandbox.api.muxy.io';
const STAGING_PORTAL_URL = 'https://dev.staging.muxy.io/';

/**
 * Localhost for testing purposes.
 * @ignore
 */
const LOCALHOST_URL = 'http://localhost:5000';

export interface ServerURLs {
  ServerURL: string;
  PortalURL: string;
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
      case Util.Environments.SandboxDev:
      case Util.Environments.Admin : // Currently unable to hook into the twitch pubsub system from admin
      case Util.Environments.SandboxAdmin:
        return MessengerType.Pusher;
      case Util.Environments.SandboxTwitch:
      case Util.Environments.Production:
        return MessengerType.Twitch;
      case Util.Environments.Server:
        return MessengerType.Server;
      case Util.Environments.Testing:
    }
    return MessengerType.Unknown;
  }

  public static DefaultPurchaseClientType(env: Environment): PurchaseClientType {
    switch (env) {
      case Util.Environments.SandboxDev:
        return PurchaseClientType.Dev;
      case Util.Environments.Admin : // Currently unable to hook into the twitch pubsub system from admin
      case Util.Environments.SandboxAdmin:
      case Util.Environments.SandboxTwitch:
      case Util.Environments.Production:
        return PurchaseClientType.Twitch;
      case Util.Environments.Server:
        return PurchaseClientType.Server;
      case Util.Environments.Testing:
        return PurchaseClientType.Test;
    }

    return PurchaseClientType.Unknown;
  }

  public static GetAuthorizationFlowType(env: Environment): AuthorizationFlowType {
    switch (env) {
      case Util.Environments.SandboxDev:
        return AuthorizationFlowType.TestAuth;
      case Util.Environments.Admin :
      case Util.Environments.SandboxAdmin:
          return AuthorizationFlowType.AdminAuth;
      case Util.Environments.SandboxTwitch:
      case Util.Environments.Production:
        return AuthorizationFlowType.TwitchAuth;
      case Util.Environments.Server:
      case Util.Environments.Testing:
    }

    return AuthorizationFlowType.Unknown;
  }

  public static CanUseTwitchAPIs(env: Environment): boolean {
    switch (env) {
      case Util.Environments.Production:
      case Util.Environments.SandboxTwitch:
        return true;
    }

    return false;
  }

  public static GetServerURLs(env: Environment): ServerURLs {
    if (env === Util.Environments.SandboxDev || env === Util.Environments.SandboxTwitch || env === Util.Environments.SandboxAdmin) {
      return {
        FakeAuthURL: SANDBOX_URL,
        PortalURL: PORTAL_URL,
        ServerURL: SANDBOX_URL
      };
    }

    if (env === Util.Environments.Testing) {
      return {
        FakeAuthURL: LOCALHOST_URL,
        PortalURL: STAGING_PORTAL_URL,
        ServerURL: LOCALHOST_URL
      };
    }

    return {
      FakeAuthURL: SANDBOX_URL,
      PortalURL: PORTAL_URL,
      ServerURL: API_URL
    };
  }

  public static OtherEnvironmentCheck(window: Window | any): Environment | undefined {
    return undefined;
  }
}

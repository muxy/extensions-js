import { MessengerType } from './messenger';
import { PurchaseClientType } from './types/purchases';
import Util, { Environment } from './util';

/**
 * Muxy production URLs.
 * @ignore
 */
const API_URL_PRODUCTION = 'https://api.muxy.io';
const PORTAL_URL_PRODUCTION = 'https://dev.muxy.io';

/**
 * Muxy sandbox API URL.
 * @ignore
 */
const API_URL_SANDBOX = 'https://api.sandbox.muxy.io';

/**
 * Muxy staging URLs.
 */
const API_URL_STAGING = 'https://api.staging.muxy.io';
const PORTAL_URL_STAGING = 'https://dev.staging.muxy.io';

/**
 * Localhost for testing purposes.
 * @ignore
 */
const API_URL_LOCALHOST = 'http://localhost:5000';

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
  }

  public static DefaultPurchaseClientType(env: Environment): PurchaseClientType {
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
  }

  public static GetAuthorizationFlowType(env: Environment): AuthorizationFlowType {
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
  }

  public static OtherEnvironmentCheck(window: Window | Record<string, unknown>): Environment | undefined {
    return undefined;
  }
}

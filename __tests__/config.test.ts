import { describe, expect, test } from '@jest/globals';

import Config, { AuthorizationFlowType } from '../src/config';
import { MessengerType } from '../src/messenger';
import Util, { Environment, ENVIRONMENTS } from '../src/util';

describe('Config', () => {
  describe('DefaultMessengerType', () => {
    test('should return MessengerType.Twitch when production environment set', () => {
      expect(Config.DefaultMessengerType(ENVIRONMENTS.PRODUCTION)).toBe(MessengerType.Twitch);
    });

    test('should return MessengerType.Server when server environment set', () => {
      expect(Config.DefaultMessengerType(ENVIRONMENTS.SERVER)).toBe(MessengerType.Server);
    });

    test('should return MessengerType.Unknown when invalid environment set', () => {
      const TestBadEnvironment: Environment = {
        environment: 'notarealenvironment'
      };

      expect(Config.DefaultMessengerType(TestBadEnvironment)).toBe(MessengerType.Unknown);
    });
  });

  describe('GetAuthorizationFlowType', () => {
    test('should return AuthorizationFlowType.TwitchAuth when production environment set', () => {
      expect(Config.GetAuthorizationFlowType(ENVIRONMENTS.PRODUCTION)).toBe(AuthorizationFlowType.TwitchAuth);
    });

    test('should return AuthorizationFlowType.AdminAuth when server environment set', () => {
      expect(Config.GetAuthorizationFlowType(ENVIRONMENTS.ADMIN)).toBe(AuthorizationFlowType.AdminAuth);
    });

    test('should return AuthorizationFlowType.Unknown when invalid environment set', () => {
      const TestBadEnvironment: Environment = {
        environment: 'notarealenvironment'
      };

      expect(Config.GetAuthorizationFlowType(TestBadEnvironment)).toBe(AuthorizationFlowType.Unknown);
    });
  });

  describe('CanUseTwitchAPIs', () => {
    test('should return true when SANDBOX_TWITCH environment set', () => {
      expect(Config.CanUseTwitchAPIs(ENVIRONMENTS.SANDBOX_TWITCH)).toBe(true);
    });
  });

  describe('GetServerURLs', () => {
    test('should return production urls for production environments', () => {
      const prod = {
        FakeAuthURL: 'https://api.muxy.io',
        PortalURL: 'https://dev.muxy.io',
        ServerURL: 'https://api.muxy.io'
      };

      expect(Config.GetServerURLs(Util.Environments.Production)).toEqual(prod);
    });

    test('should return sandbox urls for sandbox environments', () => {
      const sandbox = {
        FakeAuthURL: 'https://api.sandbox.muxy.io',
        PortalURL: 'https://dev.muxy.io',
        ServerURL: 'https://api.sandbox.muxy.io'
      };

      expect(Config.GetServerURLs(Util.Environments.SandboxAdmin)).toEqual(sandbox);
      expect(Config.GetServerURLs(Util.Environments.SandboxTwitch)).toEqual(sandbox);
      expect(Config.GetServerURLs(Util.Environments.SandboxDev)).toEqual(sandbox);
    });

    test('should return staging urls for staging environments', () => {
      const staging = {
        FakeAuthURL: 'https://api.staging.muxy.io',
        PortalURL: 'https://dev.staging.muxy.io',
        ServerURL: 'https://api.staging.muxy.io'
      };

      expect(Config.GetServerURLs(Util.Environments.StagingAdmin)).toEqual(staging);
      expect(Config.GetServerURLs(Util.Environments.StagingDev)).toEqual(staging);
    });

    test('should return localhost urls for testing environments', () => {
      const testing = {
        FakeAuthURL: 'http://localhost:5000',
        PortalURL: 'https://dev.staging.muxy.io',
        ServerURL: 'http://localhost:5000'
      };

      expect(Config.GetServerURLs(Util.Environments.Testing)).toEqual(testing);
    });

    test('should return sandbox urls for invalid environments', () => {
      const TestBadEnvironment: Environment = {
        environment: 'notarealenvironment'
      };

      const sandbox = {
        FakeAuthURL: 'https://api.sandbox.muxy.io',
        PortalURL: 'https://dev.muxy.io',
        ServerURL: 'https://api.sandbox.muxy.io'
      };

      expect(Config.GetServerURLs(TestBadEnvironment)).toEqual(sandbox);
    });
  });
});

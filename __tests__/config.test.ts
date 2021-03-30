import Config from '../src/config';
import { AuthorizationFlowType } from '../src/config';
import { MessengerType } from '../src/messenger';
import { Environment, ENVIRONMENTS } from '../src/util';

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
    test('should return localhost urls object when TESTING environment set', () => {
      const returnObj = {
        FakeAuthURL: 'http://localhost:5000',
        ServerURL: 'http://localhost:5000'
      };

      expect(Config.GetServerURLs(ENVIRONMENTS.TESTING)).toEqual(returnObj);
    });

    test('should return sandbox and api urls object when invalid environment set', () => {
      const TestBadEnvironment: Environment = {
        environment: 'notarealenvironment'
      };

      const returnObj = {
        FakeAuthURL: 'https://sandbox.api.muxy.io',
        ServerURL: 'https://api.muxy.io'
      };

      expect(Config.GetServerURLs(TestBadEnvironment)).toEqual(returnObj);
    });
  });
});

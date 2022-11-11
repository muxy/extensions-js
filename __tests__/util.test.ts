import { describe, expect, test } from '@jest/globals';

import Util from '../src/util';

// Convenience test harness for forceType.
function testForceType(value: any, expected: string) {
  return () => {
    Util.forceType(value, expected);
  };
}

describe('Util', () => {
  describe('errorPromise', () => {
    test('rejects immediately', () => {
      return expect(Util.errorPromise('error string')).rejects.toEqual('error string');
    });

    test('passes error string', () => {
      return expect(Util.errorPromise('error string')).rejects.toEqual('error string');
    });
  });

  describe('widestLine', () => {
    const testStringAry = ['Test String', 'Test String Two', 'Test String Three'];

    expect(Util.widestLine(testStringAry)).toBe(17);
  });

  describe('currentEnvironment', () => {
    describe('when running on Twitch', () => {
      test('uses production settings [Chrome]', () => {
        const twitchWindow = {
          location: {
            host: '<extension id>.ext-twitch.tv',
            ancestorOrigins: ['https://supervisor.ext-twitch.tv']
          }
        };

        expect(Util.currentEnvironment(twitchWindow)).toEqual(Util.Environments.Production);
      });

      test('uses production settings [Firefox]', () => {
        const twitchWindow = {
          location: { host: '<extension id>.ext-twitch.tv' },
          document: { referrer: 'https://supervisor.ext-twitch.tv' }
        };

        expect(Util.currentEnvironment(twitchWindow)).toEqual(Util.Environments.Production);
      });
    });

    describe('when running on localhost', () => {
      test('uses sandbox dev settings', () => {
        const localhostWindow = {
          location: { host: 'localhost:4000' }
        };

        expect(Util.currentEnvironment(localhostWindow)).toEqual(Util.Environments.SandboxDev);
      });
    });

    describe('when running in a hosted test', () => {
      test('uses production twitch settings [Chrome]', () => {
        const hostedTestWindow = {
          location: {
            host: '<extension client id>.ext-twitch.tv',
            ancestorOrigins: ['https://supervisor.ext-twitch.tv']
          }
        };

        expect(Util.currentEnvironment(hostedTestWindow)).toEqual(Util.Environments.Production);
      });

      test('uses production twitch settings [Firefox]', () => {
        const hostedTestWindow = {
          location: { host: '<extension client id>.ext-twitch.tv' },
          document: { referrer: 'https://supervisor.ext-twitch.tv' }
        };

        expect(Util.currentEnvironment(hostedTestWindow)).toEqual(Util.Environments.Production);
      });
    });

    describe('when running on dev portal', () => {
      test('uses admin settings [Chrome]', () => {
        const adminWindow = {
          location: {
            host: '<admin url>',
            ancestorOrigins: ['https://dev.muxy.io']
          }
        };

        expect(Util.currentEnvironment(adminWindow)).toEqual(Util.Environments.Admin);
      });

      test('uses admin settings [Firefox]', () => {
        const adminWindow = {
          location: { host: '<admin url>' },
          document: { referrer: 'https://dev.muxy.io' }
        };

        expect(Util.currentEnvironment(adminWindow)).toEqual(Util.Environments.Admin);
      });
    });

    describe('when running on staging dev portal', () => {
      test('uses staging admin settings [Chrome]', () => {
        const adminWindow = {
          location: {
            host: '<admin url>',
            ancestorOrigins: ['https://dev.staging.muxy.io']
          }
        };

        expect(Util.currentEnvironment(adminWindow)).toEqual(Util.Environments.StagingAdmin);
      });

      test('uses staging admin settings [Firefox]', () => {
        const adminWindow = {
          location: {
            host: '<admin url>'
          },
          document: { referrer: 'https://dev.staging.muxy.io' }
        };

        expect(Util.currentEnvironment(adminWindow)).toEqual(Util.Environments.StagingAdmin);
      });
    });
  });

  describe('eventPatternMatch', () => {
    test('correctly matches valid patterns', () => {
      expect(Util.eventPatternMatch('a:b:c', 'a:b:c')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', 'a:b:*')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', 'a:*:c')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', '*:b:c')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', '*:*:c')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', '*:b:*')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', '*:*:*')).toBe(true);
    });

    test('does not match invalid patterns', () => {
      expect(Util.eventPatternMatch('a:b:c', 'a:b')).toBe(false);
      expect(Util.eventPatternMatch('a:b:c', 'a:b:**')).toBe(false);
      expect(Util.eventPatternMatch('a:b:c', 'a:b:d')).toBe(false);
      expect(Util.eventPatternMatch('a:b:c', '*:*')).toBe(false);
      expect(Util.eventPatternMatch('a:b:c', 'a:b:c*')).toBe(false);
      expect(Util.eventPatternMatch('a:b:c', 'a:b:c:d')).toBe(false);
      expect(Util.eventPatternMatch('a:b:c', 'a:b:c:*')).toBe(false);
    });
  });

  describe('forceType', () => {
    test('correctly identifies the basic types', () => {
      const testUndefined = undefined;
      const testBoolean = true;
      const testNumber = 123;
      const testString = 'a';
      const testFunction = new Function();
      const testObject = {};

      expect(testForceType(testUndefined, 'undefined')).not.toThrow();
      expect(testForceType(testBoolean, 'boolean')).not.toThrow();
      expect(testForceType(testNumber, 'number')).not.toThrow();
      expect(testForceType(testString, 'string')).not.toThrow();
      expect(testForceType(testFunction, 'function')).not.toThrow();
      expect(testForceType(testObject, 'object')).not.toThrow();
    });

    test('correctly detects incorrect types', () => {
      const testUndefined = undefined;
      const testBoolean = true;
      const testNumber = 123;
      const testString = 'a';
      const testFunction = new Function();
      const testObject = {};

      expect(testForceType(testUndefined, 'boolean')).toThrow(TypeError);
      expect(testForceType(testBoolean, 'number')).toThrow(TypeError);
      expect(testForceType(testNumber, 'boolean')).toThrow(TypeError);
      expect(testForceType(testString, 'boolean')).toThrow(TypeError);
      expect(testForceType(testFunction, 'boolean')).toThrow(TypeError);
      expect(testForceType(testObject, 'boolean')).toThrow(TypeError);
    });
  });
});

import Util from '../src/util';

// Convenience test harness for forceType.
function testForceType(value: any, expected: string) {
  return function() {
    Util.forceType(value, expected);
  };
}

describe('Util', () => {
  describe('errorPromise', () => {
    it('rejects immediately', () => {
      return expect(Util.errorPromise('error string')).rejects.toEqual('error string');
    });

    it('passes error string', () => {
      return expect(Util.errorPromise('error string')).rejects.toEqual('error string');
    });
  });

  describe('widestLine', () => {
    const testStringAry = ['Test String', 'Test String Two', 'Test String Three'];

    expect(Util.widestLine(testStringAry)).toBe(17);
  });

  describe('currentEnvironment', () => {
    it('correctly detects a sandbox development environment', () => {
      const sandboxWindow = {
        location: {
          origin: 'http://localhost:4000'
        },
        document: {
          referrer: ''
        }
      };
      expect(Util.currentEnvironment(sandboxWindow)).toEqual(Util.Environments.SandboxDev);
    });

    it('correctly detects a sandbox twitch environment', () => {
      const stagingWindow = {
        location: {
          origin: 'http://localhost:4000'
        },
        document: {
          referrer: 'https://www.twitch.tv/test/dashboard'
        }
      };
      expect(Util.currentEnvironment(stagingWindow)).toEqual(Util.Environments.SandboxTwitch);
    });

    it('correctly detects a production environment', () => {
      const productionWindow = {
        location: {
          origin: 'http://<extension id>.ext-twitch.tv'
        },
        document: {
          referrer: 'https://www.twitch.tv/test/dashboard'
        },
        top: {},
        parent: {},
        opener: null
      };
      expect(Util.currentEnvironment(productionWindow)).toEqual(Util.Environments.Production);
    });
  });

  describe('eventPatternMatch', () => {
    it('correctly matches valid patterns', () => {
      expect(Util.eventPatternMatch('a:b:c', 'a:b:c')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', 'a:b:*')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', 'a:*:c')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', '*:b:c')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', '*:*:c')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', '*:b:*')).toBe(true);
      expect(Util.eventPatternMatch('a:b:c', '*:*:*')).toBe(true);
    });

    it('does not match invalid patterns', () => {
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
    it('correctly identifies the basic types', () => {
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

    it('correctly detects incorrect types', () => {
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

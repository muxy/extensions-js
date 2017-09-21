import chai from 'chai';
import Util from '../src/util';

const assert = chai.assert;
const should = chai.should();

// Convenience test harness for forceType.
function testForceType(value, expected) {
  return function() {
    Util.forceType(value, expected);
  };
}

/** @test {Util} */
describe('Util', () => {
  /** @test {Util.errorPromise} */
  describe('errorPromise', () => {
    it('rejects immediately', () =>
      Util.errorPromise('error string')
        .then(() => {
          throw new Error('fail');
        })
        .catch(data => {
          assert(true);
        }));

    it('passes error string', () =>
      Util.errorPromise('error string').catch(data => {
        data.should.equal('error string');
      }));
  });

  /** @test {Util.currentEnvironment} */
  describe('currentEnvironment', () => {
    /** @test {Util.currentEnvironment#SANDBOX_DEV} */
    it('correctly detects a sandbox development environment', () => {
      const sandboxWindow = {
        location: {
          origin: 'http://localhost:4000'
        },
        document: {
          referrer: ''
        }
      };
      Util.currentEnvironment(sandboxWindow).should.equal(Util.Environments.SandboxDev);
    });

    /** @test {Util.currentEnvironment#SANDBOX_TWITCH} */
    it('correctly detects a sandbox twitch environment', () => {
      const stagingWindow = {
        location: {
          origin: 'http://localhost:4000'
        },
        document: {
          referrer: 'https://www.twitch.tv/test/dashboard'
        }
      };
      Util.currentEnvironment(stagingWindow).should.equal(Util.Environments.SandboxTwitch);
    });

    /** @test {Util.currentEnvironment#PRODUCTION} */
    it('correctly detects a production environment', () => {
      const productionWindow = {
        location: {
          origin: 'http://<extension id>.ext-twitch.tv'
        },
        document: {
          referrer: 'https://www.twitch.tv/test/dashboard'
        }
      };
      Util.currentEnvironment(productionWindow).should.equal(Util.Environments.Production);
    });
  });

  /** @test {eventPatternMatch} */
  describe('eventPatternMatch', () => {
    it('correctly matches valid patterns', () => {
      Util.eventPatternMatch('a:b:c', 'a:b:c').should.be.true;
      Util.eventPatternMatch('a:b:c', 'a:b:*').should.be.true;
      Util.eventPatternMatch('a:b:c', 'a:*:c').should.be.true;
      Util.eventPatternMatch('a:b:c', '*:b:c').should.be.true;
      Util.eventPatternMatch('a:b:c', '*:*:c').should.be.true;
      Util.eventPatternMatch('a:b:c', '*:b:*').should.be.true;
      Util.eventPatternMatch('a:b:c', '*:*:*').should.be.true;
    });

    it('does not match invalid patterns', () => {
      Util.eventPatternMatch('a:b:c', 'a:b').should.be.false;
      Util.eventPatternMatch('a:b:c', 'a:b:**').should.be.false;
      Util.eventPatternMatch('a:b:c', 'a:b:d').should.be.false;
      Util.eventPatternMatch('a:b:c', '*:*').should.be.false;
      Util.eventPatternMatch('a:b:c', 'a:b:c*').should.be.false;
      Util.eventPatternMatch('a:b:c', 'a:b:c:d').should.be.false;
      Util.eventPatternMatch('a:b:c', 'a:b:c:*').should.be.false;
    });
  });

  /** @test {forceType} */
  describe('forceType', () => {
    it('correctly identifies the basic types', () => {
      const testUndefined = undefined;
      const testBoolean = true;
      const testNumber = 123;
      const testString = 'a';
      const testFunction = new Function();
      const testObject = {};

      should.not.throw(testForceType(testUndefined, 'undefined'));
      should.not.throw(testForceType(testBoolean, 'boolean'));
      should.not.throw(testForceType(testNumber, 'number'));
      should.not.throw(testForceType(testString, 'string'));
      should.not.throw(testForceType(testFunction, 'function'));
      should.not.throw(testForceType(testObject, 'object'));
    });

    it('correctly detects incorrect types', () => {
      const testUndefined = undefined;
      const testBoolean = true;
      const testNumber = 123;
      const testString = 'a';
      const testFunction = new Function();
      const testObject = {};

      should.throw(testForceType(testUndefined, 'boolean'), TypeError);
      should.throw(testForceType(testBoolean, 'number'), TypeError);
      should.throw(testForceType(testNumber, 'boolean'), TypeError);
      should.throw(testForceType(testString, 'boolean'), TypeError);
      should.throw(testForceType(testFunction, 'boolean'), TypeError);
      should.throw(testForceType(testObject, 'boolean'), TypeError);
    });
  });
});

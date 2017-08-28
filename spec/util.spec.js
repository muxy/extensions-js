import chai from 'chai';
const assert = chai.assert;

import {
  ENVIRONMENTS,
  errorPromise,
  CurrentEnvironment,
  eventPatternMatch,
  forceType
} from '../src/util';

const should = chai.should();

// Convenience test harness for forceType.
function testForceType(value, expected) {
  return function () {
    forceType(value, expected);
  }
}

/** @test {errorPromise} */
describe('errorPromise', () => {
  it('rejects immediately', () =>
    errorPromise('error string')
      .then(() => {
        throw new Error('fail');
      })
      .catch((data) => {
        assert(true);
      }));

  it('passes error string', () =>
    errorPromise('error string').catch((data) => {
      data.should.equal('error string');
    }));
});

/** @test {currentEnvironment} */
describe('currentEnvironment', () => {
  /** @test {currentEnvironment#SANDBOX_TWITCH} */
  it('correctly detects a staging environment', () => {
    const stagingWindow = {
      location: {
        origin: 'http://localhost:4000'
      },
      document: {
        referrer: 'https://www.twitch.tv/test/dashboard'
      }
    };
    CurrentEnvironment(stagingWindow).should.equal(ENVIRONMENTS.SANDBOX_TWITCH);
  });

  /** @test {currentEnvironment#PRODUCTION} */
  it('correctly detects a production environment', () => {
    const productionWindow = {
      location: {
        origin: 'http://<extension id>.ext-twitch.tv'
      },
      document: {
        referrer: 'https://www.twitch.tv/test/dashboard'
      }
    };
    CurrentEnvironment(productionWindow).should.equal(ENVIRONMENTS.PRODUCTION);
  });
});

/** @test {eventPatternMatch} */
describe('eventPatternMatch', () => {
  it('correctly matches valid patterns', () => {
    eventPatternMatch('a:b:c', 'a:b:c').should.be.true;
    eventPatternMatch('a:b:c', 'a:b:*').should.be.true;
    eventPatternMatch('a:b:c', 'a:*:c').should.be.true;
    eventPatternMatch('a:b:c', '*:b:c').should.be.true;
    eventPatternMatch('a:b:c', '*:*:c').should.be.true;
    eventPatternMatch('a:b:c', '*:b:*').should.be.true;
    eventPatternMatch('a:b:c', '*:*:*').should.be.true;
  });

  it('does not match invalid patterns', () => {
    eventPatternMatch('a:b:c', 'a:b').should.be.false;
    eventPatternMatch('a:b:c', 'a:b:**').should.be.false;
    eventPatternMatch('a:b:c', 'a:b:d').should.be.false;
    eventPatternMatch('a:b:c', '*:*').should.be.false;
    eventPatternMatch('a:b:c', 'a:b:c*').should.be.false;
    eventPatternMatch('a:b:c', 'a:b:c:d').should.be.false;
    eventPatternMatch('a:b:c', 'a:b:c:*').should.be.false;
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

import chai from 'chai';
var assert = chai.assert;

import {
  ENVIRONMENTS, errorPromise, CurrentEnvironment, eventPatternMatch
} from '../src/util';

chai.should();

/** @test {errorPromise} */
describe('errorPromise', function () {
  it('rejects immediately', function () {
    return errorPromise('error string')
      .then(() => {
        throw new Error("fail");
      })
      .catch(data => {
      assert(true);
    });
  });

  it('passes error string', function () {
    return errorPromise('error string').catch(data => {
      data.should.equal('error string');
    });
  });
});

/** @test {currentEnvironment} */
describe('currentEnvironment', function () {
    /** @test {currentEnvironment#SANDBOX_TWITCH} */
  it('correctly detects a staging environment', function () {
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
  it('correctly detects a production environment', function () {
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
describe('eventPatternMatch', function() {
  it('correctly matches valid patterns', function () {
    eventPatternMatch('a:b:c', 'a:b:c').should.be.true;
    eventPatternMatch('a:b:c', 'a:b:*').should.be.true;
    eventPatternMatch('a:b:c', 'a:*:c').should.be.true;
    eventPatternMatch('a:b:c', '*:b:c').should.be.true;
    eventPatternMatch('a:b:c', '*:*:c').should.be.true;
    eventPatternMatch('a:b:c', '*:b:*').should.be.true;
    eventPatternMatch('a:b:c', '*:*:*').should.be.true;
  });

  it('does not match invalid patterns', function() {
    eventPatternMatch('a:b:c', 'a:b').should.be.false;
    eventPatternMatch('a:b:c', 'a:b:**').should.be.false;
    eventPatternMatch('a:b:c', 'a:b:d').should.be.false;
    eventPatternMatch('a:b:c', '*:*').should.be.false;
    eventPatternMatch('a:b:c', 'a:b:c*').should.be.false;
    eventPatternMatch('a:b:c', 'a:b:c:d').should.be.false;
    eventPatternMatch('a:b:c', 'a:b:c:*').should.be.false;
  });
})
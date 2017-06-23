import chai from 'chai';
var assert = chai.assert;

import {
  ENVIRONMENTS, errorPromise, currentEnvironment
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
  /** @test {currentEnvironment#DEV} */
  it('correctly detects a dev environment', function () {
    const devWindow = {
      location: {
        origin: 'http://localhost:4000'
      }
    };
    currentEnvironment(devWindow).should.equal(ENVIRONMENTS.DEV);
  });

  /** @test {currentEnvironment#STAGING} */
  it('correctly detects a staging environment', function () {
    const stagingWindow = {
      location: {
        origin: 'http://<extension id>.ext-twitch.tv'
      },
      document: {
        referrer: 'http://localhost:4000'
      }
    };
    currentEnvironment(stagingWindow).should.equal(ENVIRONMENTS.STAGING);
  });

  /** @test {currentEnvironment#PRODUCTION} */
  it('correctly detects a production environment', function () {
    const productionWindow = {
      location: {
        origin: 'http://<extension id>.ext-twitch.tv'
      },
      document: {
        referrer: 'https://twitch.tv'
      }
    };
    currentEnvironment(productionWindow).should.equal(ENVIRONMENTS.PRODUCTION);
  });
});
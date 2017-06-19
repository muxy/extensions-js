import chai from 'chai';
var assert = chai.assert;

import { errorPromise, inIframe, parseJSONObject } from '../src/util';

chai.should();

describe('error promise', function () {
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

describe('inIframe', function () {
  it('correctly detects an embedded iframe', function () {
    // NOTE: The karma tests run inside an iframe inside the headless browser.
    inIframe().should.equal(true);
  });
});

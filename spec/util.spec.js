import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { errorPromise, inIframe, parseJSONObject } from '../src/util';

chai.should();
chai.use(chaiAsPromised)

var assert = chai.assert;

describe('errorPromise', function() {
  it('rejects immediately', function() {
    return errorPromise('error string').should.be.rejected;
  });

  it('passes error string', function() {
    return errorPromise('error string').should.be.rejectedWith('error string');
  });
});

describe('inIframe', function() {
  it('correctly detects an embedded iframe', function() {
    // NOTE: The karma tests run inside an iframe inside the headless browser.
    inIframe().should.equal(true);
  });
});

describe('parseJSONObject', function () {
  /*
  it('correctly bypasses parsed objects', function () {
    var t1 = { a: 1 };
    var t2 = { a: { b: [1] } };
    parseJSONObject(t1).should.nested.include({ 'a': 1 });
    parseJSONObject(t2).should.nested.include({ 'a.b[0]': 1 });
  });

  it('correctly parses single-level objects', function () {
    var t1 = { a: '{ "b": 1 }' };
    parseJSONObject(t1).should.nested.include({ 'a.b': 1 });
  });
  */

  it('correctly parses nested objects', function () {
    var t1 = { a: '{ "b": "{ "c": "{ "d": 1 }" }" }' };
    parseJSONObject(t1).should.nested.include({ 'a.b.c.d': 1 });
  });
});
import chai from 'chai';

import Muxy from '../src/muxy';

const should = chai.should();

describe('Muxy', function() {
  it('can be created', function() {
    const mxy = new Muxy();
    mxy.setupCalled.should.equal(false);
  });

  it('cannot create SDK objects before setup', function() {
    const mxy = new Muxy();
    should.throw(function() {
      mxy.SDK();
    }, Error);
  });

  it('can be set up', function() {
    const mxy = new Muxy();
    should.not.throw(function() {
      mxy.setup({
        extensionID: 'testextensionid',
        quiet: true
      });
    });
  });

  it('cannot call setup() twice', function() {
    const mxy = new Muxy();
    mxy.setup({ extensionID: 'testextensionid', quiet: true });
    should.throw(function() {
      mxy.setup({ extensionID: 'textextensionid', quiet: true });
    }, Error);
  });
});

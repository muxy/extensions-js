import chai from 'chai';

import Muxy from '../src/muxy';

const should = chai.should();

describe('Muxy', () => {
  beforeEach(() => {
    // Reset Muxy object.
    Muxy.SDKClients = {};
    Muxy.twitchClientID = null;
    Muxy.cachedTwitchClient = null;
    Muxy.client = null;
    Muxy.messenger = null;
    Muxy.analytics = null;
    Muxy.context = {};
    Muxy.user = null;
    Muxy.loadPromise = new Promise((resolve, reject) => {
      Muxy.loadResolve = resolve;
      Muxy.loadReject = reject;
    });
    Muxy.setupCalled = false;
  });

  it('is a singleton object', () => {
    should.throw(() => {
      const mxy = new Muxy();
    }, TypeError);

    Muxy.setupCalled.should.equal(false);
  });

  it('cannot create SDK objects before setup', () => {
    should.throw(() => {
      const sdk = new Muxy.SDK();
    }, Error);
  });

  it('can be set up', () => {
    should.not.throw(() => {
      Muxy.setup({
        extensionID: 'testextensionid',
        quiet: true
      });
    });
  });

  it('cannot call setup() twice', () => {
    Muxy.setup({ extensionID: 'testextensionid', quiet: true });
    should.throw(() => {
      Muxy.setup({ extensionID: 'textextensionid', quiet: true });
    }, Error);
  });

  it('can create new SDK instances', () => {
    Muxy.setup({ extensionID: 'testextensionid', quiet: true });
    const sdk = Muxy.SDK();
  });

  it('can create new SDK instances with new scope', () => {
    Muxy.setup({ extensionID: 'testextensionid', quiet: true });
    const sdk = new Muxy.SDK();
  });
});

import chai from 'chai';

import Muxy from '../src/muxy';

const should = chai.should();

const someJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MjE0NzQ4MzY0Nywib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAifQ.0a5_yR6bTc2V4boC0kH_0mz2v34dJQq4p1iOBA70lt4';

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

  it('cannot create SDK objects before setup', () => {
    should.throw(() => {
      const sdk = new Muxy.SDK();
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

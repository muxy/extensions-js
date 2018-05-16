import Muxy from '../src/muxy';

const someJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MjE0NzQ4MzY0Nywib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAifQ.0a5_yR6bTc2V4boC0kH_0mz2v34dJQq4p1iOBA70lt4';

describe('Muxy', () => {
  beforeEach(() => {
    // The pusher SDK likes to hang jest unless we disconnect
    if (Muxy.messenger) {
      Muxy.messenger.close();
    }

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
    expect(() => {
      const mxy = new Muxy();
    }).toThrow();

    expect(Muxy.setupCalled).toBe(false);
  });

  it('needs an extension client id to setup', () => {
    expect(() => {
      Muxy.setup({ quiet: true });
    }).toThrow();
  });

  it('can be set up', () => {
    expect(() => {
      Muxy.setup({
        extensionID: 'testextensionid',
        quiet: true
      });
    }).not.toThrow();
  });

  it('cannot call setup() twice', () => {
    Muxy.setup({ extensionID: 'testextensionid', quiet: true });
    expect(() => {
      Muxy.setup({ extensionID: 'textextensionid', quiet: true });
    }).toThrow();
  });

  it('accepts client id on setup', () => {
    Muxy.setup({ clientID: 'testextensionid', quiet: true });
  });

  it('cannot create SDK objects before setup', () => {
    expect(() => {
      const sdk = new Muxy.SDK();
    }).toThrow();
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
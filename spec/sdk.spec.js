import chai from 'chai';

import Analytics from '../src/analytics';
import Messenger from '../src/messenger';
import SDK from '../src/sdk';
import StateClient from '../src/state-client';
import User from '../src/user';

const should = chai.should();

const someJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MjE0NzQ4MzY0Nywib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAifQ.0a5_yR6bTc2V4boC0kH_0mz2v34dJQq4p1iOBA70lt4';

describe('SDK', () => {
  beforeEach(() => {
    const prom = Promise.resolve();

    const analytics = new Analytics('ua-string', prom);
    const client = new StateClient();
    const messenger = new Messenger();
  });

  it('can be created', () => {
    const sdk = new SDK();
  });
});

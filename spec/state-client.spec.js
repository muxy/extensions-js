import chai from 'chai';
import sinon from 'sinon';

import StateClient from '../src/state-client';

const should = chai.should();

// Expiration is set to end of unix epoch time
const someJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MjE0NzQ4MzY0Nywib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAifQ.0a5_yR6bTc2V4boC0kH_0mz2v34dJQq4p1iOBA70lt4';
const expiredJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MTQ5Nzk5MDQzMiwib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAifQ.s49uwSdy9C7KyubpYQPtJfuN4q_-9a-nuG4MxnIvoBo';

function assertPromiseFails(prom) {
  return prom
    .then(() => {
      throw new Error("Promise didn't fail");
    })
    .catch(() => {
      assert(true);
    });
}

function rankOK(body) {
  return [200, { 'Content-type': 'application/json' }, JSON.stringify(body)];
}

/** @test {StateClient} */
describe('StateClient', () => {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });

  afterEach(function() {
    this.server.restore();
  });

  /** @test {StateClient#validateJWT} */
  it('should fail with invalid JWT', () => {
    const client = new StateClient();
    return assertPromiseFails(client.getRank());
  });

  /** @test {StateClient#validateJWT} */
  it('should fail with an expired JWT', () => {
    const client = new StateClient();
    client.updateAuth(expiredJWT);
    return assertPromiseFails(client.getRank());
  });

  /** @test {StateClient#getRank} */
  it('should make a request', function() {
    this.server.respondWith('GET', 'https://api.muxy.io/v1/e/rank?id=default', rankOK({ data: [] }));

    const client = new StateClient();
    client.updateAuth(someJWT);

    const out = client
      .getRank()
      .then(data => {
        data.should.have.property('data').with.lengthOf(0);
      })
      .catch(data => {
        throw new Error('Request was unsuccessful');
      });

    this.server.respond();
    return out;
  });

  /** @test {StateClient#getRank} */
  it('should fail on invalid json', function() {
    this.server.respondWith('GET', 'https://api.muxy.io/v1/e/rank?id=default', [
      200,
      {
        'Content-Type': 'application/json'
      },
      '{ asfsafasdfaf }'
    ]);

    const client = new StateClient();
    client.updateAuth(someJWT);

    const promise = assertPromiseFails(client.getRank());
    this.server.respond();

    return promise;
  });
});

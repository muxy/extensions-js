import chai from 'chai';
import sinon from 'sinon'
import StateClient from '../src/state-client';

var assert = chai.assert;
chai.should();

// Expiration is set to end of unix epoch time
const someJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MjE0NzQ4MzY0Nywib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAifQ.0a5_yR6bTc2V4boC0kH_0mz2v34dJQq4p1iOBA70lt4";
const expiredJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MTQ5Nzk5MDQzMiwib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAifQ.s49uwSdy9C7KyubpYQPtJfuN4q_-9a-nuG4MxnIvoBo";

let server;

function assertPromiseFails(prom) {
  return prom
    .then(() => { throw new Error('Promise didn\'t fail'); })
    .catch(() => { assert(true); });
}

function rankOK(body) {
  return [
    200,
    { 'Content-type': 'application/json' },
    JSON.stringify(body)
  ];
}

/** @test {StateClient} */
describe('StateClient', function () {
  beforeEach(function () {
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
  });

  /** @test {StateClient#validateJWT} */
  it('should fail with invalid JWT', function () {
    const client = new StateClient();
    assertPromiseFails(client.getRank());
  });

  /** @test {StateClient#validateJWT} */
  it('should fail with an expired JWT', function () {
    const client = new StateClient();
    client.updateAuth(expiredJWT);
    assertPromiseFails(client.getRank());
  });

  /** @test {StateClient#getRank} */
  it('should make a request', function () {
    server.respondWith('GET', 'https://api.muxy.io/v1/e/rank', rankOK({
      data: []
    }));

    const client = new StateClient();
    client.updateAuth(someJWT);

    const out = client.getRank().then(data => {
      data.should.have.property('data').with.lengthOf(0);
    }).catch(data => {
      throw new Error('Request was unsuccessful');
    });

    server.respond();
    return out;
  });

  /** @test {StateClient#getRank} */
  it('should fail on invalid json', function () {
    server.respondWith('GET', 'https://api.muxy.io/v1/e/rank', [
      200,
      {
        'Content-Type': 'application/json'
      },
      '{ asfsafasdfaf }'
    ]);

    const client = new StateClient();
    client.updateAuth(someJWT);
    const out = assertPromiseFails(client.getRank());

    // server.respond() must be called after the then/catch callbacks are connected.
    server.respond();
    return out;
  });
});

import chai from 'chai';
import sinon from 'sinon'
import StateClient from '../src/state-client';

var assert = chai.assert;
chai.should();

// Expiration is set to end of unix epoch time
const someJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MjE0NzQ4MzY0Nywib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAiLCJleHRlbnNpb25fc2VjcmV0IjoiZmR2WlRoeStPSXRMYXQzU3lJQUx2N0swMWJseXREWGNJaUVNZFhiZGxsTT0ifQ.c66keo9CG-ul_ZxHlTAYtSmIMKSLFUAwtr05X2uu5Dk";

let server;

describe('State Client', function () {
  beforeEach(function () {
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
  });

  it('should fail with invalid JWT', function () {
    const client = new StateClient('','','');
    const resp = client.getRank();

    return resp
      .then(() => {
        throw new Error("fail");
      })
      .catch(data => {
        assert(true);
      });
  });

  it('should make a request', function () {
    server.respondWith("GET", "https://api.muxy.io/v1/e/rank", [200, { "Content-Type": "application/json" },
      '{ "data": [] }']);

    const client = new StateClient('', someJWT, '');
    const resp = client.getRank();
    server.respond();

    return resp
      .then(data => {
        data.should.have.property('data').with.lengthOf(0);
      })
      .catch(data => {
        throw new Error("request was unsuccessful");
      });
  });

  it('should fail on invalid json', function () {
    server.respondWith("GET", "https://api.muxy.io/v1/e/rank", [200, { "Content-Type": "application/json" },
      '{ asfsafasdfaf }']);

    const client = new StateClient('', someJWT, '');
    const resp = client.getRank();
    server.respond();

    return resp
      .then(data => {
        throw new Error("fail");
      })
      .catch(data => {
        assert(true);
      });
  });
});

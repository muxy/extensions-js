import StateClient from '../src/state-client';
import { ENVIRONMENTS } from '../src/util';

jest.mock('../libs/xhr-promise');
import * as mockXHR from '../libs/xhr-promise';
import { DebugOptions } from '../src/debug';

const clientId = 'test-id';

const expiredJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MTQ5Nzk5MDQzMiwib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAifQ.s49uwSdy9C7KyubpYQPtJfuN4q_-9a-nuG4MxnIvoBo';

describe('StateClient', () => {
  const loadedPromise = Promise.resolve();
  const adminClient = new StateClient(loadedPromise, {} as DebugOptions);
  const broadcasterClient = new StateClient(loadedPromise, {} as DebugOptions);
  const viewerClient = new StateClient(loadedPromise, {} as DebugOptions);

  beforeAll(async () => {
    StateClient.setEnvironment(ENVIRONMENTS.SANDBOX_DEV, {} as DebugOptions);
  });

  beforeEach(async () => {
    // @ts-ignore
    mockXHR.reset();

    await StateClient.fetchTestAuth(clientId, {
      channelID: '12345',
      role: 'admin'
    }).then(adminAuth => {
      adminClient.updateAuth(adminAuth.token);
    });
    await StateClient.fetchTestAuth(clientId, {
      channelID: '12345',
      role: 'broadcaster'
    }).then(broadcasterAuth => {
      broadcasterClient.updateAuth(broadcasterAuth.token);
    });
    await StateClient.fetchTestAuth(clientId, {
      channelID: '12345',
      role: 'viewer'
    }).then(viewerAuth => {
      viewerClient.updateAuth(viewerAuth.token);
    });
  });

  it('should fail with invalid JWT', async () => {
    const client = new StateClient(loadedPromise, {});
    await expect(client.getRank(clientId, 'empty')).rejects.toEqual('Your authentication token has expired.');
  });

  it('should fail with an expired JWT', async () => {
    const client = new StateClient(loadedPromise, {});
    client.updateAuth(expiredJWT);
    await expect(client.getRank(clientId, 'empty')).rejects.toEqual('Your authentication token has expired.');
  });

  it('should make a request', async () => {
    await expect(viewerClient.getRank(clientId, 'empty')).resolves.toEqual({
      data: []
    });
  });

  it('should use request hooks', async () => {
    const requestHook = jest.fn(x => x);
    viewerClient.hooks.requests.add(requestHook);

    await expect(viewerClient.getViewerState(clientId)).resolves.toEqual({});
    expect(requestHook.mock.calls.length).toBe(1);
  });

  it('should allow removing hooks', async () => {
    const requestHook = jest.fn(x => x);
    const hookId = viewerClient.hooks.requests.add(requestHook);

    await expect(viewerClient.getViewerState(clientId)).resolves.toEqual({});
    expect(requestHook.mock.calls.length).toBe(1);

    viewerClient.hooks.requests.remove(hookId);

    await expect(viewerClient.getViewerState(clientId)).resolves.toEqual({});
    expect(requestHook.mock.calls.length).toBe(1);
  });

  it('should use successful response hooks', async () => {
    const responseHook = jest.fn();
    const errResponseHook = jest.fn();
    viewerClient.hooks.responses.add(responseHook, errResponseHook);

    // @ts-ignore
    mockXHR.__queueResponseMock('{"state":"hello"}');

    expect(await viewerClient.getViewerState(clientId)).resolves;

    expect(errResponseHook.mock.calls.length).toBe(0);
    expect(responseHook.mock.calls.length).toBe(1);
    expect(responseHook.mock.calls[0][0]).toEqual({
      state: 'hello'
    });
  });

  it('should use error response hooks', async () => {
    const client = new StateClient(loadedPromise, {});

    const responseHook = jest.fn();
    const errResponseHook = jest.fn();
    client.hooks.responses.add(responseHook, errResponseHook);

    expect(await client.getViewerState(clientId)).rejects;

    expect(responseHook.mock.calls.length).toBe(0);
    expect(errResponseHook.mock.calls.length).toBe(1);
  });

  it('sets and gets viewer state', async () => {
    const client = new StateClient(loadedPromise, {});
    const auth = await StateClient.fetchTestAuth(clientId, {
      channelID: '12345',
      role: 'viewer'
    });
    client.updateAuth(auth.token);

    expect(
      await client.setViewerState(clientId, {
        state: 'hello'
      })
    ).resolves;

    // @ts-ignore
    mockXHR.__queueResponseMock('{"state":"hello"}');

    await expect(client.getViewerState(clientId)).resolves.toEqual({ state: 'hello' });

    await expect(client.getState(clientId)).resolves.toMatchObject({
      viewer: {
        state: 'hello'
      }
    });
  });
});

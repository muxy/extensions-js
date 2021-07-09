import StateClient  from '../src/state-client';

import * as mockXHR from '../libs/xhr-promise';
import { DebugOptions } from '../src/debug';
import Util from '../src/util';

jest.mock('../libs/xhr-promise');

const ClientId = 'testing-client-id';

describe('StateClient Hooks', () => {
  const loadedPromise = Promise.resolve();

  const adminClient = new StateClient(loadedPromise, {} as DebugOptions);
  const broadcasterClient = new StateClient(loadedPromise, {} as DebugOptions);
  const viewerClient = new StateClient(loadedPromise, {} as DebugOptions);

  beforeAll(async () => {
    StateClient.setEnvironment(Util.Environments.Testing, {} as DebugOptions);
  });

  beforeEach(async () => {
    mockXHR.reset();

    await StateClient.fetchTestAuth(ClientId, {
      channelID: '12345',
      role: 'admin'
    }).then(adminAuth => {
      adminClient.updateAuth(adminAuth.token);
    });
    await StateClient.fetchTestAuth(ClientId, {
      channelID: '12345',
      role: 'broadcaster'
    }).then(broadcasterAuth => {
      broadcasterClient.updateAuth(broadcasterAuth.token);
    });
    await StateClient.fetchTestAuth(ClientId, {
      channelID: '12345',
      role: 'viewer'
    }).then(viewerAuth => {
      viewerClient.updateAuth(viewerAuth.token);
    });
  });

  test('should use request hooks', async () => {
    const requestHook = jest.fn(x => x);
    viewerClient.hooks.requests.add(requestHook);

    await expect(viewerClient.getViewerState(ClientId)).resolves.toEqual({});
    expect(requestHook.mock.calls.length).toBe(1);
  });

  test('should allow removing hooks', async () => {
    const requestHook = jest.fn(x => x);
    const hookId = viewerClient.hooks.requests.add(requestHook);

    await expect(viewerClient.getViewerState(ClientId)).resolves.toEqual({});
    expect(requestHook.mock.calls.length).toBe(1);

    viewerClient.hooks.requests.remove(hookId);

    await expect(viewerClient.getViewerState(ClientId)).resolves.toEqual({});
    expect(requestHook.mock.calls.length).toBe(1);
  });

  test('should use successful response hooks', async () => {
    const responseHook = jest.fn();
    const errResponseHook = jest.fn();
    viewerClient.hooks.responses.add(responseHook, errResponseHook);

    mockXHR.__queueResponseMock('{"state":"hello"}');

    expect(await viewerClient.getViewerState(ClientId)).resolves;

    expect(errResponseHook.mock.calls.length).toBe(0);
    expect(responseHook.mock.calls.length).toBe(1);
    expect(responseHook.mock.calls[0][0]).toEqual({
      state: 'hello'
    });
  });

  test('should use error response hooks', async () => {
    const client = new StateClient(loadedPromise, {});

    const responseHook = jest.fn();
    const errResponseHook = jest.fn();
    client.hooks.responses.add(responseHook, errResponseHook);

    expect(await client.getViewerState(ClientId)).rejects;

    expect(responseHook.mock.calls.length).toBe(0);
    expect(errResponseHook.mock.calls.length).toBe(1);
  });
});

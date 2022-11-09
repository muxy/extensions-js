import { beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals';

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

  test('fails with invalid JWT', async () => {
    const client = new StateClient(loadedPromise, {});
    await expect(client.getRank(clientId, 'empty')).rejects.toEqual('Your authentication token has expired.');
  });

  test('fails with an expired JWT', async () => {
    const client = new StateClient(loadedPromise, {});
    client.updateAuth(expiredJWT);
    await expect(client.getRank(clientId, 'empty')).rejects.toEqual('Your authentication token has expired.');
  });

  test('makes a request', async () => {
    await expect(viewerClient.getRank(clientId, 'empty')).resolves.toEqual({
      data: []
    });
  });

  test('sets and gets viewer state', async () => {
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

    mockXHR.__queueResponseMock('{"state":"hello"}');

    await expect(client.getViewerState(clientId)).resolves.toEqual({ state: 'hello' });

    await expect(client.getState(clientId)).resolves.toMatchObject({
      viewer: {
        state: 'hello'
      }
    });
  });

  test('allows proper typing', async () => {
    interface ChannelState {
      stringState: string;
      numberState: number;
      booleanState: boolean;
    }

    const channelState = {
      stringState: 'hello',
      numberState: 123,
      booleanState: true
    };

    // @ts-expect-error
    await broadcasterClient.setChannelState<ChannelState>(clientId, {
      // Missing required parameters of ChannelState
      numberState: 123
    });

    mockXHR.__queueResponseMock(JSON.stringify(channelState));
    expect(await broadcasterClient.getChannelState<ChannelState>(clientId)).toMatchObject(channelState);
  });
});

// Tests for the server configuration client
import StateClient, { ServerConfig } from '../src/state-client';

import * as mockXHR from '../libs/xhr-promise';
import { DebugOptions } from '../src/debug';
import Util from '../src/util';

jest.mock('../libs/xhr-promise');

const ClientId = 'testing-client-id';

describe('ConfigClient', () => {
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

  describe('Broadcasters', () => {
    test('should be able to set channel config', async () => {
      const expected = {

      };
      mockXHR.__queueResponseMock(JSON.stringify(expected));

      const resp = await broadcasterClient.postConfig(ClientId, ServerConfig.CHANNEL, expected)
      console.log(resp);
      expect(resp).resolves;
    });

    test.skip('should not be able to set extension config', async () => {
    });

    test.skip('should be able to fetch config', async () => {

    });
  });

  describe.skip('Viewers', () => {
    test('should be able to fetch extension config', async () => {
    });

    test('should be able to fetch channel config', async () => {
    });

    test('should be able to fetch combined config', async () => {
    });

    test('should not be allowed to set config', async () => {
    });
  });

  describe('TypeScript', () => {
    test.skip('should allow the developer to specify a type', async () => {
      interface ConfigType {
        enabled: boolean;
        option: string;
        count?: number;
      }


      await expect(viewerClient.getConfig(ClientId)).rejects.toEqual('Your authentication token has expired.');
    })
  });
});

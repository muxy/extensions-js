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
      expect(resp).resolves;
    });

    test.skip('should not be able to set extension config', async () => {
    });

    test('should be able to fetch config', async () => {
      const expected = {
        broadcasters_mood: 'sanguine, my brother',
        chats_mood: 'kreygasm'
      };
      mockXHR.__queueResponseMock(JSON.stringify(expected));

      const resp = await broadcasterClient.getConfig(ClientId);
      expect(resp).toMatchObject(expected);      
    });
  });

  describe('Viewers', () => {
    test('should be able to fetch extension config', async () => {
      const config = { config: "configValue" };

      mockXHR.__queueResponseMock(JSON.stringify(config));

      expect(viewerClient.getExtensionConfig(ClientId)).resolves.toEqual(config);
    })

    test('should be able to fetch channel config', async () => {
      const config = { config: "configValue" };
  
      mockXHR.__queueResponseMock(JSON.stringify(config));
  
      await expect(viewerClient.getChannelConfig(ClientId)).resolves.toEqual(config);
    });

    test('should be able to fetch combined config', async () => {
      const config = { 
        channel: { config: "channelConfigValue" }, 
        extension: { config: "extensionConfigValue" }
      };
  
      mockXHR.__queueResponseMock(JSON.stringify(config));
  
      await expect(viewerClient.getConfig(ClientId)).resolves.toEqual(config);
    });

    test.skip('should not be allowed to set config', async () => {
    });
  });

  describe('TypeScript', () => {
    test('should allow the developer to specify a type', async () => {
      class ConfigType {
        enabled: boolean;
        option: string;
        count?: number;
      }

      const expected = {
        eanbled: true,
        option: 'test Option',
        count: 2,
      };

    // @ts-expect-error
    await viewerClient.setChannelState<ConfigType>(ClientId, {
      // Missing required parameters of ConfigType
      enabled: true,
    });

    mockXHR.__queueResponseMock(JSON.stringify(expected));

    expect(await viewerClient.getChannelState<ConfigType>(ClientId))
      .toMatchObject(expected);
    })
  });
});

import {DebuggingOptions} from '../src/debug';
import Muxy from '../src/muxy';

const extensionID = '6denyaraw5d9zj029wdk6i5g2q6hg0';

describe('state', ()=> {

  it('can set channel state', async () => {
    const debug = new DebuggingOptions();
    debug.options = {
      channelID: '26052853',
      environment: 'testing',
      role: 'broadcaster',
      url: 'http://localhost:5000',
      userID: '26052853',
    };
    Muxy.debug(debug);
    Muxy.setup({ clientID: extensionID, quiet: true });

    const sdk = new Muxy.SDK();
    await sdk.loaded();

    await expect(sdk.setChannelState({ test: 'channel' })).resolves.toEqual({});

    await expect(sdk.getChannelState()).resolves.toEqual({ test: 'channel' });
  });
});

import Muxy from '../src/muxy';
import {DebuggingOptions, DebugOptions} from "../src/debug";

const extensionID = '6denyaraw5d9zj029wdk6i5g2q6hg0';

describe('state', ()=> {

  it("can set channel state", async () => {
    Muxy.debug(<DebuggingOptions>{
      options: <DebugOptions>{
        channelID: "26052853",
        role: "broadcaster",
        url: "http://localhost:5000",
        userID: '26052853',
        environment: 'testing'
      }
    });
    Muxy.setup({ clientID: extensionID, quiet: true });

    const sdk = new Muxy.SDK();
    await sdk.loaded();

    await expect(sdk.setChannelState({ test: 'channel' })).resolves.toEqual({});

    await expect(sdk.getChannelState()).resolves.toEqual({ test: 'channel' });
  });
});

import Muxy from '../src/muxy';
import {DebuggingOptions, DebugOptions} from "../src/debug";

const extensionID = '6denyaraw5d9zj029wdk6i5g2q6hg0';

describe('state', ()=> {
  it("can set and get various states", async () => {
    Muxy.debug(<DebuggingOptions>{
      options: <DebugOptions>{
        channelID: "26052853",
        role: "admin",
        url: "http://localhost:5000",
        userID: '26052853',
        environment: 'testing'
      }
    });
    Muxy.setup({ clientID: extensionID, quiet: true });

    const sdk = new Muxy.SDK();
    await sdk.loaded();

    await expect(sdk.setViewerState({ test: 'test' })).resolves.toEqual({});

    await expect(sdk.getViewerState()).resolves.toEqual({ test: 'test' });

    await expect(sdk.setExtensionState({ test: 'extension' })).resolves.toEqual({});

    await expect(sdk.getExtensionState()).resolves.toEqual({ test: 'extension' });

    await expect(sdk.setExtensionViewerState({ test: 'extension viewer' })).resolves.toEqual({});

    await expect(sdk.getExtensionViewerState()).resolves.toEqual({ test: 'extension viewer' });

    await expect(sdk.setExtensionSecretState({ test: 'secret' })).resolves.toEqual({});

    await expect(sdk.getExtensionSecretState()).resolves.toEqual({ test: 'secret' });
  });
});

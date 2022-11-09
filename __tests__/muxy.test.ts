import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from '@jest/globals';

import Muxy from '../src/muxy';

describe('Muxy', () => {
  beforeAll(() => {
    // Clear out first open promise handle.
    Muxy.loadPromise.catch(() => {
      /* Ignore uncaught exceptions */
    });
    Muxy.loadReject('clear');
  });

  afterAll(() => {
    Muxy.loadReject('clear');
  });

  beforeEach(() => {
    // Reset Muxy object.
    Muxy.SDKClients = {};
    Muxy.twitchClientID = '';
    Muxy.cachedTwitchClient = null;
    Muxy.client = null;
    Muxy.messenger = null;
    Muxy.purchaseClient = null;
    Muxy.analytics = null;
    Muxy.context = {
      arePlayerControlsVisible: false,
      bitrate: 480,
      bufferSize: 4096,
      displayResolution: '1920x1080',
      game: 'IRL',
      hlsLatencyBroadcaster: 7,
      isFullScreen: true,
      isMuted: false,
      isPaused: false,
      isTheatreMode: false,
      language: 'en',
      mode: 'viewer',
      playbackMode: 'video',
      theme: 'dark',
      videoResolution: '1920x1080',
      volume: 90
    };

    Muxy.user = null;
    Muxy.loadPromise = new Promise((resolve, reject) => {
      Muxy.loadResolve = resolve;
      Muxy.loadReject = reject;
    });
    Muxy.loadPromise.catch(() => {
      /* Ignore uncaught exceptions */
    });
    Muxy.setupCalled = false;
  });

  afterEach(() => {
    // The pusher SDK likes to hang jest unless we disconnect
    if (Muxy.messenger) {
      Muxy.messenger.close();
    }

    // Force resolve to remove open file handle.
    Muxy.loadReject('clear');
  });

  test('needs an extension client id to setup', () => {
    expect(() => {
      // @ts-ignore
      Muxy.setup({ quiet: true });
    }).toThrow(Error);
  });

  test('can be set up', () => {
    Muxy.setup({
      clientID: 'testextensionid',
      quiet: true
    });
  });

  test('cannot call setup() twice', () => {
    Muxy.setup({ clientID: 'testextensionid', quiet: true });
    expect(() => {
      Muxy.setup({ clientID: 'textextensionid', quiet: true });
    }).toThrow(Error);
  });

  test('accepts client id on setup', () => {
    Muxy.setup({ clientID: 'testextensionid', quiet: true });
  });

  test('cannot create SDK objects before setup', () => {
    expect(() => {
      const sdk = new Muxy.SDK();
    }).toThrow(Error);
  });

  test('can create new SDK instances', () => {
    Muxy.setup({ clientID: 'testextensionid', quiet: true });
    const sdk = new Muxy.SDK();
  });

  test('can create new SDK instances with new scope', () => {
    Muxy.setup({ clientID: 'testextensionid', quiet: true });
    const sdk = new Muxy.SDK();
  });
});

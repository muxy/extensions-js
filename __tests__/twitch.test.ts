import { describe, expect, jest, test } from '@jest/globals';

import { TwitchContext } from '../src/twitch';
import { ContextUpdateCallbackHandle } from '../src/twitch';

describe('Twitch', () => {
  describe('ContextUpdateCallbackHandle', () => {
    test('callback should get called upon run of notify function', () => {
      const mockCallback = jest.fn() as jest.MockedFunction<(TwitchContext) => void>;

      const context = {} as TwitchContext;
      const notifier = new ContextUpdateCallbackHandle(mockCallback);
      notifier.notify(context);

      expect(mockCallback).toHaveBeenCalled();
    });
  });
});

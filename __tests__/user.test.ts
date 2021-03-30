import { TwitchAuth } from '../src/twitch';
import User from '../src/user';
import { UserUpdateCallbackHandle } from '../src/user';

const someJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MjE0NzQ4MzY0Nywib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAifQ.0a5_yR6bTc2V4boC0kH_0mz2v34dJQq4p1iOBA70lt4';

const anonymousUserAuth = Object.assign(new TwitchAuth(), {
  twitchOpaqueID: 'A1234567'
});

describe('User', () => {
  describe('UserUpdateCallbackHandle', () => {
    test('callback should get called upon run of notify function', () => {
      const mockCallback = jest.fn() as jest.MockedFunction<(User) => void>;

      const user = new User(anonymousUserAuth);
      const notifier = new UserUpdateCallbackHandle(mockCallback);
      notifier.notify(user);

      expect(mockCallback).toHaveBeenCalled();
    });
  });

  describe('anonymous', () => {
    test('should be detectable', () => {
      const user = new User(anonymousUserAuth);
      expect(user.anonymous()).toBe(true);
    });

    test('should not have a twitch id', () => {
      const user = new User(anonymousUserAuth);
      expect(user.twitchID).toBe(null);
    });
  });

  describe('getOffsetDate', () => {
    let fixedDate = new Date('2021-03-31T12:00:00');
    const user = new User(anonymousUserAuth);
    let _originalDate;

    beforeEach(() => {
      _originalDate = Date;

      const _GLOBAL: any = global;
      _GLOBAL.Date = class extends Date {
        constructor() {
          super();

          return fixedDate;
        }
      };
    });

    test('should return current time', () => {
      expect(user.getOffsetDate()).toBe(fixedDate);
    });

    test('should return current time + offset', () => {
      user.timeOffset = 10;
      fixedDate = new Date(fixedDate.getTime() + user.timeOffset);
      expect(user.getOffsetDate()).toBe(fixedDate);
    });

    afterEach(() => {
      Date = _originalDate;
    });
  });

  describe('updateAuth', () => {
    const auth = new TwitchAuth();

    Object.assign(auth, {
      channelId: '12345678',
      clientId: 'client id',
      token: someJWT,
      userId: 'T12345678'
    });

    const user = new User(anonymousUserAuth);

    user.updateAuth(auth);

    test('should set twitchJWT property', () => {
      expect(user.twitchJWT).toBe(someJWT);
    });
  });

  describe('extractJWTInfo', () => {
    const auth = new TwitchAuth();

    Object.assign(auth, {
      channelId: '12345678',
      clientId: 'client id',
      token: someJWT,
      userId: 'T12345678'
    });

    const user = new User(auth);

    test('should set user role and twitchID', () => {
      user.extractJWTInfo(someJWT);
      // expect(user.role).toBe('viewer');
      expect(user.twitchID).toEqual(null);
    });
  });
});

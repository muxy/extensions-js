import { TwitchAuth } from '../src/twitch';
import User from '../src/user';

const anonymousUserAuth = Object.assign(new TwitchAuth(), {
  twitchOpaqueID: 'A1234567'
});

/** @test {User} */
describe('User', function() {
  describe('anonymous', function() {
    /** @test {User#anonymous} */
    it('should be detectable', function() {
      const user = new User(anonymousUserAuth);
      expect(user.anonymous()).toBe(true);
    });

    /** @test {User#twitchID} */
    it('should not have a twitch id', function() {
      const user = new User(anonymousUserAuth);
      expect(user.twitchID).toBe(null);
    });
  });
});

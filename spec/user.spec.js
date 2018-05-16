import User from '../src/user';

const anonymousUserAuth = {
  twitchOpaqueID: 'A1234567'
};

let user = null;

/** @test {User} */
describe('User', function() {
  describe('anonymous', function() {
    beforeEach(function() {
      user = new User(anonymousUserAuth);
    });

    /** @test {User#anonymous} */
    it('should be detectable', function() {
      expect(user.anonymous()).toBe(true);
    });

    /** @test {User#twitchID} */
    it('should not have a twitch id', function() {
      expect(user.twitchID).toBeNull();
    });
  });
});

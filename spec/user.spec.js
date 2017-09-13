import chai from 'chai';
import User from '../src/user';

const should = chai.should();

const anonymousUserAuth = {
  twitchOpaqueID: 'A1234567'
};

/** @test {User} */
describe('User', function() {
  describe('anonymous', function() {
    beforeEach(function() {
      this.user = new User(anonymousUserAuth);
    });

    /** @test {User#anonymous} */
    it('should be detectable', function() {
      this.user.anonymous().should.equal(true);
    });

    /** @test {User#twitchID} */
    it('should not have a twitch id', function() {
      should.not.exist(this.user.twitchID);
    });
  });
});

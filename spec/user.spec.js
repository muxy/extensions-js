import chai from 'chai';
import User from '../src/user';

chai.should();

const anonymousUserAuth = {
  twitchOpaqueID: 'U1234567'
};

/** @test {User} */
describe('User', function () {
  /** @test {User#anonymous} */
  it('should be anonymous', function () {
    const user = new User(anonymousUserAuth);
    user.anonymous().should.equal(true);
  });

  /** @test {User#twitchID} */
  it('should not have a twitch id', function () {
    const user = new User(anonymousUserAuth);
    should.equal(user.twitchID, null);
  });
});

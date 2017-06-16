import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import User from '../src/user';

chai.should();
chai.use(chaiAsPromised);

const assert = chai.assert;

const anonymousUserAuth = {
  twitchOpaqueID: 'U1234567'
};

describe('User type', function() {
  it('is an anonymous user', function() {
    const user = new User(anonymousUserAuth);
    assert.equal(user.anonymous(), true);
  });

  it('should not have a twitch id', function () {
    const user = new User(anonymousUserAuth);
    assert.equal(user.twitchID, null);
  });
});

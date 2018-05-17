import StateClient from '../src/state-client';
import { ENVIRONMENTS } from '../src/util';

const EXTENSION_ID = '1f1wyw7py7nhcsrdv8l8jggar42b7d';
describe('StateClientIntegration', () => {
  const viewerClient = new StateClient();
  const broadcasterClient = new StateClient();

  beforeAll((done) => {
    StateClient.setEnvironment(ENVIRONMENTS.TESTING);
    StateClient.fetchTestAuth(EXTENSION_ID, '151232', 'viewer').then((viewerAuth) => {
      viewerClient.updateAuth(viewerAuth.token);

      StateClient.fetchTestAuth(EXTENSION_ID, '151233', 'broadcaster').then((broadcasterAuth) => {
        broadcasterClient.updateAuth(broadcasterAuth.token);
        return done();
      });
    });
  });

  it('sets and gets viewer state', (done) => {
    viewerClient.getViewerState(EXTENSION_ID).then((data) => {
      expect(data).toEqual({});
    })
    .then(() => {
      return viewerClient.setViewerState(EXTENSION_ID, {
        state: 'hello'
      });
    })
    .then(() => {
      return viewerClient.getViewerState(EXTENSION_ID)
    })
    .then((data) => {
      expect(data.state).toBe('hello');
      done();
    })
    .then(() => {
      return viewerClient.getState();
    })
    .then((data) => {
      expect(data.viewer.state).toBe('hello');
    });
  });
});

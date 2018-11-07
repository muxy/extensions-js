import {DebuggingOptions} from '../src/debug';
import Muxy from '../src/muxy';
import {TriviaQuestionState} from '../src/sdk';
import StateClient from '../src/state-client';
import Util, {ENVIRONMENTS} from '../src/util';


const extensionID = '6denyaraw5d9zj029wdk6i5g2q6hg0';

describe('trivia', ()=> {
  const broadcasterClient = new StateClient(Promise.resolve(), {});
  const viewerClient = new StateClient(Promise.resolve(), {});

  beforeAll(async () => {
    StateClient.setEnvironment(ENVIRONMENTS.TESTING, {url: 'http://localhost:5000'});
    await StateClient.fetchTestAuth(extensionID, {
      channelID: '26052853',
      role: 'admin',
      url: 'http://localhost:5000',
      userID: '26052853',
    }).then(broadcasterAuth => {
      broadcasterClient.updateAuth(broadcasterAuth.token);
    });
    await StateClient.fetchTestAuth(extensionID, {
      channelID: '26052853',
      role: 'viewer',
      url: 'http://localhost:5000',
      userID: '26052853',
    }).then(viewerAuth => {
      viewerClient.updateAuth(viewerAuth.token);
    });
  });

  it('create a new trivia question', async () => {
    await expect(broadcasterClient.addExtensionTriviaQuestion(extensionID, {
      description: 'test question',
      id: 'test',
      name: 'test',
      short_name: 'test',
    })).resolves.toEqual({});

    await expect(broadcasterClient.setExtensionTriviaQuestionState(extensionID, 'test', 'state-unlocked', undefined))
      .resolves.toEqual({'state': TriviaQuestionState.Unlocked});

    const questions = await broadcasterClient.getExtensionTriviaQuestions(extensionID);

    expect(questions.questions).toHaveLength(1);

    const question = await broadcasterClient.getExtensionTriviaQuestion(extensionID, 'test');
    expect(question.name).toBe('test');
  });

  it('allows modifying trivia options', async () => {
    let resp = await broadcasterClient.addExtensionTriviaOptionToQuestion(extensionID, 'test', {
      description: 'The first question',
      id: 'question1',
      name: 'Question 1',
      short_name: 'Question 1',
    });

    expect(resp.options).toHaveLength(1);

    resp = await broadcasterClient.addExtensionTriviaOptionToQuestion(extensionID, 'test', {
      description: 'The second question',
      id: 'question2',
      name: 'Question 2',
      short_name: 'Question 2',
    });

    expect(resp.options).toHaveLength(2);

    resp = await broadcasterClient.removeExtensionTriviaOptionFromQuestion(extensionID, 'test', 'question1');
    expect(resp.options).toHaveLength(1);
  });

  it('works under the SDK', async () => {
    const debug = new DebuggingOptions();
    debug.options = {
      channelID: '26052853',
      environment: 'testing',
      role: 'admin',
      url: 'http://localhost:5000',
      userID: '26052853',
    };
    Muxy.debug(debug);
    Muxy.setup({ clientID: extensionID, quiet: true });

    const sdk = new Muxy.SDK();
    await sdk.loaded();

    await expect(sdk.addExtensionTriviaQuestion({
      description: 'SDK test question',
      id: 'sdktest',
      name: 'SDK Test',
      short_name: 'SDK Text'
    })).resolves.toEqual({});

    const question = await sdk.getExtensionTriviaQuestion('sdktest');
    expect(question.name).toBe('SDK Test');

    const questions = await sdk.getExtensionTriviaQuestions();
    expect(questions.questions.length).toBe(2);
    expect(questions.questions[1].state).toBe(TriviaQuestionState.Inactive);

    let resp = await sdk.addExtensionTriviaOptionToQuestion('sdktest', {
      description: 'The first option',
      id: 'option 1',
      name: 'Option 1',
      short_name: 'Option 1',
    });

    expect(resp.options).toHaveLength(1);

    resp = await sdk.removeExtensionTriviaOptionFromQuestion('sdktest', 'option 1');

    expect(resp.options).toHaveLength(0);

    await expect(sdk.setExtensionTriviaQuestionState('sdktest', TriviaQuestionState.Unlocked))
      .resolves.toEqual({'state': TriviaQuestionState.Unlocked});

    await expect(sdk.getJoinedTeam()).resolves.toEqual({});

    await expect(sdk.joinTriviaTeam()).resolves.toEqual({});

    await expect(sdk.getJoinedTeam()).resolves.toEqual({id: '26052853'});

    await expect(sdk.setExtensionTriviaQuestionVote('sdktest', 'option 1')).resolves.toEqual({});

    await expect(sdk.setExtensionTriviaQuestionState('sdktest', TriviaQuestionState.Locked, 'option 1'))
      .resolves.toEqual({'state': TriviaQuestionState.Locked});

    await expect(sdk.setExtensionTriviaQuestionState('sdktest', TriviaQuestionState.Results, 'option 1'))
      .resolves.toEqual({'state':TriviaQuestionState.Results});

    const results = await sdk.getExtensionTriviaLeaderboard();

    expect(results.leaderboard[0].combined_score).toEqual(1526)

    await expect(sdk.removeExtensionTriviaQuestion('test')).resolves.toEqual({});

    const changedQuestions = await sdk.getExtensionTriviaQuestions();
    expect(changedQuestions.questions.length).toBe(1);
  });
});

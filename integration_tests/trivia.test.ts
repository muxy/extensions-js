import Muxy from '../src/muxy';
import StateClient from "../src/state-client";
import {DebuggingOptions, DebugOptions} from "../src/debug";
import Util, {ENVIRONMENTS} from "../src/util";
import {TriviaOption, TriviaQuestion, TriviaQuestionState} from "../src/sdk";

const extensionID = '6denyaraw5d9zj029wdk6i5g2q6hg0';

describe('trivia', ()=> {
  const broadcasterClient = new StateClient(Promise.resolve(), <DebugOptions>{});
  const viewerClient = new StateClient(Promise.resolve(), <DebugOptions>{});

  beforeAll(async () => {
    StateClient.setEnvironment(ENVIRONMENTS.TESTING, <DebugOptions>{url: "http://localhost:5000"});
    await StateClient.fetchTestAuth(extensionID, <DebugOptions>{
      channelID: "26052853",
      role: "admin",
      url: "http://localhost:5000",
      userID: '26052853',
    }).then(broadcasterAuth => {
      broadcasterClient.updateAuth(broadcasterAuth.token);
    });
    await StateClient.fetchTestAuth(extensionID, <DebugOptions>{
      channelID: "26052853",
      role: "viewer",
      url: "http://localhost:5000",
      userID: '26052853',
    }).then(viewerAuth => {
      viewerClient.updateAuth(viewerAuth.token);
    });
  });

  it("create a new trivia question", async () => {
    await expect(broadcasterClient.addExtensionTriviaQuestion(extensionID, <TriviaQuestion>{
      id: 'test',
      name: 'test',
      short_name: 'test',
      description: 'test question'
    })).resolves.toEqual({});

    await expect(broadcasterClient.setExtensionTriviaQuestionState(extensionID, 'test', 'state-unlocked', undefined)).resolves.toEqual({"state": "state-unlocked"});

    const questions = await broadcasterClient.getExtensionTriviaQuestions(extensionID);

    expect(questions.questions).toHaveLength(1);

    const question = await broadcasterClient.getExtensionTriviaQuestion(extensionID, 'test');
    expect(question.name).toBe('test');
  });

  it("allows modifying trivia options", async () => {
    let resp = await broadcasterClient.addExtensionTriviaOptionToQuestion(extensionID, 'test', <TriviaOption>{
      id: 'question1',
      name: 'Question 1',
      short_name: 'Question 1',
      description: 'The first question',
    });

    expect(resp.options).toHaveLength(1);

    resp = await broadcasterClient.addExtensionTriviaOptionToQuestion(extensionID, 'test', <TriviaOption>{
      id: 'question2',
      name: 'Question 2',
      short_name: 'Question 2',
      description: 'The second question',
    });

    expect(resp.options).toHaveLength(2);

    resp = await broadcasterClient.removeExtensionTriviaOptionFromQuestion(extensionID, 'test', 'question1');
    expect(resp.options).toHaveLength(1);
  });

  it("works under the SDK", async () => {
    Muxy.debug(<DebuggingOptions>{
      options: <DebugOptions>{
        channelID: "26052853",
        role: "admin",
        url: "http://localhost:5000",
        userID: '26052853',
        environment: 'testing'
      }
    });
    Muxy.setup({ clientID: extensionID, quiet: true });

    const sdk = new Muxy.SDK();
    await sdk.loaded();

    await expect(sdk.addExtensionTriviaQuestion(<TriviaQuestion>{
      id: 'sdktest',
      name: 'SDK Test',
      short_name: 'SDK Text',
      description: 'SDK test question'
    })).resolves.toEqual({});

    const question = await sdk.getExtensionTriviaQuestion('sdktest');
    expect(question.name).toBe('SDK Test');

    let resp = await sdk.addExtensionTriviaOptionToQuestion('sdktest', <TriviaOption>{
      id: 'option 1',
      name: 'Option 1',
      short_name: 'Option 1',
      description: 'The first option',
    });

    expect(resp.options).toHaveLength(1);

    resp = await sdk.removeExtensionTriviaOptionFromQuestion('sdktest', 'option 1');

    expect(resp.options).toHaveLength(0);

    await expect(sdk.setExtensionTriviaQuestionState('sdktest', TriviaQuestionState.Unlocked)).resolves.toEqual({"state": TriviaQuestionState.Unlocked});

    await expect(sdk.getJoinedTeam()).resolves.toEqual({});

    await expect(sdk.joinTriviaTeam()).resolves.toEqual({});

    await expect(sdk.getJoinedTeam()).resolves.toEqual({id: "26052853"});

    await expect(sdk.setExtensionTriviaQuestionVote('sdktest', 'option 1')).resolves.toEqual({});

    await expect(sdk.setExtensionTriviaQuestionState('sdktest', TriviaQuestionState.Locked, 'option 1')).resolves.toEqual({"state": TriviaQuestionState.Locked});

    await expect(sdk.setExtensionTriviaQuestionState('sdktest', TriviaQuestionState.Results, 'option 1')).resolves.toEqual({"state":TriviaQuestionState.Results});

    const results = await sdk.getExtensionTriviaLeaderboard();

    expect(results.leaderboard[0].combined_score).toEqual(1526)
  });
});

export enum TriviaQuestionState {
  // Inactive marks a poll as inactive. Only admins can see an inactive poll.
  Inactive = 'state-inactive',

  // Unlocked marks a poll as being visible to everyone, and open to votes.
  Unlocked = 'state-unlocked',

  // Unlocked marks a poll as being visible to everyone, but closed to votes. No results
  // are visible while unlocked.
  Locked = 'state-locked',

  // Results marks a poll as complete, and results are available.
  Results = 'state-results'
}

/**
 * Represents an option on a trivia question
 *
 * @property {string} id - The id of the option
 * @property {string} name - The name of the option
 * @property {string} short_name - The name of the option for smaller displays.
 * @property {string} description - A description for the option
 * @property {string} image - A url that hosts an image to show with the option
 */
export interface TriviaOption {
  id: string;
  name: string;
  short_name: string;
  description: string;
  image?: string;
  order?: number;
}

/**
 * Represents a trivia question
 *
 * @property {string} id - The id of the question
 * @property {string} name - The name of the question
 * @property {string} short_name - The name of the question for smaller displays.
 * @property {string} description - A description for the question
 * @property {string} image - A url that hosts an image to show with the question
 * @property {TriviaOption[]} - An array of options that this question has
 * @property {string} state - Current state of the question
 */
export interface TriviaQuestion {
  id: string;
  name: string;
  short_name: string;
  description: string;
  image?: string;
  order?: number;
  options?: TriviaOption[];
  state?: string;
}

/**
 * The response from `getExtensionTriviaJoinedTeam`.
 *
 * @property {string} id - A unique identifier representing this team.
 */
export interface TriviaTeam {
  id: string;
}

/**
 * Shows the score per question on the trivia leaderboard
 *
 * @property {string} question_id - The id of the question
 * @property {boolean} broadcaster_correct - If the Team leader (channel) was correct
 * @property {number} team_participation - Participation of the team 0.0-1.0
 * @property {number} team_participants - Number of team members that voted
 * @property {number} percent_correct - How many members got the question correct 0.0-1.0
 * @property {number} team_votes - The number of team members that votes
 * @property {number[]} score_values
 */
export interface TriviaLeaderboardQuestionResults {
  question_id: string;
  broadcaster_correct: boolean;
  team_participation: number;
  team_participants: number;
  percent_correct: number;
  team_votes: number;
  score_values: number[];
}

export interface TriviaLeaderboardQuestionResultsMap {
  [key: string]: TriviaLeaderboardQuestionResults;
}

/**
 * Contains scoring info for one trivia team
 *
 * @property {string} team_id - The id of the team
 * @property {number} combined_score - The total score the team has
 * @property {Map<string, TriviaLeaderboardQuestionResults>} questions - A map of scores per question asked
 */
export interface TriviaLeaderboardTeam {
  team_id: string;
  combined_score: number;
  questions: TriviaLeaderboardQuestionResultsMap;
}

export interface TriviaLeaderboard {
  leaderboard: TriviaLeaderboardTeam[];
}

export interface TriviaStateResponse {
  state: string;
}

export interface TriviaQuestionResponse {
  questions: TriviaQuestion[];
}

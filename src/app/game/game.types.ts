import { IAction, IActionWithPayload, ISelector } from '../common/common.types';
import {
  START_GAME,
  STORE_CURRENT_GAME,
  STORE_CURRENT_QUESTION,
  STORE_CURRENT_QUESTION_OPTION,
  ANSWER_QUESTION,
  LOAD_GAMES,
  STORE_GAMES,
  STORE_QUESTIONS,
  STORE_QUESTION_OPTIONS,
  STORE_MESSAGE,
} from './game.constants';


export type ILoadGamesAction = IAction<typeof LOAD_GAMES>;
export type IStoreGamesAction = IActionWithPayload<typeof STORE_GAMES, IGameState['games']>
export type IStoreQuestionsAction = IActionWithPayload<typeof STORE_QUESTIONS, IGameState['questions']>;
export type IStoreQuestionOptionsAction = IActionWithPayload<typeof STORE_QUESTION_OPTIONS, IGameState['questionOptions']>;

export type IStartGameAction = IActionWithPayload<typeof START_GAME, string>;
export type IStoreCurrentGame = IActionWithPayload<typeof STORE_CURRENT_GAME, string | null>;

export type IAnswerQuestion = IActionWithPayload<typeof ANSWER_QUESTION, number>;
export type IStoreCurrentQuestion = IActionWithPayload<typeof STORE_CURRENT_QUESTION, string | null>;
export type IStoreCurrentQuestionOption = IActionWithPayload<typeof STORE_CURRENT_QUESTION_OPTION, string | null>;

export type IStoreMessage = IActionWithPayload<typeof STORE_MESSAGE, string | null>;

export type IGameActions = IStoreGamesAction |
  IStoreQuestionsAction |
  IStoreQuestionOptionsAction |
  IStoreCurrentGame |
  IStoreCurrentQuestion |
  IStoreCurrentQuestionOption |
  IStoreMessage;

export type ISelectGameList<TInjectedState = IGameState> = ISelector<TInjectedState, IGame[]>;
export type ISelectCurrentGameId<TInjectedState = IGameState> = ISelector<TInjectedState, string | null>;
export type ISelectCurrentGame<TInjectedState = IGameState> = ISelector<TInjectedState, IGame | null>;
export type ISelectCurrentGameNumberOfQuestions<TInjectedState = IGameState> = ISelector<TInjectedState, number | null>;
export type ISelectCurrentQuestionId<TInjectedState = IGameState> = ISelector<TInjectedState, string | null>;
export type ISelectCurrentQuestion<TInjectedState = IGameState> = ISelector<TInjectedState, IQuestion | null>;
export type ISelectCurrentQuestionNumberOfOptions<TInjectedState = IGameState> = ISelector<TInjectedState, number | null>;
export type ISelectCurrentQuestionOptionId<TInjectedState = IGameState> = ISelector<TInjectedState, string | null>;
export type ISelectCurrentQuestionOption<TInjectedState = IGameState> = ISelector<TInjectedState, IQuestionOption | null>;
export type ISelectMessage<TInjectedState = IGameState> = ISelector<TInjectedState, string | null>;

export interface IGameSelectors<TInjectedState = IGameState> {
  selectGameList: ISelectGameList<TInjectedState>;
  selectCurrentGameId: ISelectCurrentGameId<TInjectedState>;
  selectCurrentGame: ISelectCurrentGame<TInjectedState>;
  selectCurrentGameNumberOfQuestions: ISelectCurrentGameNumberOfQuestions<TInjectedState>;
  selectCurrentQuestionId: ISelectCurrentQuestionId<TInjectedState>;
  selectCurrentQuestion: ISelectCurrentQuestion<TInjectedState>;
  selectCurrentQuestionNumberOfOptions: ISelectCurrentQuestionNumberOfOptions<TInjectedState>;
  selectCurrentQuestionOptionId: ISelectCurrentQuestionOptionId<TInjectedState>;
  selectCurrentQuestionOption: ISelectCurrentQuestionOption<TInjectedState>;
  selectMessage: ISelectMessage<TInjectedState>;
}

export interface IQuestionOptionRaw {
  text: string;
  answers: [string, string, string, string];
  correct: number;
}

export interface IQuestionRaw {
  options: IQuestionOptionRaw[];
  value?: number;
}

export interface IGameRaw {
  name: string;
  description?: string;
  questions: IQuestionRaw[];
}

export interface IQuestionOption {
  id: string;
  text: string;
  answers: [string, string, string, string];
  correct: number;
}

export interface IQuestion {
  id: string;
  options: string[];
  value: number;
}

export interface IGame {
  id: string;
  name: string;
  description?: string;
  questions: string[];
}

export interface IGameDataRaw {
  games: IGameRaw[];
}

export interface IGameState {
  games: { [gameId: string]: IGame };
  questions: { [questionId: string]: IQuestion };
  questionOptions: { [questionOptionId: string]: IQuestionOption };
  currentGame: string | null;
  currentQuestion: string | null;
  currentQuestionOption: string | null;
  message: string | null;
}

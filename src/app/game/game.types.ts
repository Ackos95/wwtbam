import { IAction, IActionWithPayload, ISelector } from '../common/common.types';
import {
  START_GAME,
  END_GAME,
  STORE_GAME_HAS_STARTED,
  STORE_CURRENT_QUESTION,
  RESET_CURRENT_QUESTION,
  GO_TO_NEXT_QUESTION,
} from './game.constants';


export type IStartGameAction = IAction<typeof START_GAME>;
export type IEndGameAction = IAction<typeof END_GAME>;
export type IStoreHasGameStarted = IActionWithPayload<typeof STORE_GAME_HAS_STARTED, boolean>;

export type IGoToNextQuestion = IAction<typeof GO_TO_NEXT_QUESTION>;
export type IStoreCurrentQuestion = IActionWithPayload<typeof STORE_CURRENT_QUESTION, number>;
export type IResetCurrentQuestion = IAction<typeof RESET_CURRENT_QUESTION>

export type IGameActions = IStoreHasGameStarted | IStoreCurrentQuestion | IResetCurrentQuestion;

export type ISelectHasGameStarted<TState = IGameState> = ISelector<TState, boolean>;
export type ISelectCurrentQuestion<TState = IGameState> = ISelector<TState, number>;

export interface IGameState {
  hasGameStarted: boolean;
  currentQuestion: number;
}

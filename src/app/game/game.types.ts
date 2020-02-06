import { IAction, IActionWithPayload, ISelector } from '../common/common.types';
import { START_GAME, END_GAME, STORE_GAME_HAS_STARTED } from './game.constants';


export type IStartGameAction = IAction<typeof START_GAME>;
export type IEndGameAction = IAction<typeof END_GAME>;
export type IStoreHasGameStarted = IActionWithPayload<typeof STORE_GAME_HAS_STARTED, boolean>;

export type IGameActions = IStoreHasGameStarted;

export type ISelectHasGameStarted<TState = IGameState> = ISelector<TState, boolean>;

export interface IGameState {
  hasGameStarted: boolean;
}

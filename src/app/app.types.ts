import { IGameActions, IGameState } from './game/game.types';


export type IAppActions = IGameActions;

export interface IAppState {
  game: IGameState
}

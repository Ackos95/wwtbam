import { IGameActions, IGameSelectors, IGameState } from './game/game.types';


export type IAppActions = IGameActions;

export interface IAppSelectors {
  game: IGameSelectors<IAppState>;
}

export interface IAppState {
  game: IGameState;
}

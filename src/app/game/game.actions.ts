import { IStartGameAction, IEndGameAction, IStoreHasGameStarted } from './game.types';
import { END_GAME, START_GAME, STORE_GAME_HAS_STARTED } from './game.constants';


export const startGame = (): IStartGameAction => ({
  type: START_GAME,
});

export const endGame = (): IEndGameAction => ({
  type: END_GAME,
});

export const storeHasGameStarted = (hasStarted: boolean): IStoreHasGameStarted => ({
  type: STORE_GAME_HAS_STARTED,
  payload: hasStarted,
});

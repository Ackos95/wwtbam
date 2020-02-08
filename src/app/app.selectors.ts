import { wrapSelectors } from './common/common.selectors';

import { IAppState } from './app.types';
import { IGameSelectors, IGameState } from './game/game.types';

import { gameSelectors } from './game/game.selectors';


export const appSelectors = {
  game: wrapSelectors<
    IAppState,
    IGameState,
    keyof IGameSelectors,
    IGameSelectors<IAppState>,
    IGameSelectors
  >(
    gameSelectors,
    (state) => state.game,
  ),
};

import { wrapSelector } from './common/common.selectors';

import { IAppState } from './app.types';
import { IGameState } from './game/game.types';

import * as gameSelectors from './game/game.selectors';


export const selectHasGameStarted = wrapSelector<IAppState, IGameState, boolean>(
  gameSelectors.selectHasGameStarted,
  (state: IAppState) => state.game,
);

export const selectCurrentQuestion = wrapSelector<IAppState, IGameState, number>(
  gameSelectors.selectCurrentQuestion,
  (state: IAppState) => state.game,
);

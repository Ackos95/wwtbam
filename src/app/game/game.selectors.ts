import {ISelectCurrentQuestion, ISelectHasGameStarted} from './game.types';

import { createSelector } from '../common/common.selectors';


export const selectHasGameStarted: ISelectHasGameStarted = createSelector(
  [(state) => state.hasGameStarted],
  (res: boolean) => res,
);

export const selectCurrentQuestion: ISelectCurrentQuestion = createSelector(
  [(state) => state.currentQuestion],
  (res: number) => res,
);

import { ISelectHasGameStarted } from './game.types';

import { createSelector } from '../common/common.selectors';


export const selectHasGameStarted: ISelectHasGameStarted = createSelector(
  [(state) => state.hasGameStarted],
  (res: boolean) => res,
);

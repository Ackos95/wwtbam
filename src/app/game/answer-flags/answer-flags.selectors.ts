import { createSelector } from '../../common/common.selectors';
import {
  IAnswerFlagsSelectors,
  ISelectCurrentAnswerIsCorrect,
  ISelectCurrentAnswerIsIgnored,
  ISelectCurrentAnswerIsInCorrect,
} from './answer-flags.types';


const selectCurrentAnswerIsCorrect: ISelectCurrentAnswerIsCorrect = createSelector(
  [(state) => state.currentAnswerIsCorrect],
  (currentAnswerIsCorrect) => currentAnswerIsCorrect,
);

const selectCurrentAnswerIsInCorrect: ISelectCurrentAnswerIsInCorrect = createSelector(
  [(state) => state.currentAnswerIsInCorrect],
  (currentAnswerIsInCorrect) => currentAnswerIsInCorrect,
);

const selectCurrentAnswerIsIgnored: ISelectCurrentAnswerIsIgnored = createSelector(
  [(state) => state.currentAnswerIsIgnored],
  (currentAnswerIsIgnored) => currentAnswerIsIgnored,
);


export const answerFlagsSelectors: IAnswerFlagsSelectors = {
  selectCurrentAnswerIsCorrect,
  selectCurrentAnswerIsInCorrect,
  selectCurrentAnswerIsIgnored,
};

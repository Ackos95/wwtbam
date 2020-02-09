import {
  IStoreCurrentAnswerIsCorrect,
  IStoreCurrentAnswerIsIgnored,
  IStoreCurrentAnswerIsInCorrect
} from './answer-flags.types';
import {
  STORE_CURRENT_ANSWER_IS_CORRECT,
  STORE_CURRENT_ANSWER_IS_IGNORED,
  STORE_CURRENT_ANSWER_IS_INCORRECT
} from './answer-flags.constants';


export const storeCurrentAnswerIsCorrect = (isCorrect: number | null): IStoreCurrentAnswerIsCorrect => ({
  type: STORE_CURRENT_ANSWER_IS_CORRECT,
  payload: isCorrect,
});

export const storeCurrentAnswerIsInCorrect = (isInCorrect: number | null): IStoreCurrentAnswerIsInCorrect => ({
  type: STORE_CURRENT_ANSWER_IS_INCORRECT,
  payload: isInCorrect,
});

export const storeCurrentAnswerIsIgnored = (isIgnored: [number, number] | null): IStoreCurrentAnswerIsIgnored => ({
  type: STORE_CURRENT_ANSWER_IS_IGNORED,
  payload: isIgnored,
});

import { combineReducers, Reducer } from 'redux';

import { IAnswerFlagsActions, IAnswerFlagsState } from './answer-flags.types';
import {
  STORE_CURRENT_ANSWER_IS_CORRECT,
  STORE_CURRENT_ANSWER_IS_IGNORED,
  STORE_CURRENT_ANSWER_IS_INCORRECT
} from './answer-flags.constants';


const initialState: IAnswerFlagsState = {
  currentAnswerIsCorrect: null,
  currentAnswerIsInCorrect: null,
  currentAnswerIsIgnored: null,
};

const currentAnswerIsCorrectReducer: Reducer<
  IAnswerFlagsState['currentAnswerIsCorrect'],
  IAnswerFlagsActions
> = (state = initialState.currentAnswerIsCorrect, action) => {
  if (action.type === STORE_CURRENT_ANSWER_IS_CORRECT) {
    return action.payload;
  }

  return state;
};

const currentAnswerIsInCorrectReducer: Reducer<
  IAnswerFlagsState['currentAnswerIsInCorrect'],
  IAnswerFlagsActions
> = (state = initialState.currentAnswerIsInCorrect, action) => {
  if (action.type === STORE_CURRENT_ANSWER_IS_INCORRECT) {
    return action.payload;
  }

  return state;
};

const currentAnswerIsIgnoredReducer: Reducer<
  IAnswerFlagsState['currentAnswerIsIgnored'],
  IAnswerFlagsActions
> = (state = initialState.currentAnswerIsIgnored, action) => {
  if (action.type === STORE_CURRENT_ANSWER_IS_IGNORED) {
    return action.payload;
  }

  return state;
};

export const answerFlagsReducer: Reducer<
  IAnswerFlagsState,
  IAnswerFlagsActions
> = combineReducers({
  currentAnswerIsCorrect: currentAnswerIsCorrectReducer,
  currentAnswerIsInCorrect: currentAnswerIsInCorrectReducer,
  currentAnswerIsIgnored: currentAnswerIsIgnoredReducer,
});

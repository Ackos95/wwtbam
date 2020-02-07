import { Reducer } from 'redux';
import { IQuestionsActions, IQuestionsState } from './questions.types';
import { RESET_QUESTIONS, STORE_QUESTIONS } from './questions.constants';


const initialState: IQuestionsState = {
  questions: {},
  categories: {},
};

export const questionsReducer: Reducer<IQuestionsState, IQuestionsActions> = (state = initialState, action) => {
  if (action.type === RESET_QUESTIONS) {
    return initialState;
  } else if (action.type === STORE_QUESTIONS) {
    console.log('new state: ', action.payload);
    return action.payload;
  }

  return state;
};

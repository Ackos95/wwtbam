import { ILoadQuestions, IQuestionsState, IResetQuestions, IStoreQuestions } from './questions.types';
import { LOAD_QUESTIONS, RESET_QUESTIONS, STORE_QUESTIONS } from './questions.constants';


export const loadQuestions = (): ILoadQuestions => ({
  type: LOAD_QUESTIONS,
});

export const storeQuestions = (
  questions: IQuestionsState['questions'],
  categories: IQuestionsState['categories']
): IStoreQuestions => ({
  type: STORE_QUESTIONS,
  payload: {
    questions,
    categories,
  },
});

export const resetQuestions = (): IResetQuestions => ({
  type: RESET_QUESTIONS,
});

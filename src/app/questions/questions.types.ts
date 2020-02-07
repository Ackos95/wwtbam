import {IAction, IActionWithPayload, ISelector, ISelectorWithParams} from '../common/common.types';
import { LOAD_QUESTIONS, RESET_QUESTIONS, STORE_QUESTIONS } from './questions.constants';


export interface IQuestionRaw {
  text: string;
  answers: [string, string, string, string];
  correct: number;
}

export interface IQuestion {
  id: string;
  text: string;
  answers: [string, string, string, string];
  correct: number;
}

export interface IQuestionCategoryRaw {
  questions: IQuestionRaw[];
}

export interface IQuestionCategory {
  id: string;
  questions: string[];
}

export type ILoadQuestions = IAction<typeof LOAD_QUESTIONS>;

export type IStoreQuestions = IActionWithPayload<typeof STORE_QUESTIONS, IQuestionsState>;
export type IResetQuestions = IAction<typeof RESET_QUESTIONS>;

export type IQuestionsActions = IStoreQuestions | IResetQuestions;

export type ISelectNumberOfCategories<TInjectedState = IQuestionsState> = ISelector<
  TInjectedState,
  number
>

export type ISelectCategoryQuestions<TInjectedState = IQuestionsState> = ISelectorWithParams<
  TInjectedState,
  { category: string },
  number[]
>

export type ISelectNumberOfQuestionsInCategory<TInjectedState = IQuestionsState> = ISelectorWithParams<
  TInjectedState,
  { category: string },
  number
>

export type ISelectQuestionFromCategory<TInjectedState = IQuestionsState> = ISelectorWithParams<
  TInjectedState,
  { category: string, questionIndex: number },
  IQuestion
>;

export interface IQuestionsStateRaw {
  categories: IQuestionCategoryRaw[];
}

export interface IQuestionsState {
  categories: { [categoryId: string]: IQuestionCategory };
  questions: { [questionId: string]: IQuestion };
}

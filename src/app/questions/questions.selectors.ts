import {createSelector, createSelectorWithParams} from '../common/common.selectors';
import {
  ISelectCategoryQuestions,
  ISelectNumberOfCategories,
  ISelectNumberOfQuestionsInCategory,
  ISelectQuestionFromCategory
} from './questions.types';


export const selectNumberOfCategories: ISelectNumberOfCategories = createSelector(
  [(state) => Object.keys(state.categories).length],
  (res) => res,
);

const selectCategoryQuestions: ISelectCategoryQuestions = createSelectorWithParams(
  [
    (state) => state.categories,
    (state, { category }) => category,
  ],
  (categories, categoryIndex) => (categories[categoryIndex] || { questions: [] }).questions,
);

export const selectNumberOfQuestionsInCategory: ISelectNumberOfQuestionsInCategory = createSelectorWithParams(
  [selectCategoryQuestions],
  (categoryQuestions) => categoryQuestions.length,
);

export const selectQuestionFromCategory: ISelectQuestionFromCategory = createSelectorWithParams(
  [
    (state) => state.questions,
    selectCategoryQuestions,
    (state, { questionIndex }) => questionIndex,
  ],
  (questions, categoryQuestions, questionIndex) => questions[categoryQuestions[questionIndex]],
);

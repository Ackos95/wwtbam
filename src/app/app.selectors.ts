import {wrapSelector, wrapSelectorWithParams} from './common/common.selectors';

import { IAppState } from './app.types';
import { IGameState } from './game/game.types';
import { IQuestion, IQuestionsState } from './questions/questions.types';

import * as gameSelectors from './game/game.selectors';
import * as questionSelectors from './questions/questions.selectors';


export const selectHasGameStarted = wrapSelector<IAppState, IGameState, boolean>(
  gameSelectors.selectHasGameStarted,
  (state: IAppState) => state.game,
);

export const selectCurrentQuestion = wrapSelector<IAppState, IGameState, number>(
  gameSelectors.selectCurrentQuestion,
  (state: IAppState) => state.game,
);

export const selectNumberOfCategories = wrapSelector<IAppState, IQuestionsState, number>(
  questionSelectors.selectNumberOfCategories,
  (state: IAppState) => state.questions,
);

export const selectNumberOfQuestionsInCategory = wrapSelectorWithParams<
  IAppState,
  IQuestionsState,
  { category: string },
  number
>(
  questionSelectors.selectNumberOfQuestionsInCategory,
  (state: IAppState) => state.questions,
);

export const selectQuestionFromCategory = wrapSelectorWithParams<
  IAppState,
  IQuestionsState,
  { category: string, questionIndex: number },
  IQuestion
>(
  questionSelectors.selectQuestionFromCategory,
  (state: IAppState) => state.questions,
);

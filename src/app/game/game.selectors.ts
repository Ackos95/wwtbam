import { createSelector, createSelectorWithParams, wrapSelectors } from '../common/common.selectors';
import {
  IGameSelectors, IGameState,
  ISelectCurrentGame,
  ISelectCurrentGameId,
  ISelectCurrentGameNumberOfQuestions,
  ISelectCurrentQuestion,
  ISelectCurrentQuestionId,
  ISelectCurrentQuestionNumberOfOptions,
  ISelectCurrentQuestionOption,
  ISelectCurrentQuestionOptionId,
  ISelectGameList,
  ISelectMessage,
  ISelectQuestionById,
} from './game.types';

import { IAnswerFlagsSelectors, IAnswerFlagsState } from './answer-flags/answer-flags.types';
import { IHelpSelectors, IHelpState } from './help/help.types';

import { answerFlagsSelectors } from './answer-flags/answer-flags.selectors';
import { helpSelectors } from './help/help.selectors';


const selectGameList: ISelectGameList = createSelector(
  [(state) => state.games],
  (games) => Object.keys(games).map((key) => games[key])
);

const selectCurrentGameId: ISelectCurrentGameId = createSelector(
  [(state) => state.currentGame],
  (currentGameId) => currentGameId,
);

const selectCurrentGame: ISelectCurrentGame = createSelector(
  [
    (state) => state.games,
    selectCurrentGameId,
  ],
  (games, currentGameId) => currentGameId && games[currentGameId],
);

const selectCurrentGameNumberOfQuestions: ISelectCurrentGameNumberOfQuestions = createSelector(
  [selectCurrentGame],
  (currentGame) => currentGame && currentGame.questions.length,
);

const selectCurrentQuestionId: ISelectCurrentQuestionId = createSelector(
  [(state) => state.currentQuestion],
  (currentQuestionId) => currentQuestionId,
);

const selectCurrentQuestion: ISelectCurrentQuestion = createSelector(
  [
    (state) => state.questions,
    selectCurrentQuestionId,
  ],
  (questions, currentQuestionId) => currentQuestionId && questions[currentQuestionId],
);

const selectCurrentQuestionNumberOfOptions: ISelectCurrentQuestionNumberOfOptions = createSelector(
  [selectCurrentQuestion],
  (currentQuestion) => currentQuestion && currentQuestion.options.length,
);

const selectCurrentQuestionOptionId: ISelectCurrentQuestionOptionId = createSelector(
  [(state) => state.currentQuestionOption],
  (currentQuestionOptionId) => currentQuestionOptionId,
);

const selectCurrentQuestionOption: ISelectCurrentQuestionOption = createSelector(
  [
    (state) => state.questionOptions,
    selectCurrentQuestionOptionId,
  ],
  (questionOptions, currentQuestionOption) => currentQuestionOption && questionOptions[currentQuestionOption],
);

const selectMessage: ISelectMessage = createSelector(
  [(state) => state.message],
  (message) => message,
);

const selectQuestionById: ISelectQuestionById = createSelectorWithParams(
  [
    (state) => state.questions,
    (state, questionId) => questionId,
  ],
  (questions, questionId) => questions[questionId] || null,
);

export const gameSelectors: IGameSelectors = {
  selectGameList,
  selectCurrentGameId,
  selectCurrentGame,
  selectCurrentGameNumberOfQuestions,
  selectCurrentQuestionId,
  selectCurrentQuestion,
  selectCurrentQuestionNumberOfOptions,
  selectCurrentQuestionOptionId,
  selectCurrentQuestionOption,
  selectMessage,
  selectQuestionById,
  answerFlags: wrapSelectors<
    IGameState,
    IAnswerFlagsState,
    keyof IAnswerFlagsSelectors,
    IAnswerFlagsSelectors<IGameState>,
    IAnswerFlagsSelectors
  >(answerFlagsSelectors, (state) => state.answerFlags),
  help: wrapSelectors<
    IGameState,
    IHelpState,
    keyof IHelpSelectors,
    IHelpSelectors<IGameState>,
    IHelpSelectors
  >(helpSelectors, (state) => state.help),
};

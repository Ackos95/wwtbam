import { combineReducers, Reducer } from 'redux';

import { IGameActions, IGameState } from './game.types';
import {
  STORE_CURRENT_ANSWER_IS_CORRECT,
  STORE_CURRENT_ANSWER_IS_INCORRECT,
  STORE_CURRENT_GAME,
  STORE_CURRENT_QUESTION,
  STORE_CURRENT_QUESTION_OPTION,
  STORE_GAMES, STORE_MESSAGE,
  STORE_QUESTION_OPTIONS,
  STORE_QUESTIONS
} from './game.constants';


const initialState: IGameState = {
  games: {},
  questions: {},
  questionOptions: {},
  currentGame: null,
  currentQuestion: null,
  currentQuestionOption: null,
  message: null,
  currentAnswerIsCorrect: null,
  currentAnswerIsInCorrect: null,
};

const gamesReducer: Reducer<
  IGameState['games'],
  IGameActions
> = (state = initialState.games, action) => {
  if (action.type === STORE_GAMES) {
    return action.payload;
  }

  return state;
};

const questionsReducer: Reducer<
  IGameState['questions'],
  IGameActions
> = (state = initialState.questions, action) => {
  if (action.type === STORE_QUESTIONS) {
    return action.payload;
  }

  return state;
};

const questionOptionsReducer: Reducer<
  IGameState['questionOptions'],
  IGameActions
> = (state = initialState.questionOptions, action) => {
  if (action.type === STORE_QUESTION_OPTIONS) {
    return action.payload;
  }

  return state;
};

const currentGameReducer: Reducer<
  IGameState['currentGame'],
  IGameActions
> = (state = initialState.currentGame, action) => {
  if (action.type === STORE_CURRENT_GAME) {
    return action.payload;
  }

  return state;
};

const currentQuestionReducer: Reducer<
  IGameState['currentQuestion'],
  IGameActions
  > = (state = initialState.currentQuestion, action) => {
  if (action.type === STORE_CURRENT_QUESTION) {
    return action.payload;
  }

  return state;
};

const currentQuestionOptionReducer: Reducer<
  IGameState['currentQuestionOption'],
  IGameActions
> = (state = initialState.currentQuestionOption, action) => {
  if (action.type === STORE_CURRENT_QUESTION_OPTION) {
    return action.payload;
  }

  return state;
};

const messageReducer: Reducer<
  IGameState['message'],
  IGameActions
> = (state = initialState.message, action) => {
  if (action.type === STORE_MESSAGE) {
    return action.payload;
  }

  return state;
};

const currentAnswerIsCorrectReducer: Reducer<
  IGameState['currentAnswerIsCorrect'],
  IGameActions
> = (state = initialState.currentAnswerIsCorrect, action) => {
  if (action.type === STORE_CURRENT_ANSWER_IS_CORRECT) {
    return action.payload;
  }

  return state;
};

const currentAnswerIsInCorrectReducer: Reducer<
  IGameState['currentAnswerIsInCorrect'],
  IGameActions
  > = (state = initialState.currentAnswerIsInCorrect, action) => {
  if (action.type === STORE_CURRENT_ANSWER_IS_INCORRECT) {
    return action.payload;
  }

  return state;
};


export const gameReducer: Reducer<
  IGameState,
  IGameActions
> = combineReducers({
  games: gamesReducer,
  questions: questionsReducer,
  questionOptions: questionOptionsReducer,
  currentGame: currentGameReducer,
  currentQuestion: currentQuestionReducer,
  currentQuestionOption: currentQuestionOptionReducer,
  message: messageReducer,
  currentAnswerIsCorrect: currentAnswerIsCorrectReducer,
  currentAnswerIsInCorrect: currentAnswerIsInCorrectReducer
});

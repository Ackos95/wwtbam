import { combineReducers, Reducer } from 'redux';

import { IGameActions, IGameState } from './game.types';
import {RESET_CURRENT_QUESTION, STORE_CURRENT_QUESTION, STORE_GAME_HAS_STARTED} from './game.constants';


const initialState: IGameState = {
  hasGameStarted: false,
  currentQuestion: 0,
};

const gameStartedReducer: Reducer<
  IGameState['hasGameStarted'],
  IGameActions
> = (state = initialState.hasGameStarted, action) => {
  if (action.type === STORE_GAME_HAS_STARTED) {
    return action.payload;
  }

  return state;
};

const gameCurrentQuestionReducer: Reducer<
  IGameState['currentQuestion']
> = (state = initialState.currentQuestion, action) => {
  if (action.type === STORE_CURRENT_QUESTION) {
    return action.payload;
  } else if (action.type === RESET_CURRENT_QUESTION) {
    return 0;
  }

  return state;
};

export const gameReducer: Reducer<
  IGameState,
  IGameActions
> = combineReducers({
  hasGameStarted: gameStartedReducer,
  currentQuestion: gameCurrentQuestionReducer,
});

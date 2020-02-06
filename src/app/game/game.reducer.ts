import { combineReducers, Reducer } from 'redux';

import { IGameActions, IGameState } from './game.types';
import { STORE_GAME_HAS_STARTED } from './game.constants';


const initialState: IGameState = {
  hasGameStarted: false,
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

export const gameReducer: Reducer<
  IGameState,
  IGameActions
> = combineReducers({
  hasGameStarted: gameStartedReducer,
});

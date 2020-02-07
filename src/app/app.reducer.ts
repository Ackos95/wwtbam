import { combineReducers, Reducer } from 'redux';

import { IAppActions, IAppState } from './app.types';

import { gameReducer } from './game/game.reducer';
import { questionsReducer } from './questions/questions.reducer';


export const appReducer: Reducer<IAppState, IAppActions> = combineReducers({
  game: gameReducer,
  questions: questionsReducer,
});

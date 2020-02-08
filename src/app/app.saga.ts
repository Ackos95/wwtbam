import { fork, call, put } from 'redux-saga/effects';

import { gameSaga } from './game/game.saga';

import { loadGames } from './game/game.actions';


function* initializeApp() {
  yield put(loadGames());
}

export function* appSaga() {
  yield fork(gameSaga);

  yield call(initializeApp)
}

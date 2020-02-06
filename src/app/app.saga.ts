import { fork } from 'redux-saga/effects';

import { gameSaga } from './game/game.saga';


export function* appSaga() {
  yield fork(gameSaga);
}

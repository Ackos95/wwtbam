import { take, call, put } from 'redux-saga/effects';
import { END_GAME, START_GAME } from './game.constants';
import {storeHasGameStarted} from "./game.actions";


function* startGame() {
  yield put(storeHasGameStarted(true));
}

function* endGame() {
  yield put(storeHasGameStarted(false));
}

export function* gameSaga() {
  while (true) {
    yield take(START_GAME);
    yield call(startGame);

    yield take(END_GAME);
    yield call(endGame);
  }
}

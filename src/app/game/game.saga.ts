import { take, call, put, select } from 'redux-saga/effects';

import { END_GAME, GO_TO_NEXT_QUESTION, START_GAME } from './game.constants';
import { resetCurrentQuestion, storeCurrentQuestion, storeHasGameStarted } from './game.actions';

import { selectCurrentQuestion } from '../app.selectors';


function* startGame() {
  yield put(resetCurrentQuestion());
  yield put(storeHasGameStarted(true));
}

function* nextQuestion() {
  const currentQuestion = yield select(selectCurrentQuestion);

  yield put(storeCurrentQuestion(currentQuestion + 1));
}

function* endGame() {
  yield put(storeHasGameStarted(false));
}

export function* gameSaga() {
  while (true) {
    yield take(START_GAME);
    yield call(startGame);

    while (true) {
      const action = yield take([END_GAME, GO_TO_NEXT_QUESTION]);

      if (action.type === GO_TO_NEXT_QUESTION) {
        yield call(nextQuestion);
      } else {
        yield call(endGame);
        break;
      }
    }
  }
}

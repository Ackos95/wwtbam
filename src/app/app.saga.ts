import { fork, call, put } from 'redux-saga/effects';

import { gameSaga } from './game/game.saga';
import { questionsSaga } from './questions/questions.saga';

import { loadQuestions } from './questions/questions.actions';


function* initializeApp() {
  yield put(loadQuestions());
}

export function* appSaga() {
  yield fork(gameSaga);
  yield fork(questionsSaga);

  yield call(initializeApp)
}

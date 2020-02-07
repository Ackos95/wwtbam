import { takeLatest, put, call } from 'redux-saga/effects';
import { IQuestionsStateRaw } from './questions.types';

import { LOAD_QUESTIONS } from './questions.constants';
import { resetQuestions, storeQuestions } from './questions.actions';

import { parseQuestionsJSON } from './questions.utils';
import data from '../../fixtures/questions.json';


function* loadQuestions() {
  yield put(resetQuestions());

  const { questions, categories } = yield call(parseQuestionsJSON, data as IQuestionsStateRaw);
  yield put(storeQuestions(questions, categories));
}

export function* questionsSaga() {
  yield takeLatest(LOAD_QUESTIONS, loadQuestions);
}

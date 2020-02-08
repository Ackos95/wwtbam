import { take, call, put, select } from 'redux-saga/effects';

import { IGameDataRaw } from './game.types';
import { ANSWER_QUESTION, LOAD_GAMES, START_GAME } from './game.constants';
import {
  storeCurrentGame,
  storeCurrentQuestion,
  storeCurrentQuestionOption,
  storeGames, storeMessage,
  storeQuestionOptions,
  storeQuestions
} from './game.actions';

import { appSelectors } from '../app.selectors';
import {
  getQuestionIdByIndex,
  getQuestionIndexById,
  getQuestionOptionIdByIndex,
  getRandomNumber,
  parseGameDataRaw
} from './game.utils';

import data from '../../fixtures/games.json';


function* loadGames() {
  const { games, questions, questionOptions } = yield call(parseGameDataRaw, data as IGameDataRaw);

  yield put(storeGames(games));
  yield put(storeQuestions(questions));
  yield put(storeQuestionOptions(questionOptions));
}

function* getRandomOptionId () {
  const questionId = yield select(appSelectors.game.selectCurrentQuestionId);
  const numberOfOptions = yield select(appSelectors.game.selectCurrentQuestionNumberOfOptions);
  const questionOptionIndex = yield call(getRandomNumber, numberOfOptions);

  return yield call(getQuestionOptionIdByIndex, questionId, questionOptionIndex);
}

function* startGame(gameId: string) {
  yield put(storeMessage(null));
  yield put(storeCurrentGame(gameId));

  const questionId = yield call(getQuestionIdByIndex, gameId, 0);
  yield put(storeCurrentQuestion(questionId));

  const questionOptionId = yield call(getRandomOptionId);
  yield put(storeCurrentQuestionOption(questionOptionId));
}

function* endGame() {
  yield put(storeCurrentGame(null));
  yield put(storeCurrentQuestion(null));
  yield put(storeCurrentQuestionOption(null));
}

function* nextQuestion() {
  const currentGameId = yield select(appSelectors.game.selectCurrentGameId);
  const currentQuestionId = yield select(appSelectors.game.selectCurrentQuestionId);
  const currentQuestionIndex = yield call(getQuestionIndexById, currentQuestionId);
  const numberOfQuestions = yield select(appSelectors.game.selectCurrentGameNumberOfQuestions);

  if (currentQuestionIndex <= numberOfQuestions - 2) {
    const questionId = yield call(getQuestionIdByIndex, currentGameId, currentQuestionIndex + 1);
    yield put(storeCurrentQuestion(questionId));

    const questionOptionId = yield call(getRandomOptionId);
    yield put(storeCurrentQuestionOption(questionOptionId));
  } else {
    yield put(storeMessage('Congratulations! You won the game!'));

    yield endGame();
  }
}

function* answerQuestion(answer: number) {
  const currentQuestionOption = yield select(appSelectors.game.selectCurrentQuestionOption);

  if (currentQuestionOption.correct === answer) {
    yield nextQuestion();
  } else {
    yield put(storeMessage(`Wrong answer! Correct answer is: ${currentQuestionOption.correct} - "${currentQuestionOption.answers[currentQuestionOption.correct]}"`));

    yield endGame();
  }
}

export function* gameSaga() {
  yield take(LOAD_GAMES);
  yield call(loadGames);

  while (true) {
    const action = yield take([START_GAME, ANSWER_QUESTION]);
    if (action.type === START_GAME) {
      yield call(startGame, action.payload);
    } else if (action.type === ANSWER_QUESTION) {
      yield call(answerQuestion, action.payload);
    }
  }
}

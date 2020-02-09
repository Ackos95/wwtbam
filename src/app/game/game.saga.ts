import { take, call, put, select, delay, fork } from 'redux-saga/effects';

import { IGameDataRaw } from './game.types';
import { IAppState } from '../app.types';
import { ANSWER_QUESTION, GIVE_UP_GAME, LOAD_GAMES, START_GAME } from './game.constants';
import {
  storeCurrentGame,
  storeCurrentQuestion,
  storeCurrentQuestionOption,
  storeGames, storeMessage,
  storeQuestionOptions,
  storeQuestions
} from './game.actions';
import {
  storeCurrentAnswerIsCorrect,
  storeCurrentAnswerIsIgnored,
  storeCurrentAnswerIsInCorrect,
} from './answer-flags/answer-flags.actions';
import {
  storeAudienceHelp,
  storeFriendHelp,
  storeHelpAudienceUsed,
  storeHelpFriendUsed,
  storeHelpHalfUsed,
} from './help/help.actions';

import { helpSaga } from './help/help.saga';

import { appSelectors } from '../app.selectors';
import {
  getLastSafeQuestionIndexFrom,
  getQuestionIdByIndex,
  getQuestionIndexById,
  getQuestionOptionIdByIndex,
  parseGameDataRaw
} from './game.utils';
import { getRandomNumber } from '../common/common.utils';

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

function* clearHelpInfo() {
  yield put(storeCurrentAnswerIsIgnored(null));
  yield put(storeFriendHelp(null));
  yield put(storeAudienceHelp(null));
}

function* endGame() {
  yield put(storeCurrentGame(null));
  yield put(storeCurrentQuestion(null));
  yield put(storeCurrentQuestionOption(null));

  yield put(storeHelpAudienceUsed(false));
  yield put(storeHelpFriendUsed(false));
  yield put(storeHelpHalfUsed(false));

  yield call(clearHelpInfo);
}

function* nextQuestion() {
  const currentGameId = yield select(appSelectors.game.selectCurrentGameId);
  const currentQuestionId = yield select(appSelectors.game.selectCurrentQuestionId);
  const currentQuestionIndex = yield call(getQuestionIndexById, currentQuestionId);
  const numberOfQuestions = yield select(appSelectors.game.selectCurrentGameNumberOfQuestions);

  if (currentQuestionIndex <= numberOfQuestions - 2) {
    yield call(clearHelpInfo);

    const questionId = yield call(getQuestionIdByIndex, currentGameId, currentQuestionIndex + 1);
    yield put(storeCurrentQuestion(questionId));

    const questionOptionId = yield call(getRandomOptionId);
    yield put(storeCurrentQuestionOption(questionOptionId));
  } else {
    yield put(storeMessage('Congratulations! You won the game!'));

    yield endGame();
  }
}

function* calculateWinningByQuestionIndex(safeQuestionIndex: number) {
  let wonSum: string = '0';
  if (safeQuestionIndex > -1) {
    const currentGameId = yield select(appSelectors.game.selectCurrentGameId);
    const safeQuestionId = yield call(getQuestionIdByIndex, currentGameId, safeQuestionIndex);
    const safeQuestion = yield select((state: IAppState) => appSelectors.game.selectQuestionById(state, safeQuestionId));

    wonSum = safeQuestion.value;
  }

  return wonSum;
}

function* answerQuestion(answer: number) {
  const currentQuestionOption = yield select(appSelectors.game.selectCurrentQuestionOption);

  if (currentQuestionOption.correct === answer) {
    yield put(storeCurrentAnswerIsCorrect(answer));

    yield delay(3000);
    yield put(storeCurrentAnswerIsCorrect(null));

    yield nextQuestion();
  } else {
    yield put(storeCurrentAnswerIsInCorrect(answer));

    yield delay(3000);
    yield put(storeCurrentAnswerIsInCorrect(null));

    const currentQuestionId = yield select(appSelectors.game.selectCurrentQuestionId);
    const questionIndex = yield call(getQuestionIndexById, currentQuestionId);
    const lastSafeQuestionIndex = yield call(getLastSafeQuestionIndexFrom, questionIndex);

    const wonSum: string = yield call(calculateWinningByQuestionIndex, lastSafeQuestionIndex);
    yield put(storeMessage(
      `Wrong answer! Correct answer was: "${currentQuestionOption.answers[currentQuestionOption.correct]}".
      You won: ${wonSum}`
    ));

    yield endGame();
  }
}

function* giveUpGame() {
  const currentQuestionId = yield select(appSelectors.game.selectCurrentQuestionId);
  const currentQuestionIndex = yield call(getQuestionIndexById, currentQuestionId);
  const safeQuestionIndex = currentQuestionIndex - 1;

  const wonSum: string = yield call(calculateWinningByQuestionIndex, safeQuestionIndex);
  yield put(storeMessage(`Thank you for playing. You won: ${wonSum}`));
  yield endGame();
}

export function* gameSaga() {
  yield take(LOAD_GAMES);
  yield call(loadGames);

  yield fork(helpSaga);
  while (true) {
    const action = yield take([START_GAME, ANSWER_QUESTION, GIVE_UP_GAME]);
    if (action.type === START_GAME) {
      yield call(startGame, action.payload);
    } else if (action.type === ANSWER_QUESTION) {
      yield call(answerQuestion, action.payload);
    } else if (action.type === GIVE_UP_GAME) {
      yield call(giveUpGame);
    }
  }
}

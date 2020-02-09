import { take, call, select, put } from 'redux-saga/effects';
import { USE_HELP_AUDIENCE, USE_HELP_FRIEND, USE_HELP_HALF } from './help.constants';

import { appSelectors } from '../../app.selectors';

import {
  getAudiencePossibilityToHit, getAudienceSuggestions,
  getFriendPossibilityToHit,
  getFriendSuggestion,
  getIgnoredAnswers
} from './help.utils';
import { getQuestionIndexById } from '../game.utils';

import {
  storeAudienceHelp,
  storeFriendHelp,
  storeHelpAudienceUsed,
  storeHelpFriendUsed,
  storeHelpHalfUsed
} from './help.actions';
import { storeCurrentAnswerIsIgnored } from '../answer-flags/answer-flags.actions';

import { IQuestionOption } from '../game.types';


function* getQuestionIndexAndAnswers(currentQuestionOption: IQuestionOption) {
  const currentGame = yield select(appSelectors.game.selectCurrentGame);
  const currentQuestionId = yield select(appSelectors.game.selectCurrentQuestionId);
  const currentQuestionIndex = yield call(getQuestionIndexById, currentQuestionId);
  const currentlyIgnoredAnswers = yield select(appSelectors.game.answerFlags.selectCurrentAnswerIsIgnored);
  const answers = currentlyIgnoredAnswers ?
    currentQuestionOption.answers.map(
      (a: string, index: number) => index !== currentlyIgnoredAnswers[0] && index !== currentlyIgnoredAnswers[1] ? index : null
    ).filter((index: number | null) => index !== null) :
    currentQuestionOption.answers.map((answer: string, index: number) => index);

  return {
    currentQuestionIndex,
    currentlyIgnoredAnswers,
    answers,
    currentGame,
  };
}

function* useHelpHalf() {
  const helpHalfIsUsed = yield select(appSelectors.game.help.selectHelpHalfUsed);
  const currentQuestionOption = yield select(appSelectors.game.selectCurrentQuestionOption);

  if (!helpHalfIsUsed && !!currentQuestionOption) {
    const ignoredAnswers = yield call(getIgnoredAnswers, currentQuestionOption.answers, currentQuestionOption.correct);

    yield put(storeHelpHalfUsed(true));
    yield put(storeCurrentAnswerIsIgnored(ignoredAnswers));
  }
}

function* useHelpFriend() {
  const helpFriendIsUsed = yield select(appSelectors.game.help.selectHelpFriendUsed);
  const currentQuestionOption = yield select(appSelectors.game.selectCurrentQuestionOption);

  if (!helpFriendIsUsed && !!currentQuestionOption) {
    const {
      currentQuestionIndex,
      currentlyIgnoredAnswers,
      answers,
      currentGame,
    } = yield call(getQuestionIndexAndAnswers, currentQuestionOption);

    const possibility = yield call(
      getFriendPossibilityToHit,
      currentQuestionIndex,
      !!currentlyIgnoredAnswers,
      currentGame.friendPossibilities,
    );
    const suggestion = yield call(getFriendSuggestion, answers, currentQuestionOption.correct, possibility);

    yield put(storeHelpFriendUsed(true));
    yield put(storeFriendHelp({ suggestion, possibility }));
  }
}

function* useHelpAudience() {
  const helpAudienceIsUsed = yield select(appSelectors.game.help.selectHelpAudienceUsed);
  const currentQuestionOption = yield select(appSelectors.game.selectCurrentQuestionOption);

  if (!helpAudienceIsUsed && !!currentQuestionOption) {
    const {
      currentQuestionIndex,
      currentlyIgnoredAnswers,
      answers,
      currentGame,
    } = yield call(getQuestionIndexAndAnswers, currentQuestionOption);

    const possibilities = yield call(
      getAudiencePossibilityToHit,
      currentQuestionIndex,
      !!currentlyIgnoredAnswers,
      currentGame.audiencePossibilities
    );
    const suggestions = yield call(getAudienceSuggestions, answers, currentQuestionOption.correct, possibilities);

    yield put(storeHelpAudienceUsed(true));
    yield put(storeAudienceHelp({ suggestions }));
  }
}

export function* helpSaga() {
  while (true) {
    const action = yield take([USE_HELP_HALF, USE_HELP_FRIEND, USE_HELP_AUDIENCE]);

    if (action.type === USE_HELP_HALF) {
      yield call(useHelpHalf);
    } else if (action.type === USE_HELP_FRIEND) {
      yield call(useHelpFriend)
    } else if (action.type === USE_HELP_AUDIENCE) {
      yield call(useHelpAudience)
    }
  }
}

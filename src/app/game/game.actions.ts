import {
  IStartGameAction,
  IEndGameAction,
  IStoreHasGameStarted,
  IStoreCurrentQuestion,
  IResetCurrentQuestion,
  IGoToNextQuestion,
} from './game.types';
import {
  END_GAME,
  GO_TO_NEXT_QUESTION,
  RESET_CURRENT_QUESTION,
  START_GAME,
  STORE_CURRENT_QUESTION,
  STORE_GAME_HAS_STARTED
} from './game.constants';


export const startGame = (): IStartGameAction => ({
  type: START_GAME,
});

export const endGame = (): IEndGameAction => ({
  type: END_GAME,
});

export const storeHasGameStarted = (hasStarted: boolean): IStoreHasGameStarted => ({
  type: STORE_GAME_HAS_STARTED,
  payload: hasStarted,
});

export const goToNextQuestion = (): IGoToNextQuestion => ({
  type: GO_TO_NEXT_QUESTION,
});

export const storeCurrentQuestion = (currentQuestion: number): IStoreCurrentQuestion => ({
  type: STORE_CURRENT_QUESTION,
  payload: currentQuestion,
});

export const resetCurrentQuestion = (): IResetCurrentQuestion => ({
  type: RESET_CURRENT_QUESTION,
});

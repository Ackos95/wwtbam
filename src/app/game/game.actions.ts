import {
  IStartGameAction,
  IStoreCurrentGame,
  IStoreCurrentQuestion,
  IStoreCurrentQuestionOption,
  ILoadGamesAction,
  IGameState,
  IStoreGamesAction,
  IStoreQuestionsAction,
  IStoreQuestionOptionsAction,
  IAnswerQuestion,
  IStoreMessage,
  IStoreCurrentAnswerIsCorrect,
  IStoreCurrentAnswerIsInCorrect,
} from './game.types';
import {
  START_GAME,
  STORE_CURRENT_GAME,
  STORE_CURRENT_QUESTION,
  STORE_CURRENT_QUESTION_OPTION,
  LOAD_GAMES,
  STORE_GAMES,
  STORE_QUESTIONS,
  STORE_QUESTION_OPTIONS,
  ANSWER_QUESTION,
  STORE_MESSAGE,
  STORE_CURRENT_ANSWER_IS_CORRECT,
  STORE_CURRENT_ANSWER_IS_INCORRECT,
} from './game.constants';


export const loadGames = (): ILoadGamesAction => ({
  type: LOAD_GAMES,
});

export const storeGames = (games: IGameState['games']): IStoreGamesAction => ({
  type: STORE_GAMES,
  payload: games,
});

export const storeQuestions = (questions: IGameState['questions']): IStoreQuestionsAction => ({
  type: STORE_QUESTIONS,
  payload: questions,
});

export const storeQuestionOptions = (questionOptions: IGameState['questionOptions']): IStoreQuestionOptionsAction => ({
  type: STORE_QUESTION_OPTIONS,
  payload: questionOptions,
});

export const startGame = (gameId: string): IStartGameAction => ({
  type: START_GAME,
  payload: gameId,
});

export const storeCurrentGame = (gameId: string | null): IStoreCurrentGame => ({
  type: STORE_CURRENT_GAME,
  payload: gameId,
});

export const answerQuestion = (answer: number): IAnswerQuestion => ({
  type: ANSWER_QUESTION,
  payload: answer,
});

export const storeCurrentQuestion = (currentQuestion: string | null): IStoreCurrentQuestion => ({
  type: STORE_CURRENT_QUESTION,
  payload: currentQuestion,
});

export const storeCurrentQuestionOption = (currentQuestionOption: string | null): IStoreCurrentQuestionOption => ({
  type: STORE_CURRENT_QUESTION_OPTION,
  payload: currentQuestionOption,
});

export const storeMessage = (message: string | null): IStoreMessage => ({
  type: STORE_MESSAGE,
  payload: message,
});

export const storeCurrentAnswerIsCorrect = (isCorrect: number | null): IStoreCurrentAnswerIsCorrect => ({
  type: STORE_CURRENT_ANSWER_IS_CORRECT,
  payload: isCorrect,
});

export const storeCurrentAnswerIsInCorrect = (isInCorrect: number | null): IStoreCurrentAnswerIsInCorrect => ({
  type: STORE_CURRENT_ANSWER_IS_INCORRECT,
  payload: isInCorrect,
});

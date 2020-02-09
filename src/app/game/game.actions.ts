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
  IGiveUpGame,
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
  GIVE_UP_GAME,
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

export const giveUpGame = (): IGiveUpGame => ({
  type: GIVE_UP_GAME,
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

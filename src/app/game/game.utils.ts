import {
  IGame,
  IGameDataRaw,
  IGameRaw,
  IGameState,
  IQuestion,
  IQuestionOption,
  IQuestionOptionRaw,
  IQuestionRaw
} from './game.types';


const DEFAULT_QUESTION_VALUES = [
  '$100',
  '$200',
  '$300',
  '$500',
  '$1.000',
  '$2.000',
  '$4.000',
  '$8.000',
  '$16.000',
  '$32.000',
  '$64.000',
  '$125.000',
  '$250.000',
  '$500.000',
  '$1.000.000',
];

export const getRandomNumber = (maxNumber: number) =>
  Math.floor(Math.random() * maxNumber);

export const getGameIdByIndex = (gameIndex: number) =>
  `gNo-${gameIndex}`;

export const getQuestionIdByIndex = (gameId: string, questionIndex: number) =>
  `${gameId}-qNo-${questionIndex}`;

export const getQuestionIndexById = (questionId: string) => {
  const questionIdMatch = questionId.match(/[0-9]+$/);

  return questionIdMatch && +questionIdMatch[0];
};

export const getQuestionOptionIdByIndex = (questionId: string, questionOptionIndex: number) =>
  `${questionId}-${questionOptionIndex}`;

export const getLastSafeQuestionIndexFrom = (questionIndex: number) =>
  questionIndex > 9 ? questionIndex - 1: questionIndex - (questionIndex % 5) - 1;

export const parseGameDataRaw = (gameDataRaw: IGameDataRaw): {
  games: IGameState['games'];
  questions: IGameState['questions'];
  questionOptions: IGameState['questionOptions'];
} => {
  const games: IGameState['games'] = {};
  const questions: IGameState['questions'] = {};
  const questionOptions: IGameState['questionOptions'] = {};

  gameDataRaw.games.forEach((gameRaw: IGameRaw, gameIndex) => {
    const gameId = getGameIdByIndex(gameIndex);
    const game: IGame = {
      id: gameId,
      name: gameRaw.name,
      description: gameRaw.description,
      questions: [],
    };

    gameRaw.questions.forEach((questionRaw: IQuestionRaw, questionIndex) => {
      const questionId = getQuestionIdByIndex(gameId, questionIndex);
      const question: IQuestion = {
        id: questionId,
        value: questionRaw.value || DEFAULT_QUESTION_VALUES[questionIndex] || `((questionId + 1) * 100)p`,
        options: [],
      };

      questionRaw.options.forEach((questionOptionRaw: IQuestionOptionRaw, questionOptionIndex) => {
        const questionOptionId = getQuestionOptionIdByIndex(questionId, questionOptionIndex);
        const questionOption: IQuestionOption = {
          id: questionOptionId,
          text: questionOptionRaw.text,
          answers: questionOptionRaw.answers,
          correct: questionOptionRaw.correct,
        };

        question.options.push(questionOption.id);
        questionOptions[questionOption.id] = questionOption;
      });

      game.questions.push(question.id);
      questions[question.id] = question;
    });

    games[game.id] = game;
  });

  return {
    games,
    questions,
    questionOptions,
  };
};

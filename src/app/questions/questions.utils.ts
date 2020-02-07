import { IQuestion, IQuestionCategory, IQuestionsState, IQuestionsStateRaw } from './questions.types';


export const parseQuestionsJSON = (questionsJSON: IQuestionsStateRaw): IQuestionsState => {
  const categories: IQuestionsState['categories'] = {};
  const questions: IQuestionsState['questions'] = {};

  questionsJSON.categories.forEach((c, ci) => {
    const category: IQuestionCategory = {
      id: `cNo-${ci}`,
      questions: c.questions.map((q, qi) => {
        const question: IQuestion = {
          id: `cNo-${ci}-qNo-${qi}`,
          text: q.text,
          answers: q.answers,
          correct: q.correct,
        };

        questions[question.id] = question;
        return question.id;
      }),
    };

    categories[category.id] = category;
  });

  return {
    categories,
    questions,
  };
};

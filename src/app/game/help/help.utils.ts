import { getRandomNumber } from '../../common/common.utils';


export const getIgnoredAnswers = (answers: string[], correct: number): [number, number] => {
  const pickFrom = answers.map((answer, index) => index).filter((index) => index !== correct);
  const random = getRandomNumber(pickFrom.length);

  return pickFrom.filter((i, index) => index !== random) as [number, number];
};

const getPossibilityToHit = (questionIndex: number, areAnswersIgnored: boolean, possibilityList: number[]): number => {
  const lower = Math.floor(questionIndex / 5);
  const difference = possibilityList[lower + 1] - possibilityList[lower];
  const qNumber = questionIndex % 5 + 1;

  const basePossibility = possibilityList[lower] + (qNumber * difference) / 5;
  const noise = (getRandomNumber(10) - 5) * (lower + 1);
  const possibilityWithNoise = basePossibility + noise;
  const possibility = possibilityWithNoise < 0 ? 1 : (possibilityWithNoise > 100 ? 100 : possibilityWithNoise);

  return areAnswersIgnored ? Math.floor((possibility * 2 + 100) / 3) : possibility;
};

export const getFriendPossibilityToHit = (
  questionIndex: number,
  areAnswersIgnored: boolean,
  possibilities: [number, number, number, number, number]
): number => {
  return getPossibilityToHit(questionIndex, areAnswersIgnored, possibilities);
};

export const getFriendSuggestion = (answers: number[], correct: number, possibility: number): number => {
  if (Math.random() * 100 - possibility < 0 ) {
    return correct;
  } else {
    const pickFrom = answers.filter((index) => index !== correct);
    const random = getRandomNumber(pickFrom.length);

    return pickFrom.find((i, index) => index === random)!;
  }
};

export const getAudiencePossibilityToHit = (
  questionIndex: number,
  areAnswersIgnored: boolean,
  possibilities: [number, number, number, number, number]
) => {
  const correctPossibility = getPossibilityToHit(questionIndex, areAnswersIgnored, possibilities);
  let remainingPossibility = 100 - correctPossibility;

  const otherPossibilities = [];

  if (!areAnswersIgnored) {
    otherPossibilities.push(getRandomNumber(remainingPossibility + 1));
    remainingPossibility -= otherPossibilities[0];
    otherPossibilities.push(getRandomNumber(remainingPossibility + 1));
    remainingPossibility -= otherPossibilities[1];
  }

  otherPossibilities.push(remainingPossibility);

  // shuffle array
  for (let i = otherPossibilities.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [otherPossibilities[i], otherPossibilities[j]] = [otherPossibilities[j], otherPossibilities[i]];
  }

  return {
    correctPossibility,
    otherPossibilities,
  };
};

export const getAudienceSuggestions = (
  answers: number[],
  correct: number,
  possibilities: {
    correctPossibility: number,
    otherPossibilities: [number, number, number] | [number]
  }
) => {
  const suggestions = [0, 0, 0, 0];
  let otherPossibilityIndex = 0;

  answers.forEach((answer: number) => {
    suggestions[answer] = answer === correct ?
      possibilities.correctPossibility :
      possibilities.otherPossibilities[otherPossibilityIndex++]
  });

  return suggestions;
};

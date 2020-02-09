import React, { FunctionComponent } from 'react';


export const AnswerButton: FunctionComponent<{
  answer: string;
  index: number;
  isCorrect: boolean;
  isInCorrect: boolean;
  onClick: () => void;
}> = ({ answer, index, isCorrect, isInCorrect, onClick }) => {
  const letter = ['A', 'B', 'C', 'D'][index];

  return (
    <div
      className={`answer-button${isCorrect ? ' --correct' : ''}${isInCorrect ? ' --incorrect' : ''}`}
      onClick={onClick}
    >
      <span className="answer-index">{letter}:</span> {answer}
    </div>
  );
};

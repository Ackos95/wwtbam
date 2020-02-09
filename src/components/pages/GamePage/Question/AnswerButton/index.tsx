import React, { FunctionComponent } from 'react';


export const AnswerButton: FunctionComponent<{
  answer: string;
  index: number;
  isCorrect: boolean;
  onClick: () => void;
}> = ({ answer, index, isCorrect, onClick }) => {
  const letter = ['A', 'B', 'C', 'D'][index];

  return (
    <div className={`answer-button${isCorrect ? ' --correct' : ''}`} onClick={onClick}>
      <span className="answer-index">{letter}:</span> {answer}
    </div>
  );
};

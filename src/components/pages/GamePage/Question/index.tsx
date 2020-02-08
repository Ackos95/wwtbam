import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@blueprintjs/core';

import { answerQuestion } from '../../../../app/game/game.actions';
import { appSelectors } from '../../../../app/app.selectors';


export const Question = () => {
  const dispatch = useDispatch();
  const currentQuestionOption = useSelector(appSelectors.game.selectCurrentQuestionOption);

  const handleAnswer = useCallback(
    (answer: number) => () => dispatch(answerQuestion(answer)),
    [dispatch],
  );

  return currentQuestionOption ? (
    <div className="question-form">
      <div className="question-text">
        {currentQuestionOption.text}
      </div>
      <div className="question-answers">
        {
          currentQuestionOption.answers.map((answer, index) => (
            <Button key={`${currentQuestionOption.id}-aNo-${index}`} onClick={handleAnswer(index)}>{answer}</Button>
          ))
        }
      </div>
    </div>
  ) : null;
};

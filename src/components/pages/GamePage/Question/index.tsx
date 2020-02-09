import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AnswerButton } from './AnswerButton';

import { answerQuestion } from '../../../../app/game/game.actions';
import { appSelectors } from '../../../../app/app.selectors';


export const Question = () => {
  const dispatch = useDispatch();
  const currentQuestionOption = useSelector(appSelectors.game.selectCurrentQuestionOption);
  const currentAnswerIsCorrect = useSelector(appSelectors.game.selectCurrentAnswerIsCorrect);

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
            <AnswerButton
              key={`${currentQuestionOption.id}-aNo-${index}`}
              onClick={handleAnswer(index)}
              index={index}
              isCorrect={index === currentAnswerIsCorrect}
              answer={answer}
            />
          ))
        }
      </div>
    </div>
  ) : null;
};

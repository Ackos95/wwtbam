import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../../../app/app.types';

import { Button } from '@blueprintjs/core';

import {
  selectCurrentQuestion,
  selectHasGameStarted,
  selectNumberOfCategories, selectNumberOfQuestionsInCategory, selectQuestionFromCategory,
} from '../../../../app/app.selectors';
import { endGame, goToNextQuestion } from '../../../../app/game/game.actions';


export const Questions = () => {
  const dispatch = useDispatch();
  const hasGameStarted = useSelector(selectHasGameStarted);
  const currentQuestionCategory = useSelector(selectCurrentQuestion);

  const numberOfCategories = useSelector(selectNumberOfCategories);
  const numberOfQuestions = useSelector((state: IAppState) => selectNumberOfQuestionsInCategory(state, { category: `cNo-${currentQuestionCategory}` }));
  const question = useSelector((state: IAppState) =>
    selectQuestionFromCategory(state, { category: `cNo-${currentQuestionCategory}`, questionIndex: Math.floor(Math.random() * Math.floor(numberOfQuestions)) })
  );

  const handleNext = useCallback(() => dispatch(goToNextQuestion()), [dispatch]);
  const handleEnd = useCallback(() => dispatch(endGame()), [dispatch]);

  return hasGameStarted ? (
    <div>
      Current question is:
      <br />
      {question ? question.text : 'Something went wrong!'}
      <br />
      {
        question ? (
          question.answers.map((answer) => (
            <li key={`${question.id}-${answer}`}>{answer}</li>
          ))
        ) : null
      }
      <hr />

      <Button onClick={handleEnd}>End Quiz</Button>
      <Button disabled={currentQuestionCategory >= numberOfCategories - 1} onClick={handleNext}>Next Question</Button>
    </div>
  ) : null;
};

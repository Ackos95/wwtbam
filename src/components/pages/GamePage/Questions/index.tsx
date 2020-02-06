import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@blueprintjs/core';

import { selectCurrentQuestion, selectHasGameStarted } from '../../../../app/app.selectors';
import { endGame, goToNextQuestion } from '../../../../app/game/game.actions';


export const Questions = () => {
  const dispatch = useDispatch();
  const hasGameStarted = useSelector(selectHasGameStarted);
  const currentQuestion = useSelector(selectCurrentQuestion);

  const handleNext = useCallback(() => dispatch(goToNextQuestion()), [dispatch]);
  const handleEnd = useCallback(() => dispatch(endGame()), [dispatch]);

  return hasGameStarted ? (
    <div>
      Current question is: {currentQuestion}

      <Button onClick={handleEnd}>End Quiz</Button>
      <Button onClick={handleNext}>Next Question</Button>
    </div>
  ) : null;
};

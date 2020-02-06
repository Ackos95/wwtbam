import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@blueprintjs/core';

import {
  startGame as startGameAction,
  endGame as endGameAction,
} from '../../../app/game/game.actions';

import { selectHasGameStarted } from '../../../app/app.selectors';


export const GamePage = () => {
  const dispatch = useDispatch();
  const hasGameStarted = useSelector(selectHasGameStarted);

  const handleButtonClick = useCallback(
    () => dispatch(hasGameStarted ? endGameAction() : startGameAction()),
    [dispatch, hasGameStarted]
  );

  return (
    <div>
      <h1>
        Game page!
      </h1>

      <Button onClick={handleButtonClick}>{hasGameStarted ? 'End Game' : 'Start Game'}</Button>
    </div>
  );
};

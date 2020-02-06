import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@blueprintjs/core';
import { Questions } from './Questions';

import { startGame as startGameAction } from '../../../app/game/game.actions';

import { selectHasGameStarted } from '../../../app/app.selectors';


export const GamePage = () => {
  const dispatch = useDispatch();
  const hasGameStarted = useSelector(selectHasGameStarted);

  const handleStart = useCallback(() => dispatch(startGameAction()),[dispatch]);

  return (
    <div>
      <h1>
        Game page!
      </h1>

      <Questions />
      {!hasGameStarted && <Button onClick={handleStart}>Start Game</Button>}
    </div>
  );
};

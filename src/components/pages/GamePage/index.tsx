import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';

import { Button } from '@blueprintjs/core';
import { Question } from './Question';

import { appSelectors } from '../../../app/app.selectors';
import { startGame } from '../../../app/game/game.actions';


export const GamePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId } = useParams<{ gameId: string }>();

  const currentGame = useSelector(appSelectors.game.selectCurrentGame);
  const message = useSelector(appSelectors.game.selectMessage);

  const handlePlayAgain = useCallback(
    () => dispatch(startGame(gameId)),
    [gameId, dispatch]
  );
  const handleGoBack = useCallback(
    () => history.push('/'),
    [history]
  );

  useEffect(() => {
    if (gameId) {
      dispatch(startGame(gameId));
    }
  }, [gameId, dispatch]);

  return currentGame ? (
    <div>
      <h1>{currentGame.name}</h1>

      <Question />
    </div>
  ) : (
    <div>
      <h2>{message}</h2>
      <Button onClick={handlePlayAgain}>Play Again!</Button>
      <Button onClick={handleGoBack}>Back to Menu</Button>
    </div>
  )
};

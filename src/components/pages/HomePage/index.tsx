import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '@blueprintjs/core';

import { appSelectors } from '../../../app/app.selectors';


export const HomePage = () => {
  const history = useHistory();
  const games = useSelector(appSelectors.game.selectGameList);

  const handleStartGame = useCallback(
    (gameId: string) => () => history.push(`/game/${gameId}`),
    [history]
  );

  return (
    <div>
      <h1>Welcome</h1>
      <hr />
      <h3>Select a game: </h3>
      {
        games.map((game) => (
          <div key={game.id}>
            <p>{game.name} <span>{game.description ? `(${game.description})` : ''}</span></p>
            <Button onClick={handleStartGame(game.id)}>Play</Button>
          </div>
        ))
      }
    </div>
  );
};

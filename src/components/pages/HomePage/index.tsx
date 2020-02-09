import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LogoImage } from '../../common/LogoImage';

import { appSelectors } from '../../../app/app.selectors';

import './assets/styles/index.css';


export const HomePage = () => {
  const history = useHistory();
  const games = useSelector(appSelectors.game.selectGameList);

  const handleStartGame = useCallback(
    (gameId: string) => () => history.push(`/game/${gameId}`),
    [history]
  );

  return (
    <div className="home-page">
      <LogoImage />
      <div className="game-selection">Select a game: </div>
      <div className="all-games">
        {
          games.map((game) => (
            <div key={game.id} className="game-item">
              <div className="game-name">
                {game.name}
                <span className="game-description">{game.description ? ` (${game.description})` : ''}</span>
              </div>
              <div className="default-button" onClick={handleStartGame(game.id)}>Play</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

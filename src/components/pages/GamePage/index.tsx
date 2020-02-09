import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';

import { Question } from './Question';
import { LogoImage } from '../../common/LogoImage';
import { QuestionTree } from './QuestionTree';

import { appSelectors } from '../../../app/app.selectors';
import { startGame } from '../../../app/game/game.actions';

import './assets/styles/index.css';


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
    <div className="game-page">
      <div className="question-box">
        <LogoImage />
        <Question />
      </div>
      <div className="question-tree">
        <QuestionTree />
      </div>
    </div>
  ) : (
    <div className="game-finished-page">
      <LogoImage />
      <div className="final-message">{message || 'JUst a random test message for testing'}</div>
      <div className="game-finished-buttons">
        <div className="default-button" onClick={handleGoBack}>Back to Menu</div>
        <div className="default-button" onClick={handlePlayAgain}>Play Again!</div>
      </div>
    </div>
  )
};

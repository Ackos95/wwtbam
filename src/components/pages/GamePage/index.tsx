import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';

import { Question } from './Question';
import { LogoImage } from '../../common/LogoImage';
import { QuestionTree } from './QuestionTree';

import { appSelectors } from '../../../app/app.selectors';
import { giveUpGame, startGame } from '../../../app/game/game.actions';
import { helpAudicence, helpFriend, helpHalf } from '../../../app/game/help/help.actions';

import phoneImage from './assets/images/phone.svg';
import peopleImage from './assets/images/people.svg';
import scaleImage from './assets/images/scale.svg';

import './assets/styles/index.css';


export const GamePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId } = useParams<{ gameId: string }>();

  const currentGame = useSelector(appSelectors.game.selectCurrentGame);
  const message = useSelector(appSelectors.game.selectMessage);

  const helpAudienceUsed = useSelector(appSelectors.game.help.selectHelpAudienceUsed);
  const helpFriendUsed = useSelector(appSelectors.game.help.selectHelpFriendUsed);
  const helpHalfUsed = useSelector(appSelectors.game.help.selectHelpHalfUsed);

  const handlePlayAgain = useCallback(
    () => dispatch(startGame(gameId)),
    [gameId, dispatch]
  );
  const handleGoBack = useCallback(
    () => history.push('/'),
    [history]
  );

  const handleGiveUp = useCallback(
    () => dispatch(giveUpGame()),
    [dispatch],
  );

  const handleHalfHelp = useCallback(
    () => dispatch(helpHalf()),
    [dispatch],
  );

  const handleFriendHelp = useCallback(
    () => dispatch(helpFriend()),
    [dispatch],
  );

  const handleAudienceHelp = useCallback(
    () => dispatch(helpAudicence()),
    [dispatch],
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
        <div className="help-buttons">
          <div
            className={`default-button help-button${helpHalfUsed ? ' --used' : ''}`}
            onClick={handleHalfHelp}
          >
            <img src={scaleImage} alt="50:50" />
          </div>
          <div
            className={`default-button help-button${helpFriendUsed ? ' --used' : ''}`}
            onClick={handleFriendHelp}
          >
            <img src={phoneImage} alt="Friend" />
          </div>
          <div
            className={`default-button help-button${helpAudienceUsed ? ' --used' : ''}`}
            onClick={handleAudienceHelp}
          >
            <img src={peopleImage} alt="Audience" />
          </div>
        </div>
        <QuestionTree />
        <div className="default-button give-up-button" onClick={handleGiveUp}>Give Up</div>
      </div>
    </div>
  ) : (
    <div className="game-finished-page">
      <LogoImage />
      <div className="final-message">{message}</div>
      <div className="game-finished-buttons">
        <div className="default-button" onClick={handleGoBack}>Back to Menu</div>
        <div className="default-button" onClick={handlePlayAgain}>Play Again!</div>
      </div>
    </div>
  )
};

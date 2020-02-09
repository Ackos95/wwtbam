import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AnswerButton } from './AnswerButton';
import { HelpDialog } from './HelpDialog';

import { answerQuestion } from '../../../../app/game/game.actions';
import { appSelectors } from '../../../../app/app.selectors';


export const Question = () => {
  const dispatch = useDispatch();
  const currentQuestionOption = useSelector(appSelectors.game.selectCurrentQuestionOption);

  const currentAnswerIsCorrect = useSelector(appSelectors.game.answerFlags.selectCurrentAnswerIsCorrect);
  const currentAnswerIsInCorrect = useSelector(appSelectors.game.answerFlags.selectCurrentAnswerIsInCorrect);
  const currentAnswerIsIgnored = useSelector(appSelectors.game.answerFlags.selectCurrentAnswerIsIgnored);

  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const friendHelpShown = useRef(false);
  const audienceHelpShown = useRef(false);

  const friendHelp = useSelector(appSelectors.game.help.selectFriendHelp);
  const audienceHelp = useSelector(appSelectors.game.help.selectAudienceHelp);

  const handleAnswer = useCallback(
    (answer: number) => () => dispatch(answerQuestion(answer)),
    [dispatch],
  );
  const handleCloseHelpDialog = useCallback(
    () => {
      setHelpDialogOpen(false);
      if (friendHelp) {
        friendHelpShown.current = true;
      } else if (audienceHelp) {
        audienceHelpShown.current = true;
      }
    },[setHelpDialogOpen, friendHelp, friendHelpShown, audienceHelp, audienceHelpShown],
  );

  useEffect(() => {
    if (friendHelp && !friendHelpShown.current) {
      setHelpDialogOpen(true);
    } else if (audienceHelp && !audienceHelpShown.current) {
      setHelpDialogOpen(true);
    }
  }, [friendHelp, audienceHelp, friendHelpShown, audienceHelpShown, setHelpDialogOpen]);

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
              isInCorrect={index === currentAnswerIsInCorrect}
              isIgnored={!!currentAnswerIsIgnored && (index === currentAnswerIsIgnored[0] || index === currentAnswerIsIgnored[1])}
              answer={answer}
            />
          ))
        }
      </div>
      <HelpDialog
        isOpen={helpDialogOpen}
        onClose={handleCloseHelpDialog}
        friendHelpShown={friendHelpShown.current}
        audienceHelpShown={audienceHelpShown.current}
      />
    </div>
  ) : null;
};

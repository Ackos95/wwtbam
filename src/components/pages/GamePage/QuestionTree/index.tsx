import React, { FunctionComponent, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { QuestionTreeEntry } from './QuestionTreeEntry';

import { appSelectors } from '../../../../app/app.selectors';


export const QuestionTree: FunctionComponent = () => {
  const currentGame = useSelector(appSelectors.game.selectCurrentGame);
  const reversedQuestion = useMemo(
    () => currentGame && currentGame.questions.slice().reverse(),
    [currentGame]
  );

  return currentGame ? (
    <>
      {
        reversedQuestion!.map((questionId, index, arr) => (
          <QuestionTreeEntry
            key={questionId}
            questionId={questionId}
            index={arr.length - index}
          />
        ))
      }
    </>
  ) : null;
};

import React, { FunctionComponent, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { IAppState } from '../../../../../app/app.types';

import { appSelectors } from '../../../../../app/app.selectors';


export const QuestionTreeEntry: FunctionComponent<{ questionId: string; index: number }> = ({ questionId, index }) => {
  const currentQuestionId = useSelector(appSelectors.game.selectCurrentQuestionId);
  const currentQuestion = useSelector((state: IAppState) => appSelectors.game.selectQuestionById(state, questionId));
  const isActive = useMemo(() => currentQuestionId === questionId, [currentQuestionId, questionId]);
  const isForSure = useMemo(() => index % 5 === 0, [index]);

  return currentQuestionId ? (
    <div className={`question-tree-entry${isActive ? ' --active' : ''}${isForSure ? ' --sure' : ''}`}>
      <span className="question-tree-entry-index">{index}.</span> {currentQuestion!.value}
    </div>
  ) : null;
};

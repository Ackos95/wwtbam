import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Dialog } from '@blueprintjs/core';

import { appSelectors } from '../../../../../app/app.selectors';


export const HelpDialog: FunctionComponent<{
  isOpen: boolean;
  onClose: () => void;
  friendHelpShown: boolean;
  audienceHelpShown: boolean;
}> = ({ isOpen, onClose, friendHelpShown, audienceHelpShown }) => {
  const friendHelp = useSelector(appSelectors.game.help.selectFriendHelp);
  const audienceHelp = useSelector(appSelectors.game.help.selectAudienceHelp);

  const answers = ['A', 'B', 'C', 'D'];

  return (
    <Dialog
      className="help-dialog"
      isOpen={isOpen}
      onClose={onClose}
    >
      {
        friendHelp && !friendHelpShown ? (
          <div className="help-response">
            Friend's answer is: "{answers[friendHelp.suggestion]}", with possibility {friendHelp.possibility}%
          </div>
        ) : null
      }
      {
        audienceHelp && !audienceHelpShown ? (
          <div className="help-response">
            Audience response is:
            {
              audienceHelp.suggestions.map((possibility: number, index: number) => (
                <div className="answer-possibility">{answers[index]}: {possibility}%</div>
              ))
            }
          </div>
        ) : null
      }

      <div className="default-button help-response-button" onClick={onClose}>Ok</div>
    </Dialog>
  );
};

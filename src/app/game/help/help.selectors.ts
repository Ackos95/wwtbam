import { createSelector } from '../../common/common.selectors';
import {
  IHelpSelectors,
  ISelectAudienceHelp,
  ISelectFriendHelp,
  ISelectHelpAudienceUsed,
  ISelectHelpFriendUsed,
  ISelectHelpHalfUsed
} from './help.types';


const selectHelpAudienceUsed: ISelectHelpAudienceUsed = createSelector(
  [(state) => state.helpAudienceUsed],
  (used) => used,
);

const selectHelpFriendUsed: ISelectHelpFriendUsed = createSelector(
  [(state) => state.helpFriendUsed],
  (used) => used,
);

const selectHelpHalfUsed: ISelectHelpHalfUsed = createSelector(
  [(state) => state.helpHalfUsed],
  (used) => used,
);

const selectFriendHelp: ISelectFriendHelp = createSelector(
  [(state) => state.friendHelp],
  (help) => help,
);

const selectAudienceHelp: ISelectAudienceHelp = createSelector(
  [(state) => state.audienceHelp],
  (help) => help,
)

export const helpSelectors: IHelpSelectors = {
  selectHelpAudienceUsed,
  selectHelpFriendUsed,
  selectHelpHalfUsed,
  selectFriendHelp,
  selectAudienceHelp,
};

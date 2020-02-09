import { IAction, IActionWithPayload, ISelector } from '../../common/common.types';
import {
  STORE_AUDIENCE_HELP,
  STORE_FRIEND_HELP,
  STORE_HELP_AUDIENCE_USED,
  STORE_HELP_FRIEND_USED,
  STORE_HELP_HALF_USED,
  USE_HELP_AUDIENCE,
  USE_HELP_FRIEND,
  USE_HELP_HALF,
} from './help.constants';


export type IUseHelpAudience = IAction<typeof USE_HELP_AUDIENCE>;
export type IUseHelpFriend = IAction<typeof USE_HELP_FRIEND>;
export type IUseHelpHalf = IAction<typeof USE_HELP_HALF>;

export type IStoreHelpAudienceUsed = IActionWithPayload<typeof STORE_HELP_AUDIENCE_USED, boolean>;
export type IStoreHelpFriendUsed = IActionWithPayload<typeof STORE_HELP_FRIEND_USED, boolean>;
export type IStoreHelpHalfUsed = IActionWithPayload<typeof STORE_HELP_HALF_USED, boolean>;
export type IStoreFriendHelp = IActionWithPayload<typeof STORE_FRIEND_HELP, IHelpState['friendHelp'] | null>;
export type IStoreAudienceHelp = IActionWithPayload<typeof STORE_AUDIENCE_HELP, IHelpState['audienceHelp'] | null>;

export type IHelpActions = IStoreHelpAudienceUsed |
  IStoreHelpFriendUsed |
  IStoreHelpHalfUsed |
  IStoreFriendHelp |
  IStoreAudienceHelp;

export type ISelectHelpAudienceUsed<TInjectedState = IHelpState> = ISelector<TInjectedState, boolean>;
export type ISelectHelpFriendUsed<TInjectedState = IHelpState> = ISelector<TInjectedState, boolean>;
export type ISelectHelpHalfUsed<TInjectedState = IHelpState> = ISelector<TInjectedState, boolean>;
export type ISelectFriendHelp<TInjectedState = IHelpState> = ISelector<TInjectedState, IHelpState['friendHelp'] | null>;
export type ISelectAudienceHelp<TInjectedState = IHelpState> = ISelector<TInjectedState, IHelpState['audienceHelp'] | null>;

export interface IHelpSelectors<TInjectedState = IHelpState> {
  selectHelpAudienceUsed: ISelectHelpAudienceUsed<TInjectedState>;
  selectHelpFriendUsed: ISelectHelpFriendUsed<TInjectedState>;
  selectHelpHalfUsed: ISelectHelpHalfUsed<TInjectedState>;
  selectFriendHelp: ISelectFriendHelp<TInjectedState>;
  selectAudienceHelp: ISelectAudienceHelp<TInjectedState>;
}

export interface IHelpState {
  helpAudienceUsed: boolean;
  helpFriendUsed: boolean;
  helpHalfUsed: boolean;
  friendHelp: {
    suggestion: number;
    possibility: number;
  } | null;
  audienceHelp: {
    suggestions: [number, number, number, number];
  } | null;
}

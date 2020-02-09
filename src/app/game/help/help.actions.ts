import {
  IHelpState,
  IStoreAudienceHelp,
  IStoreFriendHelp,
  IStoreHelpAudienceUsed,
  IStoreHelpFriendUsed,
  IStoreHelpHalfUsed,
  IUseHelpAudience,
  IUseHelpFriend,
  IUseHelpHalf,
} from './help.types';
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


export const helpAudicence = (): IUseHelpAudience => ({
  type: USE_HELP_AUDIENCE,
});

export const helpFriend = (): IUseHelpFriend => ({
  type: USE_HELP_FRIEND,
});

export const helpHalf = (): IUseHelpHalf => ({
  type: USE_HELP_HALF,
});

export const storeHelpAudienceUsed = (used: boolean): IStoreHelpAudienceUsed => ({
  type: STORE_HELP_AUDIENCE_USED,
  payload: used,
});

export const storeHelpFriendUsed = (used: boolean): IStoreHelpFriendUsed => ({
  type: STORE_HELP_FRIEND_USED,
  payload: used,
});

export const storeHelpHalfUsed = (used: boolean): IStoreHelpHalfUsed => ({
  type: STORE_HELP_HALF_USED,
  payload: used,
});

export const storeFriendHelp = (help: IHelpState['friendHelp'] | null): IStoreFriendHelp => ({
  type: STORE_FRIEND_HELP,
  payload: help,
});

export const storeAudienceHelp = (help: IHelpState['audienceHelp'] | null): IStoreAudienceHelp => ({
  type: STORE_AUDIENCE_HELP,
  payload: help,
});

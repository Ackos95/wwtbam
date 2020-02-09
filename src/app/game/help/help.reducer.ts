import { combineReducers, Reducer } from 'redux';
import { IHelpActions, IHelpState } from './help.types';
import {
  STORE_AUDIENCE_HELP,
  STORE_FRIEND_HELP,
  STORE_HELP_AUDIENCE_USED,
  STORE_HELP_FRIEND_USED,
  STORE_HELP_HALF_USED
} from './help.constants';


const initialState: IHelpState = {
  helpAudienceUsed: false,
  helpFriendUsed: false,
  helpHalfUsed: false,
  friendHelp: null,
  audienceHelp: null,
};

const helpAudienceUsedReducer: Reducer<
  IHelpState['helpAudienceUsed'],
  IHelpActions
> = (state = initialState.helpAudienceUsed, action) => {
  if (action.type === STORE_HELP_AUDIENCE_USED) {
    return action.payload;
  }

  return state;
};

const helpFriendUsedReducer: Reducer<
  IHelpState['helpFriendUsed'],
  IHelpActions
  > = (state = initialState.helpFriendUsed, action) => {
  if (action.type === STORE_HELP_FRIEND_USED) {
    return action.payload;
  }

  return state;
};

const helpHalfUsedReducer: Reducer<
  IHelpState['helpHalfUsed'],
  IHelpActions
  > = (state = initialState.helpHalfUsed, action) => {
  if (action.type === STORE_HELP_HALF_USED) {
    return action.payload;
  }

  return state;
};

const friendHelpReducer: Reducer<
  IHelpState['friendHelp'],
  IHelpActions
> = (state = initialState.friendHelp, action) => {
  if (action.type === STORE_FRIEND_HELP) {
    return action.payload;
  }

  return state;
};

const audienceHelpReducer: Reducer<
  IHelpState['audienceHelp'],
  IHelpActions
> = (state = initialState.audienceHelp, action) => {
  if (action.type === STORE_AUDIENCE_HELP) {
    return action.payload;
  }

  return state;
};

export const helpReducer: Reducer<
  IHelpState,
  IHelpActions
> = combineReducers({
  helpAudienceUsed: helpAudienceUsedReducer,
  helpFriendUsed: helpFriendUsedReducer,
  helpHalfUsed: helpHalfUsedReducer,
  friendHelp: friendHelpReducer,
  audienceHelp: audienceHelpReducer,
});

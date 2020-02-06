import { IAppState } from './app.types';
import { IAppAction } from './common/common.types';


const initialState: IAppState = {};

export const appReducer = (state: IAppState = initialState, action: IAppAction) => state;

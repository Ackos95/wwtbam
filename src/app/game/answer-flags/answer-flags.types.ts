import { IActionWithPayload, ISelector } from '../../common/common.types';
import {
  STORE_CURRENT_ANSWER_IS_CORRECT,
  STORE_CURRENT_ANSWER_IS_IGNORED,
  STORE_CURRENT_ANSWER_IS_INCORRECT
} from './answer-flags.constants';


export type IStoreCurrentAnswerIsCorrect = IActionWithPayload<typeof STORE_CURRENT_ANSWER_IS_CORRECT, number | null>;
export type IStoreCurrentAnswerIsInCorrect = IActionWithPayload<typeof STORE_CURRENT_ANSWER_IS_INCORRECT, number | null>;
export type IStoreCurrentAnswerIsIgnored = IActionWithPayload<typeof STORE_CURRENT_ANSWER_IS_IGNORED, [number, number] | null>;

export type IAnswerFlagsActions = IStoreCurrentAnswerIsCorrect |
  IStoreCurrentAnswerIsInCorrect |
  IStoreCurrentAnswerIsIgnored;

export type ISelectCurrentAnswerIsCorrect<TInjectedState = IAnswerFlagsState> = ISelector<TInjectedState, number | null>;
export type ISelectCurrentAnswerIsInCorrect<TInjectedState = IAnswerFlagsState> = ISelector<TInjectedState, number | null>;
export type ISelectCurrentAnswerIsIgnored<TInjectedState = IAnswerFlagsState> = ISelector<TInjectedState, [number, number] | null>;

export interface IAnswerFlagsSelectors<TInjectedState = IAnswerFlagsState> {
  selectCurrentAnswerIsCorrect: ISelectCurrentAnswerIsCorrect<TInjectedState>;
  selectCurrentAnswerIsInCorrect: ISelectCurrentAnswerIsInCorrect<TInjectedState>;
  selectCurrentAnswerIsIgnored: ISelectCurrentAnswerIsIgnored<TInjectedState>;
}

export interface IAnswerFlagsState {
  currentAnswerIsCorrect: number | null;
  currentAnswerIsInCorrect: number | null;
  currentAnswerIsIgnored: [number, number] | null;
}

import { createSelector as reselectCreateSelector } from 'reselect';
import { ISelector, ISelectorWithParams } from './common.types';


export const createSelector = <TState, TResult>(
  subSelectors: ((state: TState) => any)[],
  resolver: (...args: any[]) => TResult,
): ISelector<TState, TResult> =>
  reselectCreateSelector(
    subSelectors,
    resolver
  );

export const createSelectorWithParams = <TState, TParams, TResult>(
  subSelectors: ((state: TState, params: TParams) => any)[],
  resolver: (...args: any[]) => TResult,
): ISelectorWithParams<TState, TParams, TResult> =>
  reselectCreateSelector(
    subSelectors,
    resolver
  );

export const wrapSelector = <
  TWrappingState,
  TWrappedState,
  TResult
>(
  selector: ISelector<TWrappedState, TResult>,
  wrapper: (state: TWrappingState) => TWrappedState,
): ISelector<TWrappingState, TResult> =>
  createSelector<TWrappingState, TResult>(
    [wrapper],
    selector,
  );

export const wrapSelectorWithParams = <
  TWrappingState,
  TWrappedState,
  TParams,
  TResult
>(
  selector: ISelectorWithParams<TWrappedState, TParams, TResult>,
  wrapper: (state: TWrappingState) => TWrappedState,
): ISelectorWithParams<TWrappingState, TParams, TResult> =>
  createSelectorWithParams<TWrappingState, TParams, TResult>(
    [
      wrapper,
      (state: TWrappingState, params: TParams) => params,
    ],
    selector,
  );

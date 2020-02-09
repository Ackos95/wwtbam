import { createSelector as reselectCreateSelector } from 'reselect';
import { ISelector, ISelectorWithParams } from './common.types';


export const createSelector = <TState, TResult>(
  subSelectors: ((state: TState) => any)[],
  resolver: (...args: any[]) => TResult,
): ISelector<TState, TResult> =>
{
  const selector = reselectCreateSelector(
    subSelectors,
    resolver
  ) as any;

  selector.hasParams = false;

  return selector as ISelector<TState, TResult>;
};

export const createSelectorWithParams = <TState, TParams, TResult>(
  subSelectors: ((state: TState, params: TParams) => any)[],
  resolver: (...args: any[]) => TResult,
): ISelectorWithParams<TState, TParams, TResult> => {
  const selector = reselectCreateSelector(
    subSelectors,
    resolver
  ) as any;

  selector.hasParams = true;

  return selector as ISelectorWithParams<TState, TParams, TResult>;
};


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

const isSelectorWithParams = <TState>(
  selector: ISelector<TState, any> | ISelectorWithParams<TState, any, any>
): selector is ISelectorWithParams<TState, any, any> =>
  selector.hasParams;

const isSelectorWithOutParams = <TState>(
  selector: ISelector<TState, any> | ISelectorWithParams<TState, any, any>
): selector is ISelector<TState, any> =>
  typeof selector === 'function' && !selector.hasParams;

export const wrapSelectors = <
  TWrappingState,
  TWrappedState,
  TSelectorKeys extends string | number | symbol,
  TWrappingSelectors extends {
    [key in TSelectorKeys]: ISelector<TWrappingState, any> |
      ISelectorWithParams<TWrappingState, any, any> |
      any
  },
  TWrappedSelectors extends {
    [key in TSelectorKeys]: ISelector<TWrappedState, any> |
      ISelectorWithParams<TWrappedState, any, any> |
      any;
  }
>(selectors: TWrappedSelectors, wrapper: (state: TWrappingState) => TWrappedState): TWrappingSelectors => {
  const newSelectors: Partial<TWrappingSelectors> = {};

  Object.keys(selectors).forEach((key) => {
    const selector = selectors[key as TSelectorKeys];
    if (isSelectorWithParams<TWrappedState>(selector)) {
      newSelectors[key as TSelectorKeys] = wrapSelectorWithParams(selector, wrapper) as any;
    } else if (isSelectorWithOutParams<TWrappedState>(selector)) {
      newSelectors[key as TSelectorKeys] = wrapSelector(selector, wrapper) as any;
    } else {
      newSelectors[key as TSelectorKeys] = wrapSelectors(selector, wrapper) as any;
    }
  });

  return newSelectors as TWrappingSelectors;
};

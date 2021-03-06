export interface IAction<TType> {
  readonly type: TType;
}

export interface IActionWithPayload<TType, TPayload> {
  readonly type: TType;
  readonly payload: TPayload;
}

export interface ISelector<TState, TResult> {
  (state: TState): TResult;

  readonly hasParams: false;
}

export interface ISelectorWithParams<TState, TParams, TResult> {
  (state: TState, params: TParams): TResult;

  readonly hasParams: true;
}

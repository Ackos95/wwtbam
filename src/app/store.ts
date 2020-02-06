import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { appReducer } from './app.reducer';
import { appSaga } from './app.saga';


export const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = reduxCreateStore(appReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(appSaga);

  return store;
};

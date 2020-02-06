import React from 'react';
import { Provider } from 'react-redux';

import { Router } from './Router';
import { createStore } from '../app/store';


export const App = () => (
  <Provider store={createStore()}>
    <Router />
  </Provider>
);

import React from 'react';
import { Provider } from 'react-redux';

import { Router } from './Router';
import { Layout } from './Layout';

import { createStore } from '../app/store';


export const App = () => (
  <Provider store={createStore()}>
    <Layout>
      <Router />
    </Layout>
  </Provider>
);

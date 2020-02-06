import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GamePage } from './pages/GamePage';
import { NotFound } from './pages/NotFound';


export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={GamePage} exact={true} />
      <Route path="" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

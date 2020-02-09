import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { NotFound } from './pages/NotFound';


export const Router = () => (
  <HashRouter>
    <Switch>
      <Route path="/game/:gameId" component={GamePage} />
      <Route path="/" component={HomePage} exact={true} />
      <Route path="" component={NotFound} />
    </Switch>
  </HashRouter>
);

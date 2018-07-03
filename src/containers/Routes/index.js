// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import Todo from '../../pages/Todo';

const Routes = () => (
  <Switch>
    {/* add additional routes here */}
    <Route exact path="/" component={Home} />
    <Route exact path="/todo" component={Todo} />
  </Switch>
);

export default Routes;

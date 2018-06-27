// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home';

const Routes = () => (
  <Switch>
    {/* TODO: add additional routes here */}
    <Route exact path="/" component={Home} />
  </Switch>
);

export default Routes;

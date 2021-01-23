import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CampusesContainer } from '../containers';

const RoutesView = () => {
  return (
    <Switch>
      <Route exact path="/" component={CampusesContainer} />
    </Switch>
  )
}

export default RoutesView;

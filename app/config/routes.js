import React from 'react';
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
import Main from '../components/Main';
import Home from '../components/Home';
import Initiate from '../components/Initiate';
import BattleContainer from '../containers/BattleContainer';

export default class Routes extends React.Component {
  render () {
    return (<Router history={hashHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={Home} />
        <Route path='initiate' component={Initiate} />
        <Route path='battle/:boardId' component={BattleContainer} />
      </Route>
    </Router>)
  }
}
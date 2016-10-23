import React from 'react';
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
import Main from '../components/Main';
import Home from '../components/Home';
import BattleContainer from '../containers/BattleContainer';

var routes = (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={Home} />
            <Route path='/battle' component={BattleContainer} />
        </Route>
    </Router>
);

module.exports = routes;
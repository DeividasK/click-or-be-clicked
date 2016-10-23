import React from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routes';
import firebase from './utils/firebaseHelpers';

firebase.checkAuth();

ReactDOM.render(
    routes,
    document.getElementById('app')
);
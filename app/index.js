import React from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routes';
import firebaseHelpers from './utils/firebaseHelpers';

firebaseHelpers.checkAuth();

ReactDOM.render(
    routes,
    document.getElementById('app')
);
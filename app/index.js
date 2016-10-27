import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './config/routes'

import firebase from 'firebase/app';
require("firebase/auth");
require("firebase/database");

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBUUoC2BwaqI1JFCSyTAPsJ9RPHFKhYAC4",
    authDomain: "click-or-be-clicked.firebaseapp.com",
    databaseURL: "https://click-or-be-clicked.firebaseio.com",
    storageBucket: "click-or-be-clicked.appspot.com",
    messagingSenderId: "448383551461"
});

ReactDOM.render(<Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('app')
);
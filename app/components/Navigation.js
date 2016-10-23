import React from 'react';
import firebaseHelpers from '../utils/firebaseHelpers.js';
import Auth from './Auth';

var firebase = require('firebase/app');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

export default class Navigation extends React.Component {
  constructor() {
    super();

    this.state = { auth: false };
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.setState({ auth: true });
      } else {
        this.setState({ auth: false });
      }
      
      console.log(this.state);
    }.bind(this));
  }

  handleSignIn () {
    firebaseHelpers.signIn();
  }
  
  handleSignOut () {
    firebaseHelpers.signOut();
  }
  
  render () {
    return (
      <nav className="navbar navbar-default">
  
          <div className="navbar-header">
            
            <Auth isAuthenticated={ this.state.auth } onSignIn={ this.handleSignIn } onSignOut={ this.handleSignOut } />
            
            <Link to='/' className="navbar-brand">
              Click or be clicked
            </Link>
            
          </div>
      </nav>
    )
  }
}
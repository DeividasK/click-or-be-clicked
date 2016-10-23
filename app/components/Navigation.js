var firebase = require('firebase/app');

import React from 'react';
import firebaseHelpers from '../utils/firebaseHelpers.js';

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

class Navigation extends React.Component {
  constructor() {
    super();

    this.state = { auth: false };
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.setState({ auth: true });
      } else {
        this.setState({ auth: false });
      }
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
        <div className="container-fluid">
  
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to='/' className="navbar-brand">
              Click or be clicked
            </Link>
          </div>
      
          <div className="collapse navbar-collapse">
            <form className="navbar-form navbar-right">
              <button className="btn btn-default" onClick={ this.handleSignIn }>Sign In</button>
              <button className="btn btn-default" onClick={ this.handleSignOut }>Sign Out</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation;
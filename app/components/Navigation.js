import React from 'react';
import Auth from './Auth';
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
import { signIn, signOut } from '../actions/userActions';


import { connect } from 'react-redux';
@connect((store) => {
    return {
        user: store.user
    };
})

export default class Navigation extends React.Component {
  handleSignIn () {
    return signIn();
  }
  
  handleSignOut () {
    return signOut(this.props.user.data.id);
  }
  
  render () {
    return (
      <nav className="navbar navbar-default">
  
          <div className="navbar-header">
            
            <Auth isAuthenticated={ this.props.user.auth } authPending={ this.props.user.authPending } onSignIn={ this.handleSignIn } onSignOut={ this.handleSignOut.bind(this) } />
            
            <Link to='/' className="navbar-brand">
              Click or be clicked
            </Link>
            
          </div>
      </nav>
    )
  }
}
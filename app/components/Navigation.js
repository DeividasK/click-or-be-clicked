import React from 'react'
import { connect } from 'react-redux'
import firebaseHelpers from '../utils/firebaseHelpers.js'
import Auth from './Auth'

var firebase = require('firebase/app')
var ReactRouter = require('react-router')
var Link = ReactRouter.Link

import { signIn, signOut } from '../actions/userActions'

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
            
            <Auth isAuthenticated={ this.props.user.auth } onSignIn={ this.handleSignIn } onSignOut={ this.handleSignOut.bind(this) } />
            
            <Link to='/' className="navbar-brand">
              Click or be clicked
            </Link>
            
          </div>
      </nav>
    )
  }
}
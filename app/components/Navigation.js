import React from 'react';
import Auth from './Auth';
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
import { signIn, signOut } from '../actions/userActions';
import { Player } from './Player';

import { connect } from 'react-redux';
@connect((store) => {
    return {
        user: store.user
    };
})

export default class Navigation extends React.Component {
  handleSignIn() {
    return signIn();
  }

  handleSignOut() {
    return signOut(this.props.user.data.id);
  }

  render() {
    return (
      <nav className="navbar navbar-default">

          <div className="navbar-header">

            <Auth isAuthenticated={ this.props.user.auth } authPending={ this.props.user.authPending } onSignIn={ this.handleSignIn } onSignOut={ this.handleSignOut.bind(this) } />

            {
              this.props.user.data.name !== null &&
              this.props.user.auth &&
              <Link to='/'>
                <Player
                  image={ this.props.user.data.image }
                  name={ this.props.user.data.name.split(' ')[0] }
                  style={{ display: 'block', margin: '3px' }}
                />
              </Link>
            }
            {
              this.props.user.auth === false &&
              <Link to='/' className="navbar-brand" style={{ display: 'block', margin: '3px' }}>
                Click or be clicked
              </Link>
            }
          </div>
      </nav>
    )
  }
}
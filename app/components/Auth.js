import React from 'react';

export default class Navigation extends React.Component {
  render () {
    if (this.props.authPending) {
      return <div></div>;  
    }
    
    if (this.props.isAuthenticated) {
      return <button className="navbar-toggle btn btn-default" onClick={ this.props.onSignOut }>Sign Out</button>;
    } else {
      return <button className="navbar-toggle btn btn-default" onClick={ this.props.onSignIn }>Sign In</button>
    }
  }
}
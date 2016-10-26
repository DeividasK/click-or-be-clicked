import React from 'react';

import { connect } from 'react-redux';
@connect((store) => {
    return {
        playerOne: store.user.data,
        playerTwo: store.players.selectedPlayer
    };
})

export default class Initiate extends React.Component {
  
  render () {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">{ this.props.playerOne.name }</div>
            <div className="panel-body">
              <p><span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Ready</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">{ this.props.playerTwo.name }</div>
            <div className="panel-body">
              <p><button className="btn btn-default"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancel</button> Waiting... </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
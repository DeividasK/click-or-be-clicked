import React from 'react';
import firebase from '../utils/firebaseHelpers.js';
import Players from '../components/Players';

export default class PlayersContainer extends React.Component {
  
  constructor () {
    super();
    this.state = { players: [] };
  }
  
  componentWillMount () {
    var playerList = firebase.getOnlinePlayers();
    
    playerList.on('value', function(snapshot) {
      var data = [];
      
      var players = snapshot.val();
      
      for (let index in players) {
        data.push(players[index]);
      }
      
      this.setState({ players: data });
      
    }.bind(this));
  }
  
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Online players
        </div>
        <div className="panel-body">
          <Players list={ this.state.players } />
        </div>
      </div>
    )
  }
}
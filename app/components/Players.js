import React from 'react';
import firebase from '../utils/firebaseHelpers.js';

class Players extends React.Component {
  
  constructor (props) {
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
    console.log(this.state.players);
    return (
      <div className="list-group">
        { this.state.players.map((player) => {
          return <div className="list-group-item" key={ player.email }> { player.name } </div>;
        }) }
      </div>
    )
  }
}

export default Players;
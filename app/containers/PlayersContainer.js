import React from 'react';
import { connect } from 'react-redux';

import { getActiveUsers, selectPlayer, deselectPlayer } from '../actions/userActions'
import Players from '../components/Players';

@connect((store) => {
    return {
        players: store.players.list,
        selected: store.players.selected
    };
})

export default class PlayersContainer extends React.Component {
  
  componentWillMount () {
    getActiveUsers();
  }
  
  selectHandler (uid) {
    (this.props.selected === uid) ? deselectPlayer() : selectPlayer(uid);
  }
  
  activeHandler (uid) {
    return (this.props.selected === uid) ? 'active' : '';
  }
  
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Online players
        </div>
        <div className="panel-body">
          <Players list={ this.props.players } onSelect={ this.selectHandler.bind(this) } active={ this.activeHandler.bind(this) } />
        </div>
      </div>
    )
  }
}
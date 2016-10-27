import React from 'react';
import Battle from '../components/Battle';
import { updateBoard, exitGame } from '../actions/gameActions';

import { connect } from 'react-redux';
@connect((store) => {
    return {
        userId: store.user.data.id,
        game: store.game,
        players: store.players.object
    };
})

export default class BattleContainer extends React.Component {
  
  componentWillReceiveProps (props) {

  }
  
  componentWillMount () {
    updateBoard(this.props.game.id);
  }
  
  exit () {
    exitGame(this.props.game.id);
  }
  
  render () {
    return (
      <div className="row">
        <button className='btn btn-default' onClick={ this.exit.bind(this) }>End game</button>  
        <Battle
          board={ this.props.game.board }
          gameId={ this.props.game.id }
          blue={ this.props.players[this.props.game.players.blue].name }
          red={ this.props.players[this.props.game.players.red].name }
          userColor={ (this.props.game.players.blue === this.props.userId) ? 'blue' : 'red' }
        />
      </div>
    );
  }
}
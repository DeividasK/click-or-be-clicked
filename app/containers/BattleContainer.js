import React from 'react';
import Battle from '../components/Battle';
import { resumeGame, updateBoard, exitGame } from '../actions/gameActions';

import { connect } from 'react-redux';
@connect((store) => {
    return {
        userId: store.user.data.id,
        game: store.game,
        players: store.players.object
    };
})

export default class BattleContainer extends React.Component {
  
  constructor (props) {
    super();
    resumeGame(props.routeParams.id);
  }
  
  componentWillReceiveProps (props) {
    
  }
  
  componentWillMount () {
    updateBoard(this.props.routeParams.id);
  }
  
  exit () {
    exitGame(this.props.routeParams.id);
  }
  
  render () {
    return (
      <div className="row">
        <div className="col-xs-12">
          <button className='btn btn-default' onClick={ this.exit.bind(this) }>End game</button>  
          <Battle
            board={ this.props.game.board }
            gameId={ this.props.game.id }
            blue={ this.props.players[this.props.game.players.blue] }
            red={ this.props.players[this.props.game.players.red] }
            userColor={ (this.props.game.players.blue === this.props.userId) ? 'blue' : 'red' }
          />
        </div>
      </div>
    );
  }
}
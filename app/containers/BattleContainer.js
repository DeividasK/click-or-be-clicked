import React from 'react';
import Battle from '../components/Battle';
import { updateBoard, exitGame } from '../actions/gameActions';

import { connect } from 'react-redux';
@connect((store) => {
    return {
        game: store.game
    };
})

export default class BattleContainer extends React.Component {
  componentWillMount () {
    updateBoard(this.props.game.id);
  }
  
  exit () {
    exitGame(this.props.game.id);
  }
  
  render () {
    return (
      <div>
        <button className='btn btn-default' onClick={ this.exit.bind(this) }>End game</button>     
        <Battle board={ this.props.game.board } gameId={ this.props.game.id }/>
      </div>
    );
  }
}
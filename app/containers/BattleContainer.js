import React from 'react';
import Battle from '../components/Battle';
import { updateBoard } from '../actions/gameActions';

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
  render () {
    return (
      <Battle board={ this.props.game.board } gameId={ this.props.game.id }/>
    );
  }
}
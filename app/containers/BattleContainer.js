import React from 'react';
import Battle from '../components/Battle';
import { resumeGame, updateBoard, exitGame, updateGame } from '../actions/gameActions';

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
    if (props.game.id === null) {
      resumeGame(props.routeParams.id);
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps (props) {

  }

  componentWillMount () {
    updateBoard(this.props.routeParams.id);
  }

  exit () {
    exitGame(this.props.routeParams.id);
  }

  handleClick (blockId) {
    let blockColor = this.props.game.board[blockId];
    let userColor = this.props.game.my.color;
    let actionsLeft = this.props.game.actions[userColor] - 1;

    if (blockColor === userColor) { return; }
    if (actionsLeft < 0) { return; }

    let sound = new Audio("blop.mp3").play();

    let blocks = {};
    blocks[blockId] = userColor;

    if (actionsLeft < 25) {
      let topBlock = blockId - 6;
      if (topBlock > 0) blocks[topBlock] = userColor;

      let bottomBlock = blockId + 6;
      if (bottomBlock < 37) blocks[bottomBlock] = userColor;

      let leftBlock = blockId - 1;
      if (leftBlock % 6 !== 0) blocks[leftBlock] = userColor;

      let rightBlock = blockId + 1;
      if (rightBlock % 6 !== 1) blocks[rightBlock] = userColor;
    }


    updateGame(this.props.game.id, blocks, userColor, actionsLeft);
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
            userColor={ this.props.game.my.color }
            onClick={ this.handleClick }
            count={ this.props.game.actions[this.props.game.my.color] }
          />
        </div>
      </div>
    );
  }
}
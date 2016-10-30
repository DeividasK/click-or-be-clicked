import React from 'react';
import Battle from '../components/Battle';
import { resumeGame, updateBoard, exitGame, updateGame, newShape, reduceActions } from '../actions/gameActions';
import Shape from '../utils/shapesHelper';

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

  componentWillReceiveProps(props) {
  }

  componentWillMount () {
    updateBoard(this.props.routeParams.id);

    let actions = this.props.game.actions[this.props.game.my.color];

    // let i = ( > )

    for (let i = 1; i <= 4; i += 1) {
      this.props.game.my.shapes.push(Shape.getRandomShape());
    }
  }

  exit () {
    exitGame(this.props.routeParams.id);
  }

  handleClick (blockId) {
    let blockColor = this.props.game.board[blockId];
    let userColor = this.props.game.my.color;
    let actionsLeft = this.props.game.actions[userColor] - 1;
    let shape = this.props.game.my.shapes[0];

    if (blockColor === userColor) { return; }
    if (actionsLeft < 0) { return; }

    newShape(Shape.getRandomShape());

    let sound = new Audio("blop.mp3").play();

    let blocks = {};
    blocks[blockId] = userColor;

    switch(shape) {
      case 'X':
        blocks = Object.assign(blocks, Shape.xBlock(blockId, userColor));
        break;

      case '+':
        blocks = Object.assign(blocks, Shape.plusBlock(blockId, userColor));
        break;

      case '<':
        blocks = Object.assign(blocks, Shape.leftBlock(blockId, userColor));
        break;

      case '>':
        blocks = Object.assign(blocks, Shape.rightBlock(blockId, userColor));
        break;
    }

    reduceActions(this.props.game.id, userColor, actionsLeft);
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
            shapes={ this.props.game.my.shapes }
            availableShapes={ Shape.shapesList() }
            timer={ this.props.game.my.timer }
          />
        </div>
      </div>
    );
  }
}
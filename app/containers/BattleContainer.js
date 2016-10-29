import React from 'react';
import Battle from '../components/Battle';
import { resumeGame, updateBoard, exitGame, updateGame, newShape } from '../actions/gameActions';

const shapesList = ['X','+','<', '>']; //'v','^',;

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomShape() {
  return shapesList[getRandomInt(0, shapesList.length)];
}

function plusBlock(blockId, userColor) {
  let blocks = {};

  let topBlock = blockId - 6;
  if (topBlock > 0) blocks[topBlock] = userColor;

  let bottomBlock = blockId + 6;
  if (bottomBlock < 37) blocks[bottomBlock] = userColor;

  let leftBlock = blockId - 1;
  if (leftBlock % 6 !== 0) blocks[leftBlock] = userColor;

  let rightBlock = blockId + 1;
  if (rightBlock % 6 !== 1) blocks[rightBlock] = userColor;

  return blocks;
}

function xBlock(blockId, userColor) {
  let blocks = {};

  let topLeftBlock = blockId - 7;
  if (topLeftBlock > 0 && topLeftBlock % 6 !== 0) blocks[topLeftBlock] = userColor;

  let topRightBlock = blockId - 5;
  if (topRightBlock > 0 && topRightBlock % 6 !== 1) blocks[topRightBlock] = userColor;

  let bottomLeftBlock = blockId + 5;
  if (bottomLeftBlock < 37 && bottomLeftBlock % 6 !== 0) blocks[bottomLeftBlock] = userColor;

  let bottomRightBlock = blockId + 7;
  if (bottomRightBlock < 37 && bottomRightBlock % 6 !== 1) blocks[bottomRightBlock] = userColor;

  return blocks;
}

function rightBlock(blockId, userColor) {
  let blocks = {};

  let firstTopBlock = blockId - 7;
  if (firstTopBlock > 0 && firstTopBlock % 6 !== 0) blocks[firstTopBlock] = userColor;

  let secondTopBlock = blockId - 14;
  if (secondTopBlock > 0 && firstTopBlock % 6 !== 0 && secondTopBlock % 6 !== 5) blocks[secondTopBlock] = userColor;

  let firstBottomBlock = blockId + 5;
  if (firstBottomBlock < 37 && firstBottomBlock % 6 !== 0) blocks[firstBottomBlock] = userColor;

  let secondBottomBlock = blockId + 10;
  if (secondBottomBlock < 37 && firstBottomBlock % 6 !== 0 && secondBottomBlock % 6 !== 5) blocks[secondBottomBlock] = userColor;

  return blocks;
}

function leftBlock(blockId, userColor) {
  let blocks = {};

  let firstTopBlock = blockId - 5;
  if (firstTopBlock > 0 && firstTopBlock % 6 !== 1) blocks[firstTopBlock] = userColor;

  let secondTopBlock = blockId - 10;
  if (secondTopBlock > 0 && firstTopBlock % 6 !== 1 && secondTopBlock % 6 !== 2) blocks[secondTopBlock] = userColor;

  let firstBottomBlock = blockId + 7;
  if (firstBottomBlock < 37 && firstBottomBlock % 6 !== 1) blocks[firstBottomBlock] = userColor;

  let secondBottomBlock = blockId + 14;
  if (secondBottomBlock < 37 && firstBottomBlock % 6 !== 1 && secondBottomBlock % 6 !== 2) blocks[secondBottomBlock] = userColor;

  return blocks;
}

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

  componentWillMount () {
    updateBoard(this.props.routeParams.id);

    for (let i = 1; i <= 4; i += 1) {
      this.props.game.my.shapes.push(getRandomShape());
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

    newShape(getRandomShape());

    console.log(shape);

    let sound = new Audio("blop.mp3").play();

    let blocks = {};
    blocks[blockId] = userColor;

    switch(shape) {
      case 'X':
        blocks = Object.assign(blocks, xBlock(blockId, userColor));
        break;

      case '+':
        blocks = Object.assign(blocks, plusBlock(blockId, userColor));
        break;

      case '<':
        blocks = Object.assign(blocks, leftBlock(blockId, userColor));
        break;

      case '>':
        blocks = Object.assign(blocks, rightBlock(blockId, userColor));
        break;
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
            shapes={ this.props.game.my.shapes }
            availableShapes={ shapesList }
          />
        </div>
      </div>
    );
  }
}
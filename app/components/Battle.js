import React from 'react';
import { BattleRow } from '../components/BattleRow';
import { BattleBlock } from './BattleBlock';

import { createNewBoard } from '../utils/gameHelpers';
import { PlayerWrapper } from '../components/PlayerWrapper';
import { Counter } from './Counter';
import { reduceActions } from '../actions/gameActions';

function reduceTimer(time) {
  store.dispatch({ type: 'REDUCE_TIMER', payload: time });
}

function setTimer(time) {
  store.dispatch({ type: 'SET_TIMER', payload: time });
}

var timer;

export default class Battle extends React.Component {
  constructor (props) {
    super();
    this.state = {
      timer: props.timer,
      timerObject: null,
      board: createNewBoard(props.board),
    };
  }

  componentWillMount() {
    this.timerObject = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({ ...this.state, timer: this.state.timer - 1 });
      } else {
        // clearInterval(this.timerObject);

        reduceActions(this.props.gameId, this.props.userColor, this.props.count - 1);
        this.setState({ ...this.state, timer: 5 });
      }
    }, 1000);
  }

  componentWillReceiveProps (props) {
    let newState = Object.assign({}, this.state);
    newState.board = createNewBoard(props.board);
    newState.timer = props.timer;
    this.setState(newState);
  }

  componentWillUnmount() {
    clearInterval(this.timerObject);
  }

  render () {
    return (
      <div id="battleContainer">

        <PlayerWrapper>
            { this.props.blue !== undefined && this.props.blue.name }
        </PlayerWrapper>


        <PlayerWrapper addClass="blue">
          { this.state.board.blue }
        </PlayerWrapper>

        <PlayerWrapper>
          { this.props.red !== undefined && this.props.red.name }
        </PlayerWrapper>

        <PlayerWrapper addClass="red">
          { this.state.board.red }
        </PlayerWrapper>

        <div className="col-xs-6 text-center">
          Available shapes: { this.props.availableShapes }
        </div>

        <div className="col-xs-6 text-center">
          Timer: { this.state.timer }
        </div>

        <div className="col-xs-6">
          <p>
            Shapes:<br />
            <span className="shapes">
              { this.props.shapes.map((shape, index) => {
                let separator = (index !== 0) ? ' ' : '';
                return <span key={index}>{separator + shape}</span>;
              })}
            </span>
          </p>
        </div>
        <div className="col-xs-6">
          <Counter count={ this.props.count }/>
        </div>

        <div className="col-xs-12">
          { this.state.board.list.map((row) => {
            return (
              <BattleRow key={ row.key }>
                { row.blocks.map((block) => {
                  return ( <BattleBlock
                    userColor={ this.props.userColor }
                    key={ block.key }
                    blockId={ block.key }
                    color={ block.color }
                    gameId={ this.props.gameId }
                    handleClick={ this.props.onClick }
                  /> );
                })}
              </BattleRow>
            )
          })}
        </div>

      </div>
    )
  }
}
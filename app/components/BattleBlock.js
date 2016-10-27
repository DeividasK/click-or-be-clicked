import React from 'react';
import { updateGame } from '../actions/gameActions';

export default class BattleBlock extends React.Component {
  
  constructor (props) {
    super(props);
    
    this.state = {
      color: props.color,
      blockId: props.blockId
    };
  }
  
  componentWillReceiveProps(props) {
    this.state = {
      color: props.color,
      blockId: props.blockId
    };
  }
  
  handleClick (e) {
    if (this.props.userColor === this.state.color) { return; }
    
    this.state.color = (this.state.color === 'red') ? 'blue' : 'red';
    
    this.setState(this.state);
    
    var sound = new Audio("blop.mp3");
    sound.play();
    updateGame(this.state, this.props.gameId);
  }
  
  render () {
    return (
      <div className="col-xs-2">
        <div className={ 'box ' + this.state.color } onClick={ this.handleClick.bind(this) }>{ this.state.blockId }</div>
      </div>
    )
  }
  
};
import React from 'react';
import firebaseHelpers from '../utils/firebaseHelpers';

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
    this.state.color = (this.state.color === 'red') ? 'blue' : 'red';
    
    this.setState(this.state);
    
    var sound = new Audio("blop.mp3");
    sound.play();
    firebaseHelpers.updateGame(this.state, this.props.params.boardId);
  }
  
  render () {
    return (
      <div className="col-xs-2">
        <div className={ 'box ' + this.state.color } onClick={ this.handleClick.bind(this) }>{ this.state.blockId }</div>
      </div>
    )
  }
  
};
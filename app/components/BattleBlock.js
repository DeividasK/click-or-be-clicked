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
  
  handleClick (e) {
    this.state.color = (this.state.color === 'red') ? 'blue' : 'red';
    
    this.setState(this.state);
    
    // console.log(this.state);
    firebaseHelpers.updateGame(this.state);
  }
  
  render () {
    return (
      <div className="col-xs-2">
        <div className={ this.state.color } onClick={ this.handleClick.bind(this) }>{ this.state.blockId }</div>
      </div>
    )
  }
  
};
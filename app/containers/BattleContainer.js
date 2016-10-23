import React from 'react';
import styles from '../styles';

const BattleContainer = React.createClass({
  getInitialState () {
    return {
      list: []
    }
  },
  componentWillMount () {
    for (let i = 1; i <= 64; i +=1) {
      this.state.list.push(i);
    }
  },
  handleClick (e) {
    e.target.className = (e.target.className === 'noselect box blue') ? 'noselect box red' : 'noselect box blue';
  },
  render () {
    return (
      <ul>
        {this.state.list.map(function(listValue, index){
          return <li className={ 'noselect box ' + (index % 2 === 1 ? 'red' : 'blue' )} onClick={this.handleClick} key={listValue}>{listValue}</li>;
        }.bind(this))}
      </ul>
    )
  }
});

module.exports = BattleContainer;
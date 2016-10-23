import React from 'react';
import BattleRow from '../components/BattleRow';
import firebase from '../utils/firebaseHelpers';

export default class BattleContainer extends React.Component {
  constructor () {
    super();
    this.state = {
      boardSize: 6,
      list: [],
      board: {}
    };
  }
  generateColor(i, j) {
    return ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) ? 'blue' : 'red';
  }
  createBoard () {
    this.state.list.length = 0;
    
    for (let i = 0; i < this.state.boardSize; i += 1) {
      this.state.list.push({ key: i, blocks: [] });
      for (let j = 0; j < this.state.boardSize; j += 1) {
        let key = i * 6 + j + 1;
        
        let color = (this.state.board[key] !== undefined) ? this.state.board[key] : this.generateColor(i, j);

        this.state.list[i].blocks.push({ 'key': key, 'color': color });
      }
    }
    
    this.setState(this.state);
  }
  
  componentWillMount () {
    
    firebase.getGame().on('value', function(snapshot){
      this.state.board = snapshot.val();
      
      // this.setState(this.state);
      
      this.createBoard();
    }.bind(this));
    
    
    // firebase.addNewGame(this.state.board);
  }
  
  render () {
    return (
      <div>
        {this.state.list.map(function(row){
          return <BattleRow board={ this.state.board } blocks={ row.blocks } key={ row.key }/>;
        }.bind(this))}
      </div>
    )
  }
}
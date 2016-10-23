import React from 'react';
import firebase from '../utils/firebaseHelpers';
import Battle from '../components/Battle';

export default class BattleContainer extends React.Component {
  constructor (props) {
    super();
    this.state = {
      boardSize: 6,
      list: [],
      board: {},
      red: 0,
      blue: 0
    };
  }
  generateColor(i, j) {
    return ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) ? 'blue' : 'red';
  }
  createBoard () {
    this.state.list.length = 0;
    this.state.red = 0;
    this.state.blue = 0;
    
    for (let i = 0; i < this.state.boardSize; i += 1) {
      this.state.list.push({ key: i, blocks: [] });
      for (let j = 0; j < this.state.boardSize; j += 1) {
        let key = i * 6 + j + 1;
        
        let color = (this.state.board[key] !== undefined) ? this.state.board[key] : this.generateColor(i, j);
        
        this.state[color] += 1;

        this.state.list[i].blocks.push({ 'key': key, 'color': color });
      }
    }
    
    this.setState(this.state);
  }
  
  componentWillMount () {
    firebase.getGame(this.props.params.boardId).on('value', function(snapshot){
      this.state.board = snapshot.val();
      
      // this.setState(this.state);
      console.log('State changed');
      
      this.createBoard();
    }.bind(this));
    // firebase.addNewGame(this.state.board);
  }
  
  render () {
    return (
      <div id="battleContainer">
        <div className="row">
          <div className="col-xs-6">
            Blue<br />{ this.state.blue }
          </div>
          <div className="col-xs-6">
            Red<br />{ this.state.red }
          </div>
        </div>
        <Battle list={ this.state.list }/>
      </div>
    )
  }
}
import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { sendGameRequest, cancelGameRequest, rejectGame, getGames, acceptGame } from '../actions/gameActions';
import { modalOpen } from '../actions/modalActions';

@connect((store) => {
    return {
        player: store.user.data.id,
        opponent: store.players.selected,
        gameKey: store.game.id,
        players: store.players.object
    };
})

export default class Home extends React.Component {
  
  constructor() {
    super();
    
    this.initiateBattle = this.initiateBattle.bind(this);
  }
  
  initiateBattle () {
    sendGameRequest(this.props.player, this.props.opponent, this.props.players[this.props.opponent].name);
    modalOpen(cancelGameRequest);
  }
  
  componentWillMount () {
    getGames(rejectGame, acceptGame);
  }
  
  componentWillUnmount () {
    cancelGameRequest(this.props.gameKey);
  }
  
  render () {
    return (
      <div>
        <h1>Click or BE clicked</h1>
        <p className='lead'>Speed is your friend.</p>
        <button className='btn btn-default' onClick={ this.initiateBattle } disabled={ ! this.props.opponent }>Initiate the battle!</button>
      </div>
    )
  }
};
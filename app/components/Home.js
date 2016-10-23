var React = require('react');

import { hashHistory } from 'react-router';

export default class Home extends React.Component {
  
  initiateBattle () {
    const path = `/initiate`
    hashHistory.push(path);
  }
  
  render () {
    return (
      <div>
        <h1>Click or BE clicked</h1>
        <p className='lead'>Speed is your friend.</p>
        <button className='btn btn-default' onClick={ this.initiateBattle }>Initiate the battle!</button>
      </div>
    )
  }
};
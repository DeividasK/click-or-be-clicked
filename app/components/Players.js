import React from 'react';

export default class Players extends React.Component {
  render() {
    if (this.props.list.length !== 0) {
      return (
        <div className="list-group">
          { this.props.list.map((player) => {
            return <div className="list-group-item" key={ player.email }> { player.name } </div>
          }) }
        </div>
      )
    } else {
      return (
        <div>Sign in to see the list of players available.</div>
      )      
    }
  }
}
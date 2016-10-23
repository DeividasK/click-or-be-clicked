import React from 'react';
import BattleRow from '../components/BattleRow';

export default class BattleContainer extends React.Component {
  render () {
    return (
      <div className="row">
        <div className="col-xs-12">
          { this.props.list.map((row) => { return <BattleRow blocks={ row.blocks } key={ row.key }/> })}
        </div>
      </div>
    )
  }
}
import React from 'react';
import BattleBlock from './BattleBlock';

export default class BattleRow extends React.Component {
  render () {
    return (
      <div className="row">
        {this.props.blocks.map(function(block){
          return <BattleBlock key={ block.key } blockId={ block.key } color={ block.color }/>;
        }.bind(this))}

      </div>
    )
  }
};
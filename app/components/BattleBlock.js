import React from 'react';

export function BattleBlock(props) {
  return (
    <div className="col-xs-2">
      <div className={ 'box ' + props.color } onClick={ () => props.handleClick(props.blockId) }>{ props.blockId }</div>
    </div>
  )
};
import React from 'react';

export function PlayerWrapper(props) {
  return (
    <div className="col-xs-3">
      <div className={ "well text-center " + props.addClass }>
        <p>{ props.children }</p>
      </div>
    </div>
  )
}
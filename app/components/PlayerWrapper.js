import React from 'react';

export function PlayerWrapper(props) {
  return (
    <div className={ `col-xs-${props.cols} col-md-${props.cols / 2}` }>
      <div className={ "well text-center " + props.addClass }>
        <p>{ props.children }</p>
      </div>
    </div>
  )
}

PlayerWrapper.propTypes = {
  addClass: React.PropTypes.string
}
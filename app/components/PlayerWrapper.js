import React from 'react';

export function PlayerWrapper(props) {
  return (
    <div className="col-xs-6 col-md-3">
      <div className={ "well text-center " + props.addClass } style={{ height: '100px' }}>
        <p>{ props.children }</p>
      </div>
    </div>
  )
}

PlayerWrapper.propTypes = {
  addClass: React.PropTypes.string
}
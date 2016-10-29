import React from 'react';

export function Player(props) {
  return (
    <div style={ props.style }>
      <img src={ props.image } alt={ props.name } className="img-responsive player-img" />
      <span className='player-name'>{ props.name }</span>
    </div>
  )
}

Player.propTypes = {
  image: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
}
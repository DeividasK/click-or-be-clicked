import React from 'react';

export function Counter(props) {
  return (
    <div className="col-xs-12 text-right">
      <p className="actions">Your actions: <span className="count">{ props.count }</span></p>
    </div>
  );
}
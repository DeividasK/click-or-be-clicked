import React from 'react';

export function Display(props) {
  return (
    <div className="col-xs-4 text-center">
      <p className="title">
        { props.title }: <br />
        <span className="display">{ props.display }</span>
      </p>
    </div>
  );
}
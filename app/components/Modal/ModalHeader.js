import React from 'react';

export function ModalHeader(props) {
  return (
    <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ props.onClose }><span aria-hidden="true">&times;</span></button>
      <h4 className="modal-title">{ props.children }</h4>
    </div>
  );
}
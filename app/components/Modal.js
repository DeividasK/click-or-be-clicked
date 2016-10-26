import React from 'react';
import { ModalHeader } from './Modal/ModalHeader';

export function Modal(props) {
  return (
    <div className={ (props.show) ? "modal fade in" : "modal fade" } tabIndex="-1" role="dialog" style={ (props.show) ? { display: 'block' } : { display: 'none' } }>
      <div className="modal-dialog" role="document">
        <div className="modal-content">

          <ModalHeader onClose={ props.onClose }>{ props.header }</ModalHeader>

          <div className="modal-body">
            { props.body }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={ props.onClose }>{props.danger}</button>
            { props.success !== false && <button type="button" className="btn btn-success" onClick={ props.onSuccess }>{props.success}</button> }
          </div>

        </div>
      </div>
    </div>
  );
}
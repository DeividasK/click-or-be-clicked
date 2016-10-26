import React from 'react';
import { connect } from 'react-redux';
import { Modal } from '../components/Modal';
import { modalClose } from '../actions/modalActions';

@connect((store) => {
    return {
        modal: store.modal
    };
})

export default class ModalContainer extends React.Component {

  successHandler() {
    this.props.modal.success.handler(this.props.modal.success.arguments);
    modalClose();
  }

  closeHandler() {
    this.props.modal.callback(this.props.modal.callbackArg);
    modalClose();
  }

  render() {
    return (
      <Modal
        show={ this.props.modal.open }
        onClose={this.closeHandler.bind(this)}
        onSuccess={this.successHandler.bind(this)}
        header={this.props.modal.content.header}
        body={this.props.modal.content.body}
        danger={this.props.modal.content.danger}
        success={this.props.modal.content.success}
      />
    );
  }  
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { addProps } from './ContainerModal.props';
import './ContainerModal.css';

class ContainerModal extends Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    modalType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool,
    onEnter: PropTypes.func,
    onExit: PropTypes.func
  };

  toggle = () => {
    this.props.setIsOpen(!this.props.isOpen);
  };

  render() {
    const { isOpen, children, title, onOpened, onClosed } = this.props;
    return (
      <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={this.toggle}
        onOpened={onOpened}
        onClosed={onClosed}
        className="container-modal"
      >
        <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </Modal>
    );
  }
}

export default addProps(ContainerModal);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { addProps } from './ContainerModal.props';
import './ContainerModal.css';

class ContainerModal extends Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    modalType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool
  };

  toggle = () => {
    this.props.setIsOpen(!this.props.isOpen);
  };

  render() {
    const { isOpen, children, title } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={this.toggle} className="container-modal">
        <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>
            Dismiss
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default addProps(ContainerModal);

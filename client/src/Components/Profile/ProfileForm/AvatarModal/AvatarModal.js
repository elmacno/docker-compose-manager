import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { mapStateToProps, mapDispatchToProps } from './AvatarModal.props';
import './AvatarModal.css';

class AvatarModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpened: PropTypes.func.isRequired,
    onClosed: PropTypes.func.isRequired
  };
  render() {
    const { isOpen, onOpened, onClosed } = this.props;
    return (
      <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={this.toggle}
        onOpened={onOpened}
        onClosed={onClosed}
        className="avatar-modal"
      >
        <ModalHeader />
        <ModalBody />
        <ModalFooter>
          <Button>Apply</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarModal);

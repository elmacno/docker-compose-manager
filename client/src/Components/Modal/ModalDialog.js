import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { mapStateToProps, mapDispatchToProps } from './ModalDialog.props';
import './ModalDialog.css';

class ModalDialog extends Component {
  static propTypes = {
    key: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    onOpened: PropTypes.func,
    onClosed: PropTypes.func,
    className: PropTypes.string,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired
      })
    )
  };

  toggle = () => {
    const { isOpen, open, close } = this.props;
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  render() {
    const {
      title,
      children,
      isOpen,
      onOpened,
      onClosed,
      className,
      actions
    } = this.props;
    return (
      <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={this.toggle}
        onOpened={onOpened}
        onClosed={onClosed}
        className={`modal-dialog ${className}`}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {actions ? (
          <ModalFooter>
            {actions.map((action, index) => (
              <Button key={index} onClick={action.action}>
                {action.label}
              </Button>
            ))}
          </ModalFooter>
        ) : (
          ''
        )}
      </Modal>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDialog);

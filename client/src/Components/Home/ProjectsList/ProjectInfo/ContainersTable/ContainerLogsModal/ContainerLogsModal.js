import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fetch } from '../../../../../../Services';
import ContainerModal from '../ContainerModal';
import { addProps } from './ContainerLogsModal.props';
import './ContainerLogsModal.css';

class ContainerLogsModal extends Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    logs: PropTypes.string
  };

  handleOnOpened = async () => {
    const { container } = this.props;
    try {
      let response = await Fetch(`/containers/${container}/logs`);
      this.props.addLogs(response.logs);
    } catch (error) {
      console.error(
        `Could not fetch the logs for container ${container}:`,
        await error
      );
    }
  };

  render() {
    const { logs, container, project } = this.props;
    return (
      <ContainerModal
        modalType="logsModal"
        project={project}
        container={container}
        title="Container Logs"
        onOpened={this.handleOnOpened}
      >
        <div className="container-logs-modal">
          <pre>{logs}</pre>
        </div>
      </ContainerModal>
    );
  }
}

export default addProps(ContainerLogsModal);

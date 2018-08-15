import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerModal from '../ContainerModal';
import { Fetch } from '../../../../../../Services';
import { addProps } from './ContainerLogsModal.props';
import './ContainerLogsModal.css';

class ContainerLogsModal extends Component {
  static defaultProps = {
    modalType: 'logsModal'
  };

  static propTypes = {
    modalType: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    logs: PropTypes.string
  };

  getContainerLogs = async () => {
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

  async componentDidMount() {
    await this.getContainerLogs();
  }

  render() {
    const { logs, container, project, modalType } = this.props;
    return (
      <ContainerModal
        modalType={modalType}
        project={project}
        container={container}
        title="Container Logs"
        className="container-logs-modal"
      >
        <pre>{logs}</pre>
      </ContainerModal>
    );
  }
}

export default addProps(ContainerLogsModal);

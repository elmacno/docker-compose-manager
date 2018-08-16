import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import ContainerModal from '../ContainerModal';
import CpuUsageChart from './CpuUsageChart';
import MemoryUsageChart from './MemoryUsageChart';
import './ContainerStatsModal.css';

class ContainerStatsModal extends Component {
  static propTypes = {
    container: PropTypes.string.isRequired,
    logs: PropTypes.string
  };

  render() {
    const { project, container } = this.props;
    return (
      <ContainerModal
        modalType="statsModal"
        project={project}
        container={container}
        title="Container Stats"
      >
        <div className="container-stats-modal">
          <Row>
            <Col md={6}>
              <CpuUsageChart container={container} />
            </Col>
            <Col md={6}>
              <MemoryUsageChart container={container} />
            </Col>
          </Row>
        </div>
      </ContainerModal>
    );
  }
}

export default ContainerStatsModal;

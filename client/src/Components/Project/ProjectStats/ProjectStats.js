import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Row, Col } from 'reactstrap';
import './ProjectStats.css';
import CpuUsageChart from './CpuUsageChart';
import MemoryUsageChart from './MemoryUsageChart';

class ProjectStats extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="project-stats">
        <h2>Stats for container {match.params.id.slice(0, 12)}</h2>
        <Row>
          <Col md={6}>
            <CpuUsageChart container={match.params.id} />
          </Col>
          <Col md={6}>
            <MemoryUsageChart container={match.params.id} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(ProjectStats);

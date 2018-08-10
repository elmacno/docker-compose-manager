import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Fetch } from '../../../Services';
import { addProps } from './ProjectLogs.props';
import './ProjectLogs.css';

class ProjectLogs extends Component {

  getContainerLogs = async () => {
    try {
      let response = await Fetch(`/containers/${this.props.match.params.id}/logs`);
      this.props.setLogs(response.logs);
    } catch(error) {
      console.error(`Could not fetch the logs for container ${this.props.match.params.id}:`, await error);
    }
  }

  async componentDidMount() {
    await this.getContainerLogs();
  }

  render() {
    const { logs, match } = this.props;
    return (
      <div className="project-logs">
        <h2>Logs for container {match.params.id.slice(0,12)}</h2>
        <pre>{logs}</pre>
      </div>
    );  
  }
}

export default withRouter(addProps(ProjectLogs));
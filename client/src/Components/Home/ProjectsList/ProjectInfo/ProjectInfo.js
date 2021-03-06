import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardBody, CardTitle, CardText, Button, ButtonGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fetch } from '../../../../Services';
import { addProps } from './ProjectInfo.props';
import ContainersTable from './ContainersTable';
import './ProjectInfo.css';

class ProjectInfo extends Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    setContainers: PropTypes.func,
    containers: PropTypes.arrayOf(
      PropTypes.shape({
        Id: PropTypes.string.isRequired,
        Image: PropTypes.string.isRequired,
        Command: PropTypes.string.isRequired,
        Created: PropTypes.number.isRequired,
        Status: PropTypes.string.isRequired,
        Ports: PropTypes.arrayOf(
          PropTypes.shape({
            PublicPort: PropTypes.number,
            PrivatePort: PropTypes.number.isRequired,
            Type: PropTypes.string.isRequired
          })
        ),
        Names: PropTypes.arrayOf(PropTypes.string)
      })
    )
  };

  getRunningContainers = async () => {
    const { project } = this.props;
    try {
      let containers = await Fetch(`/projects/${project}/containers`);
      this.props.setContainers(containers);
    } catch (error) {
      let errorMessage = await error;
      console.error(
        `Failed to get the running containers for project ${project}:`,
        errorMessage
      );
    }
  };

  handleStart = async () => {
    const { project } = this.props;
    try {
      await Fetch(`/projects/${project}/up`);
    } catch (error) {
      console.error(`Could not start ${project}:`, await error);
    }
  };

  handleRestart = async () => {
    const { project } = this.props;
    try {
      await Fetch(`/projects/${project}/restart`);
    } catch (error) {
      console.error(`Could not restart ${project}:`, await error);
    }
  };

  handleStop = async () => {
    const { project } = this.props;
    try {
      await Fetch(`/projects/${project}/down`);
    } catch (error) {
      console.error(`Could not stop ${project}:`, await error);
    }
  };

  componentDidMount() {
    let refresher = () => {
      this.getRunningContainers();
      setTimeout(refresher, 5000);
    };
    refresher();
  }

  render() {
    const { project, containers } = this.props;
    const hasContainers = containers && containers.length > 0;
    return (
      <CardBody className="project-info">
        {containers && containers.length !== 0 ? (
          <div>
            <CardTitle>Running containers</CardTitle>
            <ContainersTable project={project} containers={containers} />
          </div>
        ) : (
          <CardText>No running containers</CardText>
        )}
        <div className="text-right">
          <ButtonGroup>
            <Button
              className="container-action"
              color="success"
              disabled={hasContainers}
              onClick={this.handleStart}
            >
              <FontAwesomeIcon icon="play-circle" />
              <span>Start</span>
            </Button>
            <Button
              className="container-action"
              disabled={!hasContainers}
              onClick={this.handleRestart}
            >
              <FontAwesomeIcon icon="sync-alt" />
              <span>Restart</span>
            </Button>
            <Button
              className="container-action"
              color="danger"
              disabled={!hasContainers}
              onClick={this.handleStop}
            >
              <FontAwesomeIcon icon="times" />
              <span>Stop</span>
            </Button>
          </ButtonGroup>
        </div>
      </CardBody>
    );
  }
}

export default addProps(ProjectInfo);

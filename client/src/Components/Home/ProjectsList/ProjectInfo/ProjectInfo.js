import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardBody } from 'reactstrap';
import { Fetch } from '../../../../Services';
import { addProps } from './ProjectInfo.props';
import ContainersTable from './ContainersTable';

class ProjectInfo extends Component {
  static propTypes = {
    projectName: PropTypes.string.isRequired,
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
    const { projectName } = this.props;
    try {
      let containers = await Fetch(`/projects/${projectName}/containers`);
      this.props.setContainers(containers);
    } catch (error) {
      let errorMessage = await error;
      console.error(
        `Failed to get the running containers for project ${projectName}:`,
        errorMessage
      );
    }
  };

  async componentDidMount() {
    await this.getRunningContainers();
  }

  render() {
    const { containers } = this.props;
    return (
      <CardBody>
        {containers && containers.length !== 0 ? (
          <ContainersTable containers={containers} />
        ) : (
          'No running containers'
        )}
      </CardBody>
    );
  }
}

export default addProps(ProjectInfo);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Collapse } from 'reactstrap';
import { addProps } from './ProjectsList.props';
import ProjectInfo from './ProjectInfo';
import dockerLogo from '../../../Assets/docker.svg';
import './ProjectsList.css';

class ProjectsList extends Component {
  static propTypes = {
    projects: PropTypes.object.isRequired,
    toggleProject: PropTypes.func
  };

  toggleProject = event => {
    let toggledProject = event.target.dataset.event;
    this.props.toggleProject(toggledProject);
  };

  render() {
    const { projects } = this.props;
    return (
      <div className="projects-list">
        {Object.keys(projects).map(project => (
          <Card key={project}>
            <CardHeader onClick={this.toggleProject} data-event={project}>
              <img src={dockerLogo} alt={project} />
              {project}
            </CardHeader>
            <Collapse isOpen={projects[project].expanded}>
              <ProjectInfo project={project} />
            </Collapse>
          </Card>
        ))}
      </div>
    );
  }
}

export default addProps(ProjectsList);

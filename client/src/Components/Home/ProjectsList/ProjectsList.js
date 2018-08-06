import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Collapse } from 'reactstrap';
import { addProps } from './ProjectsList.props';
import ProjectInfo from './ProjectInfo';
import dockerLogo from '../../../Assets/docker.svg';
import './ProjectsList.css';

class ProjectsList extends Component {
  static propTypes = {
    projects: PropTypes.arrayOf(PropTypes.any).isRequired,
    expandedProjects: PropTypes.arrayOf(PropTypes.string),
    collapseProject: PropTypes.func,
    expandProject: PropTypes.func
  };

  toggleProject = event => {
    let toggledProject = event.target.dataset.event;
    let projectIsExpanded =
      this.props.expandedProjects.filter(card => card === toggledProject)
        .length === 1;
    if (projectIsExpanded) {
      this.props.collapseProject(toggledProject);
    } else {
      this.props.expandProject(toggledProject);
    }
  };

  isProjectExpanded = currentProject => {
    return (
      this.props.expandedProjects.filter(project => project === currentProject)
        .length === 1
    );
  };

  render() {
    const { projects } = this.props;
    return (
      <div className="projects-list">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader onClick={this.toggleProject} data-event={project}>
              <img src={dockerLogo} />
              {project}
            </CardHeader>
            <Collapse isOpen={this.isProjectExpanded(project)}>
              <ProjectInfo projectName={project} />
            </Collapse>
          </Card>
        ))}
      </div>
    );
  }
}

export default addProps(ProjectsList);

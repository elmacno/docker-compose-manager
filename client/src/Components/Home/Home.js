import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fetch } from '../../Services';
import { addProps } from './Home.props';
import Page from '../Page';
import ProjectsList from './ProjectsList';
import './Home.css';

class Home extends Component {
  static propTypes = {
    projects: PropTypes.object,
    setProjects: PropTypes.func
  };

  getProjects = async () => {
    try {
      let projects = await Fetch('/projects');
      this.props.setProjects(projects);
    } catch (error) {
      let errorMessage = await error;
      console.error('Failed to get the available projects:', errorMessage);
    }
  };

  async componentDidMount() {
    await this.getProjects();
  }

  render() {
    const { projects } = this.props;
    return (
      <Page>
        <h2 className="text-center">Available Projects</h2>
        <ProjectsList projects={projects} />
      </Page>
    );
  }
}

export default addProps(Home);

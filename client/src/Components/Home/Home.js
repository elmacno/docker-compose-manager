import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { Fetch } from '../../Services';
import { addProps } from './Home.props';
import Header from '../Header';
import Footer from '../Footer';
import ProjectsList from './ProjectsList';
//import dockerQuestion from '../../Assets/docker-question.svg';
import './Home.css';

class Home extends Component {
  static propTypes = {
    projects: PropTypes.arrayOf(PropTypes.string),
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
      <div className="home-page">
        <Header />
        <main>
          <Container>
            <h2 className="text-center">Available Projects</h2>
            <ProjectsList projects={projects} />
            {/* {this.props.runningContainers.length === 0 ? (
              <div className="text-center">
                <img src={dockerQuestion} className="d-block mx-auto" />
                <p>
                  There are no containers running.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-center">Running containers</h2>
                <ContainersTable containers={this.props.runningContainers} projects={this.props.composeProjects}/>
              </div>
            )}
            <h2 className="text-center">Compose projects</h2>
            <ul>
              {this.props.composeProjects.map(project => (
                <li key={project.fullPath}>{project.fullPath}</li>
              ))}
            </ul> */}
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
}

export default addProps(Home);

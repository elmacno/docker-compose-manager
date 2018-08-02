import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { Fetch } from '../../Services';
import { addProps } from './Home.props';
import Header from '../Header';
import Footer from '../Footer';
import ContainersTable from './ContainersTable';
import dockerQuestion from '../../Assets/docker-question.svg';
import './Home.css';

class Home extends Component {
  static propTypes = {
    availableContainers: PropTypes.array,
    runningContainers: PropTypes.array,
    setAvailableContainers: PropTypes.func,
    setRunningContainers: PropTypes.func
  };

  getAvailableContainers = async () => {
    try {
      let containers = await Fetch('/containers');
      this.props.setAvailableContainers(containers);
    } catch (error) {
      let errorMessage = await error;
      console.error('Failed to get the containers:', errorMessage);
    }
  };

  getRunningContainers = async () => {
    try {
      let containers = await Fetch('/containers/running');
      this.props.setRunningContainers(containers);
    } catch (error) {
      let errorMessage = await error;
      console.error('Failed to get the containers:', errorMessage);
    }
  };

  async componentDidMount() {
    await this.getAvailableContainers();
    await this.getRunningContainers();
  }

  render() {
    return (
      <div className="home-page">
        <Header />
        <main>
          <Container>
            {this.props.runningContainers.length === 0 ? (
              <div className="text-center">
                <img src={dockerQuestion} className="d-block mx-auto" />
                <p>
                  There are no containers running. Try importing a configuration
                  file.
                </p>
              </div>
            ) : (
              <ContainersTable containers={this.props.runningContainers} />
            )}
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
}

export default addProps(Home);

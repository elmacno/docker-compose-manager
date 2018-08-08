import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../Header';
import Footer from '../Footer';
import ProjectStats from './ProjectStats';
import ProjectLogs from './ProjectLogs';
import ProjectTerminal from './ProjectTerminal';
import './Project.css';

const Project = ({match}) => {
  console.log(match.url);
  return (
    <div className="project-page">
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path={`${match.url}/stats`} component={ProjectStats} />
            <Route path={`${match.url}/logs`} component={ProjectLogs} />
            <Route path={`${match.url}/terminal`} component={ProjectTerminal} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Project;
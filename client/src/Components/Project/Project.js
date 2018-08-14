import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../Header';
import Footer from '../Footer';
import ProjectStats from './ProjectStats';
import ProjectLogs from './ProjectLogs';
import ProjectTerminal from './ProjectTerminal';
import './Project.css';

const Project = ({ match }) => {
  return (
    <div className="project-page">
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path="/projects/:id/stats" component={ProjectStats} />
            <Route path="/projects/:id/logs" component={ProjectLogs} />
            <Route path="/projects/:id/terminal" component={ProjectTerminal} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Project;

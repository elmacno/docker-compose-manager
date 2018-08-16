import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContainerStatsModal from './ContainerStatsModal';
import ContainerLogsModal from './ContainerLogsModal';
import ContainerTerminalModal from './ContainerTerminalModal';
import { addProps } from './ContainersTable.props';
import './ContainersTable.css';

class ContainersTable extends Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
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
    ).isRequired,
    toggleStatsModal: PropTypes.func,
    toggleLogsModal: PropTypes.func,
    toggleTerminalModal: PropTypes.func
  };

  showStatsModal = container => {
    this.props.toggleStatsModal(container, true);
  };

  showLogsModal = async container => {
    this.props.toggleLogsModal(container, true);
  };

  showTerminalModal = container => {
    this.props.toggleTerminalModal(container, true);
  };

  render() {
    const { containers, project } = this.props;
    return (
      <Table hover responsive className="containers-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Command</th>
            <th>Created</th>
            <th>Status</th>
            <th>Ports</th>
            <th>Names</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {containers.map(container => (
            <tr key={container.Id}>
              <th scope="row">{container.Id.slice(0, 12)}</th>
              <td className="no-wrap">{container.Image}</td>
              <td>
                <p className="command">{container.Command}</p>
              </td>
              <td>
                {new Intl.DateTimeFormat('es-AR', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric'
                }).format(new Date(container.Created * 1000))}
              </td>
              <td>{container.Status}</td>
              <td>
                {container.Ports.map((forward, index) => (
                  <p key={index} className="ports">
                    <span className="port-type">{forward.Type}</span>
                    {forward.PublicPort ? forward.PublicPort : ''}
                    {forward.PublicPort ? (
                      <FontAwesomeIcon icon="arrow-right" />
                    ) : (
                      ''
                    )}
                    {forward.PrivatePort}
                  </p>
                ))}
              </td>
              <td className="no-wrap">
                {container.Names.map((name, index) => (
                  <p key={index}>{name.slice(1)}</p>
                ))}
              </td>
              <td className="no-wrap">
                <ContainerStatsModal
                  project={project}
                  container={container.Id}
                />
                <ContainerLogsModal
                  project={project}
                  container={container.Id}
                />
                <ContainerTerminalModal
                  project={project}
                  container={container.Id}
                />
                <a
                  href="#"
                  onClick={() => {
                    this.showStatsModal(container.Id);
                  }}
                >
                  <div className="container-properties text-center">
                    <FontAwesomeIcon icon="chart-bar" />
                  </div>
                </a>
                <a
                  href="#"
                  onClick={() => {
                    this.showLogsModal(container.Id);
                  }}
                >
                  <div className="container-properties text-center">
                    <FontAwesomeIcon icon="file-alt" />
                  </div>
                </a>
                <a
                  href="#"
                  onClick={() => {
                    this.showTerminalModal(container.Id);
                  }}
                >
                  <div className="container-properties text-center">
                    <FontAwesomeIcon icon="terminal" />
                  </div>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default addProps(ContainersTable);

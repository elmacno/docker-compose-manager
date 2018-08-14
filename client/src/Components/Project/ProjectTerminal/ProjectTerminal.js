import React, { Component } from 'react';
import * as XTerm from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import 'xterm/dist/xterm.css';
import './ProjectTerminal.css';

class ProjectTerminal extends Component {
  container;
  resizedFinished;

  unloadCallback = event => {
    const message = 'Close terminal? this will also terminate the command.';
    event.returnValue = message;
    return message;
  };

  createTerminal = socket => {
    let resizedFinished = null;
    const term = new XTerm.Terminal({
      cursorBlink: true,
      scrollback: 1000,
      tabStopWidth: 4
    });

    term.on('data', data => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        console.log(data);
        if (!data.match(/\[\d{0,2};\d{0,2}R/)) {
          socket.send(data);
        }
      }
    });

    term.on('open', () => {
      // https://stackoverflow.com/a/27923937/1727928
      window.addEventListener('resize', () => {
        clearTimeout(resizedFinished);

        resizedFinished = setTimeout(() => {
          term.fit();
        }, 250);
      });

      window.addEventListener('beforeunload', event => {
        const message = 'Close terminal? this will also terminate the command.';
        event.returnValue = message;
        return message;
      });

      term.fit();
    });

    term.open(this.container);

    return term;
  };

  componentDidMount() {
    XTerm.Terminal.applyAddon(fit);
    const { match } = this.props;
    const host = window.location.host.split(':')[0];
    const port = 3001;
    const url = `ws://${host}:${port}/containers/${match.params.id}/tty`;
    const socket = new WebSocket(url, ['tty']);
    this.terminal = this.createTerminal(socket);

    socket.onopen = event => this.terminal.fit();

    socket.onclose = event => {
      this.terminal.write('\n\n -- Connection to host lost.');
    };

    socket.onmessage = event => {
      const message = event.data.toString();
      this.terminal.write(message);
    };
  }

  render() {
    const { match } = this.props;
    return (
      <div className="project-terminal">
        <h2>Open terminal to container {match.params.id.slice(0, 12)}</h2>
        <div id="terminal" ref={ref => (this.container = ref)} />
      </div>
    );
  }
}

export default ProjectTerminal;

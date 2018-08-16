import React, { Component } from 'react';
import * as XTerm from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import 'xterm/dist/xterm.css';
import ContainerModal from '../ContainerModal';
import './ContainerTerminalModal.css';

class ContainerTerminalModal extends Component {
  elementRef;
  resizedFinished;
  socket;

  unloadCallback = event => {
    const message = 'Close terminal? this will also terminate the command.';
    event.returnValue = message;
    return message;
  };

  createTerminal = () => {
    let resizedFinished = null;
    const term = new XTerm.Terminal({
      cursorBlink: true,
      scrollback: 1000,
      tabStopWidth: 4
    });

    term.on('data', data => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        if (!data.match(/\[\d{0,2};\d{0,2}R/)) {
          this.socket.send(data);
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

    term.open(this.elementRef);

    return term;
  };

  handleOnOpened = () => {
    const { container } = this.props;
    XTerm.Terminal.applyAddon(fit);
    const host = window.location.host.split(':')[0];
    const port = 3001;
    const url = `ws://${host}:${port}/containers/${container}/tty`;
    this.socket = new WebSocket(url, ['tty']);
    this.terminal = this.createTerminal();

    this.socket.onopen = event => this.terminal.fit();

    this.socket.onclose = event => {
      this.terminal.write('\n\n -- Connection to host lost.');
    };

    this.socket.onmessage = event => {
      const message = event.data.toString();
      this.terminal.write(message);
    };
  };

  handleOnClosed = () => {
    this.socket.close();
  };

  render() {
    const { project, container } = this.props;
    return (
      <ContainerModal
        modalType="terminalModal"
        project={project}
        container={container}
        title="Container Terminal"
        onOpened={this.handleOnOpened}
        onClosed={this.handleOnClosed}
      >
        <div className="container-terminal-modal">
          <div id="terminal" ref={ref => (this.elementRef = ref)} />
        </div>
      </ContainerModal>
    );
  }
}

export default ContainerTerminalModal;

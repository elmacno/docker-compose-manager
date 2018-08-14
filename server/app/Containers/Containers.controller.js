const fs = require('fs');
const WebSocket = require('ws');
const { pipeline } = require('stream');
const { docker } = require('../../services/docker');

const getContainerStats = async (req, res) => {
  try {
    let container = await docker.getContainer(req.params.id);
    let stats = await container.stats({ stream: false });
    res.json({ stats });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getContainerLogs = async (req, res) => {
  try {
    let container = await docker.getContainer(req.params.id);
    let logs = await container.logs({
      stdout: true,
      stderr: true
    });
    logs = logs
      .split('\n')
      .map(line => line.replace(/[^\x20-\x7E]+/g, ''))
      .join('\n');
    res.json({
      logs
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const handleContainerTty = async (ws, req) => {
  try {
    let container = await docker.getContainer(req.params.id);
    let exec = await container.exec({
      Cmd: ['/bin/sh'],
      AttachStdin: true,
      AttachStdout: true,
      Tty: true
    });
    let stream = await exec.start({ hijack: true, stdin: true });
    await (() => {
      return new Promise(resolve => {
        ws.on('message', command => {
          stream.output.write(command);
        });
        const socketWriter = {
          write: data => {
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(data.toString());
            }
          }
        };
        docker.modem.demuxStream(stream.output, socketWriter, socketWriter);
      });
    })();
  } catch (error) {
    console.log(await error);
  }
};

module.exports = {
  getContainerStats,
  getContainerLogs,
  handleContainerTty
};

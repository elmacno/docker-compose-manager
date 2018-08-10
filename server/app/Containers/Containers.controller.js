const AnsiToHtml = require('ansi-to-html');
const { docker } = require('../../services/docker');
const { ComposeProjects } = require('./Containers.model');

const getContainerStats = async (req, res) => {
  try {
    let container = await docker.getContainer(req.params.id);
    let stats = await container.stats({stream: false});
    res.json({stats});
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
    logs = logs.split('\n').map(line => line.replace(/[^\x20-\x7E]+/g, '')).join('\n');
    res.json({
      logs
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getContainerStats,
  getContainerLogs
};

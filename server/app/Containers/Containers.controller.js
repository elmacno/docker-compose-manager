const { docker } = require('../../services/docker');
const { ComposeProjects } = require('./Containers.model');

const getAllContainers = async (req, res) => {
  try {
    let containers = await docker.listContainers({ all: true });
    res.json(containers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRunningContainers = async (req, res) => {
  try {
    let containers = await docker.listContainers();
    res.json(containers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getComposeProjects = async (req, res) => {
  try {
    res.json(await ComposeProjects.getAvailableContainers());
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

module.exports = {
  getAllContainers,
  getRunningContainers,
  getComposeProjects
};

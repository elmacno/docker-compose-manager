const { docker } = require('../../services/docker');
const { ContainerConfig } = require('./Containers.model');

const getAllContainers = async (req, res) => {
  try {
    let containers = await docker.listContainers();
    res.json(containers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAvailableContainers = async (req, res) => {
  try {
    res.json(await ContainerConfig.getAvailableContainers());
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

module.exports = {
  getAllContainers,
  getAvailableContainers
};

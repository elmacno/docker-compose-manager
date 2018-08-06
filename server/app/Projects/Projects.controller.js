const { Projects } = require('./Projects.model');

const getProjects = async (req, res) => {
  try {
    res.json(await Projects.all());
  } catch (error) {
    res.status(500).json(await error);
  }
};

const getProjectByName = async (req, res) => {
  try {
    res.json(await Projects.get(req.params.name));
  } catch (error) {
    res.status(404).json(await error);
  }
};

const getProjectContainers = async (req, res) => {
  try {
    let project = await Projects.get(req.params.name);
    let containers = await project.containers();
    res.json(containers);
  } catch (error) {
    res.status(404).json(await error);
  }
};

module.exports = {
  getProjects,
  getProjectByName,
  getProjectContainers
};

const express = require('express');
const containersRouter = express.Router();

const {
  getAllContainers,
  getRunningContainers,
  getComposeProjects
} = require('./Containers.controller');

containersRouter.get('/projects', getComposeProjects);
containersRouter.get('/running', getRunningContainers);
containersRouter.get('/all', getAllContainers);

module.exports = {
  containersRouter
};

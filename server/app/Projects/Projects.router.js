const express = require('express');
const projectsRouter = express.Router();

const {
  getProjects,
  getProjectByName,
  getProjectContainers
} = require('./Projects.controller');

projectsRouter.get('/', getProjects);
projectsRouter.get('/:name', getProjectByName);
projectsRouter.get('/:name/containers', getProjectContainers);

module.exports = {
  projectsRouter
};

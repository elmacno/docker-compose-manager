const express = require('express');
const projectsRouter = express.Router();

const {
  getProjects,
  getProjectByName,
  getProjectContainers,
  startProjectByName,
  stopProjectByName,
  restartProjectByName
} = require('./Projects.controller');

projectsRouter.get('/', getProjects);
projectsRouter.get('/:name', getProjectByName);
projectsRouter.get('/:name/containers', getProjectContainers);
projectsRouter.get('/:name/up', startProjectByName);
projectsRouter.get('/:name/down', stopProjectByName);
projectsRouter.get('/:name/restart', restartProjectByName);

module.exports = {
  projectsRouter
};

const express = require('express');
const containersRouter = express.Router();

const {
  getContainerStats,
  getContainerLogs,
  handleContainerTty
} = require('./Containers.controller');

containersRouter.get('/:id/stats', getContainerStats);
containersRouter.get('/:id/logs', getContainerLogs);
containersRouter.ws('/:id/tty', handleContainerTty);

module.exports = {
  containersRouter
};

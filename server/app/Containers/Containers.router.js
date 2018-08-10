const express = require('express');
const containersRouter = express.Router();

const {
  getContainerStats,
  getContainerLogs
} = require('./Containers.controller');

containersRouter.get('/:id/stats', getContainerStats);
containersRouter.get('/:id/logs', getContainerLogs);

module.exports = {
  containersRouter
};

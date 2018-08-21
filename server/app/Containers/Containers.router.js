const express = require('express');
const containersRouter = express.Router();
const { requireAuthentication } = require('../../config/passport/helpers');

const {
  getContainerStats,
  getContainerLogs,
  handleContainerTty
} = require('./Containers.controller');

containersRouter.get('/:id/stats', requireAuthentication, getContainerStats);
containersRouter.get('/:id/logs', requireAuthentication, getContainerLogs);
containersRouter.ws('/:id/tty', handleContainerTty);

module.exports = {
  containersRouter
};

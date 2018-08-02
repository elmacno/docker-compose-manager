const express = require('express');
const containersRouter = express.Router();

const {
  getAllContainers,
  getAvailableContainers
} = require('./Containers.controller');

containersRouter.get('/', getAvailableContainers);
containersRouter.get('/running', getAllContainers);

module.exports = {
  containersRouter
};

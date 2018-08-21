const express = require('express');
const usersRouter = express.Router();

const {
  getUsers,
  getUser,
  createOrUpdateUser,
  deleteUser
} = require('./Users.controller');

usersRouter.get('/', getUsers);
usersRouter.get('/:username', getUser);
usersRouter.put('/:username', createOrUpdateUser);
usersRouter.delete('/:username', deleteUser);

module.exports = {
  usersRouter
};

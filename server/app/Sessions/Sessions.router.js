const express = require('express');
const sessionsRouter = express.Router();

const {
  requireSignIn,
  requireAuthentication
} = require('../../config/passport/helpers');
const { signOut } = require('./Sessions.controller');

sessionsRouter.post('/signin', requireSignIn);
sessionsRouter.post('/signout', requireAuthentication, signOut);

module.exports = {
  sessionsRouter
};

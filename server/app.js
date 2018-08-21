const createError = require('http-errors');
const express = require('express');
const http = require('http');
const withWebSockets = require('express-ws');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');

const HardCodedUsersStragegy = require('./config/passport/hardcoded-users');
const JwtStrategy = require('./config/passport/jwt');
const { requireAuthentication } = require('./config/passport/helpers');

const app = express();
const server = http.Server(app);
withWebSockets(app, server);

const { sessionsRouter } = require('./app/Sessions/Sessions.router');
const { usersRouter } = require('./app/Users/Users.router');
const { containersRouter } = require('./app/Containers/Containers.router');
const { projectsRouter } = require('./app/Projects/Projects.router');

passport.use(new HardCodedUsersStragegy());
passport.use(new JwtStrategy());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(passport.initialize());
app.use('/sessions', sessionsRouter);
app.use('/users', requireAuthentication, usersRouter);
app.use('/containers', containersRouter); // Authentication middleware is applied on each route individually.
app.use('/projects', requireAuthentication, projectsRouter);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// prettier-ignore
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.json({ code: err.status, message: err.message });
});

module.exports = {
  app,
  server
};

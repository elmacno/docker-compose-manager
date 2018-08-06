const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const HardCodedUsersStragegy = require('./config/passport/hardcoded-users');
const JwtStrategy = require('./config/passport/jwt');
const { requireAuthentication } = require('./config/passport/helpers');
const { sessionsRouter } = require('./app/Sessions/Sessions.router');
const { containersRouter } = require('./app/Containers/Containers.router');
const { projectsRouter } = require('./app/Projects/Projects.router');

const app = express();

passport.use(new HardCodedUsersStragegy());
passport.use(new JwtStrategy());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use('/sessions', sessionsRouter);
app.use('/containers', requireAuthentication, containersRouter);
app.use('/projects', requireAuthentication, projectsRouter);

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

module.exports = app;

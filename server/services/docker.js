const Docker = require('dockerode');

module.exports = {
  docker: new Docker({ host: process.env.DOCKER_HOST, port: '2376' })
};

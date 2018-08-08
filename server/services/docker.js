const Docker = require('dockerode');

module.exports = {
  docker: new Docker({ host: process.env.DOCKER_HOST_IP, port: '2376' })
};

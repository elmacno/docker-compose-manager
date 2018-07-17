const Docker = require('dockerode');

module.exports = {
  docker: new Docker({ host: 'localhost', port: '2376' })
};

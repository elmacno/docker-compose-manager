const glob = require('glob');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

class ContainerConfig {
  constructor() {
    this.baseDir = process.env.BASE_DIR;
  }

  getAvailableContainers() {
    return new Promise((resolve, reject) => {
      glob(`${this.baseDir}/**/docker-compose*.yml`, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            files.map(file => {
              let config = yaml.safeLoad(fs.readFileSync(file));
              return {
                fullPath: file,
                fileName: path.basename(file),
                provides: Object.keys(config.services),
                raw: config
              };
            })
          );
        }
      });
    });
  }
}

module.exports = {
  ContainerConfig: new ContainerConfig()
};

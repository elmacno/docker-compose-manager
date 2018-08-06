const glob = require('glob');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

class ComposeProjects {
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
                projectName: path.basename(path.dirname(file)),
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
  ComposeProjects: new ComposeProjects()
};

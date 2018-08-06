const glob = require('glob');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const { docker } = require('../../services/docker');

class ProjectInfo {
  constructor(name, config) {
    this.name = name;
    this.config = config;
  }

  async containers() {
    let containers = await docker.listContainers();
    return containers.filter(container => {
      for (let name of container.Names) {
        if (name.startsWith(`/${this.name}`)) {
          return true;
        }
      }
      return false;
    });
  }
}

class Projects {
  constructor() {
    this.baseDir = process.env.BASE_DIR;
  }

  all() {
    return new Promise((resolve, reject) => {
      glob(`${this.baseDir}/**/docker-compose*.yml`, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files.map(file => path.basename(path.dirname(file))));
        }
      });
    });
  }

  get(name) {
    /* 
     * Try first <base_dir>/<project_name>/docker-compose.yml. If that doesn't work,
     * then try <base_dir>/docker-compose.<project_name>.yml
     */
    return new Promise((resolve, reject) => {
      const handleResults = (newPattern, err, contents) => {
        if (err) {
          if (newPattern) {
            fs.readFile(
              newPattern,
              { encoding: 'utf-8' },
              handleResults.bind(this, null)
            );
          } else {
            reject(err);
          }
        } else {
          resolve(new ProjectInfo(name, yaml.safeLoad(contents)));
        }
      };
      fs.readFile(
        `${this.baseDir}/${name}/docker-compose.yml`,
        { encoding: 'utf-8' },
        handleResults.bind(this, `${this.baseDir}/docker-compose.${name}.yml`)
      );
    });
  }
}

module.exports = {
  Projects: new Projects()
};

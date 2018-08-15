const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const componentName = process.argv[2];
const addProps = process.argv[3] === 'with-props';
const baseDir = process.env.INIT_CWD;
const targetDir = path.join(baseDir, componentName);

const createComponentDirectory = async name => {
  await new Promise((resolve, reject) => {
    fs.mkdir(targetDir, err => (err ? reject(err) : resolve()));
  });
};

const createIndexJs = async name => {
  const filename = 'index.js';
  await new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(targetDir, filename),
      `export { default } from './${name}';`,
      err => (err ? reject(err) : resolve())
    );
  });
};

const createComponentJs = async name => {
  const filename = `${name}.js`;
  await new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(targetDir, filename),
      `
import React, { Component } from 'react';
${addProps ? `import { addProps } from './${name}.props';` : ''}
import './${name}.css';

class ${name} extends Component {
  render() {
    return (
      <div className="${_.kebabCase(name)}">
        <p> This is the ${name} component </p>
      </div>
    );
  }
}

export default ${addProps ? `addProps(${name})` : name};
`,
      err => (err ? reject(err) : resolve())
    );
  });
};

const createComponentScss = async name => {
  const filename = `${name}.scss`;
  await new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(targetDir, filename),
      `
.${_.kebabCase(name)} {

}
`,
      err => (err ? reject(err) : resolve())
    );
  });
};

const createComponentProps = async name => {
  const filename = `${name}.props.js`;
  await new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(targetDir, filename),
      `
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    prop: state.${_.camelCase(name)}.prop
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setProp: value => dispatch({ type: 'PROP', payload: value })
    },
    dispatch
  );

const addProps = ${name} => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(${name});
};

export { addProps };
`,
      err => (err ? reject(err) : resolve())
    );
  });
};

const createComponentReducers = async (name, addProps) => {
  const filename = `${name}.reducers.js`;
  await new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(targetDir, filename),
      `
const defaultState = {
  prop: ''
};

const ${_.camelCase(name)} = (state = defaultState, action) => {
  switch (action.type) {
    case 'PROP':
      return {
        ...state,
        prop: action.payload
      };
    default:
      return state;
  }
};

export default ${_.camelCase(name)};
`,
      err => (err ? reject(err) : resolve())
    );
  });
};

createComponentDirectory(componentName)
  .then(() => {
    let promises = [
      createIndexJs(componentName),
      createComponentJs(componentName),
      createComponentScss(componentName)
    ];
    if (addProps) {
      promises.concat([
        createComponentProps(componentName),
        createComponentReducers(componentName)
      ]);
    }
    Promise.all();
  })
  .then(() => console.log(`Component ${componentName} created!`))
  .catch(error =>
    console.log(`Could not create Component ${componentName}: ${error}`)
  );

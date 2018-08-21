module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  globals: {
    module: true,
    __dirname: true,
    process: true,
    Buffer: true
  },
  rules: {
    //Possible Errors
    'no-cond-assign': [2],
    'no-constant-condition': [2],
    'no-control-regex': [2],
    'no-dupe-args': [2],
    'no-dupe-keys': [2],
    'no-duplicate-case': [2],
    'no-empty': [2],
    'no-empty-character-class': [2],
    'no-ex-assign': [2],
    'no-extra-boolean-cast': [2],
    'no-func-assign': [2],
    'no-inner-declarations': [2],
    'no-invalid-regexp': [2],
    'no-irregular-whitespace': [2],
    'no-negated-in-lhs': [2],
    'no-obj-calls': [2],
    'no-regex-spaces': [2],
    'no-sparse-arrays': [2],
    'no-unreachable': [2],
    'no-use-before-define': [2],
    'use-isnan': [2],
    'valid-typeof': [2],

    //Variables
    'no-var': [2],
    'no-array-constructor': [2],
    'no-delete-var': [2],
    'no-label-var': [2],
    'no-shadow': [2],
    'no-shadow-restricted-names': [2],
    'no-undef': [2],
    'no-undef-init': [2],
    'no-unused-vars': [2],

    //Stylistic Issues
    camelcase: [2],
    semi: [2],
    'func-names': [1],
    'no-inline-comments': [0],
    'no-lonely-if': [2],
    'no-new-object': [2],
    'no-unneeded-ternary': [2],
    'react/jsx-uses-vars': [2],

    //Best Practices
    curly: [2, 'all'],
    'dot-notation': [0],
    eqeqeq: [2],
    'no-alert': [2],
    'no-console': [1],
    'no-div-regex': [2],
    'no-labels': [2],
    'no-eq-null': [2],
    'no-eval': [2],
    'no-extend-native': [2],
    'no-extra-bind': [2],
    'no-fallthrough': [2],
    'no-implied-eval': [2],
    'no-invalid-this': [0], //disabling until fat arrow promises don't flag
    'no-iterator': [2],
    'no-lone-blocks': [2],
    'no-loop-func': [0],
    'no-native-reassign': [2],
    'no-new': [2],
    'no-new-func': [2],
    'no-new-wrappers': [2],
    'no-octal': [2],
    'no-octal-escape': [2],
    'no-redeclare': [2],
    'no-return-assign': [2],
    'no-script-url': [2],
    'no-self-compare': [2],
    'no-sequences': [2],
    'no-throw-literal': [2],
    'no-unused-expressions': [2],
    'no-void': [2],
    'no-with': [2],
    'vars-on-top': [2]
  }
};

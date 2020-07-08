module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/prop-types": "off",
    "jsx-a11y/media-has-caption": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "react/no-danger": "off",
    "consistent-return": "warn",
    "react/jsx-props-no-spreading": "warn",
    "jsx-a11y/label-has-associated-control": "warn",
    "no-unused-vars": "warn",
    "react/sort-comp": "warn",
    "max-len": "warn",
    "jsx-a11y/alt-text": "warn",
    "no-else-return": "warn",
    "no-multiple-empty-lines": "off",
    "react/jsx-no-duplicate-props": "warn",
  },
};

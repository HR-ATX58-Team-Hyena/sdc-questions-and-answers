module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'comma-dangle': 'off',
    'no-shadow': 'off',
    'object-curly-newline': 'off',
    'no-lonely-if': 'off',
  },
};

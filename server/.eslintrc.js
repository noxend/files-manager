module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    mocha: true
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
};

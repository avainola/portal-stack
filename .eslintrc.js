module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json'
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'quotes': ['error', 'single']
  },
  overrides: [{
    files: ['.eslintrc.js', 'jest.config.js', 'demo/webpack.config.js'],
    env: {
      node: true
    }
  }]
};
module.exports = {
  extends: ['expo', 'prettier'],
  ignorePatterns: ['/dist/*'],
  plugins: ['prettier', 'react-native'],
  rules: {
    'prettier/prettier': 'error',
    'react-native/sort-styles': 'off',
  },
};

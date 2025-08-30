// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // IMPORTANT: plugin must be last
    plugins: [
      'react-native-worklets/plugin', // replaces 'react-native-reanimated/plugin'
    ],
  };
};

// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-worklets/plugin', // replaces the old reanimated plugin
      'nativewind/babel'
    ],
  };
};

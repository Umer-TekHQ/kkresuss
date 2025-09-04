// module.exports = {
//   presets: ['@react-native/babel-preset'],
//   plugins: ['react-native-reanimated/plugin'],
// };

module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@Component': './src/components',
          '@Screen': './src/screens',
          '@Asset': './src/assets',
          '@Utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin', 
  ],
};

const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      '@Asset': path.resolve(__dirname, 'src/assets'),
      // Add other aliases here if needed
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-reanimated|react-native-gesture-handler)/)',
  ],

  moduleNameMapper: {
    '^@Component/(.*)$': '<rootDir>/src/components/$1',
    '^@Screen/(.*)$': '<rootDir>/src/screens/$1',
    '^@Asset/(.*)$': '<rootDir>/src/assets/$1',
    '^@Utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@Mock/(.*)$': '<rootDir>/src/mock/$1',
    '^@Navigator/(.*)$': '<rootDir>/src/navigators/$1',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', 
    '^react-native-reanimated$': '<rootDir>/__mocks__/react-native-reanimated.js',
  },
};

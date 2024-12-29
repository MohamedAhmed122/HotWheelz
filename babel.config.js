module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@styles': './src/styles',
          '@store': './src/store',
          '@service': './src/service',
          '@screens': './src/screens',
          '@common': './src/common',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

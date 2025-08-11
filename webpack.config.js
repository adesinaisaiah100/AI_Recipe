// filepath: /c:/Users/Isaiah/project9/webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  // Other Webpack configurations...
  entry: './src/index.js', // Adjust the entry point as needed
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Other rules...
    ],
  },
};
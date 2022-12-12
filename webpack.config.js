const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/script/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};

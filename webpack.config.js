const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  plugins: [
  new HtmlWebpackPlugin({
    title: 'Odin To-Do',
    template: './src/index.html',
  }),
  ],
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: {
    directory: path.join(__dirname, 'src'),
    },
  },
  optimization: {
    runtimeChunk: 'single',
  }
};
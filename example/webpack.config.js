const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge.smart(require('./webpack.config'), {
  entry: './example/example.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/example.html',
    }),
  ],
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 9000
  },
});
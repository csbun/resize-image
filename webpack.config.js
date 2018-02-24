module.exports = {
  // devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      use: "babel-loader",
      exclude: /node_modules/
    }]
  },

  // output: {
  //   path: "./dist",
  //   filename: "script.js",
  //   pathinfo: true
  // }
};

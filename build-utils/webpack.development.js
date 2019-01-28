const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: [
      // Require to let hot reload to work
      // remove `&quite=true` if you need console log when hot reload occur
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&quiet=true&overlayWarning=true",
      // using explicit path for entry, to avoid error occour in compilation
      "./src/index.js"
    ]
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
          failOnError: true,
          failOnWarning: false
        }
      }
    ]
  },
  // hot reload only needed in development
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

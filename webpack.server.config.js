const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = ({ mode } = { mode: "production" }) => {
  return {
    mode,
    entry: {
      index: path.resolve(__dirname, `./server/${mode}.js`)
    },
    output: {
      path: path.resolve(__dirname, "./dist/server/"),
      publicPath: "/",
      filename: "[name].bundle.js"
    },
    target: "node",
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: "babel-loader" }
        }
      ]
    },
    plugins: [new webpack.ProgressPlugin()]
  };
};

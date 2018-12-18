const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const PATHS = {
  DIST_DIR: path.join(__dirname, "/dist"),
  SRC_DIR: path.join(__dirname, "/src")
};

module.exports = (env, args) => {
  const { mode } = args;
  // console.dir(args);
  const devConfig = {
    mode: "development",
    entry: {
      main: [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&quiet=true&overlayWarning=true",
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
    plugins: [new webpack.HotModuleReplacementPlugin()]
  };
  const prodConfig = {
    mode: "production",
    entry: {
      main: "./src/index.js"
    },
    optimization: {
      noEmitOnErrors: true,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true
        })
      ]
    },
    plugins: [
      new CleanWebpackPlugin([PATHS.DIST_DIR], {
        root: __dirname,
        verbose: true
      })
    ]
  };
  const commonConfig = {
    mode: "none",
    bail: true,
    output: {
      path: PATHS.DIST_DIR,
      publicPath: "/",
      filename: "javascript/[name].js"
    },
    target: "web",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: { loader: "babel-loader" }
        },
        {
          test: /\.html$/,
          use: [{ loader: "html-loader", options: { minimize: true } }]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.ejs",
        title: "louis-vincent.me",
        author: "Louis.P",
        filename: path.join(PATHS.DIST_DIR, "/index.html"),
        excludeChunks: ["server"]
      })
    ]
  };
  const envConfig = {
    production: prodConfig,
    development: devConfig
  };
  // console.log("envConfig", envConfig[mode]);
  return merge(commonConfig, envConfig[mode] || {});
};

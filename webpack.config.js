const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const DIST_DIR = path.join(__dirname, "/dist/client");

// comparing to webpack early version, configs file has become much simpler
// splitting them into different file for your own convenient if needed
module.exports = (env, args) => {
  const { mode } = args;
  // config.mode only limit to 'none', 'development' and 'production', safer to define them explicitly instea of
  // `mode: args.mode` avoid user passing `test` or other mode into script arguments
  const devConfig = {
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
          parallel: true,
          sourceMap: false // set to true if you want JS source maps
        })
      ]
    },
    plugins: [
      new CleanWebpackPlugin([DIST_DIR], {
        root: __dirname,
        verbose: true
      })
    ]
  };
  const commonConfig = {
    mode: "none",
    bail: true,
    output: {
      path: DIST_DIR,
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
          // Loads the javacript into html template provided.
          // Entry point is set below in HtmlWebPackPlugin in Plugins
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
        filename: path.join(DIST_DIR, "/index.html"),
        excludeChunks: ["server"]
      })
    ]
  };
  const envConfig = {
    production: prodConfig,
    development: devConfig
  };

  return merge(commonConfig, envConfig[mode] || {});
};

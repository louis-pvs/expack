const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const modeConfig = env => require(`./build-utils/webpack.${env}`);
const presetConfig = require("./build-utils/loadPresets");
const DIST_DIR = path.join(__dirname, "/dist/client");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  console.info(`webpack start bundling ${mode} build...`);
  return merge(
    {
      mode,
      bail: true,
      entry: {
        main: "./src/index.js"
      },
      output: {
        path: DIST_DIR,
        publicPath: "/",
        filename: "javascript/[name].bundle.js",
        chunkFilename: "javascript/[name].chunkfile.js"
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
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
          template: "./src/index.ejs",
          title: "louis-vincent.me",
          author: "Louis.P",
          filename: path.join(DIST_DIR, "/index.html"),
          excludeChunks: ["server"]
        })
      ]
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};

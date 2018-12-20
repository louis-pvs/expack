const path = require("path");
const nodeExternals = require("webpack-node-externals");

const PATHS = {
  SRC_DIR: path.join(__dirname, "/server"),
  DIST_DIR: path.join(__dirname, "/dist/server")
};

module.exports = (env, args) => {
  const entryFile = {
    production: path.join(PATHS.SRC_DIR, "/prod.js"),
    development: path.join(PATHS.SRC_DIR, "/dev.js")
  };
  return {
    mode: args.mode,
    entry: {
      index: entryFile[args.mode]
    },
    output: {
      path: PATHS.DIST_DIR,
      publicPath: "/",
      filename: "[name].js"
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
          test: /\.js?$/,
          exclude: /node_modules/,
          use: { loader: "babel-loader" }
        }
      ]
    }
  };
};

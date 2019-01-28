const express = require("express");

const webpack = require("webpack");
// webpack plugins and middlewares
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

// webpack configs
// hardcode mode variable
// equivalent to --mode=development
const config = require("../webpack.config")({}, { mode: "development" });

// configure server port:
const PORT = process.env.PORT || 3000;

// invoking it is neccessary
// in webpack.config.js are exported using function
const compiler = webpack(config);

// applying the plugin here to share PORT definition
// format webpack logs in friendlier manner
compiler.apply(
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [`You application is running at http://localhost:${PORT}`],
      notes: ["Press Ctrl+C to quit"]
    }
  })
);
// propm browser to open automatically
compiler.apply(new OpenBrowserPlugin({ url: `http://localhost:${PORT}` }));

const devMiddleware = webpackDevMiddleware(compiler, {
  // required option for webpack-dev-middleware
  publicPath: config.output.publicPath,
  logLevel: "silent"
});

// create app instance
const app = express();

app
  .use(devMiddleware)
  .use(webpackHotMiddleware(compiler, { log: false }))
  .get("/", (req, res, next) => {
    // error occored during run time if not using relative path
    compiler.outputFileSystem.readFile("./index.html", (err, result) => {
      if (err) return next(err);
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  })
  .listen(PORT);

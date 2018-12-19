import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import express from "express";
import webpack from "webpack";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";

import webpackConfig from "../../webpack.config";

// configure server port:
const PORT = process.env.PORT || 3000;

// hardcoding the mode variables
// equivalent to --mode=development or
const envConfig = webpackConfig({}, { mode: "development" });

// invoking it is neccessary
// in webpack.config.js are exported using function
const compiler = webpack(envConfig);
compiler.apply(
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [`You application is running at http://localhost:${PORT}`],
      notes: ["Press Ctrl+C to quit"]
    }
  })
);

const devMiddleware = webpackDevMiddleware(compiler, {
  // required option for webpack-dev-middleware
  publicPath: envConfig.output.publicPath,
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

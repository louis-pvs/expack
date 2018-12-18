import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import express from "express";
import webpack from "webpack";

import webpackConfig from "../../webpack.config";

const envConfig = webpackConfig({}, { mode: "development" });

const compiler = webpack(envConfig);
const app = express();

const PORT = process.env.PORT || 8080;
// console.dir(envConfig);
// console.dir(process.env);

app
  .use(
    webpackDevMiddleware(compiler, { publicPath: envConfig.output.publicPath })
  )
  .use(webpackHotMiddleware(compiler))
  .get("/", (req, res, next) => {
    compiler.outputFileSystem.readFile("./index.html", (err, result) => {
      if (err) return next(err);
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  })
  .listen(PORT, () => {
    console.log(`App listening to ${PORT}`);
    console.log("Press Ctrl+C to quit");
  });

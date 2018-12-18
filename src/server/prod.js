const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;
const DIST_DIR = __dirname;

app
  .use(express.static(DIST_DIR))
  .get("/", (req, res) => res.sendFile("./index.html"))
  .listen(PORT, () => {
    console.log(`App listening to ${PORT}`);
    console.log("Press Ctrl+C to quit");
  });

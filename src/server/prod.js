const express = require("express");

// configure server port:
const PORT = process.env.PORT || 3000;

const DIST_DIR = __dirname;

// create app instance
const app = express();
app
  .use(express.static(DIST_DIR))
  .get("/", (req, res) => res.sendFile("./index.html"))
  .listen(PORT, () => {
    console.log(`App listening to ${PORT}`);
    console.log("Press Ctrl+C to quit");
  });

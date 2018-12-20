const path = require("path");
const express = require("express");

// configure server port:
const PORT = process.env.PORT || 3000;

const DIST_DIR = path.join(__dirname, "../client");
const HTML_FILE = path.join(DIST_DIR, "/index.html");

// create app instance
const app = express();
app
  .use(express.static(DIST_DIR))
  .get("/", (req, res) => res.sendFile(HTML_FILE))
  .listen(PORT, () => {
    console.log(`App listening to ${PORT}`);
    console.log("Press Ctrl+C to quit");
  });

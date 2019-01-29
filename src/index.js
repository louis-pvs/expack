import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

if (typeof module.hot !== "undefined") {
  module.hot.accept();
}

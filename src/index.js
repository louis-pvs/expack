import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<p>Hello world</p>, document.getElementById("root"));

if (typeof module.hot !== "undefined") {
  module.hot.accept();
}

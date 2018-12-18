import logMessage from "./logger";
logMessage("hello world!");

if (typeof module.hot !== "undefined") {
  module.hot.accept();
}

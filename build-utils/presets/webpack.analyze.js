const webpackBundleAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = () => {
  console.log("applying analyze preset...");
  return {
    plugins: [new webpackBundleAnalyzer()]
  };
};

const webpackMerge = require("webpack-merge");

module.exports = env => {
  const { presets = [] } = env;
  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map(presetName => {
    return require(`./presets/webpack.${presetName}`)(env);
  });
  return webpackMerge({}, ...mergedConfigs);
};

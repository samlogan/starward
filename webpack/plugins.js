const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };
  const compileTimeConstantForMinification = { __PRODUCTION__: JSON.stringify(production) };

  if (!production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions),
      new StatsPlugin('stats.json', {
        chunkModules: true,
        exclude: [/node_modules[\\\/]react/]
      })
    ];
  }
  if (!production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ];
  }
  if (production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions),
      new StatsPlugin('stats.json', {
        chunkModules: true,
        exclude: [/node_modules[\\\/]react/]
      })
    ];
  }
  if (production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new ExtractCssChunks({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ManifestPlugin({
        fileName: 'manifest.json'
      })
    ];
  }
  return [];
};

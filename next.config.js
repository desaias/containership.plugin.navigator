const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.API_VERSION': JSON.stringify(process.env.API_VERSION),
    }));
    return config;
  },
};

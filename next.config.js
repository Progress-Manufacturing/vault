const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = 
  {
    
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv)),
      config.node = {
        fs: "empty"
      }
    return config
  }
}
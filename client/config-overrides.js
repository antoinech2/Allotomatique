const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
    var webpack = require('webpack');

    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
    const fallback = config.resolve.fallback || {}; 
    Object.assign(fallback, { 
        "child_process" : false,
        "fs": false,
        "tls": false,
        "net": false,
        "os" : false,
        "constants" : false,
        "vm" : false,
        "querystring" : false,
        "http": require.resolve("stream-http"),
        "https": false,
        "zlib": require.resolve("browserify-zlib") ,
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "crypto": require.resolve("crypto-browserify")
  }) 
config.resolve.fallback = fallback; 
config.plugins = (config.plugins || []).concat([ 
   new webpack.ProvidePlugin({ 
    process: 'process/browser', 
  Buffer: ['buffer', 'Buffer'] 
}) 
]) 
    return config;
};
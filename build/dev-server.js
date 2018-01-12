// // 引入依赖模块
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
var config = require('./webpack.dev.config.js');

var PORT = process.env.PORT || 8081
var HOST = process.env.HOST || '0.0.0.0'

// 本地环境静态资源路径
var localPublicPath = 'http://' + HOST + ':' + PORT + '/';

config.plugins.push(new OpenBrowserWebpackPlugin({url:'http://127.0.0.1:' + PORT}))

// 重新配置插件项
// 位于开发环境下
config.plugins.unshift(new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}}));

new WebpackDevServer(webpack(config), {
  inline: true,
  compress: true,
  stats: {
    chunks: false,
    children: false,
    colors: true
  },
  disableHostCheck: true,
  public: process.env.PUBLIC || '0.0.0.0',
  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: true,
  // proxy: {
  //   '/service/*':{
  //     target: 'http://192.168.60.158:8081',
  //     // target: 'http://172.16.10.38:8081',
  //     secure: false,
  //   }
  // }

}).listen(PORT, HOST, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log(localPublicPath)
});

// 引入依赖模块
var path = require('path');
var webpack = require('webpack');
var WebpackMd5Hash = require('webpack-md5-hash');

// 引入基本配置
var config = require('./webpack.config.js');

// 重新配置插件项
// 位于开发环境下
config.plugins.unshift(new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}}));

// 模块热替换插件
config.plugins.push(new webpack.HotModuleReplacementPlugin());

// 允许错误不打断程序
config.plugins.push(new webpack.NoEmitOnErrorsPlugin());

// 启用source-map，开发环境下推荐使用cheap-module-eval-source-map
config.devtool = 'cheap-module-eval-source-map';

config.devServer = {
    stats:{colors:true},
    hot: true,
    contentBase: "dist/",
}

module.exports = config;
// 引入依赖模块
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');

// 项目根路径
var ROOT_PATH = path.resolve(__dirname, '../');

// 引入基本配置
var config = require('./webpack.config');

// 重新配置插件项
// 压缩js代码
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false,
        }
    })
);

//清空输出目录
config.plugins.push(
    new CleanPlugin(["dist"], {
        "root": ROOT_PATH,
        verbose: true,
        dry: false
    })
)

config.plugins.unshift(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
}));

// 开启source-map，生产环境下推荐使用cheap-source-map或source-map，后者得到的.map文件体积比较大，但是能够完全还原以前的js代码
config.devtool='cheap-source-map';
// 关闭source-map
// config.devtool=false;

module.exports = config;
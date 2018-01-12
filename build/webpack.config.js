// 引入依赖模块
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 项目根路径
var ROOT_PATH = path.resolve(__dirname, '../');
// 项目源码路径
var SRC_PATH = ROOT_PATH + '/src';
// 产出路径
var DIST_PATH = ROOT_PATH + '/dist';
//入口目录
// var PAGE_PATH = SRC_PATH + "/pages"
//入口文件过滤
var Dir_Filters = ['.DS_Store']

// var PAGE_DIR_LIST = fs.readdirSync(PAGE_PATH).filter(filename => Dir_Filters.indexOf(filename));
//获取多入口配置
// function getEntrys(){
//     var entry = {}
//     PAGE_DIR_LIST.map((name, index) =>{
//         entry[name] = [PAGE_PATH + '/' + name + '/main.js']
//     })

//     entry.vendor = ['vue']

//     return entry
// }

function getPlugins(){
    let plugins = [];
    // PAGE_DIR_LIST.map((name, index) =>{
    //     if(name == 'vendor') return
    //     plugins.push(
    //         // 自动生成html插件，如果创建多个HtmlWebpackPlugin的实例，就会生成多个页面
    //         new HtmlWebpackPlugin({
    //             // 生成html文件的名字，路径和生产环境下的不同，要与修改后的publickPath相结合，否则开启服务器后页面空白
    //             filename: name + '.html',
    //             // 源文件，路径相对于本文件所在的位置
    //             template: SRC_PATH + '/index.html',
    //             // 需要引入entry里面的哪几个入口，如果entry里有公共模块，记住一定要引入
    //             chunks: [name, 'vendor'],
    //             // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
    //             inject: 'html',
    //             // 生成html文件的标题
    //             hash:true
    //             // hash如果为true，将添加hash到所有包含的脚本和css文件，对于解除cache很有用
    //             // minify用于压缩html文件，其中的removeComments:true用于移除html中的注释，collapseWhitespace:true用于删除空白符与换行符
    //         })
    //     )
    // })

    plugins.push(
        // 自动生成html插件，如果创建多个HtmlWebpackPlugin的实例，就会生成多个页面
        new HtmlWebpackPlugin({
            // 生成html文件的名字，路径和生产环境下的不同，要与修改后的publickPath相结合，否则开启服务器后页面空白
            filename: 'index.html',
            // 源文件，路径相对于本文件所在的位置
            template: SRC_PATH + '/index.html',
            // 需要引入entry里面的哪几个入口，如果entry里有公共模块，记住一定要引入
            chunks: ['index', 'vendors'],
            // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
            inject: 'html',
            // 生成html文件的标题
            hash:true
            // hash如果为true，将添加hash到所有包含的脚本和css文件，对于解除cache很有用
            // minify用于压缩html文件，其中的removeComments:true用于移除html中的注释，collapseWhitespace:true用于删除空白符与换行符
        })
    )

    // 提取入口文件里面的公共模块
    plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js',
        })
    )

    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin()
    )

    return plugins;
}

module.exports = {
    context: SRC_PATH,
    // 入口文件，路径相对于本文件所在的位置，可以写成字符串、数组、对象
    entry: {
        index: ['./index.js'],
        vendors: ['vue','vue-router', 'vuex']
    },
    // entry: getEntrys(),

    //输出配置
    output: {
        // 输出文件，路径相对于本文件所在的位置
        path: DIST_PATH,
        // 设置publicPath这个属性会出现很多问题：
        // 1.可以看成输出文件的另一种路径，差别路径是相对于生成的html文件；
        // 2.也可以看成网站运行时的访问路径；
        // 3.该属性的好处在于当你配置了图片CDN的地址，本地开发时引用本地的图片资源，上线打包时就将资源全部指向CDN了，如果没有确定的发布地址不建议配置该属性，特别是在打包图片时，路径很容易出现混乱，如果没有设置，则默认从站点根目录加载
        // publicPath: '/',

        // 基于文件的md5生成Hash名称的script来防止缓存
        filename: '[name].[hash].js',
        // 非主入口的文件名，即未被列在entry中，却又需要被打包出来的文件命名配置
        chunkFilename: '[name].[chunkhash].chunk.js',
    },

    // 其他解决方案
    resolve: {
        // require时省略的扩展名，遇到.vue结尾的也要去加载
        extensions: ['.js', '.vue'],
        // 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
        alias:{
            'utils': SRC_PATH + '/static/utils.js',
            'fetch': SRC_PATH + '/static/fetch.js',
            'component': SRC_PATH + '/components',
            'static': SRC_PATH + '/static'
        }
    },    

    // 不进行打包的模块
    externals:{},

    // 模块加载器
    module: {
        // loader相当于gulp里的task，用来处理在入口文件中require的和其他方式引用进来的文件，test是正则表达式，匹配要处理的文件；loader匹配要使用的loader，"-loader"可以省略；include把要处理的目录包括进来，exclude排除不处理的目录 
        loaders: [
            //  使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/, 
                loader: 'vue-loader',
                exclude: /node_modules/
            },

            // 使用babel 加载 .js 结尾的文件
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            },

            //css sass less
            {
                test: /\.(scss|css|less)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader', 'autoprefixer-loader', 'less-loader'],
                //exclude: /node_modules/
            },

            //加载图片
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=9000&name=images/[hash:8].[name].[ext]'
            },

            //加载图标
            {
                test: /\.(woff|ttf|woff2|eot|svg)$/,
                loader: 'url-loader?limit=40960&name=fonts/[hash:8].[name].[ext]'
            }
        ]
    },

    // 配置插件项
    plugins: getPlugins()
}
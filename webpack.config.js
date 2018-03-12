/*
* @Author: yajie
* @Date:   2018-03-04 11:47:15
* @Last Modified by:   yajie
* @Last Modified time: 2018-03-12 21:18:40
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// webpack html loader
var HtmlWebpackPlugin = require('html-webpack-plugin')

//环境变量的配置 .dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
    return {
            //源文件的路径
            template : './src/view/' + name + '.html',
            // 目标文件的路径
            filename : 'view/' + name + '.html',
            title    : title,
            // 自动注入引用文件 eg: --  <script type="text/javascript" src="/mm/js"></script>
            inject   : true,
            hash     : true,
            // 对每个 文件都注入 common 文件 级base.js
            chunks   : ['common',name]
        }
}
//webpack config
var config = {
    // js 的入口文件
    entry:{
        'common'    : ['./src/page/common/index.js'],
        'index'     : ['./src/page/index/index.js'],
        'login'     : ['./src/page/login/index.js'],
        'result'    : ['./src/page/result/index.js'],
       
    },
    //输出 目标文件
    output:{
        path:'./dist',
        publicPath:'/dist',
        filename:'js/[name].js'
    },
    //外部依赖的声明
    externals:{
        'jquery':'window.jQuery'
    },
    //各种文件，各种loader
    module: {
        loaders: [
           { test: /\.css$/,  loader: ExtractTextPlugin.extract("style-loader","css-loader") },
           { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,  loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
           { test: /\.string$/,  loader: 'html-loader'}
        ]
    },
    //配置别名
    resolve : {
        alias : {
            util                : __dirname + '/src/util',
            page                : __dirname + '/src/page',
            service             : __dirname + '/src/service',
            image               : __dirname + '/src/image',
            node_modules         : __dirname + '/node_modules',
        }
    },
    //插件
    plugins:[
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            //将 'common' : ['./src/page/common/index.js'], 作为全局通用文件打包到 dist/js/base.js
            name : 'common',
            filename : 'js/base.js'
        }),
        //把 css单独打包到文件
        new ExtractTextPlugin('css/[name].css'),
        //html 模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ]
};

if(WEBPACK_ENV == 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;
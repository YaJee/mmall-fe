/*
* @Author: yajie
* @Date:   2018-03-04 11:47:15
* @Last Modified by:   yajie
* @Last Modified time: 2018-03-05 08:37:08
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')

//环境变量的配置 .dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return {
            template : './src/view/' + name + '.html',
            filename : 'view/' + name + '.html',
            inject   : true,
            hash     : true,
            chunks   : ['common',name]
        }
}
//webpack config
var config = {
    entry:{
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
       
    },
    output:{
        path:'./dist',
        publicPath:'/dist',
        filename:'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    module: {
        loaders: [
           { test: /\.css$/,  loader: ExtractTextPlugin.extract("style-loader","css-loader") },
           { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,  loader: 'url-loader?limit=100&name=resource/[name].[ext]' }
        ]
    },
    resolve : {
        alias : {
            util                : __dirname + '/src/util',
            page                : __dirname + '/src/page',
            service             : __dirname + '/src/service',
            image               : __dirname + '/src/image',
            node_modules         : __dirname + '/node_modules',
        }
    },
    plugins:[
    //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        //把 css单独打包到文件
        new ExtractTextPlugin('css/[name].css'),
        //html 模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

if(WEBPACK_ENV == 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;
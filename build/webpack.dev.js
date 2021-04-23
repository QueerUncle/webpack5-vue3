/*
  @Author: lize
  @Date: 2021/4/15
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/15
 */
const path = require('path');
const { merge } = require('webpack-merge');//用于合并两个配置文件的工具
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommonConfig = require('./webpack.config')();
const config = merge(webpackCommonConfig, {
    mode: 'development',
    devServer: {
        //webpack-server的配置
        host: 'localhost', //服务显示的地址localhsot  127.0.0.1  本机的ip地址都可以
        port: 8090, //服务的端口号
        open: false, //服务启动是否打开浏览器，打开的都是默认的浏览器
        contentBase: './', //服务器加载的目录，会自动找到该目录下的index.html文件进行页面展示
        inline: true, //页面刷新方式
        hot: true, // 开启热更新
        disableHostCheck: true,
        historyApiFallback: true,
        stats: 'minimal',
        compress: true,
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     // 生成一个html
        //     title: '首页asdasdasdasdasd',
        //     template: path.join(__dirname, '../src/index.html'),
        //     filename: 'index.html',
        //     hash: true,
        // }),
        ...webpackCommonConfig.htmlPlugins,
    ],
    devtool: 'inline-source-map',
});

module.exports =  (env, argv) => {
    delete config.htmlPlugins;
    return config
}

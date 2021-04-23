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
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommonConfig = require('./webpack.config')();
const { merge } = require('webpack-merge');//用于合并两个配置文件的工具

const config = merge(webpackCommonConfig, {
    mode: 'production', // 环境变量
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false, // 取出注释
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 生成一个html
            title: '首页',
            template: path.join(__dirname, '../src/index.html'),
            filename: 'index.html',
            hash: true,
        })
        // ...webpackCommonConfig.htmlPlugins,
    ]
})

module.exports =  (env, argv) => {
    // delete config.htmlPlugins;
    return config
}

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
const fs = require('fs');
const VueLoaderPlugin = require('vue-loader-v16/dist/plugin.js').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { fileExist, readFileSync } = require('./utils');

 const config = {
    mode: 'development',
    entry: path.join(__dirname, '../src/main.ts'), // 入口文件
    output: {
         clean: true, // 清除dist
        filename: 'js/[name].[contenthash].js' // 输出的名字
     },
     optimization: {
         moduleIds: 'deterministic', // 控制公共文件是否编译后hash值发生变化
         runtimeChunk: 'single',
         splitChunks: { // 拆除公共的
             chunks: 'all',
         },
     },
    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader-v16'},
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, // 不处理这两个文件夹里的内容
                loader: 'babel-loader',
            },
            { test: /\.css$/, use: 'css-loader' },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
        extensions: ['.js', '.json', '.jsx', '.css', '.ts'],
        modules: ['node_modules', path.resolve(__dirname, 'app')],
    },
    watchOptions: { // 监听文件变化，重新编译
        aggregateTimeout: 500, // 延迟500毫秒
        ignored: /node_modules/, // 过滤文件
    },
    // 插件
    plugins: [new VueLoaderPlugin()],
}
module.exports = (env, argv) => {
    const entrys = {};
    const htmlPlugins = [];
     if (fileExist(path.join(process.cwd(),'vue.config.js'))) {
         const fileConfig = require(path.join(process.cwd(),'vue.config.js'));
         if (fileConfig.pages) {
             Object.keys(fileConfig.pages).forEach((item) => {
                 entrys[item] = path.join(__dirname, fileConfig.pages[item].entry)
                 htmlPlugins.push(new HtmlWebpackPlugin({
                     title: fileConfig.pages[item].title,
                     filename: fileConfig.pages[item].fileName,
                     template: path.resolve(__dirname, fileConfig.pages[item].template),
                     chunks: ['common', item],
                     hash: true,
                 }));
             })
         }
         console.log(entrys, htmlPlugins);
         config.entry = entrys;
         config.htmlPlugins = htmlPlugins;
     }
    return config;
}

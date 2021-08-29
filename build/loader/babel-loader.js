// 安装Balel目的
// 在webpack中 默认只能处理部分 ES6的新语法，一些更高级的ES6或ES7的语法，webpack是处理不了的这个时候就需要借助第三方的loader 来帮助webpack 处理这些高级的语法。
// Balel 可以帮我我们将高级的语法转为低级的语法


'use strict'
// const utils = require('./utils')
const config = require('../config')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
// const sourceMapEnabled = isProduction
//   ? config.build.productionSourceMap
//   : config.dev.cssSourceMap
module.exports = {
  test: /\.js|ts$/,  // 命中 JavaScript 文件
  // 用 babel-loader 转换 JavaScript 文件
  // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
  use: {
    loader: 'babel-loader?cacheDirectory',
    options: {
      // 详细文档 https://babel.docschina.org/docs/en/
      presets: ['@babel/preset-env']
    }
  },
  // 只命中 include 目录里的js文件，加快 Webpack 搜索速度
  include: config.src
}

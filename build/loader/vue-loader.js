// 安装 vue-loader 目的
// 在webpack中 默认只能处理js vue-loader 是用来处理 .vue文件的 将 .vue文件的 js css html 提取出来 分别处理。
'use strict'
module.exports = {
  test: /\.vue$/,
  loader: 'vue-loader',
}

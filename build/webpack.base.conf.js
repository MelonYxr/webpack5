'use strict'
const path = require('path')
const config = require('./config')
const loader = require('./loader')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // webpack 根目录(必须为绝对路径) 默认为执行启动Webpack时所在的当前工作目录  可以命令行 webpack --context设置
  context: config.root,
  entry: {
    app: path.join(config.src, 'main.js')
  },
  output: {
    // 输出的 bundle 中生成路径信息
    // pathinfo: true,
    // 清空 dist
    // clean: true,
    // // 配置输出文件存放在本地的目录，必须是string类型的绝对路径
    // path: config.buildDir,//path.resolve(__dirname, '../dist'),
    // // 文件名称 源文件名_Chunk内容的Hash值 长度为6
    // filename: path.join('static', 'js/[name]_[chunkhash:6].js'),
    // chunkFilename: path.join('static', 'js/[id]_[chunkhash:6].js'),
    // // 静态资源 配置
    // // 如果静态资源 上传到cdn publicPath: 'https://cdn.example.com/assets/'
    // publicPath: config.root,

    path: config.buildDir,
    filename: '[name]_[contenthash:8].js',
    publicPath: '/',
    assetModuleFilename: 'assets/[name][ext]'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      loader.vueLoader,
      loader.babelLoader,
      loader.scssLoader,
      loader.assetLoader,
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader'
      // },
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   loader: 'babel-loader'
      // },
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // 将 JS 字符串生成为 style 节点
      //     'style-loader',
      //     // 将 CSS 转化成 CommonJS 模块
      //     'css-loader',
      //     // 将 Sass 编译成 CSS
      //     'sass-loader',
      //   ],
      // },
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   type: 'asset',
      //   // parser: {
      //   //   dataUrlCondition: 10240,
      //   // },
      //   generator: {
      //     filename: 'images/[name].[base]'
      //   }

      // }
    ]
  },

}

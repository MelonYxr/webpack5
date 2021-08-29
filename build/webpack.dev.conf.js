

const path = require('path');
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
// 获取端口插件
const portfinder = require('portfinder')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')
// 获取环境变量中ip 来源行间命令
const HOST = process.env.HOST
// 获取环境变量中端口 来源行间命令
const PORT = process.env.PORT && Number(process.env.PORT)

// 合并基础配置 与当前开发配置
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  // 配置 Source Maps
  // eval	                    每个module会封装到 eval 里包裹起来执行，并且会在末尾追加注释
  // source-map	              生成一个SourceMap文件.
  // hidden-source-map	      和 source-map 一样，但不会在 bundle 末尾追加注释.
  // inline-source-map	      生成一个 DataUrl 形式的 SourceMap 文件.
  // eval-source-map	        每个module会通过eval()来执行，并且生成一个DataUrl形式的SourceMap.
  // cheap-source-map	        生成一个没有列信息（column-mappings）的SourceMaps文件，不包含loader的 sourcemap（譬如 babel 的 sourcemap）
  // cheap-module-source-map	生成一个没有列信息（column-mappings）的SourceMaps文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。
  devtool: config.dev.devtool,
  // 开发环境相关信息配置 /config/index.js
  devServer: {
    inline: true,
    progress: true,
    // 客户端日志级别 > string: 'none' | 'info' | 'error' | 'warning'
    clientLogLevel: 'warning',
    // 配置属性是用来应对返回404页面时定向到特定页面 当页面找不到的时候会自动到配置的页面
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
    //   ],
    // },
    // 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    hot: true,
    // 只使用 HMR，不会 fallback 到 live reloading
    // hotOnly: true
    //  contentbase代表html页面所在的相对目录，如果我们不配置项，devServer默认html所在的目录就是项目的根目录
    // 是用来指定被访问html页面所在目录的
    contentBase: false, // since we use CopyWebpackPlugin.
    // contentBase: config.src, // since we use CopyWebpackPlugin.
    // 配置是否启用 gzip 压缩
    compress: true,
    // 指定使用一个 host，默认是 localhost，如果你希望服务器外部可访问，制定如下: host: "0.0.0.0"
    host: HOST || config.dev.host,
    // 指定端口
    port: PORT || config.dev.port,
    // 是否自动打开页面
    open: config.dev.autoOpenBrowser,
    // 这个配置属性用来在编译出错的时候，在浏览器页面上显示错误
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // 映射一个可以用地址访问的静态资源
    // publicPath: config.dev.assetsPublicPath,
    // 代理相关配置
    proxy: config.dev.proxyTable,
    // true，则终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
    quiet: true, // necessary for FriendlyErrorsPlugin
    // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  optimization: {
    // namedModules: true,
    moduleIds: 'named'
  },
  // 插件
  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // 热更新插件  在大多数情况下不需要任何配置
    new webpack.HotModuleReplacementPlugin(),
    // 热加载时直接返回更新文件名，而不是文件的id
    // new webpack.NamedModulesPlugin(),
    // 使webpack 与到错误是不中断 webpack 进程
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 将bundel注入到 index.html 下面是相关参数
    // title: 用来生成页面的 title 元素
    // filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
    // template: 模板文件路径，支持加载器，比如 html!./index.html
    // inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
    // favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
    // minify: {} | false , 传递 html-minifier 选项给 minify 输出
    // hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
    // cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
    // showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
    // chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
    // chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
    // excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块)
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // 进度条插件
    new ProgressBarPlugin(),
    // vueLoader插件
    new VueLoaderPlugin(),
    // 将项目中的某单个文件或整个文件夹在打包的时候复制一份到打包后的文件夹中
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsSubDirectory,
          globOptions: {
            ignore: ['.*']
          }
        }
      ]
    })
  ]
})






module.exports = new Promise((resolve, reject) => {
  // 将端口赋值给  protfinder
  portfinder.basePort = process.env.PORT || config.dev.port
  // portfinder 判断设置的端口是否可用 如果不可用 会在原来端口加 1 然后看是否可用 直到找到可用的
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // 将得到的可以用端口 设置给环境变量
      process.env.PORT = port
      // 将得到的可以用端口 设置给 开发环境端口
      devWebpackConfig.devServer.port = port

      // Friendly-errors-webpack-plugin识别某些类别的webpack错误，并清理，聚合和优先级，以提供更好的开发人员体验
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        // 发生错误时 是否显示错误信息
        // onErrors: config.dev.notifyOnErrors
        //   ? utils.createNotifierCallback()
        //   : undefined
      }))
      // 抛出 dev 配置信息 给webpack处理
      resolve(devWebpackConfig)
    }
  })
})





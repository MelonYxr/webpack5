'use strict'
const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')
// const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader')


// const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin();
// smp.wrap()
process.env.NODE_ENV = 'production'
// console.log(path.resolve(__dirname, 'node_modules'));
const webpackConfig = {
  // webpack 根目录(必须为绝对路径) 默认为执行启动Webpack时所在的当前工作目录  可以命令行 webpack --context设置
  context: path.resolve(__dirname, '../'),
  // 入口
  entry: {
    app: './src/main.js'
  },
  devtool: false,

  // 输出配置
  // output.path和output.publicPath都支持字符串模板，内置变量只有一个：hash代表一次编译操作的Hash值。
  output: {
    // 输出的 bundle 中生成路径信息
    // pathinfo: true,
    // 清空 dist
    clean: true,
    // 配置输出文件存放在本地的目录，必须是string类型的绝对路径
    path: path.resolve(__dirname, '../dist'),
    // 文件名称 源文件名_Chunk内容的Hash值 长度为6
    filename: path.join('static', 'js/[name]_[chunkhash:6].js'),
    chunkFilename: path.join('static', 'js/[id]_[chunkhash:6].js'),
    // 静态资源 配置
    // 如果静态资源 上传到cdn publicPath: 'https://cdn.example.com/assets/'
    publicPath: '/'
  },
  // stats: 'errors-only',
  stats: {
    // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    chunks: true,
    // 添加构建日期和构建时间信息
    builtAt: true,
    // 添加资源信息
    assets: true,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      // components: '../src/components/',
      // '@': path.resolve(__dirname, '../example')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /(node_modules)/,
        // transformAssetUrls: {
        //   video: ['src', 'poster'],
        //   source: 'src',
        //   img: 'src',
        //   image: ['xlink:href', 'href'],
        //   use: ['xlink:href', 'href']
        // }
      },
      {
        test: /\.js$/,  // 命中 JavaScript 文件
        // 用 babel-loader 转换 JavaScript 文件
        // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
        use: ['babel-loader'],
        // 只命中example目录里的js文件，加快 Webpack 搜索速度
        include: path.resolve(__dirname, '../example')
      },
      // 'vue-style-loader',
      {
        test: /\.(s[ac]ss|css)$/i, // .((c|sa|sc)ss)
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          // 将 JS 字符串生成为 style 节点
          // 'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: 'css-loader',
            options: {
              // // 开启 CSS Modules
              // modules: true,
              // // 自定义生成的类名
              // localIdentName: '[local]_[hash:base64:8]',
              // importLoaders: 2,
              // // sourceMap: false,
            },
          },
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
        exclude: /(node_modules)/
      },
      // {
      //   test: /\.css$/i,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       // options: {
      //       //   esModule: false,
      //       //   publicPath: path.join('static', 'css/[name].[contenthash:8].css'),
      //       // }
      //     },
      //     "css-loader"],
      //   exclude: /(node_modules)/
      // },

      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // 更多信息请点击这里 https://webpack.js.org/guides/asset-modules/
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10240
          }
        },
        generator: {
          filename: 'static/images/[name].[hash:8][ext][query]'
        }
      }

    ]
    // rules: [
    //   {
    //     test: /\.vue$/,
    //     loader: 'vue-loader'
    //   },
    //   {
    //     test: /\.js$/,  // 命中 JavaScript 文件
    //     // 用 babel-loader 转换 JavaScript 文件
    //     // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
    //     use: ['babel-loader?cacheDirectory'],
    //     // 只命中src目录里的js文件，加快 Webpack 搜索速度
    //     include: path.resolve(__dirname, '../example')
    //   },
    //   {
    //     test: /\.css$/i,
    //     use: [{
    //       loader: MiniCssExtractPlugin.loader,
    //       options: {
    //         esModule: false,
    //         // publicPath: "../",
    //       }
    //     }, "css-loader"],
    //   },
    //   {
    //     test: /\.scss$/, // 命中 SCSS 文件
    //     // 使用一组 Loader 去处理 SCSS 文件。
    //     // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
    //     use: ['style-loader', 'css-loader', 'sass-loader'],
    //     // 排除 node_modules 目录下的文件
    //     exclude: /(node_modules)/,
    //   },
    //   {
    //     // 对非文本文件采用 file-loader 加载
    //     test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
    //     use: ['file-loader'],
    //   },
    // ],

  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: false,
    // moduleIds: 'deterministic',
    runtimeChunk: {
      name: 'project_runtime',
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      `...`,

      // 压缩html
      new HtmlMinimizerPlugin({
        // parallel: true,
      }),
      // 压缩 css
      new CssMinimizerPlugin({
        // parallel: true,
      }),
      // 压缩js
      new TerserPlugin({
        // parallel: true,
        test: /\.js(\?.*)?$/i,
        exclude: /node_modules/,
        terserOptions: {    //Terser 压缩配置
          output: {
            // 是否删除注释
            comments: true
          },
          compress: {//console删除
            pure_funcs: ["console.log"]
          }
        },
      })
    ],
  },
  plugins: [
    // ESLint 校验
    new ESLintPlugin({
      fix: true,
      extensions: ['js', 'json', 'coffee'],
      exclude: '/node_modules/'
    }),
    // 打包进度条
    new ProgressBarPlugin(),
    // 清空plugins
    new CleanWebpackPlugin(),
    // vue-loader 插件
    new VueLoaderPlugin(),
    // 定义环境量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false
    //     }
    //   },
    //   sourceMap: false,
    //   parallel: true
    // }),

    // html 注入
    new HtmlWebpackPlugin({
      // 应用 title
      title: pkg.name || 'My App',
      // 文件名称 输出路径
      filename: path.resolve(__dirname, '../dist/index.html'),
      // 模版地址
      template: 'index.html',
      // 注入 base标签 base 相对路径的基准   base: 'http://example.com',
      base: false,
      // 脚本注入到哪里  注入选项。有四个选项值 true, body, head, false.
      inject: 'body',
      // favicon.ico 路径地址
      favicon: './static/favicon.ico',
      // 给注入的资源加 hash 参数 默认 false
      hash: false,
      // 默认值是 true。表示只有在内容变化时才生成一个新的文件。
      cache: true,
      //  howErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true ，也就是显示错误信息。
      showErrors: true,
      //  chunks 决定是否都使用这些生成的 js 文件 针对多入口 [main,sub]
      chunks: '?',
      //  excludeChunks 决定排除那些 js 文件 针对多入口 [outsub]
      excludeChunks: '',
      // 生成的模板文档中标签是否自动关闭，针对xhtml的语法，会要求标签都关闭，默认false
      xhtml: true,
      // 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
      chunksSortMode: 'auto',
      // 允许注入meta- tags
      meta: {
        keywords: '程序员,程序猿,攻城狮',
        author: '342348407@qq.com',
      },
      // minify压缩 https://github.com/kangax/html-minifier#options-quick-reference
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    // css 提取
    new MiniCssExtractPlugin({
      filename: path.join('static', 'css/[name].[contenthash:8].css'),
      chunkFilename: path.join('static', 'css/[id].[contenthash:8].css'),
    }),
    // 复制静态资源
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: 'static',
          globOptions: {
            ignore: ['.*']
          }
        },
        {
          from: path.resolve(__dirname, '../static/images'),
          to: 'static/images',
        }
      ]
    })
  ]
}


module.exports = webpackConfig

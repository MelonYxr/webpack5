'use strict'
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
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
// const ESLintPlugin = require('eslint-webpack-plugin')

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin();
// smp.wrap()
process.env.NODE_ENV = 'production'
// console.log(path.resolve(__dirname, 'node_modules'));
const webpackConfig = {
  // webpack 根目录(必须为绝对路径) 默认为执行启动Webpack时所在的当前工作目录  可以命令行 webpack --context设置
  // context: path.resolve(__dirname, '../'),
  // 入口
  // entry: {
  //   app: './example/main.js'
  // },
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
      '@': path.resolve(__dirname, '../src')
    }
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
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: 'body',
      // meta: {
      //   charset: { charset: 'utf-8' },
      //   viewport: 'width=device-width, initial-scale=1'
      // },
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
        }
      ]
    })
  ]
}


// 合并基础配置 与当前开发配置
module.exports = merge(baseWebpackConfig, {


  // webpack 根目录(必须为绝对路径) 默认为执行启动Webpack时所在的当前工作目录  可以命令行 webpack --context设置
  // context: path.resolve(__dirname, '../'),
  // 入口
  // entry: {
  //   app: './example/main.js'
  // },
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
      '@': path.resolve(__dirname, '../src')
    }
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
    // html 注入
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: 'body',
      // meta: {
      //   charset: { charset: 'utf-8' },
      //   viewport: 'width=device-width, initial-scale=1'
      // },
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
        }
      ]
    })
  ]
})



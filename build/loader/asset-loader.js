'use strict'
// const utils = require('./utils')
const config = require('../config')
const path = require('path')
console.log(config, 'module.exports module.exports ');
module.exports = {
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

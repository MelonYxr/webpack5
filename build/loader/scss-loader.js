'use strict'
// const utils = require('./utils')
const config = require('../config')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
console.log(config);
module.exports = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    "postcss-loader",
    "sass-loader",
  ],
}

const HtmlWebpackPlugin = require('html-webpack-plugin')
const WordboxWebpackPlugin = require("workbox-webpack-plugin")

module.exports = {
  mode: 'development',

  entry: './src/app.js',

  plugins: [
    new HtmlWebpackPlugin(),

    // PWA 插件
    new WordboxWebpackPlugin.GenerateSW({
      clientsClaim: true, // 快速启用 service worker
      skipWaiting: true, // 跳出等待
    })
  ],

  devServer:{
    devMiddleware: {
      writeToDisk: true
    }
  }
}
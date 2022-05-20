const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const json5 = require('json5')

module.exports = {

  
  output: {
    filename: 'scripts/[name].js', // 编译输出文件
  },

  mode: 'development', // 模式  本地开发

  devtool: 'inline-source-map', // 生成map文件，方便在mode=dev时调试文件

  devServer: { // webpack-dev-server的配置项
    // webpack-dev-server 不会真实的生成dist文件夹，而是把代码放到内存中
    // 所以只需要把 output.filename、devServer.static 设置一致即可
    // 并且如果有文件变动 需要重启服务，否则内存中是没有新增的文件的，就会报错 Module parse failed: Unexpected character
    static: '../dist' // 服务启动访问的路径
  },
}

const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  output: {
   filename: 'scripts/[name].[contenthash].js', // 编译输出文件 添加hash串 相当于版本号了
  },

  mode: 'production', // 模式  本地开发

  optimization: { // 优化配置
    minimizer: [
      new CssMinimizerWebpackPlugin(), // 压缩css
      new TerserWebpackPlugin(), // 压缩js
    ],
  },

  performance: {
    hints: false // 关闭性能提示
  }
}
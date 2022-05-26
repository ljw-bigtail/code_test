const htmlWebpackPlugin = require("html-webpack-plugin")
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  plugins: [
    new htmlWebpackPlugin(),

    // 模块联邦
    new ModuleFederationPlugin({
      name: 'nav', // 组件别名
      filename: 'remoteEntry.js', // 生成文件名
      remotes: {}, // 引用的其他组件的名字
      exposes: {  // 暴露给别的应用使用的组件
        './Header': './src/Header.js' // 别人使用时 基于key访问， value 表示项目内该组件的实际路径
      },
      shared: { // 模块里包含的共享组件
        
      }
    })
  ]
}
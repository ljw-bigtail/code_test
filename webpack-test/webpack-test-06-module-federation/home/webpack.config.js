const htmlWebpackPlugin = require("html-webpack-plugin")
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  plugins: [
    new htmlWebpackPlugin(),

    // 模块联邦
    new ModuleFederationPlugin({
      name: 'home', // 应用别名
      filename: 'remoteEntry.js', // 生成文件名
      remotes: { // 引用的其他组件的名字（远端的路径）
        // 这里引用nav 需要填 nav项目中 模块联邦里的 name 还有发布的地址 remoteEntry.js就是那边的 filename
        nav: 'nav@http://localhost:8001/remoteEntry.js'
      },
      exposes: {  // 暴露给别的应用使用的组件
        './HomeList': './src/HomeList.js' // 别人使用时 基于key访问， value 表示项目内该组件的实际路径
      },
      shared: { // 模块里包含的共享组件
        
      }
    })
  ]
}
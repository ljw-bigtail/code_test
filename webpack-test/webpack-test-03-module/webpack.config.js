const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
  webpack 依赖关系工具推荐
  webpack-bundle-analyzer
*/ 
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'development',
  // entry: './src/app.js',
  entry: {
    app: './src/app.js',
    app2: './src/app2.js'
  },

  resolve: {
    alias: { // 给绝对路径 定义 全局的变量以简化代码
      '@': path.resolve(__dirname, './src')
    },

    extensions: ['.json', '.js', '.vue'], // 文件引用不使用后缀时，顺序读取对应后缀的文件（默认读取 .js 文件）
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),

    new BundleAnalyzerPlugin()
  ],

  externalsType: 'script',
  externals: { // 配置外部定义的包
    // 手动写法
    // 'jquery': 'jQuery', // key 是 js中引入时候的名称，value 是外部引入的js 暴露出来的对象名称 然后在 在html模版中手动添加
    // 自动写法-需要 externalsType 配置
    'jquery': [ // key 是 js中引入时候的名称
      'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js', // 外部引入的js路径（自动添加到模版中）
      '$', // 表示上面的js在浏览器中暴露的对象, 与引入时赋值的 $$ 无关
    ], 
  }
}
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
  webpack 依赖关系工具推荐
  webpack-bundle-analyzer
*/ 
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  // mode: 'development',
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

    // extensions: ['.json', '.js', '.vue'], // 文件引用不使用后缀时，顺序读取对应后缀的文件（默认读取 .js 文件）
    extensions: ['.ts', '.json', '.js', '.vue'], // 优先解析ts
  },

  output: {
    filename: 'scripts/[name].[contenthash].js', // 编译输出文件 添加hash串 相当于版本号了
    path: path.resolve(__dirname, './dist'),
    clean: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),

    // new BundleAnalyzerPlugin() // 可以实时预览的依赖关系工具
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
  },

  module:{
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: true // css 模块 功能开启 
            }
          }, 
          'postcss-loader',
        ]
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },

  // tree-shaking配置：用于消除无用代码（测试环境需要手动开启 mode production时自动）
  // 它依赖于ES2015中的 import 和 export 语句，用来检测代码模块是否被导出、导入，且被 JavaScript 文件使用。（MDN）
  // 对 require 是无法支持的
  // 另外 webpack5 默认所有代码是无副作用（可以tree-shaking）需要手动配置 sideEffect(package.json) 不做操作的文件(例如 theme.css 类似文件)
  optimization: {
    usedExports: true, // 自动删除所有没用到的代码
  },

  // sideEffect: true | false | []
  // 所有代码有副作用（默认）｜ 都无副作用随便删 ｜ 这些包有副作用
  // 例子： "sideEffect": ["*.css"],  表示 所有的css都是有副作用的 不能删



  devServer:{
    // 启动服务时中间件
    devMiddleware: {
      writeToDisk: true // 启动服务时实时修改dist （不仅放到内存里 还会存到dist里）
    }
  }
}
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',

  // 把所有js打包到一个文件里
  // entry: ['./src/app2.js', './src/app.js', 'lodash'],

  // 根据key生成多个文件
  entry: {
    // main: ['./src/app2.js', './src/app.js'],
    main: {
      import: ['./src/app.js', './src/app2.js'],
      dependOn: 'lodash', // 意思是 可能会使用这个外部js，不需要再打包进来
    },
    main2: {
      import: ['./src/app3.js'],
      dependOn: 'lodash', // dependOn 后面填写的值 是 entry 的 key，即可以定义 lodash 打包到 aaa 中，这里就填 aaa
      filename: 'page/[name].js' // 测试：把html和js放到一起

    },
    // aaa: 'lodash',
    lodash: {
      import: 'lodash',
      filename: 'common/[name].js'
    },
  },

  output: {
    clean: true
  },

  plugins: [
    // 每个html模版文件都需要实例化一个HtmlWebpackPlugin
    // 写多个HtmlWebpackPlugin需要自定义输出文件名 filename 否则报错：ERROR in Conflict: Multiple assets emit different content to the same filename index.html
    new HtmlWebpackPlugin({
      // 自定义的属性 可以通过 ejs 语法，使用 htmlWebpackPlugin.options 参数调用
      title: '多页面应用',
      template: './index.html',
      inject: 'body',
      chunks: ['lodash', 'main'], // 填写 entry 的 key ，表示该模版中需要插入哪些打包的js
      filename: '1.html',
      // publicPath: 'http://www.a.com/as', // chunks js的路径
    }),
    new HtmlWebpackPlugin({
      title: '2',
      template: './list.html',
      chunks: ['lodash', 'main2'],
      filename: 'page/2.html',
      // publicPath: 'http://www.b.com/',
    })
  ],
}
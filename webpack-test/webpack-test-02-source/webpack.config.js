const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './app.js',

  devServer: { // 服务配置
    static: path.resolve(__dirname, './dist'), // 静态文件地址
    compress: true, // 请求gzip压缩代码
    // port: 8080, // 端口号
    host: '0.0.0.0', // 局域网公开（局域网内可以用ip访问服务）

    headers: { // 自定义请求头
      'X-Access-Token': 'asdasdasd',
    },

    proxy: { // 开启代理
      '/api': 'http://localhost:9000', // 把接口 指向 XXX服务器
    },

    // https: true, // 使用https访问
    // https: {}, // 可以配置第三方证书防止浏览器报错
    // http2: true, // 自带https证书

    historyApiFallback: true, // 给不正确的路由返回index文件（需要注意的是，如果资源是绝对路径，可能异常，改下publicPath）

    hot: true, // 热替换  不刷新dom直接更新
    // css css-loader 自带 module.hot.accept
    // js 需要 module.hot.accept 手动处理下（vue啥的一般自带）
    // 插件 HotModuleReplacementPlugin 可以帮助自动设置js的(webpack 5开始 自带了)

    liveReload: true, // 热加载

    client: {
      overlay: true, // 默认开启页面上异常覆盖层
    },
  },

  output: {
    clean: true,
    publicPath: '/', // 默认路径
  },

  // source map 配置
  // source map 是用来锁定打包前代码的行数的功能代码。文件中包含代码的映射信息，包括 行数、列数。
  // devtool: 'eval', // 默认配置，使用eval执行 生成行内 source map
  // devtool: false, // 关闭 source map // 生产环境 推荐使用
  // devtool: 'source-map', // 生成并引用 source map文件
  // devtool: 'hidden-source-map', // 仅生成 不使用 source map文件
  // devtool: 'inline-source-map', // 行内 source map 并把代码转换为 dataUrl 形式
  // devtool: 'eval-source-map', // 使用eval执行 生成行内 source map 并把代码转换为 dataUrl 形式
  // devtool: 'cheap-source-map', // 生成并引用 source map文件 (文件中缩略列信息)
  devtool: 'cheap-module-source-map', // 属于增加module支持的 source-map 开发环境推荐使用

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        // use: ['babel-loader', 'eslint-loader'],
        // eslint-loader 已被弃用 现在改用 eslint-webpack-plugin
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new EslintWebpackPlugin(), // eslint 如果eslint不通过，webpack中抛出异常 否则小问题时webpack直接通过编译了
    // 拓展： husky 插件 可以在git hock中添加shell脚本，可以时间在git过成中先脚本后commit 等具体行为，可以缩减eslint次数，仅提交前检查
  ],
};


const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const json5 = require('json5')

module.exports = {
  // entry: './src/index.js', // 单入口文件
  entry: { // 多入口文件
    // 修改为多个入口文件时，会报异常：相同的bundle文件名 => 需要修改 output.filename 的规则
    // Error: Conflict: Multiple chunks emit assets to the same filename bundle.js (chunks index and another)
    // index: './src/index.js',
    // another: './src/another-module.js'
    // 会产生一个问题：引用的第三方库会重复引用进所有的js中

    // 方法1
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'shared', // 定义出共享文件
    // },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'shared',
    // },
    // shared: 'loadsh' // 抽出共享的 loadsh 保存为 shared.chunck

    // 方法2 使用插件
    // 添加 optimization.splitChunks.chunks 的配置 
    index: './src/index.js',
    another: './src/another-module.js'

    // 方法3 在js中动态引入
    // 示例代码 ./src/index.js 搜索 webpackChunkName
  },
  
  output: {
    // filename: 'bundle.js', // 编译输出文件 这里是固定但文件入口的
    // filename: '[name].bundle.js', // 编译输出文件 多文件入口需要按规则配置
    filename: 'scripts/[name].[contenthash].js', // 编译输出文件 添加hash串 相当于版本号了
    path: path.resolve(__dirname, './dist'), // 编译输出目录（必须是绝对路径）
    clean: true, // 清理dist目录
    assetModuleFilename: '[contenthash][ext]', // 默认所有资源文件的文件规则
    publicPath: 'http://localhost:8080/', // 默认公共根目录
  },

  mode: 'development', // 模式  本地开发
  // mode: 'production', // 模式 生产环境

  devtool: 'inline-source-map', // 生成map文件，方便在mode=dev时调试文件

  plugins: [
    new HtmlWebpackPlugin({ // 打包生成html文件
      template: './index.html', // 生成html的模版文件
      filename: 'app.html', // 生成html的文件名
      inject: 'body', // script插入的位置
    }),

    new MiniCssExtractPlugin({  // 插件需要先实例化再使用， 否则 报错 // You forgot to add 'mini-css-extract-plugin' plugin...
      filename: 'styles/[contenthash].css' // 生成html的文件名
    }),


  ],

  devServer: { // webpack-dev-server的配置项
    // webpack-dev-server 不会真实的生成dist文件夹，而是把代码放到内存中
    // 所以只需要把 output.filename、devServer.static 设置一致即可
    // 并且如果有文件变动 需要重启服务，否则内存中是没有新增的文件的，就会报错 Module parse failed: Unexpected character
    static: './dist' // 服务启动访问的路径
  },

  module: { // 资源模块
    // test 不只会匹配 html 中引用的文件 还会匹配 css 中引用的文件，注意 可以用 文件路径或者名称或者文件大小来区分不同需求下的操作模式
    rules: [
      {
        test: /\.png$/, // 文件名的匹配规则
        type: 'asset/resource', // source资源转换类型
        // asset/resource 会复制文件到对应目录，并且重命名文件
        generator: { // 关联规则对应的生成文件路径, 会覆盖 output.assetModuleFilename 的值
          filename: 'images/[contenthash][ext]' // 文件名
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
        // asset/inline 会读取文件并使用文件的 Basse64 形式调用图片
        // 由于没有对应文件夹需求，所以不需要 generator 参数
      },
      {
        test: /\.txt$/,
        type: 'asset/source'
        // asset/source 会读取文件的内容放到bundle文件中直接引用
      },
      {
        test: /\.jpeg$/,
        type: 'asset',
        // asset 会自动选择 inline / resource 模式，选择规则：如果资源大于8KB，就使用resource
        // 如果代码选择了resource模式 就会自动使用 output.assetModuleFilename 来替代 generator，或者手动设置 generator使用
        generator: { // 关联规则对应的生成文件路径, 会覆盖 output.assetModuleFilename 的值
          filename: 'images/[contenthash][ext]' // 文件名
        },
        parser: { // 解析器，用来调整默认的8K规则
          dataUrlCondition: { // 
            maxSize: 4 * 1024 // 4KB // 限制规则
          }
        }
      },
      {
        test: /\.(css|less)$/,
        // use: ['style-loader', 'css-loader', 'less-loader'],
        // use中是有顺序的，从后往前执行
        // css-loader 负责解析css
        // style-loader 负责把代码放到页面中
        // style-loader 负责把less转为css
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'], // 为了使用 MiniCssExtractPlugin 插件，生成css文件，就不需要再插入css到html中。所以去掉style-loader
        // MiniCssExtractPlugin 合并生成css文件
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        type: 'asset/resource', // source资源转换类型
      },
      {
        test: /\.(tsv|csv)$/,
        use: 'csv-loader' // 读csv的loader 生成一个 Array
      },
      {
        test: /\.xml$/,
        use: 'xml-loader' // 读xml的loader 生成一个 Object
      },
      {
         // 自定义文件格式
        test: /\.json5$/,
        type: 'json', // 按照 XX 文件类型读取文件
        parser: {
          parse: json5.parse // 使用解析器
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 需要排除的文件规则
        use: {
          loader: 'babel-loader', // js兼容
          options: {
            presets: ['@babel/preset-env'], // 参数 预设 
            plugins: [
              [
                '@babel/plugin-transform-runtime', // 浏览器提示 regeneratorRuntime is not defined 错误，需要安装 @babel/plugin-transform-runtime 自动导入包
              ]
            ],
          }
        }
      }
    ]
  },

  optimization: { // 优化配置
    minimizer: [
      new CssMinimizerWebpackPlugin(), // 压缩css
      new TerserWebpackPlugin(), // 压缩js
    ],

    splitChunks: {
      // chunks: 'all', // 自动拆分第三方插件

      cacheGroups:{ // 缓存组
        vendor:{ // 第三方库
          test: /[\\/]node_modules[\\/]/, // 文件路径匹配规则
          name: 'vendors', // 生成的文件名
          chunks: 'all', // 对所有的chunck做处理
        }
      }
    }
  },

  performance: {
    hints: false // 关闭性能提示
  }
}
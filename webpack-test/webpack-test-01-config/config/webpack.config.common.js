const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const json5 = require('json5')

module.exports = {
  entry: { // 多入口文件
    index: './src/index.js',
    another: './src/another-module.js'
  },
  
  output: {
    path: path.resolve(__dirname, '../dist'), // 编译输出目录（必须是绝对路径）
    clean: true, // 清理dist目录
    assetModuleFilename: '[contenthash][ext]', // 默认所有资源文件的文件规则
  },

  plugins: [
    new HtmlWebpackPlugin({ // 打包生成html文件
      template: '../index.html', // 生成html的模版文件
      filename: 'app.html', // 生成html的文件名
      inject: 'body', // script插入的位置
    }),

    new MiniCssExtractPlugin({  // 插件需要先实例化再使用， 否则 报错 // You forgot to add 'mini-css-extract-plugin' plugin...
      filename: 'styles/[contenthash].css' // 生成html的文件名
    }),
  ],

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
    splitChunks: {
      cacheGroups:{ // 缓存组
        vendor:{ // 第三方库
          test: /[\\/]node_modules[\\/]/, // 文件路径匹配规则
          name: 'vendors', // 生成的文件名
          chunks: 'all', // 对所有的chunck做处理
        }
      }
    }
  }
}
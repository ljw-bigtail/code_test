
module.exports = {
  plugins: [
    // 还需要在package.json中添加 browserlist 用来确定需要兼容的浏览器版本
    require('autoprefixer'), // 自动添加 css前缀 插件

    require('postcss-nested'), // 支持使用嵌套语法 但是编辑器不支持 还不如直接使用less
  ]
}
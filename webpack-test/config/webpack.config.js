// 作为配置项入口 
// 用来 在不同环境下 合并正确的 配置项文件

const { merge } = require('webpack-merge')

const commenConfig = require('./webpack.config.common')
const prodConfig = require('./webpack.config.prod')
const devConfig = require('./webpack.config.dev')

module.exports = (env) => {
  switch(true){
    case env.development: return merge(commenConfig, devConfig);
    case env.production: return merge(commenConfig, prodConfig);
    default: new Error('No matching config.')
  }
}
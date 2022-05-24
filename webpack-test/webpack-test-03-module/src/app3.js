// alert('hello')
console.log(this); // 这里的this 本来应该指向window，但是因为模块化 所以指向了 module.export
// this.alert('webpack') // Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'alert')
// 需要使用一个imports-loader

// imports-loader 使用后需要处理 import 和 require 这个文件里没有就暂时不用处理
// MDN文档地址：https://webpack.docschina.org/loaders/imports-loader/#inline

// 会改为类似这种的语法
// import myLib from 'imports-loader?imports=default|jquery|$!./example.js';

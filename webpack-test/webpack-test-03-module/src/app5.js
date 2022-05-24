// babel
// import '@babel/polyfill' // 引入全局的polyfill
// 增加了 babel-loader 以及相关插件后 不需要手动 import了
// 这个例子里 500+KB减到了100+KB

console.log(Array.from([1,2,3,4], x=>x+x));
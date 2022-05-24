import(/*webpackChunkName: 'lodash'*/'lodash')
  .then(({ default: _ })=>{
    console.log(_.join(['1', '2'], ' '), '异步引入lodash');
  })

console.log(_.join(['hello', 'app2'], ' '), '使用全局变量的lodash')

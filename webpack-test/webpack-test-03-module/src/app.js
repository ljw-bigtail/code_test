// 几种导入模块的方法
import _ from 'loadsh'
import Header from './components/Header'

const math = require('/src/math.js')
// const math = require('@/math')

console.log(math.add(12, 35), 'math.add')
console.log(_.join(['hello', 'webpack'], ' '), 'loadsh')
console.log(Header());

import $$ from 'jquery' // $$ 是随便起的名字

console.log($$);


function appendDiv(html, classList){
  const div = document.createElement('div')
  // div.style.cssText = 'width: 200px; height: 200px; border: 1px solid #ccc;'
  div.textContent = html
  classList && div.classList.add(...classList)
  document.body.appendChild(div)
}


import style from './app.css'

console.log(style);
appendDiv('test', [ style.box ])



// worker.js
// webpack4 中需要使用 worker loader webpack5自带，直接使用即可
// 原语法 但是webpack不会识别这个 不会生成单独的work.js
// const worker = new Worker('./workers/work.js')
// 需要使用 URL 对象，编译后会生成 /dist/src_workers_work_js.js 文件
const worker = new Worker(new URL('./workers/work.js', import.meta.url))
// import.meta 返回上下文元数据属性 包含模块的信息
worker.postMessage({
  question: '50 + 50 = ?'
})
worker.onmessage = (message) => {
  console.log(message, 'worker message');
  console.log(message.data, 'worker res data')
}


import './test'
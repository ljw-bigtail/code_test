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
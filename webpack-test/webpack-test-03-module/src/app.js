// 几种导入模块的方法
// import _ from 'loadsh'
import Header from './components/Header'

const math = require('/src/math.js')
const math = require('@/math')

console.log(math.add(12, 35), 'math.add')
console.log(_.join(['hello', 'webpack'], ' '), 'loadsh')
console.log(Header());

import $$ from 'jquery' // $$ 是随便起的名字

console.log($$);
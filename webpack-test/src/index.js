import sayHello from './01'
import img1_src from './assets/3.png'
import img2_src from './assets/2.svg'
import txtSrc from './assets/mes.txt'
import img3_src from './assets/1.jpeg'
import './style.css'
import './style.less'
import csv1 from './assets/data.csv'
import xml1 from './assets/data.xml'
import json5_ from './assets/1.json5'

import './async-module'

import _ from 'loadsh'

console.log(_.join(['Index', 'module', 'loaded!'], ' '));

sayHello()

appendImg(img1_src)
appendImg(img2_src)
appendDiv(txtSrc, ['bg'])
appendDiv('KCJSADG LK：JED LADESOIJV L：K', ['noto'])
appendDiv('KCJSADG LK：JED LADESOIJV L：K') 
appendImg(img3_src)

console.log(csv1)
console.log(xml1)
console.log(json5_);



function appendImg(src){
  const img = document.createElement('img')
  img.src = src
  document.body.appendChild(img)
}

function appendDiv(html, classList){
  const div = document.createElement('div')
  div.style.cssText = 'width: 200px; height: 200px; border: 1px solid #ccc;'
  div.textContent = html
  classList && div.classList.add(...classList)
  document.body.appendChild(div)
}

const btn = document.createElement('button')
btn.textContent = '加法运算'
btn.addEventListener('click', function(){
  // 魔法注释 用于webpack 自定义配置 
  // webpackChunkName：输出的文件名  
  // webpackPrefetch: 预获取
  // webpackPreload: 预加载
  import(/* webpackChunkName: 'math', webpackPreload: true */'./math.js').then(({add})=>{
  // 普通引入
  // import('./math.js').then(({add})=>{
    console.log(add(1, 2));
  })
})
document.body.appendChild(btn)
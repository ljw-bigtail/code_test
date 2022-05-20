import './style.css';

import './input';

const math = require('./math');

console.log(math.add(1, 2), 'math.add');

class A {
  constructor() {
    this.str = 'app start';
  }

  log() {
    console.log(this.str);
  }
}

const a = new A();
a.log();

const btn = document.createElement('button');
btn.textContent = 'add';
btn.addEventListener('click', () => {
  const div = document.createElement('div');
  div.classList.add('square');
  document.body.appendChild(div);
});
document.body.appendChild(btn);

// 会跨域： port 8080 ！= 9000
// fetch('http://localhost:9000/api/hello')
// webpack server反向代理处理
// fetch('/api/hello')
//   .then((res) => res.text())
//   .then((res) => {
//     console.log(res);
//   });

// 用来 实现js更新 dom保留之前的操作状态
// if (module.hot) {
//   module.hot.accept('./input.js', () => {});
// }

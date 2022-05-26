import('nav/Header').then(res => {
  document.body.appendChild(res.Header())
})

import('home/HomeList').then(res => {
  document.body.innerHTML += res.default(8)
})
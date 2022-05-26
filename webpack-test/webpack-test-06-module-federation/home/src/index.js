import HomeList from "./HomeList";

import('nav/Header').then((Headers) => {
  const content = document.createElement('div')
  content.appendChild(Headers.Header())
  console.log(Headers);

  content.innerHTML += HomeList(5)
  document.body.appendChild(content)
})  

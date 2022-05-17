function getComponent(){
  return import('loadsh')
    .then(({default: _})=>{
      const element = document.createElement('div')
      element.innerHTML = _.join(['HELLO', 'webpack'], ' ')
      return element
    })
}

getComponent().then(element => {
  document.body.appendChild(element)
})
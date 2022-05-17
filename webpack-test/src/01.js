async function sayHello(){
  // consol.log('Hello World');
  // console.log('Hello World123');
  let string = await getString()
  console.log(string);
}

function getString(){
  return new Promise((res, rej)=>{
    setTimeout(function(){
      res('success string!!!')
    }, 5000)
  })
}

export default sayHello
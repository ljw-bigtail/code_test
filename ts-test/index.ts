function init(): void{
  let isBlloen: boolean = true // var isBlloen = true

  let isNum: number = 123 // var isNum = 123

  let isString: string = 'abc' // var isString = 'abc'

  let symbol = Symbol();
  let obj = {
    [symbol]: "abc"
  }

  let isArr: number[] = [1, 2, 3] // var isArr = [1, 2, 3];
    
  let isArr1: Array<number> = [1, 2, 3] // var isArr1 = [1, 2, 3]; // 泛型语法

  enum Color {Red = 2, Green, Blue}

  let green_color: Color = Color.Green

  let red_color: string = Color[2]
   
  function a(name: string): void{}
}

init()


function theCityThatAlwaysSleeps(): string {
  let getCity: any;
  if (true) {
      let city = "Seattle";
      getCity = function() {
          return city;
      }
  }
  return getCity();
}

function loop(): void{
  for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {
      console.log(i); 
    }, 100 * i);
  } 
}

function hi(name: String, date: Date){
  console.log(`Hi ${name}, today is ${date}.`)
}

hi('leo', new Date())

let surname: string

let age: number

let list2: number[] = [1,2,3]

let list: [number, number, number] = [1,2,3]

// list = [1]

let list1: Array<number> = [1,2,3]

list1 = [1]
// list1 = [1, '']

let obj = { 
  x: 0
}
// obj()
// obj.foo()
// obj = '123'
// const n: number = obj

function getNum(): number{
  return 2  
}

const arr: Array<string> = ['1', '2', '3']
arr.forEach(function(e){
  console.log(e.toLocaleLowerCase());
})

// function printCoord(pt:{ x: number, y?: number}){
//   console.log(`坐标：x: ${pt.x},y: ${pt.y?.toLocaleString()}`);
// }

// printCoord({
//     x:100,
//     y:2
// })

// printCoord({
//   x:100,
// })


function aa(id: number | string){
  // console.log(id.toLocaleLowerCase());
  if(typeof id == "string"){
    console.log(id.toLocaleLowerCase());
  }else{
    console.log(id);
    
  }
}

aa(1)
aa('1')

type Point = {
  x: number,
  y?: number | string
}

function printCoord(pt: Point){
  console.log(`坐标：x: ${pt.x},y: ${pt.y?.toLocaleString()}`);
}

printCoord({
    x:100,
    y:2
})

printCoord({
  x:100,
})

// type Point = {
//   x: number,
//   y: number | string
// }
// 可以扩展
// type threePoind = Point & {
//   z: number
// }

interface Point1 {
  x: number,
  y: number | string
}

// let a1: Point1 = {
//   x:1,
//   y:2,
// }

interface Point1 {
  c: number,
}

// a1.c = 123

const a2: Point1 = {
  x:1,
  y:2,
  c:2,
}


interface threePoind extends Point1 {
  z: number
}

const a: threePoind = {
  x:1,
  y:2,
  c:2,
  z:2,
}

const myCanvas = document.getElementById('my-canvas') as HTMLCanvasElement
const _myCanvas = <HTMLCanvasElement>document.getElementById('my-canvas')

const x = ('hello' as unknown) as number

function printString(str1: string, str2: 'left' | 'right' | 'center'){}
printString('leo', 'left')


// const a_num: bigint = BigInt(100)
// const b_num: bigint = 100n

function print(strs: string | string[] | null, str1: string | number){
  // 为什么null的判断需要放在前面，因为null的类型也是object，放到后面，会导致 for of时 strs可能为null
  if(!strs){return} // 真值缩小 先过滤掉null等
  // if(strs && typeof strs == 'object'){ // 或者在 object的时候判断null
  if(typeof strs == 'object'){ // 类型守卫
    for (const str of strs) {
      console.log(str);
    }
  } else if(typeof strs == 'string'){
    if(strs === str1){ //等值缩小
    }else{
    }
  } else {
  }
}

// type Fish = { swin: ()=> void }
// type Bird = { fly: ()=> void }
// type Man = { fly?: ()=> void, swin?: ()=> void }
// function move(animal: Fish | Bird | Man){
//   if("swin" in animal){
//     return (animal as Fish).swin()
//   }
//   return (animal as Bird).fly()
// }
// move({
// })

function logVal(x: Date | string){
  if(x instanceof Date){
    console.log(x.toUTCString());
  } else {
    console.log(x.toString());
  }
}

function getX(){
  const a = Math.random()
  let x: string | number | boolean = a < 0.5
  if(x){
    return 'test'
  }
  return 100
}
let a_x = getX()
a_x = '1'
a_x = 1
// a_x = true

interface Fish {
  name: string,
  swim: ()=>void
}
interface Bird {
  name: string,
  fly: ()=>void
}
function isFish(x: Fish | Bird){
  return 
}
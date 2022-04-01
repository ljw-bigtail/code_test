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

// interface Fish {
//   name: string,
//   swim: ()=>void
// }
// interface Bird {
//   name: string,
//   fly: ()=>void
// }
// function isFish(x: Fish | Bird){
//   return 
// }


type Fish = {
  name: string,
  swim: () => void
}

type Bird = {
  name: string,
  fly: () => void
}

function isFish(pet: Fish | Bird): pet is Fish{
  return (pet as Fish).swim !== undefined
}

function getSmallPet(): Fish | Bird{
  let fish: Fish = {
    name: 'sharkey',
    swim: ()=>{}
  }
  let bird: Bird = {
    name: 'sparrow',
    fly: ()=>{}
  }
  return Math.random() > 0.5 ? bird : fish
}

let pet = getSmallPet()

if(isFish(pet)){
  pet.swim()
}else{
  pet.fly()
}

const zoo: (Fish | Bird)[] = [getSmallPet(),getSmallPet(),getSmallPet(),getSmallPet(),getSmallPet()]
const underWater: Fish[] = zoo.filter(isFish)
const underWater2: Fish[] = zoo.filter(isFish) as Fish[]
const underWater3: Fish[] = zoo.filter((pet): pet is Fish=>{
  if(pet.name == 'book'){
    return false
  }
  return isFish(pet)
})

// 这样写没有表示出sideLength与radius包含的关系（这里必使互斥的）
// interface Shape {
//   kind: 'circle' | 'square',
//   radius?: number,
//   sideLength?: number
// }

interface Circle {
  kind: 'circle',
  radius: number,
}

interface Square {
  kind: 'square',
  sideLength: number,
}

type Shape = Circle | Square

function getAreas(shape: Shape){
  if(shape.kind === 'square'){
    return shape.sideLength ** 2
  }
  return Math.PI * shape.radius ** 2
}

let fn: (a: string) => void // void 表示 返回为空
type FunctionA = (a: string) => void
let fnA: FunctionA

type Callback = {
  disc: string,
  (someArg: number): boolean
}

function doA(fn: Callback){
  console.log(fn.disc + ' returen ' + fn(6));
}

function callbackA(n:number){
  console.log(n);
  return n > 1
}
callbackA.disc = 'hellow'
doA(callbackA)

// 构造签名
class Ctor{
  s:string
  constructor(s: string){
    this.s = s
  }
}
type SomeConstructor = {
  new (s: string): Ctor
}

function fnB(ctor: SomeConstructor){
  return new ctor('hello')
}

const fB = fnB(Ctor)
console.log(fB.s);

interface CallOrConstructor{ // 既可new、也可直接调用
  new (s: string): Date // 构造签名
  (n?: number): number // 调用签名
}
function fnC(date: CallOrConstructor){
  let d  = new Date('2000')
  let n = date(100)
}

function map<Input, Output>(arr: Input[], func: () => Output): Output[] {
  return arr.map(func)
}

function longest<Type extends { length: number }>(a: Type, b: Type){
  if(a.length >= b.length){
    return a
  }
  return b
}

const longestArr = longest([1,2], [2,3,4,1])
const longestStr = longest('111', '34423')
const longestObj = longest({a: 1, length: 2}, {a: 1, length: 3})

function combine<Type>(arr1: Type[], arr2: Type[]): Type[]{
  return arr1.concat(arr2)
}
const arr_combine = combine([1,2,3], [3, 4])
const arr_combine_1 = combine<string | number>([1,2,3], ['3', '4'])

function myForEach(arr: any[], callback: (arg: any, index?: number) => void){
  for (let i = 0; i < arr.length; i++) {
    // callback(arr[i], i)
    callback(arr[i])
  }
}
// myForEach([1,2,3], function(item){
//   console.log(item);
// })
// myForEach([1,2,3], function(item, i){
//   console.log(item, i);
// })
myForEach([1,2,3], function(item, i){
  console.log(item, i?.toFixed());
})

// 函数重载
function makeDate(timestamp: number): Date
function makeDate(m: number, d: number, y: number): Date
function makeDate(mOrTimestanp: number, d?: number, y?: number): Date {
  if(d !== undefined && y !== undefined){
    return new Date(y, mOrTimestanp ,d)
  }
  return new Date(mOrTimestanp)
}


// 索引签名
interface StringArray{
  [index: number]: string
}
const myArray: StringArray = ['a', 'b']
const secondItem = myArray[0]

interface TestString{
  [a: string]: boolean
  x: boolean
}
const testString: TestString = {
  x: true,
  ['xa']: true,
  [1]: true
}


interface Person{
  name: string,
  age: number,
}
interface Student{
  work: string,
}
interface Boy extends Person{
  sex: 'man',
}
const boy_a: Boy = {
  name: 'lilei',
  age: 10,
  sex: 'man'
}
interface Boy1 extends Person, Student{ // 可以扩展自多个可接口
  sex: 'man',
}
const boy_b: Boy1 = {
  name: 'lilei',
  age: 10,
  sex: 'man',
  work: 'read book'
}

interface Box<Type>{
  con: Type
}

// const redBox: Box<number> = {
//   con: 123
// }
function getVal<Type>(arg: Type[]): Type[]{
  console.log(arg.length);
  return arg
}

// getVal<string>(['1'])
// 使用泛型
function identity<Type>(arg: Type): Type{
  return arg
}
let identity_a: <Type>(arg: Type) => Type = identity 
let identity_b: <Input>(arg: Input) => Input = identity 
let identity_c: { <Type>(arr: Type): Type } = identity 

// 泛型接口
interface GenericIdentity {
  <Type>(arg: Type): Type
}
let my_identity_a: GenericIdentity = identity

// 也可以把泛型写在接口后面，调用时传递进来
interface GenericIdentityFn<Type> {
  (arg: Type): Type
}
let my_identity_b: GenericIdentityFn<string> = identity

// 泛型类
class GenericNumber<Type> {
  val1: Type
  constructor(opt: {
    val1: Type
  }){
    this.val1 = opt.val1
  }
}
let myGenericNumber = new GenericNumber({val1: 1}) 

// 泛型约束
interface LengthWise {
  length: number
}
function identitylog<Type extends LengthWise>(arg: Type): Type{
  console.log(arg.length);
  return arg
}

// 泛型约束中使用类型参数
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key){
  return obj[key]
}
let obj_a = { a: 1, b: 2, c: 3 }
getProp(obj_a, 'a')
// getProp(obj_a, 'd') // 类型“"d"”的参数不能赋给类型“"a" | "b" | "c"”的参数

// 泛型中使用类类型
// 没有约束
// function create<Type>(c: { new (): Type }): Type{
//   return new c()
// }
class BeeKeeper{
  hasMask: boolean = true
}
class ZooKeeper{
  nameTag: string = 'leo'
}
class Animal{
  numLegs: number = 4
}
class Bee extends Animal{
  keeper: BeeKeeper = new BeeKeeper()
}
class Lion extends Animal{
  keeper: ZooKeeper = new ZooKeeper()
}
// 添加约束 Animal
function createInstance<A extends Animal>(c: { new (): A }): A{
  return new c()
}
createInstance(Lion).keeper.nameTag
createInstance(Bee).keeper.hasMask
createInstance(Animal).numLegs
// createInstance(BeeKeeper) //类型“typeof BeeKeeper”的参数不能赋给类型“new () => Animal”的参数。

// keyof操作符
type TestPoint = {
  x: number,
  y: number
}
type Position = keyof TestPoint // 相当于 type Position = 'x' | 'y'

// typeof操作符
type Predicate = (x: unknown) => boolean
type K = ReturnType<Predicate> // 预定义K类型是 Predicate 的这个函数类型

function f(){
  return 1
}
type P = ReturnType<typeof f>

type Person1 = {
  age: number,
  name: string
}
type a = Person1['age']
let persona: a = 1 // 不能将类型“string”分配给类型“number”
type b = Person1['age' | 'name']
// let personb: b = true // 不能将类型“boolean”分配给类型“b”

// 使用重载比较麻烦
interface IdLabel { id: number }
interface NameLabel { name: string }
function createLabel(id: number): IdLabel
function createLabel(name: string): NameLabel
function createLabel(nameOrId: number | string): IdLabel | NameLabel{
  if(typeof nameOrId == 'number') {
    return {id: nameOrId}
  }
  return {name: nameOrId}
}

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel
function createLabel1<T extends number | string>(nameOrId: T): NameOrId<T>{
  if(typeof nameOrId == 'number') {
    // return {id: nameOrId} // TODO 这里没搞明白为啥返回的与实际类型时相符的，但是这里报错
  }
  // return {name: nameOrId}
  throw ''
}
let createLabelA = createLabel1('aa')
// let createLabelB = createLabel(true) // wrong




class PointX{
  x: number = 0 // 初始化：可以直接赋值 
  y: number
  readonly z: string // 只读属性
  public a: number = 0 // 默认 公开属性
  protected b: number = 0 // 能在当前类和子类中访问
  private c: number = 0 // 私有 只能在当前类中访问
  static d: number = 100 // 静态成员 编译后 生成 PointX.d = 100;
  private static e: number = 100 // 静态成员 可以和上面的一起使用
  static #f: number = 10 // 私有的静态成员，不能通过类调用 // 生成 _PointX_f = { value: 10 }; // 
  _length: number = 0
  constructor(val: string = '1'){ // 初始化：构造函数
    this.y =  0
    this.z = val // 只读属性在构造函数中可以初始化
  }
  log(n: number): void{ // 和普通函数一样
    // this.z = '22' // 无法分配到 "z" ，因为它是只读属性。
  }
  // getter / setter
  get length(): number{ // number可以不写 能自动推断出
    return this._length
  }
  set length(val){ // 如果属性没set 会推断为只读属性
    this._length = val
  }
} 
const pt = new PointX('a') // 构造函数中需要传递参数，实例化的时候就必须按照规则传参
pt.x = 1
pt.y = 2
// pt.z = '123' // 无法分配到 "z" ，因为它是只读属性。
const pt1 = new PointX() // constructor中设置了默认值时 也可不填参数

// 继承
class PointTest extends PointX{
  constructor(){
    // 派生类的构造函数必须包含 "super" 调用。
    super()
  }
  // 索引签名， 和上面的索引签名一致，用来规范对象中的参数、函数等
  [s: string]: number | string | ((s: number) => void)
  a: number = 1
}


interface Pingable{
  ping(): void
}

class Sonar implements Pingable{
  ping(): void {
    console.log(1);
  }
}


// 泛型 类
class Box<Type>{
  contents: Type
  // static a: Type // error 静态成员不能引用类类型参数。
  constructor(val: Type){
    this.contents = val
  }
}
const b = new Box<string>('hello')

//  this类型
class BoxA {
  cont: string = ''
  sameAs(oth: this){ // 这里oth指向boxa 但是this指向的是derviedboxa，解析：
    // 因为derviedboxa类型是 DerivedBoxA 而boxa上没没有类型DerivedBoxA包含的参数othCont，所以报错
    return oth.cont === this.cont // 还没到这一步
  }
}
class DerivedBoxA extends BoxA{
  othCont: string = '' 
}
const boxa = new BoxA()
const derviedboxa = new DerivedBoxA()
// derviedboxa.sameAs(boxa) // error // 类型“BoxA”的参数不能赋给类型“DerivedBoxA”的参数。 //   类型 "BoxA" 中缺少属性 "othCont"，但类型 "DerivedBoxA" 中需要该属性。





class FileSys{
  isFile(): this is FileRep {
    return this instanceof FileRep
  }
  isDirectory(): this is Directory{
    return this instanceof Directory
  }
  isNetworked(): this is Networked & this{
    return this.networked
  }
  constructor(public path: string, private networked: boolean){

  }
}
class FileRep extends FileSys{
  constructor(path: string, public content: string){
    super(path, false)
  }
}
class Directory extends FileSys{
  children: FileSys[]
  constructor(path: string, public content: string){
    super(path, false)
    this.children = []
  }
}
class Networked{
  host: string = ""
}

const fso: FileSys = new FileRep('/document/test.html', '<html>')
if(fso.isFile()){
  console.log(fso.content);
}else if(fso.isDirectory()){
  console.log(fso.children);
}else if(fso.isNetworked()){
  console.log(fso.host);
}


class Params{
  constructor(public x: number){

  }
}
const p = new Params(1)
console.log(p.x);


const someClass = class<Type> { // 匿名类
  cont: Type
  constructor(val: Type){
    this.cont = val
  }
}
const someClassA = new someClass('hello')




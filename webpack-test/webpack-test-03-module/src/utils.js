// 这个文件 作为一个工具类，如果需要使用 一般方法需要手动import
// 但是比较麻烦，配置webpack可以让它暴露在全局
// 需要使用 exports-loader
// 这边就不用export 可以直接导入 
// 什么时候使用呢？自己写的代码一般没用，因为可以手动做导出，但时如果代码时三方的，且三方没有写eport 就可以使用这个来帮它导出

const PublicServer = 'http://wwww.a.com'

const Constant = {
  size: 100
}

const Utils = {
  isNum: (val)=>{
    return typeof val === 'number' && !Number.isNaN(val)
  },
  parse: (str)=>{
    try{
      return JSON.parse(str)
    }catch(e){
      console.error(e, 'parse error: ', str);
    }
  }
}
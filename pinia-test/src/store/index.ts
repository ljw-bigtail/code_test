// 1. 定义状态容器和状态
// 2. 修改容器中的state
// 3. 仓库中的action的使用

import {defineStore} from 'pinia'
import {goodsStore} from './goods'

export const mainStore = defineStore('main', {
  state: ()=>{
    return {
      desc: 'hello world.',
      count: 0,
      phone: 18612348899,
    }
  },
  getters: { // 有缓存 值不改变就直接返回值
    // phoneFormat(state){
    //   console.log('getters !');
    //   return state.phone.toString().replace(/^(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    // },
    phoneFormat():String{
      console.log('getters !');
      return this.phone.toString().replace(/^(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    }
  },
  actions: {
    changeCount(num: number){
      this.count+=num
    },
    getGoods(){
      const goods = goodsStore()
      return `商品ID：${goods.id};商品名称：${goods.name};加购数量：${goods.qty}。`
    }
  },
})
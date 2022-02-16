import {defineStore} from 'pinia'

export const goodsStore = defineStore('goods', {
  state: ()=>{
    return {
      id: '123123',
      name: '商品名称',
      qty: 0,
    }
  },
  getters: { // 有缓存 值不改变就直接返回值
    // phoneFormat(state){
    //   console.log('getters !');
    //   return state.phone.toString().replace(/^(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    // },
    phoneFormat():Number{
      console.log('getters !');
      return parseInt(this.id)
    }
  },
  actions: {
    changeCount(num: number){
      this.qty += num
    }
  },
})
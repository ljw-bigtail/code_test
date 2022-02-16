<template>
  <div>
    <button @click="handleClick1">add1</button>
    <button @click="handleClick2">add2</button>
    <button @click="handleClick3">add3</button>
    <button @click="handleClick4">add4</button>
    <br>
    <button @click="changePhone">changePhone</button>
    <br>
    <button @click="handleClick5">getGoods</button>
  </div>
</template>

<script lang="ts" setup>
import {mainStore} from '../store/index'
const store = mainStore()

store.$subscribe((mutations, state)=>{
  console.log(mutations, state, state.count);
})

store.$onAction(({name, store, args, after, onError})=>{
  console.log(name, store, args, after, onError, 'action');
})

const handleClick1 = function(){
  store.count++
  store.desc = store.desc == 'hello world.' ? 'patch change' : 'hello world.'
}

// 优点 批量操作性能比1强 
// 官方描述：Useful when mutating objects like Sets or arrays and applying an object patch isn't practical, e.g. appending to an array.
// https://pinia.vuejs.org/api/interfaces/pinia._StoreWithState.html#patch
const handleClick2 = function(){
  store.$patch({
    count: store.count + 2,
    desc: store.desc == 'hello world.' ? 'patch change' : 'hello world.',
  })
}

// 优点 适合处理复杂业务逻辑
const handleClick3 = function(){
  store.$patch((state)=>{
    state.count += 3
    state.desc = store.desc == 'hello world.' ? 'patch change' : 'hello world.'
  })
}

// action调用方法 适合有公共数据处理的情况
const handleClick4 = function(){
  store.changeCount(4)
}

const handleClick5 = function(){
  const str = store.getGoods()
  console.log(str);
  
}



const changePhone = function(){
  store.phone = 18633769908
}
</script>

<style>

</style>
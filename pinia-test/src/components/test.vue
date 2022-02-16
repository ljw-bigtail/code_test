<template>
<div>
  <div>{{store.desc}}</div>
  <div>{{store.count}}</div>
  <component :is="store.count > 3 ? bar : barEmpty"></component>
  <div>{{desc}}</div>
  <div>{{count}}</div>
  <br>
  <br>
  <div>{{store.phone}}</div>
  <div>{{store.phoneFormat}}</div>
  <br>
  <div>{{phone}}</div>
  <div>{{phoneFormat}}</div>
</div>
</template>

<script lang="ts" setup>
import {mainStore} from '../store/index'
import bar from './bar.vue'
import barEmpty from './bar-empty.vue'

import {storeToRefs} from 'pinia' // 解构赋值时使用

const store = mainStore()
const {desc, count, phone, phoneFormat} = store
// const {desc, count, phone, phoneFormat} = storeToRefs(store)

</script>

<style>

</style>
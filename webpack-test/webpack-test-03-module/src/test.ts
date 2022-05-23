const age: number = 18

console.log(age, 'age');

import _ from 'lodash'
// 文件“/Users/leo/Desktop/repo/test/webpack-test/webpack-test-03-module/node_modules/lodash/lodash.js”不是模块。
// 因为缺少 lodash 对应的 ts文件 所以需要引入 npm i @types/lodash --save-dev
// 其他插件也有对应的包 搜索地址 https://www.typescriptlang.org/dt/search
console.log(_.join([1,2,4,'dscg'], '-'));

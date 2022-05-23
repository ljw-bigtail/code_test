console.log(2);

import _ from 'lodash' // 会把loadsh打包到app2.js中（根据entry配置 app2.js打包到 mian.js里了）
// 解决方法 需要使用dependOn来使用拆分后到lodash.js文件

console.log(_, '_');
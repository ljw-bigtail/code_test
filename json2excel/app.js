const fs = require('fs')
const xlsx = require('node-xlsx')

const json = require('./1680170767374.json')

const json_data = json.data.map(e=>{
  return [e.group, [...e.tags].join(), e.href, e.img, e.name, e.subtitle, (e.desc ?? '').replace(/\n/, '').trim()]
})

console.log(json_data);
// {
//   group: 'AI视频工具',
//   tags: [Array],
//   href: 'https://elai.io/',
//   img: 'https://ai-bot.cn/wp-content/uploads/2023/03/elai.io-icon.png',
//   name: 'Elai.io',
//   subtitle: 'AI文本到视频生成工具',
//   desc: '\n                            AI文本到视频生成工具                    '
// },

const data = [
  //    每一个对象就是一个表格页
  {
    //    name 属性就是表格页的名称
    name: '表1',
    //    data 就是表格页内的数据
    data: [
      [ '分组', '标签', '链接', '站点Icon', '站点名称', '站点副标题', '站点详情页' ], // 以这一行为表头
      ...json_data
    ]
  }
]

// console.log(data[0].data);

// 利用 xlsx 生成表格流文件
const workboot = xlsx.build(data)

// 把生成好的内容写入一个文件
fs.writeFileSync('./out/test.xlsx', workboot) 
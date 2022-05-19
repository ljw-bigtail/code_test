// 创建一个简易的服务，与项目代码无关，作为测试webpack反向代理功能用
const server = require('http')

const app = server.createServer((req, res)=>{
  if(req.url == '/api/hello'){
    res.end('hello node')
  }
})

app.listen(9000, 'localhost', ()=>{
  console.log('localhost: 9000 is open');
})
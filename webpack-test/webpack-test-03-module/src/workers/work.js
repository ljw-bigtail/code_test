// 监听主线程发来的参数
self.onmessage = (message) => {
  // 给主线程返回参数
  self.postMessage({
    answer: 100
  })
}
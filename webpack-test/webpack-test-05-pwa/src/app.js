console.log("Hello aaa!");

// chrome 手动清除 service worker
// chrome://serviceworker-internals/
// 找到对应的端口号或者服务信息 然后 unregister
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register("/service-worker.js")
      .then(registration => {
        console.log('service worker注册成功', registration);

      })
      .catch(registrationError => {
        console.log('service worker注册失败', registrationError);

      })
  })
}
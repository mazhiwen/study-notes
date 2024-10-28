# Service worker


Service Worker是渐进式web应用（pwa）的核心技术。

通过注册之后，可以独立于浏览器在后台运行，控制我们的一个或者多个页面。如果我们的页面在多个窗口中打开，Service Worker不会重复创建。

Service Worker是客户端和服务端的代理层，客户端向服务器发送的请求，都可以被Service Worker拦截，并且可以修改请求，返回响应。

## 特点

- 离线

旨在创建有效的离线体验

- 独立于主线程的新线程

Service worker运行在worker上下文，因此它不能访问DOM。相对于驱动应用的主JavaScript线程，它运行在其他线程中，所以不会造成阻塞。

它设计为完全异步，同步API（如XHR和localStorage）不能在service worker中使用。

- 需要https环境


## 代码实现

```js
window.onload=function(){
    if('serviceworker' in navigator){
        navigator.serviceWorker.register('./sw.js').then()
    }
}

//se.js

self.addEventListner('install',e =>{


    //...跳过等待，直接进入activate
    e.skipWaiting();

})


self.addEventListner('install',e =>{


    e.waitUntil(self.clients.claim()) //初始注册时，立即获取控制权

})
```

## 生命周期

install: 注册安装时触发，缓存资源。 sw.js变更时，会触发

activate：serviceworker激活时触发

fetch：接收到所有网络请求



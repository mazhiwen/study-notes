# Service worker

<https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API>

<https://zhuanlan.zhihu.com/p/20040372>

<https://juejin.cn/post/6844903972759666701>

Service Worker是渐进式web应用（pwa）的核心技术。

通过注册之后，可以独立于浏览器在后台运行，控制我们的一个或者多个页面。如果我们的页面在多个窗口中打开，Service Worker不会重复创建。

Service Worker是客户端和服务端的代理层，客户端向服务器发送的请求，都可以被Service Worker拦截，并且可以修改请求，返回响应。

## 特点

### 离线

旨在创建有效的离线体验

### 独立于主线程的新线程

Service worker运行在worker上下文，因此它不能访问DOM。相对于驱动应用的主JavaScript线程，它运行在其他线程中，所以不会造成阻塞。

它设计为完全异步，同步API（如XHR和localStorage）不能在service worker中使用。

### 需要https环境

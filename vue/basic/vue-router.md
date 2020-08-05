# vue-router

***

<https://juejin.im/post/5b5697675188251b11097464>

<https://github.com/ljianshu/Blog/issues/39>

## 概念

SPA(single page application):单一页面应用程序，只有一个完整的页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。

单页面应用(SPA)的核心之一是: 更新视图而不重新请求页面

vue-router在实现单页面前端路由时，提供了两种方式：Hash模式和History模式

## API

### base构建选项

### router-link

要注意，当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active

## history 模式

### history API

history模式需要后台配置

### 配置步骤

1. webpack devconfig

webpackdevserver.historyApiFallback:

本地环境：浏览器访问local/base/routes -> local请求到本地web服务根目录 -> historyApiFallback把所有正常资源请求 都转发到 options.index,也即是静态资源index.html的真正位置

实际静态资源目录在 local/base/虚拟内存路径下

最终效果: local/base/指向编译生成的contentBase,下有index以及js

> 此处base理解为是实际物理路径。区别与转发代理

```js
devServer:{
  historyApiFallback: {
    index: '/base/',
  },
}
```

2. webpack config

```js
output: {
  publicPath: '/base/',
},
```

3. router实例

```js
const router = new VueRouter({
  base: '/base/'
  mode: 'history',
});
```

4. 生产环境nginx配置

```
location xxx/ {
  try_files $uri $uri/ /index.html;
}
```

## hash模式

URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送，对后端完全没有影响，改变 hash 不会重新加载页面；

hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；

可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；

window.onhashchange: 事件监听 hash 值的变化

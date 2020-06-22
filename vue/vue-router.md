# vue-router

***

<https://juejin.im/post/5b5697675188251b11097464>

## base构建选项

## router-link

要注意，当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active

## history 模式

1. webpack devconfig

historyApiFallback:

本地环境：浏览器访问local/base/routes -> local请求到本地web服务根目录 -> historyApiFallback把所有正常资源请求 都转发到 options.index,也即是静态资源index.html的真正位置

实际静态资源目录在 contentbase 。请求映射为local/base/ 指向 实际静态资源路径contentbase

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

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
- hashchange 事件监听 hash 值的变化

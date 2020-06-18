# vue-router

***

<https://juejin.im/post/5b5697675188251b11097464>

## base构建选项

## router-link

要注意，当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active

## history 模式

1. webpack devconfig

```js
devServer:{
  historyApiFallback: true,
}
output: {
  publicPath: env ? '/' : '/base/',
},
```

2. router实例

```js
const router = new VueRouter({
  base: '/base/'
  mode: 'history',
});
```

3. 生产环境nginx配置

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

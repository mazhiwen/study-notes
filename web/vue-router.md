# vue-router

***

<https://juejin.im/post/5b5697675188251b11097464>

<https://github.com/ljianshu/Blog/issues/39>

## 概念

SPA(single page application):单一页面应用程序，只有一个完整的页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。

单页面应用(SPA)的核心之一是: 更新视图而不重新请求页面

vue-router在实现单页面前端路由时，提供了两种方式：Hash模式和History模式

## base构建选项

## router-link

要注意，当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active

## 全局前置守卫: beforeEach

全局的钩子函数 beforeEach 和 afterEach

beforeEach 有三个参数，to 代表要进入的路由对象，from 代表离开的路由对象。next 是一个必须要执行的函数，如果不传参数，那就执行下一个钩子函数，如果传入 false，则终止跳转，如果传入一个路径，则导航到对应的路由，如果传入 error ，则导航终止，error 传入错误的监听函数。

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

## 路由独享的守卫: beforeEnter

单个路由独享的钩子函数 beforeEnter，它是在路由配置上直接进行定义的。

这些守卫与全局前置守卫的方法参数是一样的。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

## 视图组件内的守卫 : beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

组件内的导航钩子主要有这三种：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。

它们是直接在路由对应的视图组件内部直接进行定义的。

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

## 完整的导航解析流程

```
导航被触发。
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫 (2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
```

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

## $route $router

$route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数。

而 $router 是“路由实例”对象包括了路由的跳转方法，钩子函数等。

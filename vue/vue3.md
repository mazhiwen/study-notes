# vue3

[快速理解vue3 - 官方](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)

[Vue3发布半年我不学，摸鱼爽歪歪，哎~就是玩儿](https://juejin.cn/post/6955129410705948702)

[Vue3源码系列](https://vue3js.cn/start/)

[Vue3.0 新特性以及使用经验总结](https://juejin.cn/post/6940454764421316644)

<https://juejin.cn/post/6844904039612678152>

<https://juejin.cn/post/6844904001813610510>

<https://juejin.cn/post/6896438269291347976>

做了一下特性变化：

## Object.defineProperty 替换为 Proxy

[实现双向绑定Proxy比defineproperty优劣如何?](https://juejin.cn/post/6844903601416978439)

Object.defineProperty => Proxy

简单对比一下Object.defineProperty 与 Proxy

1. Object.defineProperty只能劫持对象的属性， 而 Proxy 是直接代理对象

由于Object.defineProperty只能劫持对象属性，需要遍历对象的每一个属性，如果属性值也是对象，就需要递归进行深度遍历。但是 Proxy 直接代理对象， 不需要遍历操作

2. Object.defineProperty对新增属性需要手动进行Observe

因为Object.defineProperty劫持的是对象的属性，所以新增属性时，需要重新遍历对象， 对其新增属性再次使用Object.defineProperty进行劫持。也就是 Vue2.x 中给数组和对象新增属性时，需要使用$set才能保证新增的属性也是响应式的, $set内部也是通过调用Object.defineProperty去处理的。

## 重构了虚拟DOM

## Composition API

[官方文档](https://vue-composition-api-rfc.netlify.app/zh/api.html#setup)

OptionApi => Composition API

包括以下：

## toRefs ref  reactive

Vue3.x 可以使用reactive和ref来进行数据定义

reactive：接收一个普通对象然后返回该普通对象的响应式代理,不接受基本类型。ref可接受基本类型

toRefs： 把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。

## watch watchEffect

watch 函数用来侦听特定的数据源，并在回调函数中执行副作用。默认情况是惰性的，也就是说仅在侦听的源数据变更时才执行回调。

## 生命周期钩子

```
Vue2                Vue3

beforeCreate       setup(替代)
created           setup(替代)
beforeMount       onBeforeMount
mounted          onMounted
beforeUpdate     onBeforeUpdate
updated          onUpdated
beforeDestroy    onBeforeUnmount
destroyed       onUnmounted
errorCaptured   onErrorCaptured
```

## 自定义 Hooks

把vue2的data computed method 通过 compositionAPI 封装为一个return 对应vue2属性的 function 也即是hooks。

在组件中导入hooks即可。

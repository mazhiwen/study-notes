# vue3

[快速理解vue3 - 官方](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)

[Vue3发布半年我不学，摸鱼爽歪歪，哎~就是玩儿](https://juejin.cn/post/6955129410705948702)

[Vue3源码系列](https://vue3js.cn/start/)

[Vue3.0 新特性以及使用经验总结](https://juejin.cn/post/6940454764421316644)

<https://juejin.cn/post/6844904039612678152>

<https://juejin.cn/post/6844904001813610510>

<https://juejin.cn/post/6896438269291347976>

做了一下特性变化：

## Object.defineProperty => Proxy

Object.defineProperty => Proxy

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

### createApp

### onMounted

### computed

### toRef

### nextTick

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

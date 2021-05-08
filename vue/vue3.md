# vue3

<https://juejin.cn/post/6844904039612678152>

<https://juejin.cn/post/6844904001813610510>

<https://juejin.cn/post/6896438269291347976>

[Vue3发布半年我不学，摸鱼爽歪歪，哎~就是玩儿](https://juejin.cn/post/6955129410705948702)

## Object.defineProperty => Proxy

Object.defineProperty => Proxy

## 重构了虚拟DOM

## Composition API

[官方文档](https://vue-composition-api-rfc.netlify.app/zh/api.html#setup)

OptionApi => Composition API

### createApp

### onMounted

### computed

### watch

### watchEffect

### reactive

接收一个普通对象然后返回该普通对象的响应式代理

### toRefs

把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。

### ref

### toRef

### nextTick

## 生命周期

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

# vue3

[快速理解vue3 - 官方](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)

[Vue3发布半年我不学，摸鱼爽歪歪，哎~就是玩儿](https://juejin.cn/post/6955129410705948702)

[Vue3源码系列](https://vue3js.cn/start/)

[Vue3.0 新特性以及使用经验总结](https://juejin.cn/post/6940454764421316644)

<https://juejin.cn/post/6844904039612678152>

<https://juejin.cn/post/6844904001813610510>

<https://juejin.cn/post/6896438269291347976>

做了一下特性变化：

## Proxy

Object.defineProperty 替换为 Proxy

[实现双向绑定Proxy比defineproperty优劣如何?](https://juejin.cn/post/6844903601416978439)

Object.defineProperty => Proxy

简单对比一下Object.defineProperty 与 Proxy

1. Object.defineProperty只能劫持对象的属性， 而 Proxy 是直接代理对象

由于Object.defineProperty只能劫持对象属性，需要遍历对象的每一个属性，如果属性值也是对象，就需要递归进行深度遍历。但是 Proxy 直接代理对象， 不需要遍历操作

2. Object.defineProperty 对新增属性需要手动进行Observe

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

hooks:

1. 通过 compositionAPI 封装为一个 把vue2的data computed method 这些属性 return 出来的function。

2. 在组件中导入这个 hooks function 即可。在setup中return 这些属性

```html
<template>
  <p>count: {{ count }}</p>
  <p>倍数： {{ multiple }}</p>
  <div>
    <button @click="increase()">加1</button>
    <button @click="decrease()">减一</button>
  </div>
</template>

<script lang="ts">
import useCount from "../hooks/useCount";
 setup() {
    const { count, multiple, increase, decrease } = useCount(10);
        return {
            count,
            multiple,
            increase,
            decrease,
        };
    },
</script>
```

## Teleport

Teleport: 即希望继续在组件内部使用Dialog, 又希望渲染的 DOM 结构不嵌套在组件的 DOM 中

我们可以用`<Teleport>`包裹 需要独立DOM结构的 如`Dialog`, 此时就建立了一个传送门，可以将Dialog渲染的内容传送到任何指定的地方

```html
<!-- 容器 -->
<body>
  <div id="app"></div>
  <div id="dialogDom"></div>
</body>
```

```html
<!-- Dialog.vue -->
<template>
  <teleport to="#dialogDom">
    <div class="dialog">
      <div class="dialog_wrapper">
        <div class="dialog_header" v-if="title">
          <slot name="header">
            <span>{{ title }}</span>
          </slot>
        </div>
      </div>
      <div class="dialog_content">
        <slot></slot>
      </div>
      <div class="dialog_footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </teleport>
</template>
```

正常引入Dialog组件

## Suspense

Suspense 只是一个带插槽的组件，只是它的插槽指定了default 和 fallback 两种状态。

```html
 <Suspense>
  <template #default>
      <async-component></async-component>
  </template>
  <template #fallback>
      <div>
          Loading...
      </div>
  </template>
</Suspense>
```

## Fragment

但是在 Vue3.x 中，可以直接写多个根节点

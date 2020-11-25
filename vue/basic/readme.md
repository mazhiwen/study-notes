
# 关于vue的文档

可参考:<https://juejin.im/post/5d9d386fe51d45784d3f8637>

## 目录

- [VueCli](#VueCli)
- [webpack,懒加载,代码分离](#webpack,懒加载,代码分离)
- [el](#el)
- [组件通信](#组件通信)
- [props](#props)
- [filters](#filters)
- [组合](#组合)
- [样式](#样式)
- [slot](#slot)
- [模版语法](#模版语法)
- [组件注册](#组件注册)
- [渲染函数,render函数](#渲染函数,render函数)
- [函数式组件](#函数式组件)
- [虚拟DOM](#虚拟DOM)
- [keep-alive](#keep-alive)
- [异步组件](#异步组件)
- [$root](#$root)
- [.sync](#.sync)
- [递归组件](#递归组件)
- [SSR-Vue](#SSR-Vue)
- [动画](#动画)
- [事件](#事件)
- [其他技巧知识](#其他技巧知识)

***

## VueCli

<https://cli.vuejs.org/zh/guide/>

## webpack,懒加载,代码分离

<https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/>

## el

this.$el 指当前挂载的组件，mounted才有，created没有

## 组件通信

<https://segmentfault.com/a/1190000019208626?utm_source=tag-newest>

1. vuex
全局

2. v-model
父子组件
组件使用v-model

```javascript
Vue.component('base-checkbox', {
  model: {
    // 默认prop是value 默认event是input
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
<base-checkbox
  v-model="lovingVue"
  @change=""
>
</base-checkbox>
```

3. $parent $children $root  
较高耦合，一般不推荐

4. provide inject  

适合大型独立性组件，组件内需求耦合性较高

可以传递给子孙 深层次

基本是不可响应式的

核心用法是调用祖父等级别的方法

适合未知深层次

```js
//  provide 选项允许我们指定我们想要提供给后代组件的数据/方法。在这个例子中，就是 <google-map> 内部的 getMap 方法：

provide: function () {
  return {
    getMap: this.getMap
  }
}

// 然后在任何后代组件里，我们都可以使用 inject 选项来接收指定的我们想要添加在这个实例上的属性：
inject: ['getMap']


示例
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
  // 另外写法
  provide:function(){
    return {
      setFun:this.setFun
    }
  }
}


// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}

```

5. props  $emit  @on  
是响应式的,父子传递prop和event

6. $attrs和$listeners  
适用于第三方复杂组件构建，a -> b -> c 深层次传递prop 和 event  
简单来说：$attrs与$listeners 是两个对象，$attrs 里存放的是父组件中绑定的非 Props 属性，$listeners里存放的是父组件中绑定的非原生事件。

```javascript
a:
<B :messagec="messagec" v-on:getCData="getCData"></B>
getCData(val){
  console.log("这是来自C组件的数据："+val)
}
b:
<C v-bind="$attrs" v-on="$listeners"></C>
// <!-- C组件中能直接触发getCData的原因在于 B组件调用C组件时 使用 v-on 绑定了$listeners 属性 -->
// <!-- 通过v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的） -->
c:
v-model="$attrs.messagec" @input="passCData($attrs.messagec)"
passCData(){
  this.$emit('getCData',val)
}
```

## props

```js
props:{
  // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
  propA: Number,
  // 多个可能的类型
  propB: [String, Number],
  // 必填的字符串
  propC: {
    type: String,
    required: true
  },
  // 带有默认值的数字
  propD: {
    type: Number,
    default: 100
  },
  // 带有默认值的对象
  propE: {
    type: Object,
    // 对象或数组默认值必须从一个工厂函数获取
    default: function () {
      return { message: 'hello' }
    }
  },
  // 自定义验证函数
  propF: {
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['success', 'warning', 'danger'].indexOf(value) !== -1
    }
  }
}
```

## filters

```js
// 局部注册
filters: {
  stampToYYMMDD: (value)=> {
    // 处理逻辑
  }
}

// 全局自动注册
import * as custom from './common/filters/custom'
Object.keys(custom).forEach(key => Vue.filter(key, custom[key]))

```

## 组合

### mixin

minxin适合有公用 类似react hoc，可以抽离template 和js 的还是抽离成组件比较合适

如果你要在 mixin 中定义生命周期 hook，那么它在执行时将优先于组件自己的 hook 。

## 样式

vue 有时候局部样式组件 有时候全局控制

class和style绑定:

```html
<!-- 对象语法 -->
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
data: {
  isActive: true,
  hasError: false
}
<!-- 数组语法 -->
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

## slot

v2.6.0 以后引入v-slot
v3 以后会 slot 废弃

### slot-scope  

- 新语法

```javascript
// 带slot的parent组件
<div>
  <slot v-for="item in list" v-bind:rowdata="item">
  </slot>
</div>
// 使用 调用
<parent :data="list">
// default是slot 具名可以是其他
    <template v-slot:default="slotProps">
      <child :data="slotProps.rowData">

      </child>
    </template>
  </parent>
```

### 作用域

slot 的作用域：
父组件的作用域 和 slot的作用域是独立的。

### 语法用法

- slot语法

```jsx
<parent>
  <slot name="hh"></slot>
</parent>

// 新语法
// v-slot 只能添加在一个 <template>
<parent>
  <template v-slot:hh>
    <div>
    </div>
  </template>
</parent>

```

## 模版语法

```html
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
</script>
```

### 缩写

v-bind:class --- :class
v-on:click --- @click

### 模版和渲染函数对比

```js

new Vue({
  el: '#app',
  data: {
    fruits: ['Apples', 'Oranges', 'Kiwi']
  },
  template:
      `<div>
         <h1>Fruit Basket</h1>
         <ol>
           <li v-for="fruit in fruits">{{ fruit }}</li>
         </ol>
      </div>`
});

new Vue({
  el: '#app',
  data: {
    fruits: ['Apples', 'Oranges', 'Kiwi']
  },
  render: function(createElement) {
    return createElement('div', [
      createElement('h1', 'Fruit Basket'),
      createElement('ol', this.fruits.map(function(fruit) {
        return createElement('li', fruit);
      }))
    ]);
  }
});

```

## 组件注册

### 全局注册

```js
Vue.component('anchored-heading', {
  // dom可以用template模版语法
  // 写法见上面模版语法
  template: '#anchored-heading-template',
  // 或者
  // 用render函数
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      // vue实例属性this
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

### 局部注册

```js
const mycomponent = {
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (h, context) {
    return (
      <div>23232</div>
    )
  }
}

export default {
  components:{
    mycomponent
  },
}
```

## 渲染函数,render函数

### render

```js
render: function (createElement) {
  return createElement(
  
  )
}
```

render没有提供v-model 对应的

### createElement

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  // 一个与模板中属性对应的数据对象。可选。
  {
    // (详情见下一节)
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

## 函数式组件

它无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)。

```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})

// 模版语法
<template functional>
  <div>{{ props.foo }}</div>
</template>
```

### 缓存和动画

## 虚拟DOM

虚拟节点（VNode）表示 DOM 树中的节点。当需要操纵时，可以在虚拟 DOM的 内存中执行计算和操作，而不是在真实 DOM 上进行操纵。这自然会更快，并且允许虚拟 DOM 算法计算出最优化的方式来更新实际 DOM 结构。

一旦计算出，就将其应用于实际的 DOM 树，这就提高了性能，这就是为什么基于虚拟 DOM 的框架（例如 Vue 和 React）如此突出的原因。

## 异步组件

```js
//写法一
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})

//写法二
//推荐的做法是将异步组件和 webpack 的 code-splitting 功能一起配合使用：
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})

//写法三 : webpack 2 和 ES2015 语法
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
//局部注册
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})

```

## $root

```js
// 父组件
mounted(){
  console.log(this.$root) //获取根实例,最后所有组件都是挂载到根实例上
  console.log(this.$root.$children[0]) //获取根实例的一级子组件
  console.log(this.$root.$children[0].$children[0]) //获取根实例的二级子组件
}
```

## .sync

```
// 父组件
<home :title.sync="title" />
//编译时会被扩展为
<home :title="title"  @update:title="val => title = val"/>

// 子组件
// 所以子组件可以通过$emit 触发 update 方法改变
mounted(){
  this.$emit("update:title", '这是新的title')
}
```

## 递归组件

```js
// 递归组件: 组件在它的模板内可以递归的调用自己，只要给组件设置name组件就可以了。
// 设置那么House在组件模板内就可以递归使用了,不过需要注意的是，
// 必须给一个条件来限制数量，否则会抛出错误: max stack size exceeded
// 组件递归用来开发一些具体有未知层级关系的独立组件。比如：
// 联级选择器和树形控件

<template>
  <div v-for="(item,index) in treeArr">
      子组件，当前层级值： {{index}} <br/>
      <!-- 递归调用自身, 后台判断是否不存在改值 -->
      <tree :item="item.arr" v-if="item.flag"></tree>
  </div>
</template>
<script>
export default {
  // 必须定义name，组件内部才能递归调用
  name: 'tree',
  data(){
    return {}
  },
  // 接收外部传入的值
  props: {
     item: {
      type:Array,
      default: ()=>[]
    }
  }
}
</script>
```

## SSR-Vue

<https://juejin.im/post/5cb6c36e6fb9a068af37aa35>

## 动画

在进入/离开的过渡中，会有 6 个 class 切换。

v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

```css
/* 隐藏样式 */
.name-enter,.name-leave-to {
  
}
/* 中间过度 */
.name-enter-active, .name-leave-active{
  transiton: all .5s;
}
/* 显示样式 */
.name-enter-to,.name-leave{

}
```

## 事件

```js
.stop:阻止冒泡
.prevent:阻止默认行为
.self:仅绑定元素自身触发
.once: 2.1.4 新增,只触发一次
.passive: 2.3.0 新增,滚动事件的默认行为 (即滚动行为) 将会立即触发,不能和.prevent 一起使用
```

## 其他技巧知识

### img加载失败

```html
// page 代码
<img :src="imgUrl" @error="handleError" alt="">
<script>
export default{
  data(){
    return{
      imgUrl:''
    }
  },
  methods:{
    handleError(e){
      e.target.src=reqiure('图片路径') //当然如果项目配置了transformToRequire,参考上面 27.2
    }
  }
}
</script>
```

## nextTick 原理

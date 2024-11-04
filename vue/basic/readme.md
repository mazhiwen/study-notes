
# 关于vue的文档


## VueCli


## webpack,懒加载,代码分离



## this.$el

this.$el 指当前挂载的组件，mounted才有，created没有

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

## mixins

当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”：

钩子合并( 生命周期 )：同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。

数据对象合并( data )：数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。

选项合并：值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

Vue.mixin 用于全局混入，会影响到每个组件实例。

```js
var mixin = {
  created: function () { console.log(1) }
}
var vm = new Vue({
  created: function () { console.log(2) },
  mixins: [mixin]
})
// => 1
// => 2
```

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

函数式组件也不会有状态，不会有响应式数据，生命周期钩子函数这些东西。也没有实例 (没有 this 上下文)。

一般用于无状态的，性能提升。 例如，大量的迭代纯文本展示

可以看作一般组件的部分无状态展示抽离为函数式组件。你可以把它当成把普通组件模板中的一部分 DOM 剥离出来，通过函数的方式渲染出来，是一种在 DOM 层面的复用。

实现一 ：js:

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
```

实现二 ：模版语法实现:

```js
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

## 事件修饰符

```js
.stop: 阻止冒泡

.prevent: 阻止默认行为。提交事件不再重载页面

.self: 仅绑定元素自身触发，子元素不会

.once: 2.1.4 新增,只触发一次

.passive: 2.3.0 新增,滚动事件的默认行为 (即滚动行为) 将会立即触发,不能和.prevent 一起使用
```

## 表单修饰符

.lazy：在文本框失去焦点时才会渲染

.number：将文本框中所输入的内容转换为number类型

.trim：可以自动过滤输入首尾的空格

## img加载失败

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

## vue中的key

第一种情况是 v-if 中使用 key ： 由于 Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。因此当我们使用 v-if 来实现元素切换的时候，如果切换前后含有相同类型的元素，那么这个元素就会被复用。如果是相同的 input 元素，那么切换前后用户的输入不会被清除掉，这样是不符合需求的。因此我们可以通过使用 key 来唯一的标识一个元素，这个情况下，使用 key 的元素不会被复用。这个时候 key 的作用是用来标识一个独立的元素。

第二种情况是 v-for 中使用 key ：用 v-for 更新已渲染过的元素列表时，它默认使用“就地复用”的策略。如果数据项的顺序发生了改变，Vue 不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处的每个元素。因此通过为每个列表项提供一个 key 值，来以便 Vue 跟踪元素的身份，从而高效的实现复用。这个时候 key 的作用是为了高效的更新渲染虚拟 DOM。

## keep-alive

如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件。

## v-show 和 v-if

具体见 vue优化

## async

```html
<!--parent组件-->
<child :propA.async="parentPropA">

</child>

<script>
export default {
  data() {
    return {
      parentPropA
    }
  }
}
</script>
```

```html
<!--child组件-->
<div>

</div>

<script>
export default {
  props:{
    propA,
  },
  data() {
    return {
      parentPropA
    }
  },
  methods:{
    updatePropA(){
      this.$emit('update:propA', 'propA')
    }
  }
}
</script>
```

## v-model

```js
// 子组件
Vue.component('base-checkbox', {
  model: {
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
```

```html
<!-- 父组件 -->
<base-checkbox v-model="lovingVue"></base-checkbox>
```

父组件 data的lovingVue  通过子组件props的checked【子组件model可定义字段】 传递给子组件

子组件 emit:change【model可定义】, 可以更新 父组件的data的lovingVue



## watch 属性值

```js
watch: {
  'obj.a': function() {
    
  }
}
```

## watch ： immediate和deep

```js
data() {
  return {
    inpValObj: {
      a: 1,
    }
  }
},

watch:{
  inpValObj:{
    // handler: 'getList', // 另外一种写法
    handler(newVal,oldVal){
      console.log(newVal)
      console.log(oldVal)
    },
    deep:true,
    immediate: true
  }
}
//此时发现oldVal和 newVal 值一样; 因为它们索引同一个对象/数组,Vue 不会保留修改之前值的副本; 所以深度监听虽然可以监听到对象的变化,但是无法监听到具体对象里面那个属性的变化
```

- deep

设置为 true 用于监听对象内部值的变化。以上代码我们修改了 obj 对象中 a 属性的值，我们可以触发其 watch 中的 handler 回调输出新的对象，而如果不加 deep: true，我们只能监听 obj 的改变，并不会触发回调

- immediate

设置为 true 表示创建组件时 立即以表达式的当前值 执行一次

## watch 和computed

watch：监测的是属性值， 只要属性值发生变化，其都会触发执行回调函数来执行一系列操作。

computed：监测的是依赖值，依赖值不变的情况下其会直接读取缓存进行复用，变化的情况下才会重新计算。

计算属性不能执行异步任务，计算属性必须同步执行。也就是说计算属性不能向服务器请求或者执行异步任务。如果遇到异步任务，就交给侦听属性。

watch也可以检测computed属性。

computed 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问 computed 属性，才会计算新的值。而 watch 则是当数据发生变化便会调用执行函数。


## computed


官网： 对于任何复杂逻辑，你都应当使用计算属性。

## computed ： get和set

计算属性由两部分组成：get和set，分别用来获取计算属性和设置计算属性。默认只有get，如果需要set，要自己添加。另外set设置属性，并不是直接修改计算属性，而是修改它的依赖。

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      //this.fullName = newValue 这种写法会报错
      var names = newValue.split(' ')
      this.firstName = names[0]//对它的依赖进行赋值
      this.lastName = names[names.length - 1]
    }
  }
}
```

现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。

## computed 默认写法

默认是个函数

```js
data:{ //普通属性
  msg:'浪里行舟',
},
computed:{ //计算属性
  msg2:function(???this???){ //该函数必须有返回值，用来获取属性，称为get函数
    return '浪里行舟';
  },
  reverseMsg:function(){
  //可以包含逻辑处理操作，同时reverseMsg依赖于msg,一旦msg发生变化，reverseMsg也会跟着变化
    return this.msg.split(' ').reverse().join(' ');
 }
}
```

## computed vs method

computed 是可以缓存的，methods 不能缓存: 只要相关依赖没有改变，多次访问计算属性得到的值是之前缓存的计算结果，不会多次执行

计算属性也可以通过闭包来实现传参

```js
:data="closure(item, itemName, blablaParams)"

computed: {
 closure () {
   return function (a, b, c) {
        /** do something */
        return data
    }
 }
}
```

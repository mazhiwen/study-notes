
# 关于vue的文档

可参考:<https://juejin.im/post/5d9d386fe51d45784d3f8637>

## 目录

- [vue插件](#vue插件)
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
- [路由](#vue-router)
- [vue使用jsx](#vue使用jsx)
- [vuex](#vuex)
- [虚拟DOM](#虚拟DOM)
- [生命周期](#生命周期)
- [keep-alive](#keep-alive)
- [异步组件](#异步组件)
- [watch](#watch)
- [$root](#$root)
- [.sync](#.sync)
- [递归组件](#递归组件)
- [SSR-Vue](#SSR-Vue)
- [动画](#动画)
- [事件](#事件)
- [其他技巧知识](#其他技巧知识)

***

## vue插件

Vue 插件允许开发人员构建全局级别的功能并将其添加到 Vue。用于向程序添加可以全局访问的方法和属性、资源，选项，mixin 以及其他自定义 API

<https://www.imooc.com/article/19691>

<https://juejin.im/post/5d3eb28cf265da03e71acd15>

### extend

场景:vue 组件中有些需要将一些元素挂载到元素上,这个时候 extend 就起到作用了 是构造一个组件的语法器 写法:

```js
import DropMenu from './DropMenu.vue';
const DropMenuConstructor = Vue.extend(DropMenu);
```

```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{extendData}}</br>实例传入的数据为:{{propsExtend}}</p>',//template对应的标签最外层必须只有一个标签
  data: function () {
    return {
      extendData: '这是extend扩展的数据',
    }
  },
  props:['propsExtend']
})

// 创建的构造器可以挂载到元素上,也可以通过 components 或 Vue.component()注册使用
// 挂载到一个元素上。可以通过propsData传参.
new Profile({propsData:{propsExtend:'我是实例传入的数据'}}).$mount('#app-extend')

// 通过 components 或 Vue.component()注册
Vue.component('Profile',Profile)

```

### install,Vue.use

```js
var MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  // 2. 添加全局资源,第二个参数传一个值默认是update对应的值
  Vue.directive('click', {
    bind(el, binding, vnode, oldVnode) {
      //做绑定的准备工作,添加时间监听
      console.log('指令my-directive的bind执行啦');
    },
    inserted: function(el){
    //获取绑定的元素
    console.log('指令my-directive的inserted执行啦');
    },
    update: function(){
    //根据获得的新值执行对应的更新
    //对于初始值也会调用一次
    console.log('指令my-directive的update执行啦');
    },
    componentUpdated: function(){
    console.log('指令my-directive的componentUpdated执行啦');
    },
    unbind: function(){
    //做清理操作
    //比如移除bind时绑定的事件监听器
    console.log('指令my-directive的unbind执行啦');
    }
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      console.log('注入组件的created被调用啦');
      console.log('options的值为',options)
    }
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    console.log('实例方法myMethod被调用啦');
  }
}

//调用MyPlugin
Vue.use(MyPlugin,{someOption: true })

//3.挂载
new Vue({
  el: '#app'
});
```

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

## vue-router

<https://juejin.im/post/5b5697675188251b11097464>

### base构建选项

### router-link

要注意，当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active

### history 模式

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

### hash模式

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
- hashchange 事件监听 hash 值的变化

### 缓存和动画

## vue使用jsx

## vuex

### 语法

dispatch(actions(commit)) ->
commit(mutations(state))) -> view

```js

//////////// 声明 /////////////
const store = new Vuex.Store({

  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },

  //////////////////////////////getters
  //getters类似于 vuex state的计算属性
  getters: {
    // 根据state返回新的state
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    //Getter 也可以接受其他 getter 作为第二个参数：
    // 访问：this.$store.getters.doneTodosCount
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    // getter 返回一个函数，来实现给 getter 传参
    // store.getters.getTodoById(2)
    // -> { id: 2, text: '...', done: false }
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },

  //////////////////////////////mutations
  // Mutation 必须是同步函数
  mutations: {
    // 执行都可以用
    // store.commit({
    //   type: 'increment',
    //   amount: 10
    // })
    // 使用:store.commit('increment')
    increment (state) {
      // 变更状态
      state.count++
    },
    // store.commit('increment', 10)
    increment (state, n) {
      state.count += n
    }
  }

  //////////////////////////////Action
  // Action 类似于 mutation，不同在于：
  // Action 提交的是 mutation，而不是直接变更状态。
  actions: {
    //1. Action 可以包含任意异步操作。
    increment (context) {
      context.commit('increment')
    },
    increment ({ commit }) {
      commit('increment')
    },
    // 异步
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
    //使用: store.dispatch('increment')
    //2. 以载荷形式分发
    // store.dispatch('incrementAsync', {
    //   amount: 10
    // })
    // // 以对象形式分发
    // store.dispatch({
    //   type: 'incrementAsync',
    //   amount: 10
    // })
    //3. action可以写为promise
    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('someMutation')
          resolve()
        }, 1000)
      })
    },
    // promiseAction调用
    // store.dispatch('actionA').then(() => {
    // })
    //4. action内可以执行另外一个action
    //5. async await 用法
    async actionA ({ commit }) {
      commit('gotData', await getData())
    },
    async actionB ({ dispatch, commit }) {
      await dispatch('actionA') // 等待 actionA 完成
      commit('gotOtherData', await getOtherData())
    }
  }
})

//////////// 使用 /////////////
import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  // ...
  computed: {

    //////////////////////////////mapState
    ...mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    }),
    // mapState 或者当计算属性名称 = 子节点名称时 如下操作
    mapState([
      // 映射 this.count 为 store.state.count
      'count','countA'
    ]),

    //////////////////////////////mapGetters
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    ]),

  },
  methods:{

    //////////////////////////////mapMutations
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })

    //////////////////////////////mapActions
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}

//////////////////////////////Module
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const moduleB = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  },
  // action 中 { state, commit, rootState } = context
  // rootState是根节点状态
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB,
    //////带有命名空间的modules
    ccount: {
      // 开启命名空间
      namespaced: true
      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... }, // -> getters['account/isAdmin']
        // 在这个模块的 getter 中，`getters` 被局部化了
        // 你可以使用 getter 的第四个参数来调用 `rootGetters`
        someGetter (state, getters, rootState, rootGetters) {
          getters.someOtherGetter // -> 'foo/someOtherGetter'
          rootGetters.someOtherGetter // -> 'someOtherGetter'
        },
      },
      actions: {
        login () { ... }, // -> dispatch('account/login')
        //如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。
        // 若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
        // 在这个模块中， dispatch 和 commit 也被局部化了
        // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
        someAction ({ dispatch, commit, getters, rootGetters }) {
          getters.someGetter // -> 'foo/someGetter'
          rootGetters.someGetter // -> 'someGetter'
          dispatch('someOtherAction') // -> 'foo/someOtherAction'
          dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
          commit('someMutation') // -> 'foo/someMutation'
          commit('someMutation', null, { root: true }) // -> 'someMutation'
        },
        // 若需要在带命名空间的模块注册全局 action，你可添加 root: true，并将这个 action 的定义放在函数 handler 中。例如：
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },
      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... }, // -> getters['account/profile']
          }
        },
        // 进一步嵌套命名空间
        posts: {
          namespaced: true,
          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
// store.state.a // -> moduleA 的状态
// store.state.b // -> moduleB 的状态
// 模块的mutation getter方法，接收到的第一个参数是模块的局部state

///////////////vue 使用module
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
// 模块可以动态注册
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
// 之后就可以通过 store.state.myModule 和 store.state.nested.myModule 访问模块的状态。
```

### vuex同步localstorage

vuex-persistedstate

## 虚拟DOM

虚拟节点（VNode）表示 DOM 树中的节点。当需要操纵时，可以在虚拟 DOM的 内存中执行计算和操作，而不是在真实 DOM 上进行操纵。这自然会更快，并且允许虚拟 DOM 算法计算出最优化的方式来更新实际 DOM 结构。

一旦计算出，就将其应用于实际的 DOM 树，这就提高了性能，这就是为什么基于虚拟 DOM 的框架（例如 Vue 和 React）如此突出的原因。

## 生命周期

- 最适合从 API 调用中获取数据的生命周期hook：

尽管这取决于组件的用途及，但是创建的生命周期 hook 内通常非常适合放置 API 调用。这时可以使用组件的数据和响应性功能，但是该组件尚未渲染。

- updated hook：

在更新响应性数据并重新渲染虚拟 DOM 之后，将调用更新的 hook。它可以用于执行与 DOM 相关的操作，但是（默认情况下）不能保证子组件会被渲染，尽管也可以通过在更新函数中使用 this.$nextTick 来确保。

- keep-alive

keep-alive 元素缓存该组件并从那里获取它，而不是每次都重新渲染它。

### 顺序

beforeCreate:组件实例刚被创建，组件属性计算之前，如data属性等。

created：组件实例创建完成，属性已绑定，但DOM还未生成，$el属性还不存在

beforeMount: 模版编译/挂载之前

mounted: 模版编译/挂载之后

beforeUpdate: 组件更新之前

updated: 组件更新之后

activated: for keep-alive,组件被激活时调用

deactivated: for keep-alive,组件被移除时调用

beforeDestroy : 组件销毁前

destroyed: 组件销毁后

### 加载渲染过程

父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

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

## watch

```js
//立即执行
watch: {
  inpVal:{
    handler: 'getList',
    immediate: true
  }
}

//深度监听
watch:{
  inpValObj:{
    handler(newVal,oldVal){
      console.log(newVal)
      console.log(oldVal)
    },
    deep:true
  }
}
//此时发现oldVal和 newVal 值一样; 因为它们索引同一个对象/数组,Vue 不会保留修改之前值的副本; 所以深度监听虽然可以监听到对象的变化,但是无法监听到具体对象里面那个属性的变化

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

## 数据双向绑定

<https://juejin.im/post/5d421bcf6fb9a06af23853f1>

- 监听data属性

```js

/**
  * 循环遍历数据对象的每个属性
  */
function observable(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let keys = Object.keys(obj);
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
    return obj;
}
/**
 * 将对象的属性用 Object.defineProperty() 进行设置
 */
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log(`${key}属性被读取了...`);
            return val;
        },
        set(newVal) {
            console.log(`${key}属性被修改了...`);
            val = newVal;
        }
    })
}
```

## nextTick 原理

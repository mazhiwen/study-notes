




## vue webpack 懒加载 代码分离

https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/


## el 

this.$el 指当前挂载的组件，mounted才有，created没有


## 组件通信

1. vuex
全局

2. v-model
父子组件
组件使用v-model

```javascript
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
<base-checkbox v-model="lovingVue"></base-checkbox>
```

3. $parent $children $root  
较高耦合，一般不推荐

4. provide inject  
适合大型独立性组件，组件内需求耦合性较高
可以传递给子孙 深层次
基本是不可响应式的
核心用法是调用祖父等级别的方法

5. props  $emit  @on  
是响应式的,父子传递prop和event


6. $attrs和$listeners  
适用于第三方复杂组件构建，a -> b -> c 深层次传递prop 和 event

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

## 组合

### mixin

minxin适合有公用 类似react hoc，可以抽离template 和js 的还是抽离成组件比较合适



## 样式

vue 有时候局部样式组件 有时候全局控制



## slot 

v2.6.0 以后引入v-slot
v3 以后会 slot 废弃

### slot-scope  

- v2.6以前旧语法

主要用途是，用来在外层组件同时调用父组件，以及父组件的slot组件  
外层组件传递数据给父组件  
父组件内部，父组件将数据解析后，传递给父组件的slot

外层组件->list->父组件
```javascript
<wrappercomponent>
  <parent :data="list">
  // slot-scope 可以作用于 template 或者 div等
    <template slot-scope="props">
      <child :data="props.rowData">
      
      </child>
    </template>
  </parent>
</wrappercomponent>

// parent组件
<div>
  <slot v-for="item in list" :rowdata="item">
  
  </slot>
</div>

```

- 新语法

```javascript
// parent组件
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

// 旧语法
<parent >
  <div slot="hh">
  </div>
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




## 组件注册

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

## 渲染函数 render函数

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



### router-link

要注意，当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active



## vue 使用jsx




## vuex

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
  // Action 可以包含任意异步操作。
  actions: {
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
  }
  //使用: store.dispatch('increment')
  // 以载荷形式分发
  // store.dispatch('incrementAsync', {
  //   amount: 10
  // })
  // // 以对象形式分发
  // store.dispatch({
  //   type: 'incrementAsync',
  //   amount: 10
  // })

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

```

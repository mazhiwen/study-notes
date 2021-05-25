# vuex

<https://juejin.cn/post/6844903937745616910>

## 语法

dispatch(actions(commit)) ->
commit(mutations(state))) -> view

## state

## getters

getters类似于 vuex state的计算属性

```js
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
  },

  ///////////////// 作为mudule的参数
  gettersA (
    state, getters,
    rootState, rootState
  ) {
    return state.count + rootState.count
  }
},
```

## mutations

mutations(state)

commit -> mutations

action -> mutations

mutations必须是同步函数

```js
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
```

commit(mutations):

```js
this.$store.commit('mc/modifyName', {
  newName: '命名空间模块C'
})

this.$store.commit({
  type: 'mc/modifyName',
  newName: '命名空间模块C'
})
```

当需要在对象上添加新属性时，你应该使用 Vue.set(obj, 'newProp', 123), 或者以新对象替换老对象。例如，利用 stage-3 的对象展开运算符

## actions

Action 可以包含任意异步操作。

Action 类似于 mutation，不同在于,Action 提交的是 mutation，而不是直接变更状态。

action内可以执行另外一个action

```js
actions: {
  async actionB ({
    dispatch, commit
  }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  },
  //如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。
  // 若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
  // 在这个模块中， dispatch 和 commit 也被局部化了
  // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
  someAction ({
    dispatch, commit, getters, state,
    rootGetters, rootState // 作为mudule的参数
  }) {
    getters.someGetter // -> 'foo/someGetter'
    rootGetters.someGetter // -> 'someGetter'
    dispatch('someOtherAction') // -> 'foo/someOtherAction'
    dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
    commit('someMutation') // -> 'foo/someMutation'
    commit('someMutation', null, { root: true }) // -> 'someMutation'
  },
  // action可以写为promise
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  },
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  },
  // 若需要在带命名空间的模块注册全局 action，你可添加 root: true，并将这个 action 的定义放在函数 handler 中。例如：
  someAction: {
    root: true,
    handler (namespacedContext, payload) { ... } // -> 'someAction'
  }
}

// 使用:
store.dispatch('actionsa')
store.dispatch('incrementAsync', {
  amount: 10
})
// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
// promiseAction调用
store.dispatch('actionA').then(() => {
})
```

## mapState

```js
import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
computed: {
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
  mapState({
    // 映射 this.count 为 store.state.countA
    count: 'countA'
  }),

  ///////////////// module情况
  ...mapState('moduleA', ['name', 'desc']) // 这里模块里面要使用辅助函数的话要多传一个参数才行
  ...mapState('moduleA', {
    name(state) {
      return state.name;
    },
    desc(state) {
      return state.desc;
    }
  })
},
```

## mapGetter

mudule情况参考mapState

```js
computed: {
  ...mapGetter(['modifyArr', 'getLength']),
  ...mapGetter({
    arr: 'modifyArr',   // 把 `this.arr` 映射为 `this.$store.getters.modifyArr`,下面同理
    length: 'getLength'
  }),
}
```

## mapMutations

mudule情况参考mapState

```js
methods: {
  ...mapMutations([
    'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    // `mapMutations` 也支持载荷：
    'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
  ]),
  ...mapMutations({
    add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
  })
}
```

## mapActions

mudule情况参考mapState

和mapMutations类似

```js
methods:{
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
```

## Module

```js
//////////////////////////////申明Module
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



//////////////////////////////申明注册Module

// 可以用 this.$store.stata.a.statea

/*
this.$store.commit(
  'modulea/mutationa',
  data,
);
*/
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB,
    //////带有命名空间的modules
    ccount: {
      // 开启命名空间
      namespaced: true
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

## vuex同步localstorage

vuex-persistedstate

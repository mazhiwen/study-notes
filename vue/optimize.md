# vue优化

<https://juejin.cn/post/6922641008106668045>

## 函数式组件

见 vue知识点

把无状态的 抽离为函数式, 迭代式下性能提升效果明显

可以用来抽离部分展示，为了整洁代码结构

## 子组件拆分

把组件内部分不需要因状态变化引起渲染的逻辑 与 本组件其他需要因状态变化引起渲染的逻辑 拆分， 即，不需要重新渲染的逻辑拆分到子组件

## 局部变量

```js
this.base ...this.base....this.base..

//优化为
const {base} = this;
```

每次访问 this.base 的时候，由于 this.base 是一个响应式对象，所以会触发它的 getter，进而会执行依赖收集相关逻辑代码。类似的逻辑执行多了，像示例这样，几百次循环更新几百个组件，每个组件触发 computed 重新计算，然后又多次执行依赖收集相关逻辑，性能自然就下降了。

这是一个非常实用的性能优化技巧。因为很多人在开发 Vue.js 项目的时候，每当取变量的时候就习惯性直接写 this.xxx 了，因为大部分人并不会注意到访问 this.xxx 背后做的事情。在访问次数不多的时候，性能问题并没有凸显，但是一旦访问次数变多，比如在一个大循环中多次访问，类似示例这种场景，就会产生性能问题了。

## 使用 v-show 复用 DOM

v-show 替代 v-if

因此使用 v-if 每次更新组件都会创建新的 Heavy 子组件，当更新的组件多了，自然就会造成性能压力。

因此相比于 v-if 不断删除和创建函数新的 DOM，v-show 仅仅是在更新现有 DOM 的显隐值
所以 v-show 的开销要比 v-if 小的多，当其内部 DOM 结构越复杂，性能的差异就会越大。

但是 v-show 相比于 v-if 的性能优势是在组件的更新阶段，如果仅仅是在初始化阶段，v-if 性能还要高于 v-show，原因是在于它仅仅会渲染一个分支，而 v-show 把两个分支都渲染了，通过 style.display 来控制对应 DOM 的显隐。在使用 v-show 的时候，所有分支内部的组件都会渲染，对应的生命周期钩子函数都会执行，而使用 v-if 的时候，没有命中的分支内部的组件是不会渲染的，对应的生命周期钩子函数都不会执行。

## keep-alive 缓存组件

在非优化场景下，我们每次点击按钮切换路由视图，都会重新渲染一次组件，渲染组件就会经过组件初始化，render、patch 等过程，如果组件比较复杂，或者嵌套较深，那么整个渲染耗时就会很长。

而在使用 KeepAlive 后，被 KeepAlive 包裹的组件在经过第一次渲染后，的 vnode 以及 DOM 都会被缓存起来，然后再下一次再次渲染该组件的时候，直接从缓存中拿到对应的 vnode 和 DOM，然后渲染，并不需要再走一次组件初始化，render 和 patch 等一系列流程，减少了 script 的执行时间，性能更好。

## 使用 Deferred 组件延时分批渲染组件

在应用页用v-if(defer(优先级数字)) 对迭代渲染的组件进行分组，分批次渲染

解决一次性加载太多，导致慢的问题

requestAnimationFrame 周期执行依次累加可以渲染的迭代组件个数（优先级）

defer mixin具体实现：

```js
export default function (count = 10) {
  return {
    data () {
      return {
        displayPriority: 0
      }
    },

    mounted () {
      this.runDisplayPriority()
    },

    methods: {
      runDisplayPriority () {
        const step = () => {
          requestAnimationFrame(() => {
            this.displayPriority++
            if (this.displayPriority < count) {
              step()
            }
          })
        }
        step()
      },

      defer (priority) {
        return this.displayPriority >= priority
      }
    }
  }
}
```

## Time slicing 时间片切割技术

对一次执行耗时较大的js逻辑，会造成页面卡死

这时候可以用 例如requestAnimationFrame 分批处理js，避免页面卡死

## 使用 Non-reactive data 非响应式数据

### defineProperty configurable

对于大数据量，部分不需要影响的。或者 参数不需要响应。

```js
const data = items.map(
  item => ({
    id: uid++,
    data: item,
    vote: 0
  })
)
```

优化后：

```js
const data = items.map(
  item => optimizeItem(item)
)

function optimizeItem (item) {
  const itemData = {
    id: uid++,
    vote: 0
  }
  Object.defineProperty(itemData, 'data', {
    // Mark as non-reactive
    configurable: false,
    value: item
  })
  return itemData
}
```

### 不挂在组件data

对应不需要响应的不挂在组件data

而是 挂在this.

```js
export default {
  created() {
    this.scroll = null
  },
  mounted() {
    this.scroll = new BScroll(this.$el)
  }
}
```

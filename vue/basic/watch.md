# watch

watch中可以执行任何逻辑，如函数节流，Ajax异步获取数据

https://juejin.cn/post/6844903605485436941

## immediate和deep

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

## watch和computed

watch：监测的是属性值， 只要属性值发生变化，其都会触发执行回调函数来执行一系列操作。

computed：监测的是依赖值，依赖值不变的情况下其会直接读取缓存进行复用，变化的情况下才会重新计算。

计算属性不能执行异步任务，计算属性必须同步执行。也就是说计算属性不能向服务器请求或者执行异步任务。如果遇到异步任务，就交给侦听属性。

watch也可以检测computed属性。

computed 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问 computed 属性，才会计算新的值。而 watch 则是当数据发生变化便会调用执行函数。

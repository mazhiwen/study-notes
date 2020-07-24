# 响应式原理

<https://cn.vuejs.org/v2/guide/reactivity.html>

<https://juejin.im/post/5c386acb518825261f735384>

由于 JavaScript 的限制，Vue 不能检测数组和对象的变化

## 对象

- property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的

Vue 无法检测 property 的添加或移除。

由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。

```js
var vm = new Vue({
  data:{
    a:1
  }
})

// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 是非响应式的

```

- 向嵌套对象添加响应式 property

对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但可以用Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property

```js
Vue.set(vm.someObject, 'b', 2)
// 或者等同于
this.$set(this.someObject,'b',2)
```

- 给对象赋值多个新的property

```js
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

## 数组

Vue不能检测以下数组的变动:

### 当用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue

```js

// 非响应式:
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的


// 响应式操作:
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

### 当修改数组的长度时，例如：vm.items.length = newLength

```js
// 响应式操作:
vm.items.splice(indexOfItem, 1, newValue)
```

## 声明响应式 property

由于 Vue 不允许动态添加根级响应式 property，所以你必须在初始化实例前声明所有根级响应式 property，哪怕只是一个空值：在 data 选项中声明

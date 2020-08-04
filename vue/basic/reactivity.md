# 响应式原理

<https://cn.vuejs.org/v2/guide/reactivity.html>

<https://juejin.im/post/6844903597986037768>

<https://juejin.im/post/6844903877699960846>

https://juejin.im/post/6844903746774761486

由于 JavaScript 的限制，Vue 不能检测数组和对象的变化

Vue3.0可能会用ES6中Proxy 作为实现数据代理的主要方式

## 概念原理

### 数据劫持 / 数据代理 ： 监测数据变化

```js
const defineReactive = function(obj, key) {
  // 局部变量dep，用于get set内部调用
  const dep = new Dep();
  // 获取当前值
  let val = obj[key];
  Object.defineProperty(obj, key, {
    // 设置当前描述属性为可被循环
    enumerable: true,
    // 设置当前描述属性可被修改
    configurable: true,
    get() {
      console.log('in get');
      // 调用依赖收集器中的addSub，用于收集当前属性与Watcher中的依赖关系
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      // 当值发生变更时，通知依赖收集器，更新每个需要更新的Watcher，
      // 这里每个需要更新通过什么断定？dep.subs
      dep.notify();
    }
  });
}
```

### 收集依赖

data 中的声明的每个属性，都拥有一个数组，保存着 谁依赖（使用）了 它

订阅者 Dep: 它用来收集依赖、删除依赖和向依赖发送消息等

addSub 方法 :可以在目前的 Dep 对象中增加一个 Watcher 的订阅操作；

notify 方法 : 通知目前 Dep 对象的 subs 中的所有 Watcher 对象触发更新操作。

```js
const Dep = function() {
  const self = this;
  // 收集目标
  this.target = null;
  // 存储收集器中需要通知的Watcher
  this.subs = [];
  // 当有目标时，绑定Dep与Wathcer的关系
  this.depend = function() {
    if (Dep.target) {
      // 这里其实可以直接写self.addSub(Dep.target)，
      // 没有这么写因为想还原源码的过程。
      Dep.target.addDep(self);
    }
  }
  // 为当前收集器添加Watcher
  this.addSub = function(watcher) {
    self.subs.push(watcher);
  }
  // 通知收集器中所的所有Wathcer，调用其update方法
  this.notify = function() {
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update();
    }
  }
}
```

依赖收集的目的是将观察者 Watcher 对象存放到当前闭包中的订阅者 Dep 的 subs 中

在getter中收集依赖，先收集依赖，即把用到该数据的地方收集起来。在setter中触发依赖，等属性发生变化时，把之前收集好的依赖循环触发一遍就行了。

### watcher - 发布订阅模式：数据变化时，自动“通知”需要更新的视图部分，并进行更新

简单说一下，watcher 是什么，每个 Vue 实例都会拥有一个专属的 watcher，可用于实例更新

```js
const Watcher = function(vm, fn) {
  const self = this;
  this.vm = vm;
  // 将当前Dep.target指向自己
  Dep.target = this;
  // 向Dep方法添加当前Wathcer
  this.addDep = function(dep) {
    dep.addSub(self);
  }
  // 更新方法，用于触发vm._render
  this.update = function() {
    console.log('in watcher update');
    fn();
  }
  // 这里会首次调用vm._render，从而触发text的get
  // 从而将当前的Wathcer与Dep关联起来
  this.value = fn();
  // 这里清空了Dep.target，为了防止notify触发时，不停的绑定Watcher与Dep，
  // 造成代码死循环
  Dep.target = null;
}
```

## 对象

- property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的

Vue 无法检测 property 的添加或移除。这是因为 Vue 通过Object.defineProperty来将对象的key转换成getter/setter的形式来追踪变化，但getter/setter只能追踪一个数据是否被修改，无法追踪新增属性和删除属性。

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

Vue将数组的常用方法进行重写，进而覆盖掉原生的数组方法，重写之后的数组方法需要能够被拦截。

```js
let methods = ['pop', 'shift', 'unshift', 'sort', 'reverse', 'splice', 'push']
```

但有些数组操作Vue时拦截不到的，当然也就没办法响应。Vue不能检测以下数组的变动:

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

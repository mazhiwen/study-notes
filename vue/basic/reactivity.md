# 双向绑定原理

<https://cn.vuejs.org/v2/guide/reactivity.html>

<https://juejin.im/post/6844903597986037768>

<https://juejin.im/post/6844903877699960846>

<https://juejin.im/post/6844903746774761486>

<https://github.com/ljianshu/Blog/issues/70>

由于 JavaScript 的限制，Vue 不能检测数组和对象的变化

Vue3.0可能会用ES6中Proxy 作为实现数据代理的主要方式

## Vue双向绑定实现简易逻辑代码

基本实现逻辑：

```js
/******************
 * Dep
 * 属性监听对象集中器,
 * 存放每个vue data属性的对应的 属性变化渲染动作列表 和 属性被get时添加动作接口方法
 * **/
// 对data每个属性新创建new dep主题对象
// 属性变化时，会对注册的依赖属性的dep列表 watcher 依次更新 watcher.update
Dep(){
  this.subs = [];
  // subs列表存储的是 compile组建时对{{data属性}} new的watcher实例
}
Dep.prototype = {
  addSub:function(watcher){
    this.subs.push(watcher);
  },
  notify:function(){
    this.subs.forEach((watcher)=>{
      watcher.update();
    })
  }
}

/********************
 * watcher
 * 对文本节点属性的监听，
 * 即每个watcher实例表示 ： 某个属性更新触发vue组件节点变化的具体渲染动作，
 * */
// 每个文本类型节点都会新建 new watcher实例
watcher(vm,node,name){
  Dep.target = this; // 全局属性Dep.target
  this.update();
  Dep.target = null;
}
watcher.prototype= {
  update:function(){
    this.value = vm[name] // 初次compile的时候 触发 defineReactive vm[name] 的get函数 内的dep添加watcher
    this.node.nodeValue = this.value;
  }
}

/********************
 * observe
 * 对data每个属性定义 set get 拦截,
 * 即每个属性新建一个dep消息对象管理器
 * */
observe(){
  遍历 data 进行 defineReactive(){
    var dep = new Dep();
    Oject.defineProperty(data,key,{
      get:function(){
        if(Dep.target) dep.addSub(Dep.target);
      },
      set:function(){
        dep.notify();
      }
    })
  }
}

/********************
 * 
 * compile
 * 编译 DOM 入口
 * 对每个组件新建watcher渲染动作，并添加到消息管理dep
 * */
// 对App DOM 编译，并对 attrs 文本节点等，组建双向绑定的属性注册到监听器
compile(){
  if(node.nodeType === 1){
    name = 获取App中v-modle后面的属性，即vm.data内属性
    if v-model{
      node.addEventListener('input',function(e){
        vm[name] = e.target.value;
      })
    }
  }
  if(node.nodeType === 3){
    // name 为文本节点 {{对应data属性}}
    new Watcher(vm,node,name) // 订阅文本绑定的data[name]属性对应的发布订阅逻辑
  }

}

/********************
*  先observe ：对数据data进行set get注册，dep注册
*  后compile： 对渲染逻辑 执行data的get操作, 绑定当前get操作对应的watcher逻辑到dep.这* 个watcher 只注册一次
*/ 
vue(){
  observe(data)
  compile(App)
}

////////////// vue 实例挂载
vue(App)

```

## 双向绑定

<https://juejin.im/post/5d421bcf6fb9a06af23853f1>

<https://www.cnblogs.com/kidney/p/6052935.html?utm_source=gold_browser_extension>

vue 的双向数据绑定主要是通过使用数据劫持和发布订阅者模式来实现的。

数据劫持 + dom监听 + 发布订阅

数据劫持:

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

如果遇到元素节点，并且属性值包含 v-model 的话，我们就从 Model 中去获取 v-model 所对应的属性的值，并赋值给元素的 value 值。然后给这个元素设置一个监听事件，当 View 中元素的数据发生变化的时候触发该事件，通知 Model 中的对应的属性的值进行更新。

如果遇到了绑定的文本节点，我们使用 Model 中对应的属性的值来替换这个文本。对于文本节点的更新，我们使用了发布订阅者模式，属性作为一个主题，我们为这个节点设置一个订阅者对象，将这个订阅者对象加入这个属性主题的订阅者列表中。当 Model 层数据发生改变的时候，Model 作为发布者向主题发出通知，主题收到通知再向它的所有订阅者推送，订阅者收到通知后更改自己的数据。

## 方案一： Object.defineProperty 数据劫持

### 代码例子

会递归子属性进行 defineReactive

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

### Object.defineProperty 的缺陷

1. Object.defineProperty 的第一个缺陷,无法监听数组变化

2. Object.defineProperty 的第二个缺陷,只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择

## 方案二： Proxy 数据代理

Proxy 的代理是针对整个对象的，而不是对象的某个属性。因此不同于 Object.defineProperty 的必须遍历对象每个属性，Proxy 只需要做一层代理就可以监听同级结构下的所有属性变化

Proxy支持代理数组的变化

### 代码例子

```js
function render() {
  console.log('模拟视图的更新')
}
let obj = {
  name: '前端工匠',
  age: { age: 100 },
  arr: [1, 2, 3]
}
let handler = {
  get(target, key) {
    // 如果取的值是对象就在对这个对象进行数据劫持
    if (typeof target[key] == 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    if (key === 'length') return true
    render()
    return Reflect.set(target, key, value)
  }
}

let proxy = new Proxy(obj, handler)
proxy.age.name = '浪里行舟' // 支持新增属性
console.log(proxy.age.name) // 模拟视图的更新 浪里行舟
proxy.arr[0] = '浪里行舟' //支持数组的内容发生变化
console.log(proxy.arr) // 模拟视图的更新 ['浪里行舟', 2, 3 ]
proxy.arr.length-- // 无效
```

### Proxy可以直接监听对象而非属性

我们可以看到,Proxy直接可以劫持整个对象,并返回一个新对象,不管是操作便利程度还是底层功能上都远强于Object.defineProperty。

proxy监听整个对象，Object.defineProperty需要对每个属性进行监听

### Proxy可以直接监听数组的变化

## dep - 收集依赖 消息管理

data 中的声明的每个属性，都拥有一个数组，保存着 谁依赖（使用）了 它

订阅者 Dep: 它用来收集依赖、删除依赖和向依赖发送消息等

addSub 方法 :可以在目前的 Dep 对象中增加一个 Watcher 的订阅操作；

notify 方法 : 通知目前 Dep 对象的 subs 中的所有 Watcher 对象触发更新操作。

在getter中收集依赖，在setter中触发依赖

先收集依赖，即把用到该数据的地方收集起来，然后等属性发生变化时，把之前收集好的依赖循环触发一遍就行了

当外界通过Watcher读取数据时，便会触发getter从而将Watcher添加到依赖中，哪个Watcher触发了getter，就把哪个Watcher收集到Dep中。当数据发生变化时，会循环依赖列表，把所有的Watcher都通知一遍。

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

## watcher - 发布订阅模式：数据变化时，自动“通知”需要更新的视图部分，并进行更新

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

## vue对监听对象的处理

### Vue 无法检测 property 的添加或移除

这是因为 Vue 通过 Object.defineProperty 来将对象的key转换成getter/setter的形式来追踪变化，但getter/setter只能追踪一个数据是否被修改，无法追踪新增属性和删除属性。

### property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的

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

### 向嵌套对象添加响应式 property

对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但可以用Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property

```js
Vue.set(vm.someObject, 'b', 2)
// 或者等同于
this.$set(this.someObject,'b',2)
```

### 给对象赋值多个新的property

```js
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

## vue对监听数组的处理

Vue将数组的常用方法进行重写，覆盖掉原生的数组方法，重写之后的数组方法需要能够被拦截。

`vm.items[indexOfItem] = newValue` 这种是无法检测的

### 有以下八种数组方法，是进行了拦截监听

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

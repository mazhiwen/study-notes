# Vue生命周期

[详解 Vue 生命周期实现](https://juejin.im/post/5c6d48e36fb9a049eb3c84ff)

[vue 生命周期深入](https://juejin.im/entry/5aee8fbb518825671952308c)

<https://juejin.im/post/5d1b464a51882579d824af5b>

## 各个生命周期

### beforeCreate

实例初始化，初始化界面前

属性 options 的合并处理

添加响应数据: 在vue响应式系统中加入data对象中的所有数据,defineReactive

初始化一些属性 方法 参数：如，$前缀的 $parent $root 等

初始化事件

在当前阶段中data、methods、computed以及watch上的数据和方法均不能被访问。

### created

初始化界面前,组件实例创建完成，属性已绑定，但DOM还未生成，$el属性还不存在

完成了数据观测

props 、methods 、data 、computed 和 watch 的初始化处理；

在这里更改数据不会触发updated函数

### beforeMount

虚拟Dom已经创建完成，即将开始渲染

在 beforeMount 这里，基本没做什么事情，只是做了一个 render 方法如果存在就绑定一下 createEmptyVNode 函数；

### mounted

真实的Dom挂载完毕

此时可以通过DOM API获取到DOM节点，$ref属性可以访问

### beforeUpdate

响应式数据发生更新 ——> 虚拟dom重新渲染 ——>调用 beforeUpdate updated 这两个生命钩子去改变视图

虚拟dom重新渲染之前触发beforeUpdate

当前阶段进行更改数据，不会造成重渲染

### updated

虚拟DOM已经更新完成，可执行依赖于DOM的操作

避免在此期间更改数据，因为这可能会导致无限循环的更新

### beforeDestroy

这个钩子发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。

### destroyed

这个钩子发生在实例销毁之后，这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

### activated

for keep-alive,组件被激活时调用

### deactivated

for keep-alive,组件被移除时调用

## 父子组件的生命周期

### 初始化组件流程

仅当子组件完成挂载后，父组件才会挂载

当子组件完成挂载后，父组件会主动执行一次beforeUpdate/updated钩子函数（仅首次）

```
parent beforeCreate
parent created
parent beforeMount
  child beforeCreate
  child created
  child beforeMount
  child Mounted
parent Mounted
parent beforeUpdate
parent updated
```

### 当子组件data中的值变化

```
child beforeUpdate
child updated
```

### 当父组件data中的值变化

```
parent beforeUpdate
parent updated
```

### 当props改变时

```
parent beforeUpdate
  child beforeUpdate
  child updated
parent updated
```

### 当子组件销毁时

```
child beforeDestroy
child destroyed
```

### 当父组件销毁时

销毁父组件时，先将子组件销毁后才会销毁父组件

```
parent beforeDestroy
  child beforeDestroy
  child destroyed
parent destroyed
```

## 兄弟组件的生命周期

组件的初始化（mounted之前）分开进行，挂载是从上到下依次进行

```
parent beforeMount
  child1 beforeCreate
  child1 created
  child1 beforeMount
  child2 beforeCreate
  child2 created
  child2 beforeMount
  child1 Mounted
  child2 Mounted
parent Mounted
```

## 宏mixin的生命周期

mixin中的生命周期与引入该组件的生命周期是仅仅关联的，且mixin的生命周期优先执行

组件初始化时:

```
mixin beforeCreate
parent beforeCreate
mixin created
parent created
mixin beforeMount
parent beforeMount
  child beforeCreate
  child created
  child beforeMount
  child Mounted
mixin Mounted
parent Mounted
mixin beforeUpdate
parent beforeUpdate
parent updated
```

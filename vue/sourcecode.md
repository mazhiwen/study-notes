# vue源码解析

- [组件](#组件)
- [生成Vnode的h函数](#生成Vnode的h函数)
- [VNode](#VNode)
- [渲染器](#渲染器)

<https://www.cnblogs.com/tiedaweishao/p/8933153.html>

<https://github.com/muwoo/blogs/blob/master/src/Vue/2.md>

<http://hcysun.me/vue-design/zh/essence-of-comp.html>

***

## 组件

组件 -> 生成vnode -> patch -> 真实DOM

### patch

定义 : 把Virtual DOM 终究渲染真实DOM，

数据变更，产出新的 VNode，并执行patch渲染

```js
// 数据变更，产出新的 VNode
// 通过对比新旧 VNode，高效地渲染真实 DOM
patch(prevVnode, nextVnode)
```

## 生成Vnode的h函数

### 通过 检测 tag 属性值 来确定一个 VNode 对象的 flags 属性值

```js
export const Fragment = Symbol()
export const Portal = Symbol()
// 省略...
function h(tag, data = null, children = null) {
  let flags = null
  if (typeof tag === 'string') {
    flags = tag === 'svg' ? VNodeFlags.ELEMENT_SVG : VNodeFlags.ELEMENT_HTML
  } else if (tag === Fragment) {
    flags = VNodeFlags.FRAGMENT
  } else if (tag === Portal) {
    flags = VNodeFlags.PORTAL
    tag = data && data.target
  } else {
    // 兼容 Vue2 的对象式组件
    if (tag !== null && typeof tag === 'object') {
      flags = tag.functional
        ? VNodeFlags.COMPONENT_FUNCTIONAL       // 函数式组件
        : VNodeFlags.COMPONENT_STATEFUL_NORMAL  // 有状态组件
    } else if (typeof tag === 'function') {
      // Vue3 的类组件
      flags = tag.prototype && tag.prototype.render
        ? VNodeFlags.COMPONENT_STATEFUL_NORMAL  // 有状态组件
        : VNodeFlags.COMPONENT_FUNCTIONAL       // 函数式组件
    }
  }

  return {
    flags,
    // 其他属性...
  }
}
```

### 可以通过检测children 来确定 childFlags 的值

```js
function h(tag, data = null, children = null) {
  // 省略用于确定 flags 相关的代码

  let childFlags = null
  if (Array.isArray(children)) {
    const { length } = children
    if (length === 0) {
      // 没有 children
      childFlags = ChildrenFlags.NO_CHILDREN
    } else if (length === 1) {
      // 单个子节点
      childFlags = ChildrenFlags.SINGLE_VNODE
      children = children[0]
    } else {
      // 多个子节点，且子节点使用key
      childFlags = ChildrenFlags.KEYED_VNODES
      children = normalizeVNodes(children)
    }
  } else if (children == null) {
    // 没有子节点
    childFlags = ChildrenFlags.NO_CHILDREN
  } else if (children._isVNode) {
    // 单个子节点
    childFlags = ChildrenFlags.SINGLE_VNODE
  } else {
    // 其他情况都作为文本节点处理，即单个子节点，会调用 createTextVNode 创建纯文本类型的 VNode
    childFlags = ChildrenFlags.SINGLE_VNODE
    children = createTextVNode(children + '')
  }
}
```

## VNode

也叫vnode

### 表示

```js
export interface VNode {
  // _isVNode 属性在上文中没有提到，它是一个始终为 true 的值，有了它，我们就可以判断一个对象是否是 VNode 对象
  _isVNode: true
  // el 属性在上文中也没有提到，当一个 VNode 被渲染为真实 DOM 之后，el 属性的值会引用该真实DOM
  el: Element | null
  flags: VNodeFlags
  tag: string | FunctionalComponent | ComponentClass | null
  data: VNodeData | null
  children: VNodeChildren
  childFlags: ChildrenFlags
}
```

### vnode.tag

通过 判断 vnode.tag 是否是字符串 来区分：一个 VNode 到底是 html 标签还是组件

### 种类

有5类：

1. html/svg 元素、
2. 组件:

组件细分为 有状态组件 和 函数式组件。同时有状态组件还可以细分为三部分：普通的有状态组件、需要被 keepAlive 的有状态组件 以及 已经被 keepAlive 的有状态组件 。

3. 纯文本、
4. Fragment
5. Portal：

当 VNode 描述不同的事物时，其属性的值也各不相同。比如一个 VNode 对象是 html 标签的描述，那么其 tag 属性值就是一个字符串，即标签的名字；如果是组件的描述，那么其 tag 属性值则引用组件类(或函数)本身；如果是文本节点的描述，那么其 tag 属性值为 null

### VNodeFlags

flags作为vnode的标识

采用了位运算，在一次挂载任务中如上判断很可能大量的进行，使用位运算在一定程度上再次拉升了运行时性能。

枚举值 VNodeFlags:

```js
const VNodeFlags = {
  // html 标签
  ELEMENT_HTML: 1,
  // SVG 标签
  ELEMENT_SVG: 1 << 1,

  // 普通有状态组件
  COMPONENT_STATEFUL_NORMAL: 1 << 2,
  // 需要被keepAlive的有状态组件
  COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE: 1 << 3,
  // 已经被keepAlive的有状态组件
  COMPONENT_STATEFUL_KEPT_ALIVE: 1 << 4,
  // 函数式组件
  COMPONENT_FUNCTIONAL: 1 << 5,

  // 纯文本
  TEXT: 1 << 6,
  // Fragment
  FRAGMENT: 1 << 7,
  // Portal
  PORTAL: 1 << 8
}
```

### ChildrenFlags

表示： 一个标签的子节点的情况分类

```js
const ChildrenFlags = {
  // 未知的 children 类型
  UNKNOWN_CHILDREN: 0,
  // 没有 children
  NO_CHILDREN: 1,
  // children 是单个 VNode
  SINGLE_VNODE: 1 << 1,

  // children 是多个拥有 key 的 VNode
  KEYED_VNODES: 1 << 2,
  // children 是多个没有 key 的 VNode
  NONE_KEYED_VNODES: 1 << 3
}
```

### VNodeData

VNode 的 data 属性,它是一个对象

VNodeData 中可以包含 class、style 以及一些事件

### Fragment

抽象元素,根元素并不是一个实实在在的真实 DOM

当渲染器在渲染 VNode 时，如果发现该 VNode 的类型是 Fragment，就只需要把该 VNode 的子节点渲染到页面。

```html
<template>
  <table>
    <tr>
      <Columns />
    </tr>
  </table>
</template>

<!-- Columns描述 -->
<template>
  <td></td>
  <td></td>
  <td></td>
</template>
```

```js
//Columns描述
const Fragment = Symbol()
const fragmentVNode = {
  // tag 属性值是一个唯一标识
  tag: Fragment,
  data: null,
  children: {
    //,,,
  }
}
```

### Portal

Portal包装组件，其最终效果是，无论你在何处使用 该包装组件，它都会把内容渲染到 包装指定的id的元素下

所谓 Portal 就是把子节点渲染到给定的目标，

```html
<!-- Portal封装的组件描述 -->
<template>
  <Portal target="#app-root">
    <div class="overlay"></div>
  </Portal>
</template>
```

```js
// Portal封装的组件描述
const Portal = Symbol()
const portalVNode = {
  tag: Portal,
  data: {
    target: '#app-root'
  },
  children: {
    //,,,
  }
}
```

## 渲染器

### 渲染器概念

渲染器 :将 Virtual DOM 渲染成特定平台下真实 DOM 的工具(就是一个函数，通常叫 render)

```js
function render(vnode, container) {
  const prevVNode = container.vnode
  if (prevVNode == null) {
    if (vnode) {
      // 没有旧的 VNode，只有新的 VNode。使用 `mount` 函数挂载全新的 VNode
      mount(vnode, container)
      // 将新的 VNode 添加到 container.vnode 属性下，这样下一次渲染时旧的 VNode 就存在了
      container.vnode = vnode
    }
  } else {
    if (vnode) {
      // 有旧的 VNode，也有新的 VNode。则调用 `patch` 函数打补丁
      patch(prevVNode, vnode, container)
      // 更新 container.vnode
      container.vnode = vnode
    } else {
      // 有旧的 VNode 但是没有新的 VNode，这说明应该移除 DOM，在浏览器中可以使用 removeChild 函数。
      container.removeChild(prevVNode.el)
      container.vnode = null
    }
  }
}
```

不只是把virtualdom渲染为真实dom，还负责其他工作 .......

### 挂载函数 mount

mount 函数的作用是把一个 VNode 渲染成真实 DOM，根据不同类型的 VNode 需要采用不同的挂载方式，如下

```js
function mount(vnode, container) {
  const { flags } = vnode
  if (flags & VNodeFlags.ELEMENT) {
    // 挂载普通标签
    mountElement(vnode, container)
  } else if (flags & VNodeFlags.COMPONENT) {
    // 挂载组件
    mountComponent(vnode, container)
  } else if (flags & VNodeFlags.TEXT) {
    // 挂载纯文本
    mountText(vnode, container)
  } else if (flags & VNodeFlags.FRAGMENT) {
    // 挂载 Fragment
    mountFragment(vnode, container)
  } else if (flags & VNodeFlags.PORTAL) {
    // 挂载 Portal
    mountPortal(vnode, container)
  }
}
```

#### 挂载普通标签元素 mountElement

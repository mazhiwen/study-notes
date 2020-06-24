# 生成Vnode的h函数

## 通过 检测 tag 属性值 来确定一个 VNode 对象的 flags 属性值

```js
export const Fragment = Symbol()
export const Portal = Symbol()
// 省略...
function h(tag, data = null, children = null) {
  let flags = null
  if (typeof tag === 'string') {
    flags = tag === 'svg' ? VNodeFlags.ELEMENT_SVG : VNodeFlags.ELEMENT_HTML
    // 序列化 class
    if (data) {
      data.class = normalizeClass(data.class)
    }
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
    _isVNode: true,
    flags,
    // 其他属性...
    tag,
    data,
    children,
    childFlags,
    el: null
  }
}
```

## 可以通过检测children 来确定 childFlags 的值

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

## 序列化class函数normalizeClass

```js
function normalizeClass(classValue) {
  // res 是最终要返回的类名字符串
  let res = ''
  if (typeof classValue === 'string') {
    res = classValue
  } else if (Array.isArray(classValue)) {
    for (let i = 0; i < classValue.length; i++) {
      res += normalizeClass(classValue[i]) + ' '
    }
  } else if (typeof classValue === 'object') {
    for (const name in classValue) {
      if (classValue[name]) {
        res += name + ' '
      }
    }
  }
  return res.trim()
}
```

## h创建标签VNode

```js
// 模板描述
<template>
  <div>
    <span></span>
  </div>
</template>

// h 函数来创建与之相符的 VNode
const elementVNode = h('div', null, h('span'))

// 得到的 VNode 对象如下
const elementVNode = {
  _isVNode: true,
  flags: 1, // VNodeFlags.ELEMENT_HTML
  tag: 'div',
  data: null,
  children: {
    _isVNode: true,
    flags: 1, // VNodeFlags.ELEMENT_HTML
    tag: 'span',
    data: null,
    children: null,
    childFlags: 1, // ChildrenFlags.NO_CHILDREN
    el: null
  },
  childFlags: 2, // ChildrenFlags.SINGLE_VNODE
  el: null
}
```

## h创建文本的VNode

```js
// 模板描述
<template>
  <div>我是文本</div>
</template>

// h 函数来创建与之相符的 VNode
const elementWithTextVNode = h('div', null, '我是文本')

// 得到的 VNode 对象如下
const elementWithTextVNode = {
  _isVNode: true,
  flags: 1, // VNodeFlags.ELEMENT_HTML
  tag: 'div',
  data: null,
  children: {
    _isVNode: true,
    flags: 64,  // VNodeFlags.TEXT
    tag: null,
    data: null,
    children: '我是文本',
    childFlags: 1, // ChildrenFlags.NO_CHILDREN
    el: null
  },
  childFlags: 2, // ChildrenFlags.SINGLE_VNODE
  el: null
}

```

## h创建Fragment的VNode

```js
// 模板描述
<template>
  <td></td>
  <td></td>
</template>

// h 函数来创建与之相符的 VNode
import { h, Fragment } from './h'
const fragmentVNode = h(Fragment, null, [
  h('td'), h('td')
])

// 得到的 VNode 对象如下
const fragmentVNode = {
  _isVNode: true,
  flags: 128, // VNodeFlags.FRAGMENT
  data: null,
  children: [
    {
      _isVNode: true,
      flags: 1, // VNodeFlags.ELEMENT_HTML
      tag: 'td',
      data: null,
      children: null,
      childFlags: 1,  // ChildrenFlags.NO_CHILDREN
      key: '|0', // 自动生成的 key
      el: null
    },
    {
      _isVNode: true,
      flags: 1, // VNodeFlags.ELEMENT_HTML
      tag: 'td',
      data: null,
      children: null,
      childFlags: 1,  // ChildrenFlags.NO_CHILDREN
      key: '|1', // 自动生成的 key
      el: null
    }
  ],
  childFlags: 4, // ChildrenFlags.KEYED_VNODES
  el: null
}

```

## h创建Portal的VNode

```js
// 模板描述
<template>
  <Portal target="#box">
    <h1></h1>
  </Portal>
</template>

// h 函数来创建与之相符的 VNode
import { h, Portal } from './h'
const portalVNode = h(
  Portal,
  {
    target: '#box'
  },
  h('h1')
)

// 得到的 VNode 对象如下
const portalVNode = {
  _isVNode: true,
  flags: 256, // VNodeFlags.PORTAL
  tag: '#box',  // 类型为 Portal 的 VNode，其 tag 属性值等于 data.target
  data: { target: '#box' },
  children: {
    _isVNode: true,
    flags: 1, // VNodeFlags.ELEMENT_HTML
    tag: 'h1',
    data: null,
    children: null,
    childFlags: 1, // ChildrenFlags.NO_CHILDREN
    el: null
  },
  childFlags: 2, // ChildrenFlags.SINGLE_VNODE
  el: null
}
```

## h创建函数式组件的VNode

```js
// 模板描述
<template>
  <MyFunctionalComponent>
    <div></div>
  </MyFunctionalComponent>
</template>

// h 函数来创建与之相符的 VNode
// 一个函数式组件
function MyFunctionalComponent() {}
// 传递给 h 函数的第一个参数就是组件函数本身
const functionalComponentVNode = h(MyFunctionalComponent, null, h('div'))

// 得到的 VNode 对象如下
const functionalComponentVNode = {
  _isVNode: true,
  flags: 32,  // VNodeFlags.COMPONENT_FUNCTIONAL
  tag: MyFunctionalComponent, // tag 属性值引用组件函数
  data: null,
  children: {
    _isVNode: true,
    flags: 1,
    tag: 'div',
    data: null,
    children: null,
    childFlags: 1,
    el: null
  },
  childFlags: 2, // ChildrenFlags.SINGLE_VNODE
  el: null
}


```

## h创建有状态组件的VNode

```js
// h 函数来创建与之相符的 VNode
// 有状态组件
class Component {
  render() {
    throw '组件缺少 render 函数'
  }
}
class MyStatefulComponent extends Component {}
const statefulComponentVNode = h(MyStatefulComponent, null, h('div'))

// 得到的 VNode 对象如下
const statefulComponentVNode = {
  _isVNode: true,
  flags: 4, // VNodeFlags.COMPONENT_STATEFUL_NORMAL
  data: null,
  children: {
    _isVNode: true,
    flags: 1,
    tag: 'div',
    data: null,
    children: null,
    childFlags: 1,
    el: null
  },
  childFlags: 2,
  el: null
}
```


# 渲染器-挂载

渲染器的挂载逻辑，本质上就是将各种类型的 VNode 渲染成真实DOM的过程

## 挂载函数mount

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

## 挂载普通标签元素mountElement

```js

function mountElement(vnode, container, isSVG, refNode) {
  const el = document.createElement(vnode.tag)

  isSVG = isSVG || vnode.flags & VNodeFlags.ELEMENT_SVG
  const el = isSVG
    ? document.createElementNS('http://www.w3.org/2000/svg', vnode.tag)
    : document.createElement(vnode.tag)

  vnode.el = el

  // 拿到 VNodeData
  const data = vnode.data
  if (data) {
    // 如果 VNodeData 存在，则遍历之
    for(let key in data) {
      // key 可能是 class、style、on 等等
      switch(key) {
        case 'style':
          // 如果 key 的值是 style，说明是内联样式，逐个将样式规则应用到 el
          for(let k in data.style) {
            el.style[k] = data.style[k]
          }
          // 渲染class
        case 'class':
          // ... 具体代码见下面 class处理
          break
          // 处理除了class style 以外的属性  
        default:
          if (key[0] === 'o' && key[1] === 'n') {
            // 事件的处理
            el.addEventListener(key.slice(2), data[key])
          } else if (domPropsRE.test(key)) {
            // 当作 DOM Prop 处理
            el[key] = data[key]
          } else {
            // 当作 Attr 处理
            el.setAttribute(key, data[key])
          }
          break
      }
    }
  }

  // 拿到 children 和 childFlags
  const childFlags = vnode.childFlags
  const children = vnode.children
  // 检测如果没有子节点则无需递归挂载
  if (childFlags !== ChildrenFlags.NO_CHILDREN) {
    if (childFlags & ChildrenFlags.SINGLE_VNODE) {
      // 如果是单个子节点则调用 mount 函数挂载
      mount(children, el, isSVG)
    } else if (childFlags & ChildrenFlags.MULTIPLE_VNODES) {
      // 如果是单多个子节点则遍历并调用 mount 函数挂载
      for (let i = 0; i < children.length; i++) {
        mount(children[i], el, isSVG)
      }
    }
  }

  refNode ? container.insertBefore(el, refNode) : container.appendChild(el)

}
```

### class处理

格式化接收 对象，数组，解析为字符串 el.className 赋值

```js
case 'class':
if (isSVG) {
  el.setAttribute('class', data[key])
} else {
  el.className = data[key]
}
break
```

### Attributes和DOMProperties

attribute : 标准属性 , 存在于标签上的属性，

DOM Prop : 非标准属性 , 存在于DOM对象上的属性 。  

setAttribute：可以设置属性的值，但先把值转为字符串， 有些设置不了。

有些非标准属性不能通过setAttribute设置。 需要通过类似el.checked = true设置。此类情况有:value、checked、selected、muted 。以及诸如 innerHTML、textContent

```js
const domPropsRE = /\[A-Z]|^(?:value|checked|selected|muted)$/
// ...
default:
if (domPropsRE.test(key)) {
  // 当作 DOM Prop 处理
  el[key] = data[key]
} else {
  // 当作 Attr 处理
  el.setAttribute(key, data[key])
}
break
```

### 事件的处理

要将VNodeData 中事件与属性区分, VNodeData 中参考原生DOM对象中所有事件函数的名字使用 onXXXX 代表事件

只需要检测属性名的前两个字符是不是 'on' 来判断VNode属性是DOM属性还是DOM事件

具体代码见mountElement函数 事件的处理

## 挂载文本节点mountText

```js
function mountText(vnode, container) {
  const el = document.createTextNode(vnode.children)
  vnode.el = el
  container.appendChild(el)
}
```

## 挂载Fragment

`<Fragment>` 标签不会被渲染为真实DOM，也就不会产生多余的DOM元素

对于 Fragment 类型的 VNode 的挂载 就是 只挂载这个 VNode 的 children

```js
function mountFragment(vnode, container, isSVG) {
  // 拿到 children 和 childFlags
  const { children, childFlags } = vnode
  switch (childFlags) {
    case ChildrenFlags.SINGLE_VNODE:
      // 如果是单个子节点，则直接调用 mount
      mount(children, container, isSVG)
      // 单个子节点，就指向该节点
      vnode.el = children.el
      break
    case ChildrenFlags.NO_CHILDREN:
      // 如果没有子节点，等价于挂载空片段，会创建一个空的文本节点占位
      const placeholder = createTextVNode('')
      mountText(placeholder, container)
      // 没有子节点指向占位的空文本节点
      vnode.el = placeholder.el
      break
    default:
      // 多个子节点，遍历挂载之
      for (let i = 0; i < children.length; i++) {
        mount(children[i], container, isSVG)
      }
      // 多个子节点，指向第一个子节点
      vnode.el = children[0].el
  }
}
```

## 挂载Portal

Portal 可以不严谨地认为是可以被到处挂载的 Fragment

Portal 的 VNode 其 tag 属性值为挂载点(选择器或真实DOM元素)

挂载就是实现将其 VNode 的 children 中所包含的子 VNode 挂载到 tag 属性所指向的挂载点

虽然 Portal 的内容可以被渲染到任意位置，但它的行为仍然像普通的DOM元素一样，如事件的捕获/冒泡机制仍然按照代码所编写的DOM结构实施。要实现这个功能就必须需要一个占位的DOM元素来承接事件。

```js
function mountPortal(vnode, container) {
  const { tag, children, childFlags } = vnode

  // 获取挂载点
  const target = typeof tag === 'string' ? document.querySelector(tag) : tag

  if (childFlags & ChildrenFlags.SINGLE_VNODE) {
    // 将 children 挂载到 target 上，而非 container
    mount(children, target)
  } else if (childFlags & ChildrenFlags.MULTIPLE_VNODES) {
    for (let i = 0; i < children.length; i++) {
      // 将 children 挂载到 target 上，而非 container
      mount(children[i], target)
    }
  }

  // 占位的空文本节点
  const placeholder = createTextVNode('')
  // 将该节点挂载到 container 中
  mountText(placeholder, container, null)
  // el 属性引用该节点
  vnode.el = placeholder.el

}
```

## 挂载组件函数mountComponent

```js
function mountComponent(vnode, container, isSVG) {
  if (vnode.flags & VNodeFlags.COMPONENT_STATEFUL) {
    mountStatefulComponent(vnode, container, isSVG)
  } else {
    mountFunctionalComponent(vnode, container, isSVG)
  }
}
```

## 有状态组件的挂载和原理

有状态组件的挂载函数 ： mountStatefulComponent

如果一个 VNode 描述的是有状态组件，那么 vnode.tag 属性值就是组件类的引用，所以通过 new 关键字创建组件实例。

组件的 render 函数会返回该组件产出的 VNode

```js
function mountStatefulComponent(vnode, container, isSVG) {
  // 创建组件实例
  const instance = new vnode.tag()
  // 渲染VNode
  instance.$vnode = instance.render()
  // 挂载 已经转换为其他类型如标签类型VNode
  mount(instance.$vnode, container, isSVG)
  // el 属性值 和 组件实例的 $el 属性都引用组件的根DOM元素
  instance.$el = vnode.el = instance.$vnode.el
}
```

```js
class MyComponent {
  render() {
    return h(
      'div',
      {
        style: {
          background: 'green'
        }
      },
      [
        h('span', null, '我是组件的标题1......'),
        h('span', null, '我是组件的标题2......')
      ]
    )
  }
}

// h 函数的第一个参数是组件类
const compVnode = h(MyComponent)
render(compVnode, document.getElementById('app'))
```

## 函数式组件的挂载和原理

函数式组件就是一个返回 VNode 的函数

```js
function MyFunctionalComponent() {
  // 返回要渲染的内容描述，即 VNode
  return h(
    'div',
    {
      style: {
        background: 'green'
      }
    },
    [
      h('span', null, '我是组件的标题1......'),
      h('span', null, '我是组件的标题2......')
    ]
  )
}
```

如果一个 VNode 描述的是函数式组件，那么其 tag 属性值就是该函数的引用

函数式组件的挂载函数描述：

```js
function mountFunctionalComponent(vnode, container, isSVG) {
  // 获取 VNode
  const $vnode = vnode.tag()
  // 挂载
  mount($vnode, container, isSVG)
  // el 元素引用该组件的根元素
  vnode.el = $vnode.el
}
```

相对于有状态组件,函数式组件只有 props 和 slots，它要做的工作很少，所以性能上会更好

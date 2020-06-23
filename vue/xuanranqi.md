
# 渲染器

## 渲染器概念

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

## 挂载函数 mount

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

### 挂载普通标签元素 mountElement

```js
function mountElement(vnode, container, isSVG) {
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
        case 'class':
          if (isSVG) {
            el.setAttribute('class', data[key])
          } else {
            el.className = data[key]
          }
          break  
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


  container.appendChild(el)
}
```

# 渲染器-patch

对新旧 VNode 进行比对，并以合适的方式更新DOM，也就是我们常说的 patch

***

render函数先判断如果没有旧VNode会直接挂载，如果有旧VNode，会对新旧 VNode 进行比对，也就是我们所说的 diff

diff对比原则：
只有相同类型的 VNode 才有比对的意义。如果不同类型，替换，重新mount。

```js
function patch(prevVNode, nextVNode, container) {
  // 分别拿到新旧 VNode 的类型，即 flags
  const nextFlags = nextVNode.flags
  const prevFlags = prevVNode.flags

  // 检查新旧 VNode 的类型是否相同，如果类型不同，则直接调用 replaceVNode 函数替换 VNode
  // 如果新旧 VNode 的类型相同，则根据不同的类型调用不同的比对函数
  if (prevFlags !== nextFlags) {
    replaceVNode(prevVNode, nextVNode, container)
  } else if (nextFlags & VNodeFlags.ELEMENT) {
    patchElement(prevVNode, nextVNode, container)
  } else if (nextFlags & VNodeFlags.COMPONENT) {
    patchComponent(prevVNode, nextVNode, container)
  } else if (nextFlags & VNodeFlags.TEXT) {
    patchText(prevVNode, nextVNode)
  } else if (nextFlags & VNodeFlags.FRAGMENT) {
    patchFragment(prevVNode, nextVNode, container)
  } else if (nextFlags & VNodeFlags.PORTAL) {
    patchPortal(prevVNode, nextVNode)
  }
}

```

## 替换VNode

replaceVNode

```js
function replaceVNode(prevVNode, nextVNode, container) {
  // 将旧的 VNode 所渲染的 DOM 从容器中移除
  container.removeChild(prevVNode.el)
  // 再把新的 VNode 挂载到容器中
  mount(nextVNode, container)
}
```

## 更新标签元素patchElement

### 基本规则

如果新旧 VNode 描述的是不同的标签，则调用 replaceVNode 函数，使用新的 VNode 替换旧的 VNode

如果新旧VNode是相同标签，新旧VNode的差异就只会出现在VNodeData 和 children。只需要对比这两项。

```js
function patchElement(prevVNode, nextVNode, container) {
  // 如果新旧 VNode 描述的是不同的标签，则调用 replaceVNode 函数，使用新的 VNode 替换旧的 VNode
  if (prevVNode.tag !== nextVNode.tag) {
    replaceVNode(prevVNode, nextVNode, container)
    return
  }

  // 如果新旧VNode是相同标签，新旧VNode的差异就只会出现在VNodeData 和 children。只需要对比这两项。
  // 拿到 el 元素，注意这时要让 nextVNode.el 也引用该元素
  const el = (nextVNode.el = prevVNode.el)
  // 拿到 新旧 VNodeData
  const prevData = prevVNode.data
  const nextData = nextVNode.data

  // 新的 VNodeData 存在时才有必要更新
  if (nextData) {
    // 遍历新的 VNodeData
    for (let key in nextData) {
      // 根据 key 拿到新旧 VNodeData 值
      const prevValue = prevData[key]
      const nextValue = nextData[key]
      patchData(el, key, prevValue, nextValue)
    }
  }

  if (prevData) {
    // 遍历旧的 VNodeData，将已经不存在于新的 VNodeData 中的数据移除
    for (let key in prevData) {
      const prevValue = prevData[key]
      if (prevValue && !nextData.hasOwnProperty(key)) {
        // 第四个参数为 null，代表移除数据
        patchData(el, key, prevValue, null)
      }
    }
  }

  // 调用 patchChildren 函数递归地更新子节点
  patchChildren(
    prevVNode.childFlags, // 旧的 VNode 子节点的类型
    nextVNode.childFlags, // 新的 VNode 子节点的类型
    prevVNode.children,   // 旧的 VNode 子节点
    nextVNode.children,   // 新的 VNode 子节点
    el                    // 当前标签元素，即这些子节点的父节点
  )
}

```

### 更新VNodeData

规则：遍历新的 VNodeData，将旧值和新值都传递给 patchData 函数，并由 patchData 函数负责更新数据；同时也需要遍历旧的 VNodeData，将已经不存在于新的 VNodeData 中的数据从元素上移除

patchData : 接收新旧数据作为参数。 封装了 与 mountElement 函数中完整的用来处理 VNodeData 数据 类似的代码 。使patchData可以在 挂载函数mountElement 和 更新函数 patchElement中共同使用。

```js
export function patchData(el, key, prevValue, nextValue) {
  switch (key) {
    case 'style':
      // 将新的样式数据应用到元素
      for (let k in nextValue) {
        el.style[k] = nextValue[k]
      }
      // 移除已经不存在的样式
      for (let k in prevValue) {
        if (!nextValue.hasOwnProperty(k)) {
          el.style[k] = ''
        }
      }
      break
    case 'class':
      el.className = nextValue
      break
    default:
      if (key[0] === 'o' && key[1] === 'n') {
        // 事件
        // 移除旧事件
        if (prevValue) {
          el.removeEventListener(key.slice(2), prevValue)
        }
        // 添加新事件
        if (nextValue) {
          el.addEventListener(key.slice(2), nextValue)
        }
      } else if (domPropsRE.test(key)) {
        // 当作 DOM Prop 处理
        el[key] = nextValue
      } else {
        // 当作 Attr 处理
        el.setAttribute(key, nextValue)
      }
      break
  }
}
```

### 更新子节点

VNode 的类型标识在 patch 阶段是非常重要的信息

使用了嵌套的 switch...case 语句，外层的 switch...case 语句用来匹配旧的 children 的类型，而内层的 switch...case 语句则用来匹配新的 children 的类型。由于新旧 children 各有三种情况，所以合起来共有九种(3 * 3)情况，根据不同的情况我们所做的操作也会不同。

子节点有3种情况：单个，没有，多个

- 旧children是单个子节点:
  - 新旧 children 都是单个子节点，等价于两个 children(单个子节点)之间的比较，所以只需要递归地调用 patch 函数即可
  - 旧的 children 是单个子节点，而新的 children 为 null，即新的 VNode 没有子节点。在这种情况下我们只需要把旧的子节点移除即可，
  - 当旧的 children 类型为 ChildrenFlags.SINGLE_VNODE，而新的 children 类型为多个子节点时的情况，在这种情况下由于旧的子节点只有一个，而新的子节点有多个，所以我们可以采用将旧的单个子节点移除，再将新的多个子节点挂载上去的方案
- 旧的没有子节点:
  - 情况一：新的子节点为单个子节点，此时只需要把新的单个子节点添加到容器元素即可。
  - 情况二：同时也没有新的子节点，那自然什么都不用做了。
  - 情况三：没有旧的子节点、但有多个新的子节点，那把这多个子节点都添加到容器元素即可。
- 旧的多个子节点:
  - 情况一：有多个旧的子节点，但新的子节点是单个子节点，这时只需要把所有旧的子节点移除，再将新的单个子节点添加到容器元素即可。
  - 情况二：有多个旧的子节点，但没有新的子节点，这时只需要把所有旧的子节点移除即可。
  - **情况三：新旧子节点都是多个子节点，这时将进入到至关重要的一步，即核心 diff 算法的用武之地。**

```js
function patchChildren(
  prevChildFlags,
  nextChildFlags,
  prevChildren,
  nextChildren,
  container
) {
  switch (prevChildFlags) {
    // 旧的 children 是单个子节点，会执行该 case 语句块
    case ChildrenFlags.SINGLE_VNODE:
      switch (nextChildFlags) {
        case ChildrenFlags.SINGLE_VNODE:
          // 新的 children 也是单个子节点时，会执行该 case 语句块
          // 此时 prevChildren 和 nextChildren 都是 VNode 对象
          patch(prevChildren, nextChildren, container)
          break
        case ChildrenFlags.NO_CHILDREN:
          // 新的 children 中没有子节点时，会执行该 case 语句块
          container.removeChild(prevChildren.el)
          break
        default:
          // 新的 children 中有多个子节点时，会执行该 case 语句块
          // 移除旧的单个子节点
          container.removeChild(prevChildren.el)
          // 遍历新的多个子节点，逐个挂载到容器中
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container)
          }
          break
      }
      break
    // 旧的 children 中没有子节点时，会执行该 case 语句块
    case ChildrenFlags.NO_CHILDREN:
      switch (nextChildFlags) {
        case ChildrenFlags.SINGLE_VNODE:
          // 新的 children 是单个子节点时，会执行该 case 语句块
          // 使用 mount 函数将新的子节点挂载到容器元素
          mount(nextChildren, container)
          break
        case ChildrenFlags.NO_CHILDREN:
          // 新的 children 中没有子节点时，会执行该 case 语句块
          break
        default:
          // 新的 children 中有多个子节点时，会执行该 case 语句块
          // 遍历多个新的子节点，逐个使用 mount 函数挂载到容器元素
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container)
          }
          break
      }
      break
    // 旧的 children 中有多个子节点时，会执行该 case 语句块
    default:
      switch (nextChildFlags) {
        case ChildrenFlags.SINGLE_VNODE:
          // 新的 children 是单个子节点时，会执行该 case 语句块
          for (let i = 0; i < prevChildren.length; i++) {
            container.removeChild(prevChildren[i].el)
          }
          mount(nextChildren, container)
          break
        case ChildrenFlags.NO_CHILDREN:
          // 新的 children 中没有子节点时，会执行该 case 语句块
          for (let i = 0; i < prevChildren.length; i++) {
            container.removeChild(prevChildren[i].el)
          }
          break
        default:
          // 新的 children 中有多个子节点时，会执行该 case 语句块
          // 以下为粗暴算法演示代码，并非真正实现的diff代码。
          // 遍历旧的子节点，将其全部移除
          for (let i = 0; i < prevChildren.length; i++) {
            container.removeChild(prevChildren[i].el)
          }
          // 遍历新的子节点，将其全部添加
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container)
          }
          break
      }
      break
  }
}
```

## 更新文本节点

如果一个 DOM 元素是文本节点或注释节点，那么可以通过调用该 DOM 对象的 nodeValue 属性读取或设置文本节点(或注释节点)的内容

```js
function patchText(prevVNode, nextVNode) {
  // 拿到文本元素 el，同时让 nextVNode.el 指向该文本元素
  const el = (nextVNode.el = prevVNode.el)
  // 只有当新旧文本内容不一致时才有必要更新
  if (nextVNode.children !== prevVNode.children) {
    el.nodeValue = nextVNode.children
  }
}
```

## 更新Fragment

由于 Fragment 没有包裹元素，只有子节点，所以我们对 Fragment 的更新本质上就是更新两个片段的“子节点”

```js
function patchFragment(prevVNode, nextVNode, container) {
  // 直接调用 patchChildren 函数更新 新旧片段的子节点即可
  patchChildren(
    prevVNode.childFlags, // 旧片段的子节点类型
    nextVNode.childFlags, // 新片段的子节点类型
    prevVNode.children,   // 旧片段的子节点
    nextVNode.children,   // 新片段的子节点
    container
  )

  // el挂载
  switch (nextVNode.childFlags) {
    case ChildrenFlags.SINGLE_VNODE:
      nextVNode.el = nextVNode.children.el
      break
    case ChildrenFlags.NO_CHILDREN:
      nextVNode.el = prevVNode.el
      break
    default:
      nextVNode.el = nextVNode.children[0].el
  }
}

```

## 更新Portal

Portal的更新，需要更新其子节点，和挂载目标可能不同

调用 appendChild 方法向 DOM 中添加元素时，如果被添加的元素已存在于页面上，那么就会移动该元素到目标容器元素下

当新旧挂载目标不一致时，需要把旧容器内的元素都搬运到新容器中。由于经过 patchChildren 函数的处理之后，新的子节点已经存在于旧的容器中了 ， 所以调用 appendChild 方法将这些已经存在于旧容器中的子节点搬运过去即可。

```js
patchPortal (prevVNode, nextVNode){
  patchChildren(
    prevVNode.childFlags,
    nextVNode.childFlags,
    prevVNode.children,
    nextVNode.children,
    prevVNode.tag // 注意容器元素是旧的 container
  )

  // 让 nextVNode.el 指向 prevVNode.el
  nextVNode.el = prevVNode.el

  // 如果新旧容器不同，才需要搬运
  if (nextVNode.tag !== prevVNode.tag) {
    // 获取新的容器元素，即挂载目标
    const container =
      typeof nextVNode.tag === 'string'
        ? document.querySelector(nextVNode.tag)
        : nextVNode.tag

    switch (nextVNode.childFlags) {
      case ChildrenFlags.SINGLE_VNODE:
        // 如果新的 Portal 是单个子节点，就把该节点搬运到新容器中
        container.appendChild(nextVNode.children.el)
        break
      case ChildrenFlags.NO_CHILDREN:
        // 新的 Portal 没有子节点，不需要搬运
        break
      default:
        // 如果新的 Portal 是多个子节点，遍历逐个将它们搬运到新容器中
        for (let i = 0; i < nextVNode.children.length; i++) {
          container.appendChild(nextVNode.children[i].el)
        }
        break
    }
  }
}
```

## 更新有状态组件

更新方式有两种：主动更新 和 被动更新。

### 主动更新

组件的核心是渲染函数，渲染函数会产出 VNode，渲染器会将渲染函数产出的 VNode 渲染为真实 DOM

当组件的状态变化时我们需要做的就是重新执行渲染函数并产出新的 VNode，最后通过新旧 VNode 之间的补丁算法完成真实 DOM 的更新

示例代码，简单概述了更新过程示例 : 组件data变更时，调用_update()更新。并有_mounted标识组件是否已经被挂载。

如果已挂载，需要进行更新,执行组件render，生成新的VNode，再执行patch进行对比更新。

当前示例再组件内自行this._update更新

```js
function mountStatefulComponent(vnode, container, isSVG) {
  // 创建组件实例
  const instance = new vnode.tag()

  instance._update = function() {
    // 如果 instance._mounted 为真，说明组件已挂载，应该执行更新操作
    if (instance._mounted) {
      // 1、拿到旧的 VNode
      const prevVNode = instance.$vnode
      // 2、重渲染新的 VNode
      const nextVNode = (instance.$vnode = instance.render())
      // 3、patch 更新
      patch(prevVNode, nextVNode, prevVNode.el.parentNode)
      // 4、更新 vnode.el 和 $el
      instance.$el = vnode.el = instance.$vnode.el
    } else {
      // 1、渲染VNode
      instance.$vnode = instance.render()
      // 2、挂载
      mount(instance.$vnode, container, isSVG)
      // 3、组件已挂载的标识
      instance._mounted = true
      // 4、el 属性值 和 组件实例的 $el 属性都引用组件的根DOM元素
      instance.$el = vnode.el = instance.$vnode.el
      // 5、调用 mounted 钩子
      instance.mounted && instance.mounted()
    }
  }

  instance._update()
}
```

### props简单理解

组件的外部状态 props

组件实例创建完成之后，我们为组件实例添加了 $props 属性，并且将 vnode.data 赋值给 $props。这样，子组件中就可以通过 this.$props.text 访问从父组件传递进来的 props 数据

```js

<!-- 父组件模板 -->
<template>
  <ChildComponent :text="localState" />
</template>

// 父组件描述类
class ParentComponent {
  // 本地状态
  localState = 'one'
  render() {
    childCompVNode = h(ChildComponent, {
      text: this.localState
    })
    return childCompVNode
  }
}

// 有状态组件挂载函数
function mountStatefulComponent(vnode, container, isSVG) {
  // 创建组件实例
  const instance = (vnode.children = new vnode.tag())
  // 初始化 props
  instance.$props = vnode.data
  // 省略...
}

// 子组件类
class ChildComponent {
  render() {
    // 通过 this.$props.text 访问外部数据
    return h('div', null, this.$props.text)
  }
}

```

## 被动更新

被动更新指的是由外部状态变化而引起的更新操作，通常父组件自身状态的变化可能会引起子组件的更新

在 _update 函数内部的更新操作，等价于 prevCompVNode 和 nextCompVNode 之间的 patch。会执行patchComponent更新

每个类型为有状态组件的 VNode，在挂载期间我们都会让其 children 属性引用组件的实例，以便能够通过 VNode 访问组件实例对象

VNode 将插槽内容存储在单独的 slots 属性中,children 属性就可以用来存储组件实例了，

```js
function patchComponent(prevVNode, nextVNode, container) {
  // 检查组件是否是有状态组件
  if (nextVNode.flags & VNodeFlags.COMPONENT_STATEFUL_NORMAL) {
    // 1、获取组件实例
    const instance = (nextVNode.children = prevVNode.children)
    // 2、更新 props
    instance.$props = nextVNode.data
    // 3、更新组件
    instance._update()
  }
}

```

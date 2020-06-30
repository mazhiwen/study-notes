# 渲染器的核心 Diff 算法

新旧子节点的类型都是多个子节点时，核心 Diff 算法才派得上用场

***

## 提升一：减小DOM操作的性能开销

减少“移除”和“新建” DOM 元素带来的性能开销。例如pathcElement函数过程中，复用已有 DOM 元素，需要更新的只有 VNodeData 和 children。

## 提升二：尽可能的复用 DOM 元素

### key

h 函数创建 VNode 时，通过 VNodeData 为即将创建的 VNode 设置一个 key, 再将key 添加到 VNode 本身以方便访问

判断新 children 中的节点是否可被复用 ： 遍历新 children 中的每一个节点，并去旧 children 中寻找是否存在具有相同 key 值的节点

这时相同key，相同文本，只有顺序不同的节点，就认为新 children 中的节点可以复用旧 children 中已存在的节点，不会重新设置text文本。

### 找到需要移动的节点

寻找过程中在旧 children 中所遇到的最大索引值lastIndex。如果在后续寻找的过程中发现存在索引值比最大索引值小的节点，意味着该节点需要被移动。

遍历新节点，并再每个新节点中找对应key相等的旧节点，对比lastIndex和和当前新节点对应的再旧节点中的顺序

```js
// 用来存储寻找过程中遇到的最大索引值 lastIndex 初始化0
let lastIndex = 0
// 遍历新的 children
for (let i = 0; i < nextChildren.length; i++) {
  const nextVNode = nextChildren[i]
  let j = 0,
    find = false;
  // 遍历旧的 children
  for (j; j < prevChildren.length; j++) {
    const prevVNode = prevChildren[j]
    // 如果找到了具有相同 key 值的两个节点，则调用 `patch` 函数更新之
    if (nextVNode.key === prevVNode.key) {
      find = true;
      patch(prevVNode, nextVNode, container)
      if (j < lastIndex) {
        // 需要移动
        // refNode 是为了下面调用 insertBefore 函数准备的
        const refNode = nextChildren[i - 1].el.nextSibling
        // 调用 insertBefore 函数移动 DOM
        container.insertBefore(prevVNode.el, refNode)
      } else {
        // 更新 lastIndex
        lastIndex = j
      }
      break // 这里需要 break
    }
  }
  if (!find) {
    // 挂载新节点
    // 找到 refNode
    const refNode =
      i - 1 < 0
        ? prevChildren[0].el
        : nextChildren[i - 1].el.nextSibling
    mount(nextVNode, container, false, refNode)
  }
}

// 移除已经不存在的节点
// 遍历旧的节点
for (let i = 0; i < prevChildren.length; i++) {
  const prevVNode = prevChildren[i]
  // 拿着旧 VNode 去新 children 中寻找相同的节点
  const has = nextChildren.find(
    nextVNode => nextVNode.key === prevVNode.key
  )
  if (!has) {
    // 如果没有找到相同的节点，则移除
    container.removeChild(prevVNode.el)
  }
}

```

### 移动节点

```
旧： a b c
新： c a b
```

把 li-a 节点对应的真实 DOM 移动到 li-c 节点所对应真实 DOM 的后面。移动的是真实 DOM 而非 VNode

### 添加新元素

```
旧： a b c
新： c a d b
```

find值 ： 如果内层循环结束后，变量 find 的值仍然为 false，则说明在旧的 children 中找不到可复用的节点 。这时我们就用 mount 函数将当前遍历到的节点挂载到容器元素

使用 insertBefore 方法代替 appendChild 方法，例如：我们可以找到 li-a 节点所对应真实 DOM 的下一个节点，然后将 li-d 节点插入到该节点之前即可

### 移除不存在的元素

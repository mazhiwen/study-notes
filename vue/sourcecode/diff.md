# 渲染器的核心 Diff 算法

新旧子节点的类型都是多个子节点时，核心 Diff 算法才派得上用场

***

## 提升一：减小DOM操作的性能开销

减少“移除”和“新建” DOM 元素带来的性能开销。例如pathcElement函数过程中，复用已有 DOM 元素，需要更新的只有 VNodeData 和 children。

## 提升二：尽可能的复用 DOM 元素

本小节是React的算法

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

外层循环结束之后，再优先遍历一次旧的 children，并尝试拿着旧 children 中的节点去新 children 中寻找相同的节点，如果找不到则说明该节点已经不存在于新 children 中了，这时我们应该将该节点对应的真实 DOM 移除

## 提升三：双端比较

Vue2 所采用的算法

借鉴于开源项目：snabbdom，但最早采用双端比较算法的库是 citojs

### 原理

使用四个变量 oldStartIdx、oldEndIdx、newStartIdx 以及 newEndIdx 分别存储旧 children 和新 children 的两个端点的位置索引

这4个点都分别进行对比，一共4次对比

```js
let oldStartIdx = 0
let oldEndIdx = prevChildren.length - 1
let newStartIdx = 0
let newEndIdx = nextChildren.length - 1

while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
  // 4次查找不到 赋值的undefined判断
  if (!oldStartVNode) {
    oldStartVNode = prevChildren[++oldStartIdx]
  } else if (!oldEndVNode) {
    oldEndVNode = prevChildren[--oldEndIdx]
  else if (oldStartVNode.key === newStartVNode.key) {
    // 步骤一：oldStartVNode 和 newStartVNode 比对
    // 调用 patch 函数更新
    patch(oldStartVNode, newStartVNode, container)
    // 更新索引，指向下一个位置
    oldStartVNode = prevChildren[++oldStartIdx]
    newStartVNode = nextChildren[++newStartIdx]
  } else if (oldEndVNode.key === newEndVNode.key) {
    // 步骤二：oldEndVNode 和 newEndVNode 比对
    // 调用 patch 函数更新
    // 不需要进行移动操作的，只需要调用 patch 函数更新即可
    patch(oldEndVNode, newEndVNode, container)
    // 更新索引，指向下一个位置
    oldEndVNode = prevChildren[--oldEndIdx]
    newEndVNode = nextChildren[--newEndIdx]
  } else if (oldStartVNode.key === newEndVNode.key) {
    // 步骤三：oldStartVNode 和 newEndVNode 比对
    // 调用 patch 函数更新
    patch(oldStartVNode, newEndVNode, container)
    // 将 oldStartVNode.el 移动到 oldEndVNode.el 的后面，也就是 oldEndVNode.el.nextSibling 的前面
    container.insertBefore(
      oldStartVNode.el,
      oldEndVNode.el.nextSibling
    )
    // 更新索引，指向下一个位置
    oldStartVNode = prevChildren[++oldStartIdx]
    newEndVNode = nextChildren[--newEndIdx]
  } else if (oldEndVNode.key === newStartVNode.key) {
    // 步骤四：oldEndVNode 和 newStartVNode 比对
    // 先调用 patch 函数完成更新
    patch(oldEndVNode, newStartVNode, container)
    // 更新完成后，将容器中最后一个子节点移动到最前面，使其成为第一个子节点
    container.insertBefore(oldEndVNode.el, oldStartVNode.el)
    // 更新索引，指向下一个位置
    oldEndVNode = prevChildren[--oldEndIdx]
    newStartVNode = nextChildren[++newStartIdx]
  } else {
    // 当4次查找都找不到的时候
    // 新 children 中的第一个节点尝试去旧 children 中寻找，试图找到拥有相同 key 值的节点
    // 遍历旧 children，试图寻找与 newStartVNode 拥有相同 key 值的元素
    const idxInOld = prevChildren.findIndex(
      node => node.key === newStartVNode.key
    )
    if (idxInOld >= 0) {
      // vnodeToMove 就是在旧 children 中找到的节点，该节点所对应的真实 DOM 应该被移动到最前面
      const vnodeToMove = prevChildren[idxInOld]
      // 调用 patch 函数完成更新
      patch(vnodeToMove, newStartVNode, container)
      // 把 vnodeToMove.el 移动到最前面，即 oldStartVNode.el 的前面
      container.insertBefore(vnodeToMove.el, oldStartVNode.el)
      // 由于旧 children 中该位置的节点所对应的真实 DOM 已经被移动，所以将其设置为 undefined
      prevChildren[idxInOld] = undefined
    } else {
      // newStartVNode 是一个全新的节点
      // 使用 mount 函数挂载新节点
      mount(newStartVNode, container, false, oldStartVNode.el)
    }
    // 将 newStartIdx 下移一位
    newStartVNode = nextChildren[++newStartIdx]
  }
}

if (oldEndIdx < oldStartIdx) {
  // 添加新节点
  for (let i = newStartIdx; i <= newEndIdx; i++) {
    mount(nextChildren[i], container, false, oldStartVNode.el)
  }
} else if (newEndIdx < newStartIdx) {
  // 移除操作
  for (let i = oldStartIdx; i <= oldEndIdx; i++) {
    container.removeChild(prevChildren[i].el)
  }
}
```

### 双端比较的优势

双端比较在移动 DOM 方面更具有普适性，不会因为 DOM 结构的差异而产生影响

### 非理想情况的处理方式

双端比较的中 ①、②、③、④ 这四步中的每一步比对，都无法找到可复用的节点的时候。我们只能拿新 children 中的第一个节点尝试去旧 children 中寻找，试图找到拥有相同 key 值的节点

旧 children 中的这个节点所对应的真实 DOM 在新 children 的顺序中，已经变成了第一个节点。所以我们要把该节点所对应的真实 DOM 移动到最前头

### 添加新元素

节点是一个全新的节点,所以只要把它挂载到位于 oldStartIdx 位置的节点所对应的真实 DOM 前面就可以了，即 oldStartVNode.el

如果在循环结束之后 oldEndIdx 的值小于 oldStartIdx 的值则说明新的 children 中存在还没有被处理的全新节点，这时我们应该调用 mount 函数将其挂载到容器元素中，我们只需要把这些全新的节点添加到 oldStartIdx 索引所指向的节点之前即可

### 移除不存在的元素

认为循环结束后，一旦满足条件 newEndIdx < newStartId 则说明有元素需要被移除

## 提升四：inferno所采用的核心Diff算法及原理

在 Vue3 中将采用另外一种核心 Diff 算法，它借鉴于 ivi 和 inferno

### 逻辑一：相同的前置和后置元素

预处理：“去掉”相同的前置/后置节点

一个while 循环向后遍历，一个while 循环向前遍历，再处理新加节点，和移除节点

使用 javascript 中的 label 语句

```js
// 逻辑一：
outer: {
  // 更新相同的前缀节点
  // j 为指向新旧 children 中第一个节点的索引
  let j = 0
  let prevVNode = prevChildren[j]
  let nextVNode = nextChildren[j]
  // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
  while (prevVNode.key === nextVNode.key) {
    // 调用 patch 函数更新
    patch(prevVNode, nextVNode, container)
    j++
    // 旧 children 中的所有节点都已经参与了 patch,没有必要再执行后续的操作
    if (j > prevEnd || j > nextEnd) {
      break outer
    }
    prevVNode = prevChildren[j]
    nextVNode = nextChildren[j]
  }
  // while 循环向前遍历，直到遇到拥有不同 key 值的节点为止
  // 更新相同的后缀节点
  // 指向旧 children 最后一个节点的索引
  let prevEnd = prevChildren.length - 1
  // 指向新 children 最后一个节点的索引
  let nextEnd = nextChildren.length - 1
  prevVNode = prevChildren[prevEnd]
  nextVNode = nextChildren[nextEnd]
  // while 循环向前遍历，直到遇到拥有不同 key 值的节点为止
  while (prevVNode.key === nextVNode.key) {
    // 调用 patch 函数更新
    patch(prevVNode, nextVNode, container)
    prevEnd--
    nextEnd--
    // 新 children 中的所有节点都已经参与了 patch,没有必要再执行后续的操作
    if (j > prevEnd || j > nextEnd) {
      break outer
    }
    prevVNode = prevChildren[prevEnd]
    nextVNode = nextChildren[nextEnd]
  }
}

if (j > prevEnd && j <= nextEnd) {
  // 满足条件，则说明从 j -> nextEnd 之间的节点应作为新节点插入
  // j -> nextEnd 之间的节点应该被添加
  // 所有新节点应该插入到位于 nextPos 位置的节点的前面
  const nextPos = nextEnd + 1
  const refNode =
    nextPos < nextChildren.length ? nextChildren[nextPos].el : null
  // 采用 while 循环，调用 mount 函数挂载节点
  while (j <= nextEnd) {
    mount(nextChildren[j++], container, false, refNode)
  }
} else if (j > nextEnd) {
  // j -> prevEnd 之间的节点应该被移除
  while (j <= prevEnd) {
    container.removeChild(prevChildren[j++].el)
  }
} else {

  // 处理预处理前后之后，剩下的需要被处理的节点
  // 逻辑二：
  // 构造 source 数组
  const nextLeft = nextEnd - j + 1  // 新 children 中剩余未处理节点的数量
  const source = []
  for (let i = 0; i < nextLeft; i++) {
    source.push(-1)
  }
  const prevStart = j
  const nextStart = j
  let moved = false
  let pos = 0
  // 构建索引表
  const keyIndex = {}
  for(let i = nextStart; i <= nextEnd; i++) {
    keyIndex[nextChildren[i].key] = i
  }
  let patched = 0
  // 遍历旧 children 的剩余未处理节点
  for(let i = prevStart; i <= prevEnd; i++) {
    prevVNode = prevChildren[i]
    if (patched < nextLeft) {
      // 通过索引表快速找到新 children 中具有相同 key 的节点的位置
      const k = keyIndex[prevVNode.key]
      if (typeof k !== 'undefined') {
        nextVNode = nextChildren[k]
        // patch 更新
        patch(prevVNode, nextVNode, container)
        patched++
        // 更新 source 数组
        source[k - nextStart] = i
        // 判断是否需要移动
        if (k < pos) {
          moved = true
        } else {
          pos = k
        }
      } else {
        // 没找到，说明旧节点在新 children 中已经不存在了，应该移除
        container.removeChild(prevVNode.el)
      }
    } else {
      // 多余的节点，应该移除
      container.removeChild(prevVNode.el)
    }
  }

}

```

### 逻辑二：判断是否需要进行 DOM 移动

react，vue2的DIFF的重点都是：判断是否有节点需要移动，以及应该如何移动和寻找出那些需要被添加或移除

source数组 : 它的长度与“去掉”相同的前置/后置节点后新 children 中剩余未处理节点的数量相等，并存储着新 children 中的节点在旧 children 中位置，后面我们会根据 source 数组计算出一个最长递增子序列，并用于 DOM 移动操作

建立了 moved 变量作为标识，当它的值为 true 时则说明需要进行 DOM 移动

建立索引表，用空间换时间的方式，复杂度能够降低到 O(n)

拿旧 children 中的节点尝试去新 children 中寻找具有相同 key 值的节点。最终目的：对新旧 children 中具有相同 key 值的节点进行更新，同时检测是否需要移动操作。

### 逻辑三：DOM 移动的方式

根据 source 数组计算一个最长递增子序列 seq 。seq的结果是source中最长递增子序列值的索引的数组

使用两个索引 i 和 j 分别指向新 children 中剩余未处理节点的最后一个节点和最长递增子序列数组中的最后一个位置，并从后向前遍历，如下代码所示：

```js
if (moved) {
  const seq = lis(source)
  // j 指向最长递增子序列的最后一个值
  let j = seq.length - 1
  // 从后向前遍历新 children 中的剩余未处理节点
  for (let i = nextLeft - 1; i >= 0; i--) { // i值是从 剩余数组长度-1 到 0
    if (source[i] === -1) {
      // 作为全新的节点挂载
      // 该节点在新 children 中的真实位置索引
      const pos = i + nextStart
      const nextVNode = nextChildren[pos]
      // 该节点下一个节点的位置索引
      const nextPos = pos + 1
      // 挂载
      mount(
        nextVNode,
        container,
        false,
        nextPos < nextChildren.length
          ? nextChildren[nextPos].el
          : null
      )
    } else if (i !== seq[j]) {
      // 说明该节点需要移动
      // 该节点在新 children 中的真实位置索引
      const pos = i + nextStart
      const nextVNode = nextChildren[pos]
      // 该节点下一个节点的位置索引
      const nextPos = pos + 1
      // 移动
      container.insertBefore(
        nextVNode.el,
        nextPos < nextChildren.length
          ? nextChildren[nextPos].el
          : null
      )
    } else {
      // 当 i === seq[j] 时，说明该位置的节点不需要移动
      // 并让 j 指向下一个位置
      j--
    }
  }
}

```

### 求解最长递增子序列

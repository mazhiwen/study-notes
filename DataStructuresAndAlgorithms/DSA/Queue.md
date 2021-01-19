<https://juejin.im/post/6844903646900011021>

# 队列

队列是遵循FIFO（First In First Out，先进先出）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

## 实现

```js
// Queue类
function Queue () {
  this.items = [];

  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.front = front;
  this.isEmpty = isEmpty;
  this.size = size;
  this.clear = clear;
  this.print = print;
}
```

- enqueue(element)：向队列尾部添加新项

- dequeue()：移除队列的第一项（即排在队列最前面的项），并返回被移除的元素

- front()：返回队列中第一个元素，队列不做任何变动，和Stack的peek()方法类似

- isEmpty()：如果队列中不包含任何元素，返回true，否则返回false

- size()：返回队列包含的元素个数，与数组的length属性类似

- print()：打印队列中的元素

- clear()：清空整个队列

```js
// 向队列尾部添加元素
function enqueue (element) {
  this.items.push(element);
}

// 移除队列的第一个元素，并返回被移除的元素
function dequeue () {
  return this.items.shift();
}

// 返回队列的第一个元素
function front () {
  return this.items[0];
}

// 判断是否为空队列
function isEmpty () {
  return this.items.length === 0;
}

// 获取队列的长度
function size () {
  return this.items.length;
}

// 清空队列
function clear () {
  this.items = [];
}

// 打印队列里的元素
function print () {
  console.log(this.items.toString());
}
```

```js
// 创建Queue实例
var queue = new Queue();

console.log(queue.isEmpty());     // true
queue.enqueue("John");            // undefined
queue.enqueue("Jack");            // undefined
queue.enqueue("Camila");          // undefined
queue.print();                    // "John,Jack,Camila"
console.log(queue.size());        // 3
console.log(queue.isEmpty());     // false
queue.dequeue();                  // "John"
queue.dequeue();                  // "Jack"
queue.print();                    // "Camila"
queue.clear();                    // undefined
console.log(queue.size());        // 0
```

## 优先队列（堆）

堆 的文章见主目录堆

<https://juejin.cn/post/6844903826856607757>

<https://blog.csdn.net/ACM_hades/article/details/89671679>

实现一般是 等同于 堆结构

大根堆 或者 小根堆 （完全二叉树）

优先队列，元素的添加和移除是依赖优先级的

优先队列： 可以插入新元素。可以快速取出所有元素的最值。

### 最小优先队列 最大优先队列

优先队列分为两类：最小优先队列 最大优先队列

最小优先队列 : 是把优先级的值最小的元素被放置到队列的最前面（代表最高的优先级）。比如有四个元素："John", "Jack", "Camila", "Tom"，他们的优先级值分别为4，3，2，1。最大优先队列正好相反

### 实现一个优先队列，有两种选项

1. 设置优先级，根据优先级正确添加元素，然后和普通队列一样正常移除
2. 设置优先级，和普通队列一样正常按顺序添加，然后根据优先级移除

### 实现最小优先队列

其中的enqueue 和 print 方法

```js
// 优先队列添加元素，要根据优先级判断在队列中的插入顺序
function enqueue (element, priority) {
  var queueElement = {
    element: element,
    priority: priority
  };

  if (this.isEmpty()) {
    this.items.push(queueElement);
  } else {
    var added = false;

    for (var i = 0; i < this.size(); i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break ;
      }
    }

    if (!added) {
      this.items.push(queueElement);
    }
  }
}

// 打印队列里的元素
function print () {
  var strArr = [];

  strArr = this.items.map(function (item) {
    return `${item.element}->${item.priority}`;
  });

  console.log(strArr.toString());
}
```

## 双端队列

双端队列相比队列多了两端都可以出入元素，因此普通队列中的获取队列大小、清空队列、队列判空、获取队列中的所有元素这些方法同样存在于双端队列中且实现代码与之相同。

## 循环队列

循环队列的一个例子就是击鼓传花游戏（Hot Potato）: 在这个游戏中，孩子们围城一个圆圈，击鼓的时候把花尽快的传递给旁边的人。某一时刻击鼓停止，这时花在谁的手里，谁就退出圆圈直到游戏结束。重复这个过程，直到只剩一个孩子（胜者）。

```js
// 实现击鼓传花
function hotPotato (nameList, num) {
  var queue = new Queue();

  for (var i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }

  var eliminated = '';

  while (queue.size() > 1) {
    // 循环num次，队首出来去到队尾
    for (var i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    // 循环num次过后，移除当前队首的元素
    eliminated = queue.dequeue();
    console.log(`${eliminated}在击鼓传花中被淘汰！`);
  }

  // 最后只剩一个元素
  return queue.dequeue();
}

// 测试
var nameList = ["John", "Jack", "Camila", "Ingrid", "Carl"];
var winner = hotPotato(nameList, 10);
console.log(`最后的胜利者是：${winner}`);
```

## 题目：滑动窗口中的最大值(优先队列)

<https://leetcode-cn.com/problems/sliding-window-maximum/solution/hua-dong-chuang-kou-zui-da-zhi-by-leetco-ki6m/>

给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。

```
输入: nums = [1,3,-1,-3,5,3,6,7], 和 滑动窗口k = 3
输出: [3,3,5,5,6,7] 
```

```
解释:

滑动窗口的位置 最大值

[1 3 -1] -3 5 3 6 7 3
1 [3 -1 -3] 5 3 6 7 3
1 3 [-1 -3 5] 3 6 7 5
1 3 -1 [-3 5 3] 6 7 5
1 3 -1 -3 [5 3 6] 7 6
1 3 -1 -3 5 [3 6 7] 7
```

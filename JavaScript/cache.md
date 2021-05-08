# 内存管理

## 内存

[内存管理 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)

## 内存泄漏

[JavaScript 内存泄漏教程 - 阮一峰](https://www.ruanyifeng.com/blog/2017/04/memory-leak.html)

### 概念

内存泄漏（Memory Leak）是指程序中己动态分配的堆内存由于某种原因程序未释放或无法释放，造成系统内存的浪费，导致程序运行速度减慢甚至系统崩溃等严重后果。

指由于疏忽或错误造成程序未能释放已经不再使用的内存的情况。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，失去了对该段内存的控制，因而造成了内存的浪费。  

### 造成内存泄漏的操作

1. 意外的全局变量
2. 被遗忘的计时器或回调函数
3. 脱离 DOM 的引用。我们获取一个 DOM 元素的引用，而后面这个元素被删除，由于我们一直保留了对这个元素的引用，所以它也无法被回收。
4. 闭包
5. 循环引用

## 垃圾回收

[简单了解JavaScript垃圾回收机制](https://juejin.cn/post/6844903556265279502)

[JavaScript 中的垃圾回收](https://zhuanlan.zhihu.com/p/23992332)

按版本从旧到新的回收机制：

### 1.引用计数

每次引用 加1，为0时立即删除

```
优势

可即刻回收垃圾，当被引用数值为0时，对象马上会把自己作为空闲空间连到空闲链表上，也就是说。在变成垃圾的时候就立刻被回收。
因为是即时回收,那么‘程序’不会暂停去单独使用很长一段时间的GC，那么最大暂停时间很短。
不用去遍历堆里面的所有活动对象和非活动对象

劣势

计数器需要占很大的位置，因为不能预估被引用的上限，打个比方，可能出现32位即2的32次方个对象同时引用一个对象，那么计数器就需要32位。
最大的劣势是无法解决循环引用无法回收的问题 这就是前文中IE9之前出现的问题
```

### 2.标记-清除

```
优势：

实现简单，打标记也就是打或者不打两种可能，所以就一位二进制位就可以表示
解决了循环引用问题

缺点

造成碎片化（有点类似磁盘的碎片化）
再分配时遍次数多，如果一直没有找到合适的内存块大小，那么会遍历空闲链表(保存堆中所有空闲地址空间的地址形成的链表）一直遍历到尾端
```

这种GC方式是一个定时运行的任务，也就是说当程序运行一段时间后，统一GC，类似如图：

### 3. 复制算法

将一个内存空间分为两部分，一部分是From空间，另一部分是To空间，将From空间里面的活动对象复制到To空间，然后释放掉整个From空间，然后此刻将From空间和To空间的身份互换，那么就完成了一次GC。

## js中的堆和栈

<https://www.cnblogs.com/heioray/p/9487093.html>

<https://blog.csdn.net/GUANTINA/article/details/81533605>

在js引擎中对变量的存储主要有两种位置，堆内存和栈内存。

和java中对内存的处理类似，栈内存主要用于存储各种基本类型的变量，包括Boolean、Number、String、Undefined、Null，**以及对象变量的指针，这时候栈内存给人的感觉就像一个线性排列的空间，每个小单元大小基本相等。

而堆内存主要负责像对象Object这种变量类型的存储，如下图

在计算机领域中，堆栈是两种数据结构，它们只能在一端(称为栈顶(top))对数据项进行插入和删除。

堆：队列优先,先进先出；由操作系统自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。  

栈：先进后出；动态分配的空间 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收，分配方式倒是类似于链 表。

## 内存优化

就全局变量而言，JavaScript不能确定它在后面不能够被用到，所以它会从声明之后就一直存在于内存中，直至手动释放或者关闭页面/浏览器，这就导致了某些不必要的内存消耗。我们可以进行以下的优化。

闭包是最容易产生内存问题的，

```js
(function(){
    // 你的代码
})();
```

1、优化内存的一个最好的衡量方式就是只保留程序运行时需要的数据，对于已经使用的或者不需要的数据，应该将其值设为 null，这上面说过，叫“解除引用”。需要注意的是，解除一个值的引用不代表垃圾回收器会立即将这段内存回收，这样做的目的是让垃圾回收器在下一个回收周期到来时知道这段内存需要回收。

在内存泄漏部分，我们讨论了无意的全局变量会带来无法回收的内存垃圾。但有些时候，我们会有意识地声明一些全局变量，这个时候需要注意，如果声明的变量占用大量的内存，那么在使用完后将变量声明为 null。

2、减少内存垃圾的另一个方法就是避免创建对象。new Object() 是一个比较明显的创建对象的方式，另外 const arr = [];、const obj = {};也会创建新的对象。另外下面这种写法在每次调用函数时都会创建一个新的对象：

## setTimeout定时器

```js
console.log(1);
setTimeout(function(){console.log(2);},1000);
console.log(3);
// 1 3 2


setTimeout(function(){console.log(1);}, 0);
console.log(2);
// 先执行执行栈，再执行任务队列中的定时回调函数
// 2 1

```

- 处理倒计时误差

```js
var period = 60 * 1000 * 60 * 2
var startTime = new Date().getTime();
var count = 0
var end = new Date().getTime() + period
var interval = 1000
var currentInterval = interval

function loop() {
  count++
  var offset = new Date().getTime() - (startTime + count * interval); // 代码执行所消耗的时间
  var diff = end - new Date().getTime()
  var h = Math.floor(diff / (60 * 1000 * 60))
  var hdiff = diff % (60 * 1000 * 60)
  var m = Math.floor(hdiff / (60 * 1000))
  var mdiff = hdiff % (60 * 1000)
  var s = mdiff / (1000)
  var sCeil = Math.ceil(s)
  var sFloor = Math.floor(s)
  currentInterval = interval - offset // 得到下一次循环所消耗的时间
  console.log('时：'+h, '分：'+m, '毫秒：'+s, '秒向上取整：'+sCeil, '代码执行时间：'+offset, '下次循环间隔'+currentInterval) // 打印 时 分 秒 代码执行时间 下次循环间隔

  setTimeout(loop, currentInterval)
}

setTimeout(loop, currentInterval)
```

# Event Loop 事件循环

<http://www.ruanyifeng.com/blog/2014/10/event-loop.html>

[如何解释Event Loop面试官才满意？](https://zhuanlan.zhihu.com/p/72507900)

[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/6844903512845860872)

[从 Promise 对象讲解事件循环机制](https://mp.weixin.qq.com/s/nJsM05Yp50HDH1hqEen2eQ)

[w3c](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

## 执行栈

所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

执行有序：因为 js 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。

js引擎存在monitoring process进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去Event Queue那里检查是否有等待被调用的函数。

## 任务分类：同步异步

所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。

同步任务指的是，在**主线程**上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

异步任务指的是，不进入主线程、而进入**任务队列**（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。;  

在执行同步代码的时候，如果遇到了异步事件，js 引擎会将这个事件挂起先(被放入event table中注册)，继续执行执行栈中的其他任务。当异步事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。

## 任务队列-概念

主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

"任务队列"中的事件，除了IO设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。

"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。

## 任务队列-分类：(宏任务 微任务)

宏任务 : script脚本，setTimeout，setInterval，setImmediate, requestAnimationFrame, 一类的定时事件，还有如 I/O 操作、UI 渲染等。

微任务 : promise回调、process.nextTick(node) 、 MutationObserver。

任务队列可以分为宏任务对列和微任务对列

当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。

当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。

执行顺序： 宏任务 -> 微任务 -> 宏任务 -> 微任务 。。。。

```js
console.log('a');

setTimeout(function() {
    console.log('b');
    process.nextTick(function() {
        console.log('c');
    })
    new Promise(function(resolve) {
        console.log('d');
        resolve();
    }).then(function() {
        console.log('e')
    })
})
process.nextTick(function() {
    console.log('f');
})
new Promise(function(resolve) {
    console.log('g');
    resolve();
}).then(function() {
    console.log('h')
})

setTimeout(function() {
    console.log('i');
    process.nextTick(function() {
        console.log('j');
    })
    new Promise(function(resolve) {
        console.log('k');
        resolve();
    }).then(function() {
        console.log('l')
    })
})

```

```
输出顺序:
第一轮事件循环: a g f h
第二轮事件循环：b d c e
第三轮事件循环: i k j l

```

## setTimeout

setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行。并不是立即执行

根据HTML的标准，最低是4毫秒。

setTimeout(fn,num) 也并不是确定num毫秒后执行，因为很有可能前面的主线程任务占用时间，超过注册当前setTimeout的num时间

## setInterval

对于setInterval(fn,ms)来说，我们已经知道不是每过ms秒会执行一次fn，而是每过ms秒，会有fn进入Event Queue

setInterval 的作用是每隔一段指定时间执行一个函数，但是这个执行不是真的到了时间立即执行，它真正的作用是每隔一段时间将事件加入事件队列中去，只有当当前的执行栈为空的时候，才能去从事件队列中取出事件执行。所以可能会出现这样的情况，就是当前执行栈执行的时间很长，导致事件队列里边积累多个定时器加入的事件，当执行栈结束的时候，这些事件会依次执行，因此就不能到间隔一段时间执行的效果。

针对 setInterval 的这个缺点，我们可以使用 setTimeout 递归调用来模拟 setInterval，这样我们就确保了只有一个事件结束了，我们才会触发下一个定时器事件，这样解决了 setInterval 的问题。

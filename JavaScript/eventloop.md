## Event Loop

<http://www.ruanyifeng.com/blog/2014/10/event-loop.html>

<https://mp.weixin.qq.com/s/nJsM05Yp50HDH1hqEen2eQ>

<https://zhuanlan.zhihu.com/p/72507900>

> JavaScript是一种单线程语言;  
>  
> HTML5提出Web Worker: 允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。;<br>
>  
> 没有Event loop时，常规是"同步模式"（synchronous I/O）或"堵塞模式"（blocking I/O）;  
>  
>"Event Loop是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）";  
>  
> 有Event loop，可以实现异步模式"（asynchronous I/O）或"非堵塞模式"（non-blocking mode）;
>  
> 于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。;  
>  
> 主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。;  

**主线程执行栈 和 任务队列**

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

**任务队列**

"任务队列"是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在"任务队列"中添加一个事件，表示相关的异步任务可以进入"执行栈"了。主线程读取"任务队列"，就是读取里面有哪些事件。

"任务队列"中的事件，除了IO设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。

所谓"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。但是，由于存在后文提到的"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。

**宏任务 微任务**

<https://zhuanlan.zhihu.com/p/72507900>

<https://www.jianshu.com/p/53e8597dfa48>

<https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model>

macrotask 和 microtask 表示异步任务的两种分类。

宏任务包括：script(整体代码)，I/O， setTimeout，setInterval，requestAnimationFrame（浏览器），setImmediate（node）。

微任务包括： Promise(和then)，MutationObserver(浏览器)，process.nextTick(node)，Object.observe(已废弃)。

> 执行顺序 :script(主程序代码)—> process.nextTick —> Promises… ——> setTimeout ——> setInterval ——> setImmediate——> I/O——> UI rendering
>
> 执行逻辑: 这种分类的执行方式就是，执行一个宏任务，过程中遇到微任务时，将其放到微任务的事件队列里，当前宏任务执行完成后，会查看微任务的事件队列，依次执行里面的微任务。如果还有宏任务的话，再重新开启宏任务……

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
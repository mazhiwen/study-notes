
# web worker

<https://juejin.cn/post/6844903696258564110>

HTML5标准

允许一段JavaScript程序运行在主线程之外的另外一个线程中

在主线程运行的同时，Worker（子）线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。

```js
if (window.Worker) {…… your code ……}
```

## 实践方案

[像Event Emitter一样使用Web Worker](https://juejin.cn/post/6844904029349216264)

## 创建

一个worker是使用一个构造函数 Worker() 创建的一个对象

这个构造函数需要传入一个JavaScript文件，这个文件包含将在工作线程中运行的代码。类似于这样：

```js
let myWorker = new Worker('worker.js');
```

## 通信

worker通过postMessage() 方法和onmessage事件进行数据通信。主线程和子线程是双向的，都可以发送和监听事件。向一个worker发送消息需要这样做（main.js）：

index.js:

```js
myWorker.postMessage('hello, world'); // 发送
myWorker.onmessage = function (event) { // 接收
 console.log('Received message ' + event.data);
 doSomething();
}
```

worker.js:

```js
window.addEventListener('message', function (e) {
 window.postMessage('You said: ' + e.data);
}, false);
```

## 关闭

当子线程运行结束后，使用完毕，为了节省系统资源，可以手动关闭子线程。如果worker没有监听消息，那么当所有任务执行完毕（包括计数器）后，它就会自动关闭。

```js
// 在主线程中关闭
worker.terminate();
// 在子线程里线程
close();

// 监听 error 事件
worker.addEventListener('error', function (e) {
  console.log('ERROR', e);
});

```

## 同源限制

分配给Worker 线程运行的脚本文件（worker.js），必须与主线程的脚本文件(main.js)同源

可用Blob

## 访问限制

Worker子线程所在的全局对象，与主线程不在同一个上下文环境，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象，global对象的指向有变更，window需要改写成self，不能执行alert()方法和confirm()等方法，只能读取部分navigator对象内的数据。另外chrome的console.log()倒是可以使用，也支持debugger断点，增加调试的便利性。

## 使用异步

Worker子线程中可以使用XMLHttpRequest 对象发出 AJAX 请求，可以使用setTimeout() setInterval()方法，也可使用websocket进行持续链接。也可以通过importScripts(url)加载另外的脚本文件，但是仍然不能跨域。

## 应用场景

1、使用专用线程进行数学运算
Web Worke设计的初衷就是用来做计算耗时任务，大数据的处理，而这种计算放在worker中并不会中断前台用户的操作，避免代码卡顿带来不必要的用户体验。例如处理ajax返回的大批量数据，读取用户上传文件，计算MD5，更改canvas的位图的过滤，分析视频和声频文件等。worker中除了缺失了DOM和BOM操作能力以外，还是拥有非常强大的js逻辑运算处理的能力的，相当于nodejs一个级别的的运行环境。

2、高频的用户交互
高频的用户交互适用于根据用户的输入习惯、历史记录以及缓存等信息来协助用户完成输入的纠错、校正功能等类似场景，用户频繁输入的响应处理同样可以考虑放在web worker中执行。例如，我们可以 做一个像Word一样的应用：当用户打字时后台在词典中进行查找，帮助用户自动纠错等等。

3、数据的预取
对于一些有大量数据的前后台交互产品，可以新开一个线程专门用来进行数据的预取和缓冲数据，本地web数据库的行写入和更改，长时间持续的运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断，也有利于随时响应主线程的通信。也可以配合XMLHttpRequest和websocket进行不断开的通信，实现守卫进程。

## 兼容

不兼容IE9

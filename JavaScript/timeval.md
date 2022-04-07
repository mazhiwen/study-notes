# 定时器

## setInterval

不会立即执行

```js
var intervalID = scope.setInterval(func, delay, [arg1, arg2, ...]);
var intervalID = scope.setInterval(code, delay);
```

### delay参数

是每次延迟的毫秒数 (一秒等于1000毫秒)，函数的每次调用会在该延迟之后发生。和setTimeout一样，实际的延迟时间可能会稍长一点。这个时间计算单位是毫秒（千分之一秒），这个定时器会使指定方法或者代码段执行的时候进行时间延迟。如果这个参数值小于10，则默认使用值为10。请注意，真正延迟时间或许更长

## setTimeout

```js
var timeoutID = scope.setTimeout(function[, delay][,arg1, ..., argN]);

```

arg1, ..., argN 可选: 附加参数，一旦定时器到期，它们会作为参数传递给function

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

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

# requestAnimationFrame

<https://blog.csdn.net/vhwfr2u02q/article/details/79492303>

<https://juejin.cn/post/6844903761102536718>

使用 requestAnimationFrame 本身是不能保证满帧运行的，requestAnimationFrame 保证的是在浏览器每一次重绘后会执行对应传入的回调函数，想要保证满帧，只能让 JS 在一个 Tick 内的运行时间不超过 17ms。

60hz = 60次/1s 。 执行方法每次小于17ms就可以保证满帧

按帧对网页进行重绘。该方法告诉浏览器希望执行动画并请求浏览器在下一次重绘之前调用回调函数来更新动画

在运行时浏览器会自动优化方法的调用:

显示器有固定的刷新频率（60Hz 或 75Hz），也就是说，每秒最多只能重绘 60 次或 75 次，requestAnimationFrame 的基本思想让页面重绘的频率与这个刷新频率保持同步
比如显示器屏幕刷新率为 60Hz，使用requestAnimationFrame API，那么回调函数就每1000ms / 60 ≈ 16.7ms执行一次；如果显示器屏幕的刷新率为 75Hz，那么回调函数就每1000ms / 75 ≈ 13.3ms执行一次。

通过requestAnimationFrame调用回调函数引起的页面重绘或回流的时间间隔和显示器的刷新时间间隔相同。所以 requestAnimationFrame 不需要像setTimeout那样传递时间间隔，而是浏览器通过系统获取并使用显示器刷新频率

## requestAnimationFrame用法

对频繁执行的方法添加requestAnimationFrame

requestAnimationFrame执行一次，代表执行一次handler，并不是无限执行

```js
requestAnimationFrame(function(timestap: performance.now()){
  // ...
})
```

```js
var progress = 0;
//回调函数
function render() {
  progress += 1; //修改图像的位置
  if (progress < 100) {
    //在动画没有结束前，递归渲染
    window.requestAnimationFrame(render);
  }else{
    cancelAnimationFrame(render);
  }
}
//第一帧渲染
window.requestAnimationFrame(render);
```

## cancelAnimationFrame

```js
cancelAnimationFrame(handle);
```

## 优点

使用 requestAnimationFrame 执行动画，最大优势是能保证回调函数在屏幕每一次刷新间隔中只被执行一次，这样就不会引起丢帧，动画也就不会卡顿

cpu节能：当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停。不同于setTimeOut

一个刷新间隔内函数执行多次时没有意义的，因为显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来

在高频事件（resize，scroll等）中，使用requestAnimationFrame可以防止在一个刷新间隔内发生多次函数执行，这样保证了流畅性，也节省了函数执行的开销

某些情况下可以直接使用requestAnimationFrame替代 Throttle 函数，都是限制回调函数执行的频率

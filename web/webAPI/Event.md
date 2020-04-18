# **event**

MDN参考:<https://developer.mozilla.org/zh-CN/docs/Web/Events>

<https://developer.mozilla.org/en-US/docs/Web/API/Event>

浏览器中, js引擎线程会循环从 任务队列 中读取事件并且执行, 这种运行机制称作 Event Loop (事件循环).

input  焦点keyup

body监听 keyup? 回车？

## 1. Event Loop

<http://www.ruanyifeng.com/blog/2014/10/event-loop.html>
<https://mp.weixin.qq.com/s/nJsM05Yp50HDH1hqEen2eQ>
<https://zhuanlan.zhihu.com/p/72507900>

- 以JavaScript语言为例，它是一种单线程语言

- HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

- 没有Event loop时，常规是"同步模式"（synchronous I/O）或"堵塞模式"（blocking I/O）

- "Event Loop是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）"

- 有Event loop，可以实现异步模式"（asynchronous I/O）或"非堵塞模式"（non-blocking mode）

- 于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

- 主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

## 2. 事件流

### 2.1 事件冒泡

事件冒泡(event bubbling)的概念：

即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。

```html
<html>
<body>
  <div>2</div>
</body>
</html>
<!-- 
  比如一个div 
  沿着DOM树传递顺序: div > body > html > document
-->
```

### 2.2 事件捕获

(event capturing）。事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在事件到达预定目标之前捕获它。

```html
<!-- 
  按照上面的例子，传播顺序
  document > html > body > div
 -->
```

> 一般建议使用冒泡，特殊时使用捕获

### 2.3 事件流

事件流包括3个阶段: 事件捕获阶段 > 处于目标阶段 > 事件冒泡阶段

```html
<!-- 
  按照上面的例子,
  事件捕获阶段 : document > html > body >  
  处于目标阶段 : div >  
  事件冒泡阶段 : body > html > document
 -->
```

## 3. 事件处理程序

addEventListener

addEventListener(事件名称,事件处理程序的函数,布尔值)

布尔值: true表示在捕获阶段调用事件处理程序
false表示在冒泡阶段调用事件处理程序

addEventListener多个时会按照添加它们的顺序触发。

通过addEventListener添加的事件处理程序只能使用 removeEventListener()来移除。移除时传入的参数与添加时使用的参数相同。

通过 addEventListener 添加的匿名函数将无法删除

## 3. event 事件对象

在触发DOM上的某个事情时，会产生一个事件对象event。



## 4. drag 拖动

需要draggable = "true"

拖动的元素事件流:  

- dragstart  

- drag 持续  

- dragend

拖动移动到的目标元素事件流:  

- dragenter  

- dragover  

```js
/* 放下目标节点时触发事件 */
  document.addEventListener("dragover", function( event ) {
      // 阻止默认动作
      event.preventDefault();
  }, false);
```

- dragleave

- drop

```js
document.addEventListener("drop", function( event ) {
  // 阻止默认动作（如打开一些元素的链接）
  event.preventDefault();
  // 移动拖动的元素到所选择的放置目标节点
  if ( event.target.className == "dropzone" ) {
      event.target.style.background = "";
      dragged.parentNode.removeChild( dragged );
      event.target.appendChild( dragged );
  }
}, false);
```

## 5. mouse 鼠标

### mouse事件type

mouseover: 在鼠标穿过元素和子元素的时候都会触发一次，并重新初始化mouse事件
mouseout：指针移出元素，或者移到它的子元素上。（会冒泡），每个当前元素以及子元素移出都会触发

mouseenter: 只有鼠标穿过绑定元素，才会触发mouseenter，且子元素不冒泡
mouseleave: 指针移出元素范围外。（不冒泡）

mousedown: 在元素上按下任意鼠标按钮。
mouseup: 在元素上释放任意鼠标按键。
mousemove: 指针在元素内移动时持续触发。

### MouseEvent

<https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/>

- MouseEvent.clientX

它提供事件发生时的应用客户端区域的水平坐标 (与页面坐标不同)

## 6. 键盘按键

### keyDown

<https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent>

KeyboardEvent.keycode大全

<https://www.cnblogs.com/daysme/p/6272570.html>

## 7. 焦点事件

focus:获得焦点(不冒泡)

blur:失去焦点(不冒泡)

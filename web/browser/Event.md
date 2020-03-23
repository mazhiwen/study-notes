## **event**

MDN参考:<https://developer.mozilla.org/zh-CN/docs/Web/Events>

<https://developer.mozilla.org/en-US/docs/Web/API/Event>

浏览器中, js引擎线程会循环从 任务队列 中读取事件并且执行, 这种运行机制称作 Event Loop (事件循环).

### 事件冒泡

事件冒泡的概念：

绑定事件在父元素，当子元素有该事件类型发生时，会触发刚才父元素绑定的对应事件

### event 实例对象

### drag 拖动

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

### mouse 鼠标

#### mouse事件type

mouseover: 在鼠标穿过元素和子元素的时候都会触发一次，并重新初始化mouse事件
mouseout：指针移出元素，或者移到它的子元素上。（会冒泡），每个当前元素以及子元素移出都会触发

mouseenter: 只有鼠标穿过绑定元素，才会触发mouseenter，且子元素不冒泡
mouseleave: 指针移出元素范围外。（不冒泡）

mousedown: 在元素上按下任意鼠标按钮。
mouseup: 在元素上释放任意鼠标按键。
mousemove: 指针在元素内移动时持续触发。

#### MouseEvent

<https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/>

- MouseEvent.clientX

它提供事件发生时的应用客户端区域的水平坐标 (与页面坐标不同)

### 键盘按键

#### keyDown

<https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent>

KeyboardEvent.keycode大全

<https://www.cnblogs.com/daysme/p/6272570.html>

### 焦点事件

focus:获得焦点(不冒泡)

blur:失去焦点(不冒泡)

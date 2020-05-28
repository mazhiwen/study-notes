# Event

MDN参考:<https://developer.mozilla.org/zh-CN/docs/Web/Events>

<https://developer.mozilla.org/en-US/docs/Web/API/Event>

***

input  焦点keyup

body监听 keyup? 回车？

## 事件流

**事件冒泡**

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

**事件捕获**

(event capturing）。事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在事件到达预定目标之前捕获它。

```html
<!-- 
  按照上面的例子，传播顺序
  document > html > body > div
 -->
```

> 一般建议使用冒泡，特殊时使用捕获

**事件流**

事件流包括3个阶段: 事件捕获阶段 > 处于目标阶段 > 事件冒泡阶段

```html
<!-- 
  按照上面的例子,
  事件捕获阶段 : document > html > body >  
  处于目标阶段 : div >  
  事件冒泡阶段 : body > html > document
 -->
```

## 事件处理程序

addEventListener

addEventListener(事件名称,事件处理程序的函数, useCapture)

useCapture (布尔值):true表示在捕获阶段调用事件处理程序,false表示在冒泡阶段调用事件处理程序

addEventListener多个时会按照添加它们的顺序触发。

通过addEventListener添加的事件处理程序只能使用 removeEventListener()来移除。移除时传入的参数与添加时使用的参数相同。

通过 addEventListener 添加的匿名函数将无法删除

默认会冒泡

## Event 事件对象

参考《JavaScript高级程序设计

在触发DOM上的某个事情时，会产生一个事件对象event。

**cancelable**

表明该事件是否可以被取消, true时才能被preventDefault();

**preventDefault()**

**stopPropagation()**

立即停止事件在DOM层次中的传播，取消进一步的事件捕获或冒泡

## 事件类型

**UI事件**

不一定与用户操作有关的事件。

- load: 当页面完全加载后在window上触发；或者图像加载完在\<img>元素触发；或者嵌入元素\<object>
- error: window img object
- resize: window或框架，大小变化时

**焦点事件**

页面获得或失去焦点时触发，(document.hasFocus(), document.activeElement)

- blur 不会冒泡
- focus 不会冒泡
- focusin 会冒泡
- focusout 会冒泡

**鼠标与滚轮**

**键盘与文本**

**复合**

**变动**

**HTML5**

**设备**

**触摸与手势**

## drag 拖动

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

## mouse 鼠标

**mouse事件type**

mouseover: 在鼠标穿过元素和子元素的时候都会触发一次，并重新初始化mouse事件
mouseout：指针移出元素，或者移到它的子元素上。（会冒泡），每个当前元素以及子元素移出都会触发

mouseenter: 只有鼠标穿过绑定元素，才会触发mouseenter，且子元素不冒泡
mouseleave: 指针移出元素范围外。（不冒泡）

mousedown: 在元素上按下任意鼠标按钮。
mouseup: 在元素上释放任意鼠标按键。
mousemove: 指针在元素内移动时持续触发。

**MouseEvent**

<https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/>

- MouseEvent.clientX

它提供事件发生时的应用客户端区域的水平坐标 (与页面坐标不同)

## 键盘按键

**keyDown**

<https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent>

KeyboardEvent.keycode大全

<https://www.cnblogs.com/daysme/p/6272570.html>

## 焦点事件

focus:获得焦点(不冒泡)

blur:失去焦点(不冒泡)

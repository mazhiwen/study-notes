GUI渲染线程
javascript引擎线程
浏览器事件触发线程
HTTP请求线程


浏览器中, js引擎线程会循环从 任务队列 中读取事件并且执行, 这种运行机制称作 Event Loop (事件循环).


## **event**

MDN参考:https://developer.mozilla.org/zh-CN/docs/Web/Events

### event 实例对象



###  **drag 拖动**

需要draggable = "true"

拖动的元素事件流:  
dragstart  
drag 持续  
dragend

拖动移动到的目标元素事件流:  
dragenter  
dragover  
dragleave  
drop

### **mouse 鼠标**

mouseover: 在鼠标穿过元素和子元素的时候都会触发一次，并重新初始化mouse事件
mouseout：指针移出元素，或者移到它的子元素上。（会冒泡），每个当前元素以及子元素移出都会触发

mouseenter: 只有鼠标穿过绑定元素，才会触发mouseenter，且子元素不会。（不冒泡）
mouseleave: 指针移出元素范围外。（不冒泡）

### **焦点事件**

focus:获得焦点(不冒泡)

blur:失去焦点(不冒泡)



## **HTMLElement**


## **元素窗口距离**

- 元素距离视口 包括元素外部滚动  读写

Element.scrollLeft: 这个元素的顶部到视口可见内容（的顶部）的距离的度量

Element.scrollTop: 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离

- 元素相对于offsetParent的偏移量 只读

相对于  HTMLElement.offsetParent 节点的左边界偏移的像素值

HTMLElement.offsetLeft: 返回当前元素左上角相对于  HTMLElement.offsetParent 节点的左边界偏移的像素值

HTMLElement.offsetTop: 获取对象相对于版面或由offsetTop属性指定的父坐标的计算顶端位置


- 元素本身 包括元素内部滚动 只读

offsetHeight: 返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。

offsetWidth: 获得对象的可视区域的宽度，包括边框

- 元素内部 只读

对于没有定义CSS或者内联布局盒子的元素为0，否则，它是元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距

clientHeight: 获得对象边框内部分的高度

clientWidth: 获得对象边框内部分的宽度


- 元素本身 只读

一个元素顶部边框的宽度（以像素表示）。不包括顶部外边距或内边距。

clientTop: 获取元素顶部边框宽度

clientLeft: 获取对象左侧边框宽度

- 元素本身 包括滚动 只读

Element.scrollWidth: 表示元素内容的宽度，包括由于滚动而未显示在屏幕中内容

Element.scrollHeight: 获取对象的滚动高度。



## **http**

### 1.1



### 2.0


### https



## **SessionStorage, LocalStorage, Cookie**

参考：https://harttle.land/2014/10/01/http.html#header-5


## **URL**

URL() 构造函数返回一个新创建的 URL 对象，表示由一组参数定义的 URL。

```js
url = new URL(url, [base])

```

属性

- origin:
- host





## **document**





## **window**


### **window.postMessage**

```js
/*
 * A窗口的域名是<http://example.com:8080>，以下是A窗口的script标签下的代码：
 */

var popup = window.open(...popup details...);

// 如果弹出框没有被阻止且加载完成

// 这行语句没有发送信息出去，即使假设当前页面没有改变location（因为targetOrigin设置不对）
popup.postMessage("The user is 'bob' and the password is 'secret'",
                  "https://secure.example.net");

// 假设当前页面没有改变location，这条语句会成功添加message到发送队列中去（targetOrigin设置对了）
popup.postMessage("hello there!", "http://example.org");

function receiveMessage(event)
{
  // 我们能相信信息的发送者吗?  (也许这个发送者和我们最初打开的不是同一个页面).
  if (event.origin !== "http://example.org")
    return;

  // event.source 是我们通过window.open打开的弹出页面 popup
  // event.data 是 popup发送给当前页面的消息 "hi there yourself!  the secret response is: rheeeeet!"
}
window.addEventListener("message", receiveMessage, false);

```


```js
// 父页面发送
window.onload = () => {
  document.getElementById('iframe').contentWindow.postMessage(
    {
      type:2
    },
    'http://localhost:8081',
  );
};
//子页面发送
window.parent.postMessage()
// 监听
window.addEventListener('message',(event)=>{
  if(event.origin !== new URL('url').origin)
        return;
  console.log(event);
});

```
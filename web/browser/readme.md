# 浏览器

目录：

- [浏览器内核](#浏览器内核)
- [URL](#URL)
- [devtools](#devtools)
- [requestAnimationFrame](#requestAnimationFrame)
- [DOMContentLoaded事件和Load事件的区别](#DOMContentLoaded事件和Load事件的区别)
- [Canvas和SVG有什么区别](#Canvas和SVG有什么区别)
- [浏览器端的存储技术](#浏览器端的存储技术)
- [如何实现浏览器内多个标签页之间的通信](#如何实现浏览器内多个标签页之间的通信)
- [IE各版本和Chrome可以并行下载多少个资源](#IE各版本和Chrome可以并行下载多少个资源)
- [浏览器架构](#浏览器架构)

参考：

Google开发者：<https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn>

<https://juejin.im/book/5bdc715fe51d454e755f75ef/section/5bdc7207f265da613c09425d>

***

## 浏览器内核

### 理解

主要分成两部分：渲染引擎和 JS 引擎。

渲染引擎的职责就是渲染，即在浏览器窗口中显示所请求的内容。默认情况下，渲染引擎可以显示 html、xml 文档及图片，它也
可以借助插件（一种浏览器扩展）显示其他类型数据，例如使用 PDF 阅读器插件，可以显示 PDF 格式。

JS 引擎：解析和执行 javascript 来实现网页的动态效果。

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。

### 常见的浏览器内核

Trident：这种浏览器内核是 IE 浏览器用的内核，因为在早期 IE 占有大量的市场份额，所以这种内核比较流行，以前有很多网页也是根据这个内核的标准来编写的，但是实际上这个内核对真正的网页标准支持不是很好。但是由于 IE 的高市场占有率，微软也很长时间没有更新 Trident 内核，就导致了 Trident 内核和 W3C 标准脱节。还有就是 Trident 内核的大量 Bug 等安全问题没有得到解决，加上一些专家学者公开自己认为 IE 浏览器不安全的观点，使很多用户开始转向其他浏览器。

Gecko：这是 Firefox 和 Flock 所采用的内核，这个内核的优点就是功能强大、丰富，可以支持很多复杂网页效果和浏览器扩展接口，但是代价是也显而易见就是要消耗很多的资源，比如内存。

Presto：Opera 曾经采用的就是 Presto 内核，Presto 内核被称为公认的浏览网页速度最快的内核，这得益于它在开发时的天生优势，在处理 JS 脚本等脚本语言时，会比其他的内核快3倍左右，缺点就是为了达到很快的速度而丢掉了一部分网页兼容性。

Webkit：Webkit 是 Safari 采用的内核，它的优点就是网页浏览速度较快，虽然不及Presto 但是也胜于 Gecko 和 Trident，缺点是对于网页代码的容错性不高，也就是说对网页代码的兼容性较低，会使一些编写不标准的网页无法正确显示。WebKit前身是 KDE 小组的 KHTML 引擎，可以说 WebKit 是 KHTML 的一个开源的分支。

Blink：谷歌在 Chromium Blog 上发表博客，称将与苹果的开源浏览器核心 Webkit 分道扬镳，在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。其实 Blink 引擎就是 Webkit 的一个分支，就像 webkit 是KHTML 的分支一样。Blink 引擎现在是谷歌公司与 Opera Software 共同研发，上面提到过的，Opera 弃用了自己的 Presto内核，加入 Google 阵营，跟随谷歌一起研发 Blink。

### 常见浏览器所用内核

（1） IE 浏览器内核：Trident 内核，也是俗称的 IE 内核；

（2） Chrome 浏览器内核：统称为 Chromium 内核或 Chrome 内核，以前是 Webkit 内核，现在是 Blink内核；

（3） Firefox 浏览器内核：Gecko 内核，俗称 Firefox 内核；

（4） Safari 浏览器内核：Webkit 内核；

（5） Opera 浏览器内核：最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核；

（6） 360浏览器、猎豹浏览器内核：IE + Chrome 双内核；

（7） 搜狗、遨游、QQ 浏览器内核：Trident（兼容模式）+ Webkit（高速模式）；

（8） 百度浏览器、世界之窗内核：IE 内核；

（9） 2345浏览器内核：好像以前是 IE 内核，现在也是 IE + Chrome 双内核了；

（10）UC 浏览器内核：这个众口不一，UC 说是他们自己研发的 U3 内核，但好像还是基于 Webkit 和 Trident ，还有说
是基于火狐内核。

## URL

URL() 构造函数返回一个新创建的 URL 对象，表示由一组参数定义的 URL。

```js
url = new URL(url, [base])

```

属性

**origin**

**host**

**pathname**

URL接口的pathname属性是一个USVString，包含一个初始 '/' 和URL的路径(如果没有路径，则为空字符串)

```js
var url = new URL('https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname');

var result = url.pathname; // Returns:"/en-US/docs/Web/API/URL/pathname"
```

## devtools

Performance

<https://www.jianshu.com/p/d8795ff8e079>

**pending**

**chrome性能工具**

<https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/>

## requestAnimationFrame

<https://blog.csdn.net/vhwfr2u02q/article/details/79492303>

与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

```js
var progress = 0;
//回调函数
function render() {
    progress += 1; //修改图像的位置
    if (progress < 100) {
    //在动画没有结束前，递归渲染
    window.requestAnimationFrame(render);
  }
}
//第一帧渲染
window.requestAnimationFrame(render);
```

**优点：**

cpu节能：当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停

函数节流：使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。

## DOMContentLoaded 事件和 Load 事件的区别

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的加载完成。

Load 事件是当所有资源加载完成后触发的。

```js
// 不兼容老的浏览器，兼容写法见[jQuery中ready与load事件](http://www.imooc.com/code/3253)，或用jQuery
document.addEventListener("DOMContentLoaded", function() {
   // ...代码...
}, false);

window.addEventListener("load", function() {
    // ...代码...
}, false);
```

## Canvas和SVG有什么区别

Canvas 是一种通过 JavaScript 来绘制 2D 图形的方法。Canvas 是逐像素来进行渲染的，因此当我们对 Canvas 进行缩放时，会出现锯齿或者失真的情况。

SVG 是一种使用 XML 描述 2D 图形的语言。SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。我们可以为某个元素附加 JavaScript 事件监听函数。并且 SVG 保存的是图形的绘制方法，因此当 SVG 图形缩放时并不会失真。

## 如何实现浏览器内多个标签页之间的通信

（1）使用 WebSocket，通信的标签页连接同一个服务器，发送消息到服务器后，服务器推送消息给所有连接的客户端。

（2）使用 SharedWorker （只在 chrome 浏览器实现了），两个页面共享同一个线程，通过向线程发送数据和接收数据来实现标签页之间的双向通行。

（3）可以调用 localStorage、cookies 等本地存储方式，localStorge 另一个浏览上下文里被添加、修改或删除时，它都会触发一个 storage 事件，我们通过监听 storage 事件，控制它的值来进行页面信息通信；

（4）如果我们能够获得对应标签页的引用，通过 postMessage 方法也是可以实现多个标签页通信的。

## IE各版本和Chrome可以并行下载多少个资源

 （1）  IE6 2 个并发

 （2）  iE7 升级之后的 6 个并发，之后版本也是 6 个

 （3）  Firefox，chrome 也是6个

## 浏览器架构

```
* 用户界面
  * 主进程
  * 内核
    * 渲染引擎
    * JS 引擎
      * 执行栈
    * 事件触发线程
      * 消息队列
        * 微任务
        * 宏任务
    * 网络异步线程
    * 定时器线程
```

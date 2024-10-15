# 浏览器

目录：

- [BOM](#BOM)
- [浏览器内核](#浏览器内核)
- [URL](#URL)
- [devtools](#devtools)
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

## BOM

BOM 是 Browser Object Model，浏览器对象模型。

BOM 顾名思义其实就是为了控制浏览器的行为而出现的接口。

BOM 是为了操作浏览器出现的 API，window 是其的一个对象。

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

## 监听视窗激活状态

```js
// 窗口激活状态监听
let vEvent = 'visibilitychange';
if (document.webkitHidden != undefined) {
    vEvent = 'webkitvisibilitychange';
}

function visibilityChanged() {
    if (document.hidden || document.webkitHidden) {
        document.title = '客官，别走啊~'
        console.log("Web page is hidden.")
    } else {
        document.title = '客官，你又回来了呢~'
        console.log("Web page is visible.")
    }
}

document.addEventListener(vEvent, visibilityChanged, false);
```

## 监听网络变化

```js
var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
var type = connection.effectiveType;

function updateConnectionStatus() {
  console.log("Connection type changed from " + type + " to " + connection.effectiveType);
  type = connection.effectiveType;
}

connection.addEventListener('change', updateConnectionStatus);
```



## 当我们输入一个页面地址时，发生了哪些事情呢？

[你不知道的浏览器页面渲染机制](https://juejin.cn/post/6844903815758479374)

[再谈 load 与 DOMContentLoaded](https://juejin.cn/post/6844903623583891469)

[从输入URL后前端的知识](https://mp.weixin.qq.com/s?__biz=MzUyMTMxMTc1Ng==&mid=2247483712&idx=1&sn=545325dc5a3e84be44554809264ba39b&chksm=f9dc4223ceabcb3566be4689fb49d9868712e572eb2a6bb08cb159dc4c4f0d55b22e0b667c92&scene=21#wechat_redirect)


```
1、浏览器首先下载该地址所对应的 html 页面。

2、浏览器解析 html 页面的 DOM 结构。

3、开启下载线程对文档中的所有资源按优先级排序下载。

4、主线程继续解析文档，到达 head 节点 ，head 里的外部资源无非是外链样式表和外链 js。
发现有外链 css 或者外链 js，如果是外链 js ，则停止解析后续内容，等待该资源下载，下载完后立刻执行。如果是外链 css，继续解析后续内容。

5、解析到 body

body 里的情况比较多，body 里可能只有 DOM 元素，可能既有 DOM、也有 css、js 等资源，js 资源又有可能异步加载 图片、css、js 等。DOM 结构不同，浏览器的解析机制也不同，我们分开来讨论。

只有 DOM 元素:
这种情况比较简单了，DOM 树构建完，页面首次渲染。

有 DOM 元素、外链 js:
当解析到外链 js 的时候，该 js 尚未下载到本地，则 js 之前的 DOM 会被渲染到页面上，同时 js 会阻止后面 DOM 的构建，即后面的 DOM 节点并不会添加到文档的 DOM 树中。所以，js 执行完之前，我们在页面上看不到该 js 后面的 DOM 元素。

有 DOM 元素、外链 css:
外链 css 不会影响 css 后面的 DOM 构建，但是会阻碍渲染。简单点说，外链 css 加载完之前，页面还是白屏。

有 DOM 元素、外链 js、外链 css:
外链 js 和外链 css 的顺序会影响页面渲染，这点尤为重要。当 body 中 js 之前的外链 css 未加载完之前，页面是不会被渲染的。
当body中 js 之前的 外链 css 加载完之后，js 之前的 DOM 树和 css 合并渲染树，页面渲染出该 js 之前的 DOM 结构。

6、文档解析完毕，页面重新渲染。当页面引用的所有 js 同步代码执行完毕，触发 DOMContentLoaded 事件。

7、html 文档中的图片资源，js 代码中有异步加载的 css、js 、图片资源都加载完毕之后，load 事件触发。
```

```html
<body>
  <!-- 白屏 -->
  <div id="div1"></div>
  <!-- 白屏 -->
  <link rel="stylesheet" href="./c1.css" />
  <!-- 白屏 -->
  <link rel="stylesheet" href="./c3.css" />
  <!-- 如果此时 j1.js 尚未下载到本地，则首次渲染，此时的 DOM 树 只有 div1 ，所以页面上只会显示 div1，样式是 c1.css 和 c3.css 的并集。-->
  <!-- 如果此时 j1.js 已经下载到本地，则先执行 j1.js，页面不会渲染，所以此时仍然是白屏。-->
  <!--下面的 js 阻塞了 DOM 树的构建，所以下面的 div2 没有在文档的 DOM 树中。 -->
  <script src="http://test.com:9000/mine/load/case2/j1.js
  "></script>
  <!-- j1.js 执行完毕，继续 DOM 解析，div2 被构建在文档 DOM 树中，此时页面上有了div2 元素，样式仍然是 c1.css 和 c3.css 的并集 -->
  <link rel="stylesheet" href="./c4.css" />
  <!-- c4.css 加载完毕，重新构建render树，样式变成了 c1.css、c3.css 和 c4.css 的并集 -->
  <div id="div2"></div>
  <script>
  // 利用 performance 统计 load 加载时间。
    window.onload=function(){console.log(performance.timing.loadEventStart - performance.timing.fetchStart);}
  </script>
</body>
```

## 浏览器解析渲染

浏览器使用流式布局模型 (Flow Based Layout)。

概述步骤:

1. 处理 HTML 标记并构建 DOM 树。
2. 处理 CSS 标记并构建 CSSOM 树。
3. 将 DOM 与 CSSOM 合并成一个渲染树。
4. 根据渲染树来布局，以计算每个节点的几何信息。
5. 将各个节点绘制到屏幕上。

详细步骤:

布局流程的输出是一个“盒模型”，它会精确地捕获每个元素在视口内的确切位置和尺寸：所有相对测量值都转换为屏幕上的绝对像素。

将渲染树中的每个节点转换成屏幕上的实际像素。这一步通常称为“绘制”或“栅格化”

## defer async

[浅谈script标签的defer和async](https://segmentfault.com/a/1190000006778717)

<https://juejin.im/post/59c60691518825396f4f71a1>

```
<script src="#link("xxxx/xx/home/home.js")" type="text/javascript" async defer></script>
```

（1）脚本没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。

【js请求与DOM解析串行，加载完立即执行】

（2）defer 属性表示延迟执行引入的 JavaScript，即这段 JavaScript 加载时 HTML 并未停止解析，这两个过程是并行的。当整个 document 解析完毕后再执行脚本文件，在DOMContentLoaded 事件触发之前完成。多个脚本按顺序执行。

【js请求与DOM解析并行，DOMContentLoaded完毕后执行, 顺序执行】

（3）async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。

【js请求与DOM解析并行，加载好就执行, 执行顺序无序】

## js 延迟加载的方式

js 延迟加载，也就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。

一般有以下几种方式：

defer 属性
async 属性
动态创建 DOM 方式
使用 setTimeout 延迟方法
让 JS 最后加载

## link和script 与 阻塞解析渲染

<https://zhuanlan.zhihu.com/p/29418126>

也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，这也是都建议将script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底部，因为你可以给 script 标签添加 defer 或者 async 属性。

遇到 script 标签时，首先阻塞后续内容的解析，同时检查该script是否已经下载下来，如果已下载，便执行代码。浏览器遇到 `<script>` 且没有defer或async属性的 标签时，会触发页面渲染，因而如果前面CSS资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。JavaScript 的加载、解析与执行会阻塞文档的解析，也就是说，在构建 DOM 时，HTML 解析器若遇到了 JavaScript，那么它会暂停文档的解析，将控制权移交给 JavaScript 引擎，等 JavaScript 引擎运行完毕，浏览器再从中断的地方恢复继续解析文档。

遇到 link 标签时，不会阻塞后续内容的解析（比如 DOM 构建），检查 link 资源是否已下载，如果已下载，则构建 cssom。CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 渲染。

遇到 DOM 标签时，执行 DOM 构建，将该 DOM 元素添加到文档树中。

## 渲染页面时常见哪些不良现象？（浏览器渲染过程）

FOUC：主要指的是样式闪烁的问题，由于浏览器渲染机制（比如firefox），在 CSS 加载之前，先呈现了 HTML，就会导致展示出无样式内容，然后样式突然呈现的现象。会出现这个问题的原因主要是 css 加载时间过长，或者 css 被放在了文档底部。

白屏：有些浏览器渲染机制（比如chrome）要先构建 DOM 树和 CSSOM 树，构建完成后再进行渲染，如果 CSS 部分放在 HTML尾部，由于 CSS 未加载完成，浏览器迟迟未渲染，从而导致白屏；也可能是把 js 文件放在头部，脚本的加载会阻塞后面文档内容的解析，从而页面迟迟未渲染出来，出现白屏问题。

## DOMContentLoaded 和 Load

- DOMContentLoaded

MDN的解释：当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。

意思是HTML下载、解析完毕之后就触发。

总结： DOMContentLoaded 事件在 html文档加载完毕，并且 html 所引用的内联 js、以及外链 js 的同步代码都执行完毕后触发。

- Load

load事件是当所有资源加载完成后触发的。

MDN的解释：load 应该仅用于检测一个完全加载的页面 当一个资源及其依赖资源已完成加载时，将触发load事件。

当页面 DOM 结构中的 js、css、图片，以及 js 异步加载的 js、css 、图片都加载完成之后，才会触发 load 事件。

```

注意：
页面中引用的js 代码如果有异步加载的 js、css、图片，是会影响 load 事件触发的。
video、audio、flash 不会影响 load 事件触发。

```

## head 中资源的加载

head 中 js 资源加载都会停止后面 DOM 的构建，但是不影响后面资源的下载。

css资源不会阻碍后面 DOM 的构建，但是会阻碍页面的首次渲染。

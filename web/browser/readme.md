# 浏览器

目录：

- [存储](#存储)
- [URL](#URL)
- [window](#window)
- [浏览器渲染](#浏览器渲染)
- [devtools](#devtools)
- [从输入URL后前端的知识](#从输入URL后前端的知识)
- [link和script阻塞渲染](#link和script阻塞渲染)
- [缓存](#缓存)
- [重绘（Repaint）和回流（Reflow）](#重绘（Repaint）和回流（Reflow）)
- [requestAnimationFrame](#requestAnimationFrame)
- [DOMContentLoaded事件和Load事件的区别](#DOMContentLoaded事件和Load事件的区别)

参考：

Google开发者：<https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn>

<https://juejin.im/book/5bdc715fe51d454e755f75ef/section/5bdc7207f265da613c09425d>

***

## 存储

参考：<https://harttle.land/2014/10/01/http.html#header-5>

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

## window

**window.postMessage**

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

## 浏览器渲染

浏览器使用流式布局模型 (Flow Based Layout)。

**概述步骤:**

1. 处理 HTML 标记并构建 DOM 树。
2. 处理 CSS 标记并构建 CSSOM 树。
3. 将 DOM 与 CSSOM 合并成一个渲染树。
4. 根据渲染树来布局，以计算每个节点的几何信息。
5. 将各个节点绘制到屏幕上。

**详细步骤:**

布局流程的输出是一个“盒模型”，它会精确地捕获每个元素在视口内的确切位置和尺寸：所有相对测量值都转换为屏幕上的绝对像素。

将渲染树中的每个节点转换成屏幕上的实际像素。这一步通常称为“绘制”或“栅格化”

## devtools

Performance

<https://www.jianshu.com/p/d8795ff8e079>

**pending**

**chrome性能工具**

<https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/>

## 从输入URL后前端的知识

<https://mp.weixin.qq.com/s?__biz=MzUyMTMxMTc1Ng==&mid=2247483712&idx=1&sn=545325dc5a3e84be44554809264ba39b&chksm=f9dc4223ceabcb3566be4689fb49d9868712e572eb2a6bb08cb159dc4c4f0d55b22e0b667c92&scene=21#wechat_redirect>

![](./640.webp)

## link和script阻塞渲染

<https://juejin.im/post/59c60691518825396f4f71a1>

**CSS不会阻塞DOM的解析**

这里简单说一下，浏览器是解析DOM生成DOM Tree，结合CSS生成的CSS Tree，最终组成render tree，再渲染页面。由此可见，在此过程中CSS完全无法影响DOM Tree，因而无需阻塞DOM解析。然而，DOM Tree和CSS Tree会组合成render tree，那CSS会不会页面阻塞渲染呢？

**结论**

- CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 渲染。
- JS 阻塞 DOM 解析，但浏览器会"偷看"DOM，预先下载相关资源。
- 浏览器遇到 \<script>且没有defer或async属性的 标签时，会触发页面渲染，因而如果前面CSS资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。

**加载**

<https://zhuanlan.zhihu.com/p/29418126>

**defer与async**

defer 与相比普通 script，有两点区别：载入 JavaScript 文件时不阻塞 HTML 的解析，执行阶段被放到 HTML 标签解析完成之后。

async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行——无论此刻是 HTML 解析阶段还是 DOMContentLoaded 触发之后。需要注意的是，这种方式加载的 JavaScript 依然会阻塞 load 事件。换句话说，async-script 可能在 DOMContentLoaded 触发之前或之后执行，但一定在 load 触发之前执行。

## 缓存

<https://www.jianshu.com/p/54cc04190252>

通常浏览器缓存策略分为两种：强缓存和协商缓存，并且缓存策略都是通过设置 HTTP Header 来实现的。

### 缓存位置

- Service Worker

- Memory Cache

- Disk Cache

- Push Cache

### 强缓存

不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且Size显示from disk cache或from memory cache。强缓存可以通过设置两种 HTTP Header

实现：

- 1. Expires

缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点。也就是说，Expires=max-age + 请求时间，需要和Last-modified结合使用。Expires是Web服务器响应消息头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。

Expires 是 HTTP/1 的产物，受限于本地时间，如果修改了本地时间，可能会造成缓存失效。Expires: Wed, 22 Oct 2018 08:41:00 GMT表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。

- 2. Cache-Control

public：所有内容都将被缓存（客户端和代理服务器都可缓存）。具体来说响应可被任何中间节点缓存，如 Browser <-- proxy1 <-- proxy2 <-- Server，中间的proxy可以缓存资源，比如下次再请求同一资源proxy1直接把自己缓存的东西给 Browser 而不再向proxy2要。

private：所有内容只有客户端可以缓存，Cache-Control的默认取值。具体来说，表示中间节点不允许缓存，对于Browser <-- proxy1 <-- proxy2 <-- Server，proxy 会老老实实把Server 返回的数据发送给proxy1,自己不缓存任何数据。当下次Browser再次请求时proxy会做好请求转发而不是自作主张给自己缓存的数据。

no-cache：客户端缓存内容，是否使用缓存则需要经过协商缓存来验证决定。表示不使用 Cache-Control的缓存控制方式做前置验证，而是使用 Etag 或者Last-Modified字段来控制缓存。需要注意的是，no-cache这个名字有一点误导。设置了no-cache之后，并不是说浏览器就不再缓存数据，只是浏览器在使用缓存数据时，需要先确认一下数据是否还跟服务器保持一致。

no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存

max-age：max-age=xxx (xxx is numeric)表示缓存内容将在xxx秒后失效

s-maxage（单位为s)：同max-age作用一样，只在代理服务器中生效（比如CDN缓存）。比如当s-maxage=60时，在这60秒中，即使更新了CDN的内容，浏览器也不会进行请求。max-age用于普通缓存，而s-maxage用于代理缓存。s-maxage的优先级高于max-age。如果存在s-maxage，则会覆盖掉max-age和Expires header。

max-stale：能容忍的最大过期时间。max-stale指令标示了客户端愿意接收一个已经过期了的响应。如果指定了max-stale的值，则最大容忍时间为对应的秒数。如果没有指定，那么说明浏览器愿意接收任何age的响应（age表示响应由源站生成或确认的时间与当前时间的差值）。

min-fresh：能够容忍的最小新鲜度。min-fresh标示了客户端不愿意接受新鲜度不多于当前的age加上min-fresh设定的时间之和的响应。

**Cache-Control 和 Expires对比：**

其实这两者差别不大，区别就在于 Expires 是http1.0的产物，Cache-Control是http1.1的产物，两者同时存在的话，Cache-Control优先级高于Expires；在某些不支持HTTP1.1的环境下，Expires就会发挥用处。所以Expires其实是过时的产物，现阶段它的存在只是一种兼容性的写法。
强缓存判断是否缓存的依据来自于是否超出某个时间或者某个时间段，而不关心服务器端文件是否已经更新，这可能会导致加载文件不是服务器端最新的内容，那我们如何获知服务器端内容是否已经发生了更新呢？此时我们需要用到协商缓存策略。

### 协商缓存

有以下两种情况：

1. 协商缓存生效，返回304和Not Modified

2. 协商缓存失效，返回200和请求结果

实现：

1. Last-Modified

Last-Modified： 值是这个资源在服务器上的最后修改时间，浏览器接收后缓存文件和header

浏览器下一次请求这个资源，浏览器检测到有 Last-Modified这个header，于是添加If-Modified-Since这个header，值就是Last-Modified中的值；服务器再次收到这个资源请求，会根据 If-Modified-Since 中的值与服务器中这个资源的最后修改时间对比，如果没有变化，返回304和空的响应体，直接从缓存读取，如果If-Modified-Since的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和200

2. ETag 和 If-None-Match

Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag就会重新生成。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的Etag值放到request header里的If-None-Match里，服务器只需要比较客户端传来的If-None-Match跟自己服务器上该资源的ETag是否一致，就能很好地判断资源相对客户端而言是否被修改过了。如果服务器发现ETag匹配不上，那么直接以常规GET 200回包形式将新的资源（当然也包括了新的ETag）发给客户端；如果ETag是一致的，则直接返回304知会客户端直接使用本地缓存即可。

Last-modified与ETag对比：

- 首先在精确度上，Etag要优于Last-Modified。
Last-Modified的时间单位是秒，如果某个文件在1秒内改变了多次，那么他们的Last-Modified其实并没有体现出来修改，但是Etag每次都会改变确保了精度；如果是负载均衡的服务器，各个服务器生成的Last-Modified也有可能不一致。

- 第二在性能上，Etag要逊于Last-Modified，毕竟Last-Modified只需要记录时间，而Etag需要服务器通过算法来计算出一个hash值。

- 第三在优先级上，服务器校验优先考虑Etag

### 缓存机制

强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回304，继续使用缓存

![](./1.webp)

### 实际场景应用缓存策略

1. 频繁变动的资源

```sh
Cache-Control: no-cache
```

对于频繁变动的资源，首先需要使用Cache-Control: no-cache 使浏览器每次都请求服务器，然后配合 ETag 或者 Last-Modified 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。

2. 不常变化的资源

```sh
Cache-Control: max-age=31536000
```

## 重绘（Repaint）和回流（Reflow）

<https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn>

<https://juejin.im/post/5a9923e9518825558251c96a>

**重绘:**

重绘: 当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它。

**回流:**

回流：当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流

引起回流的操作：

```
页面首次渲染
浏览器窗口大小发生改变
元素尺寸或位置发生改变
元素内容变化（文字数量或图片大小等等）
元素字体大小变化
添加或者删除可见的DOM元素
激活CSS伪类（例如：:hover）

clientWidth、clientHeight、clientTop、clientLeft
offsetWidth、offsetHeight、offsetTop、offsetLeft
scrollWidth、scrollHeight、scrollTop、scrollLeft
scrollIntoView()、scrollIntoViewIfNeeded()
getComputedStyle()
getBoundingClientRect()
scrollTo()
```

**区别**

回流必定会发生重绘，重绘不一定会引发回流。

回流所需的成本比重绘高的多。

**减少重绘和回流:**

- CSS:

1. 使用 transform 替代 top

```js
setTimeout(() => {
  // 引起回流
  document.querySelector('.test').style.top = '100px'
}, 1000)
```

2. 不要使用table布局

3. 将动画效果应用到position属性为absolute或fixed的元素上。

4. 避免使用CSS表达式（例如：calc()）。

5. 避免设置多层内联样式。CSS 选择符从右往左匹配查找，避免节点层级过多

- JavaScript:

1. 不要把节点的属性值放在一个循环里当成循环里的变量

```js
for(let i = 0; i < 1000; i++) {
    // 获取 offsetTop 会导致回流，因为需要去获取正确的值
    console.log(document.querySelector('.test').style.offsetTop)
}
```

2. 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）。也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。

3. 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame

4. 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点。比如对于 video 标签来说，浏览器会自动将该节点变为图层。

  will-change： will-change属性可以提前通知浏览器我们要对元素做什么动画，这样浏览器可以提前准备合适的优化设置。这样可以避免对页面响应速度有重要影响的昂贵成本。元素可以更快的被改变，渲染的也更快，这样页面可以快速更新，表现的更加流畅。
  
  video、iframe 标签

5. 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。

6. 不要一条一条地修改 DOM 的样式。与其这样，还不如预先定义好 css 的 class，然后修改 DOM 的 className。

7. 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

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

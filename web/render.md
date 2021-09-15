# 浏览器解析与渲染

[你不知道的浏览器页面渲染机制](https://juejin.cn/post/6844903815758479374)

[再谈 load 与 DOMContentLoaded](https://juejin.cn/post/6844903623583891469)

[从输入URL后前端的知识](https://mp.weixin.qq.com/s?__biz=MzUyMTMxMTc1Ng==&mid=2247483712&idx=1&sn=545325dc5a3e84be44554809264ba39b&chksm=f9dc4223ceabcb3566be4689fb49d9868712e572eb2a6bb08cb159dc4c4f0d55b22e0b667c92&scene=21#wechat_redirect)

## 当我们输入一个页面地址时，发生了哪些事情呢？

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

### DOMContentLoaded

MDN的解释：当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。

意思是HTML下载、解析完毕之后就触发。

总结： DOMContentLoaded 事件在 html文档加载完毕，并且 html 所引用的内联 js、以及外链 js 的同步代码都执行完毕后触发。

### Load

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

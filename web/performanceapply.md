# 前端性能优化

前端性能优化主要是为了提高页面的加载速度，优化用户的访问体验。我认为可以从这些方面来进行优化。

参考：

[浏览器页面资源加载过程与优化 - 考拉团队](https://juejin.cn/post/6844903545016156174)

[写给中高级前端关于性能优化的9大策略和6大指标 | 网易四年实践](https://juejin.cn/post/6981673766178783262?utm_source=gold_browser_extension)

[前端性能优化之雅虎35条军规 ：](https://juejin.im/post/6844903657318645767#heading-10)

[聊一聊前端性能优化](https://juejin.cn/post/6911472693405548557#heading-49)

<https://juejin.cn/post/6844903640902156301#heading-17>

## 优化网络

### 无阻塞加载

样式表:

把样式表放在 `<head>` 尾部使用 `<link>`加载，减少页面的首次渲染的时间

脚本阻塞:

脚本在`<body>`尾部使用异步加载 。使用 defer 或 async 属性，避免脚本的加载和执行阻塞页面的渲染

```
脚本与DOM/其它脚本的依赖关系很强：对<script>设置 defer
脚本与DOM/其它脚本的依赖关系不强：对<script>设置 async
```

### 使用`<link>`替代@import

避免使用 @import 标签 . 对于IE某些版本，@import的行为和放在页面底部一样。所以，不要用它。

### 减少 HTTP 请求数

通过文件合并、css 雪碧图、使用 base64 等方式来减少 HTTP 请求数，避免过多的请求造成等待的情况

### 减小cookie

减少 Cookie 大小

静态资源使用无Cookie域名

尽可能减小 cookie 的大小，并且通过将静态资源分配到其他域名下，来避免对静态资源请求时携带不必要的 cookie

### 缓存策略

具体配置见 主页 nginx

常用不变的资源，添加强缓存头：Expires或Cache-Control响应头。将 Expires 响应头设置为将来很远的时间，实现「永不过期」策略；

一般设置 cache-control 一年

```sh
cache-control: max-age=31536000 
```

html设置no-store

### 划分内容到不同域名

浏览器一般会限制每个域的并行线程（一般为6个，甚至更少），使用不同的域名可以最大化下载线程，但注意保持在2-4个域名内，以避免DNS查询损耗。

例如，动态内容放在csspod.com上，静态资源放在static.csspod.com上。这样还可以禁用静态资源域下的Cookie，减少数据传输，详见Cookie 优化。

### Ajax请求使用GET方法

浏览器执行XMLHttpRequest POST请求时分成两步，先发送Http Header，再发送data。而GET只使用一个TCP数据包（Http Header与data）发送数据，所以首选GET方法。

根据HTTP规范，GET用于获取数据，POST则用于向服务器发送数据，所以Ajax请求数据时使用GET更符合规范。

## 压缩文件

### 压缩图片

压缩图片体积

### 合并小图标为精灵图

### 使用CDN

见主页 CDN目录

### 压缩代码

通过对 JavaScript 和 CSS 的文件进行压缩，来减小文件的体积

### base64

base64代替小图

### CSS文件区分

独立公共css文件：

公共样式 ,方便开发维护，浏览器缓存文件，

模块css文件：

按需打包加载，cssinjs

### 启用Gzip

具体配置见主目录，nginx下相关配置

服务器端启用 Gzip、Deflate 等方式对于传输的资源进行压缩，减小文件的体积

## 首屏优化

```
preload   是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源；
prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源。
```

### 预解析DNS prefetch

预先解析DNS获取域名对应IP

通过 DNS 缓存等机制来减少 DNS 的查询次数

当我们访问过一次域名之后，就会在每个节点上生成DNS缓存，即完成DNS预热，这样同一地区（或网络服务商）的其他用户再次访问该域名时就不需要重新回源，直接读取最近的DNS缓存，从而减少请求次数，提升了网站访问速度。

一个站点有多个域名时，这个优化效果明显

meta预热的方式：

```html
<meta http-equiv="x-dns-prefetch-control" content="on" />
<link rel="dns-prefetch" href="//webresource.english.c-ctrip.com" />
<link rel="dns-prefetch" href="//webresource.c-ctrip.com" />
<link rel="dns-prefetch" href="//s.c-ctrip.com" />
<link rel="dns-prefetch" href="//pic.english.c-ctrip.com" />
<link rel="dns-prefetch" href="//m.ctrip.com" />
```

### 预加载 preload

[用 preload 预加载页面资源](https://juejin.cn/post/6844903562070196237)

[preload详细解释以及应用场景](https://juejin.cn/post/6844903621155356685)

提前加载资源，确保使用时已加载。让浏览器提前加载指定资源（这里预加载完成后并不执行），在需要执行的时候在执行，这样将加载和执行分开，可以不阻塞渲染和 window.onload事件。

提前预加载指定资源，特别是字体文件，不会再出现 font 字体在页面渲染出来后，才加载完毕，然后页面字体闪一下变成预期字体。

带有 onload 事件，可以自定义资源在预加载完毕后的回调函数。

preload 将提升资源加载的优先级

link一个preload只是加载资源(如a.js)，当把a.js以script标签添加到html中，才会解析js

1. 使用 link 标签创建

```html
<!-- 使用 link 标签静态标记需要预加载的资源 -->
<link rel="preload" href="/path/to/style.css" as="style">

<!-- 或使用脚本动态创建一个 link 标签后插入到 head 头部 -->
<script>
const link = document.createElement('link');
link.rel = 'preload';
link.as = 'style';
link.href = '/path/to/style.css';
document.head.appendChild(link);
</script>
```

2. 使用 HTTP 响应头的 Link 字段创建

```sh
Link: <https://example.com/other/styles.css>; rel=preload; as=style
```

对跨域的文件进行 preload 的时候，我们必须加上 crossorigin 属性：

```
<link rel="preload" as="font" crossorigin href="https://at.alicdn.com/t/font_zck90zmlh7hf47vi.woff">
```

### 预渲染

提前渲染无需立即打开的页面，确保使用时已渲染

### 懒加载

使用延迟加载的方式，来减少页面首屏加载时需要请求的资源。延迟加载的资源当用户需要访问时，再去请求加载

用可视化API判断，如果出现在视口内，才渲染组件，或者DOM

[原生JavaScript三种方法实现懒加载lazyLoad](https://juejin.cn/post/6980320082698174478)

### 懒执行

## 渲染优化

其他样式优化见css性能文档

### css样式优化

```
避免出现超过三层的嵌套规则
避免为ID选择器添加多余选择器
避免使用标签选择器代替类选择器
避免使用通配选择器，只对目标节点声明规则
避免重复匹配重复定义，关注可继承属性

标准化各种浏览器前缀
值为0时不添加任何单位
移除css空规则
避免css表达式
避免HTML中出现样式
正确使用display
不滥用float
不滥用web字体
不声明过多font-size
```

### 设置 viewport

### 优化动画

优先使用css动画

开启GPU加速,见css性能文档

使用canvas动画

使用requestAnimationFrame代替settimeout

### 优化高频事件

节流throttle

防抖

增加响应变化的时间间隔

用 requestAnimationFrame 监听帧变化

### 减少DOM元素数量

不使用表格布局 ：更多的标签，增加文件大小；不易维护，无法适应响应式设计；性能考量，默认的表格布局算法会产生大量重绘

塞进去更多的`<div>`仅为了处理布局问题？也许有更好、更语义化的标记。

能通过伪元素实现的功能，就没必要添加额外元素，如清除浮动。

## JS脚本/DOM优化

### 缓存数组长度

### 缓存DOM计算属性

### 避免过多DOM操作

减少DOM操作:JavaScript 操作 DOM 很慢，尤其是 DOM 节点很多时。

缓存已经访问过的元素；

使用DocumentFragment暂存DOM，整理好以后再插入DOM树；

操作className，而不是多次读写style；

避免使用JavaScript修复布局。

### 使用高效的事件处理

减少绑定事件监听的节点，如通过事件委托；

尽早处理事件，在DOMContentLoaded即可进行，不用等到load以后。

### 避免重制图像尺寸

### 避免资源标签src为空

避免图片src为空[！此条好像错误]

虽然src属性为空字符串，但浏览器仍然会向服务器发起一个HTTP请求：

### 避免图像转换dataurl

## 回流与重绘

避免过多的回流与重绘

详细见 主页 回流与重绘 文档

## V8引擎优化

通过Chrome Devtools LightHouse 获取页面性能指标报告

通过Chrome Devtools Performance 获取页面性能瓶颈报告

通过performance API 获取页面各个阶段精准时间

保证函数入参类型一致 让v8自动优化代码

## webpack

见主目录webpack配置

## 根组件加loading

```html
<div id="root">Loading...</div>
```

## ES2015选择性加载

webpack配置方案 待研究

```html
<script type="module">
```

## 图片懒加载LazyLoad

<https://juejin.cn/post/6844903614138286094>

用户滚动到图片之前，可视区域外的图像不会加载。

当然你也可以实现像 Medium 的那种加载体验（好像知乎已经是这样了），即先加载一张低像素的模糊图片，然后等真实图片加载完毕之后，再替换掉。

### 方法一：监听scroll

vue可以做一个图片组件

监听 window 对象或者父级对象的 scroll 事件，触发 load；首先将页面上的图片的 src 属性设为空字符串，而图片的真实路径则设置在data-original属性中，当页面滚动的时候需要去监听scroll事件，在scroll事件的回调中，判断我们的懒加载的图片是否进入可视区域,如果图片在可视区内将图片的 src 属性设置为data-original 的值，这样就可以实现延迟加载。

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lazyload</title>
    <style>
      .image-item {
     display: block;
     margin-bottom: 50px;
     height: 200px;//一定记得设置图片高度
 }
    </style>
</head>
<body>
<img src="" class="image-item" lazyload="true"  data-original="images/1.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/2.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/3.png"/>
<script>
  var viewHeight =document.documentElement.clientHeight//获取可视区高度
  function lazyload(){
    var eles=document.querySelectorAll（'img[data-original][lazyload]'）
    Array.prototype.forEach.call(eles,function(item,index){
      var rect
      if(item.dataset.original==="")
        return
      rect=item.getBoundingClientRect()// 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
      if(rect.bottom>=0 && rect.top < viewHeight){
        !function(){
          var img=new Image()
          img.src=item.dataset.original
          img.onload=function(){
            item.src=img.src
          }
          item.removeAttribute（"data-original"）//移除属性，下次不再遍历
          item.removeAttribute（"lazyload"）
        }()
      }
    })
  }
  lazyload()//刚开始还没滚动屏幕时，要先触发一次函数，初始化首页的页面图片
  document.addEventListener（"scroll"，lazyload)
</script>
</body>
</html>
```

### 方法二：使用 Intersection Observer API 来获取元素的可见性

## 图像策略

### 图像选型

了解所有图像类型的特点及其何种应用场景最合适

### 图像压缩

在部署到生产环境前使用工具或脚本对其压缩处理

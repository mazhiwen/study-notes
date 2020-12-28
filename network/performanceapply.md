# 综合答案

前端性能优化主要是为了提高页面的加载速度，优化用户的访问体验。我认为可以从这些方面来进行优化。

前端性能优化之雅虎35条军规 ： <https://juejin.im/post/6844903657318645767#heading-10>

## 页面内容

- 减少 HTTP 请求数

通过文件合并、css 雪碧图、使用 base64 等方式来减少 HTTP 请求数，避免过多的请求造成等待的情况

- DNS 缓存

通过 DNS 缓存等机制来减少 DNS 的查询次数

- 缓存策略

通过设置缓存策略，对常用不变的资源进行缓存

- 延迟加载

使用延迟加载的方式，来减少页面首屏加载时需要请求的资源。延迟加载的资源当用户需要访问时，再去请求加载

- 预加载

通过用户行为，对某些资源使用预加载的方式，来提高用户需要访问资源时的响应速度

- 减少DOM元素数量:

不使用表格布局 ：更多的标签，增加文件大小；不易维护，无法适应响应式设计；性能考量，默认的表格布局算法会产生大量重绘

塞进去更多的<div>仅为了处理布局问题？也许有更好、更语义化的标记。

能通过伪元素实现的功能，就没必要添加额外元素，如清除浮动。

- 划分内容到不同域名：

浏览器一般会限制每个域的并行线程（一般为6个，甚至更少），使用不同的域名可以最大化下载线程，但注意保持在2-4个域名内，以避免DNS查询损耗。

例如，动态内容放在csspod.com上，静态资源放在static.csspod.com上。这样还可以禁用静态资源域下的Cookie，减少数据传输，详见Cookie 优化。

## 服务器

- 使用CDN

CDN服务，来提高用户对于资源请求时的响应速度

- 添加Expires或Cache-Control响应头

静态内容：将 Expires 响应头设置为将来很远的时间，实现「永不过期」策略；

动态内容：设置合适的 Cache-Control 响应头，让浏览器有条件地发起请求。

- 启用Gzip

服务器端启用 Gzip、Deflate 等方式对于传输的资源进行压缩，减小文件的体积

从HTTP/1.1开始，web客户端就有了支持压缩的Accept-Encoding HTTP请求头。

```
Accept-Encoding: gzip, deflate
```

如果web服务器看到这个请求头，它就会用客户端列出的一种方式来压缩响应。web服务器通过Content-Encoding响应头来通知客户端。

```
Content-Encoding: gzip

```

- 尽可能减小 cookie 的大小，并且通过将静态资源分配到其他域名下，来避免对静态资源请求时携带不必要的 cookie

- Ajax请求使用GET方法

浏览器执行XMLHttpRequest POST请求时分成两步，先发送Http Header，再发送data。而GET只使用一个TCP数据包（Http Header与data）发送数据，所以首选GET方法。

根据HTTP规范，GET用于获取数据，POST则用于向服务器发送数据，所以Ajax请求数据时使用GET更符合规范。

- 避免图片src为空

虽然src属性为空字符串，但浏览器仍然会向服务器发起一个HTTP请求：

- cookie

减少 Cookie 大小

静态资源使用无Cookie域名

## CSS

- 把样式表放在`<head>`中

把样式表放在页面的 head 标签中，减少页面的首次渲染的时间

- 使用`<link>`替代@import

避免使用 @import 标签 . 对于IE某些版本，@import的行为和放在页面底部一样。所以，不要用它。

## JavaScript

- 把脚本放在页面底部

尽量把 js 脚本放在页面底部或者使用 defer 或 async 属性，避免脚本的加载和执行阻塞页面的渲染

- 压缩JavaScript和CSS

通过对 JavaScript 和 CSS 的文件进行压缩，来减小文件的体积

- 减少DOM操作

JavaScript 操作 DOM 很慢，尤其是 DOM 节点很多时。

缓存已经访问过的元素；
使用DocumentFragment暂存DOM，整理好以后再插入DOM树；
操作className，而不是多次读写style；
避免使用JavaScript修复布局。

- 使用高效的事件处理

减少绑定事件监听的节点，如通过事件委托；

尽早处理事件，在DOMContentLoaded即可进行，不用等到load以后。

## 图片

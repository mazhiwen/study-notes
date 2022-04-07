# CDN

把数据放到离用户地理位置更近的地方，可以显著减少每次TCP连接的网络延迟，增大吞吐量

CDN 是一个内容分发网络，通过对源网站资源的缓存，利用本身多台位于不同地域、不同运营商的服务器，向用户提供资就近访问的功能。

也就是说，用户的请求并不是直接发送给源网站，而是发送给 CDN 服务器，由 CND 服务器将请求定位到最近的含有该资源的服务器上去请求。

这样有利于提高网站的访问速度，同时通过这种方式也减轻了源服务器的访问压力。

Content Delivery Network,内容分发网络

通过把内容部署在全球各地，让用户从最近的服务器加载内容。大幅降低传播分组的时间。

## traceroute

traceroute 测量延迟

## CDN劫持

<https://juejin.cn/post/6844903757919027208>

## SRI解决CDN劫持

开启 SRI 能有效保证页面引用资源的完整性，避免恶意代码执行。

### 开启SRI

通过给 link 标签或者 script 标签增加 integrity 属性即可开启 SRI 功能，比如：

```html
<script type="text/javascript" src="//s.url.cn/xxxx/aaa.js" 
    integrity="sha256-xxx sha384-yyy"
    crossorigin="anonymous"></script>
```

### 浏览器如何处理SRI

当浏览器在 script 或者 link 标签中遇到 integrity 属性之后，会在执行脚本或者应用样式表之前对比所加载文件的哈希值和期望的哈希值。
当脚本或者样式表的哈希值和期望的不一致时，浏览器必须拒绝执行脚本或者应用样式表，并且必须返回一个网络错误说明获得脚本或样式表失败。

### webpack插件可配置

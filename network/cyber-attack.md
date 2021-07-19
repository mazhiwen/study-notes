# web安全

## XSS

见 主页XSS文档

## CSRF

见 主页CSRF文档

## DDoS

## 防御思路

不信任任何外部资源

不信任任何用户输入

## 防御: Content-Security-Policy(CSP)

[Content Security Policy 入门教程 - 阮一峰](https://www.ruanyifeng.com/blog/2016/09/csp.html)

<https://juejin.cn/post/6913524440718376968>

<https://juejin.cn/post/6867941386025435149>

CSP (Content-Security-Policy) 指的是内容安全策略，它的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截由浏览器自己来实现。

启用后，不符合 CSP 的外部资源就会被阻止加载。

### 两种方法开启配置csp

1. http头部：

```sh
Content-Security-Policy: script-src 'self'; object-src 'none';style-src cdn.example.org third-party.org; child-src https:
```

2. html-meta：

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
```

```
只允许加载本站资源
Content-Security-Policy: default-src 'self'

只允许加载 HTTPS 协议图片
Content-Security-Policy: img-src https://*

允许加载任何来源框架
Content-Security-Policy: child-src 'none'
```

### 限制字段配置

```
script-src：外部脚本
style-src：样式表
img-src：图像
media-src：媒体文件（音频和视频）
font-src：字体文件
object-src：插件（比如 Flash）
child-src：框架
frame-ancestors：嵌入的外部资源（比如<frame>、<iframe>、<embed>和<applet>）
connect-src：HTTP 连接（通过 XHR、WebSockets、EventSource等）
worker-src：worker脚本
manifest-src：manifest 文件
```

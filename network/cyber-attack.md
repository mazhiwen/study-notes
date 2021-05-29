# web安全

## XSS

见 主页XSS文档

## CSRF

见 主页CSRF文档

## DDoS

## 防御思路

不信任任何外部资源

不信任任何用户输入

## 防御: CSP

<https://juejin.cn/post/6913524440718376968>

<https://juejin.cn/post/6867941386025435149>

CSP (Content-Security-Policy) 指的是内容安全策略，它的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截由浏览器自己来实现。

两种方法开启配置csp：

http头部：

```sh
Content-Security-Policy: policy
```

html-meta：

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
```

```
只允许加载本站资源
Content-Security-Policy: default-src ‘self’

只允许加载 HTTPS 协议图片
Content-Security-Policy: img-src https://*

允许加载任何来源框架
Content-Security-Policy: child-src 'none'
```

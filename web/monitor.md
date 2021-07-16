# 前端监控 埋点 日志 错误收集

[基于typescript开发前端错误及性能监控SDK](https://juejin.cn/post/6958690901380038687)

[去大厂，你就应该了解前端监控和埋点!](https://juejin.cn/post/6844904130163507214)

[前端埋点的那些事](http://www.imooc.com/article/27151)

## 性能监控

性能监控需要注意到几个点

1. 白屏时长

dns解析，到ui骨架出现的时间

2. 重要页面的http请求时间

3. 重要页面的渲染时间

4. 首屏加载时长

截止时间是 所有动态内容加载完成 包括ajax

## 数据监控

```
1、PV访问来量（Page View）
2、UV访问数（Unique Visitor）
3、记录操作系统和浏览器
4、记录用户在页面的停留时间
5、进入当前页面的来源网页（也就是从哪进来的转化）
```

## performanceAPI的应用

[见performanceAPI文档](./PerformanceAPI.md)

## 错误收集

<https://juejin.cn/post/6844903700272513031>

## 日志

<https://juejin.cn/post/6844903800482840584>

## 埋点

<https://juejin.cn/post/6891080391642316808>

<https://juejin.cn/post/6844903741775151111>

## 第三方成熟方案

百度无埋点方案

可视化埋点 : TalkingData、诸葛 IO，腾讯 MTA 等

## 手动埋点

```
javascript中能轻松获得哪些信息：

域名：document.domainURLdocument.URL
页面标题：document.title
分辨率：window.screen.height & window.screen.width
颜色深度：window.screen.colorDepth
Referrer：document.referrer
客户端语言：navigator.language
```

## 可视化埋点

可视化埋点中多数基于Xpath的方案，XPath 是一门在 XML 文档中查找信息的语言。XPath 可用来在 XML 文档中对元素和属性进行遍历。

## 无埋点

不需要工程师在业务代码里面插入侵入式的代码

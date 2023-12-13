# 前端监控 埋点 日志 错误收集

[从零开始搭建一个前端日志框架](https://juejin.cn/post/7257922419329957948?searchId=20231107165410BA7186BC0D373C0FF85D#heading-8)

[腾讯二面：现在要你实现一个埋点监控SDK，你会怎么设计？](https://juejin.cn/post/7085679511290773534)

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

## console劫持

```js
rewritetConsole() {
  const rewriteFunctions = ['log', 'warn', 'error']
  rewriteFunctions.forEach((key) => {
    const rewrite = console[key]
    console[key] = (...args: any[]) => {
      const now = dayjs().format('YYYY-MM-DD HH:mm:ss:SSS')
      rewrite.apply(console, [`${now} [${key}]`, ...args])
    }
  })
}
```

## 前端离线存储

前端常见的存储方案有 localStorage、cookie、indexDB，不过 localStorage 和 cookie 存储上限都太小了，有时候打印一个base64图片可能就超过4Mb了，所以最终敲定方案为 indexDB，内容是存储在硬盘的

indexDB 原生操作起来还是有点繁琐的，所以找了一个库 dexie 来协助操作，而且 dexie 的用法和之前写 Sequelize 有点像，上手起来也快。

## 请求劫持

```js
// 监听 readystatechange 事件
this.addEventListener('readystatechange', () => {
  if (this.readyState === XMLHttpRequest.prototype.DONE) {
    // 20 开头的状态码都是成功的，比如201、204
    if (String(this.status).startsWith('20')) {
      // 正常 http 请求不需要打印到控制台，在 network 里可以看到完整信息，
      // 只需要记录到 indexDB 并上传服务器即可，所以不能使用 console.log
      insertLog(
        `${now} [http ok] method: ${method}, url: ${url}, status: ${this.status}, response: ${this.response}`
      )
    } else {
      // http 请求异常
      insertLog(
        `${now} [http error] method: ${method}, url: ${url}, status: ${this.status}, response: ${this.response}`
      )
    }
  }
})

```

## 错误日志劫持

window.onerror MDN的解释为：当资源加载失败或无法使用时，会在Window对象触发error事件，例如：script 执行时报错。

不过 window.onerror 无法捕获 promise 异常，需要监听 window.onunhandledrejection 事件，MDN解释为：当 Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件；这可能发生在 window 下，但也可能发生在 Worker 中。这对于调试和为意外情况提供后备错误处理非常有用。

```js
/**
 * 监听错误
 */
interceptError() {
  // 监听全局错误
  window.onerror = (message, source, _lineno, _colno, error) => {
    console.error(`${message}, ${error}, ${source}`)
  }

  // 监听未处理的 promise 错误，不能打印 event.reason，JSON.stringify 后为空对象 {}
  window.onunhandledrejection = (event) => {
    // 这里如果打印 event.reason 在控制台是可以看到报错的，但是 JSON.stringify 却为空
    // 必须打印 event.reason.stack 
    console.error(event.reason.stack)
  }
}

```

# 浏览器

## devtools

Performance

<https://www.jianshu.com/p/d8795ff8e079>

### pending

### chrome性能工具

<https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/>

## 从输入URL后前端的知识

<https://mp.weixin.qq.com/s?__biz=MzUyMTMxMTc1Ng==&mid=2247483712&idx=1&sn=545325dc5a3e84be44554809264ba39b&chksm=f9dc4223ceabcb3566be4689fb49d9868712e572eb2a6bb08cb159dc4c4f0d55b22e0b667c92&scene=21#wechat_redirect>

![](./640.webp)

## link和script顺序

<https://juejin.im/post/59c60691518825396f4f71a1>

**CSS 不会阻塞 DOM 的解析**

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

# html5

HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。

## 新增

```
新增的有：

绘画 :canvas;
用于媒介回放的: video 和 audio 元素;
本地离线存储 :localStorage 长期存储数据，浏览器关闭后数据不丢失;sessionStorage: 的数据在浏览器关闭后自动删除;
语意化更好的内容元素:比如 article、footer、header、nav、section;
表单控件:calendar、date、time、email、url、search;
新的技术: webworker, websocket;
新的文档属性: document.visibilityState
```

## 移除

```
移除的元素有：

纯表现的元素：basefont，big，center，font, s，strike，tt，u;
对可用性产生负面影响的元素：frame，frameset，noframes；
```

## 新增的表单元素

```
 datalist 规定输入域的选项列表，通过 option 创建！

 keygen 提供一种验证用户的可靠方法，密钥对生成器，私钥存于客户端，公钥发到服务器，用于之后验证客户端证书！

 output 元素用于不同类型的输出！
```

## 用于获得用户的当前位置

getCurrentPosition()

# HTML

html文档：

whatwg组织:

<https://html.spec.whatwg.org/multipage/>

<https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model>

<https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/Html/Html.md#1-doctype-%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88>

## base

href:根据web服务的绝对地址  
[xmlbase W3C地址](https://www.w3.org/TR/xmlbase/)

## 元素内容分类

<https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Flow_content>

## HTML元素集

<https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/>

## 响应式布局

- 媒体查询:css媒体查询根据尺寸来定义不同样式，比如600/900/1200/1600
- 百分比
- rem:rem是根据html的根元素来决定元素大小的，在自适应布局中应用非常广泛。
- 视窗(vw/vh):c3中新增视窗，1vw代表1%的宽度，通常结合rem一起使用。

## title和alt

```
1.<img src="#" alt="alt信息" />
//1.当图片不输出信息的时候，会显示alt信息 鼠标放上去没有信息，当图片正常读取，不会出现alt信息
2.<img src="#" alt="alt信息" title="title信息" />
// 2.当图片不输出信息的时候，会显示alt信息 鼠标放上去会出现title信息
//当图片正常输出的时候，不会出现alt信息，鼠标放上去会出现title信息
```

title属性可以用在除了base，basefont，head，html，meta，param，script和title之外的所有标签

title属性的功能是提示。额外的说明信息和非本质的信息请使用title属性。title属性值可以比alt属性值设置的更长

title属性有一个很好的用途，即为链接添加描述性文字，特别是当连接本身并不是十分清楚的表达了链接的目的。

## DOCTYPE的作用是什么

<!DOCTYPE>声明位于 HTML 文档中的第一行，处于 &lt;html&gt;标签之前。告知浏览器的解析器用什么文档标准解析这个文档。

DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。

标准模式的渲染方式和 JS 引擎的解析方式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

HTML5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 DOCTYPE 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）。而 HTML4.01 基于 SGML ，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型。

DTD（ Document Type Definition 文档类型定义）是一组机器可读的规则，它们定义 XML 或 HTML 的特定版本中所有允许元素及它们的属性和层次关系的定义。在解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。

DTD 是对 HTML 文档的声明，还会影响浏览器的渲染模式（工作模式）。

## 行内元素和块级元素

一个行内元素只占据它对应标签的边框所包含的空间。

常见的行内元素有： a b span img strong sub sup button input label select textarea

块级元素占据其父元素（容器）的整个宽度，因此创建了一个“块”。

常见的块级元素有：  div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p

区别：

1. 格式上，默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
2. 内容上，默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。
3. 行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响。

## 浏览器内核

（1） IE 浏览器内核：Trident 内核，也是俗称的 IE 内核；

（2） Chrome 浏览器内核：统称为 Chromium 内核或 Chrome 内核，以前是 Webkit 内核，现在是 Blink内核；

（3） Firefox 浏览器内核：Gecko 内核，俗称 Firefox 内核；

（4） Safari 浏览器内核：Webkit 内核；

（5） Opera 浏览器内核：最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核；

（6） 360浏览器、猎豹浏览器内核：IE + Chrome 双内核；

（7） 搜狗、遨游、QQ 浏览器内核：Trident（兼容模式）+ Webkit（高速模式）；

（8） 百度浏览器、世界之窗内核：IE 内核；

（9） 2345浏览器内核：好像以前是 IE 内核，现在也是 IE + Chrome 双内核了；

（10）UC 浏览器内核：这个众口不一，UC 说是他们自己研发的 U3 内核，但好像还是基于 Webkit 和 Trident ，还有说是基于火狐内核。

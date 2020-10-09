# HTML

- [base标签](#base标签)
- [target属性](#target属性)
- [元素内容分类](#元素内容分类)
- [HTML元素集](#HTML元素集)
- [响应式布局](#响应式布局)
- [title和alt](#title和alt)
- [DOCTYPE的作用是什么](#DOCTYPE的作用是什么)
- [行内元素和块级元素](#行内元素和块级元素)
- [label](#label)
- [1px高的线](#1px高的线)
- [meta标签](#meta标签)
- [空元素定义](#空元素定义)
- [link标签定义](#link标签定义)
- [html5](#html5)

html文档：

whatwg组织:

<https://html.spec.whatwg.org/multipage/>

<https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model>

<https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/Html/Html.md#1-doctype-%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88>

***

## base标签

<https://juejin.im/post/5e8be7046fb9a03c451bc331>

### href属性

`<base>`标签href属性指定一个HTML页中所有的相对路径的根路径

```
一个HTML中只能有一个<base>，并且这个<base>的href属性必须有值。如果有多个的话，只会使用第一个<base>标签。

<base>标签需放在<head>里面，当base标签有href属性时，位置得在其他任何有定义url的属性前(除了html)。

该属性设置的基路径可以在JS中使用 document.baseURI 获取到。如果文档不包含<base>元素，baseURI 默认为 document.location.href。

这个基路径可以用来解析页面中所有的相对路径，比如JS<script>，CSS<link>，图片<img>，超链接<a>等元素的路径。
```

- 默认值

为空字符串: ""

不设置任何值的情况下，文档内资源地址以当前url地址为相对地址的上下文环境。

如：

```
访问浏览器url：http://www.host.com/a/b/c
<script  src="a.js"></script>的实际解析地址是：
<script  src="http://www.host.com/a/b/a.js"></script>
```

- basehref设置为 /

资源url相对地址的上下文环境为host/

- 用法：

实际地址为basehref + scriptsrc

资源src为斜杆开头时取basehref的host根路径，否则取完整basehref

```html
<head>
>
  <base href="http://www.xxx.com/test/">
  <script type="text/javascript" src="a.js"></script>
  <script type="text/javascript" src="public/scripts/b.js"></script>
  <script type="text/javascript" src="common/c.js"></script>
</head>

```

### target属性

target属性是网页窗口的打开方式，在base标签中设置该属性，那么页面中所有的链接都将遵循这个方式来打开网页

## target属性

1. _blank：在新窗口打开链接页面。
2. _parent:在上一级窗口中打开链接。
3. _self： 在当前窗口打开链接,此为默认值，可以省略。
4. _top： 在浏览器的整个窗口打开链接，忽略任何框架。

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

## label

label 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

```html
 <label for="Name">Number:</label>
 <input type=“text“ name="Name" id="Name"/>
```

## 1px高的线

```
  <div style="height:1px;overflow:hidden;background:red"></div>
```

## meta标签

```html
 <meta> 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
 <meta> 标签位于文档的头部，不包含任何内容。<meta> 标签的属性定义了与文档相关联的名称/值对。

 <!DOCTYPE html>  H5标准声明，使用 HTML5 doctype，不区分大小写
 <head lang=”en”> 标准的 lang 属性写法
 <meta charset=’utf-8′>    声明文档使用的字符编码
 <meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>   优先使用 IE 最新版本和 Chrome
 <meta name=”description” content=”不超过150个字符”/>       页面描述
 <meta name=”keywords” content=””/>      页面关键词者
 <meta name=”author” content=”name, email@gmail.com”/>    网页作
 <meta name=”robots” content=”index,follow”/>      搜索引擎抓取
 <meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”> 为移动设备添加 viewport
 <meta name=”apple-mobile-web-app-title” content=”标题”> iOS 设备 begin
 <meta name=”apple-mobile-web-app-capable” content=”yes”/>  添加到主屏后的标题（iOS 6 新增）
 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
 <meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL”>
 添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
 <meta name=”apple-mobile-web-app-status-bar-style” content=”black”/>
 <meta name=”format-detection” content=”telphone=no, email=no”/>  设置苹果工具栏颜色
 <meta name=”renderer” content=”webkit”>  启用360浏览器的极速模式(webkit)
 <meta http-equiv=”X-UA-Compatible” content=”IE=edge”>     避免IE使用兼容模式
 <meta http-equiv=”Cache-Control” content=”no-siteapp” />    不让百度转码
 <meta name=”HandheldFriendly” content=”true”>     针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
 <meta name=”MobileOptimized” content=”320″>   微软的老式浏览器
 <meta name=”screen-orientation” content=”portrait”>   uc强制竖屏
 <meta name=”x5-orientation” content=”portrait”>    QQ强制竖屏
 <meta name=”full-screen” content=”yes”>              UC强制全屏
 <meta name=”x5-fullscreen” content=”true”>       QQ强制全屏
 <meta name=”browsermode” content=”application”>   UC应用模式
 <meta name=”x5-page-mode” content=”app”>    QQ应用模式
 <meta name=”msapplication-tap-highlight” content=”no”>    windows phone 点击无高光
 设置页面不缓存
 <meta http-equiv=”pragma” content=”no-cache”>
 <meta http-equiv=”cache-control” content=”no-cache”>
 <meta http-equiv=”expires” content=”0″>
 ```

## 空元素定义

标签内没有内容的 HTML 标签被称为空元素。空元素是在开始标签中关闭的。

常见的空元素有：br hr img input link meta

## link标签定义

link 标签定义文档与外部资源的关系。

link 元素是空元素，它仅包含属性。 此元素只能存在于 head 部分，不过它可出现任何次数。

link 标签中的 rel 属性定义了当前文档与被链接文档之间的关系。常见的 stylesheet 指的是定义一个外部加载的样式表。

## link和@import区别

1. 从属关系区别。 @import 是 CSS 提供的语法规则，只有导入样式表的作用；link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性、引入网站图标等。

2. 加载顺序区别。加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载。

3. 兼容性区别。@import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容性问题。

4. DOM 可控性区别。可以通过 JS 操作 DOM ，插入 link 标签来改变样式；由于 DOM 方法是基于文档的，无法使用 @import 的方式插入样式。

## html5

HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。

```
新增的有：

绘画 :canvas;
用于媒介回放的: video 和 audio 元素;
本地离线存储 :localStorage 长期存储数据，浏览器关闭后数据不丢失;
sessionStorage: 的数据在浏览器关闭后自动删除;
语意化更好的内容元素:比如 article、footer、header、nav、section;
表单控件:calendar、date、time、email、url、search;
新的技术: webworker, websocket;
新的文档属性: document.visibilityState

移除的元素有：

纯表现的元素：basefont，big，center，font, s，strike，tt，u;
对可用性产生负面影响的元素：frame，frameset，noframes；
```

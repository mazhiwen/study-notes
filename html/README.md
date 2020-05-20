# HTML

html文档：

whatwg组织:

<https://html.spec.whatwg.org/multipage/>

<https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model>

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

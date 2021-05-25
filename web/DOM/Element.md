# Element

<https://developer.mozilla.org/zh-CN/docs/Web/API/Element>

<https://juejin.cn/post/6844903695428108302>

> Element 是一个通用性非常强的基类，所有 Document 对象下的对象都继承自它。这个接口描述了所有相同种类的元素所普遍具有的方法和属性。一些接口继承自 Element 并且增加了一些额外功能的接口描述了具体的行为。例如， HTMLElement 接口是所有 HTML 元素的基本接口，而 SVGElement 接口是所有 SVG 元素的基础。大多数功能是在这个类的更深层级（hierarchy）的接口中被进一步制定的。

## Element继承关系

所有属性继承自它的祖先接口 Node，并且扩展了 Node 的父接口 EventTarget，并且从以下部分继承了属性：ParentNode、ChildNode、NonDocumentTypeChildNode，和 Animatable。

## Element.窗口,距离,宽高相关属性

### clientHeight clientWidth

元素内部 只读

包含 content + padding，不包含滚动条。

对于没有定义CSS或者内联布局盒子的元素为0，否则，它是元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距

clientHeight: 获得对象边框内部分的高度

clientWidth: 获得对象边框内部分的宽度

### clientTop clientLeft

元素本身 只读

boder + margin

一个元素顶部边框的宽度（以像素表示）。不包括顶部外边距或内边距。

clientTop: 获取元素顶部边框宽度

clientLeft: 获取对象左侧边框宽度

### offsetLeft offsetTop

元素相对于offsetParent的偏移量 只读

相对于HTMLElement.offsetParent节点的左边界偏移的像素值

HTMLElement.offsetLeft: 返回当前元素左上角相对于HTMLElement.offsetParent节点的左边界偏移的像素值

HTMLElement.offsetTop: 获取对象相对于版面或由offsetTop属性指定的父坐标的计算顶端位置

> 如果父元素设置了position属性值，只要不为static,那么 子元素.offsetParent 就是div

```html
<div style="width: 300px; border-color:blue;
  border-style:solid; border-width:1;">
  <span>Short span. </span>
  <span id="long">Long span that wraps withing this div.</span>
</div>

<div id="box" style="position: absolute; border-color: red;
  border-width: 1; border-style: solid; z-index: 10">
</div>

<script>
  var box = document.getElementById("box");
  var long = document.getElementById("long");
  //
  // long.offsetLeft这个值就是span的offsetLeft.
  // long.offsetParent 返回的是body（在chrome浏览器中测试）
  // 如果id为long的span元素的父元素div，设置了position属性值，只要不为static,那么long.offsetParent就是div

  box.style.left = long.offsetLeft + document.body.scrollLeft + "px";
  box.style.top = long.offsetTop + document.body.scrollTop + "px";
  box.style.width = long.offsetWidth + "px";
  box.style.height = long.offsetHeight + "px";
</script>
```

### offsetHeight offsetWidth

元素本身 包括元素内部滚动 只读

包含 content + padding + border + 滚动条。

offsetHeight: 返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。

offsetWidth: 获得对象的可视区域的宽度，包括边框

### scrollWidth scrollHeight

滚动条元素本身 包括滚动 只读

content + padding + 溢出内容的尺寸

Element.scrollWidth: 表示元素内容的宽度，包括由于滚动而未显示在屏幕中内容(溢出内容的尺寸)

Element.scrollHeight: 获取对象的滚动高度。

### scrollLeft scrollTop

读写

滚动条元素内 可见内容 距离content顶部 左边的 滚动距离

Element.scrollLeft: 这个元素的顶部到视口可见内容（的顶部）的距离的度量

Element.scrollTop: 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离

## Element.getBoundingClientRect()

方法返回元素的大小及其相对于视口的位置

element.getBoundingClientRect()

![](./getboundingclientrect.jpg)

<https://www.jianshu.com/p/824eb6f9dda4>

- left

- right

- top

- bottom

- width

- height

## HTMLElement

HTMLElement 接口表示所有的 HTML 元素。一些HTML元素直接实现了HTMLElement接口，其它的间接实现HTMLElement接口.

继承自父接口Element和 GlobalEventHandlers的属性  

### HTMLElement.style

HTMLElement.style 属性返回一个 CSSStyleDeclaration 对象，表示元素的 内联style 属性（attribute），但忽略任何样式表应用的属性。 通过 style 可以访问的 CSS 属性列表，可以查看 CSS Properties Reference。

CSS Properties Reference:

<https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference>

<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference>

设置 style 属性：

```js
// 在单个语句中设置多个样式
elt.style.cssText = "color: blue; border: 1px solid black";
// 或者
elt.setAttribute("style", "color:red; border: 1px solid blue;");

// 设置特定样式，同时保持其他内联样式值不变
elt.style.color = "blue";
```

获取元素样式信息:

getComputedStyle

## Element.classList

Element.classList 是一个只读属性，返回一个元素的类属性的实时 DOMTokenList 集合。

相比将 element.className 作为以空格分隔的字符串来使用，classList 是一种更方便的访问元素的类列表的方法。

虽然 element.classList 本身是只读的，但是你可以使用 add() 和 remove() 方法修改它。

```
remove add toggle contains replace
```

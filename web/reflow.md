# 重绘（Repaint）和回流（Reflow）

<https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn>

<https://juejin.im/post/5a9923e9518825558251c96a>

腾讯文档： <https://juejin.cn/post/6844903779700047885>

## 重绘 Repaint

重绘: 当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它。

当渲染树中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的操作，比如 background-color，我们将这样的操作称为重绘。

```
color border-style visibility background
text-decoration background-image background-position background-repeat
outline-color outline outline-style border-radius
outline-width box-shadow background-size
```

## 回流 Reflow

回流这一阶段主要是计算节点的位置和几何信息。那么当页面布局和几何信息发生变化的时候，就需要回流。

回流：当渲染树中的一部分（或全部）因为元素的规模尺寸、布局、隐藏等改变而需要重新构建的操作，会影响到布局的操作，这样的操作我们称为回流。

引起回流的操作：

```
添加或者删除可见的 DOM 元素；
元素的位置发生变化
元素尺寸改变——边距、填充、边框、宽度和高度
内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代
页面一开始渲染的时候
浏览器窗口尺寸改变——resize事件发生时
修改网页的默认字体时。
访问以下属性或者使用以下方法: 
  clientWidth、clientHeight、clientTop、clientLeft
  offsetWidth、offsetHeight、offsetTop、offsetLeft
  scrollWidth、scrollHeight、scrollTop、scrollLeft
  scrollIntoView()、scrollIntoViewIfNeeded()
  getComputedStyle()
  getBoundingClientRect()


width height margin padding
display border position overflow
scrollTo()
```

## 区别

回流必定会发生重绘，重绘不一定会引发回流。

回流所需的成本比重绘高的多。

## 减少重绘和回流-CSS

- 使用 transform 替代 top

```js
setTimeout(() => {
  // 引起回流
  document.querySelector('.test').style.top = '100px'
}, 1000)
```

- 不要使用table布局

- 将动画效果应用到position属性为absolute或fixed的元素上

- 避免使用CSS表达式（例如：calc()）

- 避免设置多层内联样式。CSS 选择符从右往左匹配查找，避免节点层级过多

## 减少重绘和回流-JavaScript

- 不要把节点的属性值放在一个循环里当成循环里的变量

```js
for(let i = 0; i < 1000; i++) {
    // 获取 offsetTop 会导致回流，因为需要去获取正确的值
    console.log(document.querySelector('.test').style.offsetTop)
}
```

- 使用 visibility 替换 display: none

因为前者只会引起重绘，后者会引发回流（改变了布局）。也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。

- 动画实现的速度的选择

动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame

- 将频繁重绘或者回流的节点设置为图层

图层能够阻止该节点的渲染行为影响别的节点。比如对于 video 标签来说，浏览器会自动将该节点变为图层。

  will-change： will-change属性可以提前通知浏览器我们要对元素做什么动画，这样浏览器可以提前准备合适的优化设置。这样可以避免对页面响应速度有重要影响的昂贵成本。元素可以更快的被改变，渲染的也更快，这样页面可以快速更新，表现的更加流畅。
  
  video、iframe 标签

- 避免频繁操作DOM

创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。

- 不要一条一条地修改 DOM 的样式

与其这样，还不如预先定义好 css 的 class，然后修改 DOM 的 className。

- 对具有复杂动画的元素使用绝对定位

使它脱离文档流，否则会引起父元素及后续元素频繁回流。

- 获取位置API时进行缓存

获取位置属性，方法，如：getBoundingClientRect等等时

如果要使用它们，最好将值缓存起来, 因为会引起回流

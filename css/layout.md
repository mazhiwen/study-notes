# 布局

<https://juejin.im/post/6844903710070407182#heading-12>

***

## 一些知识

设置width：1000px;或者max-width：1000px(这两者的区别是当屏幕小于1000px时，前者会出现滚动条，后者则不会，显示出实际宽度

## 两列-左内容宽度-右自动填充

一列由内容撑开，另一列撑满剩余宽度的布局方式

### float + overflow:hidden

方法：父元素 overflow:hidden，子元素第一个float:left；第二个 overflow:hidden

第二个元素 设置overflow:hidden，以不会被第一个元素float影响,不会使布局坍塌，被float元素覆盖重叠。会在左边元素的右边顺序布局，并width自动填充

```html
<div class="parent" style="background-color: lightgrey;">
  <div class="left" style="background-color: lightblue;">
    <p>left</p>
  </div>
  <div class="right"  style="background-color: lightgreen;">
    <p>right</p>
    <p>right</p>
  </div>
</div>

<style>
.parent {
  overflow: hidden;
  zoom: 1;
}
.left {
  float: left;
  margin-right: 20px;
}
.right {
  overflow: hidden;
  zoom: 1;
}
</style>
```

### flex

```css
.parent {
  display:flex;
}  
.right {
  margin-left:20px;
  flex:1;
}
```

### gird

```css
.parent {
  display:grid;
  grid-template-columns:auto 1fr;
  grid-gap:20px
}
```

## 两列-左边定宽-右边自动填充

### float + calc

```css
.left{
  float:left;
  width: 200px;
  outline: 1px solid red;
}
.right{
  width:calc(100% - 200px);
  float:left;
  outline: 1px solid red;
}
```

### table + table-cell

```css
.container {
  display: table;
  table-layout: fixed;
  width: 100%;
}
.left, .right {
  display: table-cell;
  height: 600px;
}
.left {
  width: 400px;
  background-color: aqua;
}
.right {
  background-color: blueviolet;
}
```

### flex + flex-grow

```css
.contain {
  display: flex
}
.right {
  flex: 1
}
```

### float + margin

```css
.left {
  width: 400px;
  float: left;
  border: 1px solid blue;
}
.right {
  margin-left: 400px;
  border: 1px solid red;
}
```

> div块元素，自适应宽度

```css
/* 改进 */
.left {
  float:left;
  width:100px;
  position:relative;
}
.right-fix {
  float:right;
  width:100%;
  margin-left:-100px;
  outline: 1px solid red;
}
.right {
  margin-left:120px;
}

```

### float + overflow

```css
.left {
  width: 400px;
  float: left;
  border: 1px solid blue;
}
.right {
  overflow: hidden;
  border: 1px solid red;
}
```

## 三栏-中间列自适应宽度，旁边两侧固定宽度

### 圣杯布局

dom结构必须是先写中间列部分，这样实现中间列可以优先加载。

float元素是在contentbox区域开始进行计算布局,即去掉margin border padding的content盒子区域

中间子元素float，并width：100%占满父元素。左子元素 float，margin-left:-100%,可以实现相对当前位置上移到父元素内容区域开始部分

margin-left可以使元素出现上移，再通过positon:relative 对元素做偏移

实现步骤:

1. 三个部分都设定为左浮动，否则左右两边内容上不去，就不可能与中间列同一行。然后设置center的宽度为100%(实现中间列内容自适应)，此时，left和right部分会跳到下一行

2. 通过设置margin-left为负值让left和right部分回到与center部分同一行

3. 通过设置父容器的padding-left和padding-right，让左右两边留出间隙。

4. 通过设置相对定位，让left和right部分移动到两边。

```html
<div class="container">
  <div class="center">
    <h2>圣杯布局center</h2>
  </div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>

<style>
.container {
  padding-left: 220px;//为左右栏腾出空间
  padding-right: 220px;
  overflow: hidden;
  background: lightblue;
}
.center {
  float: left;
  width: 100%;
  height: 500px;
  background: yellow;
}
.left {
  float: left;
  width: 200px;
  height: 400px;
  background: red;
  margin-left: -100%;
  position: relative;
  left: -220px;
}
.right {
  float: left;
  width: 200px;
  height: 400px;
  background: blue;
  margin-left: -200px;
  position: relative;
  right: -220px;
}

.center,
.left,
.right {
  padding-bottom: 10000px;
  margin-bottom: -10000px;
}
</style>
```

### 双飞翼布局

同样也是三栏布局，在圣杯布局基础上进一步优化，解决了圣杯布局错乱问题，实现了内容与布局的分离。而且任何一栏都可以是最高栏，不会出问题。

实现步骤:

前两步与圣杯布局一样

三个部分都设定为左浮动，然后设置center的宽度为100%，此时，left和right部分会跳到下一行；

通过设置margin-left为负值让left和right部分回到与center部分同一行；

center部分增加一个内层div，并设margin: 0 200px

left和right会依次在center下方左边距位置开始计算float位置

```html
<article class="container">
  <div class="center">
      <div class="inner">双飞翼布局</div>
  </div>
  <div class="left"></div>
  <div class="right"></div>
</article>

<style>
.container {
  min-width: 600px;//确保中间内容可以显示出来，两倍left宽+right宽
}
.left {
  float: left;
  width: 200px;
  height: 400px;
  background: red;
  margin-left: -100%;
}
.center {
  float: left;
  width: 100%;
  height: 500px;
  background: yellow;
}
.center .inner {
  margin: 0 200px; //新增部分
}
.right {
  float: left;
  width: 200px;
  height: 400px;
  background: blue;
  margin-left: -200px;
}
</style>
```

float + margin负值后 margin元素不会占据文档位

## 三栏-左中固定，右自适应

```html
<div class="left">
  <p>left</p>
</div>
<div class="center">
  <p>center</p>
</div>
<div class="right">
  <p>right</p>
  <p>right</p>
</div>
```

> overflow: hidden 可以抵消受到同层级float元素的效果,并且自适应宽度

```css
.left,.center{
  float: left;
  margin-right: 20px;
  outline: 1px solid red;
}
.right{
  overflow: hidden;
}
.left p,.center p{
    width: 100px;
}
```

## 等高布局

等高布局是指子元素在父元素中高度相等的布局方式。

### 利用正padding+负margin

利用padding-bottom|margin-bottom正负值相抵，不会影响页面布局的特点。设置父容器设置超出隐藏（overflow:hidden），这样父容器的高度就还是它里面的列没有设定padding-bottom时的高度，当它里面的任一列高度增加了，则父容器的高度被撑到里面最高那列的高度，其他比这列矮的列会用它们的padding-bottom补偿这部分高度差。

overflow:hidden 可以把 负的 margin-bottom 隐藏

在圣杯布局的基础上

```css
.center,
.left,
.right {
  padding-bottom: 10000px;
  margin-bottom: -10000px;
}
.container {
  padding-left: 220px;
  padding-right: 220px;
  overflow: hidden;//把溢出背景切掉
}
```

### 利用背景图片

这种方法是我们实现等高列最早使用的一种方法，就是使用背景图片，在列的父元素上使用这个背景图进行Y轴的铺放，从而实现一种等高列的假象。实现方法简单，兼容性强，不需要太多的css样式就可以轻松实现,但此方法不适合流体布局等高列的布局。

```html
<div class=”container clearfix”>
    <div class=”left”></div>
    <div  class=”content”></div>
    <div class=”right”></div>
</div>

<style>
.container {
  background: url("column.png") repeat-y;
  width: 960px;
  margin: 0 auto;
}
</style>
```

### 模仿表格布局

（2）利用table-cell所有单元格高度都相等的特性，来实现多列等高。

table > tablerow > tablecell  tablecell中的其中一个height，所有tablecell会等高

```html
<div class="container table">
  <div class="containerInner tableRow">
    <div class="column tableCell cell1">
      <div class="left aside">
        ....
      </div>
    </div>
    <div class="column tableCell cell2">
      <div class="content section">
        ...
      </div>
    </div>
    <div class="column tableCell cell3">
      <div class="right aside">
        ...
      </div>
    </div>
  </div>
</div>

<style>
.table {
  width: auto;
  min-width: 1000px;
  margin: 0 auto;
  padding: 0;
  display: table;
}
.tableRow {
  display: table-row;
}
.tableCell {
  display: table-cell;
  width: 33%;
}
.cell1 {
  background: #f00;
  height: 800px;
}
.cell2 {
  background: #0f0;
}
.cell3 {
  background: #00f;
}
</style>
```

### 使用边框和定位

子元素position:absolute，height固定。左边border-right，右边margin-left。都用固定值

```html
<div id="wrapper">
  <div id="mainContent">...</div>
  <div id="sidebar">...</div>
</div>

<style>
#wrapper {
  width: 960px;
  margin: 0 auto;
}
#mainContent {
  border-right: 220px solid #dfdfdf;
  position: absolute;
  width: 740px;
  height: 800px;  
  background: green;
}
#sidebar {
  background: #dfdfdf;
  margin-left: 740px;
  position: absolute;
  height: 800px;
  width: 220px;
}
</style>

```

### 利用flex

利用flex布局中项目align-items属性默认为stretch，如果项目未设置高度或设为auto，将占满整个容器的高度的特性，来实现多列等高

## 全页面布局

**absolute**

absolute时，设置top,bottom后，可以实现高度自适应

```html
<div class="parent">
  <div class="top">
    top
  </div>
  <div class="left">
    left
  </div>
  <div class="right">
    <div class="inner">
      right
    </div>
  </div>
  <div class="bottom">
    bottom
  </div>
</div>
```

```css
html,body,.parent{
    margin:0;
    height:100%;
    overflow:hidden;
}
body{
    color:white;
}
.top{
    position:absolute;
    top:0;
    left:0;
    right:0;
    height:100px;
    background:blue;
}
.left{
    position:absolute;
    left:0;
    top:100px;
    bottom:50px;
    width:200px;
    background:red;
}
.right{
    position:absolute;
    left:200px;
    top:100px;
    bottom:50px;
    right:0;
    background:pink;
    overflow: auto;
}
.right .inner{
    min-height: 1000px;
}
.bottom{
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    height:50px;
    background: black;
}
```

## 有一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一个填满剩下的高度

（1）外层div使用position：relative；高度要求自适应的div使用position:absolute;top:100px;bottom:0;left:0;right:0;

（2）使用flex布局，设置主轴为竖轴，第二个div的flex-grow为1。

# 布局

- [一些知识](#一些知识)
- [两列布局](#两列布局)
- [三栏布局](#三栏布局)
- [全页面布局](#全页面布局)
- [多列等高布局](#多列等高布局)

***

## 一些知识

设置width：1000px;或者max-width：1000px(这两者的区别是当屏幕小于1000px时，前者会出现滚动条，后者则不会，显示出实际宽度

## 两列布局

### 两列自适应布局

- float + overflow:hidden

一列由内容撑开，另一列撑满剩余宽度的布局方式

方法：父元素 overflow:hidden，子元素第一个float:left；第二个 overflow:hidden

第二个元素 设置overflow:hidden，以不会被第一个元素float影响,不会使布局坍塌，被float元素覆盖重叠。

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

- flex

```css
.parent {
  display:flex;
}  
.right {
  margin-left:20px;
  flex:1;
}
```

- gird

```css
.parent {
  display:grid;
  grid-template-columns:auto 1fr;
  grid-gap:20px
}
```

### 左边定宽-右边自适应

- float + calc

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

- table + table-cell

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

- flex + flex-grow

```css
.contain {
  display: flex
}
.right {
  flex: 1
}
```

- float + margin

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

- float + overflow

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

## 三栏布局

### 中间列自适应宽度，旁边两侧固定宽度

- 圣杯布局：

dom结构必须是先写中间列部分，这样实现中间列可以优先加载。

float元素是在contentbox区域开始进行计算布局,即去掉margin border padding的content盒子区域

中间子元素float，并width：100%占满父元素。左子元素 float，margin-left:-100%,可以实现相对当前位置上移到父元素内容区域开始部分

margin-left可以使元素出现上移，再通过positon:relative 对元素做偏移

```html
<div class="container">
  <div class="center">
    <h2>圣杯布局</h2>
  </div>
  <div class="left"></div>
  <div class="right"></div>
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
</style>
```

- position（绝对定位法）

center的div需要放在最后面
  绝对定位法原理将左右两边使用absolute定位，因为绝对定位使其脱离文档流，后面的center会自然流动到他们的上卖弄，然后margin属性，留出左右两边的宽度。就可以自适应了。  
  
- float

自身浮动法 center的div需要放到后面
  自身浮动法的原理就是对左右使用float:left和float：right，float使左右两个元素脱离文档流，中间的正常文档流中，使用margin指定左右外边距对其进行一个定位。  

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>双飞翼</title>
    <style>
.main{
    float:left;
    width:100%;
    height:100px;
    background:#999;
}
.left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:#111;
}
.right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:#eee;
}
.inline{
  /*main实际展示区域*/
  margin:0 200px 0 180px;
  background: #ddd;
}
</style>
</head>
<body>
  <div class="main">
    <div class="inline">middle</div>
  </div>
  <div class="left">left</div>
  <div class="right">right</div>
</body>
</html>
```

### 两列固定-一列自适应

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

## 全页面布局

**absolute**

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

> absolute时，设置top,bottom后，可以实现高度自适应

## 多列等高布局

```
（1）利用padding-bottom|margin-bottom正负值相抵，不会影响页面布局的特点。设置父容器设置超出隐藏（overflow:
hidden），这样父容器的高度就还是它里面的列没有设定padding-bottom时的高度，当它里面的任一列高度增加了，则
父容器的高度被撑到里面最高那列的高度，其他比这列矮的列会用它们的padding-bottom补偿这部分高度差。

（2）利用table-cell所有单元格高度都相等的特性，来实现多列等高。

（3）利用flex布局中项目align-items属性默认为stretch，如果项目未设置高度或设为auto，将占满整个容器的高度
的特性，来实现多列等高。
```

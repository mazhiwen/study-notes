# 布局

- [三栏布局](#三栏布局)
- [两列固定-一列自适应](#两列固定-一列自适应)
- [左边定宽-右边自适应](#左边定宽-右边自适应)
- [全页面布局](#全页面布局)
- [多列等高布局](#多列等高布局)

***

## 三栏布局

两边两栏宽度固定，中间栏宽度自适应

* position（绝对定位法） center的div需要放在最后面
  绝对定位法原理将左右两边使用absolute定位，因为绝对定位使其脱离文档流，后面的center会自然流动到他们的上卖弄，然后margin属性，留出左右两边的宽度。就可以自适应了。  
  
* float 自身浮动法 center的div需要放到后面
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

* 圣杯布局：

```html
<!DOCTYPE html>
<html>
<head lang="en">
<title>圣杯</title>
<style>
.container{
  /*控制main区域*/
  padding:0 200px 0 180px;
  height:100px;
}
.main{
  /*继承container宽度*/
  float:left;
  width:100%;
  height:100px;
  background:#999;
}
.left{

  float:left;
  width:180px;
  height:100px;
  /*左移到左侧 相对main区域*/
  position:relative;
  left:-180px;
  /*同位上移*/
  margin-left:-100%;
  background:#111;
}
.right{
  float:left;
  width:200px;
  height:100px;
  margin-left:-200px;
  background:#eee;
  position:relative;
  right:-200px;
}
</style>
</head>
<body>
<div class="container">
  <div class="main">middle</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
</body>
</html>
```

## 两列固定-一列自适应

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

## 左边定宽-右边自适应

**float cacl**

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

**table table-cell**

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

**flex**

```css
.contain {
  display: flex
}
.right {
  flex: 1
}
```

**float margin**

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

**float overflow**

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

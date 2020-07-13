# 居中

- [水平居中](#水平居中)
- [垂直居中](#垂直居中)

## 水平居中

### 行内元素水平居中

text-align:center : 可以实现在块级元素内部的行内元素水平居中。此方法对inline、inline-block、inline-table和inline-flex元素水平居中都有效。

如果块级元素内部包着也是一个块级元素，我们可以先将其由块级元素display:inline-block，再给父块元素text-align:center。

### 块级元素的水平居中

- margin-left和margin-right设置为auto

- display:table + margin:auto

先将子元素display:table，再margin左右auto

display:table在表现上类似block元素，但是宽度为内容宽。

- absolute + transform

先将父元素设置为相对定位，再将子元素设置为绝对定位，向右移动子元素，移动距离为父容器的一半，最后通过向左移动子元素的一半宽度以达到水平居中。

```css
.parent {
  position:relative;
}
.child {
  position:absolute;
  left:50%;
  transform:translateX(-50%);
}
```

- flex + justify-content

```css
.parent{
  display: flex;
  justify-content:center;
}
```

- flex + margin

通过flex将父容器设置为为Flex布局，再设置子元素居中。

```css
.parent {
  display: flex;
}
.child {
  margin:0 auto;
}
```

### 多块级元素水平居中

- flex + justify-content

- 子元素inline-block + 父元素text-align:center

### 浮动元素水平居中

- 定宽的浮动元素

通过浮动的子元素设置relative + left:50%; + 负margin-left

```css
.child {
  float: left;
  width: 500px;

  position:relative;
  left:50%;
  margin-left:-250px;
}
```

- 不定宽的浮动元素

通过父子容器都相对定位，偏移位移

```html
<div class="box">
  <p>我是浮动的</p>
  <p>我也是居中的</p>
</div>

<style>
.box{
  float:left;
  position:relative;
  left:50%;
}
p{
  float:left;
  position:relative;
  right:50%;
}
<style>
```

- flex布局(不管是定宽还是不定宽)

父元素添加display:flex;justify-content:center;

### 绝对定位元素水平居中

通过子元素绝对定位，外加margin: 0 auto来实现。

要做到水平居中时，子元素left,right都设置0，margin左右为auto就可以水平居中.

```html
<div class="parent">
    <div class="child">让绝对定位的元素水平居中对齐。</div>
</div>

<style>
.parent{
  position:relative;
}
.child{
  position: absolute; /*绝对定位*/
  width: 200px;
  height:100px;
  background: yellow;
  margin: 0 auto; /*水平居中*/
  left: 0; /*此处不能省略，且为0*/
  right: 0;/*此处不能省略，且为0*/
}
<style>
```

## 垂直居中

### 单行内联元素垂直居中

```
height: 120px;
line-height: 120px;
```

### 多行内联元素垂直居中

- flex + lex-direction + justify-content

```css
display: flex;
flex-direction: column;
justify-content: center;
```

- table + table-cell + vertical-align

```css
.parent {
  display: table;
  height: 140px;
  border: 2px dashed #f69c55;
}
.child {
  display: table-cell;
  vertical-align: middle;
}
```

### 块级元素垂直居中

- 已知居中元素的高度宽度: absolute + 负margin

```
<div class="parent">
    <div class="child">固定高度的块级元素垂直居中。</div>
</div>

.parent {
  position: relative;
  width: 100%;
  height: 200px;
  background: gray;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px;
  background: pink;
}

```

- 未知居中元素的高度和宽度: absolute + transform

```css
.wrap{
  position:relative;
  background:gray;
  height: 100px;
}
.test{
  background: red;
  width: 100px;
  position: absolute;
  /* 水平同时居中 */
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  /* 或者单独垂直居中 */
  top: 50%;
  transform: translateY(-50%);
}
```

- flex + align-items

```css
#box {
  width: 300px;
  height: 300px;
  background: #ddd;
  display: flex;
  align-items: center;
}
```

- table-cell + vertical-align

```html
<div class="parent">
  <div class="child">Demo</div>
</div>


<style>
  .parent {
    display: table-cell;
    vertical-align: middle;
  }
</style>
```

## 水平垂直居中

- 已知高度宽度: absolute + 负margin

这种方式需要知道被垂直居中元素的高和宽，才能计算出margin值，兼容所有浏览器。

```html
<body>
  <div id='container'>
    <div id='center' style="width: 100px;height: 100px;background-color: #666">center</div>
  </div>
</body>


<style>
#container {
  position: relative;
}
#center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
}
</style>
```

- absolute + margin:auto

```css
#container {
  position: relative;
  height:100px;//必须有个高度
}
#center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;//注意此处的写法
}
```

- absolute + transform

```css
#container {
  position: relative;
}
#center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- flex + justify-content + align-items

```css
#container {//直接在父容器设置即可
  height: 100vh;//必须有高度
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- flex/grid + margin:auto

```css
#container {
  height: 100vh;//必须有高度
  display: grid;
}
#center {
  margin: auto;
}
```

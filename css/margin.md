# margin

## margin值

auto : 浏览器计算外边距

length : 规定以具体单位计的外边距值，比如像素、厘米等。默认值是 0px

% : 规定基于父元素的宽度的百分比的外边距

inherit : 规定应该从父元素继承外边距

## margin:auto

margin: auto生效的前提是元素在width和height为auto的时候能够自动填充容器，这样，在设置width或height的值时，如果还有剩余尺寸，margin: auto就可以利用剩余尺寸。

因此在绝对定位元素设置了top、bottom、left、right的情况下，就可以很方便地实现水平垂直居中，如下：

```css
.father {
  width:200px;
  height:200px;
  border:1px solid #ccc;  
  position :relative;
  .child {
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100px;
    height:100px;
    margin:auto;
    background:red;
  }
}
```

## width:auto时，margin左右正负值可以改变元素尺寸

margin左右负值可以使width:auto的元素宽度增宽或者减窄

宽度width固定时,margin-right正负值不会改变元素布局流。相反，宽度width:auto时,margin-right正负值会改变元素布局流。

而,margin-left无论width多少都会影响布局流。

```css

.div1{
  height: 50px;
  margin: 10px -10px;
  background: red;
}
.div2{
  height: 50px;
  margin: 10px 10px;
  background: blue;
}

```

## margin负值

用途：

- 使得margin:right不折行

通过margin右负值实现宽度向右边增加

```html
<div class="div1">
  <ul class="ul">
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```

```css
.div1{
  width: 320px;
  border:1px solid blue;
}
.ul{
  overflow:hidden;
  padding:0;
  margin: 0 -10px 0 0;
  background: blue;
}
.ul > li {
  float:left;
  list-style:none;
  width:100px;
  height:100px;
  margin-right:10px;
  background:red;
}

```

- 等高布局

区别于margin左右，margin上下正负值并不会使元素高度变化

等高布局 ：可以实现内容区域高度随内容自动增加高低，因为padding区域会被overflow:hidden隐藏掉的重叠的marigin的区域

margin负值的区域，在父元素overflow:hidden的时候会视溢出区域而被隐藏。也就是说margin正负值可以影响overflow:hidden的区域

margin-bottom正值或者负值都不会影响元素的布局流位置。margin-bottom正值可以撑开父元素高度。margin-bottom负值会使当前行布局流上移到负值区域，导致后面布局同时上移。

margin-top正值或者负值都会影响元素的布局流位置,使元素布局下移或者上移。

```html
<div class="div1">
  <div class="c1">红</div>
  <div class="c2">
    <p>蓝色</p>
    <p>蓝色</p>
  </div>
</div>
```

```css
.div1{
  overflow:hidden;
  width:300px;
}
.c1{
  background:red;
}
.c2{
  background:blue;
}
.c1,.c2{
  float:left;
  width:50%;
  margin-bottom:-99999px;
  padding-bottom:99999px;
}
```

## margin重叠

margin cllapse ，magin坍塌，margin合并

块级元素 的 上外边距margin-top与 下外边距margin-top 有时会合并为单个外边距，这种现象称为“margin合并”。一般会有以下三种：

### 相邻兄弟元素margin合并

```html
<div class="div1">11</div>
<div class="div2">2</div>
```

```css
.div1{
  width:300px;
  background: red;
  margin-bottom: 100px;
}
.div2{
  margin-top: 100px;
  width:300px;
  background: blue;
}
```

避免重叠解决办法见BFC模块内容 [BFC](./BFC.md)

### 父级和第一个/最后一个子元素合并

父子：子元素margin-top或者margin-bottom，会添加到父元素margin-top或者margin-bottom。而不会添加在父子元素之间。

```html
<div class="div1">
  <div class="div2">2</div>
</div>
```

```css
.div1{
  width:300px;
  background: red;
  margin-top: 100px;
}
.div2{
  margin-top: 100px;
  width:300px;
  background: blue;
}
```

解决办法：

- margin-top合并，解决方案：

```
父元素设置为块状格式化上下文元素,即BFC

父元素设置border-top值

父元素设置padding-top正值

父元素和第一个子元素之间添加内联元素进行分隔。如:加个文字
```

- margin-bottom合并，解决方案：

```
父元素设置为块状格式化上下文元素

父元素设置border-bottom值

父元素设置padding-bottom值

父元素和最后一个子元素之间添加内联元素进行分隔

父元素设置 height、min-height 或 max-height。
```

### 3、空块级元素的margin合并，即自身有margin-top和margin-bottom，但元素是空的，此时会合并为一个margin

解决办法：

- 设置垂直方向的border；
- 设置垂直方向的padding；
- 里面添加内联元素（直接Space键空格是没用的）；
- 设置height或者min-height。

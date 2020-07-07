# BFC

(Block Formatting Context)

<https://github.com/ljianshu/Blog/issues/15>

## 定义

BFC直意为块级格式化上下文

它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。通俗地讲，BFC是一个容器，用于管理块级元素。

## 创建BFC的方式

- float为 left|right
- overflow为 hidden|auto|scroll
- display为 table-cell|table-caption|inline-block|inline-flex|flex
- position为 absolute|fixed
- 根元素

## BFC布局规则

内部的Box会在垂直方向，一个接一个地放置(即块级元素独占一行)。

BFC的区域不会与float box重叠(利用这点可以实现自适应两栏布局)。

内部的Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠(margin重叠三个条件:同属于一个BFC;相邻;块级元素)。

计算BFC的高度时，浮动元素也参与计算。（清除浮动 haslayout）

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

## 用法特性

### 特性一：BFC会阻止垂直外边距折叠

1. 解决相邻元素margin重叠

只有同属于一个BFC时，两个元素才有可能发生垂直margin的重叠

这个包括相邻元素或者嵌套元素，只要他们之间没有阻挡（比如边框、非空内容、padding等）就会发生margin重叠。

例子中两个相邻p发生margin重叠。

解决margin重叠：在发生重叠的其中一个p外面包裹一层容器,如 .wrap ，并触发该容器生成一个BFC，如overflow:hidden。那么两个div便不属于同一个BFC，就不会发生margin重叠了。

```html
<p>ABC</p>
<div class="wrap">
  <p>abc</p>
</div>
```

```css
p{
  color: #fff;
  background: #888;
  width: 200px;
  line-height: 100px;
  text-align:center;
  margin: 100px;
}
.wrap{
  overflow:hidden;
}
```

2. 解决父子元素margin重叠

上图wrap元素与h1元素之间理论上本该有个40px的上下margin值,然而实际上父子元素并没有存在margin值，子元素h1的margin加在了父元素的margin值上。使父元素与上个元素div元素的间距为40px。

处理方法其实有很多，详细见[margin](./margin.md):

BFC方法: 在wrap元素中添加:overflow:hidden;或者overflow：auto；使其父元素形成一个BFC；

添加阻隔: 也可以在wrap元素中添加border：1px solid；或是padding：1px；

```html
<div class="box">box</div>
<div class="wrap">
  <h1>h1</h1>
</div>
```

```css
.box{
width:100px;
height:100px;
background:#ccc;
}
.wrap {
  background:yellow;
}
.wrap h1{
  background:pink;
  margin:40px;
}
```

### 特性二：包含浮动

3. 清除子元素给父元素造成的浮动效果：给父元素造BFC

```html
<div class="one">
  <div class="two">Hello World!</div>
</div>
你好世界！
```

```css
.one {
  background-color: pink;
  overflow: hidden;
}
.two {
  float: left;
}
```

### 特性三：浮动元素与下层元素重叠问题

4. 取消float元素的相邻元素的浮动重叠效果

.box1 是 float 的元素。 .box2 用属性 overflow: hidden; 清除了.box1 的 float 造成的 .box2被压在.box1下面的情况

```html
<div class="box1">box1</div>
<div class="box2">box2</div>
```

```css
.box1 {
  float: left;
  width: 100px;
  height: 100px;
  background-color: pink;
}
.box2 {
  width: 200px;
  height: 200px;
  background-color: skyblue;
  overflow: hidden;
  /*或者 float: left;*/
}
```

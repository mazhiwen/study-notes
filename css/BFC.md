# BFC

(Block Formatting Context)

<https://github.com/ljianshu/Blog/issues/15>

BFC直意为块级格式化上下文

块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

BFC 是一个独立的布局环境,可以理解为一个容器,在这个容器中按照一定规则进行物品摆放,并且不会影响其它环境中的物品。

BFC指的是块级格式化上下文，一个元素形成了BFC之后，那么它内部元素产生的布局不会影响到外部元素，外部元素的布局也不会影响到BFC中的内部元素。一个BFC就像是一个隔离区域，和其他区域互不影响。

一般来说根元素是一个BFC区域，浮动和绝对定位的元素也会形成BFC，display属性的值为inline-block、flex这些属性时也会创建BFC。还有就是元素的overflow的值不为visible时都会创建BFC。

BFC 是一个独立的容器，容器内子元素不会影响容器外的元素。反之亦如此。

盒子从顶端开始垂直地一个接一个地排列，盒子之间垂直的间距是由 margin 决定的。在同一个 BFC 中，两个相邻的块级盒子的垂直外边距会发生重叠。

BFC 区域不会和 float box 发生上下重叠。

BFC 能够识别并包含浮动元素，当计算其区域的高度时，浮动元素也可以参与计算了。

## 创建BFC的方式

- float 为 left|right

- overflow 为 hidden|auto|scroll

- display 为 table-cell|table-caption|inline-block|inline-flex|flex

- position 为 absolute|fixed

- 根元素

## 用法特性

### 特性一：BFC会阻止垂直外边距重叠

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

### 特性二：让父元素包含浮动，并清除子元素浮动给父元素造成的高度塌陷效果

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

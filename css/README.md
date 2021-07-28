# css

参考：

[灵活运用CSS开发技巧](https://juejin.cn/post/6844903926110617613)

[CSS布局解决方案（终结版）](https://segmentfault.com/a/1190000013565024?utm_source=channel-hottest#item-1)

《css权威指南》

<https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/Css/Css.md>

## 角度单位

\<angle>

deg :度 360deg  
grad :百分度 400grad  
rad :弧度 2π  
turn :1turn  

## white-space

white-space CSS 属性是用来设置如何处理元素中的 空白。

因此，white-space可以决定图文内容是否在一行显示（回车空格是否生效），是否显示大段连续空白（空格是否生效）等。

```css
/*合并空白字符和换行符*/
white-space: normal;

/*和 normal 一样，连续的空白符会被合并。但文本内的换行无效，即转换为空格。*/
white-space: nowrap;

/*空白字符不合并，并且内容只在有换行符的地方换行。*/
white-space: pre;

/*空白字符不合并，并且内容只在有换行符的地方换行，同时允许文本环绕。*/
white-space: pre-wrap;

/*合并空白字符，但只在有换行符的地方换行，允许文本环绕。*/
white-space: pre-line;
```

## word-break

## box-shadow

box-shadow: h-shadow v-shadow blur spread color inset;
h-shadow 必需。水平阴影的位置。允许负值。  
v-shadow 必需。垂直阴影的位置。允许负值。  
blur 可选。模糊距离。  
spread 可选。阴影的尺寸。  
color 可选。阴影的颜色。请参阅 CSS 颜色值。  
inset 可选。将外部阴影 (outset) 改为内部阴影。  

```
box-shadow: 0px 0px 5px 1px gray;
```

## 选择器

样式系统从关键选择器开始匹配，然后左移查找规则选择器的祖先元素。只要选择器的子树一直在工作，样式系统就会持续左移，直到和规则匹配，或者是因为不匹配而放弃该规则。

试想一下，如果采用从左至右的方式读取CSS规则，那么大多数规则读到最后（最右）才会发现是不匹配的，这样做会费时耗能，最后有很多都是无用的；而如果采取从右向左的方式，那么只要发现最右边选择器不匹配，就可以直接舍弃了，避免了许多无效匹配。

```
（1）id选择器（#myid）
（2）类选择器（.myclassname）
（3）标签选择器（div,h1,p）
（4）后代选择器（h1p）
（5）相邻后代选择器（子）选择器（ul>li）
（6）兄弟选择器（li~a）
（7）相邻后一个兄弟选择器（li+a）
（8）属性选择器（a[rel="external"]）
（9）伪类选择器（a:hover,li:nth-child）
（10）伪元素选择器（::before、::after）
（11）通配符选择器（*）
```  

**优先级：**
!important > 行内样式 > ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性

后写的会覆盖先写的

判断优先级时，首先我们会判断一条属性声明是否有权重，也就是是否在声明后面加上了!important。一条声明如果加上了权重，那么它的优先级就是最高的，前提是它之后不再出现相同权重的声明。如果权重相同，我们则需要去比较匹配规则的特殊性。

一条匹配规则一般由多个选择器组成，一条规则的特殊性由组成它的选择器的特殊性累加而成。

选择器的特殊性可以分为四个等级，第一个等级是行内样式，为1000，第二个等级是id选择器，为0100，第三个等级是类选择器、伪类选择器和属性选择器，为0010，第四个等级是元素选择器和伪元素选择器，为0001。

规则中每出现一个选择器，就将它的特殊性进行叠加，这个叠加只限于对应的等级的叠加，不会产生进位。选择器特殊性值的比较是从左向右排序的，也就是说以1开头的特殊性值比所有以0开头的特殊性值要大。

比如说特殊性值为1000的的规则优先级就要比特殊性值为0999的规则高。如果两个规则的特殊性值相等的时候，那么就会根据它们引入的顺序，后出现的规则的优先级最高。

## 0.5px的边

### transform: scale

```css
.thinner-border {
  width: 10px;
  height: 20px;
  background: gray;
  position: relative; /* 只要不是默认值static即可 */
}
.thinner-border:before {
  content: '';
  position: absolute;
  border: 1px solid red;
  width: 200%;
  height: 200%;
  transform-origin: 0 0;
  transform: scale(0.5, 0.5);
  box-sizing: border-box;
}
```

### border-image

### meta viewport实现

## overflow

<https://juejin.im/post/581dcefbda2f60005df93b54>

overflow 属性指定了一个块容器元素在其内容溢出这个元素的时候，内容是否裁掉。

一个设置了overflow:hidden声明的元素，假设同时存在border属性和padding属性，则当子元素内容超出容器宽度高度限制的时候，剪裁的边界是border box的内边缘，而非padding box的内边缘。

作用:

- overflow 的值为非 visible 的时候可以生成新的 BFC （块级格式化上下文），常见的结果就是：消除浮动影响（清除子元素浮动引起的父元素对自元素忽略空间效果）、左侧固定右侧自适应（不需要指定 margin-left ）、margin 不再折叠等。

- overflow:hidden 搭配 white-space:nowrap、text-overflow:ellipsis实现...效果。

- overflow:hidden 可以让 1px（ scale(0.5) 这种）显示的更加精细。

- overflow:hidden 可以解决移动端页面内容（一般文字内容相对多一点的时候效果更明显）会出现“进来左右方向缩小到一块”然后再变为正常布局的 bug ，这个 bug 会引起很明显的闪动效果。

float浮动的div会失去独霸一行的能力，也就是宽度自填充满。而overflow清除子元素对父元素的浮动影响后，父元素可以独霸一行。

## media

<https://www.runoob.com/cssref/css3-pr-mediaquery.html>

```css
/* 321px 到 375px之间时的样式 */
@media screen and (min-width:321px) and (max-width:375px){
  html{
    font-size:11px
  }
}

```

### print

```css
@media print{
  /* background 无效时，添加 -webkit-print-color-adjust: exact; */
}

```

position,float 会导致打印位置错乱.

## 继承属性

initial,inherit,unset

initial 关键字可用于任何 HTML 元素上的任何 CSS 属性。

每一个属性在定义中都给出了这个属性是否具有继承性，一个具有继承性的属性会在没有指定值的时候，会使用父元素的同属性的值来作为自己的值。

一般具有继承性的属性有，字体相关的属性，font-size和font-weight等。文本相关的属性，color和text-align等。表格的一些布局属性、列表属性如list-style等。还有光标属性cursor、元素可见性visibility。

当一个属性不是继承属性的时候，我们也可以通过将它的值设置为inherit来使它从父元素那获取同名的属性值来继承。

```
有继承性的属性：

（1）字体系列属性
font、font-family、font-weight、font-size、font-style、font-variant、font-stretch、font-size-adjust

（2）文本系列属性
text-indent、text-align、text-shadow、line-height、word-spacing、letter-spacing、
text-transform、direction、color

（3）表格布局属性
caption-side border-collapse empty-cells

（4）列表属性
list-style-type、list-style-image、list-style-position、list-style

（5）光标属性
cursor

（6）元素可见性
visibility

（7）还有一些不常用的；speak，page，设置嵌套引用的引号类型quotes等属性
```

```
每一个属性在定义中都给出了这个属性是否具有继承性，一个具有继承性的属性会在没有指定值的时候，会使用父元素的同属性的值
来作为自己的值。

一般具有继承性的属性有，字体相关的属性，font-size和font-weight等。文本相关的属性，color和text-align等。
表格的一些布局属性、列表属性如list-style等。还有光标属性cursor、元素可见性visibility。

当一个属性不是继承属性的时候，我们也可以通过将它的值设置为inherit来使它从父元素那获取同名的属性值来继承。
```

## 文字溢出

省略号

参考: <https://zhuanlan.zhihu.com/p/30707916>

### 单行文本溢出

```css
p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

```

### 多行文本溢出

结合 scrollWidth > clientWidth 计算行数。

配置height行高.

初始样式：

```css
p {
  width:100px;
  overflow: scroll;
  white-space: nowrap;
  height: 3em;
  width:100px;
  line-height: 1.5em;
  position: relative;
}
```

计算后，加跨行溢出样式：

```less
p..breakline {
  word-break: break-all;
  white-space: initial;
  overflow: hidden;
}
p.moreline {
  &:after {
    content: '...';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    text-align: right;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);
  }
}
```

## 等宽字体

比例字体

<https://cloud.tencent.com/developer/article/1009289>

## 浏览器css前缀

```
mozilla 内核 （firefox,flock 等）    -moz
webkit  内核 （safari,chrome 等）   -webkit
opera   内核 （opera 浏览器）        -o
trident 内核 （ie 浏览器）           -ms
```

## css实现三角形

采用的是相邻边框连接处的均分原理。

将元素的宽高设为0，只设置border

把任意三条边隐藏掉（颜色设为transparent），剩下的就是一个三角形。

```css
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```

## 伪元素与伪类

在css3中使用单冒号来表示伪类，用双冒号来表示伪元素。但是为了兼容已有的伪元素的写法，在一些浏览器中也可以使用单冒号
来表示伪元素。

伪类一般匹配的是元素的一些特殊状态，如hover、link等，而伪元素一般匹配的特殊的位置，比如after、before等。

css引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句话中的第一个字母，或者是列表中的第一个元素。

伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover来描述这个元素的状态。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过::before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

有时你会发现伪元素使用了两个冒号（::）而不是一个冒号（:）。这是CSS3的一部分，并尝试区分伪类和伪元素。大多数浏览器都支持这两个值。按照规则应该使用（::）而不是（:），从而区分伪类和伪元素。但是，由于在旧版本的W3C规范并未对此进行特别区分，因此目前绝大多数的浏览器都支持使用这两种方式表示伪元素。

伪类文档：<https://developer.mozilla.org/zh-CN/docs/Web/CSS/pseudo-classes>

CSS3 新增伪类有那些:

```
（1）elem:nth-child(n)选中父元素下的第n个子元素，并且这个子元素的标签名为elem，n可以接受具体的数
值，也可以接受函数。

（2）elem:nth-last-child(n)作用同上，不过是从后开始查找。

（3）elem:last-child选中最后一个子元素。

（4）elem:only-child如果elem是其父元素下唯一的子元素，则选中之。

（5）elem:nth-of-type(n)选中父元素下第n个elem类型元素，n可以接受具体的数值，也可以接受函数。

（6）elem:first-of-type选中父元素下第一个elem类型元素。

（7）elem:last-of-type选中父元素下最后一个elem类型元素。

（8）elem:only-of-type如果父元素下的子元素只有一个elem类型元素，则选中该元素。

（9）elem:empty选中不包含子元素和内容的elem类型元素。

（10）elem:target选择当前活动的elem元素。

（11）:not(elem)选择非elem元素的每个元素。

（12）:enabled 控制表单控件的禁用状态。

（13）:disabled 控制表单控件的禁用状态。

(14):checked单选框或复选框被选中。

```

## li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法

浏览器会把inline元素间的空白字符（空格、换行、Tab等）渲染成一个空格。

而为了美观。我们通常是一个<li>放在一行，这导致<li>换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。

```
解决办法：

（1）为<li>设置float:left。不足：有些容器是不能设置浮动，如左右切换的焦点图等。

（2）将所有<li>写在同一行。不足：代码不美观。

（3）将<ul>内的字符尺寸直接设为0，即font-size:0。不足：<ul>中的其他字符尺寸也被设为0，需要额外重新设定其他字符尺寸，且在Safari浏览器依然会出现空白间隔。

（4）消除<ul>的字符间隔letter-spacing:-8px，不足：这也设置了<li>内的字符间隔，因此需要将<li>内的字符间隔设为默认letter-spacing:normal。
```

## 'display'、'position'和'float'的相互关系

（1）首先我们判断display属性是否为none，如果为none，则position和float属性的值不影响元素最后的表现。

（2）然后判断position的值是否为absolute或者fixed，如果是，则float属性失效，并且display的值应该被设置为table或者block，具体转换需要看初始转换值。

（3）如果position的值不为absolute或者fixed，则判断float属性的值是否为none，如果不是，则display的值则按上面的规则转换。注意，如果position的值为relative并且float属性的值存在，则relative相对于浮动后的最终位置定位。

（4）如果float的值为none，则判断元素是否为根元素，如果是根元素则display属性按照上面的规则转换，如果不是，则保持指定的display属性值不变。

总的来说，可以把它看作是一个类似优先级的机制，"position:absolute"和"position:fixed"优先级最高，有它存在的时候，浮动不起作用，'display'的值也需要调整；其次，元素的'float'特性的值不是"none"的时候或者它是根元素的时候，调整'display'的值；最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display'特性值同设置值。

## height，padding，margin百分比参照

元素竖向的百分比设定是相对于容器的高度吗？如果是height的话，是相对于包含块的高度。如果是padding或者margin竖直方向的属性则是相对于包含块的宽度。

## 响应式设计

响应式网站设计是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理。页面头部必须有meta声明的viewport。

## 视差滚动效果

<https://www.jianshu.com/p/ea8867b25fe5>

## 修改 chrome 记住密码后自动填充表单的黄色背景

chrome表单自动填充后，input文本框的背景会变成黄色的，通过审查元素可以看到这是由于chrome会默认给自动填充的input表单加上input:-webkit-autofill私有属性，然后对其赋予以下样式：

```css
{
  background-color:rgb(250,255,189)!important;
  background-image:none!important;
  color:rgb(0,0,0)!important;
}
```

对chrome默认定义的background-color，background-image，color使用important是不能提高其优先级的，但是其他属性可使用。

使用足够大的纯色内阴影来覆盖input输入框的黄色背景，处理如下

```css
input:-webkit-autofill,textarea:-webkit-autofill,select:-webkit-autofill
{
  -webkit-box-shadow:000px 1000px white inset;
  border:1px solid #CCC !important;
}
```

## 让Chrome支持小于12px的文字

在谷歌下css设置字体大小为12px及以下时，显示都是一样大小，都是默认12px。

解决办法：

（1）可以使用Webkit的内核的-webkit-text-size-adjust的私有CSS属性来解决，只要加了-webkit-text-size-adjust:none;字体大小就不受限制了。但是chrome更新到27版本之后就不可以用了。所以高版本chrome谷歌浏览器已经不再支持-webkit-text-size-adjust样式，所以要使用时候慎用。

（2）还可以使用css3的transform缩放属性-webkit-transform:scale(0.5);注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用display：block/inline-block/...；

（3）使用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。

## 动画最小时间间隔是多久，为什么

多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60*1000ms＝16.7ms

## 去除 inline-block 元素间间距

移除空格、使用margin负值、使用font-size:0、letter-spacing、word-spacing

## overflow:scroll时不能平滑滚动

以下代码可解决这种卡顿的问题：-webkit-overflow-scrolling:touch;是因为这行代码启用了硬件加速特性，所以滑动很流畅。

## 为什么height:100%会无效

对于普通文档流中的元素，百分比高度值要想起作用，其父级必须有一个可以生效的高度值。

原因是如果包含块的高度没有显式指定（即高度由内容决定），并且该元素不是绝对定位，则计算值为auto，因为解释成了auto，所以无法参与计算。

使用绝对定位的元素会有计算值，即使祖先元素的height计算为auto也是如此。

## text-indent

（1）text-indent仅对第一行内联盒子内容有效。

（2）非替换元素以外的display计算值为inline的内联元素设置text-indent值无效，如果计算值inline-block/inline-table则会生效。

（3）`<input>`标签按钮text-indent值无效。

（4）`<button>`标签按钮text-indent值有效。

（5）text-indent的百分比值是相对于当前元素的“包含块”计算的，而不是当前元素。

## letter-spacing

```
letter-spacing可以用来控制字符之间的间距，这里说的“字符”包括英文字母、汉字以及空格等。

letter-spacing具有以下一些特性。

（1）继承性。
（2）默认值是normal而不是0。虽然说正常情况下，normal的计算值就是0，但两者还是有差别的，在有些场景下，letter-spacing会调整normal的计算值以实现更好的版面布局。
（3）支持负值，且值足够大的时候，会让字符形成重叠，甚至反向排列。
（4）和text-indent属性一样，无论值多大或多小，第一行一定会保留至少一个字符。
（5）支持小数值，即使0.1px也是支持的。
（6）暂不支持百分比值。
```

## word-spacing

letter-spacing作用于所有字符，但word-spacing仅作用于空格字符。换句话说，word-spacing的作用就是增加空格的间隙
宽度。

## 常见的元素隐藏方式

-（1）使用 display:none;隐藏元素，渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。

-（2）使用 visibility:hidden;隐藏元素。元素在页面中仍占据空间，但是不会响应绑定的监听事件。

-（3）使用 opacity:0;将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。

-（4）通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。

-（5）通过 z-index 负值，来使其他元素遮盖住该元素，以此来实现隐藏。

-（6）通过 clip/clip-path 元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

-（7）通过 transform:scale(0,0)来将元素缩放为 0，以此来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

## 滚动条样式

<https://segmentfault.com/a/1190000003708894>

## 巧妙地制作背景色渐变动画

巧妙地制作背景色渐变动画：

这篇文章内有说：

<https://juejin.cn/post/6951201528543707150>

## will-change

使用will-change表示该元素在未来会发生变化。

不要使用非动画元素。否则会带来资源浪费

浏览器渲染will-change属性的代码时，将为该元素创建一个单独的层。之后，它将该元素的渲染与其他优化一起委托给GPU，即，浏览器会识别will-change属性，并优化未来与will-change属性相关的变化。这将使动画变得更加流畅，因为GPU加速接管了动画的渲染。

与动画同时使用时，建议在父元素上使用will-change，在子元素上使用动画。

### 属性值

will-change的使用并不复杂，它能接受的值有：

auto：默认值，浏览器会根据具体情况，自行进行优化

scroll-position：表示开发者将要改变元素的滚动位置，比如浏览器通常仅渲染可滚动元素“滚动窗口”中的内容。而某些内容超过该窗口（不在浏览器的可视区域内）。如果will-change显式设置了该值，将扩展渲染“滚动窗口”周围的内容，从而顺利地进行更长，更快的滚动（让元素的滚动更流畅）

content：表示开发者将要改变元素的内容，比如浏览器常将大部分不经常改变的元素缓存下来。但如果一个元素的内容不断发生改变，那么产生和维护这个缓存就是在浪费时间。如果will-change显式设置了该值，可以减少浏览器对元素的缓存，或者完全避免缓存。变为从始至终都重新渲染元素。使用该值时需要尽量在文档树最末尾上使用，因为该值会被应用到它所声明元素的子节点，要是在文档树较高的节点上使用的话，可能会对页面性能造成较大的影响

`<custom-ident>`：表示开发者将要改变的元素属性。如果给定的值是缩写，则默认被扩展全，比如，will-change设置的值是padding，那么会补全所有padding的属性，如 will-change: padding-top, padding-right, padding-bottom, padding-left;

### 使用限制 场景

不要将 will-change 应用到太多元素上：浏览器已经尽力尝试去优化一切可以优化的东西了。有一些更强力的优化，如果与 will-change 结合在一起的话，有可能会消耗很多机器资源，如果过度使用的话，可能导致页面响应缓慢或者消耗非常多的资源。比如 *{will-change: transform, opacity;}

有节制地使用：通常，当元素恢复到初始状态时，浏览器会丢弃掉之前做的优化工作。但是如果直接在样式表中显式声明了 will-change 属性，则表示目标元素可能会经常变化，浏览器会将优化工作保存得比之前更久。所以最佳实践是当元素变化之前和之后通过脚本来切换 will-change 的值

不要过早应用 will-change 优化：如果你的页面在性能方面没什么问题，则不要添加 will-change 属性来榨取一丁点的速度。 will-change 的设计初衷是作为最后的优化手段，用来尝试解决现有的性能问题。它不应该被用来预防性能问题。过度使用 will-change 会导致大量的内存占用，并会导致更复杂的渲染过程，因为浏览器会试图准备可能存在的变化过程。这会导致更严重的性能问题。

给它足够的工作时间：这个属性是用来让页面开发者告知浏览器哪些属性可能会变化的。然后浏览器可以选择在变化发生前提前去做一些优化工作。所以给浏览器一点时间去真正做这些优化工作是非常重要的。使用时需要尝试去找到一些方法提前一定时间获知元素可能发生的变化，然后为它加上 will-change 属性。

## 文字排版方向

`writing-mode` 可以控制文字排版方向

场景：竖行文字、文言文、诗词

## 使用text-align-last对齐两端文本

通过 `text-align-last:justify` 设置文本两端对齐

场景：未知字数中文对齐

## 使用object-fit规定图像尺寸

通过`object-fit`使图像脱离background-size的约束，使用`<img>`来标记图像背景尺寸

有cover contain fill 等

## 0.5px 1px 的 精确边

transform 伪元素

```html
<div class="bruce flex-ct-y" data-title="使用transform描绘像素边框">
 <div class="onepx-border normal">1px</div>
 <div class="onepx-border thin">0.5px</div>
</div>

<style>
.onepx-border {
 width: 200px;
 height: 80px;
 cursor: pointer;
 line-height: 80px;
 text-align: center;
 font-weight: bold;
 font-size: 50px;
 color: #f66;
 & + .onepx-border {
  margin-top: 10px;
 }
 &.normal {
  border: 1px solid #f66;
 }
 &.thin {
  position: relative;
  &::after {
   position: absolute;
   left: 0;
   top: 0;
   border: 1px solid #f66;
   width: 200%;
   height: 200%;
   content: "";
   transform: scale(.5);
   transform-origin: left top;
  }
 }
}
</style>
```

## 使用margin-left排版左重右轻列表

要点：使用flexbox横向布局时，最后一个元素通过margin-left:auto实现向右对齐

场景：右侧带图标的导航栏。左右两侧布局，左侧多个左对齐，右侧一个右对齐。左右相反同理。

```html
<div class="bruce flex-ct-y" data-title="使用margin排版凸显布局">
 <ul class="highlight-list left">
  <li>Alibaba</li>
  <li>Tencent</li>
  <li>Baidu</li>
  <li>Jingdong</li>
  <li>Ant</li>
  <li>Netease</li>
 </ul>
 <ul class="highlight-list right">
  <li>Alibaba</li>
  <li>Tencent</li>
  <li>Baidu</li>
  <li>Jingdong</li>
  <li>Ant</li>
  <li>Netease</li>
 </ul>
</div>

<style>
.highlight-list {
 display: flex;
 align-items: center;
 padding: 0 10px;
 width: 600px;
 height: 60px;
 background-color: #3c9;
 & + .highlight-list {
  margin-top: 10px;
 }
 li {
  padding: 0 10px;
  height: 40px;
  background-color: #3c9;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
 }
 &.left li {
  & + li {
   margin-left: 10px;
  }
  &:last-child {
   margin-left: auto;
  }
 }
 &.right li {
  & + li {
   margin-left: 10px;
  }
  &:first-child {
   margin-right: auto;
  }
 }
}
</style>
```

## 巧用 + 相邻后一个兄弟选择器

可以选择非首元素

相邻下一个

## overflow-scrolling:touch支持弹性滚动

iOS页面非body元素的滚动操作会非常卡(Android不会出现此情况)，通过overflow-scrolling:touch调用Safari原生滚动来支持弹性滚动，增加页面滚动的流畅度

## 伪元素content可以赋值attr(属性值)

伪元素的 `content: attr(data-xxx)` 写法可以取元素的data-xxx属性值作为内容

## 校验相关的样式

`<input>` 使用伪类:valid和:invalid配合pattern校验表单输入的内容

## 禁用事件触发

通过pointer-events:none禁用事件触发(默认事件、冒泡事件、鼠标事件、键盘事件等)，相当于`<button>`的disabled

## max-height实现折叠效果

简单实现折叠效果： 通过 max-height 和 hover 定义收起的最小高度和展开的最大高度，设置两者间的过渡切换。

## 视差滚动

通过`background-attachment:fixed`或`transform:translateZ`让多层背景以不同的速度移动，形成立体的运动效果

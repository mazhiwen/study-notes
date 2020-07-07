# css

目录

- [visibility:hidden和display:none](#visibility:hidden和display:none)
- [text-align](./text-align.md)
- [vertical-align](./vertical-align.md)
- [display](./display.md)
- [字母x相关的概念](./x.md)
- [布局](./layout.md)
- [盒子模型](./box.md)
- [padding](./padding.md)
- [margin](./margin.md)
- [border](./border.md)
- [width](./width.md)
- [float](./float.md)
- [box-shadow](#box-shadow)
- [transition](#transition)
- [transform](./transform.md)
- [角度单位](#角度单位)
- [距离尺寸单位](./unit.md)
- [position](#position)
- [white-space](#white-space)
- [word-break](#word-break)
- [animation](#animation)
- [flex布局](./flex.md)
- [选择器](#选择器)
- [行内元素和块元素](#行内元素和块元素)
- [0.5px的边](#0.5px的边)
- [清除浮动](#清除浮动)
- [overflow](#overflow)
- [BFC](./BFC.md)
- [media媒体查询](#media)
- [initial等](#initial等)
- [background](#background)
- [文字溢出](#文字溢出)
- [等宽字体](#等宽字体)
- [z-index](#z-index)

布局相关:<https://segmentfault.com/a/1190000013565024?utm_source=channel-hottest#item-1>

《css权威指南》
***

## visibility:hidden和display:none

简单提一句，请注意 visibility: hidden 与 display: none 是不一样的。前者隐藏元素，但元素仍占据着布局空间（即将其渲染成一个空框），而后者 (display: none) 将元素从渲染树中完全移除，元素既不可见，也不是布局的组成部分。

## 角度单位

\<angle>

deg :度 360deg  
grad :百分度 400grad  
rad :弧度 2π  
turn :1turn  

## position

CSS position属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。

```
absolute
生成绝对定位的元素，相对于值不为static的第一个父元素的paddingbox进行定位，也可以理解为离自己这一级元素最近的
一级position设置为absolute或者relative的父元素的paddingbox的左上角为原点的。

fixed（老IE不支持）
生成绝对定位的元素，相对于浏览器窗口进行定位。

relative
生成相对定位的元素，相对于其元素本身所在正常位置进行定位。

static
默认值。没有定位，元素出现在正常的流中（忽略top,bottom,left,right,z-index声明）。

inherit
规定从父元素继承position属性的值。
```

## white-space

white-space CSS 属性是用来设置如何处理元素中的 空白。

```css
/* Keyword values */
white-space: normal;

white-space: nowrap;
/*和 normal 一样，连续的空白符会被合并。但文本内的换行无效。*/

white-space: pre;
white-space: pre-wrap;
white-space: pre-line;
```

## word-break

## transition

- transition:

property duration timing-function delay;  

transition:width 2s;  

- transition-property:

规定设置过渡效果的 CSS 属性的名称。

- transition-duration

规定完成过渡效果需要多少秒或毫秒:5s

- transition-timing-function

规定速度效果的速度曲线:

linear:规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。

ease:规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。

ease-in :规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。

ease-out :规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。

ease-in-out :规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。

- transition-delay 定义过渡效果何时开始。  

## animation

## box-shadow

box-shadow: h-shadow v-shadow blur spread color inset;
h-shadow 必需。水平阴影的位置。允许负值。  
v-shadow 必需。垂直阴影的位置。允许负值。  
blur 可选。模糊距离。  
spread 可选。阴影的尺寸。  
color 可选。阴影的颜色。请参阅 CSS 颜色值。  
inset 可选。将外部阴影 (outset) 改为内部阴影。  

## 选择器

```
（1）id选择器（#myid）
（2）类选择器（.myclassname）
（3）标签选择器（div,h1,p）
（4）后代选择器（h1p）
（5）相邻后代选择器（子）选择器（ul>li）
（6）兄弟选择器（li~a）
（7）相邻兄弟选择器（li+a）
（8）属性选择器（a[rel="external"]）
（9）伪类选择器（a:hover,li:nth-child）
（10）伪元素选择器（::before、::after）
（11）通配符选择器（*）
```  

**优先级：**
!important > 行内样式 > ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性

后写的会覆盖先写的

```
判断优先级时，首先我们会判断一条属性声明是否有权重，也就是是否在声明后面加上了!important。一条声明如果加上了权重，
那么它的优先级就是最高的，前提是它之后不再出现相同权重的声明。如果权重相同，我们则需要去比较匹配规则的特殊性。

一条匹配规则一般由多个选择器组成，一条规则的特殊性由组成它的选择器的特殊性累加而成。选择器的特殊性可以分为四个等级，
第一个等级是行内样式，为1000，第二个等级是id选择器，为0100，第三个等级是类选择器、伪类选择器和属性选择器，为0010，
第四个等级是元素选择器和伪元素选择器，为0001。规则中每出现一个选择器，就将它的特殊性进行叠加，这个叠加只限于对应的等
级的叠加，不会产生进位。选择器特殊性值的比较是从左向右排序的，也就是说以1开头的特殊性值比所有以0开头的特殊性值要大。
比如说特殊性值为1000的的规则优先级就要比特殊性值为0999的规则高。如果两个规则的特殊性值相等的时候，那么就会根据它们引
入的顺序，后出现的规则的优先级最高。
```

## 行内元素和块元素

块级元素： div p forn ul li h1-h6  
行内元素：span img input a i button

## 0.5px的边

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

## 清除浮动

1.给父级元素定义高度  
2.让父级元素也浮动  
3.父级定义display:table  
4.父元素设置overflow:hidden  
5.clearfix:使用内容生成的方式清除浮动  

```css
.clearfix:after {  /* :after选择器向选定的元素之后插入内容  */
  content:""; /* 生成内容为空  */
  display: block; /* 块级元素显示  */
  clear:both; /* 清除前面元素  */
}
```

## overflow

<https://juejin.im/post/581dcefbda2f60005df93b54>

> overflow 属性指定了一个块容器元素在其内容溢出这个元素的时候，内容是否裁掉。

**作用**

- overflow 的值为非 visible 的时候可以生成新的 BFC （块级格式化上下文），常见的结果就是：消除浮动影响（清除子元素浮动引起的父元素对自元素忽略空间效果）、左侧固定右侧自适应（不需要指定 margin-left ）、margin 不再折叠等。

- overflow:hidden 搭配 white-space:nowrap、text-overflow:ellipsis实现...效果。

- overflow:hidden 可以让 1px（ scale(0.5) 这种）显示的更加精细。

- overflow:hidden 可以解决移动端页面内容（一般文字内容相对多一点的时候效果更明显）会出现“进来左右方向缩小到一块”然后再变为正常布局的 bug ，这个 bug 会引起很明显的闪动效果。

> float浮动的div会失去独霸一行的能力，也就是宽度自填充满。而overflow清除子元素对父元素的浮动影响后，父元素可以独霸一行。

## media

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

## initial等

initial,inherit,unset

initial 关键字可用于任何 HTML 元素上的任何 CSS 属性。

## background

- background:

url('../../static/images/home_logo.png') no-repeat center left / auto 80% ;

- background-size:

percentage|cover|contain|length

## 文字溢出

省略号

```html
<p></p>
```

```css
p{
  width:100px;
  text-overflow:ellipsis;
  overflow:hidden;
  word-break:keep-all;
}
```

## 等宽字体

比例字体

<https://cloud.tencent.com/developer/article/1009289>

## cssreset和normalize.css

css reset 是最早的一种解决浏览器间样式不兼容问题的方案，它的基本思想是将浏览器的所有样式都重置掉，从而达到所有浏览器样式保持一致的效果。但是使用这种方法，可能会带来一些性能上的问题，并且对于一些元素的不必要的样式的重置，其实反而会造成画蛇添足的效果。

后面出现一种更好的解决浏览器间样式不兼容的方法，就是 normalize.css ，它的思想是尽量的保留浏览器自带的样式，通过在原有的样式的基础上进行调整，来保持各个浏览器间的样式表现一致。相对与 css reset，normalize.css 的方法保留了有价值的默认值，并且修复了一些浏览器的 bug，而且使用 normalize.css 不会造成元素复杂的继承链。

## 浏览器css前缀

```
mozilla 内核 （firefox,flock 等）    -moz
webkit  内核 （safari,chrome 等）   -webkit
opera   内核 （opera 浏览器）        -o
trident 内核 （ie 浏览器）           -ms
```

## 属性继承

```
每一个属性在定义中都给出了这个属性是否具有继承性，一个具有继承性的属性会在没有指定值的时候，会使用父元素的同属性的值
来作为自己的值。

一般具有继承性的属性有，字体相关的属性，font-size和font-weight等。文本相关的属性，color和text-align等。
表格的一些布局属性、列表属性如list-style等。还有光标属性cursor、元素可见性visibility。

当一个属性不是继承属性的时候，我们也可以通过将它的值设置为inherit来使它从父元素那获取同名的属性值来继承。
```

## css实现三角形

```
采用的是相邻边框连接处的均分原理。
将元素的宽高设为0，只设置border
把任意三条边隐藏掉（颜色设为transparent），剩下的就是一个三角形。
```

```css
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparenttransparentredtransparent;
}
```

## 初始化css

```css
/* 淘宝的样式初始化代码： */
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend
,button,input,textarea,th,td{margin:0;padding:0;}
body,button,input,select,textarea{font:12px/1.5tahoma,arial,\5b8b\4f53;}
h1,h2,h3,h4,h5,h6{font-size:100%;}
address,cite,dfn,em,var{font-style:normal;}
code,kbd,pre,samp{font-family:couriernew,courier,monospace;}
small{font-size:12px;}
ul,ol{list-style:none;}
a{text-decoration:none;}
a:hover{text-decoration:underline;}
sup{vertical-align:text-top;}
sub{vertical-align:text-bottom;}
legend{color:#000;}
fieldset,img{border:0;}
button,input,select,textarea{font-size:100%;}
table{border-collapse:collapse;border-spacing:0;}
```

## z-index

<https://juejin.im/post/5b876f86518825431079ddd6>

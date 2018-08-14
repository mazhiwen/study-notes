# css相关

## 角度单位 \<angle>

deg :度 360deg  
grad :百分度 400grad  
rad :弧度 2π  
turn :1turn  

## 距离尺寸单位 \<length>

形式：\<number> + 长度单位（px，em，pt，in，mm，...）  

* 相对单位：

em  
rem  

* 绝对单位：  

px:像素（点）  
mm:毫米  
cm:厘米  
in:英寸
pt:磅  
pc:12 点活字

## transition

## animation

## transform

只对 block 级元素生效！

```css
/*****************matrix(矩阵)
https://www.cnblogs.com/Ivy-s/p/6786622.html
*/
/*
原始值：transform: matrix(a,b,c,d,e,f);
移动后：x'=ax+cy+e ， y'=bx+dy+f
*/
transform: matrix(1,0,0,1,0,0);
/*
平移 ：x y 分别平移10 （x'=ax+cy+e+10) （y'=bx+dy+f+10）
*/
transform: matrix(1,0,0,1,10,10);
/*
缩放 ：x y 分别缩放2（x'=2ax+cy+e) (y'=bx+2dy+f)
*/
transform: matrix(2,0,0,2,0,0);
/*
旋转 ：transform：matrix（cosθ，-sinθ,sinθ,cosθ,0,0);
45度
*/
transform: matrix(0.707,0.707,-0.707,0.707,0,0);

/*****************rotate(旋转)
参数:<angle>
*/
transform:  rotate(<angle>);
/*****************scale(缩放)
参数:<number>
*/  
transform:  scale(numberx[, numbery]);  
transform:  scaleX(numberx);
transform:  scaleY(numbery);
/*****************skew(倾斜)
参数:<angle>
*/  
transform:  skew(anglex[, angley]);
transform:  skewX(angle);
transform:  skewY(angle);
/*****************translate(平移)
参数:<length> <percentage>
*/
transform:  translate(tx[, ty])
transform:  translateX(tx)
transform:  translateY(ty)
```

## flex布局

主轴:flex-direction:row | row-reverse | column | column-reverse  

交叉轴:垂直于主轴  

flex容器:display:flex;  

* 盒子属性:  

flex-direction: row;更改 flex 元素的排列方向;  

flex-wrap: wrap; 换行策略，是否自动换行，是否超出缩放，溢出;  

flex-flow :flex-direction flex-wrap; 简写;  

align-content: ;侧轴项目分配空间  

justify-content:  ;如何分配主轴的弹性元素之间及其周围的空间  

align-items: ; 所有子节点的对其方式  

* 子元素属性: flex item  

flex-basis:  ;布局空白的基准值  

flex:flex-grow flex-shrink flex-basis;简写;规定了弹性元素如何伸长或缩短以适应flex容器中的可用空间  

flex-grow: \<number> ;定义弹性盒子项（flex item）的拉伸因子。  

flex-shrink: \<number> ;flex 元素的收缩规则,flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值;  

flex-basis:指定了 flex 元素在主轴方向上的初始大小

## 选择器

基本的：

1. id选择器（id="name"）  
1. 类选择器（class="head"）  
1. 标签选择器（body, div, ul, li）  
1. 全局选择器（*）  

复杂的：

1. 组合选择器（.head .head_logo）  
1. 后代选择器 （#head .nav ul li 从父集到子孙集）  
1. 群组选择器 (div, span, img {color:Red} 具有相同样式的标签分组显示)  
1. 继承选择器  
1. 伪类选择器（链接样式，a元素的伪类）  
1. 子选择器（div>p, 带大于号>）  
1. CSS相邻相邻兄弟选择器（h1+p, 带加号+）  

优先级：  
!important > 行内样式 > ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性  
后写的会覆盖先写的

## 行内元素和块元素

块级元素： div p forn ul li h1-h6  
行内元素：span img input a i

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

## 不定高的DIV居中

```css
/*1.flex*/

/*2.table-cell*/

/*3.transform*/
.wrap{
  position:relative;
  background:gray;
  height: 100px;
}
.test{
  background: red;
  width: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
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

不破坏文档流，没有副作用

## 三栏布局

两边两栏宽度固定，中间栏宽度自适应

方案一：  
position（绝对定位法） center的div需要放在最后面
绝对定位法原理将左右两边使用absolute定位，因为绝对定位使其脱离文档流，后面的center会自然流动到他们的上卖弄，然后margin属性，留出左右两边的宽度。就可以自适应了。  
方案二：  
float 自身浮动法 center的div需要放到后面
自身浮动法的原理就是对左右使用float:left和float：right，float使左右两个元素脱离文档流，中间的正常文档流中，使用margin指定左右外边距对其进行一个定位。  
方案三(圣杯布局)：  
原理就是margin负值法。使用圣杯布局首先需要在center元素外部包含一个div,包含的div需要设置float属性使其形成一个BFC，并且这个宽度和margin的负值进行匹配

## 左边定宽，右边自适应

方案一：左边设置浮动，右边宽度设置100% .left{float:left} .right:{width:100%}  
方案二：左设置浮动，右用cacl去补宽度计算 .left{float:left} .right:{width:cacl(100vw-200px}  
方案三：父容器设置display：flex right部分是设置flex：1  
方案四：右边div套个包裹、并前置、左及包裹 双浮动  

## BFC (Block Formatting Context)
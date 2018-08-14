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
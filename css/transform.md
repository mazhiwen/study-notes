# transform

只对 block 级元素生效！
不占用文档流

[CSS 3D世界，360°旋转水晶魔方](https://juejin.cn/post/7031346953304670244)

[CSS3 transform对普通元素的N多渲染影响](https://www.zhangxinxu.com/wordpress/2015/05/css3-transform-affect/)

[svg、canvas、css3d实现数据可视化（伪3D效果）](https://juejin.cn/post/6844903674146193421)

## matrix(矩阵)

```css
/*****************
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
```

## rotate(旋转)

```css
/*****************
参数:<angle>
*/
transform:  rotate(<angle>);
```

## scale(缩放)

```css
/*****************
参数:<number>
*/  
transform:  scale(numberx[, numbery]);  
transform:  scaleX(numberx);
transform:  scaleY(numbery);
```

## skew(倾斜)

```css
/*****************skew(倾斜)
参数:<angle>
*/  
transform:  skew(anglex[, angley]);
transform:  skewX(angle);
transform:  skewY(angle);
```

## translate(平移)

移动元素在平面上的位置。这种变换的特点是矢量的坐标定义了它在每个方向上的移动量。

```
translateX(t)
translateY(t)
translateZ(t)
translate(tx)
translate(tx, ty)
translate3d(tx, ty, tz)
```

## 混合

```css
transform: translate3d(-200px, 0, 1px) scale(2);
```

## transform-origin

transform-origin CSS属性让你更改一个元素变形的原点。

参数取值：

关键字

则第一个值表示水平偏移量，第二个值表示垂直偏移量。第三个值必须是<length>。它始终代表Z轴偏移量。

## transform-style

```css
transform-style: flat;
transform-style: preserve-3d;
```

CSS 属性 transform-style 设置元素的子元素是位于 3D 空间中还是平面中。

如果选择平面，元素的子元素将不会有 3D 的遮挡关系。

## perspective

观察者距离 3d 元素 z轴0值 的距离

CSS 属性 perspective指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。 z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。

## transition-delay

在过渡效果开始作用之前需要等待的时间

**3D相关的**

<https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms#setting_perspective>

## rotate3d

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotate3d>

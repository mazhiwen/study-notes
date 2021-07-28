# transform

只对 block 级元素生效！
不占用文档流

## transform

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

/*************混合 多个*/
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

CSS 属性 perspective指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。 z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。

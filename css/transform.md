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
```

## transform-origin

transform-origin CSS属性让你更改一个元素变形的原点。

参数取值：

关键字

则第一个值表示水平偏移量，第二个值表示垂直偏移量。第三个值必须是<length>。它始终代表Z轴偏移量。

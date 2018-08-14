# css相关

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
*/
transform:  rotate(<angle>);
/*****************scale(缩放)
*/  
transform:  scale(numx[, numy]);  
```

## 角度单位 \<angle>

deg 度 360deg  
grad 百分度 400grad  
rad 弧度 2π  
turn 1turn  

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
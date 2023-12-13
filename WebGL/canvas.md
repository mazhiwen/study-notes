# canvas

[血荐28个让你直呼哇塞的Canvas库](https://juejin.cn/post/7038267477121302542#heading-2)

[用canvas实现流星特效](https://juejin.cn/post/6844903482428915720)

<https://juejin.cn/post/6844903587462512647#heading-11>

<https://juejin.cn/post/6844903722196140040>

<https://juejin.cn/post/6876411520391970829>

<https://juejin.cn/post/6888209975965909000>

[看你骨骼惊奇，这里有一套 Canvas 粒子动画方案了解一下？](https://juejin.cn/post/6844903725153124359)

[手动实现echarts](https://juejin.cn/post/6950684708443258894)

## canvas的一些库

- [zrender](https://ecomfe.github.io/zrender-doc/public/api.html):

  是echart的渲染器

- Fabric.js: [Fabric.js 从入门](https://juejin.cn/post/7026941253845516324)

## canvas标签

不要用css定义canvas宽高

## 基本语法

```js
 //获取画布
const  canvas=document.querySelector('#canvas');
//定义画笔
const ctx=canvas.getContext('2d');
//设置画笔的颜色
ctx.fillStyle='red';
//开启一次绘制路径
ctx.beginPath();
//设置起始坐标
ctx.moveTo(x,y);
//定义绘制图形的形状
ctx.arc(x,y,r,开始弧度,结束弧度,方向);//定义圆弧
//渲染路径
ctx.fill()
```

## 路径

### beginPath()

新建一条路径一旦创建成功 绘制命令将转移到新建的路径上

### moveTo( x, y )

移动画笔到(x , y) 点开始后面的绘制工作

### stroke()

将绘制的路径进行描边

### fill()

将绘制的封闭区域进行填充,当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。

### closePath()

关闭该路径 将绘制指令重新转移到上下文

## 矩形

```js
fillRect( x , y , width , height)  //填充以(x,y)为起点宽高分别为width、height的矩形 默认为黑色

stokeRect( x , y , width , height) //绘制一个空心以(x,y)为起点宽高分别为width、height的矩形

clearRect( x, y , width , height ) // 清除以(x,y)为起点宽高分别为width、height的矩形 为透明 
```

## 样式

### fillStyle

图形填充区

值类型 ：`<color> | <gradient> | <pattern>`

### strokeStyle

（描边区）

值类型 ：`<color> | <gradient> | <pattern>`

可以为颜色值、渐变对象(并非样式！！！！)

### lineWidth  

value:描述线段宽度的数字。

0、 负数、 Infinity 和 NaN 会被忽略

### lineCap

线条末端样式

值 ： butt   round  square， 依次是方形、圆形&突出、方形&突出

## color类型

color: DOMString 字符串，可以转换成 CSS <color> 值。

```js
ctx.fillStyle='blue';
ctx.fillStyle='#00acec';
ctx.fillStyle='RGB(255,0,255)';
ctx.fillStyle='RGBA(0,0,255,0.5)';
```

## 渐变类型

```js
var gradient = ctx.createLinearGradient( x1 ,y1 ,x2 ,y2); //线性渐变

var gradient = ctx.createRadialGradient(x1 ,y1 ,r1 ,x2 ,y2 ,r2);//径向渐变

gradient.addColorStop( position , color )// position:相对位置0~1    color:该位置下的颜色
```

## pattern类型

纹理就是将图片重复填充，其设置方法和渐变步骤类似

pattern: CanvasPattern 对象（可重复的图片）。

## 投影

位置：shadowOffsetX , shadowOffsetY

模糊度：shadowBlur

颜色：shadowColor

## 文本

```js
fillText( text , x , y , [,maxWidth]) // 在(x,y)位置绘制text文本  最大宽度为maxWidth(可选)

strokeText( text ,x ,y ,[,maxWidth]) //在(x,y)位置绘制text文本边框  最大宽度为maxWidth(可选)

font = value             //  eg:"100px sans-serif"  
```

## 图片

```js
drawImage( image , x , y , width , height ) // image为图片对象、从(x,y)处放置宽高分别为width height的图片

drawImage( image , sx , sy , swidth , sheight ,dx ,dy ,dwidth ,dheight) // 切片前四个是定义图像源的切片位置和大小   后四个是定期切片的目标显示位置大小
```

## 状态保存 恢复

save()

restore()

## 动作

```js
translate( x , y ) // 将canvas原点的移动到 (x,y)     （save&restore保存初始状态！！！）

rotate( angle ) // 顺时针方向旋转坐标轴 angle弧度

scale(x,y) // 将图形横向缩放x倍、纵向缩放y倍   （ x、y大于1是放大  小于1为缩放！！！）
```

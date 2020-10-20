# clip-path

clip-path CSS 属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。

<https://juejin.im/post/6844903501017939981>

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path>

<https://juejin.im/post/6854573211741667342>

clippy 在线绘制工具：<https://bennettfeely.com/clippy/>

## 取值 : clip-source类型

用 `<url>` 表示剪切元素的路径

通过 url() 方法引用一段 SVG 的 `<clipPath>` 来作为剪裁路径

```css
clip-path: url(resources.svg#c1);

```

或者：

```html
<svg>
  <clipPath id="myPath" clipPathUnits="objectBoundingBox">
    <path d="M0.5,1
      C 0.5,1,0,0.7,0,0.3
      A 0.25,0.25,1,1,1,0.5,0.3
      A 0.25,0.25,1,1,1,1,0.3
      C 1,0.7,0.5,1,0.5,1 Z" />
  </clipPath>
</svg>
```

```css
clip-path: url(#myPath)
```

## 取值 : basic-shape类型

一种形状，其大小和位置由<几何盒>值定义。如果没有指定几何框，则边框将用作参考框

### 矩形 inset

`inset( <shape-arg>{1,4} [round <border-radius>]? )`

shape-arg  ： 分别为矩形的上右下左顶点到被剪裁元素边缘的距离（和margin、padding参数类似）

border-radius:  为可选参数，用于定义 border 的圆角。

```css
clip-path: inset(100px 200px 10% 20% round 20px);
```

### 圆 circle

`circle( [<shape-radius>]? [at <position>]? )`

shape-radius 为圆形的半径，(px,百分比)

position 为圆心的位置。(px ‘center’)

`clip-path: circle(50px at 0 100px);`

### 椭圆 ellipse

### 多边形 polygon

`参数类型：polygon( [<fill-rule>,]? [<shape-arg> <shape-arg>]# )`

fill-rule 为填充规则，即通过一系列点去定义多边形的边界。

`clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);`

### path

```css
clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');
```

## 取值 : geometry-box类型

## 取值 : 合并

```css
clip-path: padding-box circle(50px at 0 100px);

```

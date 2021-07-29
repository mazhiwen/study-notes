# css3

<https://juejin.im/post/6844904033870675981>

## 背景

background-origin

background-clip

background-size

## 边框

border-radius

border-image

## 阴影

box-shadow,

text-shadow

## 选择器

属性选择器:

```css
[attr]：选择包含attr属性的标签
[attr=value]：选择attr属性值为value的标签
[attr^=value]：选择attr属性值以value开头的标签
[attr*=value]：选择attr属性值包含value的标签
[attr$=value]：选择attr属性值以value的标签
```

结构伪类选择器:

```css
E:first-child
E:last-child
E:nth-child(n)
E:nth-last-child(n)
E:first-of-type
E:last-of-type
E:nth-of-type(n)
E:nth-last-of-type(n)
```

## 颜色渐变

见 background 文档

## 2D变换

transform:translate

transform:scale
transform:rotate
transform:skew

## 3D

如translateZ()，而rotate也分为rotateX(), rotateY(), rotateZ()，分别表示绕着X轴，Y轴，Z轴旋转。2D变换的rotate()其实就相当于rotateZ()。

## 动画

transition

animation

## flex

```
新增各种CSS选择器 （:not(.input)：所有class不是“input”的节点）
多列布局 （multi-column layout）
阴影和反射 （Shadow\Reflect）
文字渲染  （Text-decoration）

```

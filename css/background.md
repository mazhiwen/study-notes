# background

## background属性

此属性是一个 简写属性，可以按任意顺序放置 ,可以在一次声明中定义一个或多个属性：background-clip、background-color、background-image、background-origin、background-position、background-repeat、background-size，和 background-attachment。

```
background: 【图片background-image】url('../../static/images/home_logo.png') 【重复background-repeat】no-repeat 【位置background-position】center left / 【宽度高度background-size】auto 80%;
```

## background-origin

规定了指定背景图片background-image 属性的原点位置的背景相对区域.

## background-size

percentage|cover|contain|length

## background-image

元素本身设置 display:none，会请求图片

父级元素设置 display:none，不会请求图片

样式没有元素使用，不会请求

:hover 样式下，触发时请求

## linear-gradient

线性渐变：

<https://developer.mozilla.org/zh-cn/docs/Web/CSS/linear-gradient>

```css
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);


a{
  background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
    linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
    linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
}
```

## radial-gradient

径向渐变：

background-image: radial-gradient(shape size at position, start-color, ..., last-color);

## background-attachment

如何设置固定的背景图像：

scroll 默认值。背景图像会随着页面其余部分的滚动而移动。

fixed 当页面的其余部分滚动时，背景图像不会移动。

## background-position

为每一个背景图片设置初始位置。 这个位置是相对于由 background-origin 定义的位置图层的。

background-position-x: 设置水平方向的位置

background-position-y

# background

## background属性

url('../../static/images/home_logo.png') no-repeat center left / auto 80% ;

## background-size

percentage|cover|contain|length

## background-image

元素本身设置 display:none，会请求图片

父级元素设置 display:none，不会请求图片

样式没有元素使用，不会请求

:hover 样式下，触发时请求

## linear-gradient

<https://developer.mozilla.org/zh-cn/docs/Web/CSS/linear-gradient>

```css
a{
  background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
    linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
    linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
}
```

## background-attachment

如何设置固定的背景图像：

scroll 默认值。背景图像会随着页面其余部分的滚动而移动。

fixed 当页面的其余部分滚动时，背景图像不会移动。

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

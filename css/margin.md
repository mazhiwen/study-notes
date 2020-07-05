# margin

## 属性

auto : 浏览器计算外边距

length : 规定以具体单位计的外边距值，比如像素、厘米等。默认值是 0px

% : 规定基于父元素的宽度的百分比的外边距

inherit : 规定应该从父元素继承外边距

## margin:auto

margin: auto生效的前提是元素在width和height为auto的时候能够自动填充容器，这样，在设置width或height的值时，如果还有剩余尺寸，margin: auto就可以利用剩余尺寸。

因此在绝对定位元素设置了top、bottom、left、right的情况下，就可以很方便地实现水平垂直居中，如下：

```css
.father {
  width:200px;
  height:200px;
  border:1px solid #ccc;
  position :relative;
  .child {
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100px;
    height:100px;
    margin:auto;
    background:red;
  }
}
```

## margin cllapse ，magin坍塌

- 相邻：相邻元素margin会重叠，取最大值  

- 父子：子元素margin，会给父元素添加margin

父子元素解决办法：

1. 边框，当然可以设置边框为透明;

2. 为父DIV添加 padding，或者至少添加padding-top;

3. overflow:hidden

解决效果：子元素的margin在父空间内撑开。不会影响父元素。

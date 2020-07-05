# 字母x相关的知识

<https://www.zhangxinxu.com/wordpress/2015/06/about-letter-x-of-css/>

基线：字母x的下边缘(线)。

内联元素默认vertical-align是基线对齐

line-height：行高的定义就是两基线的间距

"x-height" : 就是指的小写字母'x'的高度；术语描述就是基线和等分线[mean line](也称作中线[midline])之间的距离。

vertical-align: middle。指的是基线往上1/2 "x-height"高度。字母x交叉点那个位置。

ex单位 :是CSS中的一个相对单位，指的的是小写字母x的高度，就是指"x-height"

## 1ex高图片与文字天然对齐

```css
.icon-arrow {
    display: inline-block;
    width: 20px;
    height: 1ex;
    background: url(arrow.png) no-repeat center;
}
```


# vertical-align

<https://zcfy.cc/article/vertical-align-all-you-need-to-know>

<https://segmentfault.com/a/1190000015366749>

<https://juejin.im/post/5e64ee1df265da573e6734ed>

## 概念

设置垂直对齐方式

可以起作用的元素：指定行内元素（inline），表格单元格（table-cell）元素，以及通过 display 改变了显示水平为 inline 水平或者 table-cell 的元素

对于块级元素，vertical-align是不起作用的

行内元素的垂直对齐方式会影响当前行内元素，撑开父block元素的高度

内联元素 设置了如 float 和 position: absolute 的这两个属性之一，元素的 display 值被忽略，强制当成 block 方式处理，因此，vertical-align 也就失去了作用。

## 属性值

### baseline

baseline 为 vertical-align 的默认值，其意思是指基线对齐

### top和bottom

对于内联元素，指的是元素的顶部（底部）和当前行框盒子的顶部（底部）对齐；即与 line-box 的顶部（底部）对齐

对于 table-cell 元素，指的是元素的顶 padding 边缘和表格行的顶部对齐。

### middile

对于内联元素指的是元素的垂直中心点与行框盒子基线往上 1/2x-height 处对齐，简单点说就是字母 X 的中心位置对齐；

对于 table-cell 元素，指的是单元格填充盒子相对于外面的表格行居中对齐。

### 文本类

text-top，指的是盒子的顶部和父级内容区域的顶部对齐，即与 content-area 顶部对齐。子元素对齐以父元素font-size大小对应的内容区域的顶部对已。例如:如果父元素font-size是 16px ，子元素中元素的 vertical-align 设置 text-top 的时候，就可以看成是跟一个虚拟的子元素font-size为 16px 元素的内容区域顶部对齐，它与 line-height 无关。

text-bottom，指的是盒子的底部和父级内容区域的底部对齐，即与 content-area 底部部对齐。

```html
<div class="box">
    <span class="f12">12px</span>
    <span class="f16">16px</span>
    <span class="f20">20px</span>
    <img :src="logo"/>
</div>
```

```css
 .box {
    font-size: 16px;
  }
  img {
    vertical-align: text-top;
    width: 100px;
    height: 100px;
  }
  .f12 {
    font-size: 12px;
  }
  .f16 {
    font-size: 16px;
  }
  .f20 {
    font-size: 20px;
  }
```

### 上标下标类

super 属性效果相当于 html 标签 <sup></sup> 的效果
sub 属性效果 相当于 html 标签 <sub></sub> 的效果

### 数值百分比类

如 10px、1em、5%

1、正值表示由基线往上偏移，负值表示由基线往下偏移。

2、百分比则是基于 line-height 来计算的

## vertical-align 与 line-height 之间的基友关系

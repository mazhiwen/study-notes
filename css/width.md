# width

一般情况下，元素width设置值的时候，最终渲染效果为contenbox宽度是width值，不包括padding margin border

## length

绝对宽度

## 百分比值percentage

使用外层元素的容纳区块宽度（the containing block's width）的百分比定义宽度。

## auto

width的默认值是auto 。在不同环境下分别表现为：

- fill-available

充分利用可用空间，但并不全等于100%

- fit-content

收缩到合适 。例如：文字整体居中，多行则居左显示

```html
<div class="div1">
  <div class="div2">的萨达是倒萨倒萨倒萨大师的撒</div>  
</div>
```

```css
.div1{
  text-align:center;
  width:200px;
  box-sizing:border-box;
  padding:20px;
  background:red;
}
.div2{
  display:inline-block;
  text-align:left;
  color:#fff;
}
```

- min-content，

收缩到最小。在表格中最常见，当每一列空间都不够的时候，文字能断则断，中文随便断，英文单词不能断。可以根据这个特性实现凹凸图形等效果

- max-content

max-content：超出容器限制，内容很长的连续英文或数字，或者内联元素被设置为了white-space: nowrap。

## width:auto 和 width:100%的区别

一般情况下：

width:100%会使元素box的宽度等于父元素的content box的宽度。

width:auto会使元素撑满整个父元素，margin、border、padding、content区域会自动分配水平空间。

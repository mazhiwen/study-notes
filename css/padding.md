# padding

## 特性

background属性影响区域包括padding增加的区域。

## padding与内联元素

垂直方向完全受line-height和vertical-align的影响，padding视觉上并没有改变上一行和下一行内容的间距。可以在垂直方向上增大可点击区域。如：一个关闭的“x”如果太小，用户就很难点击到，调大字体又会影响布局，这时候就可以用到padding。

## padding的百分比值

padding不支持负值

padding百分比无论宽高都是相对于width来说的

另外padding区域是跟着行框盒子走的。因此，如果padding作用于内联元素，则宽度和高度细节有差异，并且padding会断行，其原因在于strut，意思是说每一个行框盒子前面都有一个不可见的盒子，其line-height和font-size都继承于父元素，称为strut。利用padding的这些特性，我们可以实现:

- 一个正方形

```html
<div class="boxa">
  <div class="b1">
  </div>
</div>
```

```css
.boxa{
  width:100px;
  .b1{
    padding:50%;
    background:red;
  }
}
```

- 内联元素padding高度差异(只需把font-size设为0即可变为正方形)

```html
<div class="boxa">
  <span class="b1">
  </span>
</div>
```

```css
.boxa{
  width:100px;
  .b1{
    font-size:0;
    padding:50%;
    background:red;
  }
}
```

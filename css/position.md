# position

CSS position属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。

## position属性值

### static

默认值。没有定位，元素出现在正常的流中（忽略top,bottom,left,right,z-index声明）。

### absolute

生成绝对定位的元素，相对于值不为static的第一个父元素的paddingbox进行定位，也可以理解为离自己这一级元素最近的
一级position设置为absolute或者relative的父元素的paddingbox的左上角为原点的。

### fixed（老IE不支持）

生成绝对定位的元素，相对于浏览器窗口进行定位。

### relative

生成相对定位的元素，相对于其元素本身所在正常位置进行定位。

### inherit

规定从父元素继承position属性的值。

## 相关的left,right,top,bottom值

### length类型值

px
em等

### 百分比值

- left,right:

相对父元素width的百分比

- top,bottom:

参照于父元素height的百分比

### 关键词

auto等

### 全局词

inherit;
initial;
unset;

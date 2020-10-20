# position

CSS position属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。

## position属性值

- static

默认值。没有定位，元素出现在正常的流中（忽略top,bottom,left,right,z-index声明）。

- absolute

生成绝对定位的元素，相对于值不为static的第一个父元素的paddingbox进行定位，也可以理解为离自己这一级元素最近的一级position设置为absolute或者relative的父元素的paddingbox的左上角为原点的。

- fixed（老IE不支持）

生成绝对定位的元素，相对于浏览器窗口进行定位。

- relative

生成相对定位的元素，相对于其元素本身所在正常位置进行定位。

- inherit

规定从父元素继承position属性的值。

## 相关的left,right,top,bottom值

当相对定位元素同时应用对立方向定位值的时候，也就是top/bottom和left/right同时使用的时候，只有一个方向的定位属性会起作用。而谁起作用则是与文档流的顺序有关的，默认的文档流是自上而下、从左往右，因此top/bottom同时使用的时候，bottom失效；left/right同时使用的时候，right失效。

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

## 绝对定位元素与非绝对定位元素的百分比计算的区别

绝对定位元素的宽高百分比是相对于临近的position不为static的祖先元素的padding box来计算的。

非绝对定位元素的宽高百分比则是相对于父元素的content box来计算的。

## absolute 的 containingblock（包含块）计算方式跟正常流有什么不同

（1）内联元素也可以作为“包含块”所在的元素；

（2）“包含块”所在的元素不是父块级元素，而是最近的position不为static的祖先元素或根元素；

（3）边界是padding box而不是content box。

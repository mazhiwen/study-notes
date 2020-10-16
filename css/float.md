# float

浮动元素会从普通文档流中脱离，但浮动元素影响的不仅是自己，它会影响周围的元素对齐进行环绕。

## 典型应用：文字环绕图片

让block元素无视float元素，让inline元素让流水一样围绕着float元素来实现浮动布局

```html
<img class="float" src="image1.jpg">
<p class="around">Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. </p>
```

```css
.float{
 float:left;
 margin: 10px;
 width: 100px;
 height: 100px;
}
.around {
 background: #00ff90;
 width:300px;
 padding: 10px;
}
```

## float特性

### 块级框

不管一个元素是行内元素还是块级元素，如果被设置了浮动，那浮动元素会生成一个块级框。可以设置它的width和height。

不浮动的默认情况下，div元素的宽是100%，div浮动以后，宽度会像inline元素一样跟随内容自适应。

当多个元素指定为float且同时为left/right时，元素是紧挨着排列，行内宽度不够时再换行排列。

浮动并不是从父元素左上角开始作为浮动位置。

### 高度崩塌

脱离文档流，父元素不做特殊设置的话，高度不会被子元素撑开

### float布局的9条规则

<https://segmentfault.com/a/1190000005925592>

- 左浮动的盒子的**左边界**不会超出容器的左边界，右浮动同理

- 如果盒子是左浮动的,那么在html文档中晚出现的左浮动盒子只允许出现在先出现的左浮动盒子的**右边**。或者晚出现的左浮动盒子的顶部必须在早出现左浮动盒子的**底部之下**。右浮动同理

两种情况二选一

- 左浮动盒子的**右外边缘**可能不在其下一个的的任何右浮动框的**左外边缘的右边**（可能在下面），右浮动同理

- 浮动盒子的顶部不能超出容器的顶部边界

- 浮动盒子的**顶部**不会超出在html文档中早出现的的块级元素(block)或者是浮动元素的**顶部**

### 其他特性

当给元素添加了绝对定位 absolute 或者 fixed 后，元素的浮动效果就会消失，即便 float 属性设置在 position 属性之后。

## clear属性

官方对clear属性的解释是：“元素盒子的边不能和前面的浮动元素相邻。”，我们对元素设置clear属性是为了避免浮动元素对该元素的影响，而不是清除掉浮动

clear CSS 属性指定一个元素是否必须移动(清除浮动后)到在它之前的浮动元素下面

clear : none | left | right | both

clear属性指的是元素盒子的边不能和前面的浮动元素相邻，注意这里“前面的”3个字，也就是clear属性对“后面的”浮动元素是不闻不问的。

一般使用伪元素的方式清除浮动

```css
.clear::after{
  content:'';
  display:table;//也可以是'block'，或者是'list-item'
  clear:both;
}
```

clear属性只有块级元素才有效的，而::after等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时需要设置display属性值的原因。

## 清除浮动的影响

以下方法清除浮动，以及清除浮动带来的效果

1.给父级元素定义高度  
2.让父级元素也浮动  
3.父级定义display:table  
4.父元素设置overflow:hidden  
5.clearfix:使用内容生成的方式清除浮动  

```css
.clearfix::after {  /* :after选择器向选定的元素之后插入内容  */
  content:""; /* 生成内容为空  */
  display: block; /* 块级元素显示  */
  clear:both; /* 清除前面元素  */
}
```

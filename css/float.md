# float

让block元素无视float元素，让inline元素让流水一样围绕着float元素来实现浮动布局

## 典型应用：文字环绕图片

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

### 高度崩塌

脱离文档流，父元素不做特殊设置的话，高度不会被子元素撑开

## clear属性

clear属性的作用是清除浮动。

clear : none | left | right | both

## float布局的9条规则

<https://segmentfault.com/a/1190000005925592>

- 左浮动的盒子的**左边界**不会超出容器的左边界，右浮动同理

- 如果盒子是左浮动的,那么在html文档中晚出现的左浮动盒子只允许出现在先出现的左浮动盒子的**右边**。或者晚出现的左浮动盒子的顶部必须在早出现左浮动盒子的**底部之下**。右浮动同理

两种情况二选一

- 左浮动盒子的**右外边缘**可能不在其下一个的的任何右浮动框的**左外边缘的右边**（可能在下面），右浮动同理

- 浮动盒子的顶部不能超出容器的顶部边界

- 浮动盒子的**顶部**不会超出在html文档中早出现的的块级元素(block)或者是浮动元素的**顶部**

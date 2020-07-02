## BFC

(Block Formatting Context)

**定义：**

块级格式化上下文，它是指一个独立的块级渲染区域，只有Block-level Box参与，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。  

**生成：**  

满足下列CSS声明之一的元素便会生成BFC：  

根元素或其它包含它的元素；  
float的值不为none；  
overflow的值不为visible;  
position的值不为static；  
display的值为inline-block、table-cell、table-caption；  
flex boxes (元素的display: flex或inline-flex)；  

**用法：**

* 给父元素设置overflow:hidden可以清除子元素的浮动

```html
<div class="one">
  <div class="two">Hello World!</div>
</div>
你好世界！
```

```css
.one {
  background-color: pink;
  overflow: hidden;
}
.two {
  float: left;
}
```

* 解决margin重叠问题

```html
<div class="container">
  <div class="wrapper">
      <div class="box1"></div>
  </div>
  <div class="box2"></div>
</div>
```

```css
.container {
    overflow: hidden;
    width: 100px;
    height: 100px;
    background-color: red;
}
.wrapper {
    overflow: hidden;
}
.box1 {
    height: 20px;
    margin: 10px 0;
    background-color: green;
}
.box2 {
    height: 20px;
    margin: 20px 0;
    background-color: green;
}
```

* 解决侵占浮动元素的问题

```html
<div class="box1">box1</div>
<div class="box2">box2</div>
```

```css
.box1 {
  float: left;
  width: 100px;
  height: 100px;
  background-color: pink;
}
.box2 {
  width: 200px;
  height: 200px;
  background-color: skyblue;
  overflow: hidden;
  /*或者 float: left;*/
}
```

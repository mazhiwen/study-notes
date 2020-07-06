# border

## 制作图形

三角形，圆形

## 等高布局

float是在父元素的内容区域内开始计算float，内容区域即不包括margin border padding

给float起来的元素的父元素添加伪元素可以抵消float造成的布局流消失，即使浮动的子元素可以自动撑高父元素高度。

```html
<div class="div1">
  <div class="div2">
    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
  </div>
  <section>
    content
  </section>
</div>
```

```css
.div1{
  text-align: left;
  background: #f3f3f3;
  border-left: 150px solid #333;
  &::after{
    clear:both;
    display: block;
    content: '';
  }
}
.div2{
  float: left;
  width:150px;
  margin-left:-150px;
  background: gray;

}
li{
  list-style: none;
  color: white;
}
```

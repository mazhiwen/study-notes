# css property

[CSS @property，让不可能变可能](https://juejin.cn/post/6951201528543707150)

## 原本的css自定义属性

```css
:root {
    --colorA: #fff;
    --colorB: #000;
}
div {
    background: linear-gradient(45deg, var(--colorA), var(--colorB));
    transition: 1s background;
    
    &:hover {
        --colorA: yellowgreen;
        --colorB: deeppink;
    }
}
```

## 使用CSS Houdini API的自定义属性

是基于 CSS Houdini API的技术概念

```css
@property --houdini-colorA {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}
@property --houdini-colorB {
  syntax: '<color>';
  inherits: false;
  initial-value: #000;
}
.property {
    background: linear-gradient(45deg, var(--houdini-colorA), var(--houdini-colorB));
    transition: 1s --houdini-colorA, 1s --houdini-colorB;
    
    &:hover {
        --houdini-colorA: yellowgreen;
        --houdini-colorB: deeppink;
    }
}
```

## 用处

不仅自定义变量，（变量作为css的属性的值）

可以修改变量，hover后自动回复初始值

可以对变量值 使用transition过渡。例如：将原本定义在 background 的过渡效果嫁接到了 color 之上。**CSS 是支持一个颜色变换到另外一个颜色的**

## 例子：背景色渐变

如上述例子代码即是

## 兼容

目前兼容不是很好

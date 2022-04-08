# svg

[anime.js 实战轻松实现 SVG 路径 (path) 曲线动画](https://juejin.cn/post/6844903473524244488)

<https://blog.csdn.net/weixin_41646716/article/details/89335639>

<https://developer.mozilla.org/zh-CN/docs/Web/SVG>

<https://blog.csdn.net/wodeai1235/article/details/77870715>

<https://www.w3school.com.cn/svg/svg_grad_linear.asp>

<https://juejin.cn/post/6844903722196140040>

<https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/path>

## `<svg>`

viewBox:

width:

height:

## `<path>`

d: 绘图码

## `<linearGradient>`

线性渐变

## anime.js

使用svg path 转换为 动画路径

可以对svg 进行动画操作

## svg动画库

[SVG基础及其动画应用浅析](https://juejin.cn/post/6976876179496124430)

### GSAP

全称是GreenSock Animation Platform，以前流行用 flash 的时候，GSAP就叱咤江湖的存在，GSAP有两个版本一个是 flash 版本，一个是 javascript 版本，也就是我们说的 GSAP js。GSAP 速度快。GSAP专门优化了动画性能，使之实现和css一样的高性能动画效果；轻量与模块化；

### Snap.svg、SVG.js、Velocity.js

这三个库一直会被开发者拿来对比，基本上会用jQuery，就会使用这三个库，也就是说入手友好，Snap.svg 更偏向于支持现代浏览器，所以它的体量也会小一些。对比 Snap.svg 来看 SVG.js ，SVG.js 的写法更加的清晰，使用时会有更好的体验，且自称提供接近完整的 SVG 规范覆盖。Snap.svg 风格就更像一个侠客，写起来会很潇洒但是不好读，Velocity 也很强大，简单易用、高性能、功能丰富

Snap.svg : <https://www.npmjs.com/package/snapsvg> 7w+

SVG.js: <https://www.npmjs.com/package/@svgdotjs/svg.js> 3w+

Velocity.js: <https://www.npmjs.com/package/velocity-animate> 20w+

### anime.js

<https://www.animejs.cn/> <https://www.npmjs.com/package/animejs> 14w+

anime.js 虽然功能没有 GASP 强大，但是体积很乐观，gzip压缩完只有9kb左右，满足日常需求开发还是足够的

### D3

<https://www.npmjs.com/package/d3> 180w+

Data-Driven Documents 顾名思义，更加适合用于创建数据可视化图形场景去使用

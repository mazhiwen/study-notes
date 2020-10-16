# css动画

transition关注的是CSS property的变化，property值和时间的关系是一个三次贝塞尔曲线。

animation作用于元素本身而不是样式属性，可以使用关键帧的概念，应该说可以实现更自由的动画效果。

## transition

transition : property duration timing-function delay;  

transition:width 2s;  

### transition-property

规定设置过渡效果的 CSS 属性的名称。

### transition-duration

规定完成过渡效果需要多少秒或毫秒:5s

### transition-timing-function

规定速度效果的速度曲线:

linear:规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。

ease:规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。

ease-in :规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。

ease-out :规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。

ease-in-out :规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。

### transition-delay 定义过渡效果何时开始

## animation

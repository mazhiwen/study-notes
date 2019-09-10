# 移动端知识点

相关知识

http://caibaojian.com/mobile-knowledge.html

### 移动端的一些技巧

#### viewport模版

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<!-- H5页面窗口自动调整到设备宽度，并禁止用户缩放页面 -->
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<!-- 忽略将页面中的数字识别为电话号码 -->
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>标题</title>
<link rel="stylesheet" href="index.css">
</head>

<body>
这里开始内容
</body>

</html>
```


#### font-family

中文字体使用系统默认即可，英文用Helvetica

```css
body{font-family:Helvetica;}
```

#### font-size

需要兼容分辨率差别大的设备时，使用rem

```css
html{font-size:10px}
@media screen and (min-width:321px) and (max-width:375px){
  html{
    font-size:11px
  }
}
@media screen and (min-width:376px) and (max-width:414px){html{font-size:12px}}
@media screen and (min-width:415px) and (max-width:639px){html{font-size:15px}}
@media screen and (min-width:640px) and (max-width:719px){html{font-size:20px}}
@media screen and (min-width:720px) and (max-width:749px){html{font-size:22.5px}}
@media screen and (min-width:750px) and (max-width:799px){html{font-size:23.5px}}
@media screen and (min-width:800px){html{font-size:25px}}
```

#### touch事件

当用户手指放在移动设备在屏幕上滑动会触发的touch事件

- 以下支持webkit:

touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指

touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动

touchend——当手指离开屏幕时触发

touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用

- TouchEvent:

touches：屏幕上所有手指的信息

targetTouches：手指在目标区域的手指信息

changedTouches：最近一次触发该事件的手指信息

touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息

参考：https://developer.mozilla.org/en-US/docs/web/API/TouchEvent

- 触摸事件的响应顺序

ontouchstart

ontouchmove

ontouchend

onclick

- 移动端click屏幕产生200-300 ms的延迟响应

300ms是ios双击，第一次距离第二次的事件间隔 

解决方案：

1. fastclick可以解决在手机上点击事件的300ms延迟

2. zepto的touch模块，tap事件也是为了解决在click的延迟问题

#### Retina现实屏

- retina：一种具备超高像素密度的液晶屏，同样大小的屏幕上显示的像素点由1个变为多个，如在同样带下的屏幕上，苹果设备的retina显示屏中，像素点1个变为4个

- 在高清显示屏中的位图被放大，图片会变得模糊，因此移动端的视觉稿通常会设计为传统PC的2倍

- 前端方案:

设计稿切出来的图片长宽保证为偶数，并使用backgroud-size把图片缩小为原来的1/2。
其它元素的取值为原来的1/2，例如视觉稿40px的字体，使用样式的写法为20px

#### 其他技巧

- ios系统中元素被触摸时产生的半透明灰色遮罩怎么去掉

```css
a,button,input,textarea{-webkit-tap-highlight-color: rgba(0,0,0,0;)}
```

- 部分android系统中元素被点击时产生的边框怎么去掉

```css
a,button,input,textarea{
-webkit-tap-highlight-color: rgba(0,0,0,0);
-webkit-user-modify:read-write-plaintext-only;
}
```
对于按钮类还有个办法，不使用a或者input标签，直接用div标签

- winphone系统a、input标签被点击时产生的半透明灰色背景怎么去掉

```html
<meta name="msapplication-tap-highlight" content="no">
```

- webkit表单元素的默认外观怎么重置

```css
.css{-webkit-appearance:none;}
```

- webkit表单输入框placeholder的颜色值能改变么

```css
input::-webkit-input-placeholder{color:#AAAAAA;}
input:focus::-webkit-input-placeholder{color:#EEEEEE;}
```

- webkit表单输入框placeholder的文字能换行么

ios可以，android不行~

在textarea标签下都可以换行~

- 禁用 select 默认下拉箭头

::-ms-expand 适用于表单选择控件下拉箭头的修改，有多个属性值，设置它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。

```css
select::-ms-expand {
display: none;
}
```

- 禁用 radio 和 checkbox 默认样式

::-ms-check 适用于表单复选框或单选按钮默认图标的修改，同样有多个属性值，设置它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。

```css
input[type=radio]::-ms-check,
input[type=checkbox]::-ms-check
{
display: none;
}
```

- 禁用PC端表单输入框默认清除按钮

当表单文本输入框输入内容后会显示文本清除按钮，::-ms-clear 适用于该清除按钮的修改，同样设置使它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。

```css
input[type=text]::-ms-clear,
input[type=tel]::-ms-clear,
input[type=number]::-ms-clear
{
display: none;
}
```

- 禁止ios 长按时不触发系统的菜单，禁止ios&android长按时下载图片

```css
.css{-webkit-touch-callout: none}
```

- 禁止ios和android用户选中文字

```css
.css{-webkit-user-select:none}
```

参考《如何改变表单元素的外观(for Webkit and IE10)》

- 打电话发短信写邮件怎么实现
打电话

```html
<a href="tel:0755-10086">打电话给:0755-10086</a>
发短信，winphone系统无效

<a href="sms:10086">发短信给: 10086</a>
```

#### 屏幕旋转的事件和样式

- 事件

window.orientation，取值：正负90表示横屏模式、0和180表现为竖屏模式；

```js
window.onorientationchange = function(){
  switch(window.orientation){
    case -90:
    case 90:
    alert("横屏:" + window.orientation);
    case 0:
    case 180:
    alert("竖屏:" + window.orientation);
    break;
  }
}
```

- 样式

```css
//竖屏时使用的样式
@media all and (orientation:portrait) {
.css{}
}

//横屏时使用的样式
@media all and (orientation:landscape) {
.css{}
}
```

#### audio元素和video元素在ios和andriod中无法自动播放

应对方案：触屏即播

```js
$('html').one('touchstart',function(){
  audio.play()
})
```

#### 摇一摇功能

HTML5 deviceMotion：封装了运动传感器数据的事件，可以获取手机运动状态下的运动加速度等数据。

#### 手机拍照和上传图片

```html
<input type=”file”>的accept 属性

<!-- 选择照片 -->
<input type=file accept="image/*">
<!-- 选择视频 -->
<input type=file accept="video/*">
```

使用总结：

ios 有拍照、录像、选取本地图片功能

部分android只有选取本地图片功能

winphone不支持

input控件默认外观丑陋

#### 微信浏览器用户调整字体大小后页面矬了，怎么阻止用户调整

- 原因

android侧是复写了layoutinflater 对textview做了统一处理

ios侧是修改了body.style.webkitTextSizeAdjust值

- 解决方案：

android使用以下代码，该接口只在微信浏览器下有效(感谢jationhuang同学提供)

```js
/**
* 页面加入这段代码可使Android机器页面不再受到用户字体缩放强制改变大小
* 但是会有一个1秒左右的延迟，期间可以考虑通过loading展示
* 仅供参考
*/
(function(){
if (typeof(WeixinJSBridge) == "undefined") {
document.addEventListener("WeixinJSBridgeReady", function (e) {
setTimeout(function(){
WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) {
alert(JSON.stringify(res));
});
},0);
});
} else {
setTimeout(function(){
WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) {
alert(JSON.stringify(res));
});
},0);
}
})();
```

ios使用-webkit-text-size-adjust禁止调整字体大小

```css
body{-webkit-text-size-adjust: 100%!important;}
```

- 最好的解决方案：

整个页面用rem或者百分比布局

#### 取消input在ios下，输入的时候英文首字母的默认大写

```html
<input autocapitalize="off" autocorrect="off" />
```

#### android 上去掉语音输入按钮

```css
input::-webkit-input-speech-button {display: none}
```

#### android 2.3 bug

@-webkit-keyframes 需要以0%开始100%结束，0%的百分号不能去掉

after和before伪类无法使用动画animation

border-radius不支持%单位

translate百分比的写法和scale在一起会导致失效，例如-webkit-transform: translate(-50%,-50%) scale(-0.5, 1)

#### android 4.x bug

三星 Galaxy S4中自带浏览器不支持border-radius缩写

同时设置border-radius和背景色的时候，背景色会溢出到圆角以外部分

部分手机(如三星)，a链接支持鼠标:visited事件，也就是说链接访问后文字变为紫色

android无法同时播放多音频audio

#### 设计高性能css3动画的几个要素

- 尽可能地使用合成属性transform和opacity来设计CSS3动画，不使用position的left和top来定位

- 利用translate3D开启GPU加速
参考《High Performance Animations》

#### fixed bug

- ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位
- android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位
- ios4下不支持position:fixed

解决方案

可用isroll.js，暂无完美方案

- 如何阻止windows Phone的默认触摸事件

winphone下默认触摸事件事件使用e.preventDefault是无效的

目前解决方法是使用样式来禁用

```css
html{-ms-touch-action: none;}/* 禁止winphone默认触摸事件 */
```

#### 播放视频不全屏

```html
<!--
1.ios7+支持自动播放
2.支持Airplay的设备（如：音箱、Apple TV)播放
x-webkit-airplay="true"
3.播放视频不全屏
webkit-playsinline="true"
-->
<video x-webkit-airplay="true" webkit-playsinline="true" preload="auto" autoplay src="http://"></video>
```

#### flex布局

flex布局目前可使用在移动中，并非所有的语法都全兼容，但以下写法笔者实践过，效果良好~

```css
/* ============================================================
flex：定义布局为盒模型
flex-v：盒模型垂直布局
flex-1：子元素占据剩余的空间
flex-align-center：子元素垂直居中
flex-pack-center：子元素水平居中
flex-pack-justify：子元素两端对齐
兼容性：ios 4+、android 2.3+、winphone8+
============================================================ */
.flex{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}
.flex-v{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}
.flex-1{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}
.flex-align-center{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;}
.flex-pack-center{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}
.flex-pack-justify{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}
```

### 常用的移动端框架

- zepto.js

- iscroll.js

解决页面不支持弹性滚动，不支持fixed引起的问题~

实现下拉刷新，滑屏，缩放等功能~

- underscore.js

该库提供了一整套函数式编程的实用功能，但是没有扩展任何JavaScript内置对象。

### 滑屏框架

适合上下滑屏、左右滑屏等滑屏切换页面的效果

slip.js

iSlider.js

fullpage.js




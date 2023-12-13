# 像素

<https://github.com/jawil/blog/issues/21>

## PPI

每英寸像素(pixel per inch)

每英寸像素取值，更确切的说法应该是像素密度，也就是衡量单位物理面积内拥有像素值的情况。

表示每英寸所拥有的像素(pixel)数目，数值越高，代表显示屏能够以越高的密度显示图像。

每英寸多少像素数，放到显示器上说的是每英寸多少物理像素及显示器设备的点距。

我们知道，ppi越高，每英寸像素点越多，图像越清晰；我们可以类比物体的密度，密度越大，单位体积的质量就越大，ppi越高，单位面积的像素越多。

## DPI

每英寸多少点。

## 设备像素

DP: 设备像素(device pixel)

又称为物理像素。

指设备能控制显示的最小物理单位，意指显示器上一个个的点。从屏幕在工厂生产出的那天起，它上面设备像素点就固定不变了，单位 pt。

pt 在 css 单位中属于真正的绝对单位，1pt = 1/72(inch), inch及英寸，而1英寸等于2.54厘米。所以设备像素的特点就是大小固定，不可变。比如 iPhone 5 的分辨率为 640 x 1136px.

## 设备独立像素

DIP(Device independent Pixel)

设备独立像素，也称为逻辑像素，简称dip

CSS像素 =设备独立像素 = 逻辑像素

在移动端浏览器中以及某些桌面浏览器中,window对象有一个devicePixelRatio属性，它的官方的定义为：设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素

CSS像素就可以看做是设备的独立像素，所以通过window.devicePixelRatio，我们可以知道该设备上一个css像素代表多少个物理像素。

例如，在Retina屏的iphone上，devicePixelRatio的值为2，也就是说1个css像素相当于2个物理像素。但是要注意的是，devicePixelRato在不同的浏览器中还存在些许的兼容性问题，所以我们现在还并不能完全信赖这个东西

## 设备像素比

设备像素比：物理像素 / 设备独立像素

DPR = 设备像素/CSS像素

dpr 描述的是未缩放状态下，物理像素和CSS像素的初始比例关系

获得设备像素比（dpr）后，便可得知设备像素与CSS像素之间的比例。当这个比率为1:1时，使用1个设备像素显示1个CSS像素。当这个比率为2:1时，使用4个设备像素显示1个CSS像素，当这个比率为3:1时，使用9（3*3）个设备像素显示1个CSS像素。

设备像素比(dpr) 是指在移动开发中1个css像素占用多少设备像素，如2代表1个css像素用2x2个设备像素来绘制。

设备像素比(dpr)，公式为1px = (dpr)^2 * 1dp，可以理解为1px由多少个设备像素组成；

在JavaScript中，可以使用window.devicePixelRatio获取设备的DPR。设备像素比有两个主要目的：

1.保持视觉一致性，以确保相同大小的元素在不同分辨率的屏幕上具有一致的视觉大小，避免在不同设备上显示过大或过小的问题。
2.支持高分辨率屏幕，以提供更清晰、更真实的图像和文字细节。

## CSS像素

px - CSS像素(css pixel)

是虚拟像素，也可以理解为直觉像素。

CSS 像素是 Web 编程的概念，指的是 CSS 样式代码中使用的逻辑像素。

在 CSS 规范中，长度单位可以分为两类，绝对(absolute)单位以及相对(relative)单位。px 是一个相对单位，相对的是前面所说的设备像素(device pixel)。比如 iPhone 5 的 CSS 像素数为 320 x 568px.

在同一个设备上，每1个 CSS 像素所代表的设备像素是可以变化的

在不同的设备之间，每1个 CSS 像素所代表的设备像素是可以变化的

所以，CSS中的1px（CSS像素 可变）!== 设备的1px（设备像素 不可变）。

## viewport

[viewport移动端适配](https://juejin.cn/post/6844903721697017864)

[viewport详解](https://juejin.cn/post/6900407534679818253)

### 概念

layout viewport: 浏览器默认的viewport,通过document.documentElement.clientWidth获取。如果把移动设备上浏览器的可视区域设为viewport的话，某些网站就会因为viewport太窄而显示错乱，所以这些浏览器就决定默认情况下把viewport设为一个较宽的值，比如980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。ppk把这个浏览器默认的viewport叫做layout viewport。

visual viewport:浏览器可视区域的大小。 visual viewport的宽度可以通过window.innerWidth 来获取。layout viewport的宽度是大于浏览器可视区域的宽度的，所以我们还需要一个viewport来代表浏览器可视区域的大小，ppk把这个viewport叫做visual viewport。

ideal viewport: 理想viewport

### meta控制

```css
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让viewport的宽度等于设备的宽度，这个应该是大家都想要的效果，如果你不这样的设定的话，那就会使用那个比屏幕宽的默认viewport，也就是说会出现横向滚动条。

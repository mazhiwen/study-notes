# css性能

[仅使用CSS提高页面渲染速度](https://juejin.cn/post/6942661408181977118)

<https://www.jianshu.com/p/4e673bf24a3b>

## 加载性能

（1）css压缩：将写好的css进行打包压缩，可以减少很多的体积。

（2）css单一样式：当需要下边距和左边距的时候，很多时候选择:margin:top 0 bottom 0;但margin-bottom:bottom;margin-left:left;执行的效率更高。

（3）减少使用@import,而建议使用link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。

## 选择器性能

（1）关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；

（2）如果规则拥有ID选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。

（3）避免使用通配规则，如*{}计算次数惊人！只对需要用到的元素进行选择。

（4）尽量少的去对标签进行选择，而是用class。

（5）尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。

（6）了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。

## 渲染性能

（1）慎重使用高性能属性：浮动、定位。

（2）尽量减少页面重排、重绘。

（3）去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少css文档体积。

（4）属性值为0时，不加单位。

（5）属性值为浮动小数0.**，可以省略小数点之前的0。

（6）标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后。

（7）不使用@import前缀，它会影响css的加载速度。

（8）选择器优化嵌套，尽量避免层级过深。

（9）css雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。

（10）正确使用display的属性，由于display的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。

（11）不滥用web字体。对于中文网站来说WebFonts可能很陌生，国外却很流行。web fonts通常体积庞大，而且一些浏览器在下载web fonts时会阻塞页面渲染损伤性能。

## 可维护性、健壮性

（1）将具有相同属性的样式抽离出来，整合并通过class在页面中进行使用，提高css的可维护性。

（2）样式与内容分离：将css代码定义到外部css中。

## visibility, display, content-visibility

### visibility:collapse

对于一般的元素，它的表现跟visibility：hidden;是一样的。元素是不可见的，但此时仍占用页面空间。

但例外的是，如果这个元素是table相关的元素，例如table行，table group，table列，table column group，它的表现却跟display:none一样，也就是说，它们占用的空间也会释放。

### display: none

隐藏元素并破坏其渲染状态。 这意味着取消隐藏元素与渲染具有相同内容的新元素一样昂贵

### visibility: hidden

隐藏元素并保持其渲染状态。 这并不能真正从文档中删除该元素，因为它（及其子树）仍占据页面上的几何空间，并且仍然可以单击。 它也可以在需要时随时更新渲染状态，即使隐藏也是如此

### content-visibility: hidden

隐藏元素并保留其渲染状态。这意味着该元素隐藏时行为和display: none一样，但再次显示它的成本要低得多

## content-visibility

浏览器自动局部渲染，它允许我们推迟我们选择的HTML元素渲染

```css
.card {
  content-visibility: auto;
  contain-intrinsic-size: 200px;
}
```

## contain

目的是能够让浏览器有能力只对部分元素进行重绘、重排，而不必每次针对整个页面。即，允许浏览器针对DOM的有限区域而不是整个页面重新计算布局，样式，绘画，大小或它们的任意组合。

layout ：该值表示元素的内部布局不受外部的任何影响，同时该元素以及其内容也不会影响以上级

paint ：该值表示元素的子级不能在该元素的范围外显示，该元素不会有任何内容溢出（或者即使溢出了，也不会被显示）

size ：该值表示元素盒子的大小是独立于其内容，也就是说在计算该元素盒子大小的时候是会忽略其子元素

content ：该值是contain: layout paint的简写

strict ：该值是contain: layout paint size的简写

## font-display

使用font-display解决由于字体造成的布局偏移（FOUT）

## scroll-behavior

让滚动更流畅

scroll-behavior接受两个值：

auto ：滚动框立即滚动

smooth ：滚动框通过一个用户代理定义的时间段使用定义的时间函数来实现平稳的滚动，用户代理平台应遵循约定，如果有的话

```css
html {
    scroll-behavior:smooth;
}
```

## 开启GPU渲染加速

[GPU加速在前端的应用](https://juejin.cn/post/6965810210283716644)

浏览器针对处理CSS动画和不会很好地触发重排（因此也导致绘）的动画属性进行了优化。为了提高性能，可以将被动画化的节点从主线程移到GPU上。将导致合成的属性包括 :

transform、opacity、filters这些动画不会引起回流重绘

常见的触发硬件加速的css属性：

1. 使用 transform 替代 top

```js
setTimeout(() => {
  // 引起回流
  document.querySelector('.test').style.top = '100px'
}, 1000)
```

2. opacity

3. filters

4. Will-change

见css文档

5. 一些元素

例如:`<video>, <canvas> <iframe>`也位于各自的图层上。 将元素提升为图层（也称为合成）时，动画转换属性将在GPU中完成，从而改善性能，尤其是在移动设备上。

## 减少渲染阻止时间

只让主CSS文件阻塞关键路径，并以高优先级下载它，而让其他样式表以低优先级方式下载

```html
<!-- style.css contains only the minimal styles needed for the page rendering -->
<link rel="stylesheet" href="styles.css" media="all" />

<!-- Following stylesheets have only the styles necessary for the form factor -->
<link rel="stylesheet" href="sm.css" media="(min-width: 20em)" />
<link rel="stylesheet" href="md.css" media="(min-width: 64em)" />
<link rel="stylesheet" href="lg.css" media="(min-width: 90em)" />
<link rel="stylesheet" href="ex.css" media="(min-width: 120em)" />
<link rel="stylesheet" href="print.css" media="print" />
```

默认情况下，浏览器假设每个指定的样式表都是阻塞渲染的。通过添加 media属性附加媒体查询，告诉浏览器何时应用样式表。当浏览器看到一个它知道只会用于特定场景的样式表时，它仍会下载样式，但不会阻塞渲染。

## 避免@import包含多个样式表

@import ，它是一个阻塞调用，因为它必须通过网络请求来获取文件，解析文件，并将其包含在样式表中。如果我们在样式表中嵌套了 @import，就会妨碍渲染性能。

也就是@import会发起网络请求

与使用 @import 相比，我们可以通过多个 link 来实现同样的功能，但性能要好得多，因为它允许我们并行加载样式表。

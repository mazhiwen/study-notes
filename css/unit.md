# 距离尺寸单位

\<length>

形式：\<number> + 长度单位（px，em，pt，in，mm，...）  

**相对单位：**  

## em  

## rem

The font size of the root element

<https://juejin.im/entry/5833f572128fe1006ccda98b>
<!-- <https://juejin.im/post/5b90e07ce51d450e6a2dd140> -->

- 一般认为网页中的根节点是 html 元素，所以采用的方式也是通过设置 html 元素的 font-size 来做屏幕适配

- 实现方案:

1. 方案1

  ```css
  @media screen and (min-width: 320px) {html{font-size:50px;}}
  @media screen and (min-width: 360px) {html{font-size:56.25px;}}
  @media screen and (min-width: 375px) {html{font-size:58.59375px;}}
  @media screen and (min-width: 400px) {html{font-size:62.5px;}}
  @media screen and (min-width: 414px) {html{font-size:64.6875px;}}
  @media screen and (min-width: 440px) {html{font-size:68.75px;}}
  @media screen and (min-width: 480px) {html{font-size:75px;}}
  @media screen and (min-width: 520px) {html{font-size:81.25px;}}
  @media screen and (min-width: 560px) {html{font-size:87.5px;}}
  @media screen and (min-width: 600px) {html{font-size:93.75px;}}
  @media screen and (min-width: 640px) {html{font-size:100px;}}
  @media screen and (min-width: 680px) {html{font-size:106.25px;}}
  @media screen and (min-width: 720px) {html{font-size:112.5px;}}
  @media screen and (min-width: 760px) {html{font-size:118.75px;}}
  @media screen and (min-width: 800px) {html{font-size:125px;}}
  @media screen and (min-width: 960px) {html{font-size:150px;}}
  ```

2. 方案2

```css
@media screen and (min-width: 320px) {html{font-size:312.5%;}}
@media screen and (min-width: 360px) {html{font-size:351.5625%;}}
@media screen and (min-width: 375px) {html{font-size:366.211%;}}
@media screen and (min-width: 400px) {html{font-size:390.625%;}}
@media screen and (min-width: 414px) {html{font-size:404.2969%;}}
@media screen and (min-width: 440px) {html{font-size:429.6875%;}}
@media screen and (min-width: 480px) {html{font-size:468.75%;}}
@media screen and (min-width: 520px) {html{font-size:507.8125%;}}
@media screen and (min-width: 560px) {html{font-size:546.875%;}}
@media screen and (min-width: 600px) {html{font-size:585.9375%;}}
@media screen and (min-width: 640px) {html{font-size:625%;}}
@media screen and (min-width: 680px) {html{font-size:664.0625%;}}
@media screen and (min-width: 720px) {html{font-size:703.125%;}}
@media screen and (min-width: 760px) {html{font-size:742.1875%;}}
@media screen and (min-width: 800px) {html{font-size:781.25%;}}
@media screen and (min-width: 960px) {html{font-size:937.5%;}}
```

3. 方案3

```

计算fontSize:

其中100为 : 1rem对应视觉稿多少px。可以是任意值的系数比。下面计算用rem2px来表示这个系数.

实际场景： 设计稿总宽700px 中的 元素10px
相当于实际情况 总宽window.innerWidth 中的 元素多少px = (固定rem , css输入单位)

window.innerWidth / designWidth 是px比例.

输入的css单位：x * 1rem
x * fontSize px / 设计稿元素 px = window.innerWidth / 设计稿总宽度 px

当设计稿元素 = 100px时，应该是对应的应该输入1rem 也就是计算的 fontSize
也就是=》
window.innerWidth / designWidth * 100 = 1rem = fontSize值;

导出结果:

fontsize = 1rem  = window.innerWidth / designWidth * 100 'px'
=>
fontsize / 100 = window.innerWidth / designWidth

```

```js
var designWidth = 640, rem2px = 100;
document.documentElement.style.fontSize =
  ((window.innerWidth / designWidth) * rem2px) + 'px';
```

4. 方案4

```js
function adapt(designWidth, rem2px){
  var d = window.document.createElement('div');
  d.style.width = '1rem';
  d.style.display = "none";
  var head = window.document.getElementsByTagName('head')[0];
  head.appendChild(d);
  var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
  d.remove();
  document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
  var st = document.createElement('style');
  var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((window.innerWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
  var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
  st.innerHTML = portrait + landscape;
  head.appendChild(st);
  return defaultFontSize
};
var defaultFontSize = adapt(640, 100);
```

**绝对单位：**

## px:像素（点）  

## mm:毫米  

## cm:厘米  

## in:英寸

## pt:磅  

## pc:12 点活字

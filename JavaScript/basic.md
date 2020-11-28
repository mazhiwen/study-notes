# javascript基础知识点

- [技巧](#技巧)
- [运算规则](#运算规则)
- [in运算符](#in运算符)
- [深浅拷贝](#深浅拷贝)
- [定时器](#定时器)
- [Error](#Error)
- [Reflect](#Reflect)
- [typed&nbsp;arrays](#typed&nbsp;arrays)
- [安全随机](#安全随机)
- [Service worker](#Service&nbsp;worker)
- [内置对象](#内置对象)
- [ToString](#ToString)
- [ToNumber](#ToNumber)
- [ToBoolean](#ToBoolean)
- [DOM 和 BOM](#DOM-和-BOM)
- [严格模式](#严格模式)

## 技巧

数据初始化null
if 提升到外层

## 运算规则

从右到左

## in运算符

如果指定的属性在指定的对象或其原型链中，则in 运算符返回true。

```js
prop in object
// 数组
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees        // 返回true
3 in trees        // 返回true
6 in trees        // 返回false
"bay" in trees    // 返回false (必须使用索引号,而不是数组元素的值)
"length" in trees // 返回true (length是一个数组属性)
Symbol.iterator in trees // 返回true (数组可迭代，只在ES2015+上有效)

// 内置对象
"PI" in Math          // 返回true

// 自定义对象
var mycar = {make: "Honda", model: "Accord", year: 1998};
"make" in mycar  // 返回true
"model" in mycar // 返回true

```

## 深浅拷贝

### 深拷贝

1. var newObj=JSON.parse(JSON.stringify(someObj))

需要保证someObj是json安全的  

当值为undefined、function、symbol 会在转换过程中被忽略。。。

concat方法与slice也存在这样的情况，他们都不是真正的深拷贝，都是浅拷贝，值的引用地址没变

2. 递归赋值 ??????错误需修正

```javascript
//判断是否是可迭代对象
function isIteration(obj){
  let objType = Object.prototype.toString.call(obj);
  return objType=='[object Object]'||objType=='[object Array]'
}
function deepCopy(obj) {
  
  if (!isIteration(obj)) {
    throw new Error('error arguments');
  }
  // const targetObj = obj.constructor === Array ? [] : {};
  const targetObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    //只对对象自有属性进行拷贝
    if (obj.hasOwnProperty(key)) {
      if (isIteration(obj[key])) {
        targetObj[key] = deepCopy(obj[key]);
      } else {
        targetObj[key] = obj[key];
      }
    }
  }
  
  
  return targetObj;
}
```

### 浅拷贝

1.resObject = Object.assign(target,origina,originb,...)

## Error

```javascript
throw new Error();
```

## Reflect

js内置对象，提供拦截javascript 操作的方法

## typed arrays

类型数组:

JavaScript类型化数组是一种类似数组的对象，并提供了一种用于访问原始二进制数据的机制。 正如你可能已经知道，Array 存储的对象能动态增多和减少，并且可以存储任何JavaScript值。JavaScript引擎会做一些内部优化，以便对数组的操作可以很快。然而，随着Web应用程序变得越来越强大，尤其一些新增加的功能例如：音频视频编辑，访问WebSockets的原始数据等，很明显有些时候如果使用JavaScript代码可以快速方便地通过类型化数组来操作原始的二进制数据将会非常有帮助。

### ArrayBuffer

ArrayBuffer 是一种数据类型，用来表示一个通用的、固定长度的二进制数据缓冲区。你不能直接操纵一个ArrayBuffer中的内容；你需要创建一个类型化数组的视图或一个描述缓冲数据格式的DataView，使用它们来读写缓冲区中的内容.

### 类型数组视图

类型化数组视图具有自描述性的名字和所有常用的数值类型像Int8，Uint32，Float64 等等。有一种特殊类型的数组Uint8ClampedArray。它仅操作0到255之间的数值。例如，这对于Canvas数据处理非常有用。

## 安全随机

```js
const array = new Uint32Array(2);
window.crypto.getRandomValues(array);
return array.join("");
```

生成随机数的方法：<https://www.hangge.com/blog/cache/detail_1872.html>

## Service worker

<https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API>

<https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers>

<https://zhuanlan.zhihu.com/p/20040372>

## 内置对象

全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

标准内置对象的分类

（1）值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。

例如 Infinity、NaN、undefined、null 字面量

（2）函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

例如 eval()、parseFloat()、parseInt() 等

（3）基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

例如 Object、Function、Boolean、Symbol、Error 等

（4）数字和日期对象，用来表示数字、日期和执行数学计算的对象。

例如 Number、Math、Date

（5）字符串，用来表示和操作字符串的对象。

例如 String、RegExp

（6）可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 Array

（7）使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

例如 Map、Set、WeakMap、WeakSet

（8）矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。

例如 SIMD 等

（9）结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。

例如 JSON 等

（10）控制抽象对象

例如 Promise、Generator 等

（11）反射

例如 Reflect、Proxy

（12）国际化，为了支持多语言处理而加入 ECMAScript 的对象。

例如 Intl、Intl.Collator 等

（13）WebAssembly

（14）其他

例如 arguments

## ToString

范的 9.8 节中定义了抽象操作 ToString ，它负责处理非字符串到字符串的强制类型转换。

（1）Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，

（2）Boolean 类型，true 转换为 "true"，false 转换为 "false"。

（3）Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。

（4）Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。

（3）对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

## ToNumber

有时我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义了抽象操作 ToNumber。

（1）Undefined 类型的值转换为 NaN。

（2）Null 类型的值转换为 0。

（3）Boolean 类型的值，true 转换为 1，false 转换为 0。

（4）String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。

（5）Symbol 类型的值不能转换为数字，会报错。

（6）对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有valueOf() 方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。

如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

## ToBoolean

ES5 规范 9.2 节中定义了抽象操作 ToBoolean，列举了布尔强制类型转换所有可能出现的结果。

以下这些是假值：
• undefined
• null
• false
• +0、-0 和 NaN
• ""

假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。

## DOM 和 BOM

DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 location 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对象的子对象。

## 严格模式

<https://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html>

use strict 是一种 ECMAscript5 添加的（严格）运行模式，这种模式使得 Javascript 在更严格的条件下运行。

严格模式的目的：

消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为;

消除代码运行的一些不安全之处，保证代码运行的安全；

提高编译器效率，增加运行速度；

为未来新版本的 Javascript 做好铺垫。

## js 延迟加载的方式

js 延迟加载，也就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。

一般有以下几种方式：

defer 属性
async 属性
动态创建 DOM 方式
使用 setTimeout 延迟方法
让 JS 最后加载

## defer async

<https://juejin.im/post/59c60691518825396f4f71a1>

（1）脚本没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。

（2）defer 属性表示延迟执行引入的 JavaScript，即这段 JavaScript 加载时 HTML 并未停止解析，这两个过程是并行的。当整个 document 解析完毕后再执行脚本文件，在DOMContentLoaded 事件触发之前完成。多个脚本按顺序执行。

（3）async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。

## escape,encodeURI,encodeURIComponent

### escape

简单来说，escape是对字符串(string)进行编码(而另外两种是对URL)，作用是让它们在所有电脑上可读。

编码之后的效果是%XX或者%uXXXX这种形式。其中 ASCII字母  数字  @*/+   这几个字符不会被编码，其余的都会。

最关键的是，当你需要对URL编码时，请忘记这个方法，这个方法是针对字符串使用的，不适用于URL。

### encodeURI和encodeURIComponent

对URL编码是常见的事，所以这两个方法应该是实际中要特别注意的。

它们都是编码URL，唯一区别就是编码的字符范围，

其中encodeURI方法不会对下列字符编码  ASCII字母  数字  ~!@#$&*()=:/,;?+'

encodeURIComponent方法不会对下列字符编码 ASCII字母  数字  ~!*()'

所以encodeURIComponent比encodeURI编码的范围更大。

实际例子来说，encodeURIComponent会把 http://  编码成  http%3A%2F%2F 而encodeURI却不会。

### 场景

1、如果只是编码字符串，不和URL有半毛钱关系，那么用escape。

2、如果你需要编码整个URL，然后需要使用这个URL，那么用encodeURI。

比如encodeURI("<http://www.cnblogs.com/season-huang/some> other thing");

编码后会变为"http://www.cnblogs.com/season-huang/some%20other%20thing";

其中，空格被编码成了%20。

但是如果你用了encodeURIComponent，那么结果变为"http%3A%2F%2Fwww.cnblogs.com%2Fseason-huang%2Fsome%20other%20thing"。看到了区别吗，连 "/" 都被编码了，整个URL已经没法用了。

3、当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法。

```js
var param = "http://www.cnblogs.com/season-huang/"; //param为参数
param = encodeURIComponent(param);
var url = "<http://www.cnblogs.com?next>=" + param;
console.log(url) //"http://www.cnblogs.com?next=http%3A%2F%2Fwww.cnblogs.com%2Fseason-huang%2F"
```

## js动画与css动画

js动画适合复杂

css动画适合简单的

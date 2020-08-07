# javascript基础知识点

- [技巧](#技巧)
- [运算规则](#运算规则)
- [in运算符](#in运算符)
- [类型检测](#类型检测)
- [typeof](#typeof)
- [instanceof](#instanceof)
- [深浅拷贝](#深浅拷贝)
- [定时器](#定时器)
- [cookie](#cookie)
- [Error](#Error)
- [symbol](#symbol)
- [Reflect](#Reflect)
- [typed&nbsp;arrays](#typed&nbsp;arrays)
- [安全随机](#安全随机)
- [Service worker](#Service&nbsp;worker)

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

## typeof

typeof检测给定变量的数据类型

typeof是一个操作符而不是函数，可以不用括号

typeof对基本类型返回基本类型，对引用类型返回"object"

返回值：

```
'undefined'
'Object'
'boolean'
'string'
'number'
'function'
'symbol'
```

```javascript
//number
typeof 37 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写
// string
typeof "" === 'string';
typeof "bla" === 'string';
// boolean
typeof true === 'boolean';
// symbol
typeof Symbol() === 'symbol';
// Undefined
typeof undefined === 'undefined';
// null返回Object
typeof null === 'object';
```

```js
// object
typeof {a:1} === 'object';
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';
```

```js
// 函数
typeof function(){} === 'function';
```

## 类型检测

```javascript
//常规检测
var arr=[1,'a'];
Array.isArray(arr);
arr instanceof Array;
//安全检测
Object. prototype. toString. call( arr ) == "[object Object]";
Object. prototype. toString. call( arr ) == "[object Array]";
Object. prototype. toString. call( arr ) == "[object Function]";
Object. prototype. toString. call( arr ) == "[object RegExp]";
window. JSON && Object. prototype. toString. call( JSON) == "[object JSON]";
// 数字检测另外一种方式
typeof value === 'number' && !isNaN(value);


```

## instanceof

// 检测原型

## 深浅拷贝

### 深拷贝

```javascript

//1. var newObj=JSON.parse(JSON.stringify(someObj))
// 需要保证someObj是json安全的  
// 当值为undefined、function、symbol 会在转换过程中被忽略。。。
// concat方法与slice也存在这样的情况，他们都不是真正的深拷贝，都是浅拷贝，值的引用地址没变


//2.递归赋值??????????????????????????????错误需修正
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

### 数据类型存储方式

```
1.引用类型
存储：
栈：name：指针[指向堆值]
堆[指针]：value

2.基本类型
存储：
栈：name：value
```

<https://blog.csdn.net/flyingpig2016/article/details/52895620>

## cookie

## Error

```javascript
throw new Error();
```

## symbol

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

## Service worker

<https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API>

<https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers>

<https://zhuanlan.zhihu.com/p/20040372>

## ['1', '2', '3'].map(parseInt)

返回 [1, NaN, NaN]

## 请根据面对对象编程的思想，设计一个类型 Cash 用于表达人民币，使得

```js
class Cash {
}
const cash1 = new Cash(105);
const cash2 = new Cash(66);
const cash3 = cash1.add(cash2);
const cash4 = Cash.add(cash1, cash2);
const cash5 = new Cash(cash1 + cash2);
console.log(`${cash3}`, `${cash4}`, `${cash5}`);
```

```js
class Cash {
  constructor(money) {
   this.money = money;
  }
  static add(){ // Cash类直接可调用的方法
    let c = new Cash();
    [...arguments].forEach( // arguments转义为可数组Array
      function(item){
        this.money=(this.money||0)+(item.money||0);
      }.bind(c) // bind后返回改变this的函数
    );
    return c;
  }
  add(){ // 实例方法
    return Cash.add(this,...arguments);
  }
  valueOf() { // 实现实例可以运算，并取值
   return this.money;
  }
  toString() {
   return this.money.toString().replace(/(.)(..)$/,"$1元$2").replace(/(.)(.)$/,"$1角$2")+"分";
  }
}
```

# 数据类型

ECMAScript不支持任何创建自定义类型的机制

理论上，而所有值都将是6中基本数据类型 加上 Object 一起的 7 种数据类型之一。

***

## 一：基本类型

有6种

### 1.null

(只有null值)

null值表示一个空对象指针，所以typeof会返回Object

```js
null == undefined // true ,undefined派生自null
```

### 2.undefined

(只有undefined值)

包含undefined值的变量与尚未定义的变量是不一样的：

```js
var mes;
mes //undefined
age //没有声明，报错
```

对未初始化和未声明的变量执行typeof都返回undefined

### 3.boolean

(只有true false值)

可以对任何数据类型的值调用Boolean()函数，而且总会返回一个Boolean值

返回true或者false取决于要转换值的数据类型以及其值

规则：

```
数据类型     转换为true的值           转换为false的值

Boolean      true                    false
String      任何非空字符串              ""(空字符串)
Numbber   任何非0数字值（包括无穷大）    0和NaN
Object      任何对象
undefined                          undefined
```

流控制语句（如if语句）自动执行相应的Boolean转换

### 4.string

具体见 [String文档](./String.md)

### 5.number

用来表示整数和浮点数值

具体见 [number文档](./Number.md)

### 6.Symbol

## 二：引用类型

复杂数据类型 : 指的是 Object 类型，所有其他的如 Array、Date 等数据类型都可以理解为 Object 类型的子类。

10个引用类型

### 基本引用类型

**1. Object**

js中的对象其实就是一组数据和功能的集合。

对象可以通过new操作符后跟要创建的对象类型的名称来创建。

在js中，Object类型是所有它的实例的基础。Object所具有的任何属性和方法也同样存在与更具体的对象中。

Object的每个实例都具有以下属性和方法：

- Constructor: 保存着用于创建当前对象的函数。
- hasOwnProperty(proertyName)
- isPrototypeOf(object) ： 传入的对象是否是另一个对象的原型。
- propertyIsEnumerable(proertyName)
- toLocalString()
- toString()
- valueOf()

**2. Function**

**3. Array**

**4. Date**

**5. RegExp**

### 特殊引用类型（又叫包装类型）

每当读取一个基本类型的值的时候，后台就会创建一个对应的包装类型的对象：

```js
// Boolean Number String 都适用于以下
var s1 = 'abc';
var s2 = s1.substring(2);

//当第二行访问s1的时候，开始等价执行以下代码:

var s1 = new String('abc');
var s2 = s1.substring(2);
s1 = null;
```

**6. Boolean**

Boolean类型与布尔值对应的引用类型

创建Boolean对象：调用Boolean构造函数并传入true或false值

```js
var booleanObject = new Boolean(true);
```

Boolean类型的实例重写了valueOf()方法，返回基本类型值true或者false

重写了toString()方法，返回字符串'true'或'false'

布尔表达式中的所有对象都会被转换为true,如下:

```js
var falseObject = new Boolean(false);
falseObject && true // true

var falseValue = false;
falseValue && true // false
```

基本类型与引用类型的布尔值还有两个区别，如下：

```js
typeof falseObject // object
typeof falseValue // boolean

falseObject instanceof Boolean // true
falseValue instanceof Boolean // false
```

**7. Number**

具体见 [Number文档](./Number.md)

**8. String**

具体见 [String文档](./String.md)

### 单体内置对象

**9. Global对象**

**10. Math对象**

### 引用类型与包装类型的区别

主要区别是对象的生存周期。

使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。

而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。

### Object构造函数对包装类型的处理

根据传入值的类型返回相应基本包装类型的实例

```js
var obj = new Object('aa');
console.log(obj instanceof String);// true
```

### new包装类型的构造函数与同名的转型函数不同

```js
var value = '25';
var number = Number(value); //转型函数
alert(typeof number); // 'number',保存的是基本类型的值25

var obj = new Number(value); //构造函数
alert(typeof obj); // 'object',保存的是Number的实例
```

## 存储方式 堆 栈 区别

<https://juejin.im/post/6844903997615128583>

堆和栈的概念存在于数据结构中和操作系统内存中。

### 基本类型 - 栈

原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。

由操作系统自动分配释放 ，存放函数的参数值和局部变量的值等。

栈的特点是先进后出（或后进先出）

### 引用数据 - 堆

除了局部变量，其他的全都存在堆中

引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

对于对象类型，在栈中存的只是一个堆内地址的引用。

一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收，

分配方式倒是类似于链表

## null 和 undefined

undefined 代表的含义是未定义，null 代表的含义是空对象。

一般变量声明了但还没有定义的时候会返回 undefined，

null主要用于赋值给一些可能会返回对象的变量，作为初始化。

```js
null == undefined // true
null === undefined // false
typeof(null) // object
```

## 类型检测

<https://github.com/mqyqingfeng/Blog/issues/28>

typeof : 先做基本类型检测，再对null和其他Object用Object内部属性toString检测

typeof检测结果： 7种。undefined、object、boolean、number、string、object, symbol

```javascript
//常规检测
var arr=[1,'a'];
Array.isArray(arr);
arr instanceof Array;
// 数字检测另外一种方式
typeof value === 'number' && !isNaN(value);
```

Object.prototype.toString : 可以检测至少14种object：

```js
// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]
```

检测类型的方法封装：

```js
function getType(value) {
  // 判断数据是 null 的情况
  if (value === null) {
    return value + "";
  }

  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split("");

    type.pop();

    return type.join("").toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}
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
typeof 37 // 'number';
typeof Infinity // 'number';
typeof NaN // 'number'  尽管NaN是"Not-A-Number"的缩写
typeof "" // 'string'
typeof "bla" // 'string'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof undefined // 'undefined'
typeof null // 'object'
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

// 检测原型

## 布尔值的隐式强制类型转换

（1） if (..) 语句中的条件判断表达式。
（2） for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）。
（3） while (..) 和 do..while(..) 循环中的条件判断表达式。
（4） ? : 中的条件判断表达式。
（5） 逻辑运算符 ||（逻辑或）和 &&（逻辑与）左边的操作数（作为条件判断表达式）。

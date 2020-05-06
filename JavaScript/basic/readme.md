# javascript基础知识点

- [变量提升](#变量提升)
- [技巧](#技巧)
- [运算规则](#运算规则)
- [作用域](#作用域)
- [in运算符](#in运算符)
- [7种简单基本类型](#7种简单基本类型)
- [类型检测](#类型检测)
- [typeof](#typeof)
- [instanceof](#instanceof)
- [深浅拷贝](#深浅拷贝)
- [Event Loop](#Event&nbsp;Loop)
- [内存管理](#内存管理)
- [定时器](#定时器)
- [cookie](#cookie)
- [闭包](#闭包)
- [this](#this)
- [Math](#Math)
- [Error](#Error)
- [symbol](#symbol)
- [Reflect](#Reflect)
- [typed&nbsp;arrays](#typed&nbsp;arrays)
- [安全随机](#安全随机)
- [跨域](#跨域)
- [Service worker](Service&nbsp;worker)

## 变量提升

//声明（变量，函数等）提升， 赋值不提升

```javascript
var a=2;
//js编译阶段，先找到所有声明. var a;
//再进行执行阶段 a=2;

//函数优先变量提升 ,如 function foo(){}
foo(); // 1 var foo;
function foo() { console. log( 1 ); }
foo = function() { console. log( 2 ); };
//解析为:
function foo() { console. log( 1 ); }
foo(); // 1
foo = function() { console. log( 2 ); };
```

## 技巧

数据初始化null
if 提升到外层

## 运算规则

从右到左

## 作用域

* 块级作用域:
  with，try/catch，let 没有给for if 等划分块级作用域  。

  ```javascript
  //函数作用域中 i 会再全局定义
  //而块级作用域下i不会全局定义
  for (var i= 0; i< 10; i++) {
    console. log( i );
  }
  ```

* 函数作用域:  
  含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用  
  （事实上在嵌套的作用域中也可以使用）。例如：（var）

  这种设计方案是非常有用的，能充分利用JavaScript变量可以根据需要改变值类型的“动态”特性。  
  在任 意 代码 片段 外部 添加 包装 函数， 可以 将 内部 的 变量 和 函数 定义“ 隐藏” 起来，  
  外部 作用域 无法 访问 包装 函数 内部 的 任何 内容。  
  函数 声明 和 函数 表达式 之间 最重要的 区别 是 它们 的 名称 标识符 将会 绑 定 在何处。  

    ```javascript
    (function foo(){ // <-- 添加 这 一行  //不行。 foo 变量 名 被 隐藏 在 自身 中， 不会 非必要 地 污染 外部 作用域。
      var a = 3;
      console. log( a ); // 3
    })(); // <-- 以及 这 一行
    ```

* 词法 作用域: 是由 你在 写 代码 时 将 变量 和 块 作用域 写在 哪里 来 决定 的
  无论 函数 在哪里 被 调用， 也 无论 它 如何 被 调用， 它的 词法 作用域 都 只 由 函数 被 声明 时所处 的 位置 决定。
  编译时，而非运行时

  ```javascript
  function foo() {
    console. log( a ); // 2
  }
  function bar() {
    var a = 3; foo();
  }
  var a = 2;
  bar();
  ```

* 动态作用域: 动态 作用域 并不 关心 函数 和 作用域 是 如何 声明 以及 在何处 声明 的， 只 关心 它们 从何 处 调用。 换句话说， 作用域 链 是 基于 调用 栈 的， 而 不是 代码 中的 作用域 嵌套。  
 需要 明确 的 是， 事实上 JavaScript 并不 具有 动态 作用域。 它 只有 词法 作用域， 简单 明了。 但是 this 机制 某种程度 上 很像 动态 作用域。  
 主要 区别： 词法 作用域 是在 写 代码 或者说 定义 时 确定 的， 而 动态 作用域 是在 运行时 确定 的。（ this 也是！） 词法 作用域 关注 函数 在何处 声明， 而 动态 作用域 关注 函数 从何 处 调用。

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

## 7种简单基本类型

简单基本类型本身不是对象
boolean  
null  
undefined  
number  
string 区别于String内置对象，是字面量，不同的类型  
Symbol  
Object(new生成的,如：Array,Date,Function,RegExp等)

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

## typeof

```javascript
//Numbers
typeof 37 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写
// Strings
typeof "" === 'string';
typeof "bla" === 'string';
// Booleans
typeof true === 'boolean';
// Symbols
typeof Symbol() === 'symbol';
// null
typeof null === 'object'; //bug
// Undefined
typeof undefined === 'undefined';
// Objects
typeof {a:1} === 'object';
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';
// 函数
typeof function(){} === 'function';
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

1.引用类型
存储：
栈：name：指针[指向堆值]
堆[指针]：value
2.基本类型
存储：
栈：name：value
<https://blog.csdn.net/flyingpig2016/article/details/52895620>

## Event Loop

<http://www.ruanyifeng.com/blog/2014/10/event-loop.html>
<https://mp.weixin.qq.com/s/nJsM05Yp50HDH1hqEen2eQ>
<https://zhuanlan.zhihu.com/p/72507900>

- JavaScript是一种单线程语言

> HTML5提出Web Worker: 允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

- 没有Event loop时，常规是"同步模式"（synchronous I/O）或"堵塞模式"（blocking I/O）

- "Event Loop是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）"

- 有Event loop，可以实现异步模式"（asynchronous I/O）或"非堵塞模式"（non-blocking mode）

- 于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

- 主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

### 主线程执行栈 和 任务队列

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

### 任务队列

"任务队列"是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在"任务队列"中添加一个事件，表示相关的异步任务可以进入"执行栈"了。主线程读取"任务队列"，就是读取里面有哪些事件。

"任务队列"中的事件，除了IO设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。

所谓"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。但是，由于存在后文提到的"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。

### 宏任务 微任务

<https://zhuanlan.zhihu.com/p/72507900>

<https://www.jianshu.com/p/53e8597dfa48>

<https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model>

macrotask 和 microtask 表示异步任务的两种分类。

宏任务包括：script(整体代码)，I/O， setTimeout，setInterval，requestAnimationFrame，setImmediate。

其中setImmediate只存在于Node中，requestAnimationFrame只存在于浏览器中。

微任务包括： Promise，MutationObserver(html5新特性)，process.nextTick，Object.observe(已废弃)。

其中process.nextTick只存在于Node中，MutationObserver只存在于浏览器中。

script(主程序代码)—> process.nextTick —> Promises… ——> setTimeout ——> setInterval ——> setImmediate——> I/O——> UI rendering

```js
setTimeout(function() {
 console.log('a')
});

new Promise(function(resolve) {
 console.log('b');

 for(var i =0; i <10000; i++) {
  i ==99 && resolve();
 }
}).then(function() {
 console.log('c')
});

console.log('d');

// b
// d
// c
// a
```

## 内存管理

### 内存

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management>

### 内存泄漏

指由于疏忽或错误造成程序未能释放已经不再使用的内存的情况。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，失去了对该段内存的控制，因而造成了内存的浪费。  

检测:内存持续增多，存在内存泄漏；内存平稳，不存在内存泄漏

(<https://segmentfault.com/a/1190000008901861)>

### js中的堆和栈

<https://www.cnblogs.com/heioray/p/9487093.html>
<https://blog.csdn.net/GUANTINA/article/details/81533605>

在js引擎中对变量的存储主要有两种位置，堆内存和栈内存。

和java中对内存的处理类似，栈内存主要用于存储各种基本类型的变量，包括Boolean、Number、String、Undefined、Null，**以及对象变量的指针，这时候栈内存给人的感觉就像一个线性排列的空间，每个小单元大小基本相等。

而堆内存主要负责像对象Object这种变量类型的存储，如下图

在计算机领域中，堆栈是两种数据结构，它们只能在一端(称为栈顶(top))对数据项进行插入和删除。  
堆：队列优先,先进先出；由操作系统自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。  
栈：先进后出；动态分配的空间 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收，分配方式倒是类似于链 表。

### 垃圾回收

<https://www.cnblogs.com/dolphinX/p/3348468.html>

### 内存优化

就全局变量而言，JavaScript不能确定它在后面不能够被用到，所以它会从声明之后就一直存在于内存中，直至手动释放或者关闭页面/浏览器，这就导致了某些不必要的内存消耗。我们可以进行以下的优化。

```js
(function(){
    // 你的代码
})();
```

闭包是最容易产生内存问题的，

### setTimeout定时器

```js
console.log(1);
setTimeout(function(){console.log(2);},1000);
console.log(3);
// 1 3 2


setTimeout(function(){console.log(1);}, 0);
console.log(2);
// 先执行执行栈，再执行任务队列中的定时回调函数
// 2 1

```

- 处理倒计时误差

```js
var period = 60 * 1000 * 60 * 2
var startTime = new Date().getTime();
var count = 0
var end = new Date().getTime() + period
var interval = 1000
var currentInterval = interval

function loop() {
  count++
  var offset = new Date().getTime() - (startTime + count * interval); // 代码执行所消耗的时间
  var diff = end - new Date().getTime()
  var h = Math.floor(diff / (60 * 1000 * 60))
  var hdiff = diff % (60 * 1000 * 60)
  var m = Math.floor(hdiff / (60 * 1000))
  var mdiff = hdiff % (60 * 1000)
  var s = mdiff / (1000)
  var sCeil = Math.ceil(s)
  var sFloor = Math.floor(s)
  currentInterval = interval - offset // 得到下一次循环所消耗的时间
  console.log('时：'+h, '分：'+m, '毫秒：'+s, '秒向上取整：'+sCeil, '代码执行时间：'+offset, '下次循环间隔'+currentInterval) // 打印 时 分 秒 代码执行时间 下次循环间隔

  setTimeout(loop, currentInterval)
}

setTimeout(loop, currentInterval)
```

## cookie

## 闭包

<https://www.cnblogs.com/dolphinX/archive/2012/09/29/2708763.html>

定义：当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域外执行  

结合垃圾回收机制来了解

```javascript
function foo() {
  var a = 2;
  function bar() {
    console. log( a );
  }
  return bar;
}
var baz = foo();
baz(); // 2 ———— 朋友， 这 就是 闭 包 的 效果。

```

没有常规执行foo的垃圾回收机制,  
foo内的作用域依然存在，可以在baz中调用,  
闭包阻止了垃圾回收  
回调函数也是闭包  
个人总结function包住变量 的妙用

* 闭包与循环

```javascript
//错误1
for (var i= 1; i<= 5; i++) {
  setTimeout( function timer() {
    console. log( i );
  }, i* 1000 );
}
//错误改进2  iife
for (var i= 1; i<= 5; i++) {
  (function() {
    setTimeout( function timer() {
      console. log( i );
    }, i* 1000 );
  })();
}
//正确
for (var i= 1; i<= 5; i++) {
  (function() {
    var j = i;
    setTimeout( function timer() {
      console. log( j );
    }, j* 1000 );
  })();
}
//改进
for (var i= 1; i<= 5; i++) {
  (function( j) {
    setTimeout( function timer() {
      console. log( j );
    }, j* 1000 );
  })( i );
}
//新用法
for (var i= 1; i<= 5; i++) {
  let j = i; // 是的， 闭 包 的 块 作用域！
  setTimeout( function timer() {
    console. log( j );
  }, j* 1000 );
}


```

## this

this 提供 了 一种 更 优雅 的 方式 来 隐式“ 传递” 一个 对象 引用， 因此 可以 将 API 设计 得 更加 简洁 并且 易于 复 用。 随着 你的 使用 模式 越来越 复杂， 显 式 传递 上下文 对象 会 让 代码 变得 越来越 混乱， 使用 this 则 不会 这样。 当 我们 介绍 对象 和 原型 时， 你就 会 明白 函数 可以 自动 引用 合适 的 上下文 对象 有多 重要。

```javascript
function identify() {
  return this. name. toUpperCase();
}
function speak() {
   var greeting = "Hello, I' m " + identify. call( this );
   console. log( greeting );
}
var me = { name: "Kyle" };
var you = { name: "Reader" };
identify. call( me ); // KYLE
identify. call( you ); // READER
speak. call( me ); // Hello, 我是 KYLE
speak. call( you ); // Hello, 我是 READER
```

* this的用法：指向自身

```javascript
function foo( num) {
  console. log( "foo: " + num ); // 记录 foo 被 调用 的 次数
  this. count++;
}
var data = { count: 0 };
var i;
for (i= 0; i< 10; i++) {
  if (i > 5) {
    foo( i );
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// foo 被 调用 了 多少 次？
console. log( data. count );
// 0
//并不是预期结果


///////////////优化后

function foo( num) {
   console. log( "foo: " + num ); // 记录 foo 被 调用 的 次数
   // 注意， 在 当前 的 调用 方式 下（ 参见 下方 代码）， this 确实 指向 foo
   this. count++;
}
foo. count = 0;
var i;
for (i= 0; i< 10; i++) {
  if (i > 5) {
    // 使用 call(..) 可以 确保 this 指向 函数 对象 foo 本身
    foo. call( foo, i );
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// foo 被 调用 了 多少 次？
console. log( foo. count );
// 4

```

* this的规则  

this 是在 运行时 进行 绑 定的， 并不 是在 编写 时 绑 定， 它的 上下文 取决于 函数 调用 时 的 各种 条件。 this 的 绑 定 和 函数 声明 的 位置 没有 任何 关系， 只 取决于 函数 的 调用 方式。 当 一个 函数 被 调用 时， 会 创建 一个 活动 记录（ 有时候 也称 为 执行 上下文）。 这个 记录 会 包含 函数 在哪里 被 调用（ 调用 栈）、 函数 的 调用 方法、 传入 的 参数 等 信息。 this 就是 记录 的 其中 一个 属性， 会在 函数 执行 的 过程中 用到。

1. 调用位置：函数在代码中被调用的位置，而不是声明位置
2. 绑定规则：  
    默认绑定：function声明引用默认global  

    ```javascript
    function foo() {
      console. log( this. a );
    }
    var a = 2;
    foo(); // 2
    ```

    隐式绑定：

    ```javascript
    //赋值引用
    function foo() {
      console. log( this. a );
    }
    var obj = {
      a: 2,
      foo: foo
    };
    obj. foo(); // 2
    ```  

    显式绑定：  
    call,apply,硬绑定(Function.prototype.bind)  
    new绑定：

    ```javascript
    function foo( a) {
      this. a = a;
    }
    var bar = new foo( 2);
    console. log( bar. a ); // 2
    ```  

3. 绑定优先级,判定规则

    new>显示绑定>隐式绑定>默认规则  

4. 绑定null 列外

    ```javascript
    function foo( a, b) { console. log( "a:" + a + ", b:" + b ); } // 把 数组“ 展开” 成 参数
    foo. apply( null, [2, 3] ); // a: 2, b: 3
    // 使用 bind(..) 进行 柯 里 化
    var bar = foo. bind( null, 2 );
    bar( 3 ); // a: 2, b: 3
    ```

    更安全的做法，无this的o

    ```javascript
    function foo( a, b) { console. log( "a:" + a + ", b:" + b ); } // 我们 的 DMZ 空 对象
    var ø = Object. create( null ); // 把 数组 展开 成 参数
    foo. apply( ø, [2, 3] ); // a: 2, b: 3
    // 使用 bind(..) 进行 柯 里 化
    var bar = foo. bind( ø, 2 );
    bar( 3 ); // a: 2, b: 3
    ```

5. 间接引用

    ```javascript
    //常见在赋值时发生
    function foo() {
      console. log( this. a );
    }
    var a = 2;
    var o = {
      a: 3, foo: foo
    };
    var p = { a: 4 };
    o. foo(); // 3
    (p. foo = o. foo)(); // 2
    ```

    赋值 表达式 p. foo = o. foo 的 返回 值 是 目标 函数 的 引用， 因此 调用 位置 是 foo() 而 不是 p. foo() 或者 o. foo()。 根据 我们 之前 说过 的， 这里 会 应用 默认 绑 定。

## Math

### .ceil

返回大于或等于一个给定数字的最小整数

```js
console.log(Math.ceil(7.004));
// expected output: 8
```

### .floor

返回小于或等于一个给定数字的最小整数

```js
console.log(Math.ceil(7.004));
// expected output: 7
```

### .max

### .min

返回最小值

Math.min([value1[,value2, ...]])  

### .pow

求幂

```js
(x,y)
//es6
x ** y
```

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

## 跨域

<https://segmentfault.com/a/1190000011145364>  
<https://www.zhihu.com/topic/19612046/top-answers>

***同源策略*** :

协议+端口号+域名要相同

1. Cookie、LocalStorage 和 IndexDB 无法读取  
2. DOM 和 Js对象无法获得  
3. AJAX 请求不能发送  

***方法*** :

### CORS

(Cross-Origin Resource Sharing) 跨域资源共享

<http://www.ruanyifeng.com/blog/2016/04/cors.html>

<https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS>

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

* 简单请求

只要同时满足以下两大条件，就属于简单请求。

**method:**

GET, HEAD, POST

**HTTP的头信息不超出以下几种字段:**

Content-Type:application/x-www-form-urlencoded , multipart/form-data ,  text/plain

Accept

Accept-Language

Content-Language

Last-Event-ID

**对于简单请求，浏览器自动加origin请求头**

```javascript
//js
Origin: http://api.bob.com

//server
Access-Control-Allow-Origin: * //或者值http://api.bob.com
Access-Control-Allow-Methods:'GET'
Access-Control-Allow-Credentials: true // cookie
Access-Control-Expose-Headers: FooBar // 暴露的返回头
Content-Type: text/html; charset=utf-8
```

**发送cookie**

CORS请求默认不发送Cookie和HTTP认证信息

```
//服务器配置:
Access-Control-Allow-Credentials: true
//js：
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。

* 非简单请求

method：不是简单请求中的一种  
Content-Type：不是简单请求中的一种  
浏览器先发送option， Preflighted requests请求

服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

```javascript
//请求：js
OPTIONS
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type
Origin: http://localhost:8080

//响应：server
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Content-Type: text/html
```

### JSONP

**JSONP只支持GET请求**

js 文件不受浏览器同源策略的影响，所以通过 Script 便签可以进行跨域的请求

- 前端

前端发送给后端一个方法名字。后端在数据包将返回数据包装为方法参数，与方法，一起返回。前端拿到返回结果后，会执行该函数。

```javascript

function jsonp(url, jsonpCallback, success) {
  let script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.type = "text/javascript";
  window[jsonpCallback] = function(data) {
    success && success(data);
  };
  document.body.appendChild(script);
}
jsonp(
  "http://xxx",
  "callback",
  function(value) {
    console.log(value);
  }
);
```

- 后端

```javascript
//返回content
onBack({"status": true, "user": "admin"})
```

- 缺点

它支持 GET 请求而不支持 POST 等其它类行的 HTTP 请求。  
它只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面或 iframe 之间进行数据通信的问题

### document.domain

该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。

只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域

### 代理

```sh
server{
    # 监听9099端口
    listen 9099;
    # 域名是localhost
    server_name localhost;
    #凡是localhost:9099/api这个样子的，都转发到真正的服务端地址http://localhost:9871
    location ^~ /api {
        proxy_pass http://localhost:9871;
    }
}
```

反向代理  
通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。

```sh
#proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;

    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```

### iframe form   待定

没有返回值
创建form，提交到后端地址 ， 添加到创建的iframe ，submit form

```javascript
const requestPost = ({url, data}) => {
  // 首先创建一个用来发送数据的iframe.
  const iframe = document.createElement('iframe')
  iframe.name = 'iframePost'
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  // 注册iframe的load事件处理程序,如果你需要在响应返回时执行一些操作的话.
  iframe.addEventListener('load', function () {
    console.log('post success')
  })

  const form = document.createElement('form')
  form.action = url
  // 在指定的iframe中执行form
  form.target = iframe.name
  form.method = 'post'

  const node = document.createElement('input')
  for (let name in data) {
    node.name = name
    node.value = data[name].toString()
    form.appendChild(node.cloneNode())
  }

  // 表单元素需要添加到主文档中.
  form.style.display = 'none'
  document.body.appendChild(form)
  form.submit()

  // 表单提交后,就可以删除这个表单,不影响下次的数据发送.
  document.body.removeChild(form)
}
// 使用方式
requestPost({
  url: 'http://localhost:9871/api/iframePost',
  data: {
    msg: 'helloIframePost'
  }
})
```

## Service worker

<https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API>

<https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers>

<https://zhuanlan.zhihu.com/p/20040372>

## 前端鉴权

鉴权主要分为四种：

- HTTP Basic Authentication (HTTP基本认证)
- session-cookie
- Token 验证(包括JWT,SSO)
- OAuth(开放授权)

我们普通网站常用的认证就是session-cookie的方式，用户向服务端发生请求，服务端会创建session并保存相关身份信息，并向客户端下发一个sessionId,大家如果用心的话，会发现跟JAVA交互的时候，浏览器会有一个JSESSION_ID，跟PHP交互的时候，会有一个PHPSESSION_ID;后面的每次请求，客户端都会自动带上这个cookie跟服务端通信。

实际上大家要明白每一种方式的作用；SSO主要用来做单点登录；OAuth主要用来做第三方网站授权；JWT就是一种便于扩展的跨域认证解决方案，通常会考察这个。

### JWT(JSON Web Token)

<http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html>

相比于session-cookie， 服务器就不保存任何 session 数据了，也就是说，服务器变成无状态了，从而比较容易实现扩展。

JWT 的三个部分依次：Header（头部）+ Payload（负载）+ Signature（签名）

Header 和 Payload 串型化的算法是 Base64URL。这个算法跟 Base64 算法基本类似，但有一些小的不同。

JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法。

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息Authorization字段里面。

### SSO （Single Sign On ）

单点登录

<https://juejin.im/post/5a002b536fb9a045132a1727>

### OAuth 2.0

<http://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html>

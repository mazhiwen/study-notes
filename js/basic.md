# javascript基础知识点

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


## in

如果指定的属性在指定的对象或其原型链中，则in 运算符返回true。

## 数据类型 7种

Boolean  
Null  
Undefined  
Number  
String  
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

## 深拷贝 浅拷贝

```javascript
//深拷贝
//1.JSON.stringify() JSON.parse()
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

## 内存泄漏

指由于疏忽或错误造成程序未能释放已经不再使用的内存的情况。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，失去了对该段内存的控制，因而造成了内存的浪费。  

检测:内存持续增多，存在内存泄漏；内存平稳，不存在内存泄漏

(https://segmentfault.com/a/1190000008901861)








## event

input  焦点keyup

body监听 keyup? 回车？


## cookie


## node编译js
babel




## 闭包

定义：当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域外执行  

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
个人总结return function 的妙用
 
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
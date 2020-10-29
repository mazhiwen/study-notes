# this

<https://juejin.im/post/6844903496253177863>

***

this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。

function 内才有 this

this 永远指向最后调用它的那个对象

this是在运行时进行绑定的，并不是在编写时绑定

this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。this指向函数在代码中被调用的位置，而不是声明位置

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。

this就是记录的其中一个属性，会在函数执行的过程中用到。

匿名函数的 this 永远指向 window

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

## this的用法：指向自身

```js
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

## 绑定规则  

- 默认绑定：

function声明引用默认指向全局对象 window  

```javascript
function foo() {
  console. log( this. a );
}
var a = 2;
foo(); // 2
```

- 隐式绑定：

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

- 显式绑定：  
call,apply,硬绑定(Function.prototype.bind)  
new绑定：

```javascript
function foo( a) {
  this. a = a;
}
var bar = new foo( 2);
console. log( bar. a ); // 2
```  

## 绑定优先级,判定规则

new>显示绑定>隐式绑定>默认规则

## 绑定null 列外

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

## 间接引用

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

## this指向的四种场景

### 1.作为对象的方法调用 : 指向对象本身

如果一个函数作为一个对象的方法来调用时，this 指向这个对象。

```js
obj={
  a:2,
  getA:function(){
    this.a
    // 2
  }
}
obj.getA();
```

### 2.作为普通函数调用 : 指向全局对象window

当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。

```js
// 浏览器端是window
function A(){
  this.a=2;
}
A();
```

### 3.构造器调用 new

如果函数调用前使用了 new 关键字, 则是调用了构造函数。

函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象

this有两种指向，取决于是否显式返回一个object {}

如果是返回一个object {}: this指向 返回的结果对象

如果不是返回一个object {}，this指向 构造函数对象

```js
// function 返回一个object {}
var MyClass = function(){
  this. name = 'sven';
  return { // 显 式 地 返回 一个 object {}
    name: 'anne'
  }
};
var obj = new MyClass();
alert ( obj. name );//anne


// function 不是返回一个object {}
var MyClass = function(){
  this. name = 'sven';
  return 'anne'
};
var obj = new MyClass();
alert ( obj. name );//sven

```

### 4.call apply bind

显式改变this指向

> 优先级: new构造器 > call ... > 方法调用 > 函数调用

## 匿名函数的 this 永远指向 window

```js
var a = 3;
var o = {
  a: 2;
  fn: function(){
    setTimeout(function(){
      console.log(this.a);
    });
  }
}

```

## 改变 this 的指向

- 使用 ES6 的箭头函数

箭头函数的 this 始终指向函数定义时的 this，而非执行时。

“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”。

- 在函数内部使用 _this = this

- 使用 apply、call、bind

- new 实例化一个对象

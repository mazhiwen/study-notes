# this

<https://juejin.im/post/6844903496253177863>

<https://juejin.cn/post/6844903651488563213#heading-0>

this 是执行上下文中的一个属性

this 永远指向最后调用它的那个对象

this是在运行时进行绑定的，并不是在编写时绑定。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。this指向函数在代码中被调用的位置，而不是声明位置

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。

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

this指向4种场景:

都是在function内

## 场景1.作为普通函数调用 : 指向全局对象window

当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。

```js
// 浏览器端是window
function A(){
  this.a=2;
}
A();
```

## 场景2.作为对象的方法调用 : 指向对象本身

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

## 场景3.构造器调用 new

如果函数调用前使用了 new 关键字, 则是调用了构造函数。

函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象

this有两种指向，取决于是否显式返回一个object {}:

### 如果是返回一个object {}

this指向 返回的结果对象

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
```

### 如果不是返回一个object {}

this指向 构造函数对象

```js
// function 不是返回一个object {}
var MyClass = function(){
  this. name = 'sven';
  return 'anne'
};
var obj = new MyClass();
alert ( obj. name );//sven

```

## 场景4.call apply bind

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

## 箭头函数

ES6的箭头函数

箭头函数 的 this 始终指向函数定义时的 this，而非执行时。

会阻止 apply或 call后续更改它。

“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”。

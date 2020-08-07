# this

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

## this的用法：指向自身

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

## this的规则

this 是在 运行时 进行 绑 定的， 并不 是在 编写 时 绑 定， 它的 上下文 取决于 函数 调用 时 的 各种 条件。 this 的 绑 定 和 函数 声明 的 位置 没有 任何 关系， 只 取决于 函数 的 调用 方式。 当 一个 函数 被 调用 时， 会 创建 一个 活动 记录（ 有时候 也称 为 执行 上下文）。 这个 记录 会 包含 函数 在哪里 被 调用（ 调用 栈）、 函数 的 调用 方法、 传入 的 参数 等 信息。 this 就是 记录 的 其中 一个 属性， 会在 函数 执行 的 过程中 用到。

### 调用位置

函数在代码中被调用的位置，而不是声明位置

### 绑定规则  

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

### 绑定优先级,判定规则

    new>显示绑定>隐式绑定>默认规则  

### 绑定null 列外

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

### 间接引用

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

## this指向问题的基本四种场景

```js
// 1. 作为对象的方法调用 ,指向对象本身
obj={
  a:2,
  getA:function(){
    this.a
    // 2
  }
}
obj.getA();

// 2. 作为普通函数调用 指向全局对象
// 浏览器端是window
function A(){
  this.a=2;
}
A();

// 3. 构造器调用 （function）
// this有两种指向，取决于是否显式返回一个object {}

// 如果是返回一个object {}:this指向返回的object {}
var MyClass = function(){
  this. name = 'sven';
  return { // 显 式 地 返回 一个 object {}
    name: 'anne'
  }
};
var obj = new MyClass();
alert ( obj. name );//anne

// 如果不是返回一个object {}，this指向myclass function
var MyClass = function(){
  this. name = 'sven';
  return 'anne'
};
var obj = new MyClass();
alert ( obj. name );//sven


// 4. Function.prototype.call Function.prototype.apply
// 显式改变this指向

```

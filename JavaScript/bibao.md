
## 闭包

<https://www.cnblogs.com/dolphinX/archive/2012/09/29/2708763.html>

定义：当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域外执行  

**结合内存管理，垃圾回收机制来了解**

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
  
> 可以手动把闭包变量设置=null，可以实现回收变量;  

没有常规执行foo的垃圾回收机制,  
foo内的作用域依然存在，可以在baz中调用,  
闭包阻止了垃圾回收  
回调函数也是闭包  
个人总结function包住变量 的妙用

**闭包与循环**

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

**闭包的作用：**

```js
// 1. 封装变量
var cache = {};
var mult = function(){
  var args = Array. prototype. join. call( arguments, ',' );
  if ( cache[ args ] ){
    return cache[ args ];
  }
  var a = 1;
  for ( var i = 0, l = arguments. length; i < l; i++ ){
    a = a * arguments[ i];
  }
  return cache[ args ] = a;
};
  alert ( mult( 1, 2, 3 ) ); // 输出： 6
  alert ( mult( 1, 2, 3 ) ); // 输出： 6

// 避免将cache变量和mult函数一起平行的暴露在全局作用域下
// 把cache变量封闭在mult函数内
// 可以优化为:
var mult = (function(){
  var cache = {};
  return function(){
    var args = Array. prototype. join. call( arguments, ',' );
    if ( args in cache ){
      return cache[ args ];
    }
    var a = 1;
    for ( var i = 0, l = arguments. length; i < l; i++ ){
      a = a * arguments[ i];
    }
    return cache[ args ] = a;
  }
})();



// 2.延续局部变量的寿命
var report = function( src ){
  var img = new Image();
  img. src = src;
};
report( 'http:// xxx. com/ getUserInfo' );
// 闭包优化后为：
// 保存了new 的img
var report = (function(){
  var imgs = [];
  return function( src ){
    var img = new Image();
    imgs. push( img );
    img. src = src;
  }
})();


```

**闭包和面向对象的关系**

  通常用面向对象思想能实现的功能，闭包也能实现。反之亦然。对象以方法的形式包含了过程，而闭包是在过程中以以环境的形式包含了数据。  
  在JavaScript语言的祖先Scheme语言中，甚至都没有提供面向对象的原生设计，但可以使用闭包来实现一个完整的面向对象系统。

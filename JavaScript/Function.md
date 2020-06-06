# function

- [function.length](#function.length)
- [arguments](#arguments)
- [匿名函数 立即执行函数 IIFE](#匿名函数(立即执行函数)(IIFE))
- [作用域安全的构造函数](#作用域安全的构造函数)
- [函数绑定](#函数绑定)
- [call apply](#call和apply)
- [bind](#bind)
- [高阶函数](#高阶函数)
- [函数柯里化](#函数柯里化)
- [惰性载入](#惰性载入)
- [函数节流](#函数节流)
- [分时函数](#分时函数)
- [偏函数](#偏函数)

***

## function.length

length 属性指明函数的形参个数。

```js
function func1() {}

function func2(a, b) {}

console.log(func1.length);
// expected output: 0

console.log(func2.length);
// expected output: 2
```

## arguments

```js
function test() {
  console.log(arguments);
}
test(1, 2);
```

## 匿名函数(立即执行函数)(IIFE)

```js
//function后面没有定义名称
//匿名函数调用
//调用一,必须要实现赋值
var fn = function (x, y) {
  return x + y;
}(2, 3);
//调用二
(function (x, y) {
  return x + y;
})(2, 3);
//自执行函数,第一个()将函数变成表达式，第二个()执行函数
//函数可以具名，匿名
//方法一，外层括号，可换成 +, - ,~ ,true 等
(
  function (param) {

  }(param) //可以传递参数
);
//方法二
(
  function () {

  }
)();
```

## 作用域安全的构造函数

```js
//不用new，直接调用构造函数时会改变this为window，以下修正
function Polygon(sides) {
  if (this instanceof Polygon) {
    this.sides = sides;
    this.getArea = function () {
      return 0;
    };
  } else {
    return new Polygon(sides);
  }
}
//通过 call 方式继承，会被破坏，因为会new ，子类失去父类私有属性
//以下 call + prototype继承可修正
function Rectangle(width, height) {
  Polygon.call(this, 2);
  this.width = width;
  this.height = height;
  this.getArea = function () {
    return this.width * this.height;
  };
}
Rectangle.prototype = new Polygon();
var rect = new Rectangle(5, 10);
```

## 函数绑定

```js
//this指向丢失
var handler = {
  message: "Event handled",
  handleClick: function (event) {
    alert(this.message);
  }
};
var btn = document.getElementById(" my- btn");
EventUtil.addHandler(btn, "click", handler.handleClick);
//闭包解决
EventUtil.addHandler(btn, "click", function (event) {
  handler.handleClick(event);
});
//bind函数
function bind(fn, context) {
  //创建闭包
  return function () {
    return fn.apply(context, arguments);
  };
}
//bind解决
EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler));
//es5 提供原生bind方法
EventUtil.addHandler(btn, "click", handler.handleClick.bind(handler));
```

## call和apply

语法是直接执行函数

call 和 apply是ES3定义的

区别仅是传入参数不同

用途：

  1. 改变this指向
  2. 实现支持Function.prototype.bind
  3. 借用其他对象的方法，可以实现继承

```js
//Function.prototype.call
// 返回调用有指定this值和参数的函数的结果。
//把fun内的this指向thisArg;
fun.call(thisArg, arg1, arg2, argn);
//call方法的作用和 apply() 方法类似，
// 只有一个区别，就是call()方法接受的是若干个参数的列表，
// 而apply()方法接受的是一个包含多个参数的数组。
//Function.prototype.apply
fun.apply(thisArg, [argsArray])
```

## bind

bind返回的是一个改变this的函数

```js
//语法: function.bind(thisArg[, arg1[, arg2[, ...]]])
var module = {
  x: 42,
  getX: function () {
    return this.x;
  }
}
var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined
var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```

## 高阶函数

**js满足高阶函数**  

是至少满足下列条件之一的函数：  

1. 函数可以作为参数被传递

2. 函数可以作为返回值输出  

```js
// 例如
Object.prototype.toString().call([1,2,3])
// 输出"[Object Array]"

```

**AOP**

AOP（ 面向 切面 编程） 的 主要 作用 是把 一些 跟 核心 业务 逻辑 模块 无关 的 功能 抽 离 出来， 这些 跟 业务 逻辑 无关 的 功能 通常 包括 日志 统计、 安全 控制、 异常 处理 等。 把这 些 功能 抽 离 出来 之后， 再通过“ 动态 织入” 的 方式 掺入 业务 逻辑 模块 中。 这样做 的 好处 首先 是 可以 保持 业务 逻辑 模块 的 纯净 和 高 内聚性， 其次 是 可以 很 方便 地 复 用 日志 统计 等 功能 模块。

实现一个***链式调用***

```js

Function. prototype. before = function( beforefn ){
  var __self = this; // 保存原函数的引用 ,this指向Function的实例function
  return function(){ // 返回包含了原函数和新函数的"代理"函数   ***[注释1]***
   beforefn. apply( this, arguments ); // this指向当前function

   return __self. apply( this, arguments ); // 执行 原函数
  }
};
Function. prototype. after = function( afterfn ){
  var __self = this;
  return function(){ //***[注释2]***
    var ret = __self. apply( this, arguments );
    afterfn. apply( this, arguments );
    return ret;
  }
};
var func = function(){
  console. log( 2 );
};
func = func
.before( function(){
  console. log( 1 );
})// 返回一个function ，即Function实例；； 这个例子中返回 ***[注释1]*** function
.after( function(){
  console. log( 3 );
}); // 返回一个function ，即Function实例；；这个例子中返回 ***[注释2]*** function

func();
// 输出1 2 3
```

**高阶函数的其他应用**

- currying 柯里化：

- 函数节流

- 分时函数

- 惰性加载函数  

## 函数柯里化

> 简单来说柯里化就是把一个多参函数转换成接受单参的一系列函数

下一个函数的参数是上一个函数的结果

且函数体内运行逻辑相同

一个函数 多个参数

内部函数 和 外部函数的 组合

currying又称部分求值。一个currying的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。  
每次进行数据push，最后一次性计算，返回

**基本实现逻辑:**

```js
function add(num1, num2) {
  return num1 + num2;
}
//柯里化
function curry(fn) {
  var args = Array.prototype.slice.call(arguments, 1); //外函数arguments
  //返回柯里化
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments); //内函数arguments
    var finalArgs = args.concat(innerArgs);
    return fn.apply(null, finalArgs);
  };
}
//应用以上
var curriedAdd = curry(add, 5); //参数为5的add柯里化
curriedAdd(3); //8
```

**实现**

```js

// 一个Array push 用法的小技巧
var args=[];
[].push.apply(args,arguments);


// 一个通用的currying 实现
var currying = function( fn ){
  var args = [];
  return function(){
    if ( arguments. length === 0 ){
      return fn. apply( this, args );
    }else{
      [].push. apply( args, arguments );
      return arguments. callee;
    }
  }
};
// 原cost是一个遍历执行数据操作的闭包function
var cost = (function(){
  var money = 0;
  return function(){
    for ( var i = 0, l = arguments. length; i < l; i++ ){
      money += arguments[ i ];
    }
    return money;
  }
})();
// 把一个函数通过一个函数转化为另一个函数
// 转化 成 currying 函数
// 转化为根据参数判断执行的currying函数
var cost = currying( cost );  
cost( 100 ); // 未 真正 求值
cost( 200 ); // 未 真正 求值
cost( 300 ); // 未 真正 求值
alert ( cost() ); // 求值 并 输出： 600
```

**立即执行函数 实现:**

```js
//另外一种思路
// countMoney为立即执行函数，返回的结果是另一个函数
const countMoney = (function () {
  let money = 0
  let args = [] //闭包参数
  return function loop(){
    if (arguments.length === 0) {
      for (let i = 0; i < args.length; i++) {
        money += args[i]
      }
      console.log(money);
      return money
    } else {
      // arguments 是类数组，应该用展开符展开才能push进去
      args.push(...arguments)
      return loop //闭包函数,返回递归
    }
  }
})()
// 注意：countMoney会立即执行上面，并且返回res 一个函数
// 执行countMoney(1)时，相当于执行res(1)
// 2018-01-01 存了1毛钱
countMoney(1)
// 2018-01-02 存了2毛钱
countMoney(2)
// 2018-01-03 存了3毛钱
countMoney(3)
// 2018-01-04 存了4毛钱
countMoney(4)
//一年以后
// 统计这笔巨额存款 输出结果为 10
console.log(countMoney())
// 你还可以装逼地进行花式统计，结果同样是10
countMoney(1)(2)(3)(4)()
```

**柯里化工具函数 实现**

```js
function currying(fn){
  var allArgs = [];
  return function next(){
    var args = [].slice.call(arguments);
    if(args.length > 0){
      allArgs = allArgs.concat(args);
      return next;
    }else{
      return fn.apply(null, allArgs);
    }
  }
}
var add = currying(function(){
  var sum = 0;
  for(var i = 0; i < arguments.length; i++){
    sum += arguments[i];
  }
  return sum;
});
```

**es6实现**

```js
let curry = (fn) => {
  if (fn.length <= 1) return fn;

  const generator = (args) => {
    return args.length === fn.length ?
    fn(...args)
    : arg => generator([...args, arg])
  };
  
  return generator([], fn.length);
};


let sum = (a, b, c) => a + b + c;
let curriedSum = curry(sum);
const res = curriedSum(1)(2)(3)
console.log(res); // 6
```

**uncurrying**

在 我们 的 预期 中， Array. prototype 上 的 方法 原本 只能 用来 操作 array 对象。 但 用 call 和 apply 可以 把 任意 对象 当作 this 传入 某个 方法， 这样一来， 方法 中 用到 this 的 地方 就 不再 局限于 原来 规定 的 对象，而是加以泛化并得到更广的适用性.

```js
// 给function添加uncurrying方法
Function.prototype.uncurrying = function () {
  // self也就是调用uncurrying的方法
  // 也就是Array.prototype.push
  var self = this;
  // uncurrying返回一个 执行调用uncurring函数 的函数
  return function () {
    console.log(arguments);
    // obj获取arguments的第一个参数
    var obj = Array.prototype.shift.call(arguments);
    // 对一个参数obj 执行self方法,参数是：arguments
    return self.apply(obj, arguments);
  };
};
//目的： 把Array.prototype.push转换为push常用方法
var push = Array.prototype.push.uncurrying();
(function () {
  push(arguments, 4);
  console.log(arguments);// 输出：[ 1, 2, 3, 4]
})(1, 2, 3);

```

实践:

```js
for (var i = 0, fn, ary = ['push', 'shift', 'forEach']; fn = ary[i++];) {
  Array[fn] = Array.prototype[fn].uncurrying();
};
var obj = {
  "length": 3,
  "0": 1,
  "1": 2,
  "2": 3
};
Array.push(obj, 4);
// 向 对象 中 添加 一个 元素
console.log(obj.length);
// 输出： 4
var first = Array.shift(obj);
// 截取 第一个 元素
console.log(first); // 输出： 1
console.log(obj); // 输出：{ 0: 2, 1: 3, 2: 4, length: 3}
Array.forEach(obj, function (i, n) {
  console.log(n); // 分别 输出： 0, 1, 2
});
```

## 惰性载入

某些逻辑只需要加载一次  
// 例如：事件嗅探工作  
// 不同浏览器的嗅探逻辑不一样,需要在不同浏览器做一个通用的嗅探事件  
// 实现:  
// 把嗅探if判断提前到代码加载的时候:  

**方案一：**  
缺点：嗅探函数始终会在最初加载，就算没有调用

```js
var addEvent = (function(){
  if(window.addEventListener){
    return function(elem,type,handler){
      elem.addEventListener(type,handler,false);
    }
  }
  if(window.attachEvent){
    return function(elem,type,handler){
      elem.attachEvent('on'+type,handler);
    }
  }
})()
```

**最终方案:**

真正实现惰性加载函数

```html

<html>
  <body>
    <div id="div1">点击我绑定</div>
    <script>
      var addEvent = function (elem,type,handler){
        if(window.addEventListener){
          addEvent = function(elem , type, handler){
            elem.addEventListener(type,handler,false);
          }
        }else if(window.attachEvent){
          addEvent = function(elem , type, handler){
            elem.attachEvent('on'+type,handler);
          }
        }
        addEvent(elem , type, handler);
      }
      //执行
      var div = document.getElementById('div1');
      addEvent(div,'click',function(){
        alert(1);
      });
      addEvent(div,'click',function(){
        alert(2);
      });
    </script>
  </body>
</html>
```

**其他实现**

```js
//惰性 载入 表示 函数 执行 的 分支 仅 会 发生 一次。
//方法一：重写
function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    //重写
    createXHR = function () {
      return new XMLHttpRequest();
    };
  } else {
    createXHR = function () {}
  }
}
//方法二：函数载入时就指定为正确的函数
//创建匿名 自执行的函数
var createXHR = (function () {
  if (typeof XMLHttpRequest != "undefined") {
    //返回正确函数
    return function () {
      return new XMLHttpRequest();
    };
  } else {
    return function () {};
  }
})();
```

## 函数节流

函数有可能被非常频繁地调用，而造成大的性能问题。比如：  
window.onresize  
mousemove  
上传进度

函数节流的原理:  
比如onresize，监听浏览器大小变化，console输出变化，1秒钟进行了10次。实际我们只需要2次或者3次。我们就可以按照时间段来忽略一些，比如确保500ms内打印一次，可以借助setTimeout来完成

函数截流代码实现:  

```js
// 把需要节流的目标执行函数，转换为节流函数
// 返回一个闭包形成的 带有私有状态的function
var throttle = function (fn,interval){
  var _self=fn,
    timer,
    firstTime = true;
  return function(){
    var args=arguments,
      _me=this;
    if(firstTime){
      _slef.apply(_me,args);
      return firstTime=false;
    }
    if(timer){
      return false;
    }
    timer = setTimeout(function(){
      clearTimeout(timer);
      timer=null;
      _slef.apply(_me,args);
    },interval||500);

  }
}
window.onresize = throttle(function(){
  console.log(1);
},500);
```

## 分时函数

```js
// 例如一次性给dom遍历挂载上千dom节点，可能会页面卡死
// 解决方案是：
// 如下timeChunk,把1秒钟挂载1000个节点，改为每200毫秒8个节点

var timeChunk =  function (ary,fn,count){
  // ary:需要操作的数据
  // fn : 实际操作函数
  // count: 每批操作的数据个数
  var obj,
    t;
  var len =  ary.length;
  var start =  function (){
    for (var i=0;i<Math.min(count||1,ary.length);i++){
      var obj = ary.shift();
      fn(obj);
    }
  }
  return function(){
    t = setInterval(function(){
      if(ary.length===0){
        return clearInterval(t);
      }
      start();
    },200);
  }
}

// 执行填充数据测试
// 执行测试代码
var ary = [];
for(var i=1;i<=1000;i++){
  ary.push(i);
}
var renderFriendList = timeChunk(ary,function(n){
  var div = document.createElement('div');
  div.innerHTML = n;
  document.body.appendChild(div);
},8);
renderFriendList();

```

## 偏函数

```js
// bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。
// 只要将这些参数（如果有的话）作为bind()的参数写在this后面。
// 当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，
// 传递给绑定函数的参数会跟在它们后面。
// fnBind = fn.bind(null,34);
// fnBind为绑定函数, fn为目标函数
function list() {
  return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
  return arg1 + arg2
}
var list1 = list(1, 2, 3); // [1, 2, 3]
var result1 = addArguments(1, 2); // 3
// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37);
// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37);
var list2 = leadingThirtysevenList();
// [37]
var list3 = leadingThirtysevenList(1, 2, 3);
// [37, 1, 2, 3]
var result2 = addThirtySeven(5);
// 37 + 5 = 42
var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42 ，第二个参数被忽略
```

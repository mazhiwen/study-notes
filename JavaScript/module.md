# 模块化

<https://juejin.im/post/5e3985396fb9a07cde64c489>
<https://juejin.im/post/5c17ad756fb9a049ff4e0a62>

## 传统的模块化开发方式

### 命名空间方案

问题: 数据不安全(外部可以直接修改模块内部的数据)

```js
var org = {};
org.CoolSite = {};
org.CoolSite.Utils = {};

org.CoolSite.Utils.each = function (arr) {
  // 实现代码
};
```

### IIFE模式：匿名函数自调用(闭包),引入依赖

实现: 将数据和行为封装到一个函数内部, 通过给window添加属性来向外暴露接口

```html
// index.html文件
<!-- 引入的js必须有一定顺序 -->
<script type="text/javascript" src="jquery-1.10.1.js"></script>
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
  myModule.foo()
</script>
```

```js
// module.js文件
(function(window, $) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
    $('body').css('background', 'red')
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar }
})(window, jQuery)

```

### 传统方式，引入多个script 的缺点

- 对依赖的引用是通过html脚本标记加载script的全局变量
- 依赖关系弱，开发人员需要知道依赖顺序
- 需要额外的工具来将一组脚本标记替换为一个标记以优化部署。

## 模块化好处

- 命名空间:避免命名冲突

- 可重用性

- 可维护性：修改

## CommonJS

同步加载；服务器端（node）；浏览器端，模块需要提前编译打包处理（browserify打包运行）。

require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象

### 特点

所有代码都运行在模块作用域，不会污染全局作用域。

模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

模块加载的顺序，按照其在代码中出现的顺序。

### 加载机制

CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;

console.log(counter);  // 3
incCounter();
console.log(counter); // 3
```

### 实现

```
module.exports = value 或者 exports.xxx = value

require(xxx)
```

```js
// 定义模块math.js
var basicNum = 0;
function add(a, b) {
  return a + b;
}
module.exports = { //在这里写上需要向外暴露的函数、变量
  add: add,
  basicNum: basicNum
}

// 引用自定义的模块时，参数包含路径，可省略.js
var math = require('./math');
math.add(2, 5);

// 引用核心模块时，不需要带路径
var http = require('http');
http.createService(...).listen(3000);
```

## AMD

异步加载 ; 依赖前置,提前执行

require.js：异步方式加载模块。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

require.js在申明依赖的模块时会在第一之间加载并执行模块内的代码

```js
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) {
    // 等于在最前面声明并初始化了要用到的所有模块
    if (false) {
      // 即便没用到某个模块 b，但 b 还是提前执行了
      b.foo()
    }
});
```

用require.config()指定引用路径等，用define()定义模块，用require()加载模块。

```js
/** 网页中引入require.js及main.js **/
<script src="js/require.js" data-main="js/main"></script>

// 定义一个依赖underscore.js的模块
define(['underscore'],function(_){
  var classify = function(list){
    _.countBy(list,function(num){
      return num > 30 ? 'old' : 'young';
    })
  };
  return {
    classify :classify
  };
})
/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});
// 执行基本操作
require(["jquery","underscore"],function($,_){
  // some code here
});
```

## CMD

异步加载; 懒执行,依赖就近,延迟执行

sea.js:

```js
/** CMD写法 **/
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});
```

## ES6

需要预编译。import 是预先解析、预先加载的，不像 RequireJS 等是执行到点了再发一个请求。无法实现条件加载

浏览器和服务器通用的模块解决方案。其模块功能主要由两个命令构成：export和import ， export default

声明式而非命令式，或者说 import 是声明语句 Declaration 而非表达式 Statement，在 ES Module 中无法使用 import 声明带变量的依赖、或者动态引入依赖。

浏览器端使用babel将es6编译为es5，或者browserify编译

### es6与commonjs区别

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

### es6相对于amd cmd的好处

- 静态 import 能确保被编译成变量引用：这些引用在当前执行环境运行时能被解析器（通过 JIT 编译 polymorphic inline cache）优化，执行更有效率

- 静态 export 能让变量检测更准确：在 JSHint、ESLint 等代码检测工具中，变量是否定义是个非常受欢迎的功能，而静态 export 能让这一检测更具准确性

- 更完备的循环依赖处理：在 Node.js 等已有的 CommonJS 实现中，循环依赖是通过传递未完成的 exports 对象解决的，对于直接引用 exports.foo 或者父模块覆盖 module.exports 的情况，传统方式无从解决，而因为 ES Module 传递的是引用，便不会有这些问题

- 其他还有对未来可能新增的标准（宏、类型系统等）更兼容等。

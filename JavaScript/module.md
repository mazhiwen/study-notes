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

同步加载

Node.js是commonJS规范的主要实践者

webpck也是commonjs规范

有四个重要的环境变量为模块化的实现提供支持：module、exports、require、global

服务器端（node）；浏览器端，模块需要提前编译打包处理（browserify打包运行）。

require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象

所有代码都运行在模块作用域，不会污染全局作用域。

缺点：同步的模块加载方式不适合在浏览器环境中，同步意味着阻塞加载，浏览器资源是异步加载的。不能非阻塞的并行加载多个模块

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

### 加载机制

模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

模块加载的顺序，按照其在代码中出现的顺序。

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

### require机制

```
当 Node 遇到 require(X) 时，按下面的顺序处理。

（1）如果 X 是内置模块（比如 require('http')）
　　a. 返回该模块。
　　b. 不再继续执行。

（2）如果 X 以 "./" 或者 "/" 或者 "../" 开头
　　a. 根据 X 所在的父模块，确定 X 的绝对路径。
　　b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
  X
  X.js
  X.json
  X.node

　　c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
  X/package.json（main字段）
  X/index.js
  X/index.json
  X/index.node

（3）如果 X 不带路径
　　a. 根据 X 所在的父模块，确定 X 可能的安装目录。
　　b. 依次在每个目录中，将 X 当成文件名或目录名加载。

（4）抛出 "not found"
```

## AMD

异步加载

对于依赖的模块，AMD推崇依赖前置，提前执行。也就是说，在define方法里传入的依赖模块(数组)，会在一开始就下载并执行。

require.js：异步方式加载模块。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

require.js在申明依赖的模块时会在第一之间加载并执行模块内的代码

适合在浏览器环境中异步加载模块

可以并行加载多个模块

### 语法

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

### requireJS 的核心原理是什么

require.js 的核心原理是通过动态创建 script 脚本来异步引入模块，然后对每个脚本的 load 事件进行监听，如果每个脚本都加载完成了，再调用回调函数。

## CMD

异步加载;

懒执行

对于依赖的模块，CMD推崇依赖就近，延迟执行。也就是说，只有到require时依赖模块才执行。

sea.js:

```js
/** CMD写法 **/
//a.js
/*
* define 接受 factory 参数，factory 可以是一个函数，也可以是一个对象或字符串，
* factory 为对象、字符串时，表示模块的接口就是该对象、字符串。
* define 也可以接受两个以上参数。字符串 id 表示模块标识，数组 deps 是模块依赖.
*/
define(function(require, exports, module) {
  var $ = require('jquery');

  exports.setColor = function() {
    $('body').css('color','#333');
  };
});

//b.js
//数组中声明需要加载的模块，可以是模块名、js文件路径
seajs.use(['a'], function(a) {
  $('#el').click(a.setColor);
});

```

## ES6 Module

需要预编译。import 是预先解析、预先加载的，不像 RequireJS 等是执行到点了再发一个请求。无法实现条件加载

浏览器和服务器通用的模块解决方案。其模块功能主要由两个命令构成：export和import ， export default

声明式而非命令式，或者说 import 是声明语句 Declaration 而非表达式 Statement，在 ES Module 中无法使用 import 声明带变量的依赖、或者动态引入依赖。

浏览器端使用babel将es6编译为es5，或者browserify编译

`import export default`

```javascript
// 正常写法:
// export
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName() {...}
export class ClassName {...}
// import
import {firstName, lastName, year} from
import { lastName as surname } from
import * as name from//name.firstName name.lastName
```

```javascript
//default写法 默认写法
// export
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export default class {}

// 不能使用var，let或const用于导出默认值export default。
//import
import customName from
```

## es6 module 对比 CommonJS 模块、AMD、CMD

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

CommonJS 模块就是对象，即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

## es6 相对于 amd cmd的好处

- 静态 import 能确保被编译成变量引用：这些引用在当前执行环境运行时能被解析器（通过 JIT 编译 polymorphic inline cache）优化，执行更有效率

- 静态 export 能让变量检测更准确：在 JSHint、ESLint 等代码检测工具中，变量是否定义是个非常受欢迎的功能，而静态 export 能让这一检测更具准确性

- 更完备的循环依赖处理：在 Node.js 等已有的 CommonJS 实现中，循环依赖是通过传递未完成的 exports 对象解决的，对于直接引用 exports.foo 或者父模块覆盖 module.exports 的情况，传统方式无从解决，而因为 ES Module 传递的是引用，便不会有这些问题

- 其他还有对未来可能新增的标准（宏、类型系统等）更兼容等。

## amd 对比 cmd

（1）第一个方面是在模块定义时对依赖的处理不同。AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块。而 CMD 推崇 就近依赖，只有在用到某个模块的时候再去 require。

（2）第二个方面是对依赖模块的执行时机处理不同。首先 AMD 和 CMD 对于模块的加载方式都是异步加载，不过它们的区别在于 模块的执行时机，AMD 在依赖模块加载完成后就直接执行依赖模块，依赖模块的执行顺序和我们书写的顺序不一定一致。而 CMD 在依赖模块加载完成后并不执行，只是下载而已，等到所有的依赖模块都加载好后，进入回调函数逻辑，遇到 require 语句 的时候才执行对应的模块，这样模块的执行顺序就和我们书写的顺序保持一致了。

## 几种模块化对比点

差异点：

输出值类型

加载时机：运行时，编译时

加载方式：同步加载，异步并行加载

模块执行时机，顺序

## webpack

webpack中将静态资源文件称之为模块。

webpack是一个module bundler(模块打包工具)，其可以兼容多种js书写规范，且可以处理模块间的依赖关系，具有更强大的js模块化的功能。Webpack对它们进行统 一的管理以及打包发布

```
1. 对 CommonJS 、 AMD 、ES6的语法做了兼容
2. 对js、css、图片等资源文件都支持打包
3. 串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对CoffeeScript、ES6的支持
4. 有独立的配置文件webpack.config.js
5. 可以将代码切割成不同的chunk，实现按需加载，降低了初始化时间
6. 支持 SourceUrls 和 SourceMaps，易于调试
7. 具有强大的Plugin接口，大多是内部插件，使用起来比较灵活
8. webpack 使用异步 IO 并具有多级缓存。这使得 webpack 很快且在增量编译上更加快
```

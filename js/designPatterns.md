

相关书籍:

 Javascript设计模式与开发实践  
 书籍相关的url：https://github.com/lukehoban/es6features#symbols




## 核心纪要

- 修改代码总是危险的，修改的地方越多，程序出错的可能性就越大，


## 基本知识

### 面向对象

#### 多态

- javascript是动态类型语言

- 同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。

- 多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与“可能改变的事物”分离开来。


- 静态 类型 的 面向 对象 语言 通常 被 设计 为 可以 **向上转型** 

- 多 态 的 思想 实际上 是把“ 做 什么” 和“ 谁 去做” 分离 开来， 要 实现 这一点， 归根结底 先要 消除 类型 之间 的 耦合 关系。

- 多 态 的 最 根本 好处 在于， 你 不必 再向 对象 询问“ 你是 什么 类型” 而后 根据 得到 的 答案 调用 对象 的 某个 行为—— 你 只管 调用 该 行为 就是 了， 其他 的 一切 多 态 机制 都会 为你 安排 妥当。  
----Martin Fowler 《重构：改善既有的代码设计》

-  多 态 最 根本 的 作用 就是 通过 把 过程 化 的 条件 分支 语句 转化 为 对象 的 多 态 性， 从而 消除 这些 条件 分支 语句。

- 面向对象相关思想: 通过 对 封装、 继承、 多 态、 组合 等 技术 的 反复 使用， 提炼 出 一些 可 重复 使用 的 面向 对象 设计 技巧。 而 多 态 在其中 又是 重 中 之 重， 绝大部分 设计 模式 的 实现 都 离不开 多 态 性的 思想。


#### 封装

- 封装 的 目的 是将 信息 隐藏。 一般而言， 我们 讨论 的 封装 是 封装 数据 和 封装 实现。  更 广义 的 封装: 不仅 包括 封装 数据 和 封装 实现， 还包括 封装 类型 和 封装 变化。

- 封装数据：私有数据，公有方法
方式：闭包方式 ， Symbol


#### 原型设计模式（js）

- js是基于原型的继承 区别与 类和对象 的面向对象系统；  
ES5 Object.creat(),是实现clone，新的对象基于对象去clone；   
JavaScript基于原型的面向对象系统参考了Self语言和Smalltalk语言；  
基于原型链的委托机制就是原型继承的本质。

- 原型编程范型的基本规则:  
所有 的 数据 都是 对象。  
要得 到 一个 对象， 不是 通过 实例 化 类， 而是 找到 一个 对象 作为 原型 并 克隆 它。  
对象 会 记住 它的 原型。  
 如果 对象 无法 响应 某个 请求， 它 会把 这个 请求 委托 给 它自己 的 原型。

- 经测试 
```js
Object.__proto__ === Function.__proto__
// true
```

- js中的原型实现：  
从Object.prototype克隆


- JavaScript 的 函数 既可以 作为 普通 函数 被 调用， 也可以 作为 构造 器（new） 被 调用。  

```js
// 执行下面 可以让obj的原型指向Constructor.prototype原型，
// 而不是本来的Object.prototype
obj.__ proto__ = Constructor.prototype;



// js常用的原型继承
var obj={
  name:'a'
}
var A=function(){

}
A.prototype=Obj;

var a= new A();
a.name;
// 例子中a.name的查找过程
// a属性没有 -> a.__proto__记录有原型指向A.prototype -> A.prototype被设置为obj -> obj
// 如果没找到会继续查找
// -> Object.prototype -> 找不到就是返回undefined

```

- ES6的class也是基于原型链实现的


### this

this指向问题的基本四种场景
```js
// 1. 作为对象的方法调用 ,指向对象本身
obj={
  a:2,
  getA:function(){
    this.a
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

### call apply

- call 和 apply是ES3定义的
- 区别仅是传入参数不同
- 用途：
1. 改变this指向
2. 实现支持Function.prototype.bind
3. 借用其他对象的方法，可以实现继承



### 闭包

- 闭包的作用：

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

- 闭包和面向对象的关系，通常用面向对象思想能实现的功能，闭包也能实现。反之亦然。对象以方法的形式包含了过程，而闭包是在过程中以以环境的形式包含了数据。  
在JavaScript语言的祖先Scheme语言中，甚至都没有提供面向对象的原生设计，但可以使用闭包来实现一个完整的面向对象系统。

- 闭包与内存管理:可以手动把闭包变量设置=null，可以实现回收变量;  


### 高阶函数

#### js满足高阶函数  
是至少满足下列条件之一的函数：  
1. 函数可以作为参数被传递

2. 函数可以作为返回值输出  

```js
// 例如
Object.prototype.toString().call([1,2,3]) 
// 输出"[Object Array]"

```


#### AOP:  

AOP（ 面向 切面 编程） 的 主要 作用 是把 一些 跟 核心 业务 逻辑 模块 无关 的 功能 抽 离 出来， 这些 跟 业务 逻辑 无关 的 功能 通常 包括 日志 统计、 安全 控制、 异常 处理 等。 把这 些 功能 抽 离 出来 之后， 再通过“ 动态 织入” 的 方式 掺入 业务 逻辑 模块 中。 这样做 的 好处 首先 是 可以 保持 业务 逻辑 模块 的 纯净 和 高 内聚性， 其次 是 可以 很 方便 地 复 用 日志 统计 等 功能 模块。



- 实现一个**链式调用**
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


#### 高阶函数的其他应用

1. currying 柯里化：

currying又称部分求值。一个currying的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。  
每次进行数据push，最后一次性计算，返回


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

2. uncurrying

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


- 实践

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

3. 函数节流


- 函数有可能被非常频繁地调用，而造成大的性能问题。比如：  
window.onresize  
mousemove  
上传进度

- 函数节流的原理:  
比如onresize，监听浏览器大小变化，console输出变化，1秒钟进行了10次。实际我们只需要2次或者3次。我们就可以按照时间段来忽略一些，比如确保500ms内打印一次，可以借助setTimeout来完成

- 函数截流代码实现:  

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


4. 分时函数

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

5. 惰性加载函数  

某些逻辑只需要加载一次  
// 例如：事件嗅探工作  
// 不同浏览器的嗅探逻辑不一样,需要在不同浏览器做一个通用的嗅探事件  
// 实现:  
// 把嗅探if判断提前到代码加载的时候:  

- 方案一：  
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
- 最终方案:  
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

## 设计模式

### 单例模式

定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点.  
比如线程池，全局缓存，浏览器中的Window对象。

> function内部this,并赋值function一个变量，可以实现私有变量。prototype又可以操作私有变量.


```js
// 实现一
var Singleton = function (name){
  this.name=name;
  this.instance = null;
}
Singleton.prototype.getName=function(){
  alert(this.name);
}
Singleton.getInstance = function(name){
  if(!this.instance){
    this.instance = new Singleton(name);
  }
  return this.instance;
}
var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
// a === b


// 实现二
var Singleton = function (name){
  this.name=name;
}
Singleton.prototype.getName=function(){
  alert(this.name);
}
Singleton.getInstance = (function(){
  var instance = null ;
  return function(name){
    if(!instance){
      instance = new Singleton(name);
    }
    return instance;
  }
})();
var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
// a === b



//实现三 透明的单例模式
var CreateDiv = (function(){
  var instance;
  var CreateDiv = function(html){
    if(instance){
      return instance;
    }
    this.html=html;
    this.init();
    return instance = this;
  }
  CreateDiv.prototype.init=function(){
    var div=document.createElement('div');
    div.innerHTML=this.html;
    document.body.appendChild(div);
  }
  return CreateDiv;
})();
var a = new CreateDiv('sven1');
var b = new CreateDiv('sven2');
// a === b


// 实现四 用代理实现单例模式
// 原始函数:需要被代理转换单例的
var CreateDiv = function(html){
  this.html = html ;
  this.init();
}
CreateDiv.prototype.init = function(){
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
}
// 代理函数
// 不影响原始函数扩展为非单例，
// 即把单例转换逻辑抽离出来
var ProxySingletonCreateDiv = (function (){
  var instance;
  return function(html){
    if(!instance){
      instance = new CreateDiv(html);
    }
    return instance;
  }
})();
var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
// a === b

```


单例在js实现的问题:  

- 全局变量不是单例模式，但在js中，我们经常会这么做
- 全局变量会造成命名空间污染
- js的创造者是Brendan Eich ， 认为全局变量是js设计上的失误
- 解决全局变量污染:  
  1.命名空间  
  2.使用闭包封装私有变量
```js
var user = (function(){
  var _name = 'sven',
    _age=29;
  return {
    getUserInfo:function(){
      return _name + '-' + _age;
    }
  }  
}
)()
```





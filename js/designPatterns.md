

相关书籍:

 Javascript设计模式与开发实践  
 书籍相关的url：https://github.com/lukehoban/es6features#symbols




## **核心纪要**

- 修改代码总是危险的，修改的地方越多，程序出错的可能性就越大，


## **基本知识**

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

## **设计模式**

1. ### **单例模式**

定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点.  
比如线程池，全局缓存，浏览器中的Window对象。

> function内部this,并赋值function一个变量，可以实现私有变量。prototype又可以操作私有变量.

#### 实现一
```js

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
```

#### 实现二
```js
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
```


#### 实现三 透明的单例模式
```js
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
```

#### 实现四 用代理实现单例模式
```js
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


#### 单例在js实现的问题:  

全局变量不是单例模式，但在js中，我们经常会这么做  
全局变量会造成命名空间污染  
js的创造者是Brendan Eich ， 认为全局变量是js设计上的失误  
解决全局变量污染:  
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

#### 惰性单例
在需要的时候才创建对象实例。
```js
// 实现思路
var vreateFn = (function(){
  var div;
  return function(){
    if(!div){
      div=;
    }
    return div;
  }
})();
vreateFn();
```

#### 通用的惰性单例

- 单一职责原则：把不同职责的功能方法分离开来。
```js
// 普通函数转单例 工厂方法:
var getSingle = function(fn){
  var result;
  return function(){
    return result || (result = fn.apply(this,arguments));
  }
}

// 被转换的函数，需要return 一个result，才能被工厂方法记录
// 被转换函数的执行结果是返回一个 实例
// 例如:
var createLoginLayer =function(){
  var div= ````;
    //```div操作
  return div;
}
```


2. ### **策略模式**

- 定义:定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换。

- 将不变的部分和变化的部分隔开是每个设计模式的主题

- 一个基于策略模式的程序至少有两部分:  
 1.策略类:封装具体算法，负责具体计算 ;  
 2.环境类:接收客户请求，把请求委托给策略类

- 实现计算不同策略下的年终奖
```js
// 策略
var strategies = {
  "S":function(salary){
    return salary*4;
  },
  "A":function(salary){
    return salary*3;
  },
  "B":function(salary){
    return salary*2;
  },
}
// 环境
var calculateBonus = function(level,salary){
  return strategies[level](salary);
}

```

- 策略模式的优点:  

1.策略模式利用组合，委托和多态等技术和思想，可以有效避免多重条件选择语句  
2.提供了对开放-封闭原则的完美支持，算法封装在独立的strategy中。使得他们易于切换，理解，扩展。  
3.策略模式中的算法，可以复用在系统其他地方。避免重复。




3. ### **代理模式**

#### 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。  
不用代理：客户-》本体  
用代理: 客户 -》代理 -》本体 

#### 保护代理 和 虚拟代理  
保护代理用于控制不同权限的对象对目标对象的访问，代理者帮本体处理事务，js中不容易实现  
虚拟代理比较常见，是代理者帮客户处理事务

#### 虚拟代理实现图片预加载

```js
var myImage = (function(){
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc:function(src){
      imgNode.src=src;
    }
  }
})();

var proxyImage=(function(){
  var img = new Image();
  img.onload = function(){
    myImage.setSrc(this.src);
  }
  return {
    setSrc : function(){
      myImage.setSrc('file:// /C:/Users/svenzeng/Desk/load.gif');
      img.src=src;
    }    
  }
})();
```

#### 代理的意义

> 单一职责原则（一个面向对象的设计原则）：
就一个类而言，应该只有一个引起它变化的原因，如果一个对象承担了多项职责，就意味着这个对象将变的巨大，引起它变化的原因可能有多个。鼓励将行为分布到细粒度的对象之中。如果一个对象职责过多，职责都耦合到一起，会导致脆弱，低内聚。

> 例如MyImage是设置图片功能，通过代理，我们给系统添加了新的经过MyImage的行为。符合开放-封闭原则。设置图片 和 预加载两个功能被隔离在两个对象。各自变化而不影响对方。

#### 代理和本体接口具有一致性

#### 虚拟代理实现合并HTTP请求

```js
// 多个checkbox 每点一个发送到服务器
// 实现点击后 间隔2秒 一次性发送
var synchronousFile = function(id){
  console.log('开始同步'+id);
}
var proxySynchronousFile = (function(){
  var cache = [],//保存一段时间内需要同步的id
    timer;//定时器
  return function(id){
    cache.push(id);
    if(timer){
      return;
    }
    timer = setTimeout(function(){
      synchronousFile(cache.join(','));
      clearTimeout(timer);
      timer=null;
    },2000);
  }
  
})();

// 遍历给checkbox绑定
// proxySynchronousFile事件

```

#### 虚拟代理与惰性加载

场景：真正的miniConsole可能上千行代码，加载慢。  
我们加载前先实现一个代理的miniConsole，并存储console数据。  
此时，不影响系统正常使用miniConsole的API  
再执行，加载miniConsole.js,加载完后对存储的console数据，执行真正的miniConsole

```js
// 初始化，并没有真正加载miniConsole
var cache = [];
var miniConsole = {
  log: function(){
    var args = arguments;
    cache.push(function(){
      return miniConsole.log.apply();
    });
  }
}
// 按键呼出真正的miniConsole
var handler = function (ev){
  if(ev.keyCode === 113){
    var script = document.createElement('script');
    script.onload = function(){
      for(var i = 0,fn;fn = cache[ i++ ];){
        fn();
      }
    }
    script.src = 'miniConsole.js';
    document.getElementByTagName('head')[0].appendChild(script);
    document.body.removeEventListener('keydown',handler);
  }
}
document.body.addEventListener('keydown',handler,false);
// miniConsole.js代码
miniConsole = {
  log:function(){
    // 执行真正代码
  }
}

```

#### 缓存代理

> 缓存代理可以给开销大的运算结果提供暂时的存储，在下次运算时，如果传递参数和之前一致，则可以直接返回存储的运算结果

ajax异步请求数据也可以做缓存代理


#### 用高阶函数动态创建代理

做一个用于创建缓存代理的工厂函数，动态传入计算方法，就可以为计算方法创建缓存代理。

```js
// 计算乘积
var mult = function(){

}


// 创建缓存代理的工厂函数
var createProxyFactory = function(fn){
  var cache = {};
  return function(){
    var args = Array.prototype.join.call(arguments,',');
    if(args in cache){
      return cache[args];
    }
    return cache[args] = fn.apply(this,arguments);
  }
}

var proxyMult = createProxyFactory( mult ),

```

4. ### **迭代器模式**

> 提供一种方法顺序访问一个集合对象中的各个元素，而不需要暴露对象内部显示

#### 内部迭代器,外部迭代器

- 内部迭代器

```js
each(data,function(value,index){

})
```

- 外部迭代器

> 外部迭代器必须显式地请求迭代下一个元素。

> 外部迭代器: 外部迭代器增加了一些调用的复杂度，也增强了迭代器的灵活性，我们可以手工控制迭代的过程或者顺序。

```js
var Iterator = function(obj){
  var current = 0;
  var next = function(){
    current += 1;
  };
  var isDone = function() {
    return current >= obj.length;
  };
  var getCurrItem = function() {
    return obj[current];
  };
  return {
    next : next,
    isDone : isDone,
    getCurrItem : getCurrItem,
    length: obj.length
  }

```

#### 倒序迭代器

#### 终止迭代器

```js
for 循环data{
  if callback(data[i]) === false{
    break;
  }
}
```

5. ### **发布-订阅模式 [观察者模式]**

> 定义对象间的一种一对多的依赖关系，当一个对象状态改变时，所有依赖它的对象都将得到通知。

> 发布者和订阅者之间松耦合是优点

#### 自定义事件

如何一步步实现发布-订阅模式:  
- 首先确定谁当发布者
- 给发布者添加一个缓存列表，存放回调函数，以便通知订阅者
- 发布消息的时候，发布者遍历缓存列表，依次触发存放的订阅着回调函数

```js
// 示例
// 示例可以增加扩展功能，订阅和监听固定key
var salesOffices = {};
salesOffices.clientList = [];
salesOffices.listen = function(fn){
  this.clientList.push(fn);
}
salesOffices.trigger = function(){
  for(var i = 0,fn;fn = this.clientList[ i++ ];){
    fn.apply(this,arguments);
  }
}
```

#### 通用实现 封装发布-订阅功能

```js
// 示例
var event = {
  clientList:[],
  listen:function(key,fn){
    if( !this.clientList[ key ] ) {
      this.clientList[ key ] = [];
    }
    this.clientList[ key ].push( fn ); 
  },
  trigger:function(){
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[ key ];
    if ( !fns || fns.length === 0) {
      return false;
    }
    for (var i = 0,fn; fn = fns [ i++ ]; ){
      fn.apply(this,arguments);
    }
  }
} 
var installEvent = function( obj ) {
  for( var i in event) {
    obj[i] = event[i];
  }
}
// 应用
var salesOffice = {};
installEvent(salesOffice);
salesOffice.listen('key1',function(price){
})
salesOffice.listen('key2',function(price){
})
salesOffice.trigger('key1',22)
```

#### 取消订阅

> 此处有一个判断funtion是否相等的技巧 

```js
event.remove = function(key,fn){
  // 判断fns[i] = fn ?
  var fns = this.clientList[key];
  if(!fns){
    return false;
  }
  if(!fn){
    fns && ( fns.length = 0 );
  }else{
    for (var l = fns.length - 1; l >= 0 ; l--){
      var _fn = fns [ l ] ;
      if(_fn === fn){
        fns.splice(1,1);
      }
    }
  }
}
```

#### 应用例子  : 登录

登陆模块，登陆成功后，其他如header，nav，消息列表，购物车，可能都要用到登录返回的信息。  
但是ajax什么时候返回，我们并不知道，是异步的。  
用以下方法实现会产生强耦合：
```js
login.succ(function(data){
  header.setAvatar(data.avatar);
  nav.setAvatar(data.avatar);
  message.refresh();
  cart.refresh();
})

```

*这种实现在不同模块之间，形成强耦合，不利于维护*

> 发布-订阅模式可以应用在对应的逻辑场景中，应用场景可以自己去发掘

```js
// 改善后
$.ajax('',function(data){
  login.trigger('loginSucc',data);
})
// 各模块监听 登录成功
// header模块
var header = (function(){
  login.listen = ('loginSucc',function(data){
    header.setAvatar(data.avatar);
  });
  return {
    setAvatar : function(data){
      console.log('设置header模块头像');
    }
  }
}())
// nav模块
var nav = (function(){
  login.listen = ('loginSucc',function(data){
    header.setAvatar(data.avatar);
  });
  return {
    setAvatar : function(data){
      console.log('设置nav模块头像');
    }
  }
}())
```

#### 全局的发布-订阅

如：Event作为一个类似“中介者”的角色，把订阅者和发布者联系起来。

```js
var Event = (function(){
  var clientList = [],
      listen,
      trigger,
      remove;
  listen = function(key,fn){

  };
  trigger = function(){

  };
  remove = function(key,fn){

  };
  return {
    listen,
    trigger,
    remove
  }
}())

Event.listen('key',function(){
});
Event.trigger('key',2000);

```

#### 模块间通信

> 上述的全局Event对象,实现的发布-订阅模式。我们利用它可以在两个封装良好的模块中进行通信，这两个模块可以完全不知道对方的存在。就如同，有了中介公司后，我们不再需要知道房子开售的消息来自哪个售楼处。

#### 发布-订阅的顺序

> 前面场景中，我们多是，先订阅，后发布。但在有些场景中，我们需要先发布，后订阅。例如：在某些惰性加载的模块，可能有些模块还没加载订阅，发布可能执行更快。

> 实现: 建立一个存放离线事件的堆栈，当事件发布的时候，如果此时还没有订阅者来订阅这个事件，我们暂时把发布事件的动作包裹在一个函数里。等到有对象来订阅此事件的时候，遍历堆栈并执行这些包装函数。*这些离线*事件的生命周期只有一次，只能执行一次。

#### 全局事件的命名冲突  【命名空间】

```js
// 继续优化实现 订阅-发布模式
var Event = (function(){
  var global = this,
      Event,
      _default = 'default';
  Event = function(){
    var _listen,
        _trigger,
        _remove,
        _slice = Array.prototype.slice,
        _shift = Array.prototype.shift,
        _unshift = Array.prototype.unshift,
        namespaceCache = {},
        _create,
        find,
        each = function(ary,fn){
          var ret;
          for(var i = 0,l = ary.length; i < l; i++ ){
            var n = ary[i];
            ret = fn.call(n, i, n);
          }
          return ret;
        };
        _listen = function( key, fn, cache){
          if( !cache[ key ] ){
            cache[ key ] = [];
          }
          cache[ key ].push(fn);
        };
        _remove = function( key, cache, fn){
          if( cache[ key ] ){
            if(fn){
              for(var i = cache[ key ].length; i >= 0; i--){
                if( cache[ key ][i] === fn){
                  cache[ key ].splice(i,1);
                }
              }
            }else{
              cache[ key ] = [];
            }
          }
        };
        _trigger = function(){
          var cache = _shift.call(arguments),
              key = _shift.call(arguments),
              args = arguments,
              _self = this,
              ret,
              stack = cache[ key ];
          if( !stack || !stack.length ){
            return;
          }
          return each( stack, function(){
            return this.apply( _self, args);
          })
        };
        _create = function(namespace){
          var namespace = namespace || _default;
          var cache = {},
              offlineStack = [],
              ret = {
                listen: function(key, fn, last){
                  _listen(key, fn, cache);
                  if(offlineStack === null){
                    return;
                  }
                  if(last === 'last'){
                    offlineStack.length && offlineStack.pop()();
                  }else{
                    each(offlineStack, function(){
                      this();
                    });
                  }
                  offlineStack = null;
                },
                one: function(key, fn, last){
                  _remove( key, cache);
                  this.listen(key, fn, last);
                },
                remove: function(key, fn){
                  _remove( key, cache, fn);
                },
                trigger: function(){
                  var fn,
                      args,
                      _self = this;
                  _unshift.call(arguments, cache);
                  args = arguments;
                  fn = function(){
                    return _trigger.apply( _self, args);
                  };
                  if(offlineStack){
                    return offlineStack.push( fn );
                  }
                  return fn();
                }
              }
          return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret ) : ret;
        }
        return {
          create: _create,
          one: function(key, fn, last){
            var event = this.create();
            event.one(key, fn, last);
          },
          remove: function(key, fn){
            var event = this.create();
            event.remove(key, fn);
          },
          listen: function(key, fn, last){
            var event = this.create();
            event.listen(key, fn, last);
          },
          trigger: function(){
            var event = this.create();
            event.trigger.apply(this,arguments);
          }
        }
  }();
  return Event;
}())
// 应用
// 先发布后订阅
Event.trigger('click',1);
Event.listen('click',function(a){
  console.log(a);
});
// 使用命名空间
Event.create('namespace1').listen('click',function(a){
  console.log(a);
});
Event.create('namespace1').trigger('click',1);
Event.create('namespace2').listen('click',function(a){
  console.log(a);
});
Event.create('namespace2').trigger('click',2);
```

> 发布-订阅模式的优点非常明显，一为时间上的解耦，二为对象之间的解耦。

> 缺点：多个发布-订阅嵌套到一起时，不利于追踪bug


6. ### **命令模式**

> 有时候需要向某些对象发送请求，但是并不知道**请求的接收者**是谁，也不知道被**请求的操作**是什么。此时需要一种松耦合的方式设计程序，使得请求发送者和接受者能够消除彼此之间的耦合关系。



```js
// 简单实现
var RefreshMenuBarCommand = function(receiver){
  return {
    execute: function(){
      receiver.refresh();
    }
  }
}
var setCommand = function(button,command){
  button.onclick = function(){
    command.execute();
  }
}
var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand( button1 , refreshMenuBarCommand );

```

#### **撤销命令**

```js
// 另外一个命令模式应用场景
var ball = document.getElementById('ball');
var pos = document.getElementById('pos');
var moveBtn = document.getElementById('moveBtn');
var cancelBtn = document.getElementById('cancelBtn');
var MoveCommand = function(receiver,pos){
  this.recerver = recerver;
  this.pos = pos;
  this.oldPos = null;
}
MoveCommand.prototype.execute = function(){
  this.receiver.start('left',this.pos,1000,'strongeaseout');
  this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
}
MoveCommand.prototype.undo = function(){
  this.reveiver.start('left',this.oldPos,1000,'strongEaseOut');
}
var moveCommand;
moveBtn.onclick = function(){
  var animate = new Animate(ball);
  moveCommand = new MoveCommand(animate,pos.value);
  moveCommand.execute();
}
cancelBtn.onclick = function(){
  moveCommand.undo();
}
```

#### **撤销和重做**

在某些情况下，无法顺利地利用undo操作让对象回到execute之前的状态。比如在一个canvas画图程序中，画布上有一些点，我们在这些点之间画了N条线把这些点相互链接起来，用命令模式实现的。但是很难做到undo操作，因为canvas画图中擦除一条线，相对不容易。  
最好的办法是先清楚画布，然后把刚才执行过的命令全部执行一遍，这一点同样可以利用一个历史列表堆栈办到。记录命令日志，然后重复执行它们。

```js
var Ryu = {
  attack:function(){
    console.log('攻击');
  },
  defense:function(){
    console.log('defense');
  },
  jump:function(){
    console.log('jump');
  },
  crouch:function(){
    console.log('crouch');
  }
};
// 创建命令
var makeCommand = function(receiver,state){
  return function(){
    receiver[state]();
  }
}
var commands = {
  "119":"jump", //w
  "115":"crouch", //s
  "97":"defense", //a
  "100":"attack", //d
}
var commandStack = [];// 保存命令的堆栈
document.onkeypress = function(ev){
  var keyCode = ev.keyCode,
      command = makeCommand( Ryu,command[keyCode] );
  if(command){
    command();//执行命令
    commandStack.push(command);//将刚刚执行过的命令保存进堆栈
  }
};
// 点击播放录像，播放历史记录
document.getElementById('replay').onclick = function(){
  var command;
  while( command = commandStack.shift() ){
    command();
  }
}

```

#### **命令队列**

把命令存在命令堆栈，上一个命令执行完才执行下一个命令，异步执行。将命令排队进行。  
命令执行完，通知执行下一条命令，这个通知方式，可以是回调，也可以是发布-订阅模式。

#### **宏命令**

> 命令集合执行。操作命令集合。

```js
var ACommand = {
  execute:function(){
  }
}
var BCommand = {
  execute:function(){
  }
}
// ...
var Macrocommand = function(){
  return {
    commandList: [] ,
    add: function( command ){
      this.commandList.push( command );
    },
    execute: function(){
      for ( var i = 0,command; command = this.commandList[i++];){
        command.execute();
      }
    }
  }
};
var macrocommand = Macrocommand();
macrocommand.add( ACommand );
macrocommand.add( BCommand );
macrocommand.add( CCommand );
macrocommand.execute();

```

7. ### **组合模式**

> 组合模式就是用小的子对象来构建更大的对象，而这些小的对象本身也是由更小的“孙对象”构成的。

#### **组合模式的用途:**

1. 表示树形结构,组合模式可以很方便地描述对象部分-整体层次结构  
2. 利用对象多态性 统一对待组合对象和单个对象

#### **实现**

例如上述命令模式，宏命令的例子中，我们可以组合Acommand = commandA1 + commandA2 + commandA3 ，Bcommand类似, 最终 command = Acommand + Bcommand 。 调用步骤只需要调用最上层对象的 execute 方法。

#### **抽象类在组合模式中应用**

Java中，基于一个Component来编写程序，不用去区分到底是组合对象还是叶对象。我们在同一个对象的add中，既可以添加组合对象，也可以添加叶对象。

#### **透明性带来的安全问题**

组合模式的透明性使得发起请求的客户不用去顾忌树中组合对象和叶对象的区别，但它们在本质上是有区别的。  
组合对象可以拥有子节点，叶对象下面就没有子节点，所以我们也许会发生误操作，比如试图往叶对象中添加子节点。解决方法是给叶对象增加add 判断叶节点不可以添加子节点。

#### **实例 - 文件夹**

```js
//Folder
var Folder = function(name){
  this.name = name;
  this.files = [];
}
Folder.prototype.add = function(file){
  this.file.push(file);
}
Folder.prototype.scan = function(file){
  console.log( '开始扫描文件夹:'+this.name );
  for ( var i = 0, file, files = this.files; file = files[ i++ ]){
    file.scan();
  }
}
// File
var File = function(name){
  this.name = name;
}
File.prototype.add = function(file){
  throw new Error( '文件下面不能再添加文件' );
}
File.prototype.scan = function(file){
  console.log( '开始扫描文件:' + this.name );
}
// 组合
var folder = new Folder( '学习资料' );
var folder1 = new Folder( 'javascript' );
var folder2 = new Folder( 'jQuery' );

var file1 = new File( 'xxxx' );
var file2 = new File( 'xxxx' );
var file3 = new File( 'xxxx' );

folder1.add( file1 );
folder2.add( file2 );

folder.add( folder1 );
folder.add( folder2 );
folder.add( file3 );

folder.scan();

```

#### **一些应该注意的点**

> 组合模式不是父子关系： HAS-A 而不是 IS-A

> 对叶对象操作的一致性：组合模式除了要求组合对象和叶对象拥有相同的接口之外，还有一个必要条件，就是对一组叶对象的操作必须具有一致性

> 双向映射关系

> 用职责链模式提高组合模式性能

#### **引用父对象**

#### **何时引用组合模式**

- 表示对象的部分-整体层次结构。组合模式可以方便地构造一棵树来表示对象的部分-整体结构。特别是我们在开发期间不确定这棵树到底存在多少层次。只需要通过请求树的最顶层对象，便能对整棵树做统一的操作。

- 客户希望统一对待树中的所有对象，组合模式使客户可以忽略组合对象和叶对象的区别，客户在面对这棵树的时候，不用关心当前处理的对象是组合对象还是叶对象，也不用写一堆if else分别处理他们


8. ### **模版方法模式**

#### **定义**

> 模版方法是一种只需要使用继承就可以实现的非常简单的模式

> 由两部分组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构。


#### **抽象类**

> 抽象类是要被继承的，不可以实例化。另一种类具体类可以被实例化。

> 抽象类表示一种契约，继承了这个抽象类的所有子类都拥有跟抽象类一致的接口方法。抽象类的主要作用就是为它的子类定义这些公共接口

> 抽象类中申明抽象方法，抽象方法没有具体的实现过程，子类继承这个抽象类时，必须重写父类的抽象方法。

#### **模版方法的使用场景**

> 模版方法通常被架构师用于搭建项目的框架，架构师定好了框架的骨架，程序员继承框架的结构之后，负责往里面填空。

例如，前端构建一系列的UI组件，过程一般如下:  
1. 初始化一个div容器
2. 通过ajax请求拉取相应数据  
3. 把数据渲染到div容器里，完成组件的构造  
4. 通知用户组件渲染完毕

#### **钩子方法**

> 钩子方法用来解决，在模版方法中，父类抽象类已定义好的算法，需要做适度变化。

```js
// 抽象父类
var Beverage = function(){
};
Beverage.prototype.boilWater = function(){
  console.log('把水煮沸');
}
Beverage.prototype.brew = function(){
  console.log('子类必须重写brew方法');
}
Beverage.prototype.addCondiments = function(){
  console.log('子类必须重写pourInCup方法');
}
Beverage.prototype.customerWantsCondiments = function(){
  return true;//默认需要调料
}
Beverage.prototype.init = function(){
  this.boilWater();
  this.brew();
  this.pourInCup();
  if(this.customerWantsCondiments){
    // 返回true，则需要调料
    this.addCondiments();
  }
}

// 子类继承模版父类
var CoffeeWithHook = function(){

}
CoffeeWithHook.prototype = new Beverage();
CoffeeWithHook.prototype.brew = function(){
  console.log('冲咖啡');
}
CoffeeWithHook.prototype.addCondiments = function(){
  console.log('加糖');
}
CoffeeWithHook.prototype.customerWantsCondiments = function(){
  return window.confirm('请问需要调料吗?');
}
var coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();

```

#### **好莱坞原则**

> 我们允许底层组件将自己挂钩到高层组件中，而高层组件会决定什么时候，以何种方式去使用这些底层组件，高层组件对待底层组件的方式，跟演艺公司对待新人演员一样，都是“别调用我，我们会调用你”


#### 更好的用js实现模版方法

```js
var Beverage = function( param ){
  var boilWater = function(){
  }
  var brew = param.brew || function(){
    throw new Error('必须传递brew方法');
  }
  var pourInCup = param.pourInCup || function(){
    throw new Error('必须传递pourInCup方法');
  }

  var F = function(){};
  F.prototype.init = function(){
    boilWater();
    brew();
    pourInCup();
  }

  return F;
}

var Coffee = Beverage({
  brew: function(){
    // 沸水冲咖啡 
  },
  pourInCup: function(){
    // 咖啡到进杯子 
  }
})

var Tea = Beverage({
  brew: function(){ 
    // 沸水冲茶叶
  },
  pourInCup: function(){
    // 茶到进杯子 
  }
})

var coffee = new Coffee();
coffee.init();
var tea = new Tea();
tea.init();
```

> 模版方法是一种典型的通过封装变化提高系统扩展性的设计模式。

> 在JavaScript中，我们用高阶函数是更好的实现选择。


9. ### **享元模式**

> 享元模式是一种用于性能优化的模式

> 以时间换空间的方式

#### **内部状态与外部状态**

享元模式要求将对象的属性划分为内部状态与外部状态。目标是尽量减少共享对象的数量。

- 内部状态存储与对象内部
- 内部状态可以被一些对象共享
- 内部状态独立于具体的场景，通常不会改变
- 外部状态取决于具体的场景，并根据场景变化，外部状态不能被共享

#### **实例:文件上传**

```js
var Upload = function( uploadType ){
  // 内部状态
  this.uploadType = uploadType;
}
Upload.prototype.delFile = function( id ){
  //给当前upload对象的this赋值 并操作新的值
  // 新值为文件对象的数据以及dom
  // 获取了外部状态，并操作外部状态
  uploadManager.setExternalState(id,this);
  if( this.file < 3000 ){
    return this.dom.parentNode.removeChild( this.dom );
  }
  if( window.confirm('确定要删除该文件吗？'+this.fileName)){
    return this.dom.parentNode.removeChild(this.dom);
  }
}

// 创建享元对象的工厂函数
// 实际最后只会根据 uploadType 分别只生成一个对象
var UploadFactory = ( function(){
  var createFlyWeightObjs = {};
  return {
    create: function( uploadType ){
      if(createFlyWeightObjs[uploadType]){
        return createFlyWeightObjs[uploadType]
      }
      return createFlyWeightObjs[uploadType] = new Upload(uploadType);
    }
  }
} )()

// 管理器存储外部状态
var uploadManager = (function(){
  var uploadDatabase = {};
  return {
    add : function( id, uploadType, fileName, fileSize){
      var flyWeightObj = UploadFactory.create( uploadType );
      var dom = document.createElement('div');
      dom.innerHtml = '<span>文件名称:'+fileName+',文件大小:'+ fileSize +'</span>' + '<button class="delFile">删除</button>';
      dom.querySelector('.delFile').onclick = function(){
        flyWeightObj.delFile( id );
      }
      document.body.appendChild(dom);
      uploadDatabase[ id ] = {
        fileName:fileName,
        fileSize:fileSize,
        dom:dom
      }
      return flyWeightObj;
    },
    setExternalState: function(id,flyWeightObj){
      var uploadData = uploadDatabase[ id ];
      for( var i in uploadData ){
        flyWeightObj[i] = uploadData[i];
      }
    }
  }
})()

// 实际操作方法，遍历通过 管理器操作对象
var id = 0 ;
window.startUpload = function( uploadType,files ){
  for(var i = 0,file;file = files[ i++ ];){
    var uploadObj = uploadManager.add( ++id,uploadType,file.fileName,file.fileSize);
  }  
}

// 使用
startUpload('plugin',[
  {
    fileName:'1.txt',
    fileSize:1000
  },
  {
    fileName:'2.html',
    fileSize:3000
  },
  {
    fileName:'3.txt',
    fileSize:5000
  }
]);
startUpload('flash',[
  {
    fileName:'4.txt',
    fileSize:1000
  },
  {
    fileName:'5.html',
    fileSize:3000
  },
  {
    fileName:'6.txt',
    fileSize:5000
  }
]);

```

#### **享元模式的适用性 适用场景**

- 一个程序中适用了大量的相似对象
- 由于适用了大量的对象，造成很大的内存开销
- 对象的大多数状态都可以变为外部状态
- 剥离出对象的外部状态后，可以用相对较少的共享对象取代大量对象


10. ### **职责链模式**

> 职责链模式的定义：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

#### **职责链现实场景**

挤公交，给售票员钱，上车后，不知道售票员在哪，把钱给附近的人，传递到售票员。

> 职责链优点：请求发送者只需要知道链中的第一个节点，从而弱化了发送者和一组接收者之间的强联系。

> 职责链中的节点数量和顺序是可以自由变化的

#### **实现一个职责链节点**

```js
// 未优化的模式
if(a){

}else{

}

if(b){

}else{

}

if(c){

}else{

}


// 优化后的
// 500定金送100券，200定金送50券，库存下，3类型不优先
// orderType: 订单类型(1:预定金500，2:预定200，3:普通购买)
// pay: 是否支付定金，否的话降级为普通模式
// stock: 用于普通购买的库存
var order500 = function(orderType,pay,stock){
  if(orderType === 1 && pay === true){
    console.log("500元定金预购，得到100优惠券");
  }else{
    // 我不知道下一个请求是谁反正往后面传递
    return "nextSuccessor";
  }
}
var order200 = function(orderType,pay,stock){
  if(orderType === 2 && pay === true){
    console.log("200元定金预购，得到50优惠券");
  }else{
    return "nextSuccessor";
  }
}
var orderNormal = function(orderType,pay,stock){
  if( stock > 0 ){
    console.log("普通购买，无优惠券");
  }else{
    console.log("手机库存不足");
  }
}

var Chain = function( fn ){
  this.fn = fn;
  this.successor = null;
}
// 指定在链中的下一个节点
Chain.prototype.setNextSuccessor = function( successor ){
  return this.successor = successor;
}
// 传递请求给某个节点
Chain.prototype.passRequest = function(){
  // 这段语法是链式的核心
  var ret = this.fn.apply(this,arguments);
  if ( ret === 'nextSuccessor' ){
    return this.successor && this.successor.passRequest.apply(this.successor,arguments);
  }
  return ret;
}

var chainOrder500 = new Chain( order500 );
var chainOrder200 = new Chain( order200 );
var chainOrderNormal = new Chain( orderNormal );

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder500.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1,true,500);
//输出 500元定金预购，得到100优惠券
chainOrder500.passRequest(2,true,500);
//输出 200元定金预购，得到50优惠券
chainOrder500.passRequest(3,true,500);
//输出 普通购买，无优惠券
chainOrder500.passRequest(1,false,500);
//输出 手机库存不足

// 临时在链中添加一个节点
var order300 = function(){
  // ...
}

var chainOrder300 = new Chain( order300 );
chainOrder500.setNextSuccessor(chainOrder300);
chainOrder300.setNextSuccessor(chainOrder200);

```

#### **异步职责链**

Chain添加next 方法，


11. ### **中介者模式**

> 中介者模式的作用就是解除对象与对象之间的紧耦合关系。中介者使各对象之间耦合松散，而且可以独立地改变他们之间的交互。中介者模式使网状的多对多模式变成了相对简单的一对多关系。

#### 现实场景

机场指挥塔 博彩公司


#### 中介者实现购买手机案例

选择手机颜色

选择手机数量

显示选择颜色

显示选择数量

根据状态显示购买按钮可用和文案

```js
// 手机库存
var goods = {
  "red|32G": 3,
  "red|16G": 0,
  "blue|32G": 1,
  "blue|16G": 6
}
//中介者
var mediator = (function(){
  var colorSelect = document.getElementById('colorSelect'),
      memorySelect = document.getElementById('memorySelect'),
      numberInput = document.getElementById('numberInput'),
      colorInfo = document.getElementById('colorInfo'),
      memoryInfo = document.getElementById('memoryInfo'),
      NumberInfo = document.getElementById('NumberInfo'),
      nextBtn = document.getElementById('nextBtn');
  return {
    changed:function(obj){
      var color = colorSelect.value,
        memory = memorySelect.value,
        number = numberInput.value,
        // 颜色和内存对应的手机库存量
        stock = goods[color + '|' + memory];
      if( obj === colorSelect){
        colorInfo.innerHtml = color;
      }else if( obj === memorySelect ){
        memoryInfo.innerHtml = memory;
      }else if( obj === numberInput ){
        NumberInfo.innerHtml = number;
      }
      if(!color){
        nextBtn.disabled = true;
        nextBtn.innerHtml = '请选择手机颜色';
        return ;
      }
      if(!memory){
        nextBtn.disabled = true;
        nextBtn.innerHtml = '请选择手机内存';
        return ;
      }
      if(((number - 0) | 0) !== number - 0){
        nextBtn.disabled = true;
        nextBtn.innerHtml = '请输入正确的购买数量';
        return ;
      }
      nextBtn.disabled = false;
      nextBtn.innerHtml = '放入购物车';
    }
  }
}())
//  事件函数
colorSelect.onchange = function(){
  mediator.changed( this );
}
memorySelect.onchange = function(){
  mediator.changed( this );
}
numberInput.onInput = function(){
  mediator.changed( this );
}
```

> 中介者模式是迎合迪米特法则的一种实现。迪米特法则也叫最少知识原则，是指一个对象应该尽可能少地了解另外的对象（类似不和陌生人说话）。如果对象之间的耦合性太高，一个对象发生改变之后，难免会影响到其他的对象，跟“城门失火，殃及池鱼”的道理是一样的。而在中介者模式里，对象之间几乎不知道彼此的存在，它们只能通过中介者对象来互相影响对方。

12. ### 装饰者模式

decorator

> 装饰者模式：给对象动态地增加职责的方式

> 装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。跟继承者相比，装饰者是一种更轻便灵活的做法，这是一种“即用即付”的方式，比如天冷来就多穿一件衣服

#### 模拟传统面向对象语言的装饰者模式

```js
// 基本类
var Plane = function(){

}
Plane.prototype.fire = function(){
  console.log('发射普通子弹');
}
// 装饰类一
var MissileDecrator = function(plane){
  this.plane = plane;
}
MissileDecrator.prototype.fire = function(){
  this.plane.fire();
  console.log('发射导弹');
}
// 装饰类二
var AtomDecrator = function(plane){
  this.plane = plane;
}
AtomDecrator.prototype.fire = function(){
  this.plane.fire();
  console.log('发射原子弹');
}
// 调用
var plane = new Plane();
plane = new MissileDecrator(plane);
plane = new AtomDecrator(plane);
plane.fire();
// 分别输出: 发射普通子弹，发射导弹，发射原子弹
```

> 装饰者模式将一个对象嵌入另一个对象之中，实际上相当于这个对象被另一个对象包装起来，形成一条包装链。请求随着这条链依次传递到所有的对象，每个对象都有处理这条请求的机会。

#### 装饰js函数

```js

var _getElementById = document.getElementById;
document.getElementById = function(){
  alert(1);
  return _getElementById.apply(ducument,arguments);
}
var button = document.getElementById('button');

```

#### 用AOP实现装饰函数


- 实现一

```js
Function.prototype.before = function( beforefn ){
  var _self = this;//保持原函数的引用
  return function(){//返回了包含了原函数和新函数的“代理”函数
    beforefn.apply(this,arguments);//执行新函数，且保证this不被劫持，新函数接受的参数，也会被原封不动地传入原函数，新函数在原函数之前执行
    return _self.apply(this,arguments);//执行原函数并返回原函数的执行结果
    //并且保证this不被劫持
  }
}

Function.prototype.after = function( afterfn ){
  var _self = this;
  return function(){
    var ret = _self.apply(this,arguments);
    afterfn.apply(this,arguments);
    return ret;
  }
}

// 应用
// 给函数添加 装饰的before
document.getElementById = document.getElementById.before(function(){
  alert(1);
})
//执行函数
var button = document.getElementById('button');
console.log(button);
```

- 实现二

```js
window.onload = function(){
  alert(1);
}

window.onload = ( window.onload || function(){} ).after(function(){
  alert(2);
}).after(function(){
  alert(3);
}).after(function(){
  alert(4);
});
```

- 改进实现一 

实现一的AOP是在Function.prototype上，这样会污染原型，我们做改进

```js
// 把一个fn装饰为 装饰后的fn
var before = function( fn, beforefn ){
  return function(){//装饰后的fn
    beforefn.apply( this, arguments );
    return fn.apply( this, arguments );
  }
}
var a = before(
  function(){alert(3)},
  function(){alert(2)}
);
a = before( a,function(){
  alert(1);
});
a();

```

#### AOP的应用实例

> 用AOP装饰函数的技巧在实际开发中非常有用。不论是业务业务代码的编写，还是在框架层面，我们都可以把行为依照职责分成粒度更细的函数，随后通过装饰把它们合并到一起，这有助于我们编写一个松耦合和高复用性的系统。

- 数据统计上报

> 分离业务代码和数据统计代码，是AOP的经典应用之一

```js
//点击按钮打开浮层，数据上报

Function.prototype.after = function(afterfn){
  var _self = this;
  return function(){
    var ret = _self.apply(this,arguments);
    afterfn.apply(this,arguments);
    return ret;
  }
}

var showLogin = function(){
  console.log('打开登录浮层');
}

var log = function(){
  console.log('上报标签为'+this.getAttribute('tag'));
}

showLogin = showLogin.after(log);//打开浮框后上报数据

document.getElementById('button').onclick = showLogin;
```

- 用AOP动态改变函数的参数

给ajax更好的添加参数

```js
/////////////////// 原函数
var ajax = function(type,url,param){
  console.dir(param);
}
ajax('get','http://xxx',{name:'sven'});

/////////////////// 给原函数添加token
var getToken = function(){

}
var ajax = function(type,url,param){
  param = param || {};
  param.Token = geToken();
}
//上面的做法使ajax函数相对变得僵硬了，不方便移植，移植时Token是多余的
/////////////////// 用AOP的方式优化
//还原ajax函数
ajax = ajax.before(function(type,url,param){
  param.Token = getToken();
})
ajax('get','http://xxx',{name:'sven'});

```

> 用AOP的方式给ajax函数动态装饰TOken参数，保证了ajax函数是一个相对纯净的函数，提高了ajax函数的可复用性，它在被迁往其他项目的时候，不需要做任何修改。

- 插件式的表单验证

实现表单验证

```js
formSubmit = function(){
  if(username.value === ''){
    return alert('xxx');
  }
  var param = {
    username:username.value
  }
  ajax('http://ds',param);
}
// 此处提交函数承担了两个职责，提交ajax请求 和 验证输入合法性
// 会造成函数臃肿，职业混用，谈不上任何复用性


// 下面进行分离 校验validate
var validate = function(){
  if(username.value === ''){
    alert('xxx')
    return false;
  }
}
var formSubmit = function(){
  if(validate() === false){
    return;
  }
  var param = {
    username:username.value
  }
  ajax('http://ds',param);
}


// 进一步优化代码
// 使validate和formsubmit完全分离开来
Function.prototype.before = function( beforefn ){
  var _self = this;
  return function(){
    if( beforefn.apply(this,arguments) === false ){
      //beforefn返回false的情况直接return,不再执行后面的原函数
      return ;
    }
    _self.apply(this,arguments);
  }
}
var validate = function(){
  if( username.value === '' ){
    alert('用户名不能空');
    return false;
  }
}
var formSubmit = function(){
  var param = {
    username : username,value
  }
  ajax('http',param);
}
formSubmit = formSubmit.before( validate );

submitBtn.onclick = function(){
  formSubmit();
}

```

> 最后的优化中，校验输入和提交表单的代码完全分离开来，它们不再有耦合关系。formSubmit = formSubmit.before( validate )这句代码，如果把校验规则动态接在formSubmit函数之前，validate成为一个即插即用的函数，甚至可以被写成配置文件的形式，这有利于我们分开维护这两个函数。

13. ### 状态模式

状态模式的部分定义:  
> 1. 允许一个对象在其内部状态改变时改变它的行为：  
将状态封装成独立的类，并将请求委托给当前的状态对象，当对象的内部状态改变时，会带来不同的行为变化。

> 2. 对象看起来似乎修改了它的类：  
从客户的角度来讲，我们使用的对象，在不同的状态下具有截然不同的行为，这个对象看起来是从不同类中实例化而来的，实际上这是使用了委托的效果。



#### 状态模式的通用结构

```js
//上下文状态管理器

var Light = function(){
  //持有状态对象的引用
  this.offLightState = new OffLightState(this);
  // ...其他状态类似写法

  this.button = null;
}

Light.prototype.init = function(){
  var button = document.createElement('button'),
      self = this;
  this.button = document.body.appendChild( button );
  this.button.innerHtml = '开关';
  // 状态指向 对应的状态类实例
  this.currState = this.offLightState;//设置默认初始状态
  this.button.onclick = function(){
    self.currState.buttonWasPressed();
  }
}
```

```js
// 状态类
var OffLightState = function( light ){
  this.light = light;
}

OffLightState.prototype.buttonWasPressed = function(){
  console.log('弱光');
  this.light.setState( this.light.weakLightState );
}
// ...其他状态类



//状态类的实现优化为抽象类
var State = function(){

}
State.prototype.buttonWasPressed = function(){
  throw new Error('父类的buttonWasPressed方法必须被重写');
}
var SuperStrongLightState = function( light ){
  this.light = light;
}
SuperStrongLightState.prototype = new State();
SuperStrongLightState.prototype.buttonWasPressed = function(){
  console.log('关灯');
  this.light.setState( this.light.offLightState );
}
```

#### 状态模式的优缺点

优点：

> 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态，很容易增加新的状态和转换

> 避免context无限膨胀，状态模式的逻辑被分布在状态类中，也去掉了context中原本过多的条件分支

> 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然

> context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响

缺点:

> 会在系统中定义许多状态类，编写20个状态类是一项枯燥乏味的工作，而且系统中会因此而增加不少对象。另外，由于逻辑分散在状态类中，虽然避开了不受欢迎的条件分支语句，但也造成了逻辑分散的问题，我们无法在一个地方就看出整个状态机的逻辑。

#### 状态模式中的性能优化点

> 有两种状态来管理state对象的创建和销毁。第一种是仅当state对象被需要时才创建并随后销毁，另一种是一开始就创建好所有的状态对象，并且始终不销毁他们。如果state对象比较庞大，可以用第一种方式类节省内存，这样可以避免创建一些不会用到的对象并及时地回收他们。但如果状态的改变很频繁，最好一开始

# 面向对象在js中的实现

## 面向对象

- 多态

javascript是动态类型语言

同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。

多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与“可能改变的事物”分离开来。

静态 类型 的 面向 对象 语言 通常 被 设计 为 可以 **向上转型**

多 态 的 思想 实际上 是把“ 做 什么” 和“ 谁 去做” 分离 开来， 要 实现 这一点， 归根结底 先要 消除 类型 之间 的 耦合 关系。

多 态 的 最 根本 好处 在于， 你 不必 再向 对象 询问“ 你是 什么 类型” 而后 根据 得到 的 答案 调用 对象 的 某个 行为—— 你 只管 调用 该 行为 就是 了， 其他 的 一切 多 态 机制 都会 为你 安排 妥当。  
----Martin Fowler 《重构：改善既有的代码设计》

多 态 最 根本 的 作用 就是 通过 把 过程 化 的 条件 分支 语句 转化 为 对象 的 多 态 性， 从而 消除 这些 条件 分支 语句。

面向对象相关思想: 通过 对 封装、 继承、 多 态、 组合 等 技术 的 反复 使用， 提炼 出 一些 可 重复 使用 的 面向 对象 设计 技巧。 而 多 态 在其中 又是 重 中 之 重， 绝大部分 设计 模式 的 实现 都 离不开 多 态 性的 思想。

- 封装

封装 的 目的 是将 信息 隐藏。 一般而言， 我们 讨论 的 封装 是 封装 数据 和 封装 实现。  更 广义 的 封装: 不仅 包括 封装 数据 和 封装 实现， 还包括 封装 类型 和 封装 变化。

封装数据：私有数据，公有方法
方式：闭包方式 ， Symbol

- 原型设计模式（js）

js是基于原型的继承 区别与 类和对象 的面向对象系统；  
ES5 Object.creat(),是实现clone，新的对象基于对象去clone；
JavaScript基于原型的面向对象系统参考了Self语言和Smalltalk语言；  
基于原型链的委托机制就是原型继承的本质。

原型编程范型的基本规则:  
所有 的 数据 都是 对象。  
要得 到 一个 对象， 不是 通过 实例 化 类， 而是 找到 一个 对象 作为 原型 并 克隆 它。  
对象 会 记住 它的 原型。  
 如果 对象 无法 响应 某个 请求， 它 会把 这个 请求 委托 给 它自己 的 原型。

经测试

```js
Object.__proto__ === Function.__proto__
// true
```

js中的原型实现：  
从Object.prototype克隆

JavaScript 的 函数 既可以 作为 普通 函数 被 调用， 也可以 作为 构造 器（new） 被 调用。  

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

ES6的class也是基于原型链实现的

## 原型链概念

```js
function func(){

}
```

> 创建一个function(func)，这个function(func)就会自动创建一个prototype属性，这个属性指向函数的原型对象(originObj).  

```js
func.prototype = originObj  
```

> 默认的情况下，所有的原型对象(originObj)都会都会自动获得一个constructor(构造函数)属性 , 这个constructor指向prototype属性所在函数的指针

```js
originObj.constructor = func
// originObj 中还有其他属性，方法
originObj.sayName =  //自定义方法等
```

> 当调用构造函数func 创建( new )一个新实例( func1 )后，该实例（ func1 ）的内部将包含一个指针，指向构造函数的原型对象( func.prototype 也即是 originObj )
> ECMA-262第5版中这个内部指针叫 [[prototype]] ,但在浏览器中都支持一个属性 \_\_proto\_\_

```js
func1.__proto__ = func.prototype
```

> 原型属性的查找链：

```
func1 -> func1.__proto__(func.prototype)
```

> 当为对象( func1 )添加一个属性(同名)时，不会修改原型( originObj )中的属性，而是屏蔽原型中的属性，阻止我们访问原型中属性

```js
func.prototype.name = 'aa';
func1.name = 'dsadsa';
```

> delete操作符可以删除实例( func1 )的属性( name ),让我们重新可以访问原型链的属性 ( name )

```js
delete func1.name
```

## 基于原型链实现模块化

```js
//*********************************** 基本模块
function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console. log( something );
    }
    function doAnother() {
        console. log( another. join( " ! " ) );
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}
var foo = CoolModule();
foo. doSomething(); // cool
foo. doAnother(); // 1 ! 2 ! 3


//*********************************** 基本单例模块
//转换为IIFE
var foo = (function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console. log( something );
    }
    function doAnother() {
        console. log( another. join( " ! " ) );
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
})();
foo. doSomething(); // cool
foo. doAnother(); // 1 ! 2 ! 3



//*********************************** 模块管理器/定义/管理
var MyModules = (function Manager() {
    var modules = {};
    function define( name, deps, impl) {
        for (var i= 0; i< deps. length; i++) {
            deps[ i] = modules[ deps[ i]];
        }
        modules[ name] = impl. apply( impl, deps );
    }
    function get( name) {
        return modules[ name];
    }
    return {
        define: define,
        get: get
    };
})();
//实际应用
MyModules. define( "bar", [], function() {
    function hello( who) {
        return "Let me introduce: " + who;
    }
    return { hello: hello };
});
MyModules. define( "foo", ["bar"], function( bar) {
    var hungry = "hippo";
    function awesome() {
        console. log( bar. hello( hungry ).toUpperCase() );
    }
    return { awesome: awesome };
} );
var bar = MyModules. get( "bar" );
var foo = MyModules. get( "foo" );
console. log( bar. hello( "hippo" ) ); // < i> Let me introduce: hippo</ i>
foo. awesome(); // LET ME INTRODUCE: HIPPO


//******************************* es6模块实现
// 基于 函数 的 模块 并不是 一个 能被 稳定 识别 的 模式（ 编译器 无法 识别），
//  它们 的 API 语义 只有 在 运行时 才会 被 考虑 进来。
//  因此 可以 在 运行时 修改 一个 模块 的 API（ 参考 前面 关于 公共 API 的 讨论）。
// 相比之下， ES6 模块 API 更加 稳定（ API 不 会在 运行时 改变）。
// 由于 编辑器 知道 这一点， 因此 可以 在（ 的 确 也 这样 做了） 编译 期 检查 对 导入 模块 的 API 成员 的 引用 是否 真实 存在。
// 如果 API 引用 并不 存在， 编译器 会在 运行时 抛出 一个 或 多个“ 早期” 错误， 而 不会 像 往常 一样 在 运行 期 采用 动态 的 解决 方案。
//ES6的模块没有“行内”格式，必须被定义在独立的文件中（一个文件一个模块）。
//浏览器或引擎有一个默认的“模块加载器”（可以被重载，但这远超出了我们的讨论范围）可以在导入模块时异步地加载模块文件。
//实现:
// import export 语法








//*******************************组合继承  (原型链 和 借用构造函数共同构成)
function SuperType( name){
    this. name = name;
    this. colors = ["red", "blue", "green"];

}
SuperType. prototype. sayName = function(){
    alert( this. name);

};
function SubType( name, age){
    //继承 属性
    SuperType. call( this, name); //第二次 调用 SuperType()
    this. age = age;
}
    //继承 方法
SubType. prototype = new SuperType(); //第一次 调用 SuperType()

SubType. prototype. sayAge = function(){
    alert( this. age);
};


var instance1 = new SubType(" Nicholas", 29);
 instance1. colors. push(" black");
 alert( instance1. colors); //"red, blue, green, black"
 instance1. sayName(); //"Nicholas";
 instance1. sayAge(); //29

var instance2 = new SubType(" Greg", 27);
alert( instance2. colors); //"red, blue, green"
instance2. sayName(); //"Greg";
instance2. sayAge(); //27



//*******************************寄生组合式继承
function object( o){
    function F(){}
    F. prototype = o;
    return new F();
}
function inheritPrototype( subType, superType){
    var prototype = object( superType.prototype); //创建 对象
    // 或者 var prototype = Object.create( superType. prototype);
    prototype.constructor = subType; //增强 对象
    subType.prototype = prototype; //指定 对象
}

function SuperType( name){
    this. name = name;
    this. colors = ["red", "blue", "green"];
}
SuperType. prototype. sayName = function(){
    alert( this. name);
};
function SubType( name, age){
    SuperType. call( this, name);
    this. age = age;
}
inheritPrototype( SubType, SuperType);
SubType.prototype.sayAge = function(){
  alert( this. age);
};

```

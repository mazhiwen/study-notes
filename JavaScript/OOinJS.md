# 面向对象在js中的实现

- [面向对象](#面向对象)
- [原型链概念](#原型链概念)
- [基于原型链实现模块化](#基于原型链实现模块化)

***

## 构造函数

任何函数通过new操作符来调用，那它就可以作为构造函数；否则就是普通函数

```js
function Person(name) {

  this.name = name;
}

var person1 = new Person('peter');
```

person1 = new Person('peter') 返回的person1是一个新对象。

person1是Object的实例。也是Person的实例

```js
person1 instanceof Object // true
person1 instanceof Person // true
```

person1.constructor = Person

所有对象均继承自Object

## 原型对象 原型链

使用构造函数来新建一个对象，

每一个构造函数的内部都有一个 prototype 属性值，

prototype属性值 是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。

当我们使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，同时还有一个constructor值，指向构造函数。这个被指向的对象整体被称为原型对象。

一般来说我们是不应该能够获取到这个原型对象的值的，但是现在浏览器中都实现了 __proto__ 属性来让我们访问这个属性，但是我们最好不要使用这个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，我们可以通过这个方法来获取对象的原型。

当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以这就是我们新建的对象为什么能够使用 toString() 等方法的原因。

### prototype属性

function才有prototype

创建一个function(Person)，这个function(Person)就会自动创建一个prototype属性，这个属性指向函数的原型对象(originObj).

这个原型对象的用途是包含可以由特定类型的所有实例共享的属性和方法

```js
function Person(){

}
// Person.prototype = originObj  
// 为原型对象添加方法
Person.prototype.sayName = function(){
    alert(this.name);
}
```

### 构造函数 constructor

原型对象的构造函数 constructor

默认的情况下，所有的原型对象(originObj)都会都会自动获得一个constructor(构造函数)属性 , 这个constructor属性指向prototype属性所在函数的指针

```js
Person.prototype.constructor = Person
originObj.constructor = Person
// originObj 中还有其他属性，方法
originObj.sayName =  //自定义方法等
```

### `[[prototype]]` , `__proto__`

实例的指向构造函数的原型对象的指针：`[[prototype]]` , `__proto__`

- `[[prototype]]`:

[[prototype]] 也就是 `__proto__` 是对象才有的属性

当调用构造函数Person 创建( new )一个新实例( person1 )后，该实例（ person1 ）的内部将包含一个指针，指向构造函数的原型对象( Person.prototype 也即是 originObj )

ECMA-262第5版中这个内部指针叫 `[[prototype]]` ,但在浏览器中都支持一个属性`__proto__`

```js
var person1 = new Person();

person1.__proto__ === Person.prototype; // true  
```

- 不同情况的```__proto__```指向:

```js
/*1、字面量方式*/
var a = {};
console.log(a.constructor); //function Object() { [native code] } (即构造器Object）
console.log(a.__proto__ === a.constructor.prototype); //true

/*2、构造器方式*/
var A = function (){}; var a = new A();
console.log(a.constructor); // function(){}（即构造器function A）
console.log(a.__proto__ === a.constructor.prototype); //true

/*3、Object.create()方式*/
var a1 = {a:1}
var a2 = Object.create(a1);
console.log(a2.constructor); //function Object() { [native code] } (即构造器Object)
console.log(a2.__proto__ === a1);// true
console.log(a2.__proto__ === a2.constructor.prototype); //false（此处即为图1中的例外情况）
```

### 原型属性的查找链

- 基本原型链顺序

```js
var A = function(){};
var a = new A();
console.log(a.__proto__); //Object {}（即构造器function A 的原型对象）
console.log(a.__proto__.__proto__); //Object {}（即构造器function Object 的原型对象）
console.log(a.__proto__.__proto__.__proto__); //null
```

- 查找

每当代码读取对象的某个属性时 , 首先会在对象本身搜索这个属性，如果找到该属性就返回该属性的值，如果没有找到，则继续搜索该对象对应的原型对象

```js
person1 -> person1.__proto__(Person.prototype)
```

当为对象( person1 )添加一个属性(同名)时，不会修改原型( originObj )中的属性，而是屏蔽原型中的属性，阻止我们访问原型中属性

```js
Person.prototype.name = 'aa';
person1.name = 'dsadsa';
```

delete操作符可以删除实例( func1 )的属性( name ),让我们重新可以访问原型链的属性 ( name )

```js
delete func1.name
```

- hasOwnProperty()

方法来判断一个属性是存在与实例中，还是存在于原型中。

- for-in 循环

在使用 for-in 循环时，返回的是所有能够通过对象访问的、可枚举的属性，其中包括了存在于实例中的属性，也包括了存在于原型中的属性。

需要注意的一点是，屏蔽了实例中不可枚举属性的实例属性也会在 for-in 循环中返回。

- in操作符

判断能否通过对象访问某个属性，无论在实例属性还是原型属性

- Object.keys()

这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。

如果想要获取所有的实例属性，无论它是否可以枚举，我们可以使用 Object.getOwnPropertyNames() 方法。

### 默认原型

所有函数的默认原型都是 Object 的实例，因此默认原型都会包含一个内部指针，指向 Object.Prototype 。这也正是所有的自定义类型都会继承 toString() 、valueOf() 等默认方法的根本原因。

Object.prototype 就是原型链的终点了，我们可以试着打印一下 Object.prototype.```__proto__```，我们会发现返回的是一个 null 空对象，这就意味着原型链的结束。

### 原型链

同一构造函数的所有对象实例共享对象实例的原型对象上的属性，方法。

通过查找原型对象上的对象属性实现查找链

先从对象实例查找属性 -》 搜索原型对象的属性

实例属性添加原型属性中已有的相同的属性时，只会阻止我们访问原型属性，而不会修改那个属性。delete操作可以完全删除实例属性，从而能够重新访问原型属性。

### 获取原型的方法

p.`__proto__`

p.constructor.prototype

Object.getPrototypeOf(p)

## 面向对象概念

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

## javascript 创建对象的几种方式

<http://cavszhouyou.top/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E4%B9%8B%E5%AF%B9%E8%B1%A1%E5%88%9B%E5%BB%BA.html>

### 工厂模式

```js
function createPerson(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

var person1 = createPerson("james"，9，"student");

var person2 = createPerson("kobe"，9，"student");
```

### 构造函数模式

```js
function createPerson(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
    return o;
}

var person1 = new createPerson("james"，9，"student");

var person2 = new createPerson("kobe"，9，"student");
```

解决了工厂模式中对象类型无法识别的问题，并且创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型。

在使用构造函数创建对象时，每个方法都会在实例对象中重新创建一遍。拿上面的例子举例，这意味着每创建一个对象，我们就会创建一个 sayName 函数的实例，但它们其实做的都是同样的工作，因此这样便会造成内存的浪费。

### 原型模式

```js
function Person(){

}

Person.prototype.name = "james";
Person.prototype.age = 9;
Person.prototype.job = "student";
Person.prototype.sayName = function(){
    alert(this.name);
}

var person1 = new Person();
person1.sayName(); // "james"

var person2 = new Person();
person2.sayName(); // "james"


console.log(person1.sayName === person2.sayName) // true
```

我们通过使用原型对象可以让所有的对象实例共享它所包含的属性和方法，因此这样也解决了代码的复用问题

解决了构造函数模式中多次创建相同函数对象的问题，所有的实例可以共享同一组属性和函数。

首先第一个问题是原型模式省略了构造函数模式传递初始化参数的过程，所有的实例在默认情况下都会取得默认的属性值，会在一定程度上造成不方便。

### 组合使用构造函数模式和原型模式

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
}

Person.prototype = {
    constructor: Person,
    sayName: function(){
        alert(this.name);
    }
}

var person1 = new createPerson("james"，9，"student");

var person2 = new createPerson("kobe"，9，"student");

console.log(person1.name); // "james"
console.log(person2.name); // "kobe"
console.log(person1.sayName === person2.sayName); // true
```

构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性

使用这种模式的好处就是，每个实例都会拥有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。而且这中混成模式还支持向构造函数传递参数

由于使用了两种模式，因此对于代码的封装性来说不是很好。

### 动态原型模式

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;

    if(typeof this.sayName !== "function" ){

        Person.prototype.sayName: function(){
            alert(this.name);
        }
    }
}

var person1 = new createPerson("james"，9，"student");

person1.sayName(); // "james"
```

### 寄生构造函数模式

```js
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

var person1 = new Person("james"，9，"student");
```

## js实现继承

<http://cavszhouyou.top/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E4%B9%8B%E7%BB%A7%E6%89%BF.html>

### 借用构造函数

### 组合继承  (原型链 和 借用构造函数共同构成)

```js
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
```

### 原型式继承

### 寄生式继承

### 寄生组合式继承

```js
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

## js实现模块化

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

```

# Object

## 概念

Object本质上是由一组无序的名值对组成的

大多数引用类型的值都是Object类型的实例

## 创建Object实例

**new操作符**

```js
var person = new Object();
person.name = 2;
```

**对象字面量**

```js
var person = {
  name: 2,
  5: true, // 自动转换为字符串属性
  'str': 2
}
```

## 键访问 属性访问

varmyObject={a:2};
myObject.a;//2
myObject["a"];//2 接受utf8/unicode字符串

## 可计算属性名 es6新增可计算属性名

```js
var prefix="foo";
varmyObject={
  [prefix+"bar"]:"hello",
  [prefix+"baz"]:"world"
};
myObject["foobar"];//hello
myObject["foobaz"];//world
```

## 属性描述符

<https://juejin.cn/post/6844903640897945613>

一个Object的属性描述对象可以为属性设置很多特性，例如 configurable，enumerable，get,set

descriptor:属性描述符。

```js
// descriptor
{
  get: function () {return sth},
  set: function (val) {/* do sth */},
  configurable,
  enumerable,
  value,
  writable
}
```

### value

当前值

### writable

是否可以修改属性的值

### configurable

是否可以修改属性描述符,是否可以使用:  

```js
Object.defineProperty(myObj,'a',{
  value:'',
  writable:true,
  configurable:true,
  enumerable:true
})  
```

或者  
delete myObj.a;  
注意：configurable:false是单向操作，不可撤销

### enumerable

是否可以出现在for..in 循环

通过描述符可以实现：常量

### get

get 值是一个函数，当属性被访问时，会触发 get 函数

### set

set 值同样是一个函数，当属性被赋值时，会触发 set 函数

### Object.getOwnPropertyDescriptor（obj，propName）

获取属性的property descriptor

### Object.defineProperty

该方法允许精确地添加或修改对象的属性

```js
Object.defineProperty(obj, "hello", descriptor)
```

有一些对属性的操作，使用这种方法无法拦截，比如说通过下标方式修改数组数据或者给对象新增属性，vue 内部通过重写函数解决了这个问题。在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为这是 ES6 的语法。

## Object.preventExtensions()

禁止扩展（属性）：

不能添加新属性

## delete

delete myObj.a;
不会释放内存，知识删除对象属性

## Object.keys

Object.keys()
// 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

## Object.values(obj)

Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

## getOwnPropertyNames()

返回所有属性，包括可枚举 不可枚举

## Object.preventExtensions

防篡改 Extensions

var person = { name: "Nicholas" };
Object. preventExtensions( person);
person. age = 29;
alert( person. age); //undefined
//检测是否可扩展
Object.isExtensible(person);

## Object.seal

密封 seal

不能添加，删除，重新配置,可以修改属性值
Object.seal(person);
//密封对象，不可扩展 ,满足isExtensible
person. age = 29;//无效
//已有成员的[[Configurable]]为false,即不可删除属性
delete person.name;//无效
//属性值可修改
//检测是否seal
Object.isSealed(person);

## Object.freeze

冻结 freeze

Object.freeze(person);
//满足isExtensible 和 isSealed
//数据属性的[[Writable]]为false ,不可设置值
person.name='aaa';//无效
//检测
Object.isFrozen(person);

## hasOwnPropty

检测是否自身有某属性 返回boolean  

不会检查prototype原型链,区别与in操作符

## Object.prototype.toString

内部属性 [[Class]]

所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[Class]]（我们可以把它看作一个内部的分类，而非传统的面向对象意义上的类）。

这个属性无法直接访问，一般通过 Object.prototype.toString(..) 来查看。例如：

```js
Object.prototype.toString.call( [1,2,3] );
// "[object Array]"
```

## Object.getPrototypeOf()

这个方法可以返回[[Prototype]]的值

根据一个实例对象 返回对应的原型对象

```js
console.log(Object.getPrototypeOf(person1) === Person.prototype); // true
```

person1：实例对象

## 原型对象.isPrototypeOf

方法来确定对象之间是否存在这种实例原型对象关系，测试一个对象是否存在于另一个对象的原型链上

```js
console.log(Person.prototype.isPrototypeOf(person1)); // true
```

## instanceof

instanceof 运算符用于检测`构造函数`的 prototype 属性是否出现在某个`实例对象`的原型链上。

`object instanceof constructor`

object:某个实例对象

constructor:某个构造函数

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true
```

## Object.create()

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

返回：一个新对象，带着指定的原型对象和属性。

```js
var o = Object.create( Object.prototype, {
    a: { value: 1, writable: false },
    b: { value: 2, writable: true }
} );
```

## Object.is()

Object.is() 方法判断两个值是否为同一个值。

`Object.is(value1, value2);`

返回一个 Boolean 类型

使用双等号进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。

使用三等号进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。

使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 认定为是相等的。

## Object.assign()

Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

Object.assign(target, source1, source2)

覆盖合并属性

## object.valueOf()

方法返回指定对象的原始值。

JavaScript调用valueOf方法将对象转换为原始值。你很少需要自己调用valueOf方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它。

# Object

## 概念

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

## 其他

### 键访问 属性访问

varmyObject={a:2};
myObject.a;//2
myObject["a"];//2 接受utf8/unicode字符串

### 可计算属性名 es6新增可计算属性名

```js
var prefix="foo";
varmyObject={
  [prefix+"bar"]:"hello",
  [prefix+"baz"]:"world"
};
myObject["foobar"];//hello
myObject["foobaz"];//world
```

### 属性描述符

1. writable:是否可以修改属性的值

2. configurable:是否可以修改属性描述符,是否可以使用:  

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

3. enumerable  ：是否可以出现在for..in 循环

通过描述符可以实现：

* 常量

## 禁止扩展（属性）：Object.preventExtensions()

不能添加新属性

## delete

delete myObj.a;
不会释放内存，知识删除对象属性

## keys

Object.keys()
// 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

## Object.values(obj)

Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

## getOwnPropertyNames()

返回所有属性，包括可枚举 不可枚举

## 防篡改 Extensions

var person = { name: "Nicholas" };
Object. preventExtensions( person);
person. age = 29;
alert( person. age); //undefined
//检测是否可扩展
Object.isExtensible(person);

## 密封 seal

不能添加，删除，重新配置,可以修改属性值
Object.seal(person);
//密封对象，不可扩展 ,满足isExtensible
person. age = 29;//无效
//已有成员的[[Configurable]]为false,即不可删除属性
delete person.name;//无效
//属性值可修改
//检测是否seal
Object.isSealed(person);

## 冻结 freeze

Object.freeze(person);
//满足isExtensible 和 isSealed
//数据属性的[[Writable]]为false ,不可设置值
person.name='aaa';//无效
//检测
Object.isFrozen(person);

## hasOwnPropty

检测是否自身有某属性 返回boolean  
不会检查prototype链,区别与in操作符

# iterations 迭代相关 

## for 


## do...while
do {
    //statement 在检查条件之间会执行一次
    i += 1;
    console.log(i);
} while (i < 5);


## while 
var n = 0;
var x = 0;
while (n < 3) {//条件检测会在每次 statement 执行之前发生
  n++;
  x += n;
}


## break 
//break中止循环(for,do...while,while,label)，switch 

## continue  
//继续循环

##  for...in 
//遍历key 遍历arr object
// 这个 for...in 语句循环一个指定的变量来循环一个对象所有可枚举的属性
//array 返回index,object 返回key
let arr = [3, 5, 7];
arr.foo = "hello";
for (let key in arr) {
    console.log(key); // logs "0", "1", "2", "foo"
}
  
##  for...of  
//遍历value  遍历arr
for (let value of arr) {
    console.log(value); // logs "3", "5", "7" // 注意这里没有 hello
}

## entries 

### array.entries()  返回一个Array Iterator

var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);

###  Object.entries(object) 
// 返回一个给定对象自身可枚举属性的键值对数组
//Function 是不可枚举的
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); 
// [ ['foo', 'bar'], ['baz', 42] ]
// array like object with random key ordering
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.entries(anObj)); 
// [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]
// non-object argument will be coerced to an object
console.log(Object.entries('foo')); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

###  iterator    iterator.next  
//next方法 用来更新iterator 的迭代
console.log(iterator.next());
//二维数组排序
function sortArr(arr) {
  var goNext = true;
  var entries = arr.entries();
  while (goNext) {
      var result = entries.next();
      if (result.done !== true) {
          result.value[1].sort((a, b) => a - b);
          goNext = true;
      } else {
          goNext = false;
      }
  }
  return arr;
}
var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
sortArr(arr);
// (4) [Array(2), Array(5), Array(5), Array(4)]
//   0:(2) [1, 34]
//   1:(5) [2, 3, 44, 234, 456]
//   2:(5) [1, 4, 5, 6, 4567]
//   3:(4) [1, 23, 34, 78]
//   length:4
//   __proto__:Array(0)

### for of
for (let e of iterator) {
    console.log(e);
}
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}

//*******forEach 
Object.entries(obj).forEach(([key, value]) => {
    console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
});

//*******转为 Map
var obj = { foo: "bar", baz: 42 }; 
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
Object.entries(obj).map(([key, value],index) => {
    console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
});














# Array


## 基本知识 *******************/
// 数组也是对象，可以添加属性
//var array=[1,2];
// array.baz='baz';
// array.baz  array[baz]
// array.length : 2

## Array.map*******************/
- map会生成新的数组，并返回
- 传入 函数，每个元素调用一次函数，返回array
- map 不会修改原数组,可以在 callback 执行时改变原数组
- function内部return的值会赋给返回的新数组对应的索引index  
```js
var newArray = array.map(function callback(currentValue, index, array) {  
  //return 会赋值给新数组对应index的数据
  return xxx;
})
```

## Array.forEach() *******************/
// 为每个数组元素执行callback函数 没有返回值
// 不修改原数组
array.forEach(function callback(currentValue, index, array) {  
})

## Array.every()*******************/
// 为数组中的每个元素执行一次 callback 函数
// 直到它找到一个使 callback 返回 false（表示可转换为布尔值 false 的值）的元素,否则返回true 
// 不修改原数组
var bool=array.every(function callback(currentValue, index, array){
    return currentValue>0;
});


## Array.some()*******************/
// 测试数组中的某些元素是否通过由提供的函数实现的测试
[1, 2, 3, 4, 5].some(function(currentValue, index, array) {
// checks whether an element is even
    return currentValue % 2 === 0;
});
//只要有某些通过函数测试返回true 则结果为true

## Array.filter()*******************/
//返回通过测试callback 的新数组
//不修改原数组 
var newArray = array.filter(function callback(currentValue, index, array){
    return currentValue>0;
});

## Array.reduce()*******************/
//array从左到右执行callback
// 返回最终return
array.reduce(
    //callback
    (accumulator, currentValue,currentIndex,array) => {
        //accumulator ：上一个累加值       
        return  accumulator + currentValue
    },
    //initialValue
    initialValue
);

## Array.slice*******************/
//slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。
//原始数组不会被修改。
array.slice();// [0, end]
array.slice(begin);// [begin, end]
array.slice(begin, end);// [begin, end)
//slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组。
//你只需将该方法绑定到这个对象上。 
//一个函数中的 arguments 就是一个类数组对象的例子。
function list() {
  return Array.prototype.slice.call(arguments);
  //[].slice.call(arguments)也可以
}
var list1 = list(1, 2, 3); // [1, 2, 3]

## Array.splice *******************/
//在原数组 删除现有元素 或 添加新元素
返回被删除的数组，并改变原数组
// start 负数或超过数组长度:从末尾开始  其他:索引
// deleteCount 移除的长度 0:不删除，添加   >start:删除start至deletecount
// itemn 添加的元素 
array.splice(start,deleteCount,item1, item2,itemn);
 

## Array.sort *******************/
// 默认unicode顺序
// compareFunction 规则:
// compareFunction(a, b) < 0 , a在b前 ; >0 ,相反
// 原数组已经被排序后的数组代替,并作为返回
array.sort(function compareFunction(a, b) {
  return a - b;
});

## Array.concat *******************/
// 将数组和/或值连接成新数组
// 此方法不会更改现有数组，而是返回一个新数组
// 参数可以是 array , 或者 value
array.concat(value1,value2,valuen);

## Array.includes*******************/
arr.includes(searchElement)  
arr.includes(searchElement, fromIndex)  
//fromIndex :
//从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。

## Array.findIndex*******************/
// 查询满足callback的index并返回
fileList.findIndex((value,index,thisarr)=>{
    return value.uid===file.uid
})

## Array.indexOf*******************/
返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

## Array.shift
arr.shift();  
删除并返回数组头部的元素，  
并会修改原数组


## Array.unshift
arr.unshift(4, 5);  
将一个或多个元素添加到数组的开头  
返回该数组的新长度  
并会修改原数组











# Object 


## 基本 

### 键访问 属性访问
varmyObject={a:2};
myObject.a;//2
myObject["a"];//2 接受utf8/unicode字符串


### 可计算属性名 es6新增可计算属性名
var prefix="foo";
varmyObject={
  [prefix+"bar"]:"hello",
  [prefix+"baz"]:"world"
};
myObject["foobar"];//hello
myObject["foobaz"];//world
 
### 属性描述符

1. writable:是否可以修改属性的值
2. configurable:是否可以修改属性描述符,是否可以使用:  
defineProperty(myObj,'a',{
  value:'',
  writable:true,
  configurable:true,
  enumerable:true
})  
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

## getOwnPropertyNames()

返回所有属性，包括可枚举 不可枚举 


## 防篡改 Extensions ****************/

var person = { name: "Nicholas" }; 
Object. preventExtensions( person); 
person. age = 29; 
alert( person. age); //undefined
//检测是否可扩展
Object.isExtensible(person);

## 密封 seal****************/

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


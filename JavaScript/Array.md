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

## for...in

//遍历key 遍历arr object
// 这个 for...in 语句循环一个指定的变量来循环一个对象所有可枚举的属性
//array 返回index,object 返回key
let arr = [3, 5, 7];
arr.foo = "hello";
for (let key in arr) {
    console.log(key); // logs "0", "1", "2", "foo"
}
  
## for...of  

//遍历value  遍历arr
for (let value of arr) {
    console.log(value); // logs "3", "5", "7" // 注意这里没有 hello
}

## entries

### array.entries()  返回一个Array Iterator

var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);

### Object.entries(object)

```js
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
```

### iterator    iterator.next  

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

```js
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

```

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

## array.forEach() *******************/

// 为每个数组元素执行callback函数 没有返回值
// 不修改原数组
array.forEach(function callback(currentValue, index, array) {  
})

## array.every()*******************/

// 为数组中的每个元素执行一次 callback 函数
// 直到它找到一个使 callback 返回 false（表示可转换为布尔值 false 的值）的元素,否则返回true
// 不修改原数组
var bool=array.every(function callback(currentValue, index, array){
    return currentValue>0;
});

## array.some()*******************/

// 测试数组中的某些元素是否通过由提供的函数实现的测试
[1, 2, 3, 4, 5].some(function(currentValue, index, array) {
// checks whether an element is even
    return currentValue % 2 === 0;
});
//只要有某些通过函数测试返回true 则结果为true

## array.filter()

返回通过测试callback 的新数组

不修改原数组

用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：

```js
var newArray = array.filter(function callback(currentValue, index, array){
    return currentValue>0;
});
```

## array.reduce()*******************/

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

## array.slice*******************/

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

## array.splice *******************/

//在原数组 删除现有元素 或 添加新元素
返回被删除的数组，并改变原数组
// start 负数或超过数组长度:从末尾开始  其他:索引
// deleteCount 移除的长度 0:不删除，添加   >start:删除start至deletecount
// itemn 添加的元素
array.splice(start,deleteCount,item1, item2,itemn);

## array.sort *******************/

// 默认unicode顺序
// compareFunction 规则:
// compareFunction(a, b) < 0 , a在b前 ; >0 ,相反
// 原数组已经被排序后的数组代替,并作为返回
array.sort(function compareFunction(a, b) {
  return a - b;
});

## array.concat *******************/

// 将数组和/或值连接成新数组
// 此方法不会更改现有数组，而是返回一个新数组
// 参数可以是 array , 或者 value
array.concat(value1,value2,valuen);

## array.includes*******************/

arr.includes(searchElement)  
arr.includes(searchElement, fromIndex)  
//fromIndex :
//从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。

## array.findIndex*******************/

// 查询满足callback的index并返回
findindex = fileList.findIndex((value,index,thisarr)=>{
    return value.uid===file.uid
})

## Array.indexOf*******************/

返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

## array.shift

arr.shift();  
删除并返回数组头部的元素，  
并会修改原数组

## array.unshift

arr.unshift(4, 5);  
将一个或多个元素添加到数组的开头  
返回该数组的新长度  
并会修改原数组

## array.pop

数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度

```js
var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
console.log(plants.pop());
// expected output: "tomato"
console.log(plants);
// expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
plants.pop();
console.log(plants);
// expected output: Array ["broccoli", "cauliflower", "cabbage"]
```

## array.join()

```js
var elements = ['Fire', 'Air', 'Water'];
console.log(elements.join());
// expected output: "Fire,Air,Water"
console.log(elements.join('-'));
// expected output: "Fire-Air-Water"
```

## array.push()

push(itema, itemb) 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

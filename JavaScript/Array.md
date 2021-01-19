
# Array

## Array 构造函数

Array 构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度（length），而非只充当数组中的一个元素。这样
创建出来的只是一个空数组，只不过它的 length 属性被设置成了指定的值。

构造函数 Array(..) 不要求必须带 new 关键字。不带时，它会被自动补上。

## 基本知识

// 数组也是对象，可以添加属性
//var array=[1,2];
// array.baz='baz';
// array.baz  array[baz]
// array.length : 2

**迭代**

## Array.map*

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

## array.forEach()

// 为每个数组元素执行callback函数 没有返回值
// 不修改原数组
array.forEach(function callback(currentValue, index, array) {  
})

## array.every()

// 为数组中的每个元素执行一次 callback 函数
// 直到它找到一个使 callback 返回 false（表示可转换为布尔值 false 的值）的元素,否则返回true
// 不修改原数组

```js
var bool=array.every(function callback(currentValue, index, array){
    return currentValue>0;
});
```

## array.some()

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

**其他**

## array.reduce()

reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

reducer 函数的返回值分配给累计器 accumulator ，该返回值 accumulator 在数组的每个迭代中被记住，并最后成为最终的单个结果值。

返回 ： 函数累计处理的结果 accumulator

```js
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
```

accumulator: 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。

initialValue可选:作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

```js
// 例如： reduce实现扁平化数组
arr.reduce((acc, val) => acc.concat(val), []);
```

## array.slice

//slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。
//原始数组不会被修改。

数组截取办法 slice()，用于截取数组中的一部分返回，不影响原数组。

```js
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
```

## array.splice

//在原数组 删除现有元素 或 添加新元素

返回被删除的数组，并改变原数组

// start 负数或超过数组长度:从末尾开始  其他:索引
// deleteCount 移除的长度 0:不删除，添加   >start:删除start至deletecount
// itemn 添加的元素

array.splice(start,deleteCount,item1, item2,itemn);

## array.sort

默认sort方法执行后，原数组按照unicode顺序重新排序

规则 : compareFunction(a, b) < 0 , a在b前 ; >0 ,相反

原数组已经被排序后的数组代替,并作为返回

```js
array.sort(function compareFunction(a, b) {
  return a - b;
});
```

## array.concat

将数组和/或值连接成新数组

此方法不会更改现有数组，而是返回一个新数组

参数可以是 array , 或者 value

```js
array.concat(value1,value2,valuen);
```

## array.includes*

arr.includes(searchElement)  
arr.includes(searchElement, fromIndex)  
//fromIndex :
//从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。

## array.findIndex

findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。

```js
// 查询满足callback的index并返回
findindex = fileList.findIndex((value,index,thisarr)=>{
    return value.uid===file.uid
})
```

## Array.indexOf

返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

```js
[1,2,3].indexOf(2);
```

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

## array.toString()

返回一个字符串，表示指定的数组及其元素

```js
const array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// expected output: "1,2,a,1a"
```

## array.push()

push(itema, itemb, ...)

方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

## array.reverse()

方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

## array.fill()

fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

```js
const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```

## array.flat()

var newArray = arr.flat(depth)

flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

depth 使用 Infinity，可展开任意深度的嵌套数组

flat() 方法会移除数组中的空项:

```js
// flat 等效于 使用扩展运算符 ...。
// 也就是扩展运算符可以扁平化数组
const flattened = arr => [].concat(...arr);
```

## Array.from

Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

Array.from(arrayLike[, mapFn[, thisArg]])

mapFn(x), 对每个元素执行函数

```js
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]

let graph = Array.from({length:8}, () => ({outDegree:0, inDegree:0}));
// 迭代长度为8的空数组,每个执行赋值 {outDegree:0, inDegree:0}
```

## 类数组对象

一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。

常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length属性值，代表可接收的参数个数。

常见的类数组转换为数组的方法有这样几种：

```
（1）通过 call 调用数组的 slice 方法来实现转换

Array.prototype.slice.call(arrayLike);
（2）通过 call 调用数组的 splice 方法来实现转换

Array.prototype.splice.call(arrayLike, 0);
（3）通过 apply 调用数组的 concat 方法来实现转换

Array.prototype.concat.apply([], arrayLike);
（4）通过 Array.from 方法来实现转换

Array.from(arrayLike);
```

## 从Chrome V8源码看JavaScript数组

<https://github.com/sisterAn/JavaScript-Algorithms/issues/2>

JavaScript 中， JSArray 继承自 JSObject ，或者说它就是一个特殊的对象，内部是以 key-value 形式存储数据，所以 JavaScript 中的数组可以存放不同类型的值。

它有两种存储方式，快数组与慢数组，初始化空数组时，使用快数组，快数组使用连续的内存空间，当数组长度达到最大时，JSArray 会进行动态的扩容，以存储更多的元素，相对慢数组，性能要好得多。当数组中 hole 太多时，会转变成慢数组，即以哈希表的方式（ key-value 的形式）存储数据，以节省内存空间。

## 数组里面有10万个数据，取第一个元素和第10万个元素的时间

<https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/124>

数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)。得出结论：消耗时间几乎一致，差异可以忽略不计

JavaScript 没有真正意义上的数组，所有的数组其实是对象，其“索引”看起来是数字，其实会被转换成字符串，作为属性名（对象的 key）来使用。所以无论是取第 1 个还是取第 10 万个元素，都是用 key 精确查找哈希表的过程，其消耗时间大致相同。

# 迭代相关

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

break中止循环(for,do...while,while,label)，switch

## continue  

//继续循环

## for...in

遍历key

可遍历Array,Object

// 这个 for...in 语句循环一个指定的变量来循环一个对象所有可枚举的属性

Array  返回index, object 返回key

```js
let arr = [3, 5, 7];
arr.foo = "hello";
for (let key in arr) {
    console.log(key); // logs "0", "1", "2", "foo"
}
```

## for...of  

遍历value

可遍历Array , 不可Oject

```js
for (let value of arr) {
    console.log(value); // logs "3", "5", "7" // 注意这里没有 hello
}
```

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

## array.entries()  

返回一个Array Iterator

var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);

## Object.entries(object)

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

## iterator

<https://juejin.cn/post/6844904025167495181#heading-19>

### iterator.next

```js
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
```

# Set 与 WeakSet

<https://juejin.cn/post/6844903882162700301>

不可重复。 区别与Array

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

## Set()

```js
const a = new Set();
a.add(2)
a.delete(2);
```

## Set 与 Array转换

### 数组转Set

new Set(array)

Set可以传入数组，实现去重 new Set(array)

### set转数组

1. `[...set]`

```js
[...new Set([1,2])]
```

2. Array.from(set)

## Set与Array对比

相比Array之下，set是一个键的集合。set不使用索引，而是使用键对数据排序。set 中的元素按插入顺序是可迭代的，它不能包含任何重复的数据。换句话说，set中的每一项都必须是惟一的。

## set.add(value)

## set.has(value)

## set.delete(value)

删除某个值，返回一个布尔值，表示删除是否成功。

## set.forEach()

使用回调函数遍历每个成员

## set.keys()

Set.keys()：返回键名的遍历器

## set.values()

返回键值的遍历器

## set.entries()

返回键值对的遍历器

## WeakSet

WeakSet结构与 Set 类似，也是不重复的值的集合。

Set可以存储值类型和对象引用类型，而WeakSet只能存储对象引用类型，否则会抛出TypeError。

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，允许从内存中清除不再需要的被这些集合所引用的对象。

WeakSet对象是不可枚举的，也就是说无法获取大小，也无法获取其中包含的元素。

## 测试set性能

```js
let now = Date.now();
let i = 0;
var arr = [];
while(i++<10000) {
  arr.push(i+Math.random());
}
console.log(Date.now() - now);
now = Date.now();
let set = new Set(arr);
console.log(Date.now() - now);
now = Date.now();
let setarr = Array.from(set);
console.log(Date.now() - now);
now = Date.now();
```

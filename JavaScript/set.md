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

查看元素：使用indexOf()或includes()检查数组中的项是否存在是比较慢的。has快

删除元素:在Set中，可以根据每项的的 value 来删除该项。在数组中，等价的方法是使用基于元素的索引的splice()。与前一点一样，依赖于索引的速度很慢。delete快

保存 NaN：不能使用indexOf()或 includes() 来查找值 NaN，而 Set 可以保存此值。

删除重复项:Set对象只存储惟一的值,如果不想有重复项存在，相对于数组的一个显著优势，因为数组需要额外的代码来处理重复。

add效率也高于push效率

数组用来搜索元素(indexOf)的方法时间复杂度为0(N)。换句话说，运行时间的增长速度与数据大小的增长速度相同。

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

## WeakSet 与 Set 的区别

1. WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
2. WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中），所以，WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了（被垃圾回收了），WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素

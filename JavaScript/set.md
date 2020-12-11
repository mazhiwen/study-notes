# Set 与 WeakSet

Set无序，不可重复。 区别与Array

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

## Set()

```js
const a = new Set();
a.add(2)
a.delete(2);
```

## Set.prototype.add(value)

## Set.prototype.has(value)

## Set.prototype.delete(value)

删除某个值，返回一个布尔值，表示删除是否成功。

## Set.prototype.forEach()

使用回调函数遍历每个成员

## Set.prototype.keys()

Set.prototype.keys()：返回键名的遍历器

## Set.prototype.values()

返回键值的遍历器

## Set.prototype.entries()

返回键值对的遍历器

## WeakSet

WeakSet结构与 Set 类似，也是不重复的值的集合。

Set可以存储值类型和对象引用类型，而WeakSet只能存储对象引用类型，否则会抛出TypeError。

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，允许从内存中清除不再需要的被这些集合所引用的对象。

WeakSet对象是不可枚举的，也就是说无法获取大小，也无法获取其中包含的元素。

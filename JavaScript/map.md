# Map 与 weakMap

<https://juejin.cn/post/6844903837707272199>

<https://juejin.cn/post/6844903911938080782>

<https://juejin.cn/post/6846687604042104845>

<https://wangdoc.com/es6/set-map.html#map>

键值对按照插入顺序排列，如果插入重复的键值，后面的键值会覆盖前者

Map 数据结构。它类似于对象，也是键值对的集合

## 无限制键名类型

Map的键和值可以是任何数据类型

相比之下，Map允许你使用函数、对象和其它简单的类型（包括NaN）作为键。Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

## 直接遍历

在常规对象中，为了遍历keys、values和entries，你必须将它们转换为数组，如使用Object.keys()、Object.values()和Object.entries()，或者使用for ... in循环，因为常规对象不能直接遍历，另外for ... in循环还有一些限制：它仅仅遍历可枚举属性、非Symbol属性，并且遍历的顺序是任意的。

而Map可以直接遍历，并且由于它是键控集合，遍历的顺序和插入键值的顺序是一致的。你可以使用for ... of循环或forEach方法来遍历Map的entries，如下代码：

```js
for (let [key, value] of map) {
  console.log(key);
  console.log(value);
};
map.forEach((key, value) => {
  console.log(key);
  console.log(value);
});
```

## size

还有一个好处就是，你可以调用map.size属性来获取键值数量，而对于常规对象，为了做到这样你必须先转换为数组，然后获取数组长度，如：Object.keys({}).length。

## WeakMap

WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。

```js
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"
```

## WeakMap的方法

WeakMap只有四个方法可用：get()、set()、has()、delete()。

## 弱引用

在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。

我们默认创建一个对象：const obj = {}，就默认创建了一个强引用的对象，我们只有手动将obj = null，它才会被垃圾回收机制进行回收，如果是弱引用对象，垃圾回收机制会自动帮我们回收。

## Map与Set

```js
const set = new Set([1, 2, 3, 4]);
// set => {1,2,3,4}

const map = new Map([['one', 1], ['two', 2], ['three', 3], ['four', 4]]);
// map => [ one => 1 , two => 2 ...]
// map把二维数组的 内部数组数据 转为key-value
```

## Map与Object转换

```js
const obj2 = Object.fromEntries(map);
const map2 = new Map(Object.entries(obj));
```

## Map 与 Object 性能

Map的查询 添加 删除 性能要优与Object

频繁增删键值对的场景下表现比Object更好

「Map」是一个纯哈希结构，而「Object」不是（它拥有自己的内部逻辑）。Map 在频繁增删键值对的场景下表现更好，性能更高。因此当你需要频繁操作数据的时候也可以优先考虑 Map

## map.forEach

## map.keys()

keys() 返回一个引用的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的key值。

```js
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.keys();

console.log(iterator1.next().value);
// expected output: "0"

console.log(iterator1.next().value);
// expected output: 1
```

## map.values()

## map.entries()

## 测试代码

```js
let map = new Map();
map.set(1,'a');
map.set(2,'b');
let iterator = map.keys();

console.log(iterator.next().value);
map.delete(2,'b');
```

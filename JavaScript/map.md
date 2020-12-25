# Map

<https://juejin.cn/post/6844903837707272199>

<https://juejin.cn/post/6844903911938080782>

<https://juejin.cn/post/6846687604042104845>

<https://wangdoc.com/es6/set-map.html#map>

键值对按照插入顺序排列，如果插入重复的键值，后面的键值会覆盖前者

Map 数据结构。它类似于对象，也是键值对的集合

## 无限制键名类型

Map的键和值可以是任何数据类型

相比之下，Map允许你使用函数、对象和其它简单的类型（包括NaN）作为键，如下代码：

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

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。

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

## 测试代码

```js
let map = new Map();
map.set(1,'a');
map.set(2,'b');
let iterator = map.keys();

console.log(iterator.next().value);
map.delete(2,'b');
```

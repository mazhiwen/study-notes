
## es2015 es6

<http://es6.ruanyifeng.com/>

### 默认参数

```js
function fibonacci(current = 0, next = 1) {
}
```

### module

: import export default

```javascript
// 正常写法:
// export
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName() {...}
export class ClassName {...}
// import
import {firstName, lastName, year} from
import { lastName as surname } from
import * as name from//name.firstName name.lastName
```

```javascript
//default写法 默认写法
// export
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export default class {}

// 不能使用var，let或const用于导出默认值export default。
//import
import customName from
```

### Promise

<http://es6.ruanyifeng.com/#docs/promise>

- promise新建后会立即执行

```js

let promise = new Promise(function(resolve, reject) {
  // 这个函数会立即执行
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved

```

- Promise.prototype.then()

- then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）

```js
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

- 上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

- Promise.resolve()

有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。

```js
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
jsPromise.then();


Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

- Promise.reject()

Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

- 实现mergePromise

```js

const timeout = ms => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, ms)
});

// ajax1 是一个执行promise的函数
const ajax1 = () => timeout(1000).then(() => {
  console.log('1')
  return 1;
});

const ajax2 = () => timeout(1000).then(() => {
  console.log('2')
  return 2
});

const ajax3 = () => timeout(1000).then(() => {
  console.log('3')
  return 3
});

const mergePromise = ajaxArray => {
  let result = []
  let promise = Promise.resolve()
  ajaxArray.forEach(function (item) {
    promise = promise.then(item)
    // promise.then 返回的是一个 新的Promise实例
    result.push(promise)
  })
  return Promise.all(result)
};

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log('done')
  console.log(data) //[1,2,3]
});
```

### generator

一种异步编程解决方案

调用 Generator 函数后，返回指向内部状态的指针对象，遍历器对象（Iterator Object）

Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }

```

### set

```
const a = new Set();
a.add(2)
a.delete();
```

Set.prototype.keys()：返回键名的遍历器

Set.prototype.values()：返回键值的遍历器

Set.prototype.entries()：返回键值对的遍历器

Set.prototype.forEach()：使用回调函数遍历每个成员

Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。

### map

### class

新的 数据类型class 区别与javaclass定义，class在js类似数据类型，可以在function 内定义

### symbol

<https://juejin.im/post/5a0e65c1f265da430702d6b9>

## es2016 es7

### 1. Array.prototype.includes

### 2. Exponentiation Operator(求幂运算)

```js
3 ** 2  //9
// 效果同
Math.pow(3, 2) //9

```

## es2017 es8

### 1. async/await

<https://juejin.im/post/5b1ffff96fb9a01e345ba704>
<https://segmentfault.com/a/1190000007535316>
<http://www.ruanyifeng.com/blog/2015/05/async.html>

async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。相较于 Generator，async 函数的改进在于下面四点：

- 内置执行器。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，调用方式跟普通函数的调用一样
- 更好的语义。async 和 await 相较于 * 和 yield 更加语义化
- 更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await 命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）

```js
/**************** async/await ****************/
//babel 转换  node8支持
//await挂起当前函数，将后续语句加入到 event loop 循环中
// await 表示紧跟在后面的表达式需要等待结果。
async function asyncCall() {
  const v1 = await asyncFunc();
  const v2 = await asyncFunc(v1);
  const v3 = await asyncFunc(v2);
  return v3;
}
asyncCall();
```

**async**

- 返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用

- async 表示函数里有异步操作

- async 表明当前函数是异步函数，不会阻塞线程导致后续代码停止运行

- 在async里，必须要将结果return回来，不然的话不管是执行reject还是resolved的值都为undefined

返回如下结果会使async函数判定失败:

- reject内部含有直接使用并且未声明的变量或者函数。
- 内部抛出一个错误throw new Error或者返回reject状态return Promise.reject('执行失败')
- 函数方法执行出错（🌰：Object使用push()）等等...

```js
async function e() {
    throw new Error('has Error');
}
e().then(success => console.log('成功', success))
   .catch(error => console.log('失败', error));
```

**await**

await意思是async wait(异步等待)。这个关键字只能在使用async定义的函数里面使用。

### 2. Object.values/Object.entries

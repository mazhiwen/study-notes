
# promise

<http://es6.ruanyifeng.com/#docs/promise>

<https://juejin.cn/post/6892555927770103822>

<https://juejin.cn/post/6869573288478113799>

<https://juejin.cn/post/6844904054225633288#heading-28>

Promise 中只有涉及到状态变更后才需要被执行的回调才算是微任务，比如说 then、 catch 、finally ，其他所有的代码执行都是宏任务（同步执行）。

## new Promise

`new Promise((resolve, reject)=>{})`传入一个函数，这个函数可以带 2 个参数：resolve 和 reject。

new Promise新建后会立即执行

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

```js
function getData() {
  const p = new Promise((resolve, reject) => {
    // Ajax 请求等
    setTimeout(() => {
      console.log('获取数据成功');
      resolve('传入成功后的数据');
    }, 1000);
  });
  return p;
}
getData().then((res) => {
  // 获取到数据，然后进行处理
  console.log(res);

  // 如果下面还有 Ajax 请求，那么继续调用
  // getData2()
});
```

## 状态

```
Promise 有 3 种状态：
1. pending、初始状态
2. fulfilled、 成功状态（实际打印会看到 resolved）
3. rejected 失败状态
```

构建函数resolve 的作用是将 Promise 对象的状态从 “未完成” 变为 “成功”（pending -> resolved）。会走 .then()；

构建函数reject 的作用是将 Promise 对象的状态从 “未完成” 变为 “失败”（pending -> rejected）。会走 .catch()；

Promise 的状态一经改变就不能再进行更改。

## Promise.prototype.then()

```js
promise.then(res => {
    // thenable函数
    console.log(res)
}, err => {
    // catchable函数
    console.log(err)
})
```

then方法接收两个回调函数作为参数，分别为thenable函数和catchable函数，thenable函数是当状态为fulfilled的时候调用，catchable函数是当状态为rejected的时候调用，并且catchable函数是可选的

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）

then 会隐式调用 Promise 构建函数构建新的 promise 并返回。

```js
getJSON("/posts.json").then(function(json) {
  // 无论resolvet
  return json.post;
},function(){
  // 或者 rejec
  return 2;
}).then(function(res) {
  // 上面任何一个return 作为结果 res的值
});

```

then的链式调用：

上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

，上一个Promise的状态，只会导致它自己的then方法执行哪个函数的问题，并不会导致下一个Promise(thenable和catchable返回的Promise)的then方法执行函数的问题，也就是说then执行不出错，那么then返回的Promise状态都是resolved

## Promise.resolve()

有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。

```js
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
jsPromise.then();


Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

## Promise.reject()

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

## Promise.all

等待所有resolve

Promise.all 先创建一个新的 promise，然后先、初始化一个空的结果数组和一个计数器来对已经 resolve 的 promise进行计数，之后会进行迭代，对于每个迭代值它都会为其创造一个promise，并设定这个promise的then为向结果数组里添加结果以及计数器--，当计数器减至0时就会resolve最终结果。

## Promise.race

其中一个resolve，主结果就会resolve

Promise.race 也是会创建一个新的主 promise，之后主要是根据 promise 只能 resolve 一次的限制，对于每个迭代值都会创造另一个promise，先resolve的也就会先被主 promise resolve 返回结果。

## 实现mergePromise

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

# async await

[一次性让你懂async/await，解决回调地狱](https://juejin.im/post/5b1ffff96fb9a01e345ba704)

[理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)

[async 函数的含义和用法 -  ruanyifeng](http://www.ruanyifeng.com/blog/2015/05/async.html)

async 表示函数里有异步操作

await 表示紧跟在后面的表达式需要等待结果。

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

```
async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。相较于 Generator，async 函数的改进在于下面四点：

- 内置执行器。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，调用方式跟普通函数的调用一样
- 更好的语义。async 和 await 相较于 * 和 yield 更加语义化
- 更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await 命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）
```

## async

async函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用

async 用于申明一个 function 是异步的

async 表明当前函数是异步函数，不会阻塞线程导致后续代码停止运行。例如，多个async 执行，async1 和 async2 是同步执行的。

在async里，必须要将结果return回来，如果在async函数中 return 一个直接量，async 会把这个直接量通过Promise.resolve() 封装成 Promise 对象;如果 async 函数没有返回值,它会返回 Promise.resolve(undefined)

async函数必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变。

```js
async function e() {
    throw new Error('has Error');
}
e().then(success => console.log('成功', success))
   .catch(error => console.log('失败', error));

// 函数内部抛出了一个异常，返回reject，async函数接收到之后，判定执行失败进入catch，该返回的错误打印了出来。
```

```
返回如下结果会使async函数判定失败:

- reject内部含有直接使用并且未声明的变量或者函数。
- 内部抛出一个错误throw new Error或者返回reject状态return Promise.reject('执行失败')
- 函数方法执行出错（🌰：Object使用push()）等等...
```

## await

await 只能出现在 async 函数中, 例如：async函数内嵌套的函数是不可以的，会报错。

await意思是async wait(异步等待)。

如果await等到的不是一个promise对象，那跟着的表达式的运算结果就是它等到的东西；

如果是一个promise对象，await会阻塞后面的代码，等promise对象resolve，得到resolve的值作为await表达式的运算结果

虽然await阻塞了，但await在async中，async不会阻塞，它内部所有的阻塞都被封装在一个promise对象中异步执行。

很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志。await后面的函数会先执行一遍(比如await Fn()的Fn ,并非是下一行代码)，然后就会跳出整个async函数来执行后面js栈的代码。等本轮事件循环执行完了之后又会跳回到async函数中等待await****后面表达式的返回值，如果返回值为非promise则继续执行async函数后面的代码，否则将返回的promise放入Promise队列（Promise的Job Queue）

一个async函数内 出现多个await时，第一个await执行，就会跳出async函数。两个await不会同步执行.

## 多个请求并发执行

多个请求并发执行，可以使用 Promise.all 方法

## Async/Await并发请求

```js
let fs = require('fs')
function read(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}
function readAll() {
  read1()
  read2()//这个函数同步执行
}
async function read1() {
  let r = await read('1.txt','utf8')
  console.log(r)
}
async function read2() {
  let r = await read('2.txt','utf8')
  console.log(r)
}
readAll() // 2.txt 3.txt

```

## 例子

```js
function testSometing() {
    console.log("testSomething");
    return "return testSomething";
}

async function testAsync() {
    console.log("testAsync");
    return Promise.resolve("hello async");
}

async function test() {
    console.log("test start...");

    const testFn1 = await testSometing();
    console.log(testFn1);

    const testFn2 = await testAsync();
    console.log(testFn2);

    console.log('test end...');
}

test();

var promiseFn = new Promise((resolve)=> { 
                    console.log("promise START...");
                    resolve("promise RESOLVE");
                });
promiseFn.then((val)=> console.log(val));

console.log("===END===")
```

执行结果:

```
test start...
testSometing
promise START...
===END===
return testSometing
testAsync
promise RESOLVE
hello async
test end...
```

```
首先test()打印出test start...
然后 testFn1 = await testSomething(); 的时候，会先执行testSometing()这个函数打印出“testSometing”的字符串。
testAsync()执行完毕返回resolve，之后await会让出线程就会去执行后面的，触发promiseFn打印出“promise START...”。
接下来会把返回的Promiseresolve("promise RESOLVE")放入Promise队列（Promise的Job Queue），继续执行打印“===END===”。
等本轮事件循环执行结束后，又会跳回到async函数中（test()函数），等待之前await 后面表达式的返回值，因为testSometing() 不是async函数，所以返回的是一个字符串“return``testSometing”。
test()函数继续执行，执行到testFn2()，再次跳出test()函数，打印出“testAsync”，此时事件循环就到了Promise的队列，执行promiseFn.then((val)=> console.log(val));打印出“promise RESOLVE”。
之后和前面一样 又跳回到test函数继续执行console.log(testFn2)的返回值，打印出“hello async”。
最后打印“test end...”。
```

## generator

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

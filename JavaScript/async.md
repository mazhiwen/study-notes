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

## 处理被拒绝的 promise

```js
const response = await promisedFunction().catch((err) => {
  console.error(err);
  return "default response";
});
// response will be "default response" if the promise is rejected
```

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

总结一下 Generator 的本质，暂停，它会让程序执行到指定位置先暂停（yield），然后再启动（next），再暂停（yield），再启动（next），而这个暂停就很容易让它和异步操作产生联系，因为我们在处理异步时：开始异步处理（网络求情、IO 操作），然后暂停一下，等处理完了，再该干嘛干嘛。不过值得注意的是，js 是单线程的（又重复了三遍），异步还是异步，callback 还是 callback，不会因为 Generator 而有任何改变

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

```js
// 一个例子
// return 会中断js， resolve不会
var thisPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p1,resolve');
      
    }, 1000);
    
  });
var p3= null;
var thisPromise2 = new Promise((resolve, reject) => {
    p3 = thisPromise1.then(()=>{
      console.log(1);
            resolve('p2,resolve');

      console.log(2);
            return 'p2,return成功';

      console.log(3);
    })
})    
//输出1: 1
//输出2: 2
thisPromise2.then((value)=>{
  // 输出3: p2,resolve
  console.log('p2value',value);
})  

p3.then((value)=>{
  // 输出4： p2,return成功
  console.log('p3value',value);
}) 
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

then方法会把 return 语句包装返回为一个新的Promise实例（注意，不是原来那个Promise实例）

then 会隐式调用 Promise 构建函数构建新的 promise 并返回。

```js
getJSON("/posts.json").then(function(json) {
  // 无论resolvet
  return resA1;
},function(){
  // 或者 rejec
  return resA2;
}).then(function(resB) {
  // 上面任何一个return 作为结果 resB 的值
});

```

then的链式调用：上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将then函数中的返回结果`return`的值作为参数，传入第二个回调函数。

当return的是promise对象时，下一个then会等待这个promise对象的异步执行结果。例如一下代码

```js
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err){
  console.log("rejected: ", err);
});
```

上一个Promise的状态，只会导致它自己的then方法执行哪个函数的问题，并不会导致下一个Promise(thenable和catchable返回的Promise)的then方法执行函数的问题，也就是说then执行不出错，那么then返回的Promise状态都是resolved

## Promise.prototype.catch()

Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

```js
const p1 = new Promise(()=>{

})
p1.then(()=>{

}).catch(()=>{

})
```

Promise抛出的错误，并不会对外部代码造成影响，该运行的还是会运行

## finally

finally方法不接受任何参数，thenable和catchable都会走到finally，你根本没法知道它们最终的状态

## Promise.resolve()

Promise.resolve(x) 可以看作是 new Promise(resolve => resolve(x)) 的简写，可以用于快速封装字面量对象或其他对象，将其封装成 Promise 实例。

```js
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
jsPromise.then();

Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

根据参数不同，返回的东西也会不同

参数为promise : 原样返回

参数为原始值 或 不携带参数 : 返回一个状态为resolved的Promise对象，并且状态数据是我们定义的

```js
Promise.resolve();
Promise.resolve(2);
```

## Promise.reject()

Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

与Promise.resolve() 类似

```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

## Promise.all(iterable)

等待所有resolve

参数为一个迭代器(这里可以先认为是一个数组)，并返回一个新的Promise对象。

数组中必须都为Promise对象，如果有不是的，会自动调用Promise.resolve转换成Promise对象，并且状态为resolved

all会返回一个新的Promise对象

成功的时候返回的是一个按照顺序的结果数组，而失败的时候则返回最先被reject失败状态的值。


数组中所有的Promise实例的状态为resolved时。就会触发thenable函数，thenable的参数为一个数组，它们是由所有Promise实例的状态数据构成

当数组中的Promise实例出现rejected状态时。只要出现了rejected，就不会触发all的thenable函数，而是触发catchable函数，catchable函数的参数为第一个出现rejected状态的Promise实例的状态数据

如果存进的数组中的Promise自己带有catch，那么如果出错了，就不会触发all方法的catch。如果自己没有catch，那么才会触发all方法的catch

## Promise.race

其中一个resolve，主结果就会resolve

传入数组，里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。


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

## Promises/A+ 规范

Promises/A+ 规范是 JavaScript Promise 的标准，规定了一个 Promise 所必须具有的特性。

## 用IIFE实现promise缓存数据

```js
import {
  getData,
} from 'apis';

const getDataPromiseIIFE = (function() {
  let thePromise = null;
  return function getDataPromise(baseURL, store) {
    if (thePromise) {
      console.log('p 存在');
      return thePromise;
    } else {
      console.log('p 不存在');
      return new Promise(function(resolve) {
        console.log('n');
        thePromise = getData({
          baseURL
        }).then((res) => {
          let categoryData = res;
          resolve({
            categoryData
          })
          return {
            categoryData
          }
        });

      })
    }
  }
})()


export default getDataPromiseIIFE
```

## promise链式调用

```js
// 例2
Promise.resolve(1)
  .then(x => {
    console.log('s1',x); // 1
    return x + 1;
  })
  .then(x => {
    console.log('s2',x); // 2
    throw new Error('My Error')
  })
  .catch(() => 1)
  .then(x => x + 1)
  .then(x => console.log(x)) //2
  .catch(console.error)

```

# async await

<https://juejin.im/post/5b1ffff96fb9a01e345ba704>
<https://segmentfault.com/a/1190000007535316>
<http://www.ruanyifeng.com/blog/2015/05/async.html>

async 是“异步”的简写，async 用于申明一个 function 是异步的，

而 await 用于等待一个异步方法执行完成，

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

假设一个业务需要分步完成，每个步骤都是异步的，而且依赖上一步的执行结果，甚至依赖之前每一步的结果，就可以使用Async Await来完成

## async

返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用

async 表示函数里有异步操作

async 表明当前函数是异步函数，不会阻塞线程导致后续代码停止运行。例如，多个async 执行，async1 和 async2 是同步执行的。

在async里，必须要将结果return回来，如果在async函数中 return 一个直接量，async 会把这个直接量通过Promise.resolve() 封装成 Promise 对象;如果 async 函数没有返回值,它会返回 Promise.resolve(undefined)

```js
async function e() {
    throw new Error('has Error');
}
e().then(success => console.log('成功', success))
   .catch(error => console.log('失败', error));
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

虽然await阻塞了，但await在async中，async不会阻塞，它内部所有的阻塞都被封装在一个promise对象中异步执行

## 多个请求并发执行

多个请求并发执行，可以使用 Promise.all 方法
